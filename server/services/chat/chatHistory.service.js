import { ChatMessage } from "../../models/ChatMessage.model.js";

export async function saveChatMessage({
  userId,
  question,
  answer,
  sources = [],
}) {
  return ChatMessage.create({
    userId,
    question,
    answer,
    sources,
  });
}

export async function getChatHistory(userId, limit = 20) {
  return ChatMessage.find({ userId }).sort({ createdAt: -1 }).limit(limit);
}
