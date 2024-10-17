const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Video = require('../models/Video');
const auth = require('../middleware/auth');

const router = express.Router();

// Multer 설정
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// 비디오 업로드
router.post('/upload', auth, upload.single('video'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = new Video({
      title,
      description,
      filePath: req.file.path,
      uploadedBy: req.user._id,
    });
    await video.save();
    res.status(201).send(video);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 비디오 목록 가져오기
router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find().populate('uploadedBy', 'username');
    res.send(videos);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
