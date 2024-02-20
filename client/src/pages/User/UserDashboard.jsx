import React, {useEffect} from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const userStatus = auth?.user?.status;

  useEffect(() => {
    if (userStatus !== "Approved") navigate("/dashboard/user");
  }, [auth?.token, userStatus]);

  return (
    <>
      <div>
        <div className="user_dashboard_container">
          <div className="user_dashboard_left">
            {userStatus === "Approved" && <UserMenu />}
          </div>
          <div className="user_dashboard_right"> 
            <div>
              <h3>
                {" "}
                Name : {auth?.user?.fName} {auth?.user?.lName}
              </h3>
              <h3> Email : {auth?.user?.email}</h3>
              <h3> Status : {auth?.user?.status}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;