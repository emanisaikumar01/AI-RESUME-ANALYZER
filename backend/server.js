const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const uploadRoute = require("./src/routes/uploadRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

app.use("/upload", uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});