// import React from 'react'
// import './Hero.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser,faClock,faFile } from "@fortawesome/free-solid-svg-icons";

// const Hero = () => {
//   return (
//     <div className='hero'>
//         <div className='hero-details'>
//         <h2>Report an Incident</h2>
//         <p>Be the voice of change and report incidents in the community</p>
//         <button className='hero-button'>Report Now</button>
//         </div>

//         <div className='works'>
//             <h2>How it Works</h2>
//             <div className='works-details'>

//                 <div className="works-sections">
//                 <FontAwesomeIcon icon={faUser} className='faUser'/>
//                     <h3>Register</h3>
//                     <p>Create an account to get started</p>
//                 </div>

//                 <div className="works-sections">
//                 <FontAwesomeIcon icon={faFile} className='faFile' />
//                     <h3>Report</h3>
//                     <p>Submit a report about an incident</p>
//                 </div>

//                 <div className="works-sections">
//                 <FontAwesomeIcon icon={faClock}  className='faClock' />
//                     <h3>Follow Up</h3>
//                     <p>Track the progess of your report </p>
//                 </div>
//             </div>
//         </div>
//     </div>

    
//   )
// }

// export default Hero


// src/pages/Hero.jsx
import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Navbar from "../Navbar/Navbar.jsx"

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
                <Button variant="contained" color="primary" sx={{ mt: 1 }}>Submit Report</Button>
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
