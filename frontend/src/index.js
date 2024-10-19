import React from 'react';
import ReactDOM from 'react-dom/client'; // 변경된 부분
import App from './App';
import './index.css';

// createRoot 사용
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You need to log in to upload a video.');
                return;
            }

            const videoInput = document.getElementById('videoInput');
            const file = videoInput.files[0];
            if (!file) {
                alert('Please select a video file to upload.');
                return;
            }

            const formData = new FormData();
            formData.append('video', file);

            try {
                const response = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                });
                const data = await response.json();
                document.getElementById('uploadStatus').textContent = data.message;
            } catch (error) {
                console.error('Error uploading video:', error);
            }
        });
    }

    // 네비게이터 바 버튼 이벤트 리스너 추가
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    const feedBtn = document.getElementById('feedBtn');
    if (feedBtn) {
        feedBtn.addEventListener('click', () => {
            window.location.href = '/feed';
        });
    }

    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            window.location.href = '/profile';
        });
    }
});
