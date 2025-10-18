// src/Components/MapView/MapView.jsx
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Paper, Typography, useTheme } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Leaflet icons (Vite compatible)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const API_URL = import.meta.env.VITE_API_URL;

// Fix default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Category and status colors
const categoryColors = {
  "Corruption": "red",
  "Red-Flag": "orange",
  "Intervention": "blue",
  "Other": "green",
};
const statusColors = {
  "Pending": "yellow",
  "Resolved": "green",
  "Rejected": "grey",
};

// Create custom icon based on category/status
const createCustomIcon = (category, status) => {
  const color = categoryColors[category] || statusColors[status] || "grey";
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export default function MapView() {
  const theme = useTheme();
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/reports`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data.filter(r => r.locationLat && r.locationLng));
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, []);

  if (!reports)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "80vh", width: "100%", mt: 2, px: { xs: 1, md: 3 } }}>
      <Paper sx={{ p: 3, borderRadius: 4, backdropFilter: "blur(8px)", backgroundColor: theme.palette.mode==="dark"?"rgba(25,25,25,0.85)":"rgba(255,255,255,0.85)", boxShadow:"0 6px 20px rgba(0,0,0,0.12)" }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" mb={2} textAlign="center">
          Reports Map
        </Typography>
        <Box sx={{ height: "70vh", width: "100%", borderRadius: 2, overflow: "hidden" }}>
          <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url={theme.palette.mode==="dark"
                ? "https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
              attribution={theme.palette.mode==="dark"
                ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              }
            />
            {reports.map(report => (
              <Marker
                key={report.id}
                position={[report.locationLat, report.locationLng]}
                icon={createCustomIcon(report.category, report.status)}
              >
                <Popup>
                  <strong>{report.title}</strong><br/>
                  <em>Category: {report.category}</em><br/>
                  <em>Status: {report.status}</em><br/>
                  {report.description}
                </Popup>
                <Tooltip>{report.title} ({report.status})</Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </Paper>
    </Box>
  );
}
