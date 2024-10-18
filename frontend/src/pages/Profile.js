import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .then((data) => {
          setUser(data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">My Profile</h1>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto text-center">
          <p className="text-xl mb-4">You are not logged in.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">My Profile</h1>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold">Username: {user.username}</h2>
        <p className="mt-4">Email: {user.email}</p>
        <p className="mt-4">Videos Uploaded: {user.videosUploaded}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
