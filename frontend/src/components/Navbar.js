import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg p-4">
      <div className="flex justify-around">
        <Link to="/" className="text-blue-600 text-lg font-semibold">Home</Link>
        <Link to="/feed" className="text-blue-600 text-lg font-semibold">Feed</Link>
        <Link to="/profile" className="text-blue-600 text-lg font-semibold">My Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
