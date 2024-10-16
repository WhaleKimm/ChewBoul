import React from 'react';
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch videos from backend
  useEffect(() => {
    fetch('http://localhost:5000/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  // Handles file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handles file upload
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('video', selectedFile);

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setVideos([...videos, data]);
          setSelectedFile(null);
        })
        .catch(error => console.error('Error uploading video:', error));
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-5">Climbing Video Sharing Platform</h1>
      
      <div className="w-full max-w-md">
        <input type="file" accept="video/*" onChange={handleFileChange} className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800" />
        <button 
          onClick={handleUpload} 
          disabled={!selectedFile}
          className="block w-full bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 disabled:opacity-50 hover:bg-blue-800">
          Upload Video
        </button>
      </div>

      <div className="w-full max-w-lg">
        {videos.length === 0 ? (
          <p className="text-center text-gray-500">No videos uploaded yet.</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">My Videos</h2>
            <ul>
              {videos.map((video) => (
                <li key={video.id} className="mb-6 bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">{video.name}</h3>
                  <video controls className="w-full mb-2 rounded-md">
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-gray-600 text-sm">Uploaded on: {video.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
