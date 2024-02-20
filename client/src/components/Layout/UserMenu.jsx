import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <div id="user_menu_container">
        <div id="user_menu_container2">
          <h4>Dashboard</h4>
          <button onClick={() => navigate("/dashboard/user/profile")}>
            {" "}
            Profile
          </button>
          <div className="user_menu_navlink">
            <NavLink
              to="/dashboard/user/upload-document"
              className="user_menu_nav"
            >
              Upload Document
            </NavLink>
          </div>
          <div className="user_menu_navlink">
            <NavLink
              to="/dashboard/user/all-documents"
              className="user_menu_nav"
            >
              Your documents
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;

// className="text-center"
// className="list-group dashboard-menu"
// className="list-group-item list-group-item-action"
// className="list-group-item list-group-item-action"
// className="list-group-item list-group-item-action"
