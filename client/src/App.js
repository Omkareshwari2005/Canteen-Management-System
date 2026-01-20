import React from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./components/Auth";
import ChefDashboard from "./components/ChefDashboard";
import StudentDashboard from "./components/StudentDashboard";

function App() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<Auth />} />

      {/* Dashboards */}
      <Route path="/chef" element={<ChefDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;