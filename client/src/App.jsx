import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import SAdminRoute from "./components/Routes/SAdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import AllDocuments from "./pages/Admin/AllDocuments";
import AllUsers from "./pages/Admin/AllUsers";
import Profile from "./pages/User/Profile";
import UploadDocument from "./pages/User/UploadDocument";
import YourDocuments from "./pages/User/YourDocuments";
import Footer from "./components/Layout/Footer.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import Requests from "./pages/Admin/Requests.jsx";
import Connect from "./pages/User/Connect.jsx";
import SAdminDashboard from "./pages/SystemAdmin/SAdminDashboard.jsx";
import SAdminProfile from "./pages/SystemAdmin/SAdminProfile.jsx";
import SAllDocuments from "./pages/SystemAdmin/SAdminAllDocuments.jsx";
import SysAdminAllUsers from "./pages/SystemAdmin/SAdminAllUsers.jsx";
import SysAdminAllAdmins from "./pages/SystemAdmin/SAdminAllAdmins.jsx";

function App() {
  return (
    <>
      <div id="content-wrap">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/upload-document" element={<UploadDocument />} />
            <Route path="user/documents" element={<YourDocuments />} />
            <Route path="user/connect" element={<Connect />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/users" element={<AllUsers />} />
            <Route path="admin/documents" element={<AllDocuments />} />
            <Route path="admin/requests" element={<Requests />} />
          </Route>
          <Route path="/dashboard" element={<SAdminRoute />}>
            <Route path="sadmin" element={<SAdminDashboard />} />
            <Route path="sadmin/profile" element={<SAdminProfile />} />
            <Route path="sadmin/documents" element={<SAllDocuments />} />
            <Route path="sadmin/users" element={<SysAdminAllUsers />} />
            <Route path="sadmin/admins" element={<SysAdminAllAdmins />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
