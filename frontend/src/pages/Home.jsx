import React from "react";
import { useNavigate } from "react-router-dom";
import UploadResume from "../components/UploadResume";

const Home = () => {
  const navigate = useNavigate();

  const handleUploadComplete = (result) => {
    navigate("/results", { state: result });
  };

  return (
    <div className="home-hero">
      <div className="hero-left">
        <h1 className="hero-title glow-text">
          <span>AI Resume Analyzer</span>
        </h1>
        <p className="hero-subtitle">
          Let our AI agent read your resume, map your skills, and highlight
          the next upgrades for a high-paying career.
        </p>

        <div className="hero-badges">
          <div className="badge">AI-Powered Insights</div>
          <div className="badge">Skill Radar</div>
          <div className="badge">ATS Friendly Tips</div>
        </div>
      </div>

      <div className="hero-right">
        <UploadResume onUploadComplete={handleUploadComplete} />
      </div>

      <div className="orbit-circle orbit-1" />
      <div className="orbit-circle orbit-2" />
      <div className="orbit-circle orbit-3" />
    </div>
  );
};

export default Home;
