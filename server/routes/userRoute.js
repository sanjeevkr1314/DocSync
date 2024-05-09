import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  connectAdminController,
  deleteDocumentController,
  getAllAdminsController,
  getAllDocumentsUserController,
  getMyAdminsController,
  updateDocumentController,
  uploadController,
} from "../controllers/userControllers.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

// user
router.post(
  "/upload",
  requireSignIn,
  upload.single("uploadedFile"),
  uploadController
);
router.get("/all-admins", requireSignIn, getAllAdminsController);
router.get("/my-admins/:userId", requireSignIn, getMyAdminsController);
router.post("/connect-admin", requireSignIn, connectAdminController);
router.get(
  "/documents/:userId",
  requireSignIn,
  getAllDocumentsUserController
);
router.patch(
  "/documents/:documentId",
  requireSignIn,
  updateDocumentController
);
router.delete(
  "/documents/:documentId",
  requireSignIn,
  deleteDocumentController
);

export default router;
