import React from "react";
import { useLocation, Link } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="results-wrapper popup-fade">
      <h2 className="neon-text">Analysis Results</h2>

      {!data ? (
        <p>
          No analysis found. Please{" "}
          <Link to="/" className="nav-link">
            upload a resume
          </Link>{" "}
          first.
        </p>
      ) : (
        <div className="results-content">
          <pre className="results-json">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Results;