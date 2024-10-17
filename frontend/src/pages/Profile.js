import React from 'react';

function Profile() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">My Profile</h1>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold">Username: JohnDoe</h2>
        <p className="mt-4">Email: johndoe@example.com</p>
        <p className="mt-4">Videos Uploaded: 5</p>
      </div>
    </div>
  );
}

export default Profile;
