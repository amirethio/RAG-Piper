import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateRagAnswer(contextDocs, userQuery) {
  const context = contextDocs.map((d) => d.text).join("\n\n");

  const prompt = `
You are an expert assistant for 
Use the following context to answer the user’s question accurately.
Do not add information not present in the context.

Context:
${context}

Question:
${userQuery}

If the answer is not in the context, say:
"Sorry, I don't have that information."
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
