---
title: "Evaluating and Optimizing RAG Pipelines: Beyond Basic Vector Search"
date: "2026-10-18"
category: "AI Engineering"
tags: ["RAG", "Vector Search", "ChromaDB", "LLM", "Information Retrieval", "Python"]
excerpt: "Moving beyond naive retrieve-and-generate: a practical guide to optimizing chunking strategies, hybrid search, cross-encoder reranking, and quantitative RAG evaluation."
coverImage: "/blog/rag-pipeline.svg"
readingTime: "12 min read"
published: true
---

When developers build their first Retrieval-Augmented Generation (RAG) prototype, the architecture usually looks deceptively straightforward: split documents into 500-token chunks, compute vector embeddings, index them in ChromaDB or Pinecone, run a top-k cosine similarity search at query time, and stuff the retrieved chunks into a prompt.

In a demo environment with clean documentation, this naive approach feels magical. But once you move a system like **SmartPrep AI** into production with real academic syllabi, dense formulas, and multi-paragraph technical questions, naive RAG quickly deteriorates.

Users receive answers that miss crucial nuance, cite irrelevant sections, or hallucinate plausible-sounding explanations. In this post, we'll examine why naive RAG breaks down and how to systematically optimize every stage of the retrieval and generation pipeline.

---

## 1. The Naive RAG Failure Modes

Before applying optimizations, it's essential to diagnose where retrieval pipelines actually fail:

1. **Information Fragmentation (Poor Chunking):** Splitting strictly by character count or token length cuts sentences and tables in half, severing semantic context.
2. **The "Lost in the Middle" Phenomenon:** Research from Stanford demonstrates that LLMs attend heavily to the beginning and end of long input contexts, often ignoring passages placed in the middle.
3. **Semantic Drift & Vocabulary Mismatch:** Dense vector embeddings capture thematic similarity, but they struggle with exact identifier matches (such as product SKUs, specific equation names, or error codes).
4. **Distractor Chunks:** Passing irrelevant chunks to the generator degrades reasoning quality and increases token consumption.

---

## 2. Advanced Chunking Strategies

The foundational layer of any vector index is how raw documents are parsed. Fixed-size chunking (e.g. 500 tokens with 50 tokens overlap) is rarely optimal for structured or educational content.

### Semantic Boundary Chunking

Instead of splitting on arbitrary token counts, break documents along natural markdown headings, paragraphs, or semantic transitions:

```python
from langchain_text_splitters import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter

# 1. First split by structural document hierarchy
headers_to_split_on = [
    ("#", "Header 1"),
    ("##", "Header 2"),
    ("###", "Header 3"),
]

markdown_splitter = MarkdownHeaderTextSplitter(
    headers_to_split_on=headers_to_split_on,
    strip_headers=False
)
header_splits = markdown_splitter.split_text(raw_document_text)

# 2. Then recursively chunk large sections while preserving metadata
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=600,
    chunk_overlap=80,
    separators=["\n\n", "\n", " ", ""]
)
final_chunks = text_splitter.split_documents(header_splits)
```

By tagging each chunk with its parent section hierarchy (e.g., `Header 1: Linear Algebra > Header 2: Eigenvalues`), the retriever preserves context that would otherwise be lost when an isolated formula chunk is embedded.

---

## 3. Hybrid Search: Dense + Sparse Retrieval

Vector embeddings (dense retrieval) excel at conceptual understanding, but fail when a user searches for an exact term like `"Theorem 4.2"` or `"CVE-2024-3094"`.

The solution is **Hybrid Search**, which combines BM25 keyword frequency (sparse retrieval) with dense semantic embeddings via **Reciprocal Rank Fusion (RRF)**:

```python
def reciprocal_rank_fusion(dense_results, sparse_results, k=60):
    """
    Combines ranked lists from semantic search and keyword search.
    """
    rrf_scores = {}
    
    # Process dense embeddings ranking
    for rank, doc in enumerate(dense_results):
        doc_id = doc.metadata["id"]
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))
        
    # Process BM25 sparse ranking
    for rank, doc in enumerate(sparse_results):
        doc_id = doc.metadata["id"]
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))
        
    # Sort documents by combined RRF score
    sorted_doc_ids = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
    return sorted_doc_ids
```

Hybrid search ensures that whether users ask colloquial conceptual queries (*"how do neural networks learn weights"*) or exact technical queries (*"backpropagation gradient equation (3)"*), the appropriate chunks surface in the candidate pool.

---

## 4. Two-Stage Retrieval with Cross-Encoder Reranking

A dense bi-encoder computes vector embeddings for questions and passages separately. This is computationally fast (sub-10ms lookups in ChromaDB), but it loses fine-grained token-level cross-attention.

A **Cross-Encoder** feeds both the question and candidate passage into the transformer simultaneously, yielding vastly superior relevance scores:

```python
from sentence_transformers import CrossEncoder

# Step 1: Retrieve top 25 broad candidate chunks using fast bi-encoder
initial_candidates = vector_store.similarity_search(query, k=25)

# Step 2: Rerank top 25 down to the top 4 most accurate chunks
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
pairs = [[query, doc.page_content] for doc in initial_candidates]
scores = reranker.predict(pairs)

# Step 3: Sort by cross-encoder score
scored_docs = sorted(zip(initial_candidates, scores), key=lambda x: x[1], reverse=True)
top_k_final = [doc for doc, score in scored_docs[:4]]
```

By filtering 25 candidate chunks down to the 4 most relevant, you eliminate prompt noise, stay within optimal context windows, and cut LLM latency significantly.

---

## 5. Quantitative Evaluation with RAGAS Metrics

You cannot improve what you cannot measure. Relying on "vibe checks" when modifying prompts or chunk sizes leads to regressions. In production, we evaluate RAG pipelines using three automated metrics:

1. **Faithfulness:** Measures whether the generated answer is strictly grounded in the retrieved context (preventing hallucinations).
2. **Answer Relevance:** Evaluates whether the generated response directly answers the user's specific prompt.
3. **Context Precision:** Quantifies whether the top-ranked retrieved chunks contain the ground-truth information required.

Implementing these quantitative evaluations gives you the confidence to refactor database schemas, upgrade embedding models, and benchmark performance across releases.

---

## Key Takeaways

* **Don't rely solely on dense vector search.** Combine BM25 sparse search with dense embeddings using Reciprocal Rank Fusion.
* **Add a Cross-Encoder reranker.** Retrieving 20–30 candidates and filtering down to 3–5 high-confidence chunks produces cleaner, faster responses.
* **Structure chunks with document hierarchy.** Injecting parent headings into chunk metadata prevents context fragmentation.
* **Automate evaluation.** Track faithfulness and context precision before pushing pipeline changes to production.
