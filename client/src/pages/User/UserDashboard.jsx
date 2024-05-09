import React, { useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) navigate("/login");
  }, [auth?.token]);

  return (
    <>
      <div>
        <div className="user_dashboard_container">
          <div className="user_dashboard_left">
            <UserMenu />
          </div>
          <div className="user_dashboard_right">
            <div>
              <h3>
                {" "}
                Name : {auth?.user?.fName} {auth?.user?.lName}
              </h3>
              <h3> Email : {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
