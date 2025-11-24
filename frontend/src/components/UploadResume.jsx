import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const openFileDialog = () => {
    inputRef.current.click();
  };

  const onFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!file) {
      alert("Upload or drop a resume first!");
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
      alert("Error analyzing resume");
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div
        className={`glass-card drop-zone ${dragActive ? "active" : ""}`}
        onClick={openFileDialog}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <h2 className="title">Upload Resume</h2>
        <p className="sub">Drag & Drop your resume here or click to browse</p>

        <input
          type="file"
          ref={inputRef}
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: "none" }}
          onChange={onFileSelect}
        />

        {file && <p className="file-name">📄 {file.name}</p>}

        <button className="analyze-btn" onClick={analyzeResume} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
};

export default UploadResume;
