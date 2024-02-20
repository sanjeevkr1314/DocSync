import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AllUsers = () => {
  const [status] = useState([
    "Not Processed",
    "Approved",
    "Cancelled",
  ]);
  // const [changeStatus, setChangeStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const userRole = auth?.user?.role;

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/auth/all-users"
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (userRole !== 1) navigate("/dashboard");
    if (auth?.token) getUsers();
  }, [auth?.token, userRole]);

  const handleChange = async (userId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/auth/user-status/${userId}`,
        {
          status: value,
        }
      );
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Users</h1>

          <div className="border shadow">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, i) => {
                  return (
                    <tr key={i + 1}>
                      <th scope="row">{i + 1}</th>
                      <td>{user?.firstName} {user?.lastName}</td>
                      <td>{user?.role ? "Admin" : "User"}</td>
                      <td>{user?.email}</td>
                      <td>
                        <Select
                          border="false"
                          onChange={(value) => handleChange(user._id, value)}
                          defaultValue={user?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
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

export default AllUsers;
