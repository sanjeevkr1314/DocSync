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
import {
  getAllDocumentsUserController,
  uploadController,
} from "../controllers/userControllers.js";

//router object
const router = express.Router();

//routing
router.post("/register", registerController);
router.post("/login", loginController);

//protected User route auth (helps in frontend private routes)
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth (helps in frontend private routes)
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// admin
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);
router.get("/all-documents", requireSignIn, isAdmin, getAllDocumentsController);
router.put(
  "/user-status/:userId",
  requireSignIn,
  isAdmin,
  userStatusController
);

// user
router.post(
  "/upload",
  requireSignIn,
  isApproved,
  upload.single("uploadedFile"),
  uploadController
);
router.get(
  "/documents/:userId",
  requireSignIn,
  isApproved,
  getAllDocumentsUserController
);

export default router;
