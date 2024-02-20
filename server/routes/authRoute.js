import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import {
  getAllUsersController,
  userStatusController,
  getAllDocumentsController,
} from "../controllers/adminControllers.js";
import {
  isAdmin,
  requireSignIn,
  isApproved,
} from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/multer.middleware.js";
import uploadController from "../controllers/uploadController.js";
import { getFileController } from "../controllers/getFileController.js";
import { getAllDocumentsUserController } from "../controllers/userControllers.js";

//router object
const router = express.Router();

//routing
router.post("/register", registerController);
router.post("/login", loginController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// users admin
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);
// documents admin
router.get(
  "/all-documents",
  requireSignIn,
  isApproved,
  getAllDocumentsController
);

// user status update
router.put(
  "/user-status/:userId",
  requireSignIn,
  isAdmin,
  userStatusController
);

// upload file
router.post("/upload", upload.single("uploadedFile"), uploadController);

// document user
router.get(
  "/documents/:userId",
  requireSignIn,
  isApproved,
  getAllDocumentsUserController
);

// get file
router.get("/get-file/:fileId", getFileController);

export default router;
