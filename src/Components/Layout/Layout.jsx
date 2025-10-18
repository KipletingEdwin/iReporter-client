// src/Components/Layout/Layout.jsx
import React, { useContext } from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar.jsx";
import { ColorModeContext } from "../../theme/ThemeProvider/ThemeProvider.jsx"; 

const Layout = ({ children }) => {
  const { toggleColorMode } = useContext(ColorModeContext);
  const darkMode = localStorage.getItem("themeMode") === "dark";

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Navbar automatically gets darkMode and toggle from context */}
      <Navbar darkMode={darkMode} toggleTheme={toggleColorMode} />
      <Box component="main" sx={{ mt: 2, p: { xs: 2, md: 3 } }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
