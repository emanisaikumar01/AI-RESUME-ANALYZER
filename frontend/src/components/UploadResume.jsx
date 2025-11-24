import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please upload a file!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    navigate("/results", { state: { analysis: data.analysis } });
  };

  return (
    <div className="upload-container">
      <div
        className={`dropzone ${isDragging ? "drag-active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          id="hiddenInput"
          onChange={handleFileInput}
          hidden
        />

        <div className="upload-icon">⬆</div>
        <p className="dz-title">
          {selectedFile ? selectedFile.name : "Drop your resume here"}
        </p>

        <p className="dz-sub">Supports PDF, DOCX, TXT</p>

        <label htmlFor="hiddenInput" className="neon-button choose-btn">
          Choose File
        </label>
      </div>

      <button className="neon-button analyze-btn" onClick={handleUpload}>
        Analyze Resume
      </button>
    </div>
  );
};

export default UploadResume;
