import React, { useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  // console.log(auth?.user);
  const userRole = auth?.user?.role;

  useEffect(() => {
    if (userRole !== 1) navigate("/dashboard");
  }, [auth?.token, userRole]);

  return (
    <>
      <div>
        <div className="user_dashboard_container">
          <div className="user_dashboard_left">
            <AdminMenu />
          </div>
          <div className="user_dashboard_right">
            <div>
              <h3>
                {" "}
                Admin Name : {auth?.user?.fName} {auth?.user?.lName}
              </h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
