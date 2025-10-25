// app/api/chat/route.ts

import { GoogleGenAI, Content, Part, PartListUnion } from "@google/genai";
import { NextResponse } from "next/server"; // Use NextResponse for JSON responses

// Initialize the GoogleGenAI client.
// It will automatically pick up the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({});

interface ChatMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

// Convert the client-side messages format to the Gemini API's Content format
function convertToGeminiContent(messages: ChatMessage[]): Content[] {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : m.role, // Gemini uses "model" for assistant
    parts: [{ text: m.content }],
  }));
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    // 1. **ERROR FIX: Handle the case where no messages are provided**
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const contents = convertToGeminiContent(messages);

    // 2. **ERROR FIX: Safely extract the last user message Content**
    const lastContent = contents[contents.length - 1];

    // The chat history is all contents *before* the last one
    const history = contents.slice(0, -1);

    // Use a chat session to maintain history
    const chat = ai.chats.create({
      model: "gemini-2.5-flash", // A good model for chat
      // Pass the history as Content[]
      history: history,
    });

    // 3. **ERROR FIX: The `message` parameter must be a `PartListUnion`,
    //    which is satisfied by `Part[]` or a string/Part/File, but in a stream
    //    it's safest to pass the Part array from the last message's content.**
    const messageToSend: PartListUnion = lastContent.parts as Part[];

    // Stream the response
    const resultStream = await chat.sendMessageStream({
      message: messageToSend,
    });

    // Create a readable stream from the Gemini stream
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        // Iterate through the stream and enqueue the text parts
        for await (const chunk of resultStream) {
          const text = chunk.text;
          if (text) {
            // Encode the chunk and enqueue it
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    // Return the stream as a standard Response
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Use NextResponse for a structured JSON error response
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
