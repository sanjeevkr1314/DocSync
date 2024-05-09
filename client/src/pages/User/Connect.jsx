import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Connect = () => {
  const [auth] = useAuth();
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  const getAdmins = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/user/all-admins/${auth?.user?._id}`
      );
      setAdmins(data);
    } catch (error) {
      console.log(error);
    }
  };

  const connectAdmin = async (adminId) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/user/connect-admin`,
        {
          userId: auth?.user?._id,
          adminId,
        }
      );
      getAdmins();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmins();
    if (!auth?.token) navigate("/login");
  }, [auth?.token]);
  return (
    <>
      <div className="user_dashboard_container">
        <div className="user_dashboard_left">
          <UserMenu id="4" />
        </div>
        <div className="user_docs_right">
          <h3 className="text-center">Connect</h3>
          <div className="border shadow">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th
                    style={{ backgroundColor: "#3f515a", color: "white" }}
                    scope="col"
                  >
                    #
                  </th>
                  <th
                    style={{ backgroundColor: "#3f515a", color: "white" }}
                    scope="col"
                  >
                    Admin Name
                  </th>
                  <th
                    style={{ backgroundColor: "#3f515a", color: "white" }}
                    scope="col"
                  >
                    Email
                  </th>
                  <th
                    style={{ backgroundColor: "#3f515a", color: "white" }}
                    scope="col"
                  >
                    Send Request
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins?.map((admin, i) => {
                  return (
                    <tr key={i + 1}>
                      <th scope="row">{i + 1}</th>
                      <td>{admin?.firstName + " " + admin?.lastName}</td>
                      <td>{admin?.email?.toLowerCase() || "N/A"} </td>
                      <td>
                        <Button
                          onClick={() => connectAdmin(admin?._id)}
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <PersonAddIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        style={{ width: "500px" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Connect;
