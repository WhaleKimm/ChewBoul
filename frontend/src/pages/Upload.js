import React, { useState } from 'react';

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    // 파일 미리보기 URL 설정
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previewUrls);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to be logged in to upload a video.');
      return;
    }

    if (selectedFiles.length === 0) {
      setUploadStatus('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('video', file);
    });

    try {
      setUploadStatus('업로드 중...');
      const response = await fetch('http://localhost:5000/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('업로드 완료!');
      } else {
        setUploadStatus('업로드 실패');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadStatus('업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-4">새 게시물</h1>
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block mb-4 w-full text-sm"
          accept="image/*,video/*"
        />
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600">
          Upload Video
        </button>
        {uploadStatus && <p className="text-center mt-4">{uploadStatus}</p>}
      </form>
      
      {/* 선택한 파일 미리보기 */}
      <div className="grid grid-cols-3 gap-2">
        {previewUrls.map((url, index) => (
          <div key={index} className="h-32 overflow-hidden rounded-lg shadow-md">
            <img src={url} alt={`미리보기 ${index + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upload;
