import { VoyageAIClient } from "voyageai";

const client = new VoyageAIClient({
  apiKey: process.env.VOYAGE_API_KEY,
});

export async function embedDocuments(documents, options = {}) {
  const { retries = 3, delay = 1000 } = options;

  const texts = documents.map((d) => d.pageContent);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await client.embed({
        input: texts,
        model: "voyage-3.5",
      });

      return response.data.map((item, i) => ({
        text: texts[i],
        embedding: item.embedding,
        metadata: {
          source: documents[i].metadata?.source,
          page_number: documents[i].metadata?.loc?.pageNumber,
        },
      }));
    } catch (err) {
      if (attempt === retries) {
        throw err; 
      }

      console.warn(
        `[VoyageAI] embed failed attemptting`,
      );

      await new Promise(
        (res) => setTimeout(res, delay * attempt), 
      );
    }
  }
}
