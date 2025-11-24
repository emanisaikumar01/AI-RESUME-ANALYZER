const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("📄 File received");

    // Convert PDF to text
    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text;

    console.log("📄 Extracted text length:", extractedText.length);

    // Gemini AI processing
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `Analyze this resume and provide skills, weaknesses, and suggested job roles:\n\n${extractedText}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const result = await response.json();
    console.log("AI result received");

    return res.json({
      success: true,
      analysis: result.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.error("🔥 Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
