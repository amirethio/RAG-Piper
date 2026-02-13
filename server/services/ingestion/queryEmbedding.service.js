import { VoyageAIClient } from "voyageai";

const client = new VoyageAIClient({
  apiKey: process.env.VOYAGE_API_KEY,
});

export async function embedQuery(query) {
  const res = await client.embed({
    input: [query],
    model: "voyage-3.5",
  });

  return res.data[0].embedding;
}
