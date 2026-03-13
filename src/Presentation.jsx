import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Slide from './components/Slide';
import { slides as defaultSlides } from './data/slides';
import { isSlideVisibleForAudience } from './data/audiences';
import { findSlideIndexByPermalink, getSlidePermalinkValue } from './data/slidePermalinks';
import { LOCAL_SLIDE_PREVIEW_EVENT, LOCAL_SLIDE_PREVIEW_KEY, isLocalPreviewHost, readLocalSlidePreview } from './utils/localSlidePreview';
import { generatePPTX } from './utils/pptxExport';
import { captureSlideSnapshots } from './utils/slideSnapshots';

// Utility function to filter slides based on audience
const filterSlidesByAudience = (slides, audienceType) => {
  return slides.filter((slide) => isSlideVisibleForAudience(slide, audienceType));
};

const getSlideRefFromHash = () => {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const slideRef = params.get('slide');
  return slideRef && slideRef.trim() ? slideRef.trim() : null;
};

const buildSlideHash = (slideRef) => {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));

  if (slideRef === undefined || slideRef === null || slideRef === '') {
    params.delete('slide');
  } else {
    params.set('slide', String(slideRef));
  }

  const hash = params.toString();
  return hash ? `#${hash}` : '';
};

const getSlideVideoInfo = (slide) => {
  if (!slide?.videoSrc) return null;
  return {
    src: slide.videoSrc,
    poster: slide.poster || null,
  };
};

const Presentation = () => {
  const [currentSlideRef, setCurrentSlideRef] = useState(() => getSlideRefFromHash());
  const isPopstateNav = useRef(false);
  const [direction, setDirection] = useState(0);
  const [slidesData, setSlidesData] = useState(() => readLocalSlidePreview(defaultSlides) || defaultSlides);
  const [isExporting, setIsExporting] = useState(false);
  const [qaReport, setQaReport] = useState(null);
  const [showQaPanel, setShowQaPanel] = useState(false);

  // Get audience type from URL parameter
  const audienceType = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('audience') || 'all';
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isLocalPreviewHost()) return;

    const syncSlidesFromLocalPreview = () => {
      const previewSlides = readLocalSlidePreview(defaultSlides);
      setSlidesData(previewSlides || defaultSlides);
    };

    const handleStorage = (event) => {
      if (event.key && event.key !== LOCAL_SLIDE_PREVIEW_KEY) return;
      syncSlidesFromLocalPreview();
    };

    syncSlidesFromLocalPreview();
    window.addEventListener('storage', handleStorage);
    window.addEventListener(LOCAL_SLIDE_PREVIEW_EVENT, syncSlidesFromLocalPreview);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(LOCAL_SLIDE_PREVIEW_EVENT, syncSlidesFromLocalPreview);
    };
  }, []);

  // Load slides from generated output if available
  useEffect(() => {
    if (import.meta.env.DEV || isLocalPreviewHost()) return;

    const loadSlides = async () => {
      try {
        const response = await fetch('/slides.json', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setSlidesData(data);
        }
      } catch {
        // Fallback to bundled data
      }
    };

    loadSlides();
  }, []);

  // Filter slides based on audience type
  const filteredSlides = useMemo(() => {
    return filterSlidesByAudience(slidesData, audienceType);
  }, [audienceType, slidesData]);

  const currentIndex = useMemo(() => {
    if (filteredSlides.length === 0) return -1;

    const matchedIndex = findSlideIndexByPermalink(filteredSlides, currentSlideRef);
    return matchedIndex >= 0 ? matchedIndex : 0;
  }, [currentSlideRef, filteredSlides]);

  const currentSlide = currentIndex >= 0 ? filteredSlides[currentIndex] : null;

  const nearbyVideoAssets = useMemo(() => {
    const nearbyIndexes = [currentIndex - 1, currentIndex + 1, currentIndex + 2]
      .filter((index) => index >= 0 && index < filteredSlides.length);

    return nearbyIndexes
      .map((index) => getSlideVideoInfo(filteredSlides[index]))
      .filter(Boolean)
      .filter((video, index, videos) => videos.findIndex((candidate) => candidate.src === video.src) === index);
  }, [currentIndex, filteredSlides]);

  // Keep the selected slide anchored to a visible slide in the filtered set.
  useEffect(() => {
    if (filteredSlides.length === 0) {
      if (currentSlideRef !== null) {
        setCurrentSlideRef(null);
      }
      return;
    }

    if (findSlideIndexByPermalink(filteredSlides, currentSlideRef) === -1) {
      setCurrentSlideRef(getSlidePermalinkValue(filteredSlides[0]));
    }
  }, [filteredSlides, currentSlideRef]);

  useEffect(() => {
    nearbyVideoAssets.forEach(({ poster }) => {
      if (!poster) return;
      const image = new Image();
      image.src = poster;
    });
  }, [nearbyVideoAssets]);

  // Sync URL hash with current slide
  useEffect(() => {
    const newHash = buildSlideHash(currentSlide ? getSlidePermalinkValue(currentSlide) : null);

    if (window.location.hash !== newHash) {
      if (isPopstateNav.current) {
        // Canonicalize history-driven navigation without creating another entry.
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${newHash}`);
      } else {
        window.history.pushState(null, '', `${window.location.pathname}${window.location.search}${newHash}`);
      }
    }

    if (isPopstateNav.current) {
      isPopstateNav.current = false;
    }
  }, [currentSlide, currentSlideRef]);

  // Handle browser back/forward and direct hash changes.
  useEffect(() => {
    const syncSlideFromLocation = () => {
      const nextSlideRef = getSlideRefFromHash();
      const nextIndex = findSlideIndexByPermalink(filteredSlides, nextSlideRef);
      const resolvedIndex = nextIndex >= 0 ? nextIndex : (filteredSlides.length > 0 ? 0 : -1);

      isPopstateNav.current = true;
      setDirection(resolvedIndex > currentIndex ? 1 : -1);
      setCurrentSlideRef(resolvedIndex >= 0 ? getSlidePermalinkValue(filteredSlides[resolvedIndex]) : null);
    };

    window.addEventListener('popstate', syncSlideFromLocation);
    window.addEventListener('hashchange', syncSlideFromLocation);

    return () => {
      window.removeEventListener('popstate', syncSlideFromLocation);
      window.removeEventListener('hashchange', syncSlideFromLocation);
    };
  }, [filteredSlides, currentIndex]);

  const nextSlide = useCallback(() => {
    if (filteredSlides.length === 0) return;

    setDirection(1);
    const nextIndex = currentIndex < filteredSlides.length - 1 ? currentIndex + 1 : 0;
    setCurrentSlideRef(getSlidePermalinkValue(filteredSlides[nextIndex]));
  }, [currentIndex, filteredSlides]);

  const prevSlide = useCallback(() => {
    if (filteredSlides.length === 0) return;

    setDirection(-1);
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : filteredSlides.length - 1;
    setCurrentSlideRef(getSlidePermalinkValue(filteredSlides[nextIndex]));
  }, [currentIndex, filteredSlides]);

  const goToFirstSlide = useCallback(() => {
    if (filteredSlides.length > 0 && currentIndex > 0) {
      setDirection(-1);
      setCurrentSlideRef(getSlidePermalinkValue(filteredSlides[0]));
    }
  }, [currentIndex, filteredSlides]);

  const goToLastSlide = useCallback(() => {
    if (filteredSlides.length > 0 && currentIndex < filteredSlides.length - 1) {
      setDirection(1);
      setCurrentSlideRef(getSlidePermalinkValue(filteredSlides[filteredSlides.length - 1]));
    }
  }, [currentIndex, filteredSlides]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default for space key to avoid page scroll
      if (e.key === ' ') {
        e.preventDefault();
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToFirstSlide();
      } else if (e.key === 'End') {
        e.preventDefault();
        goToLastSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToFirstSlide, goToLastSlide]);

  const handleExport = async () => {
    setIsExporting(true);
    setShowQaPanel(false);
    try {
      const snapshotBySlideId = await captureSlideSnapshots(filteredSlides);
      const report = await generatePPTX(filteredSlides, { snapshotBySlideId, exportMode: 'presentation' });
      setQaReport(report || null);
      if (report) setShowQaPanel(true);
    } catch (error) {
      console.error("Failed to export PPTX:", error);
      alert("Error generating PowerPoint file.");
    } finally {
      setIsExporting(false);
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };
  const progressValue = currentIndex >= 0 ? currentIndex + 1 : 0;
  const progressPercent = filteredSlides.length > 0 ? (progressValue / filteredSlides.length) * 100 : 0;
  const isLastSlide = filteredSlides.length > 0 && currentIndex === filteredSlides.length - 1;

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col overflow-hidden relative font-sans" role="application" aria-label="Presentation viewer">
      <div aria-hidden="true" className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
        {nearbyVideoAssets.map(({ src, poster }) => (
          <video
            key={src}
            src={src}
            poster={poster || undefined}
            preload="metadata"
            muted
            playsInline
            tabIndex={-1}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 z-50 shrink-0" role="progressbar" aria-valuenow={progressValue} aria-valuemin={0} aria-valuemax={Math.max(filteredSlides.length, 1)} aria-label="Presentation progress">
        <motion.div
          className="h-full bg-ucsd-gold"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {currentSlide ? (
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevSlide();
                }
              }}
              className="absolute w-full h-full"
            >
              <Slide slide={currentSlide} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-slate-500">
            No slides are available for this audience filter.
          </div>
        )}

        {isLastSlide && (
          <div className="absolute bottom-20 right-4 sm:bottom-8 sm:right-6 z-50">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-all ${isExporting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-ucsd-navy text-white hover:bg-opacity-90 active:scale-95'
                }`}
              aria-label="Download PowerPoint file"
            >
              <Download size={15} />
              <span>{isExporting ? 'Exporting...' : 'Download PPTX'}</span>
            </button>
          </div>
        )}
      </div>

      {showQaPanel && qaReport && (
        <div className="absolute inset-0 z-[60] bg-black/45 flex items-center justify-center p-4 sm:p-6">
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

      {/* Navigation Controls - Fixed bottom bar on mobile, floating on desktop */}
      <nav className="shrink-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-1.5 flex items-center justify-between sm:absolute sm:bottom-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:border sm:rounded-full sm:shadow-lg sm:px-2 sm:py-1 sm:bg-white/80 sm:w-auto sm:gap-4 z-50" aria-label="Slide navigation">
        <button
          onClick={prevSlide}
          className="p-2.5 sm:p-2 rounded-full hover:bg-gray-100 sm:hover:bg-white/80 text-ucsd-navy transition-all active:bg-gray-200"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <span className="text-sm font-semibold text-ucsd-navy/70" aria-live="polite" aria-atomic="true">
          {progressValue} / {filteredSlides.length}
        </span>

        <button
          onClick={nextSlide}
          className="p-2.5 sm:p-2 rounded-full hover:bg-gray-100 sm:hover:bg-white/80 text-ucsd-navy transition-all active:bg-gray-200"
          aria-label="Next slide"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default Presentation;
