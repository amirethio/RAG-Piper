import { getRecentChats } from "./../services/chat/chat.service.js";

export async function getHistoryHandler(req, res) {
  try {
    const userId = req.user?.id;
    const limit = Number(req.query.limit) || 10;
    const chats = await getRecentChats({ userId, limit });

    res.status(200).json(chats.reverse());
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chat history" });
  }
}
