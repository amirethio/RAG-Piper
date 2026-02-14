import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    questionId: {
      type: String, 
    },
  },
  { timestamps: true },
);

export const ChatMessage = mongoose.model("ChatMessage", ChatSchema);
