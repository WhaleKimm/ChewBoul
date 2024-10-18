import React, { useState } from 'react';

function Feed() {
  const [videos, setVideos] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    const video = e.target.video.files[0];
    // 파일 업로드 로직 추가
    console.log("Uploaded video:", video);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Upload Your Climbing Video</h1>
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <input type="file" id="videoInput" name="video" className="block mb-4 p-2 w-full text-blue-700 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button type="submit" className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 shadow-lg transition-all">
          Upload Video
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
        {/* 동영상 목록 표시 */}
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <video controls src={video} className="w-full" />
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
