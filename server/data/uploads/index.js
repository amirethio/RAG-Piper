import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from "dotenv";
import { VoyageAIClient } from "voyageai";
import { Document } from "./model/dataSchema.js";
import { connectDB, disconnectDB } from "./config/db.config.js";
import { GoogleGenAI } from "@google/genai";

dotenv.config({});
let VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;

// txt file loader

// let loader = new TextLoader("./data/sample.txt");

// PDF file loader
const nike10kPdfPath = "./data/CSEC_ASTU_Info_Summary.pdf";

let loader = new PDFLoader(nike10kPdfPath);

const docs = await loader.load();

// console.log(docs);

/*
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

async function loadFiles(filePaths) {
  let allDocs = [];

  for (const path of filePaths) {
    let docs;

    if (path.endsWith(".csv")) {
      docs = await new CSVLoader(path).load();
    } else if (path.endsWith(".pdf")) {
      docs = await new PDFLoader(path).load();
    } else if (path.endsWith(".txt")) {
      docs = await new TextLoader(path).load();
    } else {
      throw new Error(`Unsupported file type: ${path}`);
    }

    allDocs.push(...docs);
  }

  return allDocs;
}

*/

// txt files
// pdf files
// and later the webite content

// SPlliting the text

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 400,
  chunkOverlap: 50,
  separators: ["\n\n", "\n", ". ", " ", ""],
});

// Chunk 1 → Paragraph A (300) ✅ fits
// Next: Chunk 2 → Paragraph B (260) ✅ fits
// Paragraph C = 900 ❌ too big → can’t fithunkOverlap: -> try line break if fit chuck else try, sentences (.),

let documents = await splitter.splitDocuments(docs);

// preparing for good input of voyag ai

const texts = documents.map((data) => data.pageContent);

// EMbeding with the models

const client = new VoyageAIClient({ apiKey: VOYAGE_API_KEY });

// const response = await client.embed({
//   input: texts,
//   model: "voyage-3.5",
// });

// const embeddings = response.data.map((item, i) => ({
//   text: texts[i],
//   embedding: item.embedding,
//   metadata: {
//     source: documents[i].metadata.source,
//     page_number: documents[i].metadata.loc.pageNumber,
//   },
// }));

// console.log(embeddings);

// setting to the database or storing the vecores

export const storeEmbeddings = async (embeddings) => {
  try {
    await connectDB();
    const result = await Document.insertMany(embeddings);
    console.log(`✅ Saved ${result.length} documents`);

    await disconnectDB();
  } catch (err) {
    console.error("❌ Error storing embeddings:", err);
  }
};
// storeEmbeddings(embeddings);




// now lets accpt inputs and embed then search

const userQuery = "give me all info about the club";

export async function embedQuery(userQuery) {
  try {
    const res = await client.embed({
      input: [userQuery], // array of one query
      model: "voyage-3.5", // same model as documents
    });

    return res.data[0].embedding; // vector
  } catch (err) {
    console.error("Error embedding query:", err);
  }
}

const queryEmbedding = await embedQuery(userQuery);

await connectDB();
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
await disconnectDB();

// preparing for the injestion format

let rag_context = results.map((doc) => doc.text).join("\n\n");

const prompt = `You are an expert assistant for the CSEC ASTU community. 
Use the following context to answer the user’s question accurately and concisely. 
Do not include information not present in the context 


context:${rag_context} \n\n
userquestion:${userQuery}

Instructions:
- Provide a clear, informative answer.
- If the answer is not in the context, respond: "Sorry, I don't have that information."
- Maintain a professional and friendly tone.

Answer:
`;

// console.log(rag_retived);

//  finally sending to gemini

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
}

main();


// Modern 2026 Imports
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text"; 
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenAI } from "@google/genai";
// ... your other imports