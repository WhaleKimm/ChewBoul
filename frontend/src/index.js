// Function to upload a video
function uploadVideo() {
    const videoInput = document.getElementById('videoInput');
    const file = videoInput.files[0];

    if (!file) {
        alert('Please select a video file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('video', file);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('uploadStatus').textContent = data.message;
            loadVideos(); // Reload videos to show the newly uploaded one
        })
        .catch(error => {
            console.error('Error uploading video:', error);
        });
}

// Function to load videos and display them in the gallery
function loadVideos() {
    fetch('http://localhost:5000/videos')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('videoGallery');
            gallery.innerHTML = '';

            data.videos.forEach(video => {
                const videoElement = document.createElement('video');
                videoElement.src = `http://localhost:5000/${video}`;
                videoElement.controls = true;
                videoElement.classList.add('rounded-lg', 'shadow-lg', 'w-full', 'transition-all', 'hover:shadow-2xl');
                gallery.appendChild(videoElement);
            });
        })
        .catch(error => {
            console.error('Error loading videos:', error);
        });
}


// Load videos when the page is loaded
document.addEventListener('DOMContentLoaded', loadVideos);
