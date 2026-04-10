import React, { useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Mic, MicOff } from 'lucide-react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

// Max characters to keep in the visible ticker
const MAX_TICKER_CHARS = 300;

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

  const tickerRef = useRef(null);

  // Listen for keyboard shortcut event from Presentation.jsx
  useEffect(() => {
    const handler = () => toggleListening();
    window.addEventListener('toggle-transcription', handler);
    return () => window.removeEventListener('toggle-transcription', handler);
  }, [toggleListening]);

  // Trim transcript to a trailing window for the ticker
  const tickerText = useMemo(() => {
    if (!transcript) return '';
    if (transcript.length <= MAX_TICKER_CHARS) return transcript;
    // Cut at a word boundary
    const trimmed = transcript.slice(-MAX_TICKER_CHARS);
    const firstSpace = trimmed.indexOf(' ');
    return firstSpace > 0 ? trimmed.slice(firstSpace + 1) : trimmed;
  }, [transcript]);

  // Auto-scroll ticker to the right (latest text)
  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.scrollLeft = tickerRef.current.scrollWidth;
    }
  }, [tickerText, interimText]);

  if (!isSupported) return null;

  const showTicker = isListening || tickerText || interimText;

  return (
    <>
      {/* Mic toggle button */}
      <button
        onClick={toggleListening}
        className="fixed bottom-6 left-6 sm:bottom-6 sm:left-8 z-50 p-3 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-105 active:scale-95"
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

      {/* News ticker caption bar */}
      <AnimatePresence>
        {showTicker && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 sm:bottom-20 left-0 right-0 z-40 pointer-events-none"
            role="status"
            aria-live="polite"
            aria-label="Live captions"
          >
            <div
              className="w-full px-4 py-1.5 flex items-center gap-3"
              style={{
                backgroundColor: 'rgba(0, 22, 50, 0.95)',
                backdropFilter: 'blur(6px)',
              }}
            >
              {/* LIVE badge */}
              {isListening && (
                <span className="shrink-0 px-2 py-0.5 bg-red-600 text-white text-xs font-bold uppercase rounded tracking-wider">
                  Live
                </span>
              )}

              {/* Scrolling ticker text */}
              <div
                ref={tickerRef}
                className="flex-1 overflow-x-hidden whitespace-nowrap"
              >
                {error ? (
                  <span className="text-red-200 text-sm font-medium">{error}</span>
                ) : (
                  <span className="text-white text-sm sm:text-base font-sans font-medium">
                    {tickerText}
                    {interimText && (
                      <span className="text-yellow-200 italic">
                        {tickerText ? ' ' : ''}
                        {interimText}
                      </span>
                    )}
                    {!tickerText && !interimText && isListening && (
                      <span className="text-yellow-200/70 italic">Listening...</span>
                    )}
                  </span>
                )}
              </div>

              {/* Clear button */}
              {tickerText && (
                <button
                  onClick={clearTranscript}
                  className="pointer-events-auto shrink-0 text-white/40 hover:text-white/80 text-xs transition-colors"
                  aria-label="Clear captions"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TranscriptionOverlay;
