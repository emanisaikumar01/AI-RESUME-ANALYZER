const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📄 File received");

    // Convert PDF to text
    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text;
    console.log("📄 Extracted text length:", extractedText.length);

    // Gemini AI Processing
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `Analyze this resume and provide skills, weaknesses, and suggested job roles in a structured format:\n\n${extractedText}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const result = await response.json();
    console.log("🤖 Gemini raw response:", result);

    // ✨ SAFE RESULT PARSE
    if (!result.candidates || !result.candidates[0] || !result.candidates[0].content) {
      console.error("⚠ Gemini returned no candidates:", result);
      return res.status(500).json({
        error: "AI could not generate analysis",
        details: result,
      });
    }

    const analysis = result.candidates[0].content.parts[0].text;
    console.log("✨ AI analysis extracted");

    return res.json({
      success: true,
      analysis,
    });

  } catch (error) {
    console.error("🔥 Error in /upload:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
