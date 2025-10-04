// src/pages/SubmitReport.jsx
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

export default function SubmitReport() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    evidence: null,
  });

  const [error, setError] = useState("");

  const categories = [
    "Corruption",
    "Red-Flag",
    "Intervention",
    "Other",
  ];

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      evidence: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }

    // Normally you’d send this to the backend via API call
    console.log("Submitted data:", formData);

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      evidence: null,
    });

    // Navigate back to dashboard
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={3}
          color="primary"
        >
          Submit a New Report
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Title */}
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />

            {/* Description */}
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
            />

            {/* Category */}
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
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            {/* Location */}
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
            />

            {/* File upload */}
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none" }}
            >
              Upload Evidence
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*,application/pdf"
              />
            </Button>
            {formData.evidence && (
              <Typography variant="body2" color="text.secondary">
                {formData.evidence.name}
              </Typography>
            )}

            {/* Action buttons */}
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Submit Report
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
