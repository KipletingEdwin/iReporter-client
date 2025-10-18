import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";

import Hero from "./Components/Hero/Hero.jsx";
import SubmitReport from "./Components/SubmitReport/SubmitReport.jsx";
import MyReports from "./Components/MyReports/MyReports.jsx";
import ReportDetails from "./Components/ReportDetails/ReportDetails.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Login from "./Components/Login/Login.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import MapView from "./Components/MapView/MapView.jsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/submit-report" element={<SubmitReport />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
