import React, { useEffect } from "react";
import SAdminMenu from "../../components/Layout/SAdminMenu.jsx";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const SAdminDashboard = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  // console.log(auth?.user);
  const userRole = auth?.user?.role;

  useEffect(() => {
    if (userRole !== 2) navigate("/dashboard");
    if (!auth?.token) navigate("/login");
  }, [auth?.token, userRole]);

  return (
    <>
      <div>
        <div className="user_dashboard_container">
          <div className="user_dashboard_left">
            <SAdminMenu />
          </div>
          <div className="user_dashboard_right">
            <div>
              <h3>
                {" "}
                Coordinator Name : {auth?.user?.fName} {auth?.user?.lName}
              </h3>
              <h3> Email : {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SAdminDashboard;
