import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const YourDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const userStatus = auth?.user?.status;
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

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  useEffect(() => {
    if (userStatus !== "Approved") navigate("/dashboard/user");
    if (auth?.token) getDocuments();
  }, [auth?.token, userStatus]);

  return (
    <>
      <div className="user_dashboard_container">
        <div className="user_dashboard_left">
          {userStatus === "Approved" && <UserMenu id="3" />}{" "}
        </div>
        <div className="user_docs_right">
          <h3>Your Documents</h3>
          <div className="border shadow">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">File Name</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  <th scope="col">File Type</th>
                  <th scope="col">Upload Date</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {docs?.map((doc, i) => {
                  return (
                    <tr key={i + 1}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        <a
                          href={doc?.file?.secure_url}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#2087fa", textDecoration: "none"}}
                        >
                          {doc?.name}
                        </a>
                      </td>
                      <td>
                        <DriveFileRenameOutlineOutlinedIcon onClick={handleEdit} sx={{ color: "#686c70" }} />
                      </td>
                      <td>
                        <DeleteForeverOutlinedIcon onClick={handleDelete} sx={{ color: "#f06566" }}/>
                      </td>
                      <td>{doc?.file?.format?.toUpperCase() || "N/A"} </td>
                      <td>
                        {new Date(doc?.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td>{doc?.desc}</td>
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
