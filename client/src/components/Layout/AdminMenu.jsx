import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/admin/all-users"
            className="list-group-item list-group-item-action"
          >
            All Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/all-documents"
            className="list-group-item list-group-item-action"
          >
            All documents
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
