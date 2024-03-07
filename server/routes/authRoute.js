import express from "express";
import {
  registerController,
  loginController,
  resetPasswordController,
} from "../controllers/authController.js";
import {
  isAdmin,
  requireSignIn
} from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

//routing
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/reset-password", resetPasswordController);

//protected User route auth (helps in frontend private routes)
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth (helps in frontend private routes)
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
