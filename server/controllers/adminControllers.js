import User from "../models/userModel.js";
import Document from "../models/docModel.js";

// get all users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: "-1" });
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

// user status controller
export const userStatusController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const users = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating User",
      error,
    });
  }
};

// get all documents
export const getAllDocumentsController = async (req, res) => {
  try {
    const docs = await Document.find({}).sort({ createdAt: "-1" });
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
