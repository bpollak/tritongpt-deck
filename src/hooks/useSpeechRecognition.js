import { useState, useRef, useEffect, useCallback } from 'react';

const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null;

export default function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const restartTimeoutRef = useRef(null);

  const isSupported = !!SpeechRecognition;

  const createRecognition = useCallback(() => {
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      let finalChunk = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalChunk += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (finalChunk) {
        setTranscript((prev) => prev + finalChunk);
      }
      setInterimText(interim);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        // Silence timeout — will auto-restart via onend
        return;
      }
      if (event.error === 'not-allowed') {
        setError('Microphone access denied');
        isListeningRef.current = false;
        setIsListening(false);
      } else if (event.error === 'network') {
        setError('Network error — internet required');
      } else {
        setError(`Speech error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setInterimText('');
      if (isListeningRef.current) {
        // Auto-restart after silence or brief interruption
        restartTimeoutRef.current = setTimeout(() => {
          if (isListeningRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch {
              // Already started — ignore
            }
          }
        }, 100);
      } else {
        setIsListening(false);
      }
    };

    return recognition;
  }, []);

  const startListening = useCallback(() => {
    if (!SpeechRecognition) return;

    setError(null);

    if (!recognitionRef.current) {
      recognitionRef.current = createRecognition();
    }

    isListeningRef.current = true;
    setIsListening(true);

    try {
      recognitionRef.current.start();
    } catch {
      // Already started — ignore
    }
  }, [createRecognition]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    setIsListening(false);
    setInterimText('');
    clearTimeout(restartTimeoutRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped — ignore
      }
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListeningRef.current) {
      stopListening();
    } else {
      startListening();
    }
  }, [startListening, stopListening]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimText('');
  }, []);

  // Restart on tab re-focus
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isListeningRef.current) {
        try {
          recognitionRef.current?.start();
        } catch {
          // Already running
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      clearTimeout(restartTimeoutRef.current);
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    interimText,
    isSupported,
    error,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript,
  };
}
