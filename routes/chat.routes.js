import express from "express";
import { askQuestion } from "../controllers/chat.controller.js";

const router = express.Router();

//* ROUTES
router.post("/query", askQuestion);

export default router;
