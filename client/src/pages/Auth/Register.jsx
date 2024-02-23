import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    otp: "",
  });
  const [isVerified, setIsVerified] = useState(0);
  const [otpSent, setOtpSent] = useState(0);
  const [resendOTP, setResendOTP] = useState(1);
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
      const url = "http://localhost:8080/api/otp/send-otp";
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
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className="signup_input"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className="signup_input"
                />
                <input
                  type="password"
                  placeholder="Create a strong password for your account"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="signup_input"
                />
                {error && <div className="signup_error_msg">{error}</div>}
                <button type="submit" className="signup_green_btn">
                  Register
                </button>
              </>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your Email address"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="signup_input"
                  autoComplete="on"
                />
                {otpSent === 1 && (
                  <input
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
                    Send OTP
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
