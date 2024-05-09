import React from "react";
import { NavLink } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = (props) => {

  return (
    <>
      <div id="user_menu_container">
        <div id="user_menu_container2">
          <h4>Dashboard</h4>
          <div className="user_menu_navlink" style={props.id === "1" ? {backgroundColor: "#0d6efd"} : {}}>
            <NavLink
              to="/dashboard/user/profile"
              className="user_menu_nav"
              style={props.id === "1" ? {color: "white"} :{}}
            >
              Profile
            </NavLink>
          </div>
          <div className="user_menu_navlink" style={props.id === "2" ? {backgroundColor: "#0d6efd"} : {}}>
            <NavLink
              to="/dashboard/user/upload-document"
              className="user_menu_nav"
              style={props.id === "2" ? {color: "white"} :{}}
            >
              Upload Document
            </NavLink>
          </div>
          <div className="user_menu_navlink" style={props.id === "3" ? {backgroundColor: "#0d6efd"} : {}}>
            <NavLink
              to="/dashboard/user/documents"
              className="user_menu_nav"
              style={props.id === "3" ? {color: "white"} :{}}
            >
              Your documents
            </NavLink>
          </div>
          <div className="user_menu_navlink" style={props.id === "4" ? {backgroundColor: "#0d6efd"} : {}}>
            <NavLink
              to="/dashboard/user/connect"
              className="user_menu_nav"
              style={props.id === "4" ? {color: "white"} :{}}
            >
              Connect
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;

