import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slide from './components/Slide';
import { slides as defaultSlides } from './data/slides';

// Utility function to filter slides based on audience
const filterSlidesByAudience = (slides, audienceType) => {
  const targetAudience = audienceType || 'all';
  return slides.filter(slide =>
    slide.audiences && slide.audiences.includes(targetAudience)
  );
};

// Parse slide number from URL hash (e.g. #slide=5 -> 4, since it's 1-based in URL)
const getSlideIndexFromHash = () => {
  const match = window.location.hash.match(/^#slide=(\d+)$/);
  if (match) return parseInt(match[1], 10) - 1;
  return 0;
};

const Presentation = () => {
  const [currentIndex, setCurrentIndex] = useState(() => Math.max(0, getSlideIndexFromHash()));
  const isPopstateNav = useRef(false);
  const [direction, setDirection] = useState(0);
  const [slidesData, setSlidesData] = useState(defaultSlides);

  // Get audience type from URL parameter
  const audienceType = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('audience') || 'all';
  }, []);

  // Load slides from generated output if available
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const response = await fetch('./slides.json', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setSlidesData(data);
        }
      } catch (error) {
        // Fallback to bundled data
      }
    };

    loadSlides();
  }, []);

  // Filter slides based on audience type
  const filteredSlides = useMemo(() => {
    return filterSlidesByAudience(slidesData, audienceType);
  }, [audienceType, slidesData]);

  // Clamp currentIndex to valid range when filteredSlides changes (e.g. after async load)
  useEffect(() => {
    if (filteredSlides.length > 0 && currentIndex >= filteredSlides.length) {
      setCurrentIndex(filteredSlides.length - 1);
    }
  }, [filteredSlides.length, currentIndex]);

  // Sync URL hash with current slide
  useEffect(() => {
    const newHash = `#slide=${currentIndex + 1}`;
    if (window.location.hash !== newHash) {
      if (isPopstateNav.current) {
        // Browser back/forward triggered this — don't push a new entry
        isPopstateNav.current = false;
      } else {
        window.history.pushState(null, '', newHash);
      }
    }
  }, [currentIndex]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const idx = getSlideIndexFromHash();
      const clamped = Math.max(0, Math.min(idx, filteredSlides.length - 1));
      isPopstateNav.current = true;
      setDirection(clamped > currentIndex ? 1 : -1);
      setCurrentIndex(clamped);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [filteredSlides.length, currentIndex]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    if (currentIndex < filteredSlides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, filteredSlides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredSlides.length - 1);
    }
  }, [currentIndex, filteredSlides.length]);

  const goToFirstSlide = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const goToLastSlide = useCallback(() => {
    if (currentIndex < filteredSlides.length - 1) {
      setDirection(1);
      setCurrentIndex(filteredSlides.length - 1);
    }
  }, [currentIndex, filteredSlides.length]);

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

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col overflow-hidden relative font-sans" role="application" aria-label="Presentation viewer">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 z-50 shrink-0" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={filteredSlides.length} aria-label="Presentation progress">
        <motion.div
          className="h-full bg-ucsd-gold"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / filteredSlides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
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
            <Slide slide={filteredSlides[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

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
          {currentIndex + 1} / {filteredSlides.length}
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
