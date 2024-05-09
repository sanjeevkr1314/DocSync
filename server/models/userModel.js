import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    yourAdmins: {
      type: Array,
      default: [],
    },
    yourUsers: {
      type: Array,
      default: [],
    },
    connectionRequestsSent: {
      type: Array,
      default: [],
    },
    connectionRequestsReceived: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "6h",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

export default User;
