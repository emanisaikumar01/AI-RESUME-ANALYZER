import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

const App = () => {
  return (
    <div className="app-root">
      <nav className="nav-bar">
        <div className="nav-logo">AI Resume Analyzer</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/results" className="nav-link">Results</Link>
        </div>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>

      <div className="bottom-glow" />
    </div>
  );
};

export default App;