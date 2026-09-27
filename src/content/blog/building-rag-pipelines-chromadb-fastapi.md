---
title: "Building RAG Pipelines with ChromaDB & FastAPI"
date: "2026-09-15"
category: "Technical Deep Dive"
tags: ["RAG", "ChromaDB", "FastAPI", "LLM", "Python", "Vector Database"]
excerpt: "A practical guide to building production-ready Retrieval-Augmented Generation pipelines using ChromaDB as the vector store and FastAPI as the backend — drawn from my experience building SmartPrep AI."
coverImage: "/blog/rag-pipeline.svg"
readingTime: "10 min read"
published: true
---

Building an AI system that can answer questions from your own documents sounds futuristic — but with **Retrieval-Augmented Generation (RAG)**, it's surprisingly achievable. In this post, I'll walk through how I built the RAG pipeline behind **SmartPrep AI**, my AI-powered learning platform.

## What is RAG, and Why Does It Matter?

Large Language Models (LLMs) like GPT-4 or Gemini are incredible at generating text, but they have a critical limitation: they only know what they were trained on. Ask them about your company's internal docs, a textbook PDF, or the latest research paper — and they'll either hallucinate or admit ignorance.

**RAG solves this** by giving the LLM access to external knowledge at query time:

1. **Retrieve** — Find the most relevant document chunks from a vector database
2. **Augment** — Inject those chunks into the LLM prompt as context
3. **Generate** — Let the LLM produce an answer grounded in your actual data

The result? An AI that answers questions using *your* documents, with drastically reduced hallucination.

## Architecture Overview

Here's the high-level architecture I used for SmartPrep AI:

```
User Query → FastAPI Backend → Embedding Model → ChromaDB Vector Search
                                                         ↓
                                               Top-K Relevant Chunks
                                                         ↓
                                    Prompt Template + Context → LLM → Answer
```

### Tech Stack

| Component | Technology | Why |
|---|---|---|
| Backend API | FastAPI | Async support, automatic OpenAPI docs, type validation |
| Vector Store | ChromaDB | Simple API, runs embedded (no server needed), good for prototyping |
| Embeddings | OpenAI `text-embedding-3-small` | High quality, 1536 dimensions |
| LLM | OpenAI GPT-4 | Best reasoning capability for Q&A |
| Document Processing | LangChain | Handles PDF parsing and text chunking |
| Frontend | Next.js | SSR support, great DX |

## Step 1: Document Ingestion

The first step is getting your documents into the vector database. This involves:

1. **Parsing** — Extract text from PDFs, DOCX, or plain text files
2. **Chunking** — Split text into overlapping segments (typically 500-1000 tokens)
3. **Embedding** — Convert each chunk into a vector representation
4. **Storing** — Save the vectors + metadata in ChromaDB

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
import chromadb
from chromadb.utils import embedding_functions

# Initialize ChromaDB
client = chromadb.PersistentClient(path="./chroma_db")
embedding_fn = embedding_functions.OpenAIEmbeddingFunction(
    api_key="your-api-key",
    model_name="text-embedding-3-small"
)

collection = client.get_or_create_collection(
    name="study_materials",
    embedding_function=embedding_fn
)

# Load and chunk the PDF
loader = PyPDFLoader("machine_learning_textbook.pdf")
pages = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=200,
    separators=["\n\n", "\n", ". ", " ", ""]
)
chunks = splitter.split_documents(pages)

# Store in ChromaDB
for i, chunk in enumerate(chunks):
    collection.add(
        documents=[chunk.page_content],
        metadatas=[{"source": chunk.metadata.get("source", ""),
                    "page": chunk.metadata.get("page", 0)}],
        ids=[f"chunk_{i}"]
    )
```

### Key Design Decisions

**Chunk size of 800 tokens with 200 overlap** — After experimenting with different sizes, I found this sweet spot. Too small (200) and you lose context. Too large (2000) and retrieval precision drops. The overlap ensures concepts that span chunk boundaries aren't lost.

**`RecursiveCharacterTextSplitter`** — This is better than naive splitting because it tries to split on paragraph boundaries first, then sentences, then words. The result is semantically coherent chunks.

## Step 2: Query & Retrieval

When a user asks a question, we embed their query and find the most similar chunks:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class QueryRequest(BaseModel):
    question: str
    top_k: int = 5

@app.post("/api/ask")
async def ask_question(request: QueryRequest):
    # Retrieve relevant chunks
    results = collection.query(
        query_texts=[request.question],
        n_results=request.top_k,
        include=["documents", "metadatas", "distances"]
    )

    if not results["documents"][0]:
        raise HTTPException(404, "No relevant content found")

    # Build context from retrieved chunks
    context_chunks = results["documents"][0]
    context = "\n\n---\n\n".join(context_chunks)

    # Generate answer with LLM
    answer = await generate_answer(request.question, context)

    return {
        "answer": answer,
        "sources": results["metadatas"][0],
        "confidence": 1 - min(results["distances"][0])  # rough confidence
    }
```

## Step 3: Prompt Engineering

The prompt template is crucial. Here's what worked well:

```python
PROMPT_TEMPLATE = """You are a helpful teaching assistant. Answer the
student's question based ONLY on the provided context. If the context
doesn't contain enough information, say so honestly.

Context from study materials:
{context}

Student's Question: {question}

Instructions:
- Provide a clear, educational answer
- Reference specific parts of the context
- If you're unsure, say "Based on the available materials, I'm not certain"
- Use examples to clarify complex concepts

Answer:"""
```

## Lessons Learned

1. **Chunking strategy matters more than the LLM** — I spent days fine-tuning GPT-4 prompts before realising my 2000-token chunks were the real bottleneck. Smaller, semantically coherent chunks improved answer quality by ~40%.

2. **ChromaDB is perfect for prototyping, but...** — For production with 100K+ documents, consider Pinecone or Weaviate. ChromaDB starts slowing down around 50K vectors.

3. **Always return sources** — Users trust AI more when they can verify the source. Showing "Answer from Page 42 of ML Textbook" builds confidence.

4. **Hybrid search wins** — Combining vector similarity with keyword search (BM25) catches edge cases where semantic search fails on exact terms.

## What's Next

In my next post, I'll cover how I added **multi-document support** to SmartPrep AI, letting users upload multiple PDFs and query across all of them with source attribution. Stay tuned!

---

*Have questions about RAG pipelines? Feel free to [reach out](/contact) — I love talking about AI systems architecture.*
