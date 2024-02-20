import React, {useEffect} from "react";
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
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3 adminPanel">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3" style={{marginLeft: 3 + 'rem', marginTop: 3 + 'rem'}}>
              <h3> Admin Name : {auth?.user?.fName} {auth?.user?.lName}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
