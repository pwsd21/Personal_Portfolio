interface ChatMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };
    const userMessage = messages.map((m) => m.content).join("\n");

    const model = "google/flan-t5-small"; // free model
    const res = await fetch(
      `https://router.huggingface.co/hf-inference/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: userMessage,
          parameters: { max_new_tokens: 150 },
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
    console.error("HF API returned error:", text);
      throw new Error("HF API Error");
    }

    const data = await res.json();
    const reply =
      data[0]?.generated_text || "Sorry, I could not generate a response.";

    return new Response(JSON.stringify({ answer: reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return new Response(JSON.stringify({ error: "Error processing request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
