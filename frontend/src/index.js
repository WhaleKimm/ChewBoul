document.getElementById('uploadForm').addEventListener('submit', async (e) => {
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

// 네비게이터 바 버튼 이벤트 리스너 추가
document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = '/';
});

document.getElementById('feedBtn').addEventListener('click', () => {
    window.location.href = '/feed';
});

document.getElementById('profileBtn').addEventListener('click', () => {
    // 사용자 프로필 페이지로 이동하도록 구현 필요
    window.location.href = '/profile';
});