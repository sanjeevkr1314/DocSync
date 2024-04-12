import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteDocumentController,
  getAllDocumentsUserController,
  updateDocumentController,
  uploadController,
} from "../controllers/userControllers.js";
import {
  requireSignIn,
  isApproved,
} from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

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
router.patch(
  "/documents/:documentId",
  requireSignIn,
  isApproved,
  updateDocumentController
);
router.delete(
  "/documents/:documentId",
  requireSignIn,
  isApproved,
  deleteDocumentController
);

export default router;