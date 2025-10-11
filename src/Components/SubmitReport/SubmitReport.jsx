import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SubmitReport() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    evidence: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = ["Corruption", "Red-Flag", "Intervention", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, evidence: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.description || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // JWT from login
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      if (formData.evidence) {
        data.append("evidence", formData.evidence);
      }

      await axios.post("http://localhost:3000/reports", data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Report submitted successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        evidence: null,
      });

      setTimeout(() => navigate("/my-reports"), 1500);
    } catch (err) {
      console.error("Submit report error:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join(", "));
      } else {
        setError("An error occurred while submitting the report.");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 600, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="primary">
          Submit a New Report
        </Typography>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        {success && <Typography color="success.main" sx={{ mb: 2 }}>{success}</Typography>}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required fullWidth />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} required fullWidth multiline rows={4} />
            <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} required fullWidth>
              {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </TextField>
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />

            <Button variant="outlined" component="label" sx={{ textTransform: "none" }}>
              Upload Evidence
              <input type="file" hidden onChange={handleFileChange} accept="image/*,application/pdf" />
            </Button>
            {formData.evidence && <Typography variant="body2" color="text.secondary">{formData.evidence.name}</Typography>}

            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">Submit Report</Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
