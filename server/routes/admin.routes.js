import express from "express";
import { upload } from "./../middleware/upload.middleware.js";
import { uploadDocument } from "./../controllers/admin.controller.js";

const router = express.Router();

//* ROUTES
router.post("/upload", upload.array("files", 10), uploadDocument);

export default router;
