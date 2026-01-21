import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const analysis = location.state?.analysis || "";

  const sections = analysis
    .split("###")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="results-container">
      <h1 className="title">AI Resume Insights</h1>
      <p className="results-subtitle">
        Here’s what the AI found in your resume.
      </p>

      {sections.length === 0 ? (
        <div className="glass-card">
          <p className="text">No analysis found. Please upload again.</p>
        </div>
      ) : (
        sections.map((section, index) => (
          <div key={index} className="glass-card">
            <p className="text">{section}</p>
          </div>
        ))
      )}

      <Link to="/" className="back-btn">
        Analyze Another Resume
      </Link>
    </div>
  );
};

export default Results;
