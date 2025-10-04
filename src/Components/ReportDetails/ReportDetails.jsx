// src/pages/ReportDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mocked single report — replace with API call later
  const report = {
    id,
    title: "Illegal Waste Dumping",
    category: "Red-Flag",
    description:
      "Residents have been dumping industrial waste near the river, causing pollution and foul smell. Authorities have been notified multiple times with no action.",
    location: "Riverside Zone 3",
    status: "Pending",
    date: "2025-10-01",
    evidence: "waste-dump.jpg",
  };

  const renderStatusChip = (status) => {
    const colors = {
      Pending: "warning",
      Resolved: "success",
      Rejected: "error",
    };
    return <Chip label={status} color={colors[status]} />;
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          Report Details
        </Typography>

        <Stack spacing={2}>
          <Typography variant="h6">{report.title}</Typography>
          {renderStatusChip(report.status)}

          <Typography variant="body1">
            <strong>Category:</strong> {report.category}
          </Typography>

          <Typography variant="body1">
            <strong>Location:</strong> {report.location}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <strong>Date:</strong> {report.date}
          </Typography>

          <Typography variant="body1" mt={2}>
            <strong>Description:</strong>
            <br />
            {report.description}
          </Typography>

          {report.evidence && (
            <Box mt={2}>
              <Typography variant="body1" mb={1}>
                <strong>Evidence:</strong>
              </Typography>
              <img
                src={`/uploads/${report.evidence}`} // later from your API or cloud
                alt="Evidence"
                style={{
                  width: "100%",
                  maxHeight: 300,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
            <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="contained" color="primary">
              Edit Report
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

