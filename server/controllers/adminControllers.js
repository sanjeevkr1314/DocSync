import User from "../models/userModel.js";
import Document from "../models/docModel.js";

// get single user
export const getSingleUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const response = {};
    response.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
    response.documents = await Document.find({ 
      ownerId: userId,
      sharedWithId: req.user._id
    }).sort({ createdAt: "-1" });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching user",
      error,
    });
  }
};

// get all users
export const getAllUsersController = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const admin = await User.findById(adminId);
    const users = [];
    for (let i = 0; i < admin.yourUsers.length; i++) {
      const user = await User.findById(admin.yourUsers[i]);
      users.push(user);
    }
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

// get all documents
export const getAllDocumentsController = async (req, res) => {
  try {
    const { adminId } = req.params;
    const docs = await Document.find({
      sharedWithId: adminId,
    }).sort({ createdAt: "-1" });
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

// get requests
export const getRequestsController = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await User.findById({ _id: adminId });
    const requests = admin.connectionRequestsReceived;
    const requestsData = [];
    for (let i = 0; i < requests.length; i++) {
      const user = await User.findById({ _id: requests[i] });
      requestsData.push(user);
    }
    // console.log(requestsData);
    res.json(requestsData);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching requests",
      error,
    });
  }
};

// accept request
export const acceptRequestController = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminId } = req.body;
    const admin = await User.findById({ _id: adminId });
    const user = await User.findById({ _id: requestId });
    admin.yourUsers.push(user._id);
    user.yourAdmins.push(admin._id);
    admin.connectionRequestsReceived = admin.connectionRequestsReceived.filter(
      (id) => id.toString() !== user._id.toString()
    );
    await admin.save();
    await user.save();
    res.json({ message: "Request Accepted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while accepting request",
      error,
    });
  }
};

// delete request
export const deleteRequestController = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminId } = req.body;
    const admin = await User.findById({ _id: adminId });
    admin.connectionRequestsReceived = admin.connectionRequestsReceived.filter(
      (id) => id.toString() !== requestId.toString()
    );
    await admin.save();
    res.json({ message: "Request Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting request",
      error,
    });
  }
};
