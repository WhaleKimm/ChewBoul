const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Set up middleware
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'src')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to upload video
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).json({ message: 'Upload successful', filename: req.file.filename });
});

// Route to get all uploaded videos
app.get('/videos', (req, res) => {
  const fs = require('fs');
  fs.readdir('uploads/', (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading videos' });
    }
    res.status(200).json({ videos: files });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
