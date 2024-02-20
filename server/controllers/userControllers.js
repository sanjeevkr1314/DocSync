import User from "../models/userModel.js";
import Document from "../models/docModel.js";

// get all documents
export const getAllDocumentsUserController = async (req, res) => {
    try {
      const docs = await Document.find({ownerId: req.params.userId}).sort({ createdAt: "-1" });
      res.json(docs);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while fetching docs",
        error,
      });
    }
  };
  