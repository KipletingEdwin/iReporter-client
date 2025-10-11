// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const pages = [
  { name: "Home", path: "/" },
  { name: "My Reports", path: "/my-reports" },
  { name: "Submit Report", path: "/submit-report" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch pending report count dynamically
  useEffect(() => {
    const fetchPendingReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get("http://localhost:3000/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pending = response.data.filter((r) => r.status === "Pending");
        setPendingCount(pending.length);
      } catch (err) {
        console.error("Failed to fetch reports count:", err);
      }
    };
    fetchPendingReports();
  }, []);

  // Profile menu handlers
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleCloseUserMenu();
  };

  // Mobile drawer
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer}>
      <Typography variant="h6" sx={{ m: 2, fontWeight: "bold" }}>
        iReporter
      </Typography>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem
            button
            key={page.name}
            component={Link}
            to={page.path}
            selected={location.pathname === page.path}
          >
            {page.name === "My Reports" && pendingCount > 0 ? (
              <Badge
                badgeContent={pendingCount}
                color="error"
                sx={{ mr: 2 }}
              >
                <ListItemText primary={page.name} />
              </Badge>
            ) : (
              <ListItemText primary={page.name} />
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={6}
      sx={{
        backgroundColor: "#1976d2",
        px: 2,
        py: 0.5,
        transition: "0.3s ease-in-out",
      }}
    >
      <Toolbar>
        {/* Mobile menu */}
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { md: "none" } }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        {/* App Logo / Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          iReporter
        </Typography>

        {/* Desktop navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              component={Link}
              to={page.path}
              color="inherit"
              sx={{
                mx: 1,
                textTransform: "none",
                fontWeight: location.pathname === page.path ? "bold" : 500,
                fontSize: 16,
                borderBottom:
                  location.pathname === page.path ? "2px solid #fff" : "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {page.name === "My Reports" && pendingCount > 0 ? (
                <Badge badgeContent={pendingCount} color="error">
                  {page.name}
                </Badge>
              ) : (
                page.name
              )}
            </Button>
          ))}

          {/* Profile dropdown */}
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ ml: 2 }}>
              <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => navigate("/profile")}>
              <SettingsIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>

        {/* Mobile drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
