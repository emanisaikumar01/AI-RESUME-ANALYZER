import React, { useState } from "react";
import { uploadResumeAPI } from "../api/backendAPI";

const UploadResume = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file first");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const result = await uploadResumeAPI(formData);
      onUploadComplete(result);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card neon-box popup-fade">
      <h2 className="neon-text">Upload Your Resume</h2>
      <p className="upload-subtext">
        Drop your PDF resume and let the AI agent analyze your skills, gaps,
        and best-fit roles.
      </p>

      <div className="file-drop">
        <input type="file" onChange={handleFileChange} />
      </div>

      <button className="neon-btn" onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {selectedFile && (
        <p className="file-name flicker-slow">
          Selected: <span>{selectedFile.name}</span>
        </p>
      )}
    </div>
  );
};

export default UploadResume;