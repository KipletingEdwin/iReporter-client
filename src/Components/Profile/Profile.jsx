import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Stack,
  Divider,
  Fade,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd, #f1f8e9)",
        p: 2,
      }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            width: "100%",
            maxWidth: 420,
            textAlign: "center",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              mb: 2,
              bgcolor: "primary.main",
              fontSize: 32,
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(25,118,210,0.3)",
            }}
          >
            {initials}
          </Avatar>

          <Typography variant="h5" fontWeight={700} color="primary.main" mb={0.5}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Logged in as a verified user
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PersonIcon color="primary" />
              <Typography variant="body1">
                <strong>Name:</strong> {user.name}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <EmailIcon color="primary" />
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.2,
              boxShadow: "0 4px 10px rgba(211,47,47,0.25)",
              "&:hover": { boxShadow: "0 6px 14px rgba(211,47,47,0.35)" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
};

export default Profile;
