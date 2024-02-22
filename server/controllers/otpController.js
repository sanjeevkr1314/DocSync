import otpGenerator from "otp-generator";
import OTP from "../models/otpModel.js";
import User from "../models/userModel.js";
import Joi from "joi";

const sendOTP = async (req, res) => {
  try {
    //validations
    const { error } = validateSendOTP(req.body.email);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { email } = req.body;
    // Checking if user is already present
    const checkUserPresent = await User.findOne({ email });

    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }

    // Generating OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  // Find the most recent OTP for the email

  //validations
  const { error } = validateVerifyOTP({email: req.body.email, otp: req.body.otp});
  if (error)
    return res.status(400).send({ message: error.details[0].message });

  const response = await OTP.find({ email: req.body.email })
    .sort({ createdAt: -1 })
    .limit(1);
  if (response.length === 0 || req.body.otp !== response[0].otp) {
    return res.status(400).json({
      success: false,
      message: "The OTP is not valid",
    });
  }
  res.status(200).json({
    success: true,
    message: "The OTP is valid",
  });
};

const validateSendOTP = (email) => {
  const schema = Joi.string().email().required().label("Email");
  return schema.validate(email);
};

const validateVerifyOTP = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    otp: Joi.string().required().label("OTP"),
  });
  return schema.validate(data);
};

export { sendOTP, verifyOTP };
