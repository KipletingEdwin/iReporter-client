// src/pages/Profile.jsx
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Redirect to login if user is not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      bgcolor="#f9f9f9"
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          My Profile
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          <strong>Email:</strong> {user.email}
        </Typography>

        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
