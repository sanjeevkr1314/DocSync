import mongoose from "mongoose";
import mailSender from "../helpers/mailSender.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    // console.log("Sending email to: ", email);
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `
      <p>Dear Sir/Madam,</p>
      <p>Please use the OTP below to verify your email on Docsync.</p>
      <h3>${otp}</h3>
      <p>Please Note: This OTP is valid for 5 minutes and will expire after that.</p>

      <p>If you didn’t request this, you can ignore this email.</p>

      <p>Regards,</p>
      <p>DocSync Team</p>`
    );
    // console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    // console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  // console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
