// src/pages/MyReports.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MyReports() {
  const navigate = useNavigate();

  // 🧪 Fake sample reports (replace with API data later)
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Illegal Waste Dumping",
      category: "Red-Flag",
      status: "Pending",
      date: "2025-10-01",
    },
    {
      id: 2,
      title: "Bribery at Customs Office",
      category: "Corruption",
      status: "Resolved",
      date: "2025-09-28",
    },
    {
      id: 3,
      title: "Broken Streetlight Fix",
      category: "Intervention",
      status: "Rejected",
      date: "2025-09-25",
    },
  ]);

  // Handle delete (for now, just removes from local state)
  const handleDelete = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  // Function to render color-coded status
  const renderStatusChip = (status) => {
    const colors = {
      Pending: "warning",
      Resolved: "success",
      Rejected: "error",
    };
    return <Chip label={status} color={colors[status]} size="small" />;
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 900, p: 3, borderRadius: 3 }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={3}
          color="primary"
        >
          My Reports
        </Typography>

        {reports.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            You haven’t submitted any reports yet.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{renderStatusChip(report.status)}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/report/${report.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(report.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
