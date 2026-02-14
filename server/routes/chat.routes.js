import express from "express";
import { askQuestion } from "../controllers/chat.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { getHistoryHandler } from "../controllers/chatHistory.controller.js";

const router = express.Router();

//* ROUTES
router.post("/query", askQuestion);
router.get("/history", getHistoryHandler);
// router.get("/history", );

export default router;
