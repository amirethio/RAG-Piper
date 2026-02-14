import {
  listDocuments,
  deleteDocumentsBySource,
} from "./../services/document.service.js";

export const getDocuments = async (req, res) => {
  try {
    const documents = await listDocuments();

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (err) {
    console.error("List documents failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch documents",
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { source } = req.body; 

    const deletedCount = await deleteDocumentsBySource(source);

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No documents found" });
    }

    res.json({ success: true, message: "Documents deleted", deletedCount });
  } catch (err) {
    console.error("Delete documents error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
