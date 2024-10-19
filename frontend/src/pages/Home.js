import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">ChewBoul</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">ChewBoul에 오신 것을 환영합니다!</h2>
        <p className="text-gray-700">클라이밍을 사랑하는 모든 분들을 위한 공간입니다.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">당신의 클라이밍 성향은?</h2>
        <div className="mb-6">
          <img src={require('../image/test.png')} alt="성향 테스트 이미지" className="w-full rounded-lg shadow-md" />
        </div>
        <p className="text-gray-700 mb-4">재미있는 테스트로 자신의 클라이밍 스타일을 알아보세요!</p>
        <Link to="/personality-test" className="block bg-blue-500 text-white text-center py-2 px-4 rounded-full hover:bg-blue-600 transition-colors">
          성향 테스트 시작하기
        </Link>
      </div>
    </div>
  );
}

export default Home;
