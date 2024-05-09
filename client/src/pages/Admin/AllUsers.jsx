import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import UserCard from "./UserCard";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const userRole = auth?.user?.role;

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/admin/all-users/${auth.user._id}`
      );
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error fetching documents. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole !== 1) navigate("/dashboard");
    if (auth?.token) getUsers();
  }, [auth?.token, userRole]);

  return (
    <>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu id="2" />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Users</h1>
          <div className="all-users-container">
            {loading && <h4 className="text-center my-4">Loading...</h4>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && (
              <div className="all-users-container">
                {users?.map((user, i) => (
                  <UserCard key={i} {...user} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
