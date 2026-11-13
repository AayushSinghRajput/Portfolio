---
title: "Mastering Server-Sent Events (SSE) & Streaming in FastAPI for LLM Apps"
date: "2026-10-25"
category: "Backend & Systems"
tags: ["FastAPI", "Python", "Streaming", "Server-Sent Events", "AsyncIO", "LLM"]
excerpt: "How to design low-latency streaming endpoints with FastAPI, AsyncIO, and Server-Sent Events to deliver responsive generative AI experiences with graceful cancellation handling."
coverImage: "/blog/llm-overkill-system-one.svg"
readingTime: "11 min read"
published: true
---

When building web applications powered by Large Language Models, waiting 6 to 12 seconds for an entire response to generate before sending an HTTP response destroys user trust. Users assume the interface has frozen or crashed.

Streaming the response token-by-token transforms perceived latency. When words begin appearing within 400 milliseconds (**Time-to-First-Token / TTFT**), users can begin reading immediately while the remainder of the response generates in real time.

In this guide, we'll walk through how to build production-grade streaming backends using **FastAPI**, **AsyncIO**, and **Server-Sent Events (SSE)**, complete with proper error handling and client cancellation cleanup.

---

## 1. WebSockets vs Server-Sent Events (SSE)

Developers frequently ask whether they should use WebSockets or SSE for streaming AI generation:

| Feature | Server-Sent Events (SSE) | WebSockets |
| :--- | :--- | :--- |
| **Direction** | Unidirectional (Server &rarr; Client) | Bidirectional (Full Duplex) |
| **Transport** | Standard HTTP/1.1 or HTTP/2 | Custom WS Protocol (Upgrade handshake) |
| **Reconnection** | Native browser retry mechanism | Requires custom reconnection logic |
| **Proxy / Firewall** | Traverses CDNs & firewalls seamlessly | Often blocked by enterprise proxies |
| **Best Fit** | LLM token streaming, notifications | Live multiplayer games, chat typing |

Because generative AI interactions follow a simple request-and-stream pattern (client sends a query once, server streams tokens continuously), **Server-Sent Events are lighter, easier to cache, and more robust**.

---

## 2. Implementing Streaming in FastAPI

FastAPI provides `StreamingResponse` from Starlette, which accepts an asynchronous generator.

Here is a clean implementation streaming from an OpenAI or Anthropic SDK:

```python
import asyncio
import json
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI(title="LLM Streaming Engine")

class ChatPrompt(BaseModel):
    prompt: str
    model: str = "gpt-4o-mini"

async def generate_token_stream(prompt: str) -> AsyncGenerator[str, None]:
    """
    Simulated async generator yielding Server-Sent Events formatted tokens.
    """
    try:
        # In real systems, replace with your LLM client:
        # async for chunk in await client.chat.completions.create(..., stream=True):
        words = f"Here is a generated response grounded in: {prompt}.".split()
        
        for word in words:
            await asyncio.sleep(0.08)  # simulate LLM inference latency
            payload = json.dumps({"token": f"{word} "})
            yield f"data: {payload}\n\n"
            
        # Signal completion with standard SSE termination
        yield "data: [DONE]\n\n"
        
    except asyncio.CancelledError:
        # Triggered when user cancels request or closes the browser tab
        print("Client disconnected mid-stream. Halting LLM inference.")
        raise
```

Notice the format: each message starts with `data: `, ends with `\n\n`, and terminates with `[DONE]`. This is standard EventSource formatting.

---

## 3. The Controller Endpoint

Now expose this generator via an HTTP POST endpoint using `StreamingResponse`:

```python
@app.post("/api/v1/chat/stream")
async def chat_stream_endpoint(request: Request, body: ChatPrompt):
    async def event_publisher():
        generator = generate_token_stream(body.prompt)
        try:
            async for chunk in generator:
                # Check if client has disconnected
                if await request.is_disconnected():
                    print("Client disconnected. Breaking generator loop.")
                    break
                yield chunk
        except Exception as exc:
            error_data = json.dumps({"error": str(exc)})
            yield f"event: error\ndata: {error_data}\n\n"

    return StreamingResponse(
        event_publisher(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # Disables proxy buffering in Nginx
        },
    )
```

> **Critical Header Note:** The `X-Accel-Buffering: no` header is essential if your FastAPI app sits behind an Nginx reverse proxy. Without it, Nginx buffers the chunks into 4KB blocks before forwarding them to the browser, completely ruining your real-time streaming effect.

---

## 4. Consuming the Stream in Modern Frontend (TypeScript)

On the client side, using the standard `fetch` API with `ReadableStreamDefaultReader` allows streaming POST requests with JSON payloads:

```typescript
async function streamCompletion(prompt: string, onToken: (token: string) => void) {
  const controller = new AbortController();

  try {
    const response = await fetch('/api/v1/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });

    if (!response.ok || !response.body) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6).trim();
          if (dataStr === '[DONE]') return;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.token) onToken(parsed.token);
          } catch {
            // Ignore malformed chunks
          }
        }
      }
    }
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.log('User cancelled stream');
    } else {
      console.error('Streaming failure:', error);
    }
  }
}
```

---

## 5. Preventing Leaked Tokens & Cost Explosions

One of the most dangerous bugs in AI engineering is failing to cancel downstream LLM requests when an end-user navigates away or presses "Stop Generating". If you don't cancel the underlying API call or background generator task, you continue paying for output tokens that no human will ever see.

Always test your disconnection logic by opening an active stream, immediately terminating the connection, and verifying in server logs that the inference task aborts immediately.

---

## Conclusion

Streaming is no longer an optional luxury for AI applications; it is the baseline expectation. By pairing FastAPI's `StreamingResponse` with asynchronous generators, proper SSE message delimiters, and Nginx proxy bypass headers, you can deliver instant, responsive, and resource-efficient AI applications.
