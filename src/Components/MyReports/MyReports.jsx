// src/pages/MyReports.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to fetch reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Reports
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {reports.length === 0 ? (
        <Typography>No reports submitted yet.</Typography>
      ) : (
        <Stack spacing={2} sx={{ width: "100%", maxWidth: 700 }}>
          {reports.map((report) => (
            <Paper key={report.id} sx={{ p: 2, borderRadius: 2, display: "flex", alignItems: "flex-start", gap: 2 }}>
              {/* Evidence thumbnail */}
              {report.evidence_url && report.evidence_type.startsWith("image/") ? (
                <Avatar
                  variant="rounded"
                  src={report.evidence_url}
                  sx={{ width: 60, height: 60 }}
                />
              ) : report.evidence_url ? (
                <Avatar variant="rounded" sx={{ width: 60, height: 60, bgcolor: "grey.300", fontSize: 12 }}>
                  PDF
                </Avatar>
              ) : null}

              {/* Report info */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{report.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {report.category || "N/A"} | Status: {report.status || "Pending"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.description.length > 80
                    ? report.description.slice(0, 80) + "..."
                    : report.description}
                </Typography>
                {report.location && (
                  <Typography variant="body2" color="text.secondary">
                    Location: {report.location}
                  </Typography>
                )}
              </Box>

              <Stack direction="column" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/reports/${report.id}`)}
                >
                  View
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
