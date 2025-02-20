import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
/* import { Provider } from "./components/ui/provider"; */
import HomePage from "./pages/HomePage";
import FindCentersPage from "./pages/FindCentersPage"
import CenterDetailsPage from "./pages/CenterDetailsPage";

function App() {
  return (
    
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-centers" element={<FindCentersPage />} />
        <Route path="/centres/loc/:loc_id" element={<CenterDetailsPage />} />
      </Routes>
    </Router>
  
    
  );
}

export default App;
