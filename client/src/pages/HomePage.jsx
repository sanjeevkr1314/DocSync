import React from "react";
import { useAuth } from "../context/auth";
import logo from "../images/home-page-image.avif";

const HomePage = () => {
  const [auth] = useAuth();

  return (
    <div className="home_page">
      <div className="row">
        <div className="col-4" style={{ marginTop: "50px" }}>
          <h3>Simplify</h3>
          <h3>Organize</h3>
          <h3>Collaborate</h3>
        </div>
        <div className="col-4"></div>
        <div className="col-4 imageContainer">
          <div className="imageOverlay">
            <p className="hoverText">Welcome {auth?.user?.fName}</p>
          </div>
          <img
            style={{
              width: "400px",
              height: "400px",
              border: "12px solid #ddd",
              borderRadius: "40px",
            }}
            src={logo}
            alt="home page image"
          />
        </div>
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      </div>
    </div>
  );
};

export default HomePage;
