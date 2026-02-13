import { VoyageAIClient } from "voyageai";

const client = new VoyageAIClient({
  apiKey: process.env.VOYAGE_API_KEY,
});

export async function embedDocuments(documents) {
  const texts = documents.map((d) => d.pageContent);

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
}
