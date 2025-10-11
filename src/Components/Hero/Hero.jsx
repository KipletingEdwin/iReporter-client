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
  Box,
  Stack,
  Chip,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ArticleIcon from "@mui/icons-material/Article";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CountUp from "react-countup"; // Animated counter

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

  const pendingCount = reports.filter((r) => r.status === "Pending").length;
  const resolvedCount = reports.filter((r) => r.status === "Resolved").length;

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress size={60} />
      </Box>
    );

  return (
    <Container sx={{ mt: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
          Welcome to iReporter
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Submit new reports and track the status of your existing reports in real-time.
        </Typography>
      </Box>

      {/* Summary Dashboard Cards with Animated Counters */}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              py: 4,
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              color: "white",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
            }}
          >
            <CardContent>
              <ReportProblemIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                New Report
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "white", color: "#2575fc", fontWeight: "bold" }}
                component={Link}
                to="/submit-report"
              >
                Submit Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              py: 4,
              background: "linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)",
              color: "white",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
            }}
          >
            <CardContent>
              <HourglassEmptyIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Pending Reports
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                <CountUp end={pendingCount} duration={1.5} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              py: 4,
              background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
              color: "white",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
            }}
          >
            <CardContent>
              <CheckCircleIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Resolved Reports
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                <CountUp end={resolvedCount} duration={1.5} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Reports Table */}
      <Box mt={6}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Recent Reports
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/submit-report"
          >
            Submit New Report
          </Button>
        </Stack>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {reports.length === 0 ? (
          <Typography>No reports submitted yet.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ overflowX: "auto", borderRadius: 3 }}>
            <Table stickyHeader>
              <TableHead sx={{ bgcolor: "primary.light" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Evidence</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ArticleIcon fontSize="small" color="action" />
                        <Typography>{report.title}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        size="small"
                        color={report.status === "Resolved" ? "success" : "warning"}
                      />
                    </TableCell>
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
      </Box>
    </Container>
  );
}
