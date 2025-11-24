import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      navigate("/results", { state: data });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div className="glass-card">
        <h2 className="title">AI Resume Analyzer</h2>
        <p className="sub">Upload your resume and let AI analyze your skills & career fit</p>

        <label className="file-btn">
          Choose File
          <input type="file" accept=".pdf,.doc,.docx,.txt" hidden onChange={handleFileSelect} />
        </label>

        {file && <p className="file-name">📂 {file.name}</p>}

        <button className="analyze-btn" onClick={analyzeResume} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
};

export default UploadResume;
