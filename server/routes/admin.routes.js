import express from "express";
import { upload } from "./../middleware/upload.middleware.js";
import { uploadDocument } from "./../controllers/admin.controller.js";
import { getDocuments } from "./../controllers/document.controller.js";

const router = express.Router();

//* ROUTES
router.post("/upload", upload.array("files", 10), uploadDocument);
router.get("/documents", getDocuments);

export default router;
