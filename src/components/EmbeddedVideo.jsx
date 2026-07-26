import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { AlertTriangle, Play } from 'lucide-react';

const EmbeddedVideo = ({
  src,
  poster,
  label = 'Slide video',
  className,
  videoClassName,
  autoPlay = true,
  loop = true,
  muted = true,
  playbackRate = 1,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;
    video.defaultMuted = muted;
    video.muted = muted;
    video.playbackRate = playbackRate;

    const tryAutoPlay = async () => {
      if (!autoPlay || cancelled) return;
      try {
        await video.play();
        if (!cancelled) setIsPlaying(true);
      } catch {
        // iOS may block autoplay in Low Power Mode or embedded browsers.
        // The persistent play button below remains available as the fallback.
        if (!cancelled) setIsPlaying(false);
      }
    };

    if (video.readyState >= 2) {
      tryAutoPlay();
    } else {
      video.addEventListener('canplay', tryAutoPlay, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener('canplay', tryAutoPlay);
    };
  }, [autoPlay, muted, playbackRate, src]);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = muted;
      video.playbackRate = playbackRate;
      await video.play();
      setHasError(false);
      setIsPlaying(true);
    } catch {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  return (
    <div className={clsx('overflow-hidden bg-slate-950', className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={label}
        className={videoClassName}
        preload="auto"
        controls
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        onPlay={() => {
          setHasError(false);
          setIsPlaying(true);
        }}
        onLoadStart={() => {
          setHasError(false);
          setIsPlaying(false);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
      />

      {!isPlaying && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/20">
          <button
            type="button"
            onClick={playVideo}
            className="pointer-events-auto inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 bg-slate-950/85 px-5 py-3 text-sm font-black text-white shadow-2xl backdrop-blur-sm transition hover:bg-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-ucsd-gold/70"
            aria-label={hasError ? `Retry ${label}` : `Play ${label}`}
          >
            {hasError ? <AlertTriangle size={22} /> : <Play size={22} fill="currentColor" />}
            <span>{hasError ? 'Retry video' : 'Tap to play'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EmbeddedVideo;
