import { adminService } from "./../services/admin.service.js";
import { loadFile } from "./../services/ingestion/loader.service.js";
import { splitDocuments } from "../services/ingestion/splitter.service.js";
import { embedDocuments } from "../services/ingestion/embedding.service.js";
import { storeEmbeddings } from "../services/ingestion/vectorStore.service.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePaths = req.files.map((file) => file.path);

    //* load the document
    const loadDoc = await loadFile(filePaths);
    console.log("load the document");

    // * split the document
    const splitDoc = await splitDocuments(loadDoc);
    console.log("split the document");

    // *embed the document
    const embedDoc = await embedDocuments(splitDoc);
    console.log("embed the document");

    //* store in db
    await storeEmbeddings(embedDoc);
    console.log("store in db");

    res
      .status(200)
      .json({ sucess: true, message: "File processed successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
};
