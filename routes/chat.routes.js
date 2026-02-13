import express from "express";
import { chatService } from "../services/chat/chat.service.js";


const router = express.Router();

//* ROUTES
router.post("/query", chatService);

export default router;
