import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
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

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      navigate("/results", { state: { analysis: data.analysis } });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="file-upload-container">
  <label className="custom-file-upload">
    <input
      type="file"
      accept=".pdf,.docx,.txt"
      onChange={handleFileChange}
    />
    Choose Resume
  </label>

  <button className="analyze-btn" onClick={handleUpload} disabled={loading}>
    {loading ? "Analyzing..." : "Analyze Resume"}
  </button>
</div>

  );
};

export default UploadResume;
