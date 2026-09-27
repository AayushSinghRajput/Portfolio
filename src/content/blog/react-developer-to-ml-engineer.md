---
title: "From React Developer to ML Engineer: My Learning Roadmap"
date: "2026-07-10"
category: "Learning Journey"
tags: ["Career", "Machine Learning", "React", "Full Stack", "RAG", "Python"]
excerpt: "How I transitioned from building React frontends to shipping AI-powered products — the resources, projects, and mindset shifts that made it possible."
coverImage: "/blog/learning-journey.svg"
readingTime: "8 min read"
published: true
---

Two years ago, I was a React developer who could barely read a Python `for` loop. Today, I'm shipping production RAG pipelines and AI-integrated applications. This is the roadmap I followed — and what I'd do differently if I started over.

## Why ML? The Turning Point

It started with frustration. I was building a tutoring platform (TuitionMaster) and wanted to add a "smart search" feature — where students could describe what they wanted to learn in natural language, and the system would match them with the right teacher.

Traditional keyword search was terrible at this. A student searching for "someone who can teach calculus for engineering entrance exams" wouldn't match a teacher whose profile said "Mathematics — B.Sc. level preparation."

I needed **semantic search**. And that rabbit hole led me to embeddings, vector databases, and eventually full-blown ML engineering.

## The Roadmap (What Actually Worked)

### Phase 1: Python Fundamentals (2 weeks)

Coming from JavaScript/TypeScript, Python felt weird at first (indentation as syntax? no semicolons?). But the transition was smoother than expected because:

- Both are dynamically typed
- Array methods in JS map directly to list comprehensions in Python
- `async/await` works almost identically

**Resources that helped:**
- Python official tutorial (seriously, it's excellent)
- Building small scripts to automate tasks I was doing manually

### Phase 2: Data Science Basics (3 weeks)

Before jumping into ML, I needed to understand:
- **NumPy** — Array operations and linear algebra
- **Pandas** — Data manipulation (think of it as Excel on steroids)
- **Matplotlib/Seaborn** — Visualisation

I didn't go deep here. Just enough to load a dataset, clean it, and plot basic charts. The goal was literacy, not mastery.

### Phase 3: Machine Learning Fundamentals (4 weeks)

This is where it got interesting. I used **scikit-learn** and focused on:

1. **Supervised learning** — Linear regression, decision trees, random forests
2. **Classification** — Logistic regression, SVM, naive Bayes
3. **Evaluation** — Accuracy, precision, recall, F1, confusion matrices
4. **Data preprocessing** — Normalisation, encoding, train/test splits

**The project that made it click:** Building a simple spam classifier. Taking raw email text, converting it to TF-IDF vectors, training a naive Bayes model, and seeing it correctly classify "You've won a prize!" as spam — that was magical.

### Phase 4: Deep Learning & Neural Networks (3 weeks)

I used **TensorFlow/Keras** (not PyTorch — controversial choice, but Keras's Sequential API felt more intuitive coming from a web dev background).

Key concepts:
- Neural network architecture (layers, activation functions)
- Convolutional Neural Networks (CNNs) for image tasks
- Transfer learning with pre-trained models (MobileNet, ResNet)

**The project:** AI Facial Analysis & Skincare Advisor — my minor project that uses MobileNet transfer learning to classify skin types from photos. This was the first time I shipped an ML model integrated with a full web stack (React + Node.js + Flask).

### Phase 5: NLP & Language Models (Ongoing)

This is where my web dev background became a **superpower**:

- **Embeddings** — Converting text to vectors (conceptually similar to how React keys work — unique representations)
- **Vector databases** — ChromaDB, Pinecone (just fancy databases optimised for similarity search)
- **RAG pipelines** — The bridge between LLMs and your own data
- **LangChain** — Framework for orchestrating LLM-powered applications

**The project:** SmartPrep AI — a full-stack learning platform with RAG-powered Q&A, automated assessments, and multi-document ingestion.

## What I'd Do Differently

### 1. Skip the Math Rabbit Hole (Initially)

I spent 3 weeks trying to understand backpropagation calculus before writing any code. Bad move. Build things first, understand the math when you need to debug or optimise.

### 2. Start with FastAPI, Not Flask

Flask is fine for simple ML model serving, but FastAPI is better in every way:
- Type validation with Pydantic
- Automatic API documentation
- Native async support
- Better error handling

### 3. Learn Prompt Engineering Earlier

With modern LLMs, you can build impressive AI features with zero ML training — just good prompt engineering. I wish I'd learned this first and saved the model-training deep dive for later.

### 4. Build Full-Stack AI Products, Not Just Models

A model in a Jupyter notebook is worthless if it can't serve users. My web dev skills were the secret weapon — I could build the entire product (frontend, API, database, deployment) around the ML component.

## The Web Dev Advantage

If you're a web developer considering ML, you have massive advantages:

| Web Dev Skill | ML Application |
|---|---|
| REST API design | Model serving endpoints |
| Database management | Vector database operations |
| Frontend development | Building interfaces for AI features |
| DevOps/deployment | ML model deployment |
| Async programming | Handling concurrent inference requests |
| State management | Managing conversation history in chatbots |

## Current Tech Stack

Here's what my typical AI-integrated project looks like today:

```
Frontend:  Next.js / React + Tailwind CSS
Backend:   FastAPI (AI) + Node.js/Express (business logic)
Database:  MongoDB (data) + ChromaDB (vectors)
AI:        LangChain + OpenAI API
Deploy:    Vercel (frontend) + Render (backend)
```

## What I'm Learning Next

- **LangGraph** — For building stateful, multi-step AI agents
- **Fine-tuning** — Custom model training for domain-specific tasks
- **Docker + Kubernetes** — Production ML deployment at scale
- **MLOps** — Monitoring model performance in production

## Advice for Web Devs Getting Into ML

1. **Don't quit web dev** — The combination is more valuable than either alone
2. **Build projects, not courses** — You'll learn more from one deployed RAG pipeline than ten Coursera certificates
3. **Start with retrieval, not training** — RAG pipelines let you build powerful AI features without training a single model
4. **Use your full-stack skills** — The world has enough Jupyter notebook demos; ship products
5. **Be patient** — It took me 6 months to feel comfortable. That's normal.

---

*Thinking about making the jump from web dev to ML? I'm happy to share more specific resources — just [reach out](/contact)!*
