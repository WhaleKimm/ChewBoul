import React, { useState, useRef } from 'react';

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('업로드하려면 로그인이 필요합니다.');
      return;
    }

    if (selectedFiles.length === 0) {
      setUploadStatus('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
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
        setSelectedFiles([]);
        setPreviewUrls([]);
      } else {
        setUploadStatus('업로드 실패');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('업로드 중 오류가 발생했습니다.');
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-4">새 게시물</h1>
      
      {/* 미리보기 영역 */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 h-64 overflow-auto">
        {previewUrls.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt={`미리보기 ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            미리보기 없음
          </div>
        )}
      </div>
      
      {/* 파일 선택 버튼 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*,video/*"
        className="hidden"
      />
      <button 
        onClick={openFilePicker}
        className="bg-gray-200 text-gray-800 w-full py-2 rounded-lg mb-4 hover:bg-gray-300"
      >
        갤러리에서 선택
      </button>
      
      {/* 업로드 버튼 */}
      <button 
        onClick={handleUpload} 
        className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
      >
        업로드
      </button>
      {uploadStatus && <p className="text-center mt-4">{uploadStatus}</p>}
    </div>
  );
}

export default Upload;
