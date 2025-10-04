import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "My Reports", path: "/my-reports" },
  { name: "Submit Report", path: "/submit-report" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Name / Logo */}
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", fontWeight: "bold", letterSpacing: 1 }} >
          iReporter
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              component={Link}
              to={page.path}
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: 17,
                color: "inherit",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                },
                "&.active": {
                  borderBottom: "2px solid #fff",
                },
              }}
            >
              {page.name}
            </Button>
          ))}
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                {page}
              </MenuItem>
            ))}
            <MenuItem onClick={handleCloseNavMenu}>
              <AccountCircle sx={{ mr: 1 }} /> Profile
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
