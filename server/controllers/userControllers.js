import Document from "../models/docModel.js";
import User from "../models/userModel.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";

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

// get all admins
export const getAllAdminsController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const admins = await User.find({
      role: 1,
      _id: {
        $nin: [...user.yourAdmins, ...user.connectionRequestsSent], // Exclude admins in yourAdmins and connectionRequestsSent
      },
    });
    res.json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching admins",
      error,
    });
  }
};

// get my admins
export const getMyAdminsController = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const admins = [];
    for (let i = 0; i < user.yourAdmins.length; i++) {
      const admin = await User.findById(user.yourAdmins[i]);
      admins.push(admin);
    }
    res.json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching my admins",
      error,
    });
  }
};

// connect admin
export const connectAdminController = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const admin = await User.findById(req.body.adminId);
    if (admin && user) {
      admin.connectionRequestsReceived.push(user._id);
      user.connectionRequestsSent.push(admin._id);
      await admin.save();
      await user.save();
      res.json({
        success: true,
        message: "Connection request sent successfully",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while connecting admin",
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
        sharedWithId: req.body.adminId,
        sharedWithEmail: req.body.adminEmail,
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

// update document
export const updateDocumentController = async (req, res) => {
  try {
    const doc = await Document.findOneAndUpdate(
      { _id: req.params.documentId },
      {
        name: req.body.name,
        desc: req.body.desc,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      doc: doc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete document
export const deleteDocumentController = async (req, res) => {
  try {
    const docToDelete = await Document.findById(req.params.documentId);
    const publicId = docToDelete.file.public_id;
    const response = await deleteFromCloudinary(publicId);
    // console.log(response);

    if (response.result === "ok") {
      const doc = await Document.findByIdAndDelete(req.params.documentId);
      res.status(200).json({
        success: true,
        message: "Document deleted successfully",
        doc: doc,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error deleting file from Cloudinary",
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
