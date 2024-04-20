import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import Button from "@mui/material/Button";
import axios from "axios";

export default function ActionAreaCard(user) {
  const [currUser, setCurrUser] = useState(user);
  useEffect(() => {}, [currUser]);

  const reloadCard = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/admin/user/${userId}`
      );
      setCurrUser(data);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch user data.");
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/user-status/${userId}`, {
        status: "Approved",
      });
      // toast.success("User approved successfully.");
      reloadCard(userId);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to approve user.");
    }
  };

  const handleCancel = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/user-status/${userId}`, {
        status: "Cancelled",
      });
      // toast.success("User status cancelled successfully.");
      reloadCard(userId);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to cancel user status.");
    }
  };

  return (
    <Card sx={{ width: 250, margin: "20px", flexDirection: "column" }}>
      {/* <CardActionArea disableRipple> */}
        <CardMedia
          component="img"
          height="200rm"
          image="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
          alt="profile image"
        />
        <CardContent
          sx={{
            backgroundColor: "#3f515a",
            color: "white",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            cursor: "default",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {currUser?.firstName} {currUser?.lastName}
          </Typography>

          <Typography
            sx={{ display: "flex", justifyContent: "center" }}
            variant="body2"
          >
            {currUser?.email}
          </Typography>

          {currUser?.status === "Approved" ? (
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              variant="body2"
            >
              {currUser?.role ? (
                <>
                  Admin
                  <VerifiedIcon color="primary" fontSize="small" />
                </>
              ) : (
                "User"
              )}
            </Typography>
          ) : currUser?.status === "Not Processed" ? (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                size="small"
                style={{ width: "45%" }}
                variant="contained"
                color="success"
                onClick={() => handleApprove(currUser._id)}
              >
                Approve
              </Button>
              <Button
                size="small"
                style={{ width: "45%" }}
                variant="contained"
                color="error"
                onClick={() => handleCancel(currUser._id)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                size="small"
                style={{
                  width: "50%",
                  backgroundColor: "#fa5e52",
                  color: "white",
                }}
                variant="contained"
                disabled
              >
                Cancelled
              </Button>
            </div>
          )}
        </CardContent>
      {/* </CardActionArea> */}
      {/* <ToastContainer /> */}
    </Card>
  );
}
