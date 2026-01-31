import React, { useState } from 'react';
import { slides } from '../data/slides';
import { Eye, EyeOff, ChevronDown, ChevronUp, Save, Upload, ExternalLink } from 'lucide-react';

const AUDIENCE_TYPES = ['all', 'technical', 'executive', 'internal', 'public', 'CCW'];

const AUDIENCE_COLORS = {
  all: 'bg-gray-500',
  technical: 'bg-blue-500',
  executive: 'bg-purple-500',
  internal: 'bg-green-500',
  public: 'bg-orange-500',
  CCW: 'bg-rose-500'
};

const SlideManager = ({ onClose, onExport, standalone = false }) => {
  const [slideAudiences, setSlideAudiences] = useState(
    slides.reduce((acc, slide) => {
      acc[slide.id] = slide.audiences || ['all'];
      return acc;
    }, {})
  );
  const [expandedSlide, setExpandedSlide] = useState(null);
  const [filterAudience, setFilterAudience] = useState('all');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const toggleAudience = (slideId, audience) => {
    setSlideAudiences(prev => {
      const current = prev[slideId] || ['all'];
      const newAudiences = current.includes(audience)
        ? current.filter(a => a !== audience)
        : [...current, audience];

      // Ensure at least one audience is selected
      return {
        ...prev,
        [slideId]: newAudiences.length > 0 ? newAudiences : ['all']
      };
    });
  };

  const getSlideTitle = (slide) => {
    if (slide.title) return slide.title;
    if (slide.type === 'video') return `Video Slide ${slide.id}`;
    return `Slide ${slide.id}`;
  };

  const filteredSlides = slides.filter(slide => {
    if (filterAudience === 'all') return true;
    return slideAudiences[slide.id]?.includes(filterAudience);
  });

  const exportConfig = () => {
    const updatedSlides = slides.map(slide => ({
      ...slide,
      audiences: slideAudiences[slide.id]
    }));

    const output = `export const slides = ${JSON.stringify(updatedSlides, null, 2)};`;

    // Copy to clipboard
    navigator.clipboard.writeText(output).then(() => {
      alert('Slide configuration copied to clipboard! Paste this into src/data/slides.js');
    });
  };

  const downloadConfig = () => {
    const updatedSlides = slides.map(slide => ({
      ...slide,
      audiences: slideAudiences[slide.id]
    }));

    const output = `export const slides = ${JSON.stringify(updatedSlides, null, 2)};`;
    const blob = new Blob([output], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slides.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveAndDeploy = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      const updatedSlides = slides.map(slide => ({
        ...slide,
        audiences: slideAudiences[slide.id]
      }));

      // Get admin password from prompt or environment
      const password = prompt('Enter admin password:');
      if (!password) {
        setSaveStatus({ type: 'error', message: 'Password required' });
        setIsSaving(false);
        return;
      }

      const response = await fetch('/api/save-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ slides: updatedSlides })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      setSaveStatus({
        type: 'success',
        message: 'Saved! Deploying to Vercel... (1-2 min)'
      });

      // Reload page after 3 seconds to get updated slides
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      setSaveStatus({
        type: 'error',
        message: error.message || 'Failed to save changes'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const containerClasses = standalone
    ? "bg-white rounded-lg shadow-2xl w-full flex flex-col"
    : "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4";

  const contentClasses = standalone
    ? "w-full flex flex-col"
    : "bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col";

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-ucsd-navy">Manage Slide Audiences</h2>
            {!standalone && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600">Filter by:</span>
            {AUDIENCE_TYPES.map(audience => (
              <button
                key={audience}
                onClick={() => setFilterAudience(audience)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterAudience === audience
                    ? `${AUDIENCE_COLORS[audience]} text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {audience}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredSlides.length} of {slides.length} slides
            </div>

            {/* Preview Links */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Preview:</span>
              {AUDIENCE_TYPES.map(audience => {
                const baseUrl = window.location.origin;
                const url = audience === 'all'
                  ? baseUrl
                  : `${baseUrl}/?audience=${audience}`;

                return (
                  <a
                    key={audience}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-2 py-1 rounded text-xs font-medium transition-all flex items-center gap-1 ${AUDIENCE_COLORS[audience]} text-white hover:opacity-80`}
                  >
                    {audience}
                    <ExternalLink size={12} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Slide List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredSlides.map(slide => {
            const isExpanded = expandedSlide === slide.id;
            const audiences = slideAudiences[slide.id] || ['all'];

            return (
              <div
                key={slide.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-ucsd-gold transition-colors"
              >
                {/* Slide Header */}
                <div
                  onClick={() => setExpandedSlide(isExpanded ? null : slide.id)}
                  className="p-4 bg-gray-50 cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-sm font-bold text-gray-500 w-12">
                      #{slide.id}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-ucsd-navy">
                        {getSlideTitle(slide)}
                      </div>
                      {slide.subtitle && (
                        <div className="text-xs text-gray-500 mt-1">
                          {slide.subtitle}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {audiences.map(audience => (
                        <span
                          key={audience}
                          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${AUDIENCE_COLORS[audience]}`}
                        >
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {/* Expanded Controls */}
                {isExpanded && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-3">
                      Select audiences who can see this slide:
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {AUDIENCE_TYPES.map(audience => {
                        const isActive = audiences.includes(audience);
                        return (
                          <button
                            key={audience}
                            onClick={() => toggleAudience(slide.id, audience)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                              isActive
                                ? `${AUDIENCE_COLORS[audience]} text-white`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                            {audience}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {saveStatus && (
            <div className={`mb-4 p-3 rounded-lg ${
              saveStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {saveStatus.message}
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Click a slide to edit its audience tags
            </div>
            <div className="flex gap-3">
              {standalone ? (
                <button
                  onClick={saveAndDeploy}
                  disabled={isSaving}
                  className={`px-6 py-2 font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                    isSaving
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <Upload size={20} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Save & Deploy
                    </>
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={exportConfig}
                    className="px-6 py-2 bg-ucsd-gold text-ucsd-navy font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={downloadConfig}
                    className="px-6 py-2 bg-ucsd-navy text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Download slides.js
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideManager;
