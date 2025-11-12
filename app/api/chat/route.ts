// app/api/chat/route.ts
import { GoogleGenAI, Content, Part, PartListUnion } from "@google/genai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({});

function loadProfile() {
  const filePath = path.join(process.cwd(), "knowledge", "profile.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw); // Array of {title, content}
}

function getFullContext(profileData: { title: string; content: string }[]) {
  return profileData.map((d) => `${d.title}:\n${d.content}`).join("\n\n");
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function convertToGeminiContent(messages: ChatMessage[]): Content[] {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };
    if (!messages || messages.length === 0)
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );

    const profileData = loadProfile();
    const contextText = getFullContext(profileData);

    // Updated system message: reference info, but allow normal AI responses
    const systemMessage: ChatMessage = {
      role: "user",
      content: `You are Pawan Sachdeva's AI assistant. 
You can use the following information to help answer questions, but if the question is unrelated, answer normally.\n\n${contextText}`,
    };

    const allMessages: ChatMessage[] = [systemMessage, ...messages];
    const contents = convertToGeminiContent(allMessages);

    const lastContent = contents[contents.length - 1];
    const history = contents.slice(0, -1);

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history,
    });

    const messageToSend: PartListUnion = lastContent.parts as Part[];

    const resultStream = await chat.sendMessageStream({
      message: messageToSend,
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of resultStream) {
          const text = chunk.text;
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
