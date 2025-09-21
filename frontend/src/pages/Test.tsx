import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Test() {
  const VITE_BACKEND_API_ENDPOINT = import.meta.env.VITE_BACKEND_API_ENDPOINT;
  const [messages, setMessages] = useState<any[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  async function handleClick() {
    if (isStreaming) return;

    setMessages([]);
    setIsStreaming(true);

    try {
      const response = await fetch(`${VITE_BACKEND_API_ENDPOINT}/api/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: "Start the process" }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Request failed: ${response.status}`);
      }

      // 1. Get the stream reader and text decoder
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // 2. Loop to read chunks from the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Add the new chunk to our buffer
        buffer += decoder.decode(value);

        // 3. Process complete lines (ending in '\n') from the buffer
        while (buffer.includes('\n')) {
          const newlineIndex = buffer.indexOf('\n');
          const line = buffer.substring(0, newlineIndex); // Get the message
          buffer = buffer.substring(newlineIndex + 1);    // Remove it from buffer

          if (line) { // Ensure the line is not empty
            const parsedData = JSON.parse(line);
            setMessages((prev) => [...prev, parsedData]);
          }
        }
      }
    } catch (error) {
      console.error("Stream failed:", error);
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Button onClick={handleClick} disabled={isStreaming}>
        {isStreaming ? "Streaming..." : "Start Simple POST Stream"}
      </Button>
      <div className="mt-4 w-full max-w-md p-4 border rounded-lg bg-gray-50">
        <h2 className="font-semibold mb-2">Stream Output:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="p-1">
              <pre className="text-sm">{JSON.stringify(msg)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}