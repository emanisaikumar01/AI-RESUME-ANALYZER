import React from "react";
import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
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

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Resume Analysis Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`ATS Score: ${analysis.ats_score || "N/A"}`, 20, 40);

    if (analysis.job_match_score !== undefined) {
      doc.text(`Job Match Score: ${analysis.job_match_score}`, 20, 50);
    }

    doc.text("Summary:", 20, 70);
    doc.text(analysis.summary || "", 20, 80, { maxWidth: 170 });

    doc.text("Key Skills:", 20, 110);
    doc.text((analysis.key_skills || []).join(", "), 20, 120, {
      maxWidth: 170,
    });

    doc.text("Missing Skills:", 20, 140);
    doc.text((analysis.missing_skills || []).join(", "), 20, 150, {
      maxWidth: 170,
    });

    doc.save("resume-analysis.pdf");
  };

  return (
    <div className="results-container">
      <h1 className="title">AI Resume Insights</h1>

      {/* ATS SCORE */}
      <div className="glass-card score-card">
        <h2>ATS Score</h2>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${analysis.ats_score || 0}%` }}
          ></div>
        </div>

        <p className="score">{analysis.ats_score || "N/A"} / 100</p>
      </div>

      {/* JOB MATCH SCORE */}
      {analysis.job_match_score !== undefined && (
        <div className="glass-card score-card">
          <h2>Job Match Score</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${analysis.job_match_score}%` }}
            ></div>
          </div>

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

        <div className="skills-grid">
          {analysis.key_skills?.map((skill, i) => (
            <span key={i} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
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

          <div className="skills-grid">
            {analysis.matched_skills.map((skill, i) => (
              <span key={i} className="skill-badge match">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* MISSING SKILLS */}
      {analysis.missing_skills && (
        <div className="glass-card">
          <h2>Missing Skills</h2>

          <div className="skills-grid">
            {analysis.missing_skills.map((skill, i) => (
              <span key={i} className="skill-badge missing">
                {skill}
              </span>
            ))}
          </div>
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

      {/* DOWNLOAD REPORT */}
      <button className="download-btn" onClick={downloadPDF}>
        Download Report
      </button>

      <Link to="/" className="back-btn">
        Analyze Another Resume
      </Link>
    </div>
  );
};

export default Results;
