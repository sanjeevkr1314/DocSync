import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import otpRoute from "./routes/otpRoute.js";

dotenv.config();
const app = express();
// database connection
connectDB();

// middlewares
app.use(express.json({limit: "50mb"}));
app.use(urlencoded({ extended: true, limit: "50mb" }));  // for parsing form data 
app.use(cors({origin: 'http://localhost:5173'}));

// routes
app.use("/api/auth", authRoute);
app.use("/api/otp", otpRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my app</h1>");
});

const PORT = process.env.PORT || 8080;
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
