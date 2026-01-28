import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const VideoSlide = ({ videoSrc, title, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      // Auto-play when slide is active
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log("Autoplay prevented:", e);
        setIsPlaying(false);
      });
    }
  }, [videoSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black relative">
      {/* Video Container */}
      <div className="relative w-full h-full max-w-[98vw] max-h-[95vh] flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          playsInline
          muted
          autoPlay
        />
        
        {/* Overlay Play Button (only visible when paused) */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={togglePlay}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              className="p-6 rounded-full bg-ucsd-gold text-ucsd-navy shadow-lg"
            >
              <Play size={48} fill="currentColor" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Custom Controls Bar */}
      <div className="absolute bottom-8 w-full max-w-4xl px-8 py-3 bg-ucsd-navy/20 hover:bg-ucsd-navy/60 backdrop-blur-sm rounded-full flex items-center gap-4 shadow-xl z-20 transition-all duration-300 opacity-40 hover:opacity-100">
        <button onClick={togglePlay} className="text-white hover:text-ucsd-gold transition-colors">
          {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / rect.width;
          if (videoRef.current) {
            videoRef.current.currentTime = pos * videoRef.current.duration;
          }
        }}>
          <div 
            className="h-full bg-ucsd-gold/80" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <button onClick={toggleMute} className="text-white hover:text-ucsd-gold transition-colors">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      
      {title && (
          <div className="absolute top-8 left-8 text-white text-2xl font-bold drop-shadow-md">
              {title}
          </div>
      )}
    </div>
  );
};

export default VideoSlide;
