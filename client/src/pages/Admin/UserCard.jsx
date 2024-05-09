import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ActionAreaCard(user) {
  const [currUser, setCurrUser] = useState(user);
  useEffect(() => {}, [currUser]);

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
      </CardContent>
    </Card>
  );
}
