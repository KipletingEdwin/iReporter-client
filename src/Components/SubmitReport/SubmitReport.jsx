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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlaceIcon from "@mui/icons-material/Place";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleIcon from "@mui/icons-material/Title";
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, evidence: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.description || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await axios.post("http://localhost:3000/reports", data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setSuccess("Report submitted successfully!");
      setFormData({ title: "", description: "", category: "", location: "", evidence: null });
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
        background: "linear-gradient(135deg, #e0f7fa, #e3f2fd)",
        p: 2,
      }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 600,
            p: 5,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.8)",
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
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                InputProps={{ startAdornment: <PlaceIcon sx={{ mr: 1, color: "primary.main" }} /> }}
              />

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
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/")}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
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
