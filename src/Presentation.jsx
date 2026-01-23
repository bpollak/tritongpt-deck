import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import Slide from './components/Slide';
import SlideManager from './components/SlideManager';
import { slides } from './data/slides';

// Utility function to filter slides based on audience
const filterSlidesByAudience = (slides, audienceType) => {
  if (!audienceType || audienceType === 'all') {
    return slides;
  }
  return slides.filter(slide =>
    slide.audiences && slide.audiences.includes(audienceType)
  );
};

const Presentation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showManager, setShowManager] = useState(false);

  // Get audience type from URL parameter
  const audienceType = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('audience') || 'all';
  }, []);

  // Filter slides based on audience type
  const filteredSlides = useMemo(() => {
    return filterSlidesByAudience(slides, audienceType);
  }, [audienceType]);

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

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
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
    <div className="w-screen h-screen bg-gray-50 flex items-center justify-center overflow-hidden relative font-sans" role="application" aria-label="Presentation viewer">
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

      {/* Navigation Controls */}
      <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-50" aria-label="Slide navigation">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg text-ucsd-navy transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <span className="text-sm font-semibold text-ucsd-navy/60 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm" aria-live="polite" aria-atomic="true">
          Slide {currentIndex + 1} of {filteredSlides.length}
        </span>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg text-ucsd-navy transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </nav>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-50" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={filteredSlides.length} aria-label="Presentation progress">
        <motion.div
          className="h-full bg-ucsd-gold"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / filteredSlides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Settings Button */}
      <button
        onClick={() => setShowManager(true)}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg text-ucsd-navy transition-all z-50"
        aria-label="Manage slide audiences"
      >
        <Settings size={24} />
      </button>

      {/* Slide Manager Modal */}
      {showManager && (
        <SlideManager onClose={() => setShowManager(false)} />
      )}
    </div>
  );
};

export default Presentation;
