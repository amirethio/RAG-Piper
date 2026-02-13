import { VoyageAIClient } from "voyageai";
import { GoogleGenAI } from "@google/genai";
import { Document } from "./../../models/Document.model.js";

const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const client = new VoyageAIClient({ apiKey: VOYAGE_API_KEY });
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const chatService = async (question) => {
  try {
    const embedRes = await client.embed({
      input: [question],
      model: "voyage-3.5",
    });
    const queryEmbedding = embedRes?.data[0]?.embedding;

    // vector search in atlas database
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

    // building the prompt for gemini
    const ragContext = results.map((doc) => doc.text).join("\n\n");
    const prompt = `You are an expert assistant for the 
Use the following context to answer the user’s question accurately and concisely. 
Do not include information not present in the context.

Context:
${ragContext}

User question:
${question}

Instructions:
- Provide a clear, informative answer.
- If the answer is not in the context, respond: "Sorry, I don't have that information."
- Maintain a professional and friendly tone.

Answer:
`;

    // calling  the gemini  api
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (err) {
    console.error("Chat service error:", err);
    throw new Error("Failed to process question");
  }
};
