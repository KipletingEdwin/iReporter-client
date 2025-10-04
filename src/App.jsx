
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./Components/Hero/Hero.jsx";
import SubmitReport from "./Components/SubmitReport/SubmitReport.jsx";
import MyReports from "./Components/MyReports/MyReports.jsx";
import ReportDetails from "./Components/ReportDetails/ReportDetails.jsx";


import Layout from "./Components/Layout/Layout.jsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Dashboard / Home */}
          <Route path="/" element={<Hero />} />

          {/* Submit Report page */}
          <Route path="/submit-report" element={<SubmitReport />} />

          {/* User reports list */}
          <Route path="/my-reports" element={<MyReports />} />

          {/* Report details page (dynamic route by ID) */}
          <Route path="/report/:id" element={<ReportDetails />} />

          {/* Profile page */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


