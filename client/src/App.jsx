import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import AllDocuments from "./pages/Admin/AllDocuments";
import AllUsers from "./pages/Admin/AllUsers";
import Profile from "./pages/User/Profile";
import UploadDocument from "./pages/User/UploadDocument";
import YourDocuments from "./pages/User/YourDocuments";
import Footer from "./components/Layout/Footer.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";

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
            <Route />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/users" element={<AllUsers />} />
            <Route path="admin/documents" element={<AllDocuments />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
