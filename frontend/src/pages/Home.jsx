import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadStyle.css";

const Home = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!file) return alert("Please upload a file first");

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
    } catch (err) {
      alert("Error analyzing resume");
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div className="glass-card">
        <h1 className="title">🚀 AI Resume Analyzer</h1>
        <p className="sub">Upload your resume & get smart career insights</p>

        <label className="file-btn">
          Choose File
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileSelect} hidden />
        </label>

        {file && <p className="file-name">📂 {file.name}</p>}

        <button className="analyze-btn" onClick={analyzeResume}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
};

export default Home;
