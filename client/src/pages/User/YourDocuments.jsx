import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { Button } from "@mui/material";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";

const YourDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const userId = auth?.user?._id;

  const getDocuments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/user/documents/${userId}`
      );
      setDocs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocuments();
    if (!auth?.token) navigate("/login");
  }, [auth?.token]);

  return (
    <>
      <div className="user_dashboard_container">
        <div className="user_dashboard_left">
          <UserMenu id="3" />
        </div>
        <div className="user_docs_right">
          <h3 className="text-center">Your Documents</h3>
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
                    File Name
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
                    Upload Date
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
                        <div style={{ display: "flex" }}>
                          <Button
                            size="small"
                            variant="contained"
                            style={{
                              backgroundColor: "#018588",
                              width: "20px",
                              margin: "3px",
                            }}
                          >
                            <a
                              href={doc?.file?.secure_url}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              View
                            </a>
                          </Button>
                          <EditModal docId={doc?._id} />
                          <DeleteModal docId={doc?._id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourDocuments;
