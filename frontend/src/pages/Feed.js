import React, { useState, useEffect } from 'react';

function Feed() {
  const [videos, setVideos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // 모든 사용자가 비디오 목록 가져오기
    fetch('http://localhost:5000/videos')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVideos(data);
        }
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to be logged in to upload a video.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Video uploaded successfully');
        setVideos((prevVideos) => [...prevVideos, data]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert(`Failed to upload video: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Upload Your Climbing Video</h1>
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <input
          type="file"
          id="videoInput"
          name="video"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="block mb-4 p-2 w-full text-blue-700 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 shadow-lg transition-all">
          Upload Video
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
        {/* 동영상 목록 표시 */}
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <video controls src={`https://99a2-220-149-255-9.ngrok-free.app/uploads/${video.filePath.split('/').pop()}`} className="w-full" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
