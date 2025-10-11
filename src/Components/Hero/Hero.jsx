
import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Navbar from "../Navbar/Navbar.jsx"
import { Link } from "react-router-dom";

// Mock data for recent reports
const mockReports = [
  { id: 1, title: "Pothole on 5th Street", category: "Infrastructure", status: "Pending", date: "2025-10-01" },
  { id: 2, title: "Illegal dumping in park", category: "Environmental", status: "Resolved", date: "2025-09-28" },
  { id: 3, title: "Corruption report on local office", category: "Corruption", status: "Pending", date: "2025-09-30" },
];

export default function Hero() {
  return (
    <>

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
                <Typography variant="h6" sx={{ mt: 1 }}>New Report</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 1 }} component={Link} to="/submit-report" >Submit Report</Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <HourglassEmptyIcon color="warning" sx={{ fontSize: 40 }} />
                <Typography variant="h6" sx={{ mt: 1 }}>Pending Reports</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>2 Reports</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h6" sx={{ mt: 1 }}>Resolved Reports</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>1 Report</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Reports Table */}
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
          Recent Reports
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
