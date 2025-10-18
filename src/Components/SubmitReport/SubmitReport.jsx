// src/Components/SubmitReport/SubmitReport.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Stack,
  Alert,
  Fade,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlaceIcon from "@mui/icons-material/Place";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleIcon from "@mui/icons-material/Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Leaflet imports
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Vite-compatible Leaflet icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function SubmitReport() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "", // optional address/description
    locationLat: null,
    locationLng: null,
    evidence: null,
  });

  const [markerPos, setMarkerPos] = useState([0, 0]); // initial map center
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = ["Corruption", "Red-Flag", "Intervention", "Other"];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) =>
    setFormData({ ...formData, evidence: e.target.files[0] });

  // Map click handler
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
        setFormData({
          ...formData,
          locationLat: e.latlng.lat,
          locationLng: e.latlng.lng,
        });
      },
    });
    return (
      <Marker
        position={markerPos}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const latlng = e.target.getLatLng();
            setMarkerPos([latlng.lat, latlng.lng]);
            setFormData({
              ...formData,
              locationLat: latlng.lat,
              locationLng: latlng.lng,
            });
          },
        }}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.description || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!formData.locationLat || !formData.locationLng) {
      setError("Please select a location on the map.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") data.append(key, value);
      });

      await axios.post("http://localhost:3000/reports", data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setSuccess("Report submitted successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        locationLat: null,
        locationLng: null,
        evidence: null,
      });
      setMarkerPos([0, 0]);
      setTimeout(() => navigate("/my-reports"), 1500);
    } catch (err) {
      console.error("Submit report error:", err);
      setError("An error occurred while submitting the report.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #0d47a1, #1976d2)"
          : "linear-gradient(135deg, #e0f7fa, #e3f2fd)",
        p: 2,
      }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 650,
            p: 5,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(25,25,25,0.85)"
                : "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            color="primary.main"
            mb={3}
          >
            Submit a New Report
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{ startAdornment: <TitleIcon sx={{ mr: 1, color: "primary.main" }} /> }}
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                InputProps={{ startAdornment: <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} /> }}
              />
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Location Description (optional)"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                InputProps={{ startAdornment: <PlaceIcon sx={{ mr: 1, color: "primary.main" }} /> }}
              />

              {/* Map Picker */}
              <Box sx={{ height: 300, width: "100%", borderRadius: 2, overflow: "hidden" }}>
                <MapContainer center={markerPos} zoom={2} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    url={
                      theme.palette.mode === "dark"
                        ? "https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                    attribution={
                      theme.palette.mode === "dark"
                        ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }
                  />
                  <LocationMarker />
                </MapContainer>
              </Box>

              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  borderStyle: "dashed",
                  p: 2,
                  "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.04)" },
                }}
              >
                {formData.evidence ? formData.evidence.name : "Upload Evidence (Image or PDF)"}
                <input type="file" hidden onChange={handleFileChange} accept="image/*,application/pdf" />
              </Button>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" mt={2}>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/")} fullWidth>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit Report
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}
