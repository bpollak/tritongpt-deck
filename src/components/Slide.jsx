import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import clsx from 'clsx';
import { Target, Database, Cpu, Blocks, GraduationCap, Building2, FileText, FileCheck, DollarSign, Shield, BookOpen, Code, Presentation, Globe, FileEdit, FolderOpen, TrendingUp, ClipboardCheck, Search, Heart, Calendar, GitBranch, Network, Grid3x3, ArrowDown, ArrowRight } from 'lucide-react';
import VideoSlide from './VideoSlide';

const iconMap = {
  'Target': Target,
  'Database': Database,
  'Cpu': Cpu,
  'Blocks': Blocks,
  'GraduationCap': GraduationCap,
  'Building2': Building2,
  'FileText': FileText,
  'FileCheck': FileCheck,
  'DollarSign': DollarSign,
  'Shield': Shield,
  'BookOpen': BookOpen,
  'Code': Code,
  'Presentation': Presentation,
  'Globe': Globe,
  'FileEdit': FileEdit,
  'FolderOpen': FolderOpen,
  'TrendingUp': TrendingUp,
  'ClipboardCheck': ClipboardCheck,
  'Search': Search,
  'Heart': Heart,
  'Calendar': Calendar,
  'GitBranch': GitBranch,
  'Network': Network,
  'Grid3x3': Grid3x3
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 }
  }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const Slide = ({ slide }) => {
  if (!slide) return <div className="text-red-500 p-10">Slide Error: No data provided</div>;

  if (slide.type === 'video') {
    return <VideoSlide videoSrc={slide.videoSrc} title={slide.title} poster={slide.poster} />;
  }

  const isTitle = slide.type === 'title';
  const isSolution = slide.layout === 'solution-showcase';
  const isSolutionVideo = slide.layout === 'solution-showcase-video';
  const hasImage = !!slide.imageSrc && !isSolution && !isSolutionVideo;
  const isDark = slide.dark;
  const itemCount = slide.content ? slide.content.length : 0;
  
  const isDense = itemCount > 6;
  const isVeryDense = itemCount > 12;
  const isTableLike = itemCount > 20;

  const useThreeColumns = slide.layout === 'columns-3' || isTableLike;
  const useDenseList = slide.layout === 'dense-list';
  const isGraphicHeavy = slide.layout === 'graphic-heavy';
  const isFeatureGrid = slide.layout === 'feature-grid';
  const isHeroList = slide.layout === 'hero-list';
  const isTitleHero = slide.layout === 'title-hero';
  const isEcosystem = slide.layout === 'ecosystem-visual';
  const isPlatformArchitecture = slide.layout === 'platform-architecture';
  const isPlatformLayers = slide.layout === 'platform-layers';
  const isPlatformSimple = slide.layout === 'platform-simple';
  const isCaseStudyHero = slide.layout === 'case-study-hero';
  const isAssistantCategories = slide.layout === 'assistant-categories';
  const isKeyTakeaways = slide.layout === 'key-takeaways';
  const isRoadmap = slide.layout === 'roadmap';
  const isProblemStatement = slide.layout === 'problem-statement';
  const isComparisonTable = slide.layout === 'comparison-table';
  const isCompoundArchitecture = slide.layout === 'compound-architecture';

  if (isTitleHero) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#182B49] via-[#0f1f33] to-[#182B49] flex flex-col items-center justify-center text-white break-words">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-ucsd-blue rounded-full blur-[120px] mix-blend-screen opacity-30"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2], x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-ucsd-gold rounded-full blur-[150px] mix-blend-screen opacity-20"
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-ucsd-gold/10 rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="relative z-10 max-w-7xl w-full px-8 flex flex-col items-center text-center">
          {slide.conference && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-5 px-6 py-2 rounded-full border border-ucsd-gold/40 bg-ucsd-gold/10 backdrop-blur-md text-ucsd-gold text-base md:text-lg tracking-[0.25em] font-bold uppercase flex items-center gap-3"
            >
              <div className="w-12 h-0.5 bg-ucsd-gold rounded-full" />
              {slide.conference}
              <div className="w-12 h-0.5 bg-ucsd-gold rounded-full" />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="mb-5"
          >
            <div className="text-3xl md:text-5xl lg:text-6xl font-black tracking-wider uppercase text-ucsd-gold mb-2 drop-shadow-[0_0_40px_rgba(255,205,0,0.6)]">
              UC San Diego
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-[0.95]"
          >
            {slide.title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-48 h-2.5 bg-gradient-to-r from-ucsd-gold via-ucsd-sky to-ucsd-blue rounded-full mb-6 shadow-[0_0_25px_rgba(255,205,0,0.6)]"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-5xl font-medium text-white tracking-wide max-w-5xl leading-relaxed mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
          >
            {slide.subtitle}
          </motion.h2>

           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-8 flex flex-col items-center border-t-2 border-ucsd-gold/30 pt-6"
          >
            <div className="text-xl md:text-3xl font-bold text-white tracking-wider uppercase mb-3">
              {slide.presenterName || "UC SAN DIEGO"}
            </div>
            {slide.presenterTitle && (
              <div className="text-ucsd-sky text-base md:text-xl font-medium tracking-wide max-w-3xl">
                {slide.presenterTitle}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  const renderContent = () => (
    <>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "font-bold mb-6",
          isTitle ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl",
          (!isEcosystem && !isPlatformArchitecture && !isPlatformLayers && !isPlatformSimple && !isSolution && !isSolutionVideo && !isCaseStudyHero && !isAssistantCategories && !isKeyTakeaways && !isRoadmap && !isProblemStatement && !isFeatureGrid && !isComparisonTable && !isCompoundArchitecture) && "border-b-4 border-ucsd-gold pb-3 inline-block self-start",
          (isSolution || isSolutionVideo || isCaseStudyHero || isAssistantCategories || isKeyTakeaways || isRoadmap || isProblemStatement || isPlatformArchitecture || isPlatformLayers || isPlatformSimple || isComparisonTable || isCompoundArchitecture) && "text-center w-full",
          (isEcosystem || isPlatformArchitecture || isPlatformLayers || isPlatformSimple || isCompoundArchitecture) && "hidden",
          isCaseStudyHero && "text-3xl md:text-4xl mb-4",
          isProblemStatement && "text-4xl md:text-5xl mb-4 font-black",
          (isVeryDense || useThreeColumns) && !isTitle && "text-2xl md:text-3xl mb-4",
          isGraphicHeavy && "text-2xl md:text-4xl",
          isFeatureGrid && "w-full text-center border-b-0 border-none mb-12",
          isHeroList && "mb-10",
          isDark ? "text-white" : "text-ucsd-navy"
        )}
      >
        {slide.title}
      </motion.h1>

      {slide.subtitle && !isCaseStudyHero && !isCompoundArchitecture && (
         <motion.h2
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className={clsx(
             "text-xl md:text-2xl font-light mt-2 mb-6",
             (isEcosystem || isPlatformArchitecture || isPlatformLayers || isPlatformSimple || isSolution || isSolutionVideo || isAssistantCategories || isKeyTakeaways || isRoadmap || isProblemStatement || isComparisonTable) && "text-center w-full mb-8",
             isProblemStatement && "text-2xl md:text-3xl mb-10 font-medium text-red-600",
             isDark ? "text-ucsd-sky" : "text-ucsd-blue"
           )}
         >
           {slide.subtitle}
         </motion.h2>
      )}

      {isCaseStudyHero && (
        <div className="flex flex-col gap-6 w-full max-w-[1700px] mx-auto">
          {/* Stats Section - HERO TREATMENT - The primary focus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {slide.stats?.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-ucsd-navy to-ucsd-blue p-12 rounded-3xl shadow-2xl text-center text-white relative overflow-hidden group hover:scale-105 transition-transform"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-ucsd-gold/10 rounded-full blur-3xl group-hover:bg-ucsd-gold/20 transition-colors" />
                <div className="relative z-10">
                  <div className="text-base font-bold text-ucsd-sky uppercase tracking-[0.15em] mb-3">{stat.label}</div>
                  <div className="text-8xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 drop-shadow-lg">{stat.value}</div>
                  <div className="text-base font-medium text-white/80 uppercase tracking-wide">{stat.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Two-column layout for Quotes + Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quotes Section - Supporting Evidence */}
            <div className="flex flex-col gap-4">
              {slide.quotes?.map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border-l-4 border-ucsd-gold shadow-lg relative group hover:shadow-xl transition-all"
                >
                  <div className="absolute top-4 left-4 text-4xl text-ucsd-gold/15 font-serif leading-none">"</div>
                  <div className="relative z-10 pl-6">
                    <div className="text-lg text-ucsd-navy font-medium mb-2 leading-relaxed italic">
                      {quote.text}
                    </div>
                    <div className="text-sm font-bold text-ucsd-blue tracking-wide">— {quote.author}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Features - Secondary Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 gap-4"
            >
              {slide.content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-gradient-to-br from-ucsd-sky/10 to-ucsd-blue/5 p-4 rounded-xl border-2 border-ucsd-sky/30 hover:border-ucsd-gold transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-ucsd-gold flex-shrink-0 mt-2" />
                    <div className="flex-1">
                      <h3 className="font-bold text-ucsd-navy text-lg mb-1.5">{item.heading}</h3>
                      <p className="text-slate-700 text-base leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Time savings callout at bottom */}
          {slide.subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 1, type: "spring", stiffness: 80 }}
              className="relative text-center w-full mt-4 px-8 py-6 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-ucsd-sky/30"
            >
              {/* Animated gradient background */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-ucsd-blue/20 via-ucsd-sky/30 to-ucsd-blue/20 bg-[length:200%_100%]"
              />

              {/* Multiple decorative blur orbs */}
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-ucsd-navy/30 rounded-full blur-[80px]" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-ucsd-sky/40 rounded-full blur-[80px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-ucsd-blue/20 rounded-full blur-[100px]" />

              {/* Sparkle effects */}
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 left-1/4 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 right-1/4 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon/badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 bg-white/90 rounded-full border-2 border-white shadow-lg backdrop-blur-sm"
                >
                  <div className="text-lg">⚡</div>
                  <div className="text-xs font-black text-ucsd-navy uppercase tracking-[0.25em]">
                    Dramatic Impact
                  </div>
                </motion.div>

                {/* Main text with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                  className="relative"
                >
                  <div className="text-3xl md:text-5xl font-black text-ucsd-navy leading-tight tracking-tight">
                    {slide.subtitle}
                  </div>
                </motion.div>

                {/* Animated underline with glow */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
                  className="mx-auto mt-3 relative"
                >
                  <div className="w-36 h-1 bg-gradient-to-r from-transparent via-ucsd-navy to-transparent rounded-full" />
                  <div className="absolute inset-0 w-36 h-1 bg-gradient-to-r from-transparent via-ucsd-navy to-transparent rounded-full blur-md opacity-60" />
                </motion.div>

                {/* Subtitle tagline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="mt-2 text-xs md:text-sm font-semibold text-ucsd-navy tracking-wide"
                >
                  91% Faster Contract Review
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {(isSolution || isSolutionVideo) && (
        <div className="w-full max-w-[1700px] mx-auto">
          <div className={clsx(
            "grid gap-12",
            isSolutionVideo ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-[0.8fr_1.2fr]"
          )}>
            {/* Left: Media (Image or Video) */}
            {(slide.imageSrc || slide.videoSrc) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col justify-center"
              >
                <div className="absolute -inset-2 bg-gradient-to-br from-ucsd-blue/20 to-ucsd-sky/20 rounded-3xl blur-xl" />
                {slide.videoSrc ? (
                   <video
                     src={slide.videoSrc}
                     className="relative w-full h-auto rounded-2xl shadow-2xl ring-1 ring-black/5 object-cover"
                     autoPlay
                     loop
                     muted
                     playsInline
                   />
                ) : (
                  <img
                    src={slide.imageSrc}
                    alt={slide.title}
                    className="relative w-full h-auto rounded-2xl shadow-2xl ring-1 ring-black/5"
                  />
                )}
              </motion.div>
            )}

            {/* Right: Stats + Features */}
            <div className={clsx("flex flex-col justify-center", isSolutionVideo ? "gap-6" : "gap-8")}>
              {/* Horizontal Stats Bar */}
              <div className={clsx("flex", isSolutionVideo ? "gap-3" : "gap-4")}>
                {slide.stats?.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={clsx(
                      "flex-1 bg-white rounded-xl shadow-md border-t-4 border-ucsd-navy text-center",
                      isSolutionVideo ? "p-4" : "p-5"
                    )}
                  >
                    <div className={clsx(
                      "font-bold text-ucsd-blue uppercase tracking-wide opacity-80 mb-1",
                      isSolutionVideo ? "text-[10px]" : "text-xs"
                    )}>
                      {stat.label}
                    </div>
                    <div className={clsx(
                      "font-black text-ucsd-navy leading-none mb-1",
                      isSolutionVideo ? "text-3xl" : "text-4xl"
                    )}>
                      {stat.value}
                    </div>
                    <div className={clsx(
                      "text-slate-600 font-bold uppercase tracking-wide",
                      isSolutionVideo ? "text-[10px]" : "text-xs"
                    )}>
                      {stat.sub}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature List - Compact */}
              <div className="space-y-4">
                {slide.content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={clsx(
                      "flex gap-4 items-start bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border-l-4 border-ucsd-sky hover:shadow-md transition-shadow",
                      isSolutionVideo ? "p-4" : "p-6"
                    )}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-ucsd-gold flex-shrink-0 mt-2" />
                    <div className="flex-1 min-w-0">
                      <h3 className={clsx(
                        "font-bold text-ucsd-navy leading-tight mb-2",
                        isSolutionVideo ? "text-lg" : "text-xl"
                      )}>
                        {item.heading}
                      </h3>
                      <p className={clsx(
                        "text-slate-700 leading-relaxed font-medium",
                        isSolutionVideo ? "text-sm" : "text-base"
                      )}>
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isEcosystem && (
        <div className="relative w-full h-[750px] flex items-center justify-center mt-8 mb-4 px-16">
          {/* Central TritonGPT Hub - Rotating circle in center */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: [0, 360] }}
            transition={{
              scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.2 },
              opacity: { delay: 0.2 },
              rotate: { duration: 60, repeat: Infinity, ease: "linear" }
            }}
            className="z-20 w-56 h-56 rounded-full bg-gradient-to-br from-ucsd-navy to-ucsd-blue text-white flex flex-col items-center justify-center shadow-2xl border-4 border-ucsd-gold/30"
          >
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="flex flex-col items-center justify-center"
            >
              <Database size={40} className="mb-1 text-ucsd-gold mx-auto" />
              <span className="text-2xl font-bold tracking-wider block text-center">TritonGPT</span>
              <span className="text-sm font-light text-ucsd-sky uppercase tracking-[0.2em] mt-1 text-center px-4 block">Platform Core</span>
            </motion.div>
          </motion.div>

          {/* Connecting lines from center to cards */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible">
            {slide.content.map((item, index) => {
              const totalItems = slide.content.length;
              const innerRingCount = 8;
              const isInnerRing = index < innerRingCount;

              const positionInRing = isInnerRing ? index : index - innerRingCount;
              const itemsInThisRing = isInnerRing ? innerRingCount : (totalItems - innerRingCount);

              // Elliptical orbit parameters - rx (horizontal) and ry (vertical)
              const rx = isInnerRing ? 370 : 600;
              const ry = isInnerRing ? 220 : 320;

              // Parametric distribution: evenly distribute angle θ
              const angleStep = (2 * Math.PI) / itemsInThisRing;
              const startAngle = 0; // Start at right (3 o'clock)
              const theta = startAngle + (positionInRing * angleStep);

              // Parametric ellipse equations: x = rx·cos(θ), y = ry·sin(θ)
              const xPosition = rx * Math.cos(theta);
              const yPosition = ry * Math.sin(theta);

              const colorPalette = [
                '#182B49', '#00629B', '#006A96', '#00C6D7',
                '#FC8900', '#6E963B', '#B56200', '#747678',
                '#182B49', '#00629B', '#006A96', '#00C6D7',
                '#FC8900', '#6E963B', '#B56200', '#747678',
                '#182B49', '#00629B'
              ];
              const lineColor = colorPalette[index % colorPalette.length];

              return (
                <motion.line
                  key={`connection-line-${index}`}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${xPosition}px)`}
                  y2={`calc(50% + ${yPosition}px)`}
                  stroke={lineColor}
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.02 }}
                />
              );
            })}
          </svg>

          {/* Assistant cards positioned in two concentric elliptical orbits */}
          {slide.content.map((item, index) => {
            const totalItems = slide.content.length;
            const innerRingCount = 8;
            const isInnerRing = index < innerRingCount;

            const positionInRing = isInnerRing ? index : index - innerRingCount;
            const itemsInThisRing = isInnerRing ? innerRingCount : (totalItems - innerRingCount);

            // Elliptical orbit parameters - rx (horizontal) and ry (vertical)
            // rx is larger to avoid overlap with center hub when cards are on left/right
            const rx = isInnerRing ? 370 : 600;
            const ry = isInnerRing ? 220 : 320;

            // Parametric distribution: evenly distribute angle θ
            const angleStep = (2 * Math.PI) / itemsInThisRing;
            const startAngle = -Math.PI / 2; // Start at top (12 o'clock)
            const theta = startAngle + (positionInRing * angleStep);

            // Parametric ellipse equations: x = rx·cos(θ), y = ry·sin(θ)
            const xPosition = rx * Math.cos(theta);
            const yPosition = ry * Math.sin(theta);

            const colorPalette = [
              '#182B49', '#00629B', '#006A96', '#00C6D7',
              '#FC8900', '#6E963B', '#B56200', '#747678',
              '#182B49', '#00629B', '#006A96', '#00C6D7',
              '#FC8900', '#6E963B', '#B56200', '#747678',
              '#182B49', '#00629B'
            ];
            const borderColor = colorPalette[index % colorPalette.length];

            return (
              <motion.div
                key={`assistant-card-${index}`}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, x: xPosition, y: yPosition }}
                transition={{
                  delay: 0.4 + index * 0.05,
                  type: "spring",
                  stiffness: 120
                }}
                className={clsx(
                  "absolute z-10 p-4 bg-white rounded-2xl shadow-lg border-l-8 flex flex-col items-center text-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:z-30",
                  isInnerRing ? "w-52" : "w-60"
                )}
                style={{ borderLeftColor: borderColor }}
              >
                <span className="font-bold text-ucsd-navy text-sm leading-tight mb-1">
                  {item.heading}
                </span>
                <span className="text-xs text-slate-600 font-medium leading-tight line-clamp-2">
                  {item.text}
                </span>
              </motion.div>
            );
          })}

          {/* Decorative guide ellipses matching the parametric orbits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="absolute rounded-[100%] border border-dashed border-ucsd-blue/20 w-[740px] h-[440px] -z-10"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute rounded-[100%] border border-dashed border-ucsd-blue/10 w-[1200px] h-[640px] -z-10"
          />
        </div>
      )}

      {isPlatformArchitecture && (
        <div className="relative w-full h-full flex flex-col justify-center max-w-[1900px] mx-auto px-8 overflow-hidden">
          {/* Animated background elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-ucsd-blue/20 to-ucsd-gold/20 rounded-full blur-3xl -z-10"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, -60, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-ucsd-sky/20 rounded-full blur-3xl -z-10"
          />

          {/* Compact Title with dramatic entrance */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 120 }}
              className="inline-block relative"
            >
              {/* Glow effect behind title */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-ucsd-gold/30 blur-2xl -z-10"
              />
              <div className="text-4xl md:text-5xl font-black text-ucsd-navy mb-2 tracking-tight drop-shadow-lg">
                TritonGPT Platform
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1.5 w-full bg-gradient-to-r from-ucsd-blue via-ucsd-gold to-ucsd-sky rounded-full shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-ucsd-blue font-medium mt-2"
            >
              One Unified Platform, Multiple Specialized AI Assistants
            </motion.div>
          </div>

          {/* Horizontal Layout: Platform Core on Left, Categories on Right */}
          <div className="relative grid grid-cols-[280px_1fr] gap-6 items-start">
            {/* Animated connection lines from core to categories */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {[0, 1, 2, 3].map((index) => {
                const startX = 280;
                const startY = '50%';
                const endX = index % 2 === 0 ? '60%' : '85%';
                const endY = index < 2 ? '30%' : '70%';

                return (
                  <motion.line
                    key={index}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={slide.assistantGroups?.[index]?.color || '#182B49'}
                    strokeWidth="2"
                    strokeOpacity="0.2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Left: Platform Core with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.6, duration: 1, type: "spring", stiffness: 80 }}
              className="relative bg-gradient-to-br from-ucsd-navy to-ucsd-blue rounded-3xl p-8 shadow-2xl border-4 border-ucsd-gold/30 flex flex-col items-center justify-center h-full z-10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Pulsing glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-ucsd-gold/20 rounded-3xl blur-xl -z-10"
              />

              {/* Rotating icon */}
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Database size={56} className="text-ucsd-gold mb-4 drop-shadow-lg" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-3xl font-black text-white text-center mb-2 tracking-tight"
              >
                TritonGPT
              </motion.div>
              <div className="text-xs text-ucsd-sky uppercase tracking-[0.25em] text-center font-bold mb-4">
                Platform Core
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="w-20 h-1 bg-ucsd-gold rounded-full mb-4 shadow-lg"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-xs text-white/80 text-center font-medium leading-relaxed"
              >
                SDSC Infrastructure<br/>
                Onyx Framework<br/>
                Open-Source Models
              </motion.div>

              {/* Particle effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -100],
                    x: [(i % 3 - 1) * 20, (i % 3 - 1) * 40],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 bg-ucsd-gold rounded-full shadow-lg"
                  style={{
                    bottom: '50%',
                    left: '50%'
                  }}
                />
              ))}
            </motion.div>

            {/* Right: Assistant Categories in 2x2 Grid with staggered dramatic entrance */}
            <div className="grid grid-cols-2 gap-4 z-10">
              {slide.assistantGroups?.map((group, groupIndex) => (
                <motion.div
                  key={groupIndex}
                  initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{
                    delay: 0.8 + groupIndex * 0.15,
                    type: "spring",
                    stiffness: 120,
                    damping: 15
                  }}
                  className="relative bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border-t-4 cursor-pointer"
                  style={{
                    borderTopColor: group.color,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    animate={{
                      opacity: [0, 0.1, 0],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: groupIndex * 0.5
                    }}
                    className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${group.color}40, transparent)` }}
                  />

                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-3 relative">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="w-3 h-3 rounded-full shadow-lg flex-shrink-0"
                      style={{ backgroundColor: group.color }}
                    />
                    <h3 className="text-lg font-black text-ucsd-navy uppercase tracking-wide">
                      {group.category}
                    </h3>
                  </div>

                  {/* Assistants List - Compact with slide-in animation */}
                  <div className="space-y-1.5">
                    {group.assistants.map((assistant, assistantIndex) => (
                      <motion.div
                        key={assistantIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 1.0 + groupIndex * 0.15 + assistantIndex * 0.05,
                          type: "spring",
                          stiffness: 150
                        }}
                        className="flex items-start gap-2 group"
                      >
                        <motion.div
                          whileHover={{ scale: 1.5 }}
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: group.color }}
                        />
                        <div className="text-xs font-semibold text-ucsd-navy/90 group-hover:text-ucsd-blue transition-colors leading-tight">
                          {assistant}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Count Badge with pulse */}
                  <div className="mt-3 flex justify-end">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: groupIndex * 0.3
                      }}
                      className="px-2.5 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-md"
                      style={{ backgroundColor: group.color }}
                    >
                      {group.assistants.length} Assistant{group.assistants.length !== 1 ? 's' : ''}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isPlatformLayers && (
        <div className="relative w-full h-full flex flex-col justify-center items-center max-w-[1800px] mx-auto px-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="text-4xl font-black text-ucsd-navy mb-2">The TritonGPT Stack</div>
            <div className="text-lg text-ucsd-blue font-medium">Layered Architecture Powering 18 Specialized Assistants</div>
          </motion.div>

          {/* Main visualization: Stack view */}
          <div className="relative w-full flex gap-8 items-end">
            {/* Left side: Platform Stack (3D layered boxes) */}
            <div className="flex-1 flex flex-col-reverse gap-0 items-stretch">
              {/* Foundation Layer */}
              <motion.div
                initial={{ opacity: 0, y: 100, scaleY: 0.5 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                className="relative"
                style={{ height: '80px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ucsd-navy to-[#0f1f33] rounded-xl shadow-2xl border-2 border-ucsd-gold/30 flex items-center justify-between px-6 overflow-hidden">
                  {/* Animated background pattern */}
                  <motion.div
                    animate={{ x: [0, 50, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                    }}
                  />
                  <div className="relative z-10 flex items-center gap-4">
                    <Database size={32} className="text-ucsd-gold" />
                    <div>
                      <div className="text-white font-black text-xl">Infrastructure Foundation</div>
                      <div className="text-ucsd-sky text-xs font-medium mt-0.5">SDSC • Onyx • Open-Source Models</div>
                    </div>
                  </div>
                  <div className="relative z-10 text-ucsd-gold/50 text-5xl font-black">L1</div>
                </div>
              </motion.div>

              {/* Platform Core Layer */}
              <motion.div
                initial={{ opacity: 0, y: 100, scaleY: 0.5 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                className="relative"
                style={{ height: '100px', marginTop: '-10px', zIndex: 2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ucsd-blue to-[#005a8a] rounded-xl shadow-2xl border-2 border-ucsd-gold/40 flex items-center justify-between px-6 overflow-hidden">
                  {/* Glow effect */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-ucsd-gold/10 blur-xl"
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Cpu size={40} className="text-ucsd-gold" />
                    </motion.div>
                    <div>
                      <div className="text-white font-black text-2xl">TritonGPT Platform Core</div>
                      <div className="text-ucsd-sky text-sm font-medium mt-0.5">Unified orchestration, security & data integration</div>
                    </div>
                  </div>
                  <div className="relative z-10 text-ucsd-gold/50 text-6xl font-black">L2</div>
                </div>
              </motion.div>

              {/* Assistants Layer Label */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="relative"
                style={{ height: '60px', marginTop: '-8px', zIndex: 3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ucsd-gold to-[#e6b800] rounded-t-xl shadow-xl border-2 border-ucsd-gold flex items-center justify-center">
                  <div className="text-ucsd-navy font-black text-xl uppercase tracking-[0.2em]">
                    AI Assistants Layer (L3)
                  </div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-3 right-8 text-4xl"
                  >
                    ↑
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right side: Assistant Categories as cards flowing from platform */}
            <div className="flex-1 grid grid-cols-2 gap-3 pb-2">
              {slide.assistantCategories?.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  whileHover={{ scale: 1.05, rotate: 1, y: -5 }}
                  transition={{
                    delay: 0.9 + index * 0.1,
                    type: "spring",
                    stiffness: 150
                  }}
                  className="relative bg-white rounded-2xl p-4 shadow-xl border-l-8 cursor-pointer group"
                  style={{ borderLeftColor: category.color }}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-lg -z-10"
                    style={{ backgroundColor: category.color }}
                  />

                  {/* Icon and category name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: category.color }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="text-white text-lg font-bold"
                      >
                        {category.count}
                      </motion.div>
                    </div>
                    <div>
                      <div className="text-base font-black text-ucsd-navy uppercase tracking-wide">
                        {category.name}
                      </div>
                      <div className="text-[10px] text-ucsd-navy/60 font-bold">
                        {category.count} Assistants
                      </div>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="space-y-1">
                    {category.examples?.map((example, exIdx) => (
                      <motion.div
                        key={exIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + index * 0.1 + exIdx * 0.05 }}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-ucsd-navy/80 font-semibold">{example}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated connector line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                    className="absolute -left-8 top-1/2 w-8 h-0.5 origin-left"
                    style={{ backgroundColor: `${category.color}40` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex items-center gap-8 text-sm font-semibold text-ucsd-navy/70"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ucsd-gold" />
              <span>18 Total AI Assistants</span>
            </div>
            <div className="w-px h-6 bg-ucsd-navy/20" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ucsd-blue" />
              <span>4 Functional Categories</span>
            </div>
            <div className="w-px h-6 bg-ucsd-navy/20" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ucsd-navy" />
              <span>1 Unified Platform</span>
            </div>
          </motion.div>
        </div>
      )}

      {isPlatformSimple && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-full max-w-[1400px]">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="text-5xl font-black text-ucsd-navy">TritonAI Platform</div>
            </motion.div>

            {/* Big platform box containing all assistants */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative bg-gradient-to-br from-white to-ucsd-blue/5 rounded-3xl p-10 shadow-2xl border-4 border-ucsd-navy/20"
            >
              {/* Platform label */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-ucsd-navy to-ucsd-blue text-white px-8 py-3 rounded-full shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Database size={24} className="text-ucsd-gold" />
                  <span className="font-black text-lg tracking-wide uppercase">AI Assistants and Agents</span>
                </div>
              </motion.div>

              {/* Grid of assistants */}
              <div className="grid grid-cols-3 gap-5">
                {slide.assistants?.map((assistant, index) => {
                  const IconComponent = assistant.icon ? iconMap[assistant.icon] : null;

                  // Color palette for card borders - cycling through UCSD colors
                  const borderColors = [
                    '#182B49', // UCSD Navy
                    '#00629B', // UCSD Blue
                    '#00C6D7', // UCSD Sky
                    '#FFCD00', // UCSD Gold
                    '#FC8900', // Poppy Orange
                    '#6E963B', // Palm Green
                    '#B56200', // Tierra Clay
                    '#006A96', // Pacific Blue
                    '#747678'  // Stone Gray
                  ];
                  const borderColor = borderColors[index % borderColors.length];

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.6 + index * 0.05,
                        type: "spring",
                        stiffness: 150
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-white rounded-xl px-5 py-4 shadow-md border-l-8 hover:shadow-lg transition-shadow cursor-pointer"
                      style={{ borderLeftColor: borderColor }}
                    >
                      <div className="flex items-start gap-4">
                        {IconComponent && (
                          <div className="flex-shrink-0 mt-1">
                            <IconComponent size={24} className="text-ucsd-blue" style={{ color: borderColor }} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-xl font-bold text-ucsd-navy leading-tight mb-1">
                            {typeof assistant === 'string' ? assistant : assistant.name}
                          </div>
                          {assistant.description && (
                            <div className="text-base text-ucsd-navy/60 font-semibold leading-snug">
                              {assistant.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Platform info at bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 pt-4 border-t-2 border-ucsd-gold/30 text-center text-sm text-ucsd-navy/70 font-semibold"
              >
                Hosted at San Diego Supercomputer Center · Low Cost and Open Source Frameworks · Model Agnostic
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {isAssistantCategories && slide.categories && (
        <div className="flex flex-col gap-6 w-full max-w-[1800px] mx-auto">
          <div className={clsx(
            "grid grid-cols-1 gap-6",
            slide.categories.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          )}>
            {slide.categories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + catIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-t-8"
                style={{ borderTopColor: category.color }}
              >
                <h3 className="text-2xl font-bold mb-5 text-ucsd-navy flex items-center gap-3">
                  <div className="w-3 h-8 rounded-full" style={{ backgroundColor: category.color }} />
                  {category.name}
                </h3>
                <div className="flex flex-col gap-3">
                  {category.assistants.map((assistant, idx) => {
                    const IconComponent = assistant.icon ? iconMap[assistant.icon] : null;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + catIndex * 0.1 + idx * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                      >
                        {IconComponent ? (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: category.color }}>
                            <IconComponent size={20} className="text-white" />
                          </div>
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: category.color }} />
                        )}
                        <div>
                          <div className="font-bold text-ucsd-navy text-lg md:text-xl leading-tight">{assistant.heading}</div>
                          <div className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mt-1">{assistant.text}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {slide.saasOnboarding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-green-600"
            >
              <div className="text-center text-lg md:text-xl font-bold text-green-900">
                {slide.saasOnboarding.text}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {isKeyTakeaways && (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {slide.content.map((item, index) => {
              const IconComponent = item.icon ? iconMap[item.icon] : null;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-3xl shadow-xl border-b-8 border-ucsd-gold hover:-translate-y-2 transition-transform"
                >
                  {IconComponent && (
                    <motion.div
                      animate={floatAnimation}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-ucsd-navy to-ucsd-blue flex items-center justify-center text-ucsd-gold shadow-lg"
                    >
                      <IconComponent size={32} />
                    </motion.div>
                  )}
                  <div className="text-xl font-bold text-ucsd-navy">{item.heading}</div>
                  <div className="text-base text-slate-700 leading-relaxed font-medium">{item.text}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {isRoadmap && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {slide.content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
              className="relative p-8 bg-white rounded-2xl shadow-lg border-l-8 border-ucsd-blue hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="absolute top-4 right-4 text-6xl font-black text-ucsd-navy/5">{index + 1}</div>
              <div className="text-xl font-bold text-ucsd-navy mb-3">{item.heading}</div>
              <div className="text-base text-slate-600 font-medium">{item.text}</div>
            </motion.div>
          ))}
        </div>
      )}

      {isProblemStatement && (
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {slide.content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2, type: "spring", stiffness: 80 }}
                className="relative group h-full"
              >
                {/* Large number background */}
                <div className="absolute -left-6 -top-4 text-[140px] font-black text-red-500/5 leading-none pointer-events-none z-0">
                  {index + 1}
                </div>

                {/* Content card */}
                <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-7 shadow-2xl border-l-8 border-red-500 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  {/* Stat badge */}
                  <div className="inline-flex items-center gap-3 mb-5 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg w-fit">
                    <div className="text-3xl font-black text-white">{item.stat}</div>
                    <div className="h-6 w-px bg-white/30" />
                    <div className="text-xs font-bold text-white uppercase tracking-widest">{item.statLabel}</div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-4xl font-black text-ucsd-navy mb-4 leading-tight">
                    {item.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-xl text-slate-700 leading-relaxed font-medium flex-1">
                    {item.text}
                  </p>

                  {/* Decorative accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-red-500/10 to-transparent rounded-tl-full pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {isFeatureGrid && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1600px] mx-auto">
          {slide.content.map((item, index) => {
            const topBarColors = ['#182B49', '#00C6D7', '#00629B', '#FFCD00', '#FC8900', '#6E963B'];
            const topBarColor = topBarColors[index % topBarColors.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
                className="relative flex flex-col bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden"
              >
                {/* Colored top bar */}
                <div className="h-3 w-full" style={{ backgroundColor: topBarColor }} />

                {/* Content */}
                <div className="p-8">
                  {/* Number watermark */}
                  <div className="absolute top-3 right-5 text-7xl font-black text-ucsd-navy/10 pointer-events-none select-none">
                    {index + 1}
                  </div>

                  {/* Heading */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-ucsd-navy tracking-tight leading-tight pr-20">
                    {item.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-slate-800 font-semibold leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {isComparisonTable && (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-3">
          {/* Header */}
          <div className="grid grid-cols-[0.8fr_2.1fr_2.1fr] gap-6 px-7 mb-1.5">
            <div className="text-ucsd-navy font-bold text-sm uppercase tracking-[0.15em] opacity-40 self-end pb-1.5">Feature</div>
            <div className="text-slate-400 font-bold text-2xl flex items-center gap-2 opacity-80">
              Generative AI <span className="text-sm font-medium opacity-60 bg-slate-100 px-2 py-0.5 rounded">2025</span>
            </div>
            <div className="text-ucsd-blue font-black text-2xl flex items-center gap-2">
              Agentic AI <span className="text-sm font-bold text-white bg-ucsd-blue px-2 py-0.5 rounded shadow-sm">2026</span>
            </div>
          </div>

          {/* Rows */}
          {slide.tableData.map((row, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="grid grid-cols-[0.8fr_2.1fr_2.1fr] gap-6 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-ucsd-blue/20 transition-all items-center group relative overflow-hidden"
            >
              {/* Agentic Background Highlight */}
              <div className="absolute right-0 top-0 bottom-0 w-[44%] bg-ucsd-blue/[0.04] pointer-events-none group-hover:bg-ucsd-blue/[0.07] transition-colors duration-300" />
              
              {/* Feature Name */}
              <div className="font-bold text-ucsd-navy text-lg relative z-10 tracking-tight leading-tight pr-6 border-r-2 border-slate-200 h-full flex items-center">
                {row.feature}
              </div>

              {/* Gen AI */}
              <div className="text-slate-600 font-semibold text-xl leading-relaxed relative z-10 pr-6 border-r-2 border-slate-200 h-full flex items-center">
                {row.genAI}
              </div>

              {/* Agentic AI */}
              <div className="text-ucsd-navy font-bold text-xl leading-relaxed relative z-10 flex items-start gap-4">
                 <div className="mt-1 w-6 h-6 rounded-full bg-ucsd-gold flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </div>
                 <span className="bg-gradient-to-r from-ucsd-blue to-ucsd-navy bg-clip-text text-transparent">
                  {row.agenticAI}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isCompoundArchitecture && (
        <div className="relative w-full h-full flex flex-col items-center justify-center px-6 py-3 max-w-[1800px] mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="text-5xl font-black text-ucsd-navy leading-none">{slide.title}</div>
            <div className="text-xl text-ucsd-blue font-medium mt-1">{slide.subtitle}</div>
          </motion.div>

          {/* Architecture Flow Diagram */}
          <div className="relative w-full flex flex-col gap-2">
            {/* Layer 1: Orchestration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative flex items-start justify-between gap-4"
            >
              <div
                className="flex-1 bg-white rounded-xl p-3 shadow-lg border-l-6 relative overflow-hidden h-full"
                style={{ borderLeftColor: slide.architectureLayers[0].color }}
              >
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[0].color}20` }}>
                  <Cpu size={18} style={{ color: slide.architectureLayers[0].color }} />
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-4xl font-black text-ucsd-navy/20 leading-none">{slide.architectureLayers[0].number}</div>
                  <div className="flex-1">
                    <div className="text-2xl font-black text-ucsd-navy uppercase tracking-wide leading-none mb-1">{slide.architectureLayers[0].name}</div>
                    <div className="text-base font-bold text-ucsd-blue mb-1">{slide.architectureLayers[0].description}</div>
                    <div className="text-xl text-ucsd-navy/70 leading-tight">{slide.architectureLayers[0].details}</div>
                  </div>
                </div>
              </div>

              {/* Arrow to Multi-Agent */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center"
              >
                <ArrowRight size={32} className="text-ucsd-blue" strokeWidth={3} />
              </motion.div>

              {/* Layer 5 (Multi-Agent) - Positioned on right */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex-1 bg-white rounded-xl p-3 shadow-lg border-l-6 h-full"
                style={{ borderLeftColor: slide.architectureLayers[4].color }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[4].color}20` }}>
                    <Network size={16} style={{ color: slide.architectureLayers[4].color }} />
                  </div>
                  <div className="text-xl font-black text-ucsd-navy uppercase leading-none">{slide.architectureLayers[4].name}</div>
                </div>
                <div className="text-base font-bold text-ucsd-blue mb-1">{slide.architectureLayers[4].description}</div>
                <div className="text-lg text-ucsd-navy/70 mb-1.5 leading-tight">{slide.architectureLayers[4].details}</div>
                <div className="space-y-1">
                  {slide.architectureLayers[4].structures.map((struct, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-md p-1.5 border border-gray-200">
                      <div className="text-base font-bold text-ucsd-navy leading-none">{struct.type}</div>
                      <div className="text-base text-ucsd-navy/60 leading-tight mt-0.5">{struct.description}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Center Arrow Down */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center -my-2"
            >
              <ArrowDown size={28} className="text-ucsd-navy" strokeWidth={3} />
            </motion.div>

            {/* Layer 2: MCP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="bg-white rounded-xl p-3 shadow-lg border-l-6 relative overflow-hidden"
              style={{ borderLeftColor: slide.architectureLayers[1].color }}
            >
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[1].color}20` }}>
                <GitBranch size={18} style={{ color: slide.architectureLayers[1].color }} />
              </div>
              <div className="flex items-start gap-2 mb-2">
                <div className="text-4xl font-black text-ucsd-navy/20 leading-none">{slide.architectureLayers[1].number}</div>
                <div className="flex-1">
                  <div className="text-2xl font-black text-ucsd-navy uppercase tracking-wide leading-none mb-1">{slide.architectureLayers[1].name}</div>
                  <div className="text-base font-bold text-ucsd-blue">{slide.architectureLayers[1].description}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {slide.architectureLayers[1].details.map((detail, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-md p-2 border border-gray-200">
                    <div className="text-base font-black text-ucsd-navy leading-none mb-1">{detail.label}:</div>
                    <div className="text-lg text-ucsd-navy/70 leading-tight">{detail.text}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Center Arrow Down */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center -my-2"
            >
              <ArrowDown size={28} className="text-ucsd-navy" strokeWidth={3} />
            </motion.div>

            {/* Layers 3 & 4: Application and Data side by side */}
            <div className="grid grid-cols-2 gap-3">
              {/* Layer 3: Application */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="bg-white rounded-xl p-3 shadow-lg border-l-6 relative overflow-hidden"
                style={{ borderLeftColor: slide.architectureLayers[2].color }}
              >
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[2].color}20` }}>
                  <Grid3x3 size={18} style={{ color: slide.architectureLayers[2].color }} />
                </div>
                <div className="flex items-start gap-2 mb-1.5">
                  <div className="text-4xl font-black text-ucsd-navy/20 leading-none">{slide.architectureLayers[2].number}</div>
                  <div className="flex-1">
                    <div className="text-xl font-black text-ucsd-navy uppercase tracking-wide leading-none mb-1">{slide.architectureLayers[2].name}</div>
                    <div className="text-sm font-bold text-ucsd-blue mb-0.5">{slide.architectureLayers[2].description}</div>
                    <div className="text-lg text-ucsd-navy/70 leading-tight mb-1.5">{slide.architectureLayers[2].details}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {slide.architectureLayers[2].tools.map((tool, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-ucsd-blue to-ucsd-navy text-white rounded-md p-2 text-center text-base font-bold shadow-md">
                      {tool}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Layer 4: Data */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="bg-white rounded-xl p-3 shadow-lg border-l-6 relative overflow-hidden"
                style={{ borderLeftColor: slide.architectureLayers[3].color }}
              >
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[3].color}20` }}>
                  <Database size={18} style={{ color: slide.architectureLayers[3].color }} />
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-4xl font-black text-ucsd-navy/20 leading-none">{slide.architectureLayers[3].number}</div>
                  <div className="flex-1">
                    <div className="text-xl font-black text-ucsd-navy uppercase tracking-wide leading-none mb-1">{slide.architectureLayers[3].name}</div>
                    <div className="text-sm font-bold text-ucsd-blue mb-0.5">{slide.architectureLayers[3].description}</div>
                    <div className="text-lg text-ucsd-navy/70 leading-tight">{slide.architectureLayers[3].details}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {!isEcosystem && !isPlatformArchitecture && !isPlatformLayers && !isPlatformSimple && !isSolution && !isSolutionVideo && !isCaseStudyHero && !isAssistantCategories && !isKeyTakeaways && !isRoadmap && !isProblemStatement && !isFeatureGrid && !isComparisonTable && !isCompoundArchitecture && slide.content && slide.content.length > 0 && (
        <motion.ul 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={clsx(
            "w-full gap-x-12 gap-y-12 relative",
            useThreeColumns ? "grid grid-cols-1 md:grid-cols-3 text-sm" : 
            (isVeryDense || useDenseList) ? "grid grid-cols-1 md:grid-cols-2 text-sm md:text-base" : 
            isDense ? "grid grid-cols-1 md:grid-cols-2 text-base md:text-lg" : 
            isGraphicHeavy ? "flex flex-col text-sm md:text-base gap-3" :
            isFeatureGrid ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[1600px]" :
            isHeroList ? "flex flex-col gap-5 max-w-7xl w-full" :
            "flex flex-col text-lg md:text-xl"
          )}
        >
          {isHeroList && <div className="absolute top-14 bottom-14 left-[3rem] w-1 bg-ucsd-blue/30 -z-10" />}
          {slide.content.map((item, index) => {
            const borderColors = ['border-ucsd-navy', 'border-ucsd-sky', 'border-ucsd-blue', 'border-ucsd-gold', 'border-ucsd-poppy-orange', 'border-ucsd-palm-green', 'border-ucsd-tierra-clay', 'border-ucsd-pacific-blue', 'border-ucsd-navy', 'border-ucsd-sky','border-ucsd-poppy-orange', 'border-ucsd-palm-green', 'border-ucsd-tierra-clay','border-ucsd-navy', 'border-ucsd-blue', 'border-ucsd-pacific-blue', 'border-ucsd-sky'];
            const bgColors = ['bg-ucsd-navy', 'bg-ucsd-gold', 'bg-ucsd-blue', 'bg-ucsd-sky', 'bg-ucsd-poppy-orange', 'bg-ucsd-palm-green', 'bg-ucsd-tierra-clay', 'bg-ucsd-pacific-blue'];
            const topBarColors = ['#182B49', '#00C6D7', '#00629B', '#FFCD00', '#FC8900', '#6E963B', '#B56200', '#006A96'];
            const headerColors = isDark
              ? ['text-white', 'text-ucsd-gold', 'text-ucsd-sky', 'text-white']
              : ['text-ucsd-navy', 'text-ucsd-blue', 'text-ucsd-navy', 'text-ucsd-blue'];
            const borderColorClass = borderColors[index % borderColors.length];
            const bgColorClass = bgColors[index % bgColors.length];
            const topBarColor = topBarColors[index % topBarColors.length];
            const headerColorClass = headerColors[index % headerColors.length];
            const IconComponent = item.icon ? iconMap[item.icon] : null;

            // Custom background for "Deliver Measurable Impact" (index 4, GraduationCap icon)
            const customBgColor = (isHeroList && index === 4) ? '#6E963B' : null;
            return (
              <motion.li 
                key={index} 
                variants={itemVariants}
                className={clsx(
                  "flex relative group transition-all duration-300",
                  useThreeColumns && clsx("flex-col p-4 rounded-lg border shadow-sm", isDark ? "bg-white/10 border-white/10" : "bg-white/60 border-ucsd-blue/10"),
                  isGraphicHeavy && clsx("flex-col p-3 rounded-md border-l-4 border-ucsd-gold", isDark ? "bg-white/10" : "bg-white/50"),
                  isFeatureGrid && clsx("flex-col p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 border-t-8", borderColorClass),
                  isHeroList && "flex-row items-center gap-6"
                )}
              >
                 {isFeatureGrid && (
                   <>
                     <div className="absolute top-0 left-0 right-0 h-3 rounded-t-2xl" style={{ backgroundColor: topBarColor }} />
                     <div className={clsx("absolute top-0 right-0 p-5 opacity-[0.07] text-7xl font-black pointer-events-none select-none",headerColorClass)}>{index + 1}</div>
                   </>
                 )}
                 {isHeroList && (
                   <motion.div
                     animate={pulseAnimation}
                     className={clsx("flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-10 relative", !customBgColor && bgColorClass)}
                     style={customBgColor ? { backgroundColor: customBgColor } : {}}
                   >
                     {IconComponent ? <IconComponent size={40} className="text-white drop-shadow-md" strokeWidth={2.5} /> : <span className="text-3xl font-bold text-white">{index + 1}</span>}
                   </motion.div>
                 )}
                <div className={clsx("flex flex-col flex-1", isHeroList && clsx("p-4 rounded-2xl border-l-8 bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all",borderColorClass))}>
                  {item.heading && (
                    <span className={clsx(
                      "font-semibold mb-1",
                      useThreeColumns ? clsx("text-sm uppercase tracking-wide border-b pb-1 mb-2", isDark ? "text-ucsd-sky border-white/20" : "text-ucsd-blue border-ucsd-gold/30") : "text-lg",
                      isGraphicHeavy && "text-base font-bold text-ucsd-blue",
                      isFeatureGrid && clsx("text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-tight pr-20", headerColorClass),
                      isHeroList && "text-3xl font-black text-ucsd-navy mb-1.5 leading-tight"
                    )}>{item.heading}</span>
                  )}
                  {item.text && (
                    <span className={clsx(
                      "leading-relaxed",
                      isFeatureGrid && "text-lg md:text-xl text-slate-800 font-semibold",
                      isHeroList && "text-xl text-slate-700 font-medium leading-relaxed",
                      !isFeatureGrid && !isHeroList && isDark ? "text-white/80" : ""
                    )}>{item.text}</span>
                  )}
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </>
  );

  const quarterCircleColors = [
    'rgba(0, 198, 215, 0.15)',    // Sky blue
    'rgba(252, 137, 0, 0.15)',     // Orange
    'rgba(110, 150, 59, 0.15)',    // Green
    'rgba(255, 205, 0, 0.15)',     // Gold
  ];
  const quarterCircleColor = quarterCircleColors[slide.id % quarterCircleColors.length];

  // Upper right orb colors - offset by 1 to ensure always different color from lower left
  const upperRightOrbColors = [
    'rgba(252, 137, 0, 0.12)',     // Orange (lighter)
    'rgba(110, 150, 59, 0.12)',    // Green (lighter)
    'rgba(255, 205, 0, 0.12)',     // Gold (lighter)
    'rgba(0, 198, 215, 0.12)',     // Sky blue (lighter)
  ];
  const upperRightOrbColor = upperRightOrbColors[(slide.id + 1) % upperRightOrbColors.length];

  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col p-6 md:p-12 relative overflow-hidden transition-colors duration-500 break-words",
        !slide.backgroundColor && (isDark ? "bg-[#1a1a1a]" : "bg-gray-50")
      )}
      style={slide.backgroundColor ? { backgroundColor: slide.backgroundColor } : {}}
    >
      {/* Hide orbs on ecosystem and platform architecture slides to avoid visual clutter */}
      {!isEcosystem && !isPlatformArchitecture && !isPlatformLayers && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: isDark ? [0.3, 0.4, 0.3] : [0.9, 1, 0.9],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 rounded-bl-full pointer-events-none z-1"
            style={{ backgroundColor: upperRightOrbColor, mixBlendMode: isDark ? 'overlay' : 'normal' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-tr-full pointer-events-none z-1"
            style={{ backgroundColor: quarterCircleColor }}
          />
        </>
      )}
      {slide.backgroundImage && (
        <>
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${slide.backgroundImage})` }} />
          <div className="absolute inset-0 bg-white/75 z-0 backdrop-blur-[2px]" />
        </>
      )}
      {isDark && <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-ucsd-blue/10 rounded-full blur-[100px] -mr-[10vw] -mt-[10vw] pointer-events-none" />}
      <div className="flex-1 w-full h-full z-10 flex flex-col justify-center">
        {hasImage ? (
          <div className={clsx("h-full items-center gap-8", isGraphicHeavy ? "grid grid-cols-1 lg:grid-cols-12" : "flex flex-col md:flex-row")}>
            <div className={clsx("flex flex-col h-full overflow-y-auto pr-4 custom-scrollbar", isGraphicHeavy ? "lg:col-span-4 order-2 lg:order-1 pt-4" : "flex-1", isDense ? "justify-start pt-4" : "justify-center")}>
              {renderContent()}
            </div>
            <div className={clsx("h-full flex items-center justify-center p-4", isGraphicHeavy ? "lg:col-span-8 order-1 lg:order-2 bg-gray-50/50 rounded-xl" : "flex-1")}>
              <motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }} src={slide.imageSrc} alt="Slide visual" className={clsx("object-contain rounded-lg shadow-xl bg-white", isGraphicHeavy ? "max-h-[85vh] w-full" : "max-h-[80vh] max-w-full")} />
            </div>
          </div>
        ) : (
          <div className={clsx("flex flex-col h-full w-full", isTitle ? "justify-center items-center text-center" : "justify-start pt-4 overflow-y-auto custom-scrollbar")}>
            <div className={clsx("w-full mx-auto", (isSolution || isSolutionVideo || isCaseStudyHero || isProblemStatement || isFeatureGrid) ? "max-w-[1800px]" : "max-w-7xl")}>{renderContent()}</div>
          </div>
        )}
      </div>
      <div className="absolute bottom-6 right-8 text-ucsd-navy/30 text-xs font-bold tracking-widest z-20">UC SAN DIEGO | {slide.id}</div>
    </div>
  );
};

export default Slide;
