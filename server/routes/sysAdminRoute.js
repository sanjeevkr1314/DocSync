import express from "express";
import {
  getAllAdminsControllerSys,
  getAllDocumentsControllerSys,
  getAllUsersControllerSys,
} from "../controllers/sysAdminControllers.js";
import { isSysAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

// system admin
router.get(
  "/all-documents",
  requireSignIn,
  isSysAdmin,
  getAllDocumentsControllerSys
);

router.get("/all-users", requireSignIn, isSysAdmin, getAllUsersControllerSys);
router.get("/all-admins", requireSignIn, isSysAdmin, getAllAdminsControllerSys);

export default router;
