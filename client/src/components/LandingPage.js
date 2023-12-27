import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="text-lg mb-8">Discover amazing features and join our community today!</p>
        <div className="flex space-x-4">
          <a href="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded-md text-lg">
            Log In
          </a>
          <a href="/signup" className="bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded-md text-lg">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
