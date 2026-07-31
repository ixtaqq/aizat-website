"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does Aizat know?",
  "Tell me about his experience",
  "What projects has he built?",
  "How can I reach him?",
];

export function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Aizat's AI assistant. Ask me anything about his background, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setStreaming(true);
    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...history, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") break;
          let parsed: { text?: string; error?: string };
          try {
            parsed = JSON.parse(payload);
          } catch {
            continue; // skip malformed lines
          }
          if (parsed.error) {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: "Sorry, something went wrong. Please try again.",
              };
              return updated;
            });
            continue;
          }
          if (parsed.text) {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                updated[updated.length - 1] = { ...last, content: last.content + parsed.text };
              }
              return updated;
            });
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Sorry, something went wrong. Please try again." };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="chatapp">
      <div className="chatlog">
        {messages.map((m, i) => (
          <div key={i} className={`chatmsg ${m.role}`}>
            {m.content || "…"}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {messages.filter((m) => m.role === "user").length === 0 && (
        <div className="chatsug">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}
      <form className="chatform" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Aizat…"
          disabled={streaming}
        />
        <button type="submit" disabled={!input.trim() || streaming}>
          Send
        </button>
      </form>
    </div>
  );
}
