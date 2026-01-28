import type { AiStreamParams } from "../types/ai";
import { coreFetch } from "./coreApi";
/**
 * AI Specific function dealing with streaming of response
 * buffer, textReader and decoder are used to handle responses
 */
export const streamAi = async ({
  prompt,
  financialData,
  model = "gpt-3.5-turbo",
  temperature = 0.7,
  onToken,
  onError,
  signal,
}: AiStreamParams) => {
  const fullPrompt = financialData
    ? `User Financial Info: ${JSON.stringify(financialData)}\n\nQuestion: ${prompt}`
    : prompt;

  try {
    const response = await coreFetch({
      path: "/chat/completions",
      method: "POST",
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You help users write concise, empathetic, and realistic descriptions based on user data.",
          },
          { role: "user", content: fullPrompt },
        ],
        temperature,
        stream: true,
      }),
      signal,
    });

    if (!response.body) throw new Error("No response body from AI");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const jsonStr = line.replace(/^data: /, "").trim();
        if (jsonStr === "[DONE]") continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const token = parsed.choices[0].delta?.content;
          if (token) onToken(token);
        } catch {
          // Streaming chunks may contain incomplete JSON
          // Safe to ignore until full chunk arrives
        }
      }
    }
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      // Request was aborted, notify component
      if (onError) onError("aiInfo.requestAborted");
    } else if (err instanceof Error) {
      // Standard JS error, notify component
      if (onError) onError(err.message || "aiInfo.requestFailed");
      throw err; // optional: rethrow if you want caller to know
    } else {
      // Unknown type, notify component
      if (onError) onError("aiInfo.unknownError");
      throw new Error("AI streaming failed with unknown error");
    }
  }
};
