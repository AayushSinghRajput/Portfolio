---
title: "Stop Using LLMs as Expensive If/Else Statements"
date: "2026-09-28"
category: "AI Architecture"
tags: ["AI Architecture", "System 1 Models", "FastAPI", "Python", "Optimization", "LLMs", "Cost Reduction"]
excerpt: "Why routing every string check and classification to a frontier LLM kills your latency and budget — and how dual-process System 1 & 2 pipelines reduce latency by 85%."
coverImage: "/blog/llm-overkill-system-one.svg"
readingTime: "9 min read"
published: true
---

A few months ago, while profiling the backend of **SmartPrep AI**, I noticed a pattern that made me pause: over 40% of our API latency was spent waiting on frontier LLMs to make binary decisions.

Queries like *"Is this prompt relevant to biology?"*, *"What format does the user want (PDF or Markdown)?"*, or *"Is the user asking for customer support?"* were all being routed directly to an external LLM completion call. 

Each of those calls added **1,200ms to 2,500ms** of round-trip latency, racked up API token bills, and introduced non-deterministic JSON validation errors when the model decided to hallucinate markdown quotes around its response.

We had built the world's most expensive, slow, and unreliable `if/else` statement.

Here is why treating LLMs like general-purpose logical operators is an architectural trap — and how adopting a **dual-process "System 1 vs. System 2" architecture** completely transformed our system's speed, cost, and reliability.

---

## The "LLM-as-Everything" Anti-Pattern

When engineers first get access to modern LLMs, there is a natural temptation to outsource every problem to them:

```
User Input ──▶ [ LLM: Classify Intent ] ──▶ [ LLM: Verify Guardrails ] ──▶ [ LLM: Synthesize Answer ]
Latency:            ~1,400ms                     ~1,200ms                       ~2,800ms
                                                                 Total:         ~5,400ms
```

This pipeline might work well during a weekend hackathon. But in production, stacking LLM calls like dominoes introduces three major bottlenecks:

1. **Unforgiving Latency**: Human users expect UI feedback in under 200ms. An LLM call across the WAN rarely completes in under 1,000ms.
2. **Exponential Failure Modes**: If each LLM call has a 98% reliability rate, chaining three calls drops your end-to-end reliability to `0.98³ = 94.1%`.
3. **Budget Bleed**: Processing millions of trivial tokens through a 70B+ parameter model when a 2-line regex or a lightweight classifier could do the job for $0.00.

---

## Kahneman's Dual Process: System 1 vs. System 2

In *Thinking, Fast and Slow*, psychologist Daniel Kahneman describes human cognition as two distinct modes:

* **System 1 (Fast & Intuitive)**: Operates automatically and quickly, with little or no effort and no sense of voluntary control (e.g., recognizing that 2 + 2 = 4, or spotting a stop sign).
* **System 2 (Slow & Deliberative)**: Allocates attention to effortful mental operations, complex computations, and nuanced reasoning (e.g., comparing two insurance policies or writing a technical document).

Modern AI architecture should mirror this exact split:

| Dimension | System 1 (Fast Layer) | System 2 (Reasoning Layer) |
|---|---|---|
| **Mechanism** | Regex, BM25, bi-encoders, small models (e.g., MiniLM, scikit-learn) | Frontier LLMs (GPT-4o, Claude 3.5, Gemini 1.5 Pro) |
| **Typical Latency** | **2ms – 25ms** | **1,000ms – 4,000ms** |
| **Cost** | Virtually $0 (local compute) | Pay-per-token API pricing |
| **Determinism** | 100% reproducible | Probabilistic / Non-deterministic |
| **Best Used For** | Routing, entity hygiene, format parsing, cache hits | Deep reasoning, cross-document synthesis, code generation |

---

## Architectural Blueprint: The 3-Tier Cascading Router

Instead of shipping every prompt straight to the heavy reasoning model, we redesigned our pipeline as a **3-tier cascading router** built in FastAPI.

```
Incoming Request
      │
      ▼
┌─────────────────────────────────┐
│ Tier 1: Deterministic Heuristics│ ──[Match: Exit early (<5ms)]
│ (Regex, exact match, blocklist) │
└─────────────────────────────────┘
      │ (No direct match)
      ▼
┌─────────────────────────────────┐
│ Tier 2: System 1 Embeddings     │ ──[High Cosine: Route to cached handler (<30ms)]
│ (Bi-encoder / Vector similarity)│
└─────────────────────────────────┘
      │ (Ambiguous / Complex reasoning required)
      ▼
┌─────────────────────────────────┐
│ Tier 3: System 2 Frontier LLM   │ ──[Full multi-step synthesis (>1200ms)]
│ (Full RAG + Reasoning chain)    │
└─────────────────────────────────┘
```

Let's see how each tier works with actual Python implementations.

---

### Tier 1: Zero-Cost Heuristics & Deterministic Rules

A surprising percentage of incoming traffic doesn't need machine intelligence at all. Command triggers, common greetings, direct navigation intents, and toxic input can be caught instantly:

```python
import re
from typing import Optional, Tuple

COMMAND_PATTERNS = {
    "clear_history": re.compile(r"^\s*(clear|reset|start\s*over)\s*$", re.IGNORECASE),
    "export_notes": re.compile(r"^\s*(export|download)\s*(as\s*)?(pdf|markdown|txt)?\s*$", re.IGNORECASE),
    "help_desk": re.compile(r"^\s*(help|support|contact|pricing)\s*$", re.IGNORECASE),
}

def evaluate_tier_one(prompt: str) -> Optional[Tuple[str, dict]]:
    """Instant deterministic check (<2ms) before touching any model."""
    cleaned = prompt.strip()
    
    for intent, pattern in COMMAND_PATTERNS.items():
        if pattern.match(cleaned):
            return intent, {"matched_by": "regex_heuristic"}
            
    return None
```

If Tier 1 matches, your request returns in **single-digit milliseconds** without burning a single token.

---

### Tier 2: System 1 Semantic Intent Routing (Vector Similarity)

What if the user's query is slightly varied, like *"I'd like to wipe my chat history"* or *"Can I start this session from scratch?"*

Instead of an LLM, we use a **lightweight bi-encoder** (`all-MiniLM-L6-v2`) or ChromaDB vector distance to compare the query vector against pre-indexed anchor intents.

```python
import numpy as np
from sentence_transformers import SentenceTransformer

# Load small 80MB embedding model once on startup
intent_embedder = SentenceTransformer("all-MiniLM-L6-v2")

ANCHOR_INTENTS = {
    "clear_session": [
        "reset everything",
        "wipe my chat",
        "clear past messages",
        "restart conversation"
    ],
    "faq_pricing": [
        "how much does this cost",
        "subscription plans",
        "is there a free tier",
        "pricing breakdown"
    ]
}

# Pre-compute anchor centroid vectors at startup
ANCHOR_VECTORS = {
    intent: np.mean(intent_embedder.encode(phrases), axis=0)
    for intent, phrases in ANCHOR_INTENTS.items()
}

def evaluate_tier_two(query: str, threshold: float = 0.82) -> Optional[str]:
    """Fast semantic similarity check (<25ms)."""
    query_vec = intent_embedder.encode(query)
    
    best_intent = None
    best_score = -1.0
    
    for intent, anchor_vec in ANCHOR_VECTORS.items():
        similarity = np.dot(query_vec, anchor_vec) / (
            np.linalg.norm(query_vec) * np.linalg.norm(anchor_vec)
        )
        if similarity > best_score:
            best_score = similarity
            best_intent = intent
            
    if best_score >= threshold:
        return best_intent
        
    return None  # Escalate to Tier 3
```

This local similarity computation runs in under **20ms on a standard CPU**. It handles synonyms, typos, and phrasing variations effortlessly without round-tripping to OpenAI or Anthropic.

---

### Tier 3: System 2 Frontier Reasoning

Only when Tiers 1 and 2 yield no confident match does the request hit the heavy LLM pipeline.

Now, when our frontier model runs, we know its compute is being spent where it actually shines:
* Dissecting a tricky medical or legal document
* Synthesizing multi-chunk RAG contexts with nuanced citations
* Generating customized step-by-step code solutions

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Smart Intent Gateway")

class QueryRequest(BaseModel):
    prompt: str

@app.post("/api/v1/query")
async def handle_query(req: QueryRequest):
    # Tier 1: Heuristics
    t1_result = evaluate_tier_one(req.prompt)
    if t1_result:
        intent, meta = t1_result
        return {"route": "tier_1", "action": intent, "latency_tier": "<5ms"}

    # Tier 2: System 1 Semantic Matching
    t2_intent = evaluate_tier_two(req.prompt)
    if t2_intent:
        return {"route": "tier_2", "action": t2_intent, "latency_tier": "<30ms"}

    # Tier 3: System 2 Deep Reasoning
    llm_answer = await run_frontier_rag_pipeline(req.prompt)
    return {"route": "tier_3", "answer": llm_answer, "latency_tier": "1500ms+"}
```

---

## The Decision Matrix: When to Use What

To keep your architecture honest, here is a mental checklist before adding an LLM call to your system:

```
Is the output space finite and known in advance (e.g. Yes/No, 5 categories)?
   ├── YES ──▶ Can it be solved with string parsing / regex?
   │            ├── YES ──▶ Use Tier 1 Heuristics
   │            └── NO  ──▶ Use Tier 2 Lightweight Classifier / Vector Distance
   └── NO  ──▶ Does it require generative language synthesis or novel reasoning?
                ├── NO  ──▶ Re-evaluate system design
                └── YES ──▶ Use Tier 3 Frontier LLM
```

---

## Real-World Impact & Metrics

After deploying this tiered architecture across our systems, the numbers spoke for themselves:

* **P50 Latency Drop**: Dropped from `1,840ms` down to **`210ms`** across all endpoint hits.
* **API Cost Reduction**: Cut external LLM spending by **73%** in the first month.
* **Deterministic Reliability**: Zero formatting failures on commands, resets, and high-frequency intent queries.

---

## Conclusion

LLMs are extraordinary engines of synthesis and semantic reasoning. But they make dreadful, sluggish if/else blocks.

By treating them as **System 2 deliberate thinkers** and guarding them with **System 1 fast heuristics**, you give your users the best of both worlds: instant responsiveness on routine tasks and deep intelligence when it actually counts.

---

*Building AI systems or optimizing RAG pipelines? Feel free to [drop me a line](/contact) — always eager to trade engineering notes.*
