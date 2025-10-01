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
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Components/Hero/Hero"
import Navbar from "./Components/Navbar/Navbar";
import SubmitReport from "./Components/SubmitReport/SubmitReport";

function App() {
  return (
    
    <Router>
              <Navbar />
      <Routes>

        {/* Dashboard / Home */}
        <Route path="/" element={<Hero />} />

        {/* Submit Report page */}
        <Route path="/submit-report" element={<SubmitReport />} />

        {/* Future pages can be added here, e.g., MyReports */}
        {/* <Route path="/my-reports" element={<MyReports />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

