import React from 'react';
import SlideManager from '../components/SlideManager';

const ManagePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-ucsd-navy mb-2">Slide Audience Manager</h1>
          <p className="text-gray-600">
            Configure which audiences can see each slide. On localhost, changes are previewable immediately and can be written back to `src/data/slides.js` without leaving the browser.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Review locally first, then push to GitHub only when you confirm you are ready to trigger a Vercel deployment.
          </p>
        </div>

        <SlideManager standalone={true} />
      </div>
    </div>
  );
};

export default ManagePage;
