import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Upload.css";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") setDragActive(true);
    else if (event.type === "dragleave") setDragActive(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please upload a resume first.");
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
      alert("Upload failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div className={`drop-card ${dragActive ? "active" : ""}`}
           onDragEnter={handleDrag}
           onDragLeave={handleDrag}
           onDragOver={handleDrag}
           onDrop={handleDrop}
      >
        <div className="upload-icon">⬆</div>
        <h2>Drop your resume here</h2>
        <p>Supports PDF, DOCX, TXT</p>

        <input
          type="file"
          accept=".pdf,.docx,.txt"
          id="fileUpload"
          hidden
          onChange={handleFileChange}
        />

        <label className="browse-btn" htmlFor="fileUpload">Browse File</label>

        {selectedFile && <p className="file-name">{selectedFile.name}</p>}

        <button className="analyze-btn" onClick={handleUpload}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
};

export default Home;
