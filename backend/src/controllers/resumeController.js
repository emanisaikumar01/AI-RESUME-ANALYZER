const { extractTextFromPDF } = require("../utils/pdfParser");
const { analyzeWithGemini } = require("../../services/geminiService");

async function handleResumeUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const resumeText = await extractTextFromPDF(filePath);

    const analysis = await analyzeWithGemini(resumeText);

    res.json({
      success: true,
      message: "Resume analyzed successfully",
      data: analysis
    });
  } catch (err) {
    console.error("Error in handleResumeUpload", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = { handleResumeUpload };