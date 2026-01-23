import React from 'react';
import SlideManager from '../components/SlideManager';

const ManagePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-ucsd-navy mb-2">Slide Audience Manager</h1>
          <p className="text-gray-600">
            Configure which audiences can see which slides. Changes save directly to GitHub and deploy automatically.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Access this page at: <code className="bg-gray-100 px-2 py-1 rounded">/manage</code>
          </p>
        </div>

        <SlideManager standalone={true} />
      </div>
    </div>
  );
};

export default ManagePage;
