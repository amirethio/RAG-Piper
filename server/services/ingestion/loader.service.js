import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";

export const loadFile = async (filePaths) => {
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
};
