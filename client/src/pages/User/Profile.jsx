import React, { useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const userStatus = auth?.user?.status;

  useEffect(() => { 
    if (userStatus !== "Approved") navigate("/dashboard/user");
  }, [auth?.token, userStatus]);

  return (
    <>
      <div className="user_dashboard_container">
        <div className="user_dashboard_left">
          {userStatus === "Approved" && <UserMenu />}{" "}
        </div>
        <div className="user_dashboard_right">
          <h1>User Profile</h1>
        </div>
      </div>
    </>
  );
};

export default Profile;
