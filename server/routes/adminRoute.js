import express from "express";
import {
  getAllUsersController,
  userStatusController,
  getAllDocumentsController,
  getSingleUserController,
} from "../controllers/adminControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

// admin
router.get("/user/:userId", requireSignIn, isAdmin, getSingleUserController);
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);
router.get("/all-documents", requireSignIn, isAdmin, getAllDocumentsController);
router.put(
  "/user-status/:userId",
  requireSignIn,
  isAdmin,
  userStatusController
);

export default router;