import { chatService } from "./../services/chat/chat.service.js";

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // Call the service to get answer
    const answer = await chatService(question);

    res.status(200).json({
      success: true,
      question,
      answer,
    });
  } catch (error) {
    // console.error("Chat error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
