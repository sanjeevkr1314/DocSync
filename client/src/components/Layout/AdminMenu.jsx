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
              All Users
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
              Recent Docs
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="text-center">
  //       <div className="list-group dashboard-menu">
  //         <h4>Admin Panel</h4>
  //         <NavLink
  //           to="/dashboard/admin/profile"
  //           className="list-group-item list-group-item-action"
  //         >
  //           Profile
  //         </NavLink>
  //         <NavLink
  //           to="/dashboard/admin/users"
  //           className="list-group-item list-group-item-action"
  //         >
  //           All Users
  //         </NavLink>
  //         <NavLink
  //           to="/dashboard/admin/documents"
  //           className="list-group-item list-group-item-action"
  //         >
  //           All documents
  //         </NavLink>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default AdminMenu;
