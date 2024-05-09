import express from "express";
import {
  getAllUsersController,
  getAllDocumentsController,
  getSingleUserController,
  getRequestsController,
  acceptRequestController,
  deleteRequestController,
} from "../controllers/adminControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

// admin
router.get("/users/:userId", requireSignIn, isAdmin, getSingleUserController);
router.get(
  "/all-users/:adminId",
  requireSignIn,
  isAdmin,
  getAllUsersController
);
router.get(
  "/all-documents/:adminId",
  requireSignIn,
  isAdmin,
  getAllDocumentsController
);
router.get("/requests/:adminId", requireSignIn, isAdmin, getRequestsController);
router.put(
  "/requests/accept/:requestId",
  requireSignIn,
  isAdmin,
  acceptRequestController
);
router.delete(
  "/requests/delete/:requestId",
  requireSignIn,
  isAdmin,
  deleteRequestController
);

export default router;
