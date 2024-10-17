import React, { useEffect, useState } from 'react';

function Feed() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('http://localhost:5000/videos');
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Explore Climbing Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white p-4 rounded-lg shadow-lg">
            <video controls className="w-full">
              <source src={`http://localhost:5000/${video.filePath}`} type="video/mp4" />
            </video>
            <p className="mt-2 text-center">Uploaded on: {new Date(video.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
