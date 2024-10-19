// Express 서버 설정 코드
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Video = require('../models/Video');
const auth = require('../middleware/auth');

const app = express();
const router = express.Router();

// 정적 파일 제공 설정
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// 비디오 업로드 라우트
router.post('/upload', auth, upload.single('video'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = new Video({
      title,
      description,
      filePath: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id,
    });
    await video.save();
    res.status(201).send(video);
  } catch (error) {
    console.error('Failed to upload video:', error);
    res.status(400).send({ message: 'Failed to upload video', error });
  }
});

// 비디오 목록 가져오기 라우트
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().populate('uploadedBy', 'username');
    // 동영상 URL을 동적으로 생성
    const host = req.get('host'); // 요청의 호스트 이름을 가져옴
    const protocol = req.protocol; // 요청의 프로토콜을 가져옴 (http 또는 https)
    videos.forEach(video => {
      video.url = `${protocol}://${host}${video.filePath}`;
    });
    res.send(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).send({ message: 'Error fetching videos', error });
  }
});

module.exports = router;
