import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import FindCentersPage from "./pages/FindCentersPage"
import CenterDetailsPage from "./pages/CenterDetailsPage";
import About from './pages/About';


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-centers" element={<FindCentersPage />} />
        <Route path="/centres/loc/:loc_id" element={<CenterDetailsPage />} />
        <Route path="/about" element={<About />} />
        
      </Routes>
    </Router>
  
    
  );
}

export default App;
