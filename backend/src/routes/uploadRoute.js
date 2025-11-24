const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("File received:", req.file);

    // Your processing logic....

    res.json({ success: true, message: "Uploaded successfully" });
  } catch (error) {
    console.error("Error in /upload:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
