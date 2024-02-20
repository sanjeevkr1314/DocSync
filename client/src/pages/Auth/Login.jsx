import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth/login";
      const res = await axios.post(url, data);
      
      if(res.data.success){
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      }
      else{
        console.log(res.data.message);
      }
      
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
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
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="login_input"
              autoComplete="on"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="login_input"
            />
            {error && <div className="login_error_msg">{error}</div>}
            <button type="submit" className="login_green_btn">
              Log In
            </button>
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
    </div>
  );
};

export default Login;
