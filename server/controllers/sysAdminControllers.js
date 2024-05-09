import User from "../models/userModel.js";
import Document from "../models/docModel.js";

// get all documents
export const getAllDocumentsControllerSys = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching documents",
      error,
    });
  }
};

// get all users
export const getAllUsersControllerSys = async (req, res) => {
  try {
    const users = await User.find({ role: 0 });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

// get all admins
export const getAllAdminsControllerSys = async (req, res) => {
  try {
    const users = await User.find({ role: 1 });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching admins",
      error,
    });
  }
};
