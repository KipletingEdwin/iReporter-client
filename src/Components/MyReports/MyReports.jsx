// src/Components/MyReports/MyReports.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  CircularProgress,
  useTheme,
  Button,
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

// Colors for status
const statusColors = {
  "Pending": "warning",
  "Resolved": "success",
  "Rejected": "default",
};

export default function MyReports() {
  const [reports, setReports] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/reports`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data);
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
    <Box sx={{ width: "100%", mt: 2, px: { xs: 1, md: 3 } }}>
      <Typography variant="h4" fontWeight={700} color="primary.main" mb={3} textAlign="center">
        My Reports
      </Typography>
      <Stack spacing={2}>
        {reports.map((report) => (
          <Paper key={report.id} sx={{ p: 3, borderRadius: 4, backdropFilter: "blur(6px)", backgroundColor: theme.palette.mode==="dark"?"rgba(25,25,25,0.85)":"rgba(255,255,255,0.85)", boxShadow:"0 6px 20px rgba(0,0,0,0.12)" }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600}>{report.title}</Typography>
                <Stack direction="row" spacing={1} mt={1} mb={1}>
                  <Chip label={report.category} color="primary" size="small"/>
                  <Chip label={report.status} color={statusColors[report.status] || "default"} size="small"/>
                </Stack>
                <Typography variant="body2" color="text.secondary">{report.description}</Typography>
                <Button variant="text" size="small" sx={{ mt: 1 }} onClick={() => navigate(`/reports/${report.id}`)}>
                  View Details
                </Button>
              </Box>
              {report.locationLat && report.locationLng && (
                <Box sx={{ width: { xs: "100%", sm: 200 }, height: 150, borderRadius: 2, overflow: "hidden" }}>
                  <MapContainer center={[report.locationLat, report.locationLng]} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false} dragging={false} doubleClickZoom={false} zoomControl={false}>
                    <TileLayer
                      url={theme.palette.mode==="dark"
                        ? "https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      }
                    />
                    <Marker position={[report.locationLat, report.locationLng]} />
                  </MapContainer>
                </Box>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
