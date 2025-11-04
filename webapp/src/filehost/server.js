const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;
const FILES_DIR = path.join(__dirname, "files");

// Enable CORS for all requests
app.use(cors());

// Serve static files from the 'files' directory
app.use("/files", express.static(FILES_DIR));

app.get("/", (req, res) => {
  res.send("File hosting server is running. Access files at /files/{filename}");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Access files at http://localhost:${PORT}/files/{filename}`);
});
