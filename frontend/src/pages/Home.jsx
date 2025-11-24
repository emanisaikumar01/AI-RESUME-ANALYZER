import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UploadStyle.css";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave" || event.type === "drop") {
      setDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please upload a resume file first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      navigate("/results", { state: { analysis: data.analysis } });
    } catch (error) {
      console.error(error);
      alert("Upload failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div
        className={`drop-card ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-icon">⬆</div>
        <h2 className="dz-title">
          {selectedFile ? selectedFile.name : "Drag & Drop your resume here"}
        </h2>
        <p className="dz-sub">Supports PDF, DOCX, TXT</p>

        <input
          type="file"
          id="fileUpload"
          accept=".pdf,.docx,.txt"
          hidden
          onChange={handleFileChange}
        />

        <label className="browse-btn" htmlFor="fileUpload">
          Browse File
        </label>

        <button className="analyze-btn" onClick={handleUpload}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
};

export default Home;
