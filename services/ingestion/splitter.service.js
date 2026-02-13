import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 600,
  chunkOverlap: 60,
  separators: ["\n\n", "\n", ". ", " ", ""],
});

export async function splitDocuments(docs) {
  return splitter.splitDocuments(docs);
}
