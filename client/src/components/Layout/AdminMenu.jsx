import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = (props) => {
  return (
    <>
      <div id="user_menu_container">
        <div id="user_menu_container2">
          <h4>Admin Panel</h4>
          <div
            className="user_menu_navlink"
            style={props.id === "1" ? { backgroundColor: "#0d6efd" } : {}}
          >
            <NavLink
              to="/dashboard/admin/profile"
              className="user_menu_nav"
              style={props.id === "1" ? { color: "white" } : {}}
            >
              Profile
            </NavLink>
          </div>
          <div
            className="user_menu_navlink"
            style={props.id === "2" ? { backgroundColor: "#0d6efd" } : {}}
          >
            <NavLink
              to="/dashboard/admin/users"
              className="user_menu_nav"
              style={props.id === "2" ? { color: "white" } : {}}
            >
              Users
            </NavLink>
          </div>
          <div
            className="user_menu_navlink"
            style={props.id === "3" ? { backgroundColor: "#0d6efd" } : {}}
          >
            <NavLink
              to="/dashboard/admin/documents"
              className="user_menu_nav"
              style={props.id === "3" ? { color: "white" } : {}}
            >
              All Docs
            </NavLink>
          </div>
          <div
            className="user_menu_navlink"
            style={props.id === "4" ? { backgroundColor: "#0d6efd" } : {}}
          >
            <NavLink
              to="/dashboard/admin/requests"
              className="user_menu_nav"
              style={props.id === "4" ? { color: "white" } : {}}
            >
              Requests
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
