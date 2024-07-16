import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Blog from "./routes/Blog";
import Contact from "./routes/Contact";
import BlogDetails from "./routes/BlogDetail";
import "./App.css";
import Catalog from "./routes/Catalog";
import CatalogDetail from "./routes/CatalogDetail";
import Profile from "./routes/Profile";
import Signup from "./routes/Signup";
import MyOutfits from "./routes/MyOutfits";
import Form from "./routes/Form";

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
          <Route path="/registro" element={<Signup />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/mis-outfits" element={<MyOutfits />} />
          <Route path="/formulario" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
