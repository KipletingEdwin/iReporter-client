// src/pages/Hero.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Hero() {
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
        setError("Failed to load reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Counts for dashboard cards
  const pendingCount = reports.filter((r) => r.status === "Pending").length;
  const resolvedCount = reports.filter((r) => r.status === "Resolved").length;

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ mt: 4 }}>
      {/* Hero / Welcome Section */}
      <Typography variant="h4" gutterBottom>
        Welcome to iReporter Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Submit new reports and track the status of your existing reports.
      </Typography>

      {/* Dashboard Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <ReportProblemIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ mt: 1 }}>
                New Report
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                component={Link}
                to="/submit-report"
              >
                Submit Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <HourglassEmptyIcon color="warning" sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ mt: 1 }}>
                Pending Reports
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {pendingCount} Report{pendingCount !== 1 ? "s" : ""}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ mt: 1 }}>
                Resolved Reports
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {resolvedCount} Report{resolvedCount !== 1 ? "s" : ""}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Reports Table */}
      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
        Recent Reports
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {reports.length === 0 ? (
        <Typography>No reports submitted yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Evidence</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {report.evidence_url ? (
                      report.evidence_type.startsWith("image/") ? (
                        <Avatar
                          variant="rounded"
                          src={report.evidence_url}
                          sx={{ width: 40, height: 40 }}
                        />
                      ) : (
                        <Typography variant="caption">PDF</Typography>
                      )
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/reports/${report.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
