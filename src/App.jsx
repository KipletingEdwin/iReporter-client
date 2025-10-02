// import React from "react";
 //import Navbar from "./Components/Navbar/Navbar";
// import Hero from "./Components/Hero/Hero";

// function App() {
//   return (
//     <>
//       <div>
//         <Navbar />
//         <Hero />
//       </div>
//     </>
//   );
// }
// export default App;
// src/App.jsx
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Hero from "./Components/Hero/Hero.jsx";
import SubmitReport from "./Components/SubmitReport/SubmitReport.jsx";
//import MyReports from "./pages/MyReports.jsx";
//import ReportDetails from "./pages/ReportDetails.jsx";
//import Profile from "./pages/Profile.jsx";

// Layout with Navbar
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
          {/* <Route path="/my-reports" element={<MyReports />} /> */}

          {/* Report details page (dynamic route by ID) */}
          {/* <Route path="/report/:id" element={<ReportDetails />} /> */}

          {/* Profile page */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


