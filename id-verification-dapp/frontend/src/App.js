import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ViewIdentity from "./pages/ViewIdentity";
import VerifyIdentity from "./pages/VerifyIdentity";
import Files from "./pages/Files";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view" element={<ViewIdentity />} />
          <Route path="/verify" element={<VerifyIdentity />} />
          <Route path="/files" element={<Files />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
