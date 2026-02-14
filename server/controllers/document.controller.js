import {listDocuments} from "./../services/document.service.js";

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
