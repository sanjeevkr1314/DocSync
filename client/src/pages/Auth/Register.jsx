import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import { Input, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(0);
  const [otpSent, setOtpSent] = useState(0);
  const [resendOTP, setResendOTP] = useState(1);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const setErrorWithTimeout = (errorMessage) => {
    setError(errorMessage);

    // Set a timeout to reset the error after 10 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      setSendingOTP(true);
      const url = "http://localhost:8080/api/otp/send-otp-register";
      const res = await axios.post(url, data);

      if (res.data.success) {
        toast.success("OTP sent successfully, Please check your email.");
        setOtpSent(1);

        // Disable the "Send OTP" button for 30 seconds
        setResendOTP(0);

        setTimeout(() => {
          setResendOTP(1);
        }, 30000);
      } else {
        // console.log(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorWithTimeout(error.response.data.message);
      }
    }
    setSendingOTP(false);
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/otp/verify-otp";
      const res = await axios.post(url, data);

      if (res.data.success) {
        // console.log(res.data.message);
        toast.success("OTP verified successfully.");
        setIsVerified(1);
      } else {
        // console.log(res.data.message);
        setErrorWithTimeout("Invalid OTP, Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorWithTimeout(error.response.data.message);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth/register";
      const res = await axios.post(url, data);

      if (res.data.success) {
        toast.success("Registration Successful, Redirecting to Login Page...");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        // console.log(res.data.message);
        toast.error("Registration Failed, Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorWithTimeout(error.response.data.message);
        toast.error("Registration Failed");
      }
    }
  };

  return (
    <div>
      <div className="signup_form_container">
        <div className="signup_left">
          <h1>Already have an account?</h1>
          <Link to="/login">
            <button type="button" className="signup_white_btn">
              Login
            </button>
          </Link>
        </div>
        <div className="signup_right">
          <form
            className="signup_form_container2"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <h1>Create new account</h1>
            {isVerified ? (
              <>
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className="signup_input"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className="signup_input"
                />
                <div className="login_password_container" style={{display: "flex", flexDirection: "column"}}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className="login_input"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleTogglePassword}
                          style={{ width: "30px", height: "30px" }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {/* <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className="login_input"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleTogglePassword}
                          style={{ width: "30px", height: "30px" }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  /> */}
                </div>
                {error && <div className="signup_error_msg">{error}</div>}
                <button type="submit" className="signup_green_btn">
                  Register
                </button>
              </>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder="Enter your Email address"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="signup_input"
                  autoComplete="on"
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  }
                />
                {otpSent === 1 && (
                  <Input
                    type="text"
                    placeholder="Enter OTP sent to your email"
                    name="otp"
                    onChange={handleChange}
                    value={data.otp}
                    required
                    className="signup_input"
                  />
                )}

                {error && <div className="signup_error_msg">{error}</div>}

                {resendOTP === 1 && (
                  <button onClick={sendOTP} className="signup_green_btn">
                    {sendingOTP ? "Please wait" : "Send OTP"}
                  </button>
                )}

                {otpSent === 1 && (
                  <button onClick={verifyOTP} className="signup_green_btn">
                    Verify OTP
                  </button>
                )}
              </>
            )}
          </form>
        </div>
      </div>
      <ToastContainer
        style={{ width: "500px" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Register;
