import React from "react";
import { useLocation, Link } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const analysis = location.state?.analysis;

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>AI Resume Analysis</h2>

      {!analysis ? (
        <p>No analysis found. <Link to="/">Upload again</Link></p>
      ) : (
        <div style={{
          background: "rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "12px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.6"
        }}>
          {analysis}
        </div>
      )}
    </div>
  );
};

export default Results;
