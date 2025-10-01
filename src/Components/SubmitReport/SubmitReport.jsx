// src/pages/SubmitReport.jsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
//import Navbar from "./Components/Navbar/Navbar";

const categories = ["Corruption", "Red-Flag", "Intervention", "Infrastructure", "Environmental"];

export default function SubmitReport() {
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      evidence: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Report submitted successfully!");
    reset(); // reset form after submission
  };

  return (
    <>
      {/* <Navbar /> */}
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Submit a New Report
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 2 }}
          >
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title ? errors.title.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                      error={!!errors.description}
                      helperText={errors.description ? errors.description.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Category"
                      fullWidth
                      error={!!errors.category}
                      helperText={errors.category ? errors.category.message : ""}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Location (optional)" fullWidth />
                  )}
                />
              </Grid>

              {/* File Upload */}
              <Grid item xs={12}>
                <Controller
                  name="evidence"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  )}
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" onClick={() => reset()}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit Report
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
