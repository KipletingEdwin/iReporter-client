// src/components/Layout.jsx
import React from "react";
import { Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        {children}
      </Container>
    </>
  );
}
