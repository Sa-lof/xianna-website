import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Blog from "./routes/Blog";
import Contact from "./routes/Contact";
import BlogDetails from "./routes/BlogDetail";
import "./App.css";
import Catalog from "./routes/Catalog";
import CatalogDetail from "./routes/CatalogDetail";
import Dashboard from "./routes_dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/catalogo/:id" element={<CatalogDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/dashboard/home" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
