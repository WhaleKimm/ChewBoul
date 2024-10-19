import React, { useState, useEffect } from 'react';

function Feed() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // 모든 사용자가 비디오 목록 가져오기
    fetch('http://localhost:5000/videos')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVideos(data);
        }
      })
      .catch((error) => console.error('동영상 가져오기 오류:', error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">클라이밍 동영상 피드</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 mt-6">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md">
              <video controls src={`https://99a2-220-149-255-9.ngrok-free.app/uploads/${video.filePath.split('/').pop()}`} className="w-full" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">아직 업로드된 동영상이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
