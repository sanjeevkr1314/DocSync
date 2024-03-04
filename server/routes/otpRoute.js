import express from "express";
import { sendOtpForgotPassword, sendOtpRegister, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();
router.post("/send-otp-register", sendOtpRegister);
router.post("/send-otp-forgot-password", sendOtpForgotPassword);
router.post("/verify-otp", verifyOTP);

export default router;
