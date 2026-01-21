import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

const App = () => {
  const location = useLocation();

  return (
    <div className="app-root">
      {/* Background Effects */}
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      {/* Navbar */}
      <nav className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo">
            <span className="logo-dot" />
            AI Resume Analyzer
          </div>
          <div className="nav-badge">AI Powered</div>
        </div>

        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/results"
            className={`nav-link ${
              location.pathname === "/results" ? "active" : ""
            }`}
          >
            Results
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>

      {/* Bottom Glow */}
      <div className="bottom-glow" />
    </div>
  );
};

export default App;
