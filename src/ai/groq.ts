
/**
 * Minimal client for Groq's OpenAI-compatible Chat Completions API.
 * The key is read on the server only and never reaches the browser.
 * Docs: https://console.groq.com/docs/openai
 */
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-120b";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function groqChat(messages: ChatMessage[], options: { maxTokens?: number; temperature?: number } = {}): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY ist nicht gesetzt.");

  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;
  // gpt-oss models think before answering. Keep the thinking short and leave
  // enough token budget for it, otherwise the visible answer can come back empty.
  const isReasoningModel = model.startsWith("openai/gpt-oss");

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      max_completion_tokens: options.maxTokens ?? (isReasoningModel ? 1200 : 400),
      temperature: options.temperature ?? 0.5,
      ...(isReasoningModel && { reasoning_effort: "low", include_reasoning: false }),
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    // 429 = free-tier rate limit reached; the chat shows a friendly fallback.
    throw new Error(`Groq API Fehler ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  // Some models (e.g. Qwen) put their thinking in <think> tags inside the answer.
  const text = data.choices?.[0]?.message?.content?.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  if (!text) throw new Error("Leere Antwort von Groq.");
  return text;
}
