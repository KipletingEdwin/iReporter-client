// src/Components/MapView/MapView.jsx
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Leaflet icons (Vite compatible)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom colored icons per category
const categoryColors = {
  "Corruption": "red",
  "Red-Flag": "orange",
  "Intervention": "blue",
  "Other": "green",
};

const createCustomIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

export default function MapView() {
  const [reports, setReports] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Only reports with lat/lng
        setReports(res.data.filter(r => r.locationLat && r.locationLng));
      } catch (err) {
        console.error(err);
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
    <Box sx={{ height: "80vh", width: "100%", mt: 2 }}>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
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
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.locationLat, report.locationLng]}
            icon={createCustomIcon(categoryColors[report.category] || "grey")}
          >
            <Popup>
              <strong>{report.title}</strong>
              <br />
              <em>Category: {report.category}</em>
              <br />
              {report.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
