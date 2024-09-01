import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Christmas from "./pages/Christmas";
import NewYear from "./pages/NewYear";
import CountdownCal from "./pages/CountdownCal";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Router basename="/DateCalculator">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/christmas" element={<Christmas />} />
        <Route path="/newyear" element={<NewYear />} />
        <Route path="/countdowncal" element={<CountdownCal />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
