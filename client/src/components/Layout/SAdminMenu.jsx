import React from "react";
import { NavLink } from "react-router-dom";

const SAdminMenu = (props) => {
  return (
    <>
      <div id="user_menu_container">
        <div id="user_menu_container2">
          <h4> Coordinater Panel</h4>
          <div
            className="user_menu_navlink"
            style={props.id === "1" ? { backgroundColor: "#0d6efd" } : {}}
          >
            <NavLink
              to="/dashboard/sadmin/profile"
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
              to="/dashboard/sadmin/users"
              className="user_menu_nav"
              style={props.id === "2" ? { color: "white" } : {}}
            >
              All Users
            </NavLink>
          </div>
          <div
            className="user_menu_navlink"
            style={props.id === "3" ? { backgroundColor: "#0d6efd" } : {}}
          >
            <NavLink
              to="/dashboard/sadmin/documents"
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
              to="/dashboard/sadmin/admins"
              className="user_menu_nav"
              style={props.id === "4" ? { color: "white" } : {}}
            >
              All Admins
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SAdminMenu;
