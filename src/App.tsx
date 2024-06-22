// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./routes/Home";
import Dashboard from "./routes_dashboard/Dashboard";
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
