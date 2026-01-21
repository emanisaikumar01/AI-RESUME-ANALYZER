import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValidFile = (file) => {
    if (!file) return false;
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    return allowed.includes(file.type);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!isValidFile(file)) {
      alert("Only PDF, DOCX, TXT files are allowed!");
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!isValidFile(file)) {
      alert("Only PDF, DOCX, TXT files are allowed!");
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please upload a resume!");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data?.error || "Upload failed, try again.");
        setLoading(false);
        return;
      }

      navigate("/results", { state: { analysis: data.analysis } });
    } catch (error) {
      alert("Upload failed, try again.");
    }

    setLoading(false);
  };

  return (
    <div className="futuristic-container">
      <div className="hero-heading">
        <h1 className="hero-title">Analyze Your Resume with AI</h1>
        <p className="hero-subtitle">
          Upload your resume and get ATS-friendly suggestions instantly.
        </p>
      </div>

      <div
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-icon"></div>

        <h2 className="upload-title">
          {selectedFile ? selectedFile.name : "Drag & Drop Your Resume"}
        </h2>

        <p className="upload-sub">Supports PDF, DOCX, TXT</p>

        <div className="btn-row">
          <input
            type="file"
            id="fileUpload"
            hidden
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
          />

          <label htmlFor="fileUpload" className="neon-btn">
            Browse File
          </label>

          {selectedFile && (
            <button className="remove-btn" onClick={handleRemoveFile}>
              Remove
            </button>
          )}
        </div>
      </div>

      <button
        className={`analyze-btn ${loading ? "disabled" : ""}`}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      <div id="particles"></div>
    </div>
  );
};

export default UploadResume;
