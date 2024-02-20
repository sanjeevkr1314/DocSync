import { Document } from "mongoose";

// get file
export const getFileController = async (req, res) => {
  try {
    const { fileId } = req.params;
    const document = await Document.findById(fileId);
    if (document) {
      const file = document.file;
      res.status(200).json({
        success: true,
        message: "File found",
        file: file,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}