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

    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text || "";
    console.log("📄 Extracted text length:", extractedText.length);

    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `Analyze the following resume and provide:
- Key skills (bullet list)
- Weaknesses / gaps (bullet list)
- 3 suggested job roles
- An approximate ATS score (0–100) with 1–2 lines of reasoning.

Resume text:
${extractedText}`;

    // 🔥 Use a CURRENT model: gemini-2.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const result = await response.json();
    console.log("🤖 Gemini raw response:", JSON.stringify(result, null, 2));

    if (!result.candidates || !result.candidates.length) {
      console.error("Gemini returned no candidates:", result);
      return res.status(500).json({
        error: "AI could not generate analysis",
        details: result,
      });
    }

    const analysis = result.candidates[0].content.parts[0].text;

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
