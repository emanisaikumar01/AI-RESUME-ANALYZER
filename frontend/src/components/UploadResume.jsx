import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadResume.css";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please upload a resume first!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      navigate("/results", { state: data });
    } catch (err) {
      alert("Error analyzing resume. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div className="glass-card">

        <h2 className="title">AI Resume Analyzer</h2>
        <p className="sub">Drop your resume here or click to upload</p>

        {/* Drag area */}
        <div
          className={`drop-zone ${dragActive ? "drag-active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input").click()}
        >
          {selectedFile ? selectedFile.name : "Drag & Drop Resume Here"}
        </div>

        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx,.txt"
          style={{ display: "none" }}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        <button className="analyze-btn" onClick={handleUpload}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
};

export default UploadResume;
