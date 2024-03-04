import React, { useState } from "react";
import axios from "axios";
import { Input, InputAdornment, IconButton } from "@material-ui/core";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import OtpInput from "react-otp-input";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false); 
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const setErrorWithTimeout = (errorMessage) => {
    setError(errorMessage);

    // Set a timeout to reset the error after 10 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setSendingEmail(true);
    try {
      const url = "http://localhost:8080/api/otp/send-otp-forgot-password";
      const res = await axios.post(url, { email: email });

      if (res.data.success) {
        toast.success("OTP sent successfully, Please check your email.");
        setEmailSent(1);
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
    setSendingEmail(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/otp/verify-otp";
      const res = await axios.post(url, { email: email, otp: otp });

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

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth/reset-password";
      const res = await axios.post(url, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (res.data.success) {
        // console.log(res.data.message);
        toast.success(
          "Password reset successfully. Redirecting to Login Page."
        );
        setTimeout(() => {
          navigate(location.state || "/login");
        }, 2000);
      } else {
        // console.log(res.data.message);
        setErrorWithTimeout(res.data.message);
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

  return (
    <div className="main_container">
      <div className="forgot_password_left">
        <h1>Forgot Your Password?</h1>
      </div>
      <div className="forgot_password_right">
        {isVerified ? (
          <>
            <form className="forgot_form_container2" onSubmit={handlePasswordReset}>
              <h2>Enter New Password</h2>
              <p>
                Password must contain at
                least 8 characters.
              </p>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="forgot_password_input"
                autoComplete="on"
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
                      style={{ width: "60px", height: "30px" }}
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
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                className="forgot_password_input"
                autoComplete="on"
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
                      style={{ width: "60px", height: "30px" }}
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
              {error && <div className="forgot_error_msg">{error}</div>}
              <Button variant="contained" type="submit" className="submit_button">
                Continue
              </Button>
            </form>
            
          </>
        ) : emailSent ? (
          <>
            <form className="forgot_form_container2" onSubmit={handleVerifyOTP}>
              <h2>Enter OTP</h2>  
              <p>
                Enter the OTP sent to your email address. This OTP is valid for
                5 minutes.
              </p>
              <OtpInput
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "1rem ",
                }}
                value={otp}
                onChange={setOtp}
                numInputs={6}
                //   renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
              {error && <div className="signup_error_msg">{error}</div>}
              <Button variant="contained" type="submit" className="submit_button">
                <span>Verify & Proceed</span>
              </Button>
              <p>
                Didn't receive the OTP?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setEmailSent(false)}
                >
                  Resend
                </span>
              </p>
            </form>
          </>
        ) : (
          <>
            <form className="forgot_form_container2" onSubmit={handleSendOTP}>
              <h2>E-Mail Address Here</h2>
              <p>Enter the email address associated with your account.</p>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
                className="forgot_password_input"
                autoComplete="on"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                }
              />
              {error && <div className="signup_error_msg">{error}</div>}
              <Button type="submit" variant="contained" className="submit_button" endIcon={<SendIcon />}>
                {sendingEmail ? (
                  <span>Sending...</span>
                ) : (
                  <span>Send Email</span>
                )}
              </Button>
            </form>
          </>
        )}
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

export default ForgotPassword;
