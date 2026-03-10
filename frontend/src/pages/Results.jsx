import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <div className="results-container">
        <h1 className="title">AI Resume Insights</h1>
        <div className="glass-card">
          <p className="text">No analysis found. Please upload again.</p>
        </div>

        <Link to="/" className="back-btn">
          Analyze Another Resume
        </Link>
      </div>
    );
  }

  return (
    <div className="results-container">

      <h1 className="title">AI Resume Insights</h1>

      {/* ATS SCORE */}
      <div className="glass-card score-card">
        <h2>ATS Score</h2>
        <p className="score">{analysis.ats_score || "N/A"} / 100</p>
      </div>

      {/* JOB MATCH SCORE */}
      {analysis.job_match_score !== undefined && (
        <div className="glass-card score-card">
          <h2>Job Match Score</h2>
          <p className="score">{analysis.job_match_score} / 100</p>
        </div>
      )}

      {/* SUMMARY */}
      <div className="glass-card">
        <h2>Summary</h2>
        <p className="text">{analysis.summary}</p>
      </div>

      {/* KEY SKILLS */}
      <div className="glass-card">
        <h2>Key Skills</h2>
        <ul>
          {analysis.key_skills?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* STRENGTHS */}
      <div className="glass-card">
        <h2>Strengths</h2>
        <ul>
          {analysis.strengths?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* IMPROVEMENTS */}
      <div className="glass-card">
        <h2>Improvements</h2>
        <ul>
          {analysis.improvements?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* MATCHED SKILLS */}
      {analysis.matched_skills && (
        <div className="glass-card">
          <h2>Matched Skills</h2>
          <ul>
            {analysis.matched_skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* MISSING SKILLS */}
      {analysis.missing_skills && (
        <div className="glass-card">
          <h2>Missing Skills</h2>
          <ul>
            {analysis.missing_skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SUGGESTED ROLES */}
      <div className="glass-card">
        <h2>Suggested Roles</h2>
        <ul>
          {analysis.suggested_roles?.map((role, i) => (
            <li key={i}>{role}</li>
          ))}
        </ul>
      </div>

      <Link to="/" className="back-btn">
        Analyze Another Resume
      </Link>

    </div>
  );
};

export default Results;
