import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { Button } from "@mui/material";

const Requests = () => {
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const navigate = useNavigate();
  // console.log(auth?.user);
  const userRole = auth?.user?.role;

  const getRequests = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/admin/requests/${auth?.user?._id}`
      );
      setReqs(data);
      // console.log(data);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log(error);
      setError("Error fetching requests. Please try again.");
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const acceptRequest = async (id) => {
    try {
      const adminId = auth?.user?._id;
      const { data } = await axios.put(
        `http://localhost:8080/api/admin/requests/accept/${id}`,
        {
          adminId,
        }
      );
      console.log(data);
      getRequests();
    } catch (error) {
      console.log(error);
      setError("Error accepting request. Please try again.");
    }
  };

  const deleteRequest = async (id) => {
    try {
      const adminId = auth?.user?._id;
      const { data } = await axios.delete(
        `http://localhost:8080/api/admin/requests/delete/${id}`,
        {
          adminId,
        }
      );
      console.log(data);
      getRequests();
    } catch (error) {
      console.log(error);
      setError("Error deleting request. Please try again.");
    }
  };

  useEffect(() => {
    if (userRole !== 1) navigate("/dashboard");
    if (auth?.token) getRequests();
  }, [auth?.token, userRole]);

  return (
    <>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu id="4" />
        </div>
        <div className="col-md-9">
          <h3 className="text-center">Connection Requests</h3>

          {loading && <h4 className="text-center my-4">Loading...</h4>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && (
            <div className="border shadow">
              <table className="table">
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
                      Name
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reqs?.map((req, i) => {
                    return (
                      <tr key={i + 1}>
                        <th scope="row">{i + 1}</th>
                        <td>{req.firstName + " " + req.lastName}</td>
                        <td>{req.email}</td>
                        <td>
                          <div style={{ display: "flex" }}>
                            <Button
                              size="small"
                              variant="contained"
                              style={{
                                backgroundColor: "#018588",
                                width: "20px",
                                margin: "3px",
                              }}
                              onClick={() => acceptRequest(req._id)}
                            >
                              Accept
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              style={{
                                backgroundColor: "#018588",
                                width: "20px",
                                margin: "3px",
                              }}
                              onClick={() => deleteRequest(req._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Requests;
