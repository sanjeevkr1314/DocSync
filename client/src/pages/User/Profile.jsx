import React, { useEffect } from "react";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [auth] = useAuth();
  const userRole = auth?.user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) navigate("/login");
    if (userRole !== 0) navigate("/dashboard");
  }, [auth?.token]);

  return (
    <>
      <div className="user_dashboard_container">
        <div className="user_dashboard_left">
          <UserMenu id="1" />{" "}
        </div>
        <div className="user_dashboard_right">
          <h3>User Profile</h3>
          <section>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card mb-4" style={{ marginLeft: "1px" }}>
                    <div className="card-body text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: 150 }}
                      />
                      <h5 className="my-3">
                        {auth?.user?.fName + " "}
                        {auth?.user?.lName}
                      </h5>
                      <p className="text">
                        {auth?.user?.role === 1 ? "Admin" : "User"}
                      </p>
                      <p className="text-muted mb-4">
                        Jaipur, Rajasthan, India
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card mb-4" style={{ marginLeft: "140px" }}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {auth?.user?.fName + " "}
                            {auth?.user?.lName}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{auth?.user?.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Mobile</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">N/A</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            Malaviya Nagar, Jaipur, Rajasthan, India
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>{" "}
        </div>
      </div>
    </>
  );
};

export default Profile;
