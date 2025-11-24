import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Results.css"; // styling file we will create

const Results = () => {
  const location = useLocation();
  const analysis = location.state?.analysis || "";

  // Split the response into structured sections
  const sections = analysis.split("###").map((section) => section.trim());

  return (
    <div className="results-container">
      <h1 className="title">AI Resume Insights</h1>

      {sections.map((section, index) => (
        <div key={index} className="glass-card">
          <p className="text">{section}</p>
        </div>
      ))}

      <Link to="/" className="back-btn">
        Analyze Another Resume
      </Link>
    </div>
  );
};

export default Results;
