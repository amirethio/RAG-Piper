import { Document } from "./../models/Document.model.js";

export const listDocuments = async () => {
  const docs = await Document.aggregate([
    {
      $group: {
        _id: "$metadata.source", 
        count: { $sum: 1 },
        createdAt: { $min: "$createdAt" },
        lastUpdated: { $max: "$createdAt" }, 
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  return docs.map((d) => ({
    name: d._id.split("/").pop(), 
    source: d._id,
    chunkCount: d.count,
    createdAt: d.createdAt,
    lastUpdated: d.lastUpdated,
  }));
};



const deleteDocument = async (source) => {
  const result = await Chunk.deleteMany({ "metadata.source": source });
  return result.deletedCount;
};
