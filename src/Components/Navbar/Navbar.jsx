import React, { useState, useEffect, useContext } from "react";
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
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  ListAlt as ListAltIcon,
  Map as MapIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ColorModeContext } from "../../theme/ThemeProvider/ThemeProvider";

const API_URL = import.meta.env.VITE_API_URL;

const pages = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "My Reports", path: "/my-reports", icon: <ListAltIcon /> },
  { name: "Submit Report", path: "/submit-report", icon: <AddCircleOutlineIcon /> },
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Map View", path: "/map", icon: <MapIcon /> },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleColorMode } = useContext(ColorModeContext);
  const [darkMode, setDarkMode] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [notifications, setNotifications] = useState(3);

  const user = JSON.parse(localStorage.getItem("user"));

  // Sync dark mode with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("themeMode");
    setDarkMode(saved === "dark");
  }, []);

  // Fetch pending reports
  useEffect(() => {
    const fetchPendingReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get(`${API_URL}/reports`, {
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

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    handleCloseUserMenu();
  };

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ width: 260 }} onClick={toggleDrawer}>
      <Typography variant="h6" sx={{ m: 2, fontWeight: 700, color: "primary.main" }}>
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
            sx={{
              borderRadius: 2,
              mx: 1,
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "& .MuiListItemIcon-root": { color: "white" },
              },
              "&:hover": { backgroundColor: "rgba(25,118,210,0.08)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{page.icon}</ListItemIcon>
            <ListItemText primary={page.name} />
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
      position="sticky"
      elevation={4}
      sx={{
        background: darkMode
          ? "linear-gradient(90deg, #0d47a1, #1976d2)"
          : "linear-gradient(90deg, #2196f3, #64b5f6)",
        px: 2,
        py: 0.5,
        transition: "0.3s ease-in-out",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Mobile menu */}
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { md: "none" } }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: 700,
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
                borderBottom:
                  location.pathname === page.path ? "2px solid #fff" : "2px solid transparent",
                "&:hover": { borderBottom: "2px solid rgba(255,255,255,0.6)" },
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

          {/* Notifications */}
          <IconButton color="inherit" sx={{ ml: 1 }}>
            <Badge badgeContent={notifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Theme toggle */}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => {
              toggleColorMode();
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Profile */}
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ ml: 2 }}>
              <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>
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
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {user?.name || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || ""}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => navigate("/profile")}>
              <SettingsIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
