import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AllDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log(error);
      setError("Error fetching documents. Please try again.");
      setLoading(false); // Set loading to false in case of an error
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
          <AdminMenu id="3" />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Documents</h1>

          {loading && <h4 className="text-center my-4">Loading...</h4>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && (
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">File Type</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Date of Upload</th>
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
                        <td>{doc?.file?.format?.toUpperCase() || 'N/A' } </td>
                        <td>{JSON.parse(doc?.owner).email}</td>
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
          )}
        </div>
      </div>
    </>
  );
};

export default AllDocuments;
