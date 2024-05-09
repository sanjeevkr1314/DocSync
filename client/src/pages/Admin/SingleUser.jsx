import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const SingleUser = () => {
  const [docs, setDocs] = useState([]);
  const [thisUser, setThisUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  // console.log(auth?.user);
  const userRole = auth?.user?.role;

  const getSingleUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/admin/users/${params.userId}`
      );
      setThisUser(data.user);
      setDocs(data.documents);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log(error);
      setError("Error fetching documents. Please try again.");
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    if (userRole !== 1) navigate("/dashboard");
    if (auth?.token) getSingleUser();
    if (!auth?.token) navigate("/login");
  }, [auth?.token, userRole]);

  return (
    <>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu id="2" />
        </div>
        <div className="col-md-9">
          <h3 className="text-center">
            All Users {`>`} {thisUser.email}{" "}
          </h3>

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
                      File Type
                    </th>
                    <th
                      style={{ backgroundColor: "#3f515a", color: "white" }}
                      scope="col"
                    >
                      Date of Upload
                    </th>
                    <th
                      style={{ backgroundColor: "#3f515a", color: "white" }}
                      scope="col"
                    >
                      Description
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
                  {docs?.map((doc, i) => {
                    return (
                      <tr key={i + 1}>
                        <th scope="row">{i + 1}</th>
                        <td>{doc?.name}</td>
                        <td>{doc?.file?.format?.toUpperCase() || "N/A"} </td>
                        <td>
                          {new Date(doc?.createdAt).toLocaleDateString("en-GB")}
                        </td>
                        <td>{doc?.desc}</td>
                        <td>
                          <a
                            href={doc?.file?.secure_url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => {
                              // Prevent the default behavior of the link
                              e.preventDefault();
                              // Open the link in a new tab/window
                              window.open(doc?.file?.secure_url, "_blank");
                            }}
                            style={{
                              backgroundColor: "#018588",
                              padding: "5px 15px 5px 15px",
                              color: "white",
                              textDecoration: "none",
                              borderRadius: "5px",
                            }}
                          >
                            View
                          </a>
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

export default SingleUser;
