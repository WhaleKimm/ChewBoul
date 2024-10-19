// server.js
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // 모든 출처를 허용하거나, 특정 도메인만 허용하도록 설정할 수 있음
}));

// Routes
app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
// uploads 폴더를 정적 파일로 제공
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));