import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  embedding: { type: [Number], required: true },
  metadata: {
    source: String,
    page_number: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Document = mongoose.model("Document", DocumentSchema);
