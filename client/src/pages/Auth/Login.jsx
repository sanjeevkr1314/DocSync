import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Input, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();
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

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth/login";
      const res = await axios.post(url, data);

      if (res.data.success) {
        toast.success("Login Successful, Redirecting to Home Page...");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 2000);
      } else {
        // console.log(res.data.message);
        toast.error("Login Failed, Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorWithTimeout(error.response.data.message);
        // toast.error("Login Failed, Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="login_form_container">
        <div className="login_left">
          <form
            className="login_form_container2"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <h1>Login to Your Account</h1>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="login_input"
              autoComplete="on"
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              }
            />
            <div className="login_password_container">
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
                      style={{ width: "60px", height: "30px"}}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            {error && <div className="login_error_msg">{error}</div>}
            <button type="submit" className="login_green_btn">
              Log In
            </button>
            <Link to="/forgot-password" className="forgot">Forgot password?</Link>
          </form>
        </div>
        <div className="login_right">
          <h1>New Here ?</h1>
          <Link to="/register">
            <button type="button" className="login_white_btn">
              Register
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer
        style={{ width: "500px" }}
        position="top-right"
        autoClose={2000}
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

export default Login;
