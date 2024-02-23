import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useEffect } from "react";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const checkTokenExpiration = () => {
    const token = auth.token;
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          setAuth({
            ...auth,
            user: null,
            token: "",
          });
          localStorage.removeItem("auth");
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  };

  useEffect(() => {
    // Initial check
    checkTokenExpiration();

    // Periodic check every minute
    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 60000); 

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [auth.token, setAuth]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar_brand">
          <HandshakeIcon />
          DocSync
        </Link>
        <div>
          {auth.user ? (
            <>
              <Link
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                <button className="white_btn">Dashboard</button>
              </Link>

              <Link to="/login">
                <button className="white_btn" onClick={handleLogout}>
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="white_btn">Login</button>
              </Link>

              <Link to="/register">
                <button className="white_btn">Register</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
