import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white py-12 px-6">
      <h1 className="text-5xl font-extrabold text-center mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Welcome to the Hospital Food Manager
      </h1>
      
      <p className="text-lg text-center mb-8 max-w-2xl">
        A comprehensive solution to manage diet plans for hospital patients. Keep track of daily meals, dietary restrictions, and offer tailored recommendations for better health management.
      </p>

      <div className="flex flex-wrap justify-center gap-10 mb-8">
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-72 text-center transform transition-all duration-300 hover:scale-105">
          <h3 className="text-2xl font-semibold mb-4">Track Diets</h3>
          <p>Effortlessly manage and monitor patient diet charts in one place.</p>
        </div>
        
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-72 text-center transform transition-all duration-300 hover:scale-105">
          <h3 className="text-2xl font-semibold mb-4">Custom Plans</h3>
          <p>Create personalized diet plans based on patient health conditions and preferences.</p>
        </div>
        
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-72 text-center transform transition-all duration-300 hover:scale-105">
          <h3 className="text-2xl font-semibold mb-4">Easy Access</h3>
          <p>Allow healthcare providers to quickly access and update patient diet details.</p>
        </div>
      </div>

      <button className="bg-teal-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500">
        Get Started
      </button>
    </div>
  );
};

export default Home;
