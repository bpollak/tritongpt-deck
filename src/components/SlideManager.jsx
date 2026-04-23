import React, { useEffect, useMemo, useState } from 'react';
import { slides } from '../data/slides';
import { AUDIENCE_COLORS, AUDIENCE_TYPES, isSlideVisibleForAudience } from '../data/audiences';
import { slideManagerRegistry } from '../data/slideRegistry';
import { clearLocalSlidePreview, isLocalPreviewHost, readLocalSlidePreview, writeLocalSlidePreview } from '../utils/localSlidePreview';
import { captureSlideSnapshots } from '../utils/slideSnapshots';
import { generatePPTX } from '../utils/pptxExport';
import { exportSlidesToPdf } from '../utils/pdfExport';
import { Eye, EyeOff, ChevronDown, ChevronUp, ExternalLink, Save, Loader2, CheckCircle, AlertCircle, Download, FileText } from 'lucide-react';

const buildSlideAudienceMap = (sourceSlides) => {
  return slideManagerRegistry.reduce((acc, slide) => {
    const matchingSlide = sourceSlides.find((candidate) => String(candidate.id) === String(slide.id));
    acc[slide.id] = matchingSlide?.audiences || slide.audiences || ['all'];
    return acc;
  }, {});
};

const hasAudienceChanges = (candidateSlides, sourceSlides) => {
  return sourceSlides.some((slide, index) => {
    const candidateAudiences = candidateSlides[index]?.audiences || [];
    const sourceAudiences = slide.audiences || [];
    return JSON.stringify(candidateAudiences) !== JSON.stringify(sourceAudiences);
  });
};

const SlideManager = ({ onClose, standalone = false }) => {
  const localPreviewEnabled = isLocalPreviewHost();
  const initialPreviewSlides = useMemo(() => readLocalSlidePreview(slides), []);
  const initialSlides = initialPreviewSlides || slides;
  const [slideAudiences, setSlideAudiences] = useState(() => buildSlideAudienceMap(initialSlides));
  const [expandedSlide, setExpandedSlide] = useState(null);
  const [filterAudience, setFilterAudience] = useState('all');
  const [saveStatus, setSaveStatus] = useState(null); // null | 'local' | 'saving' | 'success' | 'error' | 'password'
  const [saveMessage, setSaveMessage] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPushConfirmModal, setShowPushConfirmModal] = useState(false);
  const [sourceSlidesSnapshot, setSourceSlidesSnapshot] = useState(slides);
  const [hasUnsavedRepoChanges, setHasUnsavedRepoChanges] = useState(() => hasAudienceChanges(initialSlides, slides));
  const [hasPendingGitHubChanges, setHasPendingGitHubChanges] = useState(() => hasAudienceChanges(initialSlides, slides));
  const [isExporting, setIsExporting] = useState(false);
  const [qaReport, setQaReport] = useState(null);
  const [showQaPanel, setShowQaPanel] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(null);

  const updatedSlides = useMemo(() => {
    return slides.map((slide) => ({
      ...slide,
      audiences: slideAudiences[slide.id]
    }));
  }, [slideAudiences]);

  useEffect(() => {
    if (!localPreviewEnabled) return;
    writeLocalSlidePreview(updatedSlides);
  }, [localPreviewEnabled, updatedSlides]);

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
    setHasUnsavedRepoChanges(true);
    setHasPendingGitHubChanges(true);

    if (localPreviewEnabled) {
      setSaveStatus('local');
      setSaveMessage('Saved to localhost preview. Open any preview link to review before pushing to GitHub.');
    } else {
      setSaveStatus(null);
      setSaveMessage('');
    }
  };

  const filteredSlides = slideManagerRegistry.filter(slide => {
    if (filterAudience === 'all') return true;
    return isSlideVisibleForAudience(
      { ...slide, audiences: slideAudiences[slide.id] || slide.audiences },
      filterAudience
    );
  });

  const exportSlides = useMemo(() => {
    return updatedSlides.filter((slide) => isSlideVisibleForAudience(slide, filterAudience));
  }, [filterAudience, updatedSlides]);

  const exportConfig = () => {
    const output = `export const slides = ${JSON.stringify(updatedSlides, null, 2)};`;

    // Copy to clipboard
    navigator.clipboard.writeText(output).then(() => {
      alert('Slide configuration copied to clipboard! Paste this into src/data/slides.js');
    });
  };

  const downloadConfig = () => {
    const output = `export const slides = ${JSON.stringify(updatedSlides, null, 2)};`;
    const blob = new Blob([output], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slides.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    if (exportSlides.length === 0) return;

    setIsExporting(true);
    setShowQaPanel(false);

    try {
      const snapshotBySlideId = await captureSlideSnapshots(exportSlides);
      const report = await generatePPTX(exportSlides, { snapshotBySlideId, exportMode: 'presentation' });
      setQaReport(report || null);
      if (report) setShowQaPanel(true);
    } catch (error) {
      console.error('Failed to export PPTX:', error);
      alert('Error generating PowerPoint file.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdf = async () => {
    if (exportSlides.length === 0) return;

    setIsExportingPdf(true);
    setPdfProgress({ current: 0, total: exportSlides.length });

    try {
      await exportSlidesToPdf(exportSlides, {
        audienceLabel: filterAudience,
        onProgress: ({ current, total }) => setPdfProgress({ current, total })
      });
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert(`Error generating PDF: ${error.message || error}`);
    } finally {
      setIsExportingPdf(false);
      setPdfProgress(null);
    }
  };

  const handlePushRequest = () => {
    if (!hasPendingGitHubChanges) return;
    setShowPushConfirmModal(true);
  };

  const submitLocalSave = async ({ pushToGitHub = false } = {}) => {
    setShowPushConfirmModal(false);
    setSaveStatus('saving');
    setSaveMessage(
      pushToGitHub
        ? 'Saving locally, committing src/data/slides.js, and pushing to GitHub...'
        : 'Saving changes to src/data/slides.js on localhost...'
    );

    try {
      const response = await fetch('/api/local-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slides: updatedSlides, pushToGitHub })
      });

      const data = await response.json();

      if (response.ok) {
        setSaveStatus('success');
        setSaveMessage(data.message || 'Slides saved locally.');
        setSourceSlidesSnapshot(updatedSlides);
        setHasUnsavedRepoChanges(false);
        setHasPendingGitHubChanges(!pushToGitHub);
        setTimeout(() => setSaveStatus(null), 10000);
      } else {
        const details = Array.isArray(data.details) ? data.details.join(' ') : data.details;
        setSaveStatus('error');
        setSaveMessage(details ? `${data.error}: ${details}` : (data.error || 'Failed to save locally.'));
      }
    } catch (err) {
      setSaveStatus('error');
      setSaveMessage(`Local save failed: ${err.message}`);
    }
  };

  const handleResetLocalPreview = () => {
    clearLocalSlidePreview();
    setSlideAudiences(buildSlideAudienceMap(sourceSlidesSnapshot));
    setExpandedSlide(null);
    setHasUnsavedRepoChanges(false);
    setHasPendingGitHubChanges(false);
    setSaveStatus('local');
    setSaveMessage('Localhost preview reset to the checked-in slide data.');
  };

  const confirmPushRequest = () => {
    setShowPushConfirmModal(false);
    if (localPreviewEnabled) {
      submitLocalSave({ pushToGitHub: true });
      return;
    }
    setShowPasswordModal(true);
    setSaveStatus('password');
  };

  const submitSave = async () => {
    if (!adminPassword.trim()) return;

    setShowPasswordModal(false);
    setSaveStatus('saving');
    setSaveMessage('Saving to GitHub and triggering deploy...');

    try {
      const response = await fetch('/api/save-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword.trim()}`
        },
        body: JSON.stringify({ slides: updatedSlides })
      });

      const data = await response.json();

      if (response.ok) {
        setSaveStatus('success');
        setSaveMessage(`Saved! Commit: ${data.commit?.substring(0, 7) || 'done'}. Vercel will deploy in ~1-2 minutes.`);
        setSourceSlidesSnapshot(updatedSlides);
        setHasUnsavedRepoChanges(false);
        setHasPendingGitHubChanges(false);
        setTimeout(() => setSaveStatus(null), 10000);
      } else {
        setSaveStatus('error');
        setSaveMessage(data.error || 'Failed to save. Check your password and try again.');
      }
    } catch (err) {
      setSaveStatus('error');
      setSaveMessage(`Network error: ${err.message}. Are you on the deployed site?`);
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
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleExportPdf}
                disabled={isExportingPdf || exportSlides.length === 0}
                title={exportSlides.length === 0
                  ? 'No slides visible for this filter'
                  : `Export ${exportSlides.length} slide${exportSlides.length === 1 ? '' : 's'} to PDF`}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isExportingPdf || exportSlides.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-ucsd-navy text-white hover:bg-opacity-90'
                }`}
              >
                {isExportingPdf
                  ? <Loader2 size={12} className="animate-spin" />
                  : <FileText size={12} />}
                {isExportingPdf && pdfProgress
                  ? `Rendering ${pdfProgress.current} / ${pdfProgress.total}…`
                  : `Export PDF (${exportSlides.length})`}
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredSlides.length} of {slideManagerRegistry.length} slides
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
                        {slide.title}
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
                    <a
                      href={`/#slide=${slide.slug || slide.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ml-2 p-1.5 rounded-md text-gray-400 hover:text-ucsd-blue hover:bg-blue-50 transition-colors"
                      title={`Open slide: ${slide.title}`}
                    >
                      <ExternalLink size={16} />
                    </a>
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
          {/* Status Banner */}
          {saveStatus && saveStatus !== 'password' && (
            <div className={`mb-4 px-4 py-3 rounded-lg flex items-center gap-3 text-sm ${
              saveStatus === 'local' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
              saveStatus === 'saving' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              saveStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
              'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {saveStatus === 'local' && <CheckCircle size={16} />}
              {saveStatus === 'saving' && <Loader2 size={16} className="animate-spin" />}
              {saveStatus === 'success' && <CheckCircle size={16} />}
              {saveStatus === 'error' && <AlertCircle size={16} />}
              <span>{saveMessage}</span>
              {saveStatus === 'error' && (
                <button onClick={() => setSaveStatus(null)} className="ml-auto underline hover:no-underline">Dismiss</button>
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {localPreviewEnabled && hasPendingGitHubChanges
                ? <span className="text-amber-700 font-medium">Changes are visible on localhost. Save them into the repo locally, then push to GitHub when ready.</span>
                : localPreviewEnabled
                  ? 'Localhost preview matches the checked-in slide data'
                  : hasPendingGitHubChanges
                    ? <span className="text-amber-600 font-medium">You have unpublished GitHub changes</span>
                    : 'Click a slide to edit its audience tags'
              }
            </div>
            <div className="flex gap-3 flex-wrap justify-end">
              {localPreviewEnabled && (
                <button
                  onClick={handleResetLocalPreview}
                  className="px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-sm"
                >
                  Reset Local Preview
                </button>
              )}
              {localPreviewEnabled && (
                <button
                  onClick={() => submitLocalSave({ pushToGitHub: false })}
                  disabled={saveStatus === 'saving' || !hasUnsavedRepoChanges}
                  className={`px-4 py-2 font-medium rounded-lg transition-colors text-sm ${
                    saveStatus === 'saving' || !hasUnsavedRepoChanges
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-ucsd-navy border border-ucsd-navy hover:bg-gray-50'
                  }`}
                >
                  Save to Repo
                </button>
              )}
              <button
                onClick={exportConfig}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={downloadConfig}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Download slides.js
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting || exportSlides.length === 0}
                className={`px-4 py-2 font-medium rounded-lg transition-colors text-sm flex items-center gap-2 ${
                  isExporting || exportSlides.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-ucsd-navy text-white hover:bg-opacity-90'
                }`}
              >
                {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                {isExporting ? 'Exporting...' : `Download ${filterAudience === 'all' ? 'PPTX' : `${filterAudience} PPTX`}`}
              </button>
              <button
                onClick={handlePushRequest}
                disabled={saveStatus === 'saving' || !hasPendingGitHubChanges}
                className={`px-6 py-2 font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  saveStatus === 'saving' || !hasPendingGitHubChanges
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : hasPendingGitHubChanges
                      ? 'bg-ucsd-gold text-ucsd-navy hover:bg-yellow-500 ring-2 ring-amber-400'
                      : 'bg-ucsd-gold text-ucsd-navy hover:bg-yellow-500'
                }`}
              >
                {saveStatus === 'saving' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Push to GitHub
              </button>
            </div>
          </div>
          {localPreviewEnabled && (
            <div className="mt-3 text-xs text-gray-500">
              Localhost changes are applied automatically in this browser. "Save to Repo" writes `src/data/slides.js`; "Push to GitHub" also commits and pushes that file after confirmation.
            </div>
          )}
        </div>

        {showQaPanel && qaReport && (
          <div className="fixed inset-0 z-[60] bg-black/45 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-ucsd-navy">PowerPoint Export QA</div>
                  <div className="text-sm text-slate-600">
                    {qaReport.slideCount} slide(s) checked • {qaReport.issueCount} issue category(ies) • {qaReport.exportMode === 'presentation' ? 'Presentation mode' : 'Archive mode'}
                  </div>
                </div>
                <button
                  onClick={() => setShowQaPanel(false)}
                  className="px-3 py-1.5 rounded-md text-sm font-semibold bg-gray-100 text-ucsd-navy hover:bg-gray-200"
                  aria-label="Close QA report"
                >
                  Close
                </button>
              </div>

              <div className="p-5 overflow-y-auto max-h-[calc(85vh-8rem)] space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-xs uppercase tracking-wide text-slate-500">Font Adjustments</div>
                    <div className="text-lg font-bold text-ucsd-navy">{qaReport.fontFloorAdjustments || 0}</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-xs uppercase tracking-wide text-slate-500">Shrink Disabled</div>
                    <div className="text-lg font-bold text-ucsd-navy">{qaReport.shrinkDisabledCount || 0}</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-xs uppercase tracking-wide text-slate-500">Dense Slides</div>
                    <div className="text-lg font-bold text-ucsd-navy">{qaReport.denseSlides?.length || 0}</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-xs uppercase tracking-wide text-slate-500">Missing Notes</div>
                    <div className="text-lg font-bold text-ucsd-navy">{qaReport.slidesWithoutNotes?.length || 0}</div>
                  </div>
                </div>

                {Array.isArray(qaReport.issues) && qaReport.issues.length > 0 ? (
                  <div>
                    <div className="text-sm font-bold text-ucsd-navy mb-2">Issue Summary</div>
                    <ul className="space-y-2">
                      {qaReport.issues.map((issue, idx) => (
                        <li key={idx} className="text-sm text-slate-700 leading-relaxed">
                          • {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                    No QA issues detected in this export.
                  </div>
                )}

                {qaReport.templateCounts && Object.keys(qaReport.templateCounts).length > 0 && (
                  <div>
                    <div className="text-sm font-bold text-ucsd-navy mb-2">Template Mix</div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      {Object.entries(qaReport.templateCounts).map(([template, count]) => `${template}: ${count}`).join(' | ')}
                    </div>
                  </div>
                )}

                {Array.isArray(qaReport.slidesWithDisabledShrink) && qaReport.slidesWithDisabledShrink.length > 0 && (
                  <div>
                    <div className="text-sm font-bold text-ucsd-navy mb-2">Slides With Shrink Disabled</div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      {qaReport.slidesWithDisabledShrink.join(' | ')}
                    </div>
                  </div>
                )}

                {Array.isArray(qaReport.denseSlides) && qaReport.denseSlides.length > 0 && (
                  <div>
                    <div className="text-sm font-bold text-ucsd-navy mb-2">Dense Slides</div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      {qaReport.denseSlides.join(' | ')}
                    </div>
                  </div>
                )}

                {Array.isArray(qaReport.cappedSections) && qaReport.cappedSections.length > 0 && (
                  <div>
                    <div className="text-sm font-bold text-ucsd-navy mb-2">Continuation Caps Applied</div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      {qaReport.cappedSections.map((entry) => `${entry.title} (${entry.originalPageCount}→${entry.cappedPageCount})`).join(' | ')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showPushConfirmModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-ucsd-navy mb-2">Push Changes to GitHub?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your local slide selections are ready. Do you want to commit these changes to GitHub and trigger a Vercel deployment now?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowPushConfirmModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Not Yet
                </button>
                <button
                  onClick={confirmPushRequest}
                  className="px-6 py-2 bg-ucsd-gold text-ucsd-navy font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-ucsd-navy mb-2">Push to GitHub</h3>
              <p className="text-sm text-gray-600 mb-4">
                This will commit your changes to GitHub and trigger a Vercel deployment. Changes go live in ~1-2 minutes.
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitSave()}
                placeholder="Enter admin password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ucsd-gold focus:border-ucsd-gold outline-none mb-4"
                autoFocus
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => { setShowPasswordModal(false); setSaveStatus(null); }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitSave}
                  disabled={!adminPassword.trim()}
                  className="px-6 py-2 bg-ucsd-gold text-ucsd-navy font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Push Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideManager;
