import React from 'react';
import SlideManager from '../components/SlideManager';

const ManagePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-ucsd-navy mb-2">Slide Audience Manager</h1>
          <p className="text-gray-600">
            Configure which audiences can see each slide, then click <strong>Save & Deploy</strong> to push changes live.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Changes commit directly to GitHub and auto-deploy via Vercel in ~1-2 minutes.
          </p>
        </div>

        <SlideManager standalone={true} />
      </div>
    </div>
  );
};

export default ManagePage;
