const express = require("express");
const multer = require("multer");
const path = require("path");
const { handleResumeUpload } = require("../controllers/resumeController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/", upload.single("resume"), handleResumeUpload);

module.exports = router;