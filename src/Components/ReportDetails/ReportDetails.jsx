// src/pages/ReportDetails.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const categories = ["Corruption", "Red-Flag", "Intervention", "Other"];

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/reports/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(response.data);
        setFormData({
          title: response.data.title || "",
          description: response.data.description || "",
          category: response.data.category || "",
          location: response.data.location || "",
        });
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to fetch report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/reports/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReport({ ...report, ...formData });
      setEditing(false);
    } catch (err) {
      console.error("Error updating report:", err);
      setError("Failed to update report.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/my-reports");
    } catch (err) {
      console.error("Error deleting report:", err);
      setError("Failed to delete report.");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;
  if (!report) return <Typography>Report not found.</Typography>;

  return (
    <Box sx={{ mt: 4, px: 2, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "100%", maxWidth: 600, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Report Details
        </Typography>

        <Stack spacing={2}>
          {editing ? (
            <>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
              <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </TextField>
              <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <Typography variant="h6">{report.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {report.category || "N/A"} | Status: {report.status || "Pending"}
              </Typography>
              <Typography variant="body1">{report.description}</Typography>
              {report.location && (
                <Typography variant="body2" color="text.secondary">
                  Location: {report.location}
                </Typography>
              )}

              {/* Evidence display */}
              {report.evidence_url && (
                <Box mt={2}>
                  <Typography variant="subtitle2">Evidence:</Typography>
                  {report.evidence_type.startsWith("image/") ? (
                    <img
                      src={report.evidence_url}
                      alt="Evidence"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  ) : (
                    <a href={report.evidence_url} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  )}
                </Box>
              )}

              <Stack direction="row" spacing={2} mt={2}>
                <Button variant="outlined" onClick={() => setEditing(true)}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                  Delete
                </Button>
                <Button variant="text" onClick={() => navigate("/my-reports")}>
                  Back
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
