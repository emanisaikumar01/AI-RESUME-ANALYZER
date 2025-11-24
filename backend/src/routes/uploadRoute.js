const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("📄 File received");

    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text;
    console.log("📄 Extracted text length:", extractedText.length);

    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `Analyze the following resume and provide:
- Skills
- Weaknesses
- Job role suggestions
- ATS score
\n\n${extractedText}`;

  const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateText?key=${apiKey}`,
,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  }
);



    const result = await response.json();
    console.log("🤖 Gemini response:", JSON.stringify(result, null, 2));

    if (!result.candidates || !result.candidates[0]) {
      return res.status(500).json({
        error: "AI could not generate analysis. Try a different PDF.",
        details: result,
      });
    }

    const analysis = result.candidates[0].content.parts[0].text;

    return res.json({
      success: true,
      analysis,
    });

  } catch (error) {
    console.error("🔥 Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
