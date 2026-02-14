import { VoyageAIClient } from "voyageai";
import { GoogleGenAI } from "@google/genai";
import { Document } from "./../../models/Document.model.js";
import { ChatMessage } from "../../models/ChatMessage.model.js";
import fetch from "node-fetch"; // needed for HF calls

const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const HF_API_KEY = process.env.HF_API_KEY;
const HF_EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const HF_ROUTER = "https://router.huggingface.co/api/models";

const client = new VoyageAIClient({ apiKey: VOYAGE_API_KEY });
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const chatService = async (question, userId) => {
  try {
    // 1️⃣ Generate embedding for query
    const embedRes = await client.embed({
      input: [question],
      model: "voyage-3.5",
    });
    const queryEmbedding = embedRes?.data[0]?.embedding;
    console.log("Finished embedding, next: vector search");

    // 2️⃣ Vector search in MongoDB Atlas
    const results = await Document.aggregate([
      {
        $vectorSearch: {
          index: "embedding_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 150,
          limit: 3,
        },
      },
    ]);

    // 3️⃣ Build the prompt for RAG
    const ragContext = results.map((doc) => doc.text).join("\n\n");
    const prompt = `You are an expert assistant.
Use the following context to answer the user’s question accurately and concisely. 
Do not include information not present in the context and if they ask you general things like greetings respond appropriately.

Context:
${ragContext}

User question:
${question}

Instructions:
- Provide a clear, informative answer.
- If the answer is not in the context, respond: "Sorry, I don't have that information."
- Maintain a professional and friendly tone.
- always answer very shortly and presisely enough to rag model integarated chatboth assistance

Answer:
`;

    // 4️⃣ ==================== Gemini call (commented out) ====================
    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: prompt,
    // });
    //
    // await ChatMessage.create({
    //   question,
    //   answer: response.text,
    //   questionId: response?.responseId,
    //   userId: response?.user?.id,
    // });
    //
    // return response.text;

    // 5️⃣ ==================== Hugging Face replacement ====================
    const HF_MODEL = "deepseek-ai/DeepSeek-V3-0324"; // example working model

    const res = await fetch(
      `https://router.huggingface.co/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: HF_MODEL,
          messages: [
            { role: "system", content: "You are an expert assistant." },
            { role: "user", content: prompt },
          ],
        }),
      },
    );

    if (res.status === 429) {
      const answer =
        "Sorry, the AI service quota is exhausted. Please try again later.";
      await ChatMessage.create({ question, answer, userId });
      return answer;
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HF API error: ${errText}`);
    }

    const data = await res.json();
    const answer = data?.choices?.[0]?.message?.content;

    // Save the HF response in Mongo, like Gemini
    await ChatMessage.create({
      question,
      answer: answer || "Sorry, I couldn't generate an answer.",
      questionId: undefined, // HF does not return responseId
      userId,
    });

    return answer || "Sorry, I couldn't generate an answer.";
  } catch (err) {
    console.error("Chat service error:", err);
    throw new Error("Failed to process question");
  }
};

export async function getRecentChats({ userId, limit = 10 }) {
  const query = userId ? { userId } : {};
  return ChatMessage.find(query).sort({ createdAt: -1 }).limit(limit).lean();

}
