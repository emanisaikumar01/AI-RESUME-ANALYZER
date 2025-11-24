import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UploadStyle.css";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please upload a resume!");

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
      alert("Upload failed, try again.");
    }

    setLoading(false);
  };

  return (
    <div className="futuristic-container">
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

        <input type="file" id="fileUpload" hidden accept=".pdf,.docx,.txt" onChange={handleFileChange} />
        <label htmlFor="fileUpload" className="neon-btn">Browse File</label>
      </div>

      <button className="analyze-btn" onClick={handleUpload}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      <div id="particles"></div>
    </div>
  );
};

export default Home;
