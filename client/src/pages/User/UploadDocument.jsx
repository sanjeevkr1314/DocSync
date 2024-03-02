import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UploadDocument.css";
import UserMenu from "../../components/Layout/UserMenu";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadDocument = () => {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadState, setUploadState] = useState("Upload");

  const [docImage, setDocImage] = useState("");
  const [viewDoc, setViewDoc] = useState("");

  const [name, setName] = useState("");
  const [fileType, setFileType] = useState("");
  const [desc, setDesc] = useState("");

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const userStatus = auth?.user?.status;

  useEffect(() => {
    if (userStatus !== "Approved") navigate("/dashboard/user");
  }, [auth?.token, userStatus]);

  const handleDocumentUpload = (e) => {
    const selectedFile = e.target.files[0];
    setIsSuccess(false);

    // Checking if the file type is allowed or not
    const allowedTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(selectedFile?.type)) {
      setIsError(true);
      setErrorMsg("Only PDF, JPEG, JPG, and PNG are allowed.");
      return;
    }

    setIsError(false);
    setFileType(selectedFile?.type);
    TransformFile(selectedFile);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setDocImage(reader.result);
        setViewDoc(reader.result);
      };
    } else {
      setDocImage("");
      setViewDoc("");
    }
  };

  const newPlugin = defaultLayoutPlugin();

  const renderPreview = () => {
    if (fileType.startsWith("image/")) {
      return (
        <img
          src={docImage}
          alt="document preview"
          // style={{ width: "200px", height: "200px" }}
        />
      );
    } else if (fileType === "application/pdf" && docImage) {
      return (
        <div>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {viewDoc && (
              <>
                <Viewer
                  fileUrl={viewDoc}
                  onError={(error) => console.error("PDF error:", error)}
                  plugins={[newPlugin]}
                />
              </>
            )}
            {!viewDoc && (
              <p className="preview">Document preview will appear here!</p>
            )}
          </Worker>
        </div>
      );
    } else {
      return <p className="preview">Document preview will appear here!</p>;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadState("Uploading....");

    if (isError) return;
    setErrorMsg("");
    setIsError(false);
    setIsSuccess(true);

    const formData = new FormData();
    formData.append("uploadedFile", e.target.elements.uploadedFile.files[0]);
    formData.append("fileType", fileType);
    formData.append("name", name);
    formData.append("desc", desc);

    const owner = JSON.stringify(auth?.user);
    formData.append("owner", owner);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/upload",
        formData
      );

      console.log(response);
      const data = await response.data;

      if (data.success) {
        // console.log("data", data);
        toast.success("Upload Successful");
      } else {
        console.error("File upload failed", data.message);
        toast.error("File upload failed");
      }
    } catch (error) {
      console.error("Error during file upload", error);
      toast.error("File upload failed");
    }

    setUploadState("Upload");
  };

  return (
    <>
      <div className="user_dashboard_container">
        <div className="user_dashboard_left">
          {userStatus === "Approved" && <UserMenu id="2" />}{" "}
        </div>
        <div className="user_dashboard_right">
          <div className="card" style={{ margin: "10px 0px 0px 100px" }}>
            <div className="card-header">
              <h3>Upload new document</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="file"
                  accept="application/pdf, image/jpg, image/jpeg, image/png"
                  name="uploadedFile"
                  onChange={handleDocumentUpload}
                  required
                />
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  className="text_input"
                />
                <input
                  type="text"
                  name="desc"
                  required
                  autoComplete="off"
                  placeholder="Description"
                  onChange={(e) => setDesc(e.target.value)}
                  className="text_input"
                />
                <button type="submit">{uploadState}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="pdf-container">{renderPreview()}</div>
      <ToastContainer
        style={{ width: "500px" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default UploadDocument;
