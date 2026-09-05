import React from 'react';
import SlideManager from '../components/SlideManager';

const ManagePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-ucsd-navy mb-2">Prepare your presentation</h1>
          <p className="text-gray-600">
            Find slides, preview a presentation, and export the selection you need.
          </p>
        </div>

        <SlideManager standalone={true} />
      </div>
    </div>
  );
};

export default ManagePage;
