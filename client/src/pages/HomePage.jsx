import React from "react";
import { useAuth } from "../context/auth";
// import "./HomePage.css";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div className="home_page">
      <h3>Simplify</h3>
      <h3>Organize</h3>
      <h3>Collaborate</h3>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </div>
  );
};

export default HomePage;
