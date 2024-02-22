import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
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
        setError(error.response.data.message);
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
            <h1>Create Account</h1>
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
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="signup_input"
              autoComplete="on"
            />
            <input
              type="password"
              placeholder="Password"
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
