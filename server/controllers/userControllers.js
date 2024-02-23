import Document from "../models/docModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

// get all documents
export const getAllDocumentsUserController = async (req, res) => {
  try {
    const docs = await Document.find({ ownerId: req.params.userId }).sort({
      createdAt: "-1",
    });
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

// upload file
export const uploadController = async (req, res) => {
  try {
    // console.log(req.file.path);
    // console.log(req.body);
    const localFilePath = req.file.path;
    const response = await uploadOnCloudinary(localFilePath);
    if (response) {
      const ownerid = JSON.parse(req.body.owner)._id;

      const document = new Document({
        owner: req.body.owner,
        ownerId: ownerid,
        fileType: req.body.fileType,
        name: req.body.name,
        desc: req.body.desc,
        file: response,
      });

      const savedDoc = await document.save();

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        // savedDoc: savedDoc,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error uploading file to Cloudinary",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default uploadController;
