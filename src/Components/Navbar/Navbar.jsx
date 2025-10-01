// import React from 'react'
// import iReporter from '../../assets/navbar/iReporter.png'
// import './Navbar.css'

// const Navbar = () => {
//   return (
//     <div className='nav'>
//       <img src={iReporter} alt='iReporter' />
//       <ul>
//         <li><a href='/'>Home</a></li>
//         <li><a href='/about'>About</a></li>
//         <li><a href='/contact'>Contact</a></li>
//       </ul>
//     </div>
//   )
// }

// export default Navbar


// src/components/Navbar.jsx
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

const pages = ["Home", "My Reports", "Submit Report"];

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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          iReporter
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {pages.map((page) => (
            <Button key={page} color="inherit">
              {page}
            </Button>
          ))}
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleOpenNavMenu}
          >
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
