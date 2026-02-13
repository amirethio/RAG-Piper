import { Document } from "../../models/Document.model.js";

export async function storeEmbeddings(embeddings) {
  return Document.insertMany(embeddings);
}
