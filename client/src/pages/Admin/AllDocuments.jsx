import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AllDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  // console.log(auth?.user);
  const userRole = auth?.user?.role;

  const getDocuments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/auth/all-documents"
      );
      setDocs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userRole !== 1) navigate("/dashboard");
    if (auth?.token) getDocuments();
  }, [auth?.token, userRole]);

  return (
    <>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Documents</h1>

          <div className="border shadow">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">File Type</th>
                  <th scope="col">Owner</th>
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
                        >
                          {doc?.name}
                        </a>
                      </td>
                      <td>{doc?.file?.format} </td>
                      <td>{JSON.parse(doc?.owner).email}</td>
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

export default AllDocuments;
