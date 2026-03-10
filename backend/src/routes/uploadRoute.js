const express = require("express");
const multer = require("multer");
const { handleResumeUpload } = require("../controllers/resumeController");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
});


router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    console.log("📄 Resume upload request received");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    console.log("📄 File name:", req.file.originalname);
    console.log("📄 File path:", req.file.path);

    return handleResumeUpload(req, res);

  } catch (error) {
    console.error("🔥 Upload route error:", error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message
    });
  }
});

module.exports = router;
