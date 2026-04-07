import React, { useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Mic, MicOff } from 'lucide-react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

const MAX_VISIBLE_LINES = 3;

const TranscriptionOverlay = () => {
  const {
    isListening,
    transcript,
    interimText,
    isSupported,
    error,
    toggleListening,
    clearTranscript,
  } = useSpeechRecognition();

  const captionRef = useRef(null);

  // Listen for keyboard shortcut event from Presentation.jsx
  useEffect(() => {
    const handler = () => toggleListening();
    window.addEventListener('toggle-transcription', handler);
    return () => window.removeEventListener('toggle-transcription', handler);
  }, [toggleListening]);

  // Keep only the last few lines of transcript visible
  const recentLines = useMemo(() => {
    if (!transcript) return [];
    // Split on sentence-ending punctuation to get natural lines
    const sentences = transcript
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim());
    return sentences.slice(-MAX_VISIBLE_LINES);
  }, [transcript]);

  // Auto-scroll caption area
  useEffect(() => {
    if (captionRef.current) {
      captionRef.current.scrollTop = captionRef.current.scrollHeight;
    }
  }, [recentLines, interimText]);

  if (!isSupported) return null;

  const showCaptions = isListening || recentLines.length > 0 || interimText;

  return (
    <>
      {/* Mic toggle button */}
      <button
        onClick={toggleListening}
        className="fixed bottom-6 right-6 sm:bottom-6 sm:right-8 z-50 p-3 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: isListening ? 'rgba(220, 38, 38, 0.9)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
        }}
        aria-label={isListening ? 'Stop transcription' : 'Start transcription'}
        title={isListening ? 'Stop captions (T)' : 'Start captions (T)'}
      >
        {isListening ? (
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <Mic size={22} className="text-white" aria-hidden="true" />
          </motion.div>
        ) : (
          <MicOff size={22} className="text-gray-600" aria-hidden="true" />
        )}
      </button>

      {/* Caption overlay */}
      <AnimatePresence>
        {showCaptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl z-40 rounded-2xl px-6 py-4 pointer-events-none"
            style={{
              backgroundColor: 'rgba(0, 32, 69, 0.82)',
              backdropFilter: 'blur(8px)',
            }}
            role="status"
            aria-live="polite"
            aria-label="Live captions"
          >
            <div ref={captionRef} className="max-h-28 overflow-hidden">
              {error ? (
                <p className="text-red-300 text-center text-base">{error}</p>
              ) : (
                <p className="text-white text-lg sm:text-xl leading-relaxed text-center font-sans">
                  {recentLines.join(' ')}
                  {interimText && (
                    <span className="opacity-50 italic">
                      {recentLines.length > 0 ? ' ' : ''}
                      {interimText}
                    </span>
                  )}
                  {!recentLines.length && !interimText && isListening && (
                    <span className="opacity-40 italic">Listening...</span>
                  )}
                </p>
              )}
            </div>

            {/* Clear button */}
            {recentLines.length > 0 && (
              <button
                onClick={clearTranscript}
                className="pointer-events-auto absolute top-2 right-3 text-white/40 hover:text-white/80 text-xs transition-colors"
                aria-label="Clear captions"
              >
                Clear
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TranscriptionOverlay;
