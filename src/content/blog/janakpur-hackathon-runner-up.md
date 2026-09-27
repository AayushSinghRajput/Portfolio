---
title: "How We Won 1st Runner-Up at Janakpur Hackathon 2.0"
date: "2026-08-20"
category: "Hackathon Stories"
tags: ["Hackathon", "RAG", "FastAPI", "React", "LangChain", "MongoDB"]
excerpt: "The inside story of building an anonymous incident reporting platform with an AI legal chatbot in 24 hours — and earning 1st Runner-Up at Janakpur Hackathon 2.0."
coverImage: "/blog/hackathon-story.svg"
readingTime: "7 min read"
published: true
---

In December 2025, our team walked into **Janakpur Hackathon 2.0** with a rough idea and a lot of caffeine. 24 hours later, we walked out as **1st Runner-Up** with a civic-tech platform that combined anonymous incident reporting, NGO matching, and an AI legal chatbot — all built from scratch.

Here's how it happened.

## The Problem Statement

Nepal faces a significant challenge: citizens witnessing incidents — corruption, harassment, environmental violations — often don't report them due to fear of retaliation or simply not knowing *where* to report.

Our team asked: **What if reporting could be anonymous, and what if AI could help citizens understand their legal rights?**

## The Solution: Anonymous Incident Reporting + AI Legal Chatbot

We built a platform with three core features:

### 1. Anonymous Incident Reporting

Citizens can submit detailed incident reports without revealing their identity. Each report includes:
- Incident category (corruption, harassment, environmental, etc.)
- Description and evidence uploads (photos, documents)
- Location (optional)
- Auto-generated anonymous ID for follow-up

### 2. NGO Matching System

Based on the incident category, our system automatically matches reports with relevant NGOs. Environmental violations go to environmental organisations, human rights issues go to legal aid groups, and so on.

### 3. AI Legal Chatbot (The Star Feature)

This is what set us apart from other teams. We built a chatbot trained on **Nepal's Constitution 2072** using RAG (Retrieval-Augmented Generation).

Users could ask questions like:
- *"What are my rights as a whistleblower?"*
- *"Is this incident a violation of fundamental rights under Article 16?"*
- *"What legal protections exist for journalists in Nepal?"*

And the chatbot would respond with accurate, sourced answers from the actual constitution.

## Technical Architecture

```
Frontend (React + Tailwind)
    ↓
API Gateway (Node.js + Express)
    ↓
┌──────────────────┬────────────────────┐
│  Report Service  │   AI Chatbot API   │
│  (MongoDB)       │   (FastAPI + RAG)  │
└──────────────────┴────────────────────┘
                          ↓
                    ChromaDB + LangChain
                    (Nepal Constitution)
```

### The Stack

| Component | Tech | Rationale |
|---|---|---|
| Frontend | React + Tailwind CSS | Fast iteration, responsive design |
| Backend | Node.js + Express | REST APIs, auth, report management |
| AI Service | FastAPI | Async, perfect for ML inference |
| Vector DB | ChromaDB | Quick setup, embedded mode |
| AI Framework | LangChain | RAG pipeline orchestration |
| Database | MongoDB | Flexible schema for varied report types |

## The 24-Hour Timeline

**Hour 0-2: Planning & Architecture**
We sketched the full architecture on a whiteboard, divided responsibilities, and set up the monorepo. I took ownership of the AI chatbot and the backend API.

**Hour 2-6: Foundation**
- Set up React frontend with routing and UI components
- Built Express backend with MongoDB schemas
- Started ingesting Nepal's Constitution PDF into ChromaDB

**Hour 6-12: Core Features**
- Implemented anonymous reporting flow
- Built the NGO matching algorithm
- Got the RAG pipeline working (this was the hardest part — chunking a legal document properly requires careful separator choices)

**Hour 12-18: Integration**
- Connected all services
- Built real-time notifications
- Polished the UI with glassmorphic cards and animations

**Hour 18-24: Polish & Presentation**
- Fixed edge cases and bugs
- Prepared the demo script
- Built the presentation deck

## The Hardest Challenge: Legal Document Chunking

Standard text chunking doesn't work well for legal documents. Constitutional articles have nested sections, cross-references, and specific numbering that must be preserved.

My solution:
1. **Custom separators** — Split on article boundaries (`Article \d+`) first, then on sections
2. **Metadata enrichment** — Each chunk carries its article number and section for citation
3. **Overlap with context** — 30% overlap between chunks to preserve cross-article references

This approach gave us accurate citations in chatbot responses: *"According to Article 17(1) of the Constitution..."*

## What Impressed the Judges

1. **Real-world impact** — The platform addresses a genuine civic need
2. **AI integration** — Not just a CRUD app; the RAG chatbot was technically sophisticated
3. **Complete product** — Frontend, backend, AI service, database — all working together
4. **Clean code** — We maintained code quality even under time pressure

## Key Takeaways

- **Hackathons reward bold ideas with solid execution.** Our AI chatbot was ambitious, but we had the technical chops to deliver it.
- **Team dynamics matter as much as code.** Clear role division and constant communication (we did quick syncs every 2 hours) kept us aligned.
- **Start with the hardest part.** We tackled the RAG pipeline early, when our minds were fresh. If it had failed, we'd have had time to pivot.
- **Demo preparation is half the battle.** A great product with a bad demo loses. We spent 3 hours on our presentation.

## What's Next

I'm now working on expanding the RAG pipeline concept into **SmartPrep AI**, a learning platform where students can upload textbooks and get AI-powered study assistance. The architecture is similar, but with multi-document support and automated assessment generation.

---

*Interested in hackathons or civic-tech projects? Let's connect — I'm always looking for teammates who care about building things that matter.*
