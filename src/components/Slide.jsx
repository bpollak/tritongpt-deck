import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import clsx from 'clsx';
import { Target, Database, Cpu, Blocks, GraduationCap, Building2, FileText, FileCheck, DollarSign, Shield, BookOpen, Code, Presentation, Globe, FileEdit, FolderOpen, TrendingUp, ClipboardCheck, Search, Heart, Calendar, GitBranch, Network, Grid3x3, ArrowDown, ArrowRight, Brain, RefreshCw, ArrowRightLeft, CheckCircle, Monitor, User, Users, Award, Server, Layers, Wallet, Share2, Star, FlaskConical, Lightbulb, Landmark } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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
  'Grid3x3': Grid3x3,
  'Brain': Brain,
  'RefreshCw': RefreshCw,
  'ArrowRightLeft': ArrowRightLeft,
  'CheckCircle': CheckCircle,
  'Monitor': Monitor,
  'Users': Users,
  'Star': Star,
  'FlaskConical': FlaskConical,
  'Award': Award,
  'Layers': Layers,
  'Share2': Share2,
  'Server': Server,
  'Wallet': Wallet,
  'Lightbulb': Lightbulb,
  'Landmark': Landmark
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
    return (
      <div className="relative w-full h-full overflow-hidden bg-black">
        <video
          src={slide.videoSrc}
          poster={slide.poster}
          className="absolute inset-0 h-full w-full object-contain"
          controls
          autoPlay
          loop
          muted
          playsInline
        />
        {slide.title && (
          <div className="absolute left-6 top-6 rounded-full bg-black/55 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {slide.title}
          </div>
        )}
      </div>
    );
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
  const isAgentDevStrategy = slide.layout === 'agent-dev-strategy';
  const isContractReviewChallenge = slide.layout === 'contract-review-challenge';
  const isRoadmap = slide.layout === 'roadmap';
  const isProblemStatement = slide.layout === 'problem-statement';
  const isComparisonTable = slide.layout === 'comparison-table';
  const isCompoundArchitecture = slide.layout === 'compound-architecture';
  const isAgentWorkflow = slide.layout === 'agent-workflow';
  const isAnalyticsChart = slide.layout === 'analytics-chart';
  const isTeamGrid = slide.layout === 'team-grid';
  const isTimelineEvolution = slide.layout === 'timeline-evolution';
  const isCampusMetrics = slide.layout === 'campus-metrics';
  const isApiGateway = slide.layout === 'api-gateway';
  const isHostingPipeline = slide.layout === 'hosting-pipeline';
  const isIntakeFunnel = slide.layout === 'intake-funnel';
  const isInnovationFlywheel = slide.layout === 'innovation-flywheel';
  const isFlywheelCaseStudy = slide.layout === 'flywheel-case-study';
  const isOriginStory = slide.layout === 'origin-story';
  const parseHeroHeading = (heading = '') => {
    const match = heading.match(/^(.*?)\s*\(([^)]+)\)$/);
    if (!match) return { title: heading, badge: '' };
    return {
      title: match[1].trim(),
      badge: match[2].trim()
    };
  };
  const heroListSections = isHeroList
    ? [
      {
        label: 'Foundation',
        descriptor: 'Governed Infrastructure',
        summary: 'Trust, controls, and portable architecture that campus teams can build on.',
        accent: '#FFCD00',
        cardTint: 'from-[#fff7d6] via-[#fffdf4] to-white',
        indexes: [0, 4]
      },
      {
        label: 'Scale',
        descriptor: 'Horizontal Reach',
        summary: 'Shared utilities embedded across the systems people already use every day.',
        accent: '#00C6D7',
        cardTint: 'from-[#ddfbff] via-[#f6feff] to-white',
        indexes: [1, 3]
      },
      {
        label: 'Outcomes',
        descriptor: 'Vertical Execution',
        summary: 'Workflow-specific tools that create immediate value and mature into agents.',
        accent: '#FC8900',
        cardTint: 'from-[#fff0df] via-[#fff8f1] to-white',
        indexes: [2, 5]
      }
    ].map((section) => ({
      ...section,
      items: section.indexes
        .map((index) => {
          const item = slide.content?.[index];
          if (!item) return null;
          return {
            ...item,
            ...parseHeroHeading(item.heading || '')
          };
        })
        .filter(Boolean)
    }))
    : [];
  const isTritonAIEvolutionSlide = slide.title === 'From TritonGPT to TritonAI';
  const tritonAICapabilityItems = isTritonAIEvolutionSlide ? (slide.content?.slice(1) || []) : [];
  const tritonAICapabilityBadgeLabels = {
    'Agent Builder': 'Build Agents',
    'Agent Skills Library': 'Reusable Skills',
    'MCP Server Hub': 'Secure Connectors',
    'Developer APIs': 'API Access',
    'Agent Oberservability': 'Run Insights',
    'Pre-Packaged Tools Pipeline': 'Ready Tools'
  };
  const tritonAIConnectorPositions = (() => {
    const cardCount = tritonAICapabilityItems.length;
    if (cardCount <= 1) return [50];
    return Array.from({ length: cardCount }, (_, idx) => 10 + (idx * (80 / (cardCount - 1))));
  })();
  const tritonAICapabilityGridClass = tritonAICapabilityItems.length > 5 ? 'lg:grid-cols-6' : 'lg:grid-cols-5';

  if (isTitleHero) {
    // Determine if this is a closing slide (has QR code/image) vs opening slide
    const isClosingSlide = slide.presenterImage || slide.qrCodeUrl || slide.linkUrl;
    const hasPresenterInfo = slide.presenterName || slide.presenterTitle;

    return (
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#182B49] via-[#0f1f33] to-[#182B49] flex flex-col items-center justify-center text-white break-words">
        {/* Enhanced animated background glows */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[65vw] h-[65vw] bg-ucsd-blue rounded-full blur-[130px] mix-blend-screen opacity-30"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2], x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-10%] right-[-15%] w-[55vw] h-[55vw] bg-ucsd-gold rounded-full blur-[150px] mix-blend-screen opacity-25"
        />

        {/* Animated accent circles */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] border border-ucsd-gold/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] border border-ucsd-sky/8 rounded-full"
        />

        {/* Decorative corner accents - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="hidden sm:block absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-ucsd-gold/40 rounded-tl-3xl"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="hidden sm:block absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-ucsd-sky/40 rounded-tr-3xl"
        />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

        <div className="relative z-10 max-w-7xl w-full px-4 sm:px-8 md:px-12 flex flex-col items-center text-center">
          {/* Conference badge with enhanced animation */}
          {slide.conference && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, type: "spring", bounce: 0.3 }}
              className="mb-6 sm:mb-8 px-5 sm:px-8 py-2.5 rounded-full border-2 border-ucsd-gold/60 bg-gradient-to-r from-ucsd-gold/15 via-ucsd-gold/5 to-ucsd-gold/15 backdrop-blur-md text-ucsd-gold text-sm sm:text-base md:text-lg tracking-[0.12em] sm:tracking-[0.18em] font-bold uppercase shadow-[0_0_30px_rgba(255,205,0,0.25)] flex items-center gap-3 sm:gap-4"
            >
              <div className="w-2.5 h-0.5 bg-ucsd-gold rounded-full" />
              {slide.conference}
              <div className="w-2.5 h-0.5 bg-ucsd-gold rounded-full" />
            </motion.div>
          )}

          {/* UC San Diego branding for opening slide */}
          {!isClosingSlide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-4 sm:mb-6 relative"
            >
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.15em] uppercase text-ucsd-gold">
                UC San Diego
              </div>
              <div className="mt-2 w-24 sm:w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-ucsd-gold to-transparent rounded-full" />
            </motion.div>
          )}

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: isClosingSlide ? 0.3 : 0.5 }}
            className={clsx(
              "font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-[1.1]",
              isClosingSlide
                ? "text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 sm:mb-4"
                : "text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6"
            )}
          >
            {slide.title}
          </motion.h1>

          {/* Simple underline for opening slide title */}
          {!isClosingSlide && (
            <div className="w-32 sm:w-48 md:w-64 h-1 mb-6 sm:mb-8 bg-gradient-to-r from-ucsd-sky via-ucsd-gold to-ucsd-sky rounded-full" />
          )}

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isClosingSlide ? 0.5 : 0.65, duration: 0.5, ease: "easeOut" }}
            className={clsx(
              "font-bold tracking-wide text-center",
              isClosingSlide
                ? "text-lg sm:text-2xl md:text-3xl text-ucsd-gold mb-8 sm:mb-12"
                : "text-base sm:text-xl md:text-2xl text-white/80 mb-10 sm:mb-12 max-w-3xl leading-relaxed"
            )}
          >
            {slide.subtitle}
          </motion.h2>

          {/* Opening slide: Multi-presenter with photos */}
          {!isClosingSlide && slide.presenters && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="flex flex-row items-center gap-8 sm:gap-12 md:gap-16"
            >
              {slide.presenters.map((presenter, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3">
                  {presenter.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.95 + idx * 0.15, duration: 0.5, type: "spring", bounce: 0.3 }}
                      className="relative"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-ucsd-gold via-ucsd-sky to-ucsd-gold opacity-50 blur-sm"
                      />
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-ucsd-gold to-ucsd-sky" />
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-3 border-white/20 shadow-[0_0_30px_rgba(255,205,0,0.2)]">
                        <img
                          src={presenter.image}
                          alt={presenter.name}
                          className="w-full h-full object-cover"
                          style={{
                            objectPosition: presenter.imagePosition || 'top',
                            ...(presenter.imageScale ? { transform: `scale(${presenter.imageScale})` } : {}),
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                  <div className="flex flex-col items-center gap-0.5 px-5 py-2 rounded-lg">
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-wide">
                      {presenter.name}
                    </div>
                    {presenter.title && (
                      <div className="text-ucsd-sky text-xs sm:text-sm md:text-base font-normal tracking-wide text-center">
                        {presenter.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Opening slide: Simple single presenter info card at bottom */}
          {!isClosingSlide && !slide.presenters && hasPresenterInfo && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="flex flex-col items-center gap-1.5 px-6 sm:px-10 py-3 sm:py-4 rounded-xl border border-ucsd-gold/25 bg-gradient-to-br from-ucsd-gold/8 to-transparent backdrop-blur-sm"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-wide">
                {slide.presenterName}
              </div>
              {slide.presenterTitle && (
                <div className="text-ucsd-sky text-sm sm:text-base md:text-lg font-normal tracking-wide max-w-md text-center">
                  {slide.presenterTitle}
                </div>
              )}
            </motion.div>
          )}

          {/* Closing slide: Multi-presenter with QR */}
          {isClosingSlide && slide.presenters && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col items-center gap-8 sm:gap-10 w-full"
            >
              {/* Presenters row */}
              <div className="flex flex-row items-start justify-center gap-10 sm:gap-16 md:gap-24">
                {slide.presenters.map((presenter, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 sm:gap-4">
                    {presenter.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.15, duration: 0.6, type: "spring", bounce: 0.3 }}
                        className="relative"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-2 rounded-full bg-gradient-to-r from-ucsd-gold via-ucsd-sky to-ucsd-gold opacity-60 blur-sm"
                        />
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-ucsd-gold to-ucsd-sky" />
                        <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/20 shadow-[0_0_40px_rgba(255,205,0,0.3)]">
                          <img
                            src={presenter.image}
                            alt={presenter.name}
                            className="w-full h-full object-cover"
                            style={{
                              transform: `scale(${presenter.imageScale || 1})`,
                              objectPosition: presenter.imagePosition || 'center center'
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 + idx * 0.15, duration: 0.7 }}
                      className="flex flex-col items-center gap-0.5 text-center"
                    >
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
                        {presenter.name}
                      </div>
                      {presenter.title && (
                        <div className="text-ucsd-sky text-xs sm:text-sm md:text-base font-normal tracking-wide max-w-xs">
                          {presenter.title}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Link */}
              {slide.linkUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.7 }}
                  className="flex flex-col items-center gap-2 mt-2"
                >
                  <a
                    href={slide.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 rounded-full border-2 border-ucsd-gold/60 bg-gradient-to-r from-ucsd-gold/15 via-ucsd-gold/5 to-ucsd-gold/15 backdrop-blur-md text-ucsd-gold text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide hover:text-yellow-300 hover:border-yellow-300 transition-colors flex items-center gap-4"
                  >
                    <Globe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    {slide.linkLabel || slide.linkUrl}
                  </a>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Closing slide: Single-presenter with image and QR */}
          {isClosingSlide && !slide.presenters && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 sm:gap-12 md:gap-20 w-full"
            >
              {/* Left side: Headshot + Info */}
              <div className="flex flex-col items-center gap-4 sm:gap-5">
                {/* Circular headshot with glow effect */}
                {slide.presenterImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.6, type: "spring", bounce: 0.3 }}
                    className="relative"
                  >
                    {/* Outer glow ring */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-r from-ucsd-gold via-ucsd-sky to-ucsd-gold opacity-60 blur-sm"
                    />
                    {/* Inner border ring */}
                    <div className="absolute -inset-1 sm:-inset-2 rounded-full bg-gradient-to-br from-ucsd-gold to-ucsd-sky" />
                    {/* Image container */}
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-[0_0_40px_rgba(255,205,0,0.3)]">
                      <img
                        src={slide.presenterImage}
                        alt={slide.presenterName || "Presenter"}
                        className="w-full h-full object-cover object-top scale-150"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Presenter info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
                    {slide.presenterName || "UC SAN DIEGO"}
                  </div>
                  {slide.presenterTitle && (
                    <div className="text-ucsd-sky text-xs sm:text-sm md:text-base font-normal tracking-wide max-w-xs">
                      {slide.presenterTitle}
                    </div>
                  )}
                  {slide.presenterWebsite && (
                    <a
                      href={`https://${slide.presenterWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ucsd-gold text-sm sm:text-base font-medium tracking-wide mt-2 hover:text-yellow-300 transition-colors flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      {slide.presenterWebsite}
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Vertical divider - hidden on mobile */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-ucsd-gold/50 to-transparent mt-16"
              />

              {/* Right side: QR Code */}
              {slide.qrCodeUrl && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.7 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-[0_0_50px_rgba(255,205,0,0.25)]">
                    <QRCodeSVG
                      value={slide.qrCodeUrl}
                      size={288}
                      bgColor="#ffffff"
                      fgColor="#182B49"
                      level="M"
                      className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                      Learn More
                    </div>
                    <div className="text-ucsd-sky/80 text-xs sm:text-sm md:text-base font-normal">
                      brettcpollak.com/tritongpt
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
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
          "font-bold mb-4 sm:mb-6",
          isTitle ? "text-2xl sm:text-4xl md:text-6xl" : "text-xl sm:text-3xl md:text-5xl",
          (!isEcosystem && !isPlatformArchitecture && !isPlatformLayers && !isPlatformSimple && !isSolution && !isSolutionVideo && !isCaseStudyHero && !isAssistantCategories && !isKeyTakeaways && !isAgentDevStrategy && !isRoadmap && !isProblemStatement && !isContractReviewChallenge && !isFeatureGrid && !isComparisonTable && !isCompoundArchitecture && !isTimelineEvolution && !isCampusMetrics && !isApiGateway && !isHostingPipeline && !isIntakeFunnel && !isInnovationFlywheel && !isFlywheelCaseStudy && !isOriginStory) && "border-b-4 border-ucsd-gold pb-3 inline-block self-start",
          (isSolution || isSolutionVideo || isCaseStudyHero || isAssistantCategories || isKeyTakeaways || isAgentDevStrategy || isRoadmap || isProblemStatement || isContractReviewChallenge || isPlatformArchitecture || isPlatformLayers || isPlatformSimple || isComparisonTable || isCompoundArchitecture || isTimelineEvolution || isCampusMetrics) && "text-center w-full",
          (isEcosystem || isPlatformArchitecture || isPlatformLayers || isPlatformSimple || isCompoundArchitecture || isApiGateway || isHostingPipeline || isIntakeFunnel || isInnovationFlywheel || isFlywheelCaseStudy || isOriginStory) && "hidden",
          isAgentWorkflow && "text-center text-3xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 w-full",
          isCaseStudyHero && "text-3xl md:text-4xl mb-2 sm:mb-3 leading-tight",
          isRoadmap && "mb-2 sm:mb-3 leading-tight",
          isTeamGrid && "mb-2 sm:mb-3",
          isProblemStatement && "text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-4 font-black",
          isContractReviewChallenge && "text-2xl sm:text-4xl md:text-5xl mb-1 sm:mb-1.5 font-black",
          isAgentDevStrategy && "text-2xl sm:text-4xl md:text-5xl mb-1 sm:mb-2",
          (isVeryDense || useThreeColumns) && !isTitle && "text-2xl md:text-3xl mb-4",
          isGraphicHeavy && "text-2xl md:text-4xl",
          isFeatureGrid && "w-full text-center border-b-0 border-none mb-4 sm:mb-12",
          isSolutionVideo && "mb-0.5 sm:mb-1 leading-tight",
          isTritonAIEvolutionSlide && "text-lg sm:text-2xl md:text-4xl mb-1 sm:mb-2 leading-tight",
          isHeroList && "mb-0 sm:mb-1",
          isTimelineEvolution && "mb-0.5 sm:mb-1 leading-none",
          isDark ? "text-white" : "text-ucsd-navy"
        )}
      >
        {slide.title}
      </motion.h1>

      {slide.subtitle && !isCaseStudyHero && !isCompoundArchitecture && !isAnalyticsChart && !isTimelineEvolution && !isTritonAIEvolutionSlide && !isApiGateway && !isHostingPipeline && !isIntakeFunnel && !isInnovationFlywheel && !isFlywheelCaseStudy && !isOriginStory && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={clsx(
            "text-base sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2 mb-3 sm:mb-6",
            (isEcosystem || isPlatformArchitecture || isPlatformLayers || isPlatformSimple || isSolution || isSolutionVideo || isAssistantCategories || isKeyTakeaways || isAgentDevStrategy || isRoadmap || isProblemStatement || isContractReviewChallenge || isComparisonTable || isAgentWorkflow || isTimelineEvolution || isCampusMetrics) && "text-center w-full mb-4 sm:mb-8",
            isSolutionVideo && "mt-0 sm:mt-0 mb-0 sm:mb-0.5",
            isHeroList && "mt-0 mb-1.5 sm:mb-2",
            isProblemStatement && "text-lg sm:text-2xl md:text-3xl mb-4 sm:mb-10 font-medium text-red-600",
            isContractReviewChallenge && "text-base sm:text-xl md:text-2xl mb-2 sm:mb-2.5 font-semibold text-ucsd-blue",
            isAgentWorkflow && "text-lg sm:text-2xl font-semibold",
            isAgentDevStrategy && "text-sm sm:text-lg md:text-xl mb-2 sm:mb-3 font-semibold text-ucsd-blue",
            isDark ? "text-ucsd-sky" : "text-ucsd-blue"
          )}
        >
          {slide.subtitle}
        </motion.h2>
      )}

      {isHeroList && (
        <div className="relative w-full max-w-[1800px] mx-auto mb-12 sm:mb-14">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#15305b] via-[#10284f] to-[#09172d] shadow-[0_24px_80px_-24px_rgba(9,23,45,0.85)] overflow-hidden">
            <div className="absolute -top-16 left-[8%] h-44 w-44 rounded-full bg-ucsd-gold/18 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-10 h-48 w-48 rounded-full bg-ucsd-sky/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-[#FC8900]/12 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="relative flex flex-col gap-1.5 sm:gap-2 p-2.5 sm:p-3 lg:p-4">
            {heroListSections.map((section, sectionIndex) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + sectionIndex * 0.1, duration: 0.45, ease: "easeOut" }}
                className="grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] items-start gap-2 sm:gap-2.5 rounded-[1.6rem] border-[2.5px] bg-white/[0.06] backdrop-blur-sm p-2.5 sm:p-3 min-h-0"
                style={{ borderColor: `${section.accent}66` }}
              >
                <div className="flex flex-col gap-2 sm:gap-2.5 border-b xl:border-b-0 xl:border-r border-white/10 pb-2.5 xl:pb-0 xl:pr-3">
                  <div>
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-white/55 mb-2">
                      Strategic Layer {sectionIndex + 1}
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-[2rem] font-black leading-none" style={{ color: section.accent }}>
                      {section.label}
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-bold text-white/85">
                      {section.descriptor}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <div className="mt-0.5 h-7 w-7 rounded-full border border-white/15 bg-white/10 flex items-center justify-center text-white/70 flex-shrink-0">
                      <ArrowRight size={15} />
                    </div>
                    <p className="text-[11px] sm:text-[13px] lg:text-sm leading-snug text-white/68 font-medium max-w-[18rem]">
                      {section.summary}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5 min-h-0">
                  {section.items.map((item, itemIndex) => {
                    const IconComponent = item.icon ? iconMap[item.icon] : null;
                    return (
                      <motion.div
                        key={`${section.label}-${item.title}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + sectionIndex * 0.12 + itemIndex * 0.06, duration: 0.4 }}
                        className={clsx(
                          "relative h-full overflow-hidden rounded-[1.35rem] border border-white/60 bg-gradient-to-br shadow-[0_18px_48px_-28px_rgba(15,35,68,0.65)]",
                          section.cardTint
                        )}
                      >
                        <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: section.accent }} />
                        <div className="h-full p-3 sm:p-3.5 lg:p-4 pl-4 sm:pl-5 flex flex-col">
                          <div className="flex items-start gap-3">
                            <div
                              className="mt-0.5 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                              style={{ backgroundColor: section.accent }}
                            >
                              {IconComponent ? <IconComponent size={20} className="sm:w-5 sm:h-5" strokeWidth={2.3} /> : <span className="text-sm font-black">{itemIndex + 1}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-lg sm:text-[1.35rem] lg:text-[1.5rem] font-black text-ucsd-navy leading-tight">
                                  {item.title}
                                </h3>
                                {item.badge && (
                                  <span
                                    className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em]"
                                    style={{ backgroundColor: `${section.accent}20`, color: section.accent }}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[12px] sm:text-[13.5px] lg:text-[15px] leading-snug text-slate-700 font-medium">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {isCaseStudyHero && (
        <div className="flex flex-col gap-2 sm:gap-4 w-full max-w-[1700px] mx-auto">
          {/* Stats Section - HERO TREATMENT - The primary focus */}
          {!!slide.stats?.length && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              {slide.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-ucsd-navy to-ucsd-blue p-4 sm:p-10 rounded-xl sm:rounded-3xl shadow-2xl text-center text-white relative overflow-hidden group hover:scale-105 transition-transform"
                >
                  <div className="absolute top-0 right-0 w-20 sm:w-40 h-20 sm:h-40 bg-ucsd-gold/10 rounded-full blur-3xl group-hover:bg-ucsd-gold/20 transition-colors" />
                  <div className="relative z-10">
                    <div className="text-xs sm:text-base font-bold text-ucsd-sky uppercase tracking-[0.1em] sm:tracking-[0.15em] mb-1 sm:mb-2.5">{stat.label}</div>
                    <div className="text-4xl sm:text-8xl font-black mb-1 sm:mb-2.5 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 drop-shadow-lg">{stat.value}</div>
                    <div className="text-xs sm:text-base font-medium text-white/80 uppercase tracking-wide">{stat.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Two-column layout for Quotes + Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-4">
            {/* Quotes Section - Supporting Evidence */}
            <div className="flex flex-col gap-2 sm:gap-3">
              {slide.quotes?.map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border-l-4 border-ucsd-gold shadow-lg relative group hover:shadow-xl transition-all"
                >
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-2xl sm:text-4xl text-ucsd-gold/15 font-serif leading-none">"</div>
                  <div className="relative z-10 pl-4 sm:pl-6">
                    <div className="text-sm sm:text-lg text-ucsd-navy font-medium mb-1 sm:mb-1.5 leading-relaxed italic">
                      {quote.text}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-ucsd-blue tracking-wide">— {quote.author}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Features - Secondary Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 gap-2 sm:gap-3"
            >
              {slide.content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-gradient-to-br from-ucsd-sky/10 to-ucsd-blue/5 p-3 sm:p-3.5 rounded-lg sm:rounded-xl border-2 border-ucsd-sky/30 hover:border-ucsd-gold transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-ucsd-gold flex-shrink-0 mt-1.5 sm:mt-2" />
                    <div className="flex-1">
                      <h3 className="font-bold text-ucsd-navy text-sm sm:text-lg mb-1">{item.heading}</h3>
                      <p className="text-slate-700 text-xs sm:text-base leading-snug sm:leading-relaxed">{item.text}</p>
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
              className="relative text-center w-full mt-1.5 sm:mt-2.5 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-[2rem] overflow-hidden shadow-[0_8px_60px_-12px_rgba(0,98,155,0.15)] border border-ucsd-sky/15"
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
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-ucsd-navy/10 rounded-full blur-[120px]" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-ucsd-sky/15 rounded-full blur-[120px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-ucsd-blue/8 rounded-full blur-[140px]" />

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
                  className="inline-flex items-center gap-2 px-4 py-1.5 mb-2 bg-white/90 rounded-full border-2 border-white shadow-lg backdrop-blur-sm"
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
                  <div className="text-xl sm:text-3xl md:text-5xl font-black text-ucsd-navy leading-tight tracking-tight">
                    {slide.subtitle}
                  </div>
                </motion.div>

                {/* Animated underline with glow */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
                  className="mx-auto mt-2 relative"
                >
                  <div className="w-36 h-1 bg-gradient-to-r from-transparent via-ucsd-navy to-transparent rounded-full" />
                  <div className="absolute inset-0 w-36 h-1 bg-gradient-to-r from-transparent via-ucsd-navy to-transparent rounded-full blur-md opacity-60" />
                </motion.div>

                {/* Subtitle tagline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="mt-1.5 text-xs md:text-sm font-semibold text-ucsd-navy tracking-wide"
                >
                  91% Faster Contract Review
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {(isSolution || isSolutionVideo) && (
        <div className="w-full max-w-[1760px] mx-auto h-full">
          <div className={clsx(
            "grid gap-4 sm:gap-8 md:gap-12 h-full pt-2 sm:pt-4",
            isSolutionVideo ? "grid-cols-1 md:grid-cols-[1.12fr_0.88fr] gap-3 sm:gap-5 md:gap-7 pt-0 sm:pt-0 items-start" : "grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-start"
          )}>
            {/* Left: Media (Image or Video) */}
            {(slide.imageSrc || slide.videoSrc) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className={clsx("flex flex-col", isSolutionVideo ? "justify-start" : "justify-start")}
              >
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-br from-ucsd-navy/5 to-ucsd-blue/5 rounded-2xl blur-sm" />
                  {slide.videoSrc ? (
                    <video
                      src={slide.videoSrc}
                      poster={slide.poster}
                      className="relative w-full h-auto max-h-[56vh] rounded-2xl shadow-lg ring-1 ring-black/5 object-contain"
                      preload="auto"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={slide.imageSrc}
                      alt={slide.title}
                      className={clsx(
                        "relative w-full h-auto rounded-2xl shadow-lg ring-1 ring-black/5",
                        isSolutionVideo && "max-h-[56vh] object-contain"
                      )}
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* Right: Stats + Features */}
            <div className={clsx("flex flex-col", isSolutionVideo ? "justify-start gap-3 sm:gap-4" : "justify-start gap-4 sm:gap-6")}>
              {/* Horizontal Stats Bar */}
              {slide.stats?.length > 0 && <div className={clsx("flex flex-wrap sm:flex-nowrap", isSolutionVideo ? "gap-1.5 sm:gap-2.5" : "gap-2 sm:gap-4")}>
                {slide.stats?.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={clsx(
                      "flex-1 min-w-[45%] sm:min-w-0 bg-white rounded-lg sm:rounded-xl shadow-md border-t-4 border-ucsd-navy text-center",
                      isSolutionVideo ? "p-2 sm:p-2.5" : "p-3 sm:p-5"
                    )}
                  >
                    <div className={clsx(
                      "font-bold text-ucsd-blue uppercase tracking-wide opacity-80 mb-0.5",
                      isSolutionVideo ? "text-[9px] sm:text-xs" : "text-[10px] sm:text-xs"
                    )}>
                      {stat.label}
                    </div>
                    <div className={clsx(
                      "font-black text-ucsd-navy leading-none mb-0.5",
                      isSolutionVideo ? "text-2xl sm:text-4xl" : "text-2xl sm:text-4xl"
                    )}>
                      {stat.value}
                    </div>
                    <div className={clsx(
                      "text-slate-600 font-bold uppercase tracking-wide",
                      isSolutionVideo ? "text-[10px] sm:text-xs" : "text-xs"
                    )}>
                      {stat.sub}
                    </div>
                  </motion.div>
                ))}
              </div>}

              {/* Feature List */}
              <div className={clsx("flex flex-col", isSolutionVideo ? "gap-2.5 sm:gap-3" : "space-y-2 sm:space-y-4")}>
                {(() => {
                const borderColors = ['#00C6D7', '#00629B', '#6E963B', '#FC8900', '#FFCD00'];
                const dotColors = ['#FFCD00', '#00C6D7', '#FC8900', '#6E963B', '#00629B'];
                return slide.content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={clsx(
                      "flex gap-3 sm:gap-4 items-start bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm border-l-4 hover:shadow-md transition-shadow",
                      isSolutionVideo ? "p-2.5 sm:p-3.5" : "p-3 sm:p-6"
                    )}
                    style={{ borderLeftColor: borderColors[index % borderColors.length] }}
                  >
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: dotColors[index % dotColors.length] }} />
                    <div className="flex-1 min-w-0">
                      <h3 className={clsx(
                        "font-bold text-ucsd-navy leading-tight mb-1",
                        isSolutionVideo ? "text-lg sm:text-[1.75rem]" : "text-base sm:text-xl"
                      )}>
                        {item.heading}
                      </h3>
                      <p className={clsx(
                        "text-slate-700 leading-snug font-medium",
                        isSolutionVideo ? "text-sm sm:text-[1.05rem]" : "text-xs sm:text-base"
                      )}>
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ));
                })()}
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
        <div className="relative w-full min-h-full flex flex-col justify-center max-w-[1900px] mx-auto px-8">
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
                SDSC Infrastructure<br />
                Onyx Framework<br />
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
        <div className="relative w-full min-h-full flex flex-col justify-center items-center max-w-[1800px] mx-auto px-12">
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
        <div className="relative w-full h-full flex items-start sm:items-center justify-center overflow-y-auto">
          <div className="w-full max-w-[1400px] py-0.5 sm:py-0 px-1 sm:px-0">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-0.5 sm:mb-5"
            >
              <div className="text-lg sm:text-4xl md:text-5xl font-black text-ucsd-navy">TritonAI Platform</div>
            </motion.div>

            {/* Big platform box containing all assistants */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative bg-gradient-to-br from-white to-ucsd-blue/5 rounded-xl sm:rounded-3xl p-2 sm:p-4 md:p-7 shadow-2xl border-2 sm:border-4 border-ucsd-navy/20 mt-4 sm:mt-5"
            >
              {/* Platform label */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 sm:-top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-ucsd-navy to-ucsd-blue text-white px-2 sm:px-7 py-1 sm:py-2.5 rounded-full shadow-xl"
              >
                <div className="flex items-center gap-1 sm:gap-3">
                  <Database size={12} className="text-ucsd-gold sm:w-6 sm:h-6" />
                  <span className="font-black text-[9px] sm:text-lg tracking-wide uppercase whitespace-nowrap">AI Assistants and Agents</span>
                </div>
              </motion.div>

              {/* Grid of assistants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-3.5 mt-1 sm:mt-0">
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
                      className="bg-white rounded-md sm:rounded-xl px-1.5 sm:px-4 py-1.5 sm:py-3 shadow-md border-l-2 sm:border-l-8 hover:shadow-lg transition-shadow cursor-pointer"
                      style={{ borderLeftColor: borderColor }}
                    >
                      <div className="flex items-center gap-1 sm:gap-4">
                        {IconComponent && (
                          <div className="flex-shrink-0">
                            <IconComponent size={14} className="text-ucsd-blue sm:w-6 sm:h-6" style={{ color: borderColor }} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] sm:text-xl font-bold text-ucsd-navy leading-none">
                            {typeof assistant === 'string' ? assistant : assistant.name}
                          </div>
                          {assistant.description && (
                            <div className="text-[9px] sm:text-base text-ucsd-navy/60 font-semibold leading-tight">
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
                className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t-2 border-ucsd-gold/30 text-center text-xs sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2 sm:gap-4 text-black"
              >
                <span className="hidden sm:inline">Hosted at San Diego Supercomputer Center</span>
                <span className="sm:hidden">Hosted at SDSC</span>
                <span className="text-ucsd-gold text-lg sm:text-xl">◆</span>
                <span>Low Cost & Open Source</span>
                <span className="text-ucsd-gold text-lg sm:text-xl">◆</span>
                <span>Model Agnostic</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {isAssistantCategories && slide.categories && (
        <div className="flex flex-col gap-1.5 sm:gap-3 w-full max-w-[1800px] mx-auto">
          <div className={clsx(
            "grid grid-cols-1 gap-1.5 sm:gap-3",
            slide.categories.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" :
              slide.categories.length === 3 ? "sm:grid-cols-2 md:grid-cols-3" : "md:grid-cols-2"
          )}>
            {slide.categories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + catIndex * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 border-t-4 sm:border-t-8"
                style={{ borderTopColor: category.color }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 text-ucsd-navy flex items-center gap-2 sm:gap-2.5">
                  <div className="w-2 h-5 sm:w-2.5 sm:h-6 rounded-full" style={{ backgroundColor: category.color }} />
                  {category.name}
                </h3>
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  {category.assistants.map((assistant, idx) => {
                    const IconComponent = assistant.icon ? iconMap[assistant.icon] : null;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + catIndex * 0.1 + idx * 0.05 }}
                        className="flex items-start gap-2 sm:gap-2.5 p-1 sm:p-1.5 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                      >
                        {IconComponent ? (
                          <div className="w-7 h-7 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: category.color }}>
                            <IconComponent size={14} className="text-white sm:w-[15px] sm:h-[15px]" />
                          </div>
                        ) : (
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: category.color }} />
                        )}
                        <div>
                          <div className="font-bold text-ucsd-navy text-sm sm:text-base md:text-lg leading-tight">{assistant.heading}</div>
                          <div className="text-xs sm:text-sm text-slate-600 font-medium leading-snug mt-0.5">{assistant.text}</div>
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
              className="mt-1.5 sm:mt-2.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 border-2 border-green-600"
            >
              <div className="text-center text-sm sm:text-lg md:text-xl font-bold text-green-900">
                {slide.saasOnboarding.text}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {isKeyTakeaways && (() => {
        const takeawayColors = ['#00629B', '#C69214', '#00C6D7', '#6E963B', '#FC8900', '#182B49'];
        return (
          <div className="flex flex-col gap-3 sm:gap-6 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {slide.content.map((item, index) => {
                const IconComponent = item.icon ? iconMap[item.icon] : null;
                const borderColor = takeawayColors[index % takeawayColors.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.2, type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center text-center gap-2 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-3xl shadow-xl border-b-4 sm:border-b-8 hover:-translate-y-2 transition-transform"
                    style={{ borderBottomColor: borderColor }}
                  >
                    {IconComponent && (
                      <motion.div
                        animate={floatAnimation}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{ backgroundColor: borderColor }}
                      >
                        <IconComponent size={24} className="sm:w-8 sm:h-8" />
                      </motion.div>
                    )}
                    <div className="text-base sm:text-xl font-bold text-ucsd-navy">{item.heading}</div>
                    <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">{item.text}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {isAgentDevStrategy && (() => {
        const platforms = slide.platforms || [];
        const models = slide.models || [];
        const routingFactors = slide.routingFactors || [];
        const codexStrengths = slide.codex?.strengths || [];
        const claudeStrengths = slide.claude?.strengths || [];

        return (
          <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-2 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-ucsd-navy/10 bg-gradient-to-r from-[#e9f1ff] via-[#f4f8ff] to-[#f8fbff] shadow-lg p-3 sm:p-4"
            >
              <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#00629b]/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[#00c6d7]/15 blur-2xl pointer-events-none" />
              <div className="relative grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-3 sm:gap-4">
                <div className="rounded-lg sm:rounded-xl bg-white/85 backdrop-blur-sm border border-white/80 p-3 sm:p-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-ucsd-navy text-white px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] mb-2">
                    <Wallet size={13} />
                    {slide.recharge?.title || "Recharge Service"}
                  </div>
                  <div className="text-xs sm:text-base font-semibold text-ucsd-navy leading-snug sm:leading-relaxed">
                    {slide.recharge?.text}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="rounded-lg sm:rounded-xl bg-white/85 border border-white/80 p-2.5 sm:p-3">
                    <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em] text-ucsd-navy/70 mb-2">
                      Institutional Cloud Agreements
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {platforms.map((platform, index) => (
                        <div key={index} className="px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-bold uppercase tracking-wide bg-white text-ucsd-navy border-ucsd-navy/20">
                          {platform}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg sm:rounded-xl bg-white/85 border border-white/80 p-2.5 sm:p-3">
                    <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em] text-ucsd-navy/70 mb-2">
                      Supported Engineering Interfaces
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
                      {models.filter(m => m.primary).map((model, index) => {
                        const IconComponent = model.icon ? iconMap[model.icon] : Cpu;
                        return (
                          <div key={index} className="inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1 bg-ucsd-navy text-white border-ucsd-navy text-[10px] sm:text-xs font-bold shadow-sm">
                            <IconComponent size={12} />
                            <span>{model.name}</span>
                          </div>
                        );
                      })}
                      {models.filter(m => !m.primary).map((model, index) => {
                        const IconComponent = model.icon ? iconMap[model.icon] : Cpu;
                        return (
                          <div key={index} className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 bg-white text-ucsd-navy/70 border-ucsd-navy/15 text-[10px] sm:text-xs font-medium">
                            <IconComponent size={12} />
                            <span>{model.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)] gap-2 sm:gap-4 items-center">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#10A37F]/45 bg-gradient-to-br from-[#e8fbf4] via-[#f7fffb] to-white shadow-xl p-3 sm:p-4"
              >
                <div className="absolute -right-10 -top-8 h-24 w-24 rounded-full bg-[#10A37F]/15 blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#10A37F]/15 text-[#0f7a5f] px-2.5 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.16em]">
                    <CheckCircle size={13} />
                    {slide.codex?.brand || "OpenAI"}
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#10A37F] text-white text-xs font-black flex items-center justify-center shadow-md">CX</div>
                </div>
                <div className="text-lg sm:text-2xl font-black text-[#0b5a47] leading-tight">{slide.codex?.title}</div>
                <div className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#0f7a5f]/80">{slide.codex?.tag}</div>
                <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                  {codexStrengths.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div className="hidden xl:flex flex-col items-center justify-center gap-1 text-ucsd-navy/70 text-center">
                <div className="text-[10px] font-black uppercase tracking-[0.16em]">Task Router</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ucsd-blue to-ucsd-navy text-white flex items-center justify-center shadow-lg">
                  <ArrowRightLeft size={18} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-center">Choose by work pattern</div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#D97757]/45 bg-gradient-to-br from-[#fff2eb] via-[#fff9f5] to-white shadow-xl p-3 sm:p-4"
              >
                <div className="absolute -left-10 -top-8 h-24 w-24 rounded-full bg-[#D97757]/15 blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#D97757]/15 text-[#b65a3e] px-2.5 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.16em]">
                    <Brain size={13} />
                    {slide.claude?.brand || "Anthropic"}
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D97757] text-white text-xs font-black flex items-center justify-center shadow-md">CL</div>
                </div>
                <div className="text-lg sm:text-2xl font-black text-[#95452f] leading-tight">{slide.claude?.title}</div>
                <div className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#b65a3e]/80">{slide.claude?.tag}</div>
                <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                  {claudeStrengths.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
              {routingFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08 }}
                  className="rounded-lg sm:rounded-xl bg-white/95 border border-ucsd-navy/10 shadow-md p-2.5 sm:p-3"
                >
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] text-ucsd-navy mb-2">
                    {factor.factor}
                  </div>
                  <div className="space-y-1.5">
                    <div className="rounded-md border border-[#10A37F]/25 bg-[#e8fbf4] p-2">
                      <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.12em] text-[#0f7a5f] mb-0.5">Codex Fit</div>
                      <div className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-snug">{factor.codex}</div>
                    </div>
                    <div className="rounded-md border border-[#D97757]/25 bg-[#fff2eb] p-2">
                      <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.12em] text-[#b65a3e] mb-0.5">Claude Fit</div>
                      <div className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-snug">{factor.claude}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })()}

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

      {isTimelineEvolution && (() => {
        return (
          <div className="w-full max-w-none mx-auto flex flex-col gap-0.5 sm:gap-1 px-0.5 sm:px-1 pb-12 sm:pb-14">
            {slide.milestones?.map((row, rowIndex) => (
              <div key={rowIndex} className="flex-none flex flex-col min-h-0 bg-white/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-white/60 shadow-sm relative">
                {/* Year label for row */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * rowIndex }}
                    className="text-lg sm:text-2xl lg:text-3xl font-black text-ucsd-gold drop-shadow-sm whitespace-nowrap leading-none"
                  >
                    {row.rowLabel}
                  </motion.div>
                  <div className="text-[10px] sm:text-xs lg:text-sm font-bold text-ucsd-navy/80 uppercase tracking-widest bg-white/60 px-2 sm:px-3 py-0.5 rounded-full whitespace-nowrap border border-white/50 leading-none">
                    {row.rowTitle}
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-ucsd-gold/40 via-ucsd-sky/30 to-transparent rounded-full hidden sm:block" />
                </div>

                {/* Timeline track */}
                <div className="relative min-h-0">
                  <div className="absolute top-1.5 sm:top-2 left-0 right-0 h-1 bg-gradient-to-r from-ucsd-gold/30 via-ucsd-sky/30 to-ucsd-gold/30 rounded-full hidden sm:block" />

                  {/* Milestones / Quarters */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch gap-0.5 sm:gap-1">
                    {row.quarters?.map((quarterData, qIndex) => {
                      const colors = ['#00629B', '#6E963B', '#00C6D7', '#FC8900', '#E879A0', '#FFCD00'];
                      const colorIndex = (rowIndex * 4) + qIndex;
                      const color = colors[colorIndex % colors.length];

                      return (
                        <motion.div
                          key={qIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + (rowIndex * 0.1) + (qIndex * 0.05), type: "spring", stiffness: 120 }}
                          className="flex flex-col items-center sm:items-stretch w-full sm:flex-1 sm:w-1/4 self-stretch"
                        >
                          {/* Connector dot */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + (rowIndex * 0.1) + (qIndex * 0.05), type: "spring", stiffness: 200 }}
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full border-2 border-white shadow-md z-10 mb-0.5"
                            style={{ backgroundColor: color }}
                          />

                          {/* Card */}
                          <div className="w-full flex-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col">
                            {/* Header bar */}
                            <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 flex justify-between items-center" style={{ backgroundColor: color }}>
                              <div className="text-[9px] sm:text-[11px] lg:text-xs font-extrabold uppercase tracking-widest text-white/95 truncate">
                                {quarterData.phase}
                              </div>
                              <div className="text-[9px] lg:text-[10px] font-bold bg-white/20 text-white px-1 leading-tight rounded">
                                {quarterData.quarter}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-1.5 sm:p-2 lg:p-2 flex flex-col justify-start min-h-0">
                              <div className="min-h-[1.55rem] sm:min-h-[1.9rem] lg:min-h-[2rem]">
                                <h3 className="text-sm sm:text-[15px] lg:text-[17px] font-bold text-ucsd-navy leading-tight">
                                  {quarterData.title}
                                </h3>
                              </div>
                              <ul className="mt-0.5 flex flex-col gap-0.5 sm:gap-0.5">
                                {quarterData.items?.map((item, itemIndex) => (
                                  <li key={itemIndex} className="flex items-start gap-1 sm:gap-1.5 text-[11px] sm:text-[12.5px] lg:text-[13px] font-medium text-slate-700 leading-snug">
                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: color }} />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })()}

      {isContractReviewChallenge && (() => {
        const challenges = slide.content || [];
        const challengeTheme = {
          accent: '#00629B',
          light: '#F3F8FF',
          border: '#C7DDF5',
          text: '#1F3659'
        };
        const challengeIcons = [Calendar, Shield, TrendingUp, Users];
        const challengeSignals = ['Delay', 'Variance', 'Backlog', 'Bottleneck'];
        const challengeSignalStyles = [
          { bg: '#FEF3C7', text: '#92400E' }, // Delay
          { bg: '#CFFAFE', text: '#0E7490' }, // Variance
          { bg: '#E0E7FF', text: '#3730A3' }, // Backlog
          { bg: '#D1FAE5', text: '#065F46' }  // Bottleneck
        ];

        return (
          <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-2 sm:gap-2.5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#C7DDF5] bg-gradient-to-r from-[#eef5ff] via-[#f5f9ff] to-[#f8fbff] shadow-lg p-3 sm:p-4"
            >
              <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#00629B]/10 blur-2xl pointer-events-none" />
              <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-[#00C6D7]/10 blur-2xl pointer-events-none" />
              <div className="relative grid grid-cols-1 gap-2 sm:gap-3">
                <div className="rounded-lg sm:rounded-xl bg-white/90 border border-white p-3 sm:p-3.5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-ucsd-blue text-white px-3 py-1 text-sm sm:text-base font-bold uppercase tracking-[0.16em] mb-2.5">
                    <FileText size={15} />
                    Contract Operations Today
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-slate-700 leading-snug sm:leading-relaxed mb-2.5">
                    Review work is manual, policy-intensive, and concentrated in a small expert pool. As volume grows, delays and risk variability compound across campus operations.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {['Intake', 'Manual Review', 'Risk Check', 'Redline', 'Approval'].map((step, index) => (
                      <React.Fragment key={step}>
                        <div className="rounded-full px-2.5 py-1 border border-[#C7DDF5] bg-white text-xs sm:text-sm font-bold text-ucsd-navy uppercase tracking-wide">
                          {step}
                        </div>
                        {index < 4 && <ArrowRight size={16} className="text-ucsd-blue/60" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="rounded-xl sm:rounded-2xl bg-white border border-[#C7DDF5] shadow-lg p-3 sm:p-4"
            >
              <div className="text-xs sm:text-sm font-black uppercase tracking-[0.16em] text-ucsd-blue mb-2.5">
                Where The Workflow Breaks
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3">
                {challenges.map((item, index) => {
                  const IconComponent = challengeIcons[index % challengeIcons.length];
                  const signalStyle = challengeSignalStyles[index % challengeSignalStyles.length];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.08 }}
                      className="relative rounded-lg sm:rounded-xl border p-3 sm:p-3.5"
                      style={{ borderLeftWidth: '5px', borderLeftColor: challengeTheme.accent, borderColor: challengeTheme.border, backgroundColor: challengeTheme.light }}
                    >
                      <div
                        className="absolute top-2.5 right-2.5 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.12em]"
                        style={{ backgroundColor: signalStyle.bg, color: signalStyle.text }}
                      >
                        {challengeSignals[index] || 'Issue'}
                      </div>
                      <div className="flex items-start gap-3 sm:gap-3.5">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0" style={{ backgroundColor: challengeTheme.accent }}>
                          <IconComponent size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] mb-2"
                            style={{ backgroundColor: challengeTheme.border, color: challengeTheme.text }}
                          >
                            <span>{item.stat}</span>
                            <span style={{ color: challengeTheme.accent }}>|</span>
                            <span>{item.statLabel}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-black text-ucsd-navy leading-tight mb-1.5">{item.heading}</h3>
                          <p className="text-sm sm:text-base text-slate-700 font-medium leading-snug sm:leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-2.5 sm:mt-3 rounded-lg sm:rounded-xl border border-[#C7DDF5] bg-[#f4f9ff] p-3 sm:p-3.5">
                <div className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-ucsd-blue mb-1.5">Design Implication</div>
                <p className="text-sm sm:text-base font-semibold text-slate-700 leading-snug sm:leading-relaxed">
                  Scale requires policy-grounded automation that standardizes risk assessment, accelerates redlining, and frees senior attorneys for strategic work.
                </p>
              </div>
            </motion.div>
          </div>
        );
      })()}

      {isProblemStatement && (
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4 sm:gap-y-8">
            {slide.content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2, type: "spring", stiffness: 80 }}
                className="relative group h-full"
              >
                {/* Large number background - hidden on mobile */}
                <div className="hidden sm:block absolute -left-6 -top-4 text-[140px] font-black text-red-500/5 leading-none pointer-events-none z-0">
                  {index + 1}
                </div>

                {/* Content card */}
                <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-7 shadow-2xl border-l-4 sm:border-l-8 border-red-500 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  {/* Stat badge */}
                  <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg w-fit">
                    <div className="text-xl sm:text-3xl font-black text-white">{item.stat}</div>
                    <div className="h-4 sm:h-6 w-px bg-white/30" />
                    <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest">{item.statLabel}</div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-4xl font-black text-ucsd-navy mb-2 sm:mb-4 leading-tight">
                    {item.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-xl text-slate-700 leading-relaxed font-medium flex-1">
                    {item.text}
                  </p>

                  {/* Decorative accent */}
                  <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tl from-red-500/10 to-transparent rounded-tl-full pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {isFeatureGrid && (
        <div className={clsx('w-full mx-auto', isTritonAIEvolutionSlide ? 'max-w-[1700px]' : 'max-w-[1600px]')}>
          {isTritonAIEvolutionSlide && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative mb-1 sm:mb-2 lg:mb-2.5 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3e6cbe]/40 bg-gradient-to-r from-[#d9e8ff] via-[#c6dcff] to-[#b2d1ff] shadow-xl"
              >
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#184aa3]/10 blur-2xl pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-[#00a6b6]/10 blur-2xl pointer-events-none" />
                <div className="relative p-2.5 sm:p-4 lg:p-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#184aa3] mb-1.5 sm:mb-2">
                    <Layers size={14} className="sm:w-4 sm:h-4" />
                    Overarching Platform Layer
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-1.5 sm:gap-2.5">
                    <div>
                      <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-ucsd-navy tracking-tight leading-tight">
                        {slide.content[0].heading}
                      </h3>
                      <p className="mt-1 sm:mt-1.5 text-xs sm:text-base lg:text-lg text-slate-800 font-semibold max-w-6xl leading-snug sm:leading-relaxed">
                        {slide.content[0].text}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-[#184aa3] font-extrabold uppercase tracking-[0.14em] text-[10px] lg:text-xs whitespace-nowrap">
                      Powers every capability <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mb-0.5 sm:mb-1.5 lg:mb-0">
                {/* Mobile/tablet connector */}
                <div className="flex justify-center lg:hidden">
                  <div className="flex flex-col items-center text-[#184aa3]">
                    <ArrowDown size={20} className="sm:w-6 sm:h-6" />
                    <div className="mt-1 h-5 sm:h-7 w-1 rounded-full bg-gradient-to-b from-[#184aa3] via-[#00a6b6]/80 to-[#184aa3]/10" />
                  </div>
                </div>

                {/* Desktop branching connector from Hub to all capability cards */}
                <div className="hidden lg:block relative h-9">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-1 rounded-full bg-gradient-to-b from-[#184aa3] to-[#00a6b6]" />
                  <div className="absolute left-[10%] right-[10%] top-3 h-1 rounded-full bg-gradient-to-r from-[#184aa3]/90 via-[#00a6b6]/90 to-[#184aa3]/90 shadow-[0_0_10px_rgba(24,74,163,0.35)]" />
                  {tritonAIConnectorPositions.map((position, idx) => (
                    <div key={idx} className="absolute top-3 -translate-x-1/2" style={{ left: `${position}%` }}>
                      <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#184aa3] shadow-sm" />
                      <div className="mx-auto h-5 w-0.5 bg-gradient-to-b from-[#184aa3]/90 to-[#184aa3]/20" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className={clsx('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3', isTritonAIEvolutionSlide && tritonAICapabilityGridClass)}>
            {(isTritonAIEvolutionSlide ? tritonAICapabilityItems : slide.content).map((item, index) => {
              const displayIndex = isTritonAIEvolutionSlide ? index + 1 : index;
              const topBarColors = ['#182B49', '#00C6D7', '#00629B', '#FFCD00', '#FC8900', '#6E963B'];
              const topBarColor = topBarColors[displayIndex % topBarColors.length];
              const evolutionCardStyles = [
                {
                  cardClass: 'bg-gradient-to-br from-[#f9fbff] to-[#eef4ff] border-[#7aa7ff]',
                  iconBadgeClass: 'bg-[#e9f1ff] text-[#184aa3]',
                },
                {
                  cardClass: 'bg-gradient-to-br from-[#f5feff] to-[#e7fbff] border-[#55d2df]',
                  iconBadgeClass: 'bg-[#dcfbff] text-[#0e6f7a]',
                },
                {
                  cardClass: 'bg-gradient-to-br from-[#f5f9ff] to-[#e9f2ff] border-[#6f95d3]',
                  iconBadgeClass: 'bg-[#e3edff] text-[#1f4f92]',
                },
                {
                  cardClass: 'bg-gradient-to-br from-[#fffdf5] to-[#fff5cf] border-[#ffd85c]',
                  iconBadgeClass: 'bg-[#ffefb2] text-[#815f00]',
                },
                {
                  cardClass: 'bg-gradient-to-br from-[#fff8f3] to-[#ffe9d9] border-[#ffb67a]',
                  iconBadgeClass: 'bg-[#ffe2cb] text-[#9f4d0d]',
                },
                {
                  cardClass: 'bg-gradient-to-br from-[#f7fcf2] to-[#ebf8df] border-[#9ac77d]',
                  iconBadgeClass: 'bg-[#def2cc] text-[#3f6c1f]',
                }
              ];
              const evolutionStyle = evolutionCardStyles[displayIndex % evolutionCardStyles.length];

              // Contextual icons based on heading content
              const getContextIcon = (heading) => {
                const h = heading.toLowerCase();
                if (h.includes('user') || h.includes('serves') || h.includes('73,000')) return Users;
                if (h.includes('secure') || h.includes('hosting') || h.includes('on-prem')) return Server;
                if (h.includes('open-source') || h.includes('foundation')) return Layers;
                if (h.includes('cost') || h.includes('token') || h.includes('zero')) return Wallet;
                if (h.includes('award') || h.includes('innovation') || h.includes('winning')) return Award;
                if (h.includes('federat') || h.includes('scalab') || h.includes('power')) return Share2;
                if (h.includes('shield') || h.includes('protect')) return Shield;
                if (h.includes('code') || h.includes('develop')) return Code;
                return Target; // default
              };

              const IconComponent = item.icon ? iconMap[item.icon] : getContextIcon(item.heading);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
                  className={clsx(
                    'relative flex flex-col rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden border',
                    isTritonAIEvolutionSlide ? evolutionStyle.cardClass : 'bg-white border-transparent'
                  )}
                >
                  {/* Colored top bar */}
                  <div className="h-1.5 sm:h-2 w-full" style={{ backgroundColor: topBarColor }} />

                  {/* Content */}
                  <div className="p-2.5 sm:p-3.5 lg:p-4">
                    {isTritonAIEvolutionSlide && (
                      <div className="mb-1.5 sm:mb-2 inline-flex items-center gap-2">
                        <div className={clsx('rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase', evolutionStyle.iconBadgeClass)}>
                          {tritonAICapabilityBadgeLabels[item.heading] || 'Core Capability'}
                        </div>
                      </div>
                    )}
                    {/* Icon watermark */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 pointer-events-none select-none" style={{ color: topBarColor, opacity: 0.15 }}>
                      <IconComponent size={34} strokeWidth={1.5} className="sm:w-12 sm:h-12 md:w-14 md:h-14" />
                    </div>

                    {/* Heading */}
                    <h3 className="text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-1.5 text-ucsd-navy tracking-tight leading-tight pr-8 sm:pr-14">
                      {item.heading}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-slate-800 font-medium leading-snug sm:leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {isComparisonTable && (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-2 sm:gap-3">
          {/* Header - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:grid grid-cols-[0.8fr_2.1fr_2.1fr] gap-6 px-7 mb-1.5">
            <div className="text-ucsd-navy font-bold text-sm uppercase tracking-[0.15em] opacity-40 self-end pb-1.5">Feature</div>
            <div className="text-slate-400 font-bold text-2xl flex items-center gap-2 opacity-80">
              Gen AI <span className="text-sm font-medium opacity-60 bg-slate-100 px-2 py-0.5 rounded">2025</span>
            </div>
            <div className="text-ucsd-blue font-black text-2xl flex items-center gap-2">
              Agentic AI <span className="text-sm font-bold text-white bg-ucsd-blue px-2 py-0.5 rounded shadow-sm">2026</span>
            </div>
          </div>

          {/* Rows - Card layout on mobile, grid on larger screens */}
          {slide.tableData.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="flex flex-col md:grid md:grid-cols-[0.8fr_2.1fr_2.1fr] gap-2 sm:gap-4 md:gap-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-ucsd-blue/20 transition-all md:items-center group relative overflow-hidden"
            >
              {/* Agentic Background Highlight - Only on desktop */}
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[44%] bg-ucsd-blue/[0.04] pointer-events-none group-hover:bg-ucsd-blue/[0.07] transition-colors duration-300" />

              {/* Feature Name */}
              <div className="font-bold text-ucsd-navy text-base sm:text-lg relative z-10 tracking-tight leading-tight md:pr-6 md:border-r-2 md:border-slate-200 md:h-full flex items-center pb-2 md:pb-0 border-b md:border-b-0 border-slate-200">
                {row.feature}
              </div>

              {/* Gen AI - with label on mobile */}
              <div className="text-slate-600 font-semibold text-sm sm:text-xl leading-relaxed relative z-10 md:pr-6 md:border-r-2 md:border-slate-200 md:h-full flex items-center">
                <span className="md:hidden text-xs text-slate-400 font-bold uppercase mr-2">2025:</span>
                {row.genAI}
              </div>

              {/* Agentic AI - with label on mobile */}
              <div className="text-ucsd-navy font-bold text-sm sm:text-xl leading-relaxed relative z-10 flex items-start gap-2 sm:gap-4 bg-ucsd-blue/5 md:bg-transparent p-2 md:p-0 rounded-lg">
                <span className="md:hidden text-xs text-ucsd-blue font-bold uppercase mr-1">2026:</span>
                <div className="mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-ucsd-gold flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[14px] sm:h-[14px]"><polyline points="20 6 9 17 4 12"></polyline></svg>
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
        <div className="relative w-full min-h-full flex flex-col items-center justify-start sm:justify-center px-3 sm:px-6 py-2 sm:py-3 max-w-[1800px] mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-3 sm:mb-6"
          >
            <div className="text-2xl sm:text-4xl md:text-5xl font-black text-ucsd-navy leading-none">{slide.title}</div>
            <div className="text-sm sm:text-xl text-ucsd-blue font-bold mt-1">{slide.subtitle}</div>
          </motion.div>

          {/* Architecture Flow Diagram */}
          <div className="relative w-full flex flex-col gap-2">
            {/* Layer 1: Orchestration - Stack on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative flex flex-col md:flex-row items-stretch md:items-start justify-between gap-2 md:gap-4"
            >
              <div
                className="flex-1 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border-l-4 sm:border-l-6 relative overflow-hidden h-full"
                style={{ borderLeftColor: slide.architectureLayers[0].color }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 0px ${slide.architectureLayers[0].color}40`,
                      `0 0 20px ${slide.architectureLayers[0].color}60`,
                      `0 0 0px ${slide.architectureLayers[0].color}40`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  style={{ backgroundColor: `${slide.architectureLayers[0].color}20` }}
                />
                <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[0].color}20` }}>
                  <Cpu size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color: slide.architectureLayers[0].color }} />
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <div className="text-base sm:text-2xl font-black text-ucsd-navy uppercase tracking-wide leading-none mb-1">{slide.architectureLayers[0].name}</div>
                    <div className="text-xs sm:text-base font-bold text-ucsd-blue mb-1">{slide.architectureLayers[0].description}</div>
                    <div className="text-sm sm:text-xl text-ucsd-navy/70 leading-tight">{slide.architectureLayers[0].details}</div>
                  </div>
                </div>
              </div>

              {/* Animated Arrow to Multi-Agent - Hidden on mobile, vertical arrow shown instead */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="hidden md:flex items-center relative"
              >
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-3 h-3 rounded-full bg-ucsd-blue"
                  style={{ left: '-6px' }}
                />
                <ArrowRight size={32} className="text-ucsd-blue" strokeWidth={3} />
              </motion.div>

              {/* Mobile Arrow Down */}
              <div className="md:hidden flex justify-center py-1">
                <ArrowDown size={20} className="text-ucsd-blue" strokeWidth={3} />
              </div>

              {/* Layer 5 (Multi-Agent) - Positioned on right, below on mobile */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex-1 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border-l-4 sm:border-l-6 h-full relative overflow-hidden"
                style={{ borderLeftColor: slide.architectureLayers[4].color }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 0px ${slide.architectureLayers[4].color}40`,
                      `0 0 20px ${slide.architectureLayers[4].color}60`,
                      `0 0 0px ${slide.architectureLayers[4].color}40`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                  className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  style={{ backgroundColor: `${slide.architectureLayers[4].color}20` }}
                />
                <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[4].color}20` }}>
                  <Network size={12} className="sm:w-4 sm:h-4" style={{ color: slide.architectureLayers[4].color }} />
                </div>
                <div className="flex items-start gap-2 mb-1">
                  <div className="flex-1">
                    <div className="text-base sm:text-xl font-black text-ucsd-navy uppercase leading-none mb-1">{slide.architectureLayers[4].name}</div>
                    <div className="text-xs sm:text-base font-bold text-ucsd-blue">{slide.architectureLayers[4].description}</div>
                  </div>
                </div>
                <div className="text-sm sm:text-lg text-ucsd-navy/70 mb-1 sm:mb-1.5 leading-tight">{slide.architectureLayers[4].details}</div>
                <div className="space-y-1">
                  {slide.architectureLayers[4].structures.map((struct, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-md p-1 sm:p-1.5 border border-gray-200">
                      <div className="text-xs sm:text-base font-bold text-ucsd-navy leading-none">{struct.type}</div>
                      <div className="text-xs sm:text-base text-ucsd-navy/60 leading-tight mt-0.5">{struct.description}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Center Arrow Down with flowing animation */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center -my-1 sm:-my-2 relative"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
                className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-ucsd-navy"
                style={{ top: '-6px' }}
              />
              <ArrowDown size={20} className="text-ucsd-navy sm:w-7 sm:h-7" strokeWidth={3} />
            </motion.div>

            {/* Layer 2: MCP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border-l-4 sm:border-l-6 relative overflow-hidden"
              style={{ borderLeftColor: slide.architectureLayers[1].color }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 0px ${slide.architectureLayers[1].color}40`,
                    `0 0 20px ${slide.architectureLayers[1].color}60`,
                    `0 0 0px ${slide.architectureLayers[1].color}40`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }}
                className="absolute inset-0 rounded-xl pointer-events-none"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }}
                className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                style={{ backgroundColor: `${slide.architectureLayers[1].color}20` }}
              />
              <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[1].color}20` }}>
                <GitBranch size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color: slide.architectureLayers[1].color }} />
              </div>
              <div className="flex items-start gap-2 mb-1 sm:mb-2">
                <div className="flex-1">
                  <div className="text-base sm:text-2xl font-black text-ucsd-navy uppercase tracking-wide leading-none mb-1">{slide.architectureLayers[1].name}</div>
                  <div className="text-xs sm:text-base font-bold text-ucsd-blue">{slide.architectureLayers[1].description}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {slide.architectureLayers[1].details.map((detail, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-md p-1.5 sm:p-2 border border-gray-200">
                    <div className="text-xs sm:text-base font-black text-ucsd-navy leading-none mb-0.5 sm:mb-1">{detail.label}:</div>
                    <div className="text-xs sm:text-lg text-ucsd-navy/70 leading-tight">{detail.text}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Center Arrow Down with flowing animation */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center -my-1 sm:-my-2 relative"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }}
                className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-ucsd-navy"
                style={{ top: '-6px' }}
              />
              <ArrowDown size={20} className="text-ucsd-navy sm:w-7 sm:h-7" strokeWidth={3} />
            </motion.div>

            {/* Layers 3 & 4: Application and Data side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 relative">
              {/* Curved flow lines from layers 3 & 4 back to layer 2 - hidden on mobile */}
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 2 }}
                className="hidden sm:block absolute -top-12 left-0 right-0 h-16 pointer-events-none"
                style={{ width: '100%' }}
              >
                <motion.path
                  d="M 25% 100% Q 25% 20%, 50% 0%"
                  stroke="#00629B"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.path
                  d="M 75% 100% Q 75% 20%, 50% 0%"
                  stroke="#00629B"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.3, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.svg>

              {/* Layer 3: Application */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border-l-4 sm:border-l-6 relative overflow-hidden"
                style={{ borderLeftColor: slide.architectureLayers[2].color }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  style={{ backgroundColor: `${slide.architectureLayers[2].color}20` }}
                />
                <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[2].color}20` }}>
                  <Grid3x3 size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color: slide.architectureLayers[2].color }} />
                </div>
                <div className="flex items-start gap-2 mb-1 sm:mb-1.5">
                  <div className="flex-1">
                    <div className="text-base sm:text-xl font-black text-ucsd-navy uppercase tracking-wide leading-none mb-1">{slide.architectureLayers[2].name}</div>
                    <div className="text-xs sm:text-sm font-bold text-ucsd-blue mb-0.5">{slide.architectureLayers[2].description}</div>
                    <div className="text-xs sm:text-lg text-ucsd-navy/70 leading-tight mb-1 sm:mb-1.5">{slide.architectureLayers[2].details}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                  {slide.architectureLayers[2].tools.map((tool, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-[#00629B] to-[#004471] text-white rounded-md p-1.5 sm:p-2 text-center text-xs sm:text-base font-bold shadow-md">
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
                className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border-l-4 sm:border-l-6 relative overflow-hidden"
                style={{ borderLeftColor: slide.architectureLayers[3].color }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  style={{ backgroundColor: `${slide.architectureLayers[3].color}20` }}
                />
                <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${slide.architectureLayers[3].color}20` }}>
                  <Database size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color: slide.architectureLayers[3].color }} />
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <div className="text-base sm:text-xl font-black text-ucsd-navy uppercase tracking-wide leading-none mb-1">{slide.architectureLayers[3].name}</div>
                    <div className="text-xs sm:text-sm font-bold text-ucsd-blue mb-0.5">{slide.architectureLayers[3].description}</div>
                    <div className="text-xs sm:text-lg text-ucsd-navy/70 leading-tight mb-1 sm:mb-1.5">{slide.architectureLayers[3].details}</div>
                  </div>
                </div>
                {slide.architectureLayers[3].tools && (
                  <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                    {slide.architectureLayers[3].tools.map((tool, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-[#6E963B] to-[#556F2F] text-white rounded-md p-1.5 sm:p-2 text-center text-xs sm:text-base font-bold shadow-md">
                        {tool}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {isAgentWorkflow && (
        <div className="relative w-full min-h-full flex flex-col items-center justify-start px-4 sm:px-6 pt-0 pb-0 max-w-[1900px] mx-auto">
          {/* Main Layout: Stacked on mobile, 3-column grid on desktop */}
          <div className="relative w-full h-full max-w-[1700px] flex flex-col lg:grid lg:grid-cols-3 lg:items-stretch gap-2 lg:gap-5">

            {/* Mobile: All stages in order. Desktop: Left Column shows Stages 1-3 */}
            <div className="flex flex-col gap-1.5 lg:justify-between order-1 lg:order-1">
              {slide.workflowStages.slice(0, 3).map((stage, idx) => {
                const StageIcon = iconMap[stage.icon];
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-2 lg:p-2.5 shadow-lg border-l-4"
                    style={{ borderLeftColor: stage.color }}
                  >
                    <div className="flex items-start gap-2 lg:gap-3">
                      <div
                        className="flex-shrink-0 w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${stage.color}20` }}
                      >
                        <StageIcon size={20} className="lg:w-6 lg:h-6" style={{ color: stage.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 lg:gap-1.5 mb-0.5">
                          <div className="text-2xl lg:text-4xl font-black" style={{ color: stage.color }}>{stage.number}</div>
                          <div className="text-sm lg:text-lg font-black text-ucsd-navy uppercase leading-none">{stage.name}</div>
                        </div>
                        <div className="text-xs lg:text-base font-bold text-ucsd-navy/70 mb-0.5 lg:mb-1 leading-snug">{stage.description}</div>
                        <div className="text-[11px] lg:text-sm text-ucsd-navy/60 italic bg-gray-50 rounded px-1.5 lg:px-2 py-0.5 lg:py-1 border-l-2 leading-snug" style={{ borderLeftColor: `${stage.color}40` }}>
                          {stage.example}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Column: Agent Team + Resources - Shows in middle on mobile too */}
            <div className="flex flex-col gap-1.5 lg:gap-3 order-3 lg:order-2">
              {/* Central Agent Team */}
              <div className="bg-gradient-to-br from-ucsd-navy to-ucsd-blue rounded-lg p-2 lg:p-3 shadow-2xl text-white">
                <div className="text-lg lg:text-2xl font-black text-center mb-1.5 lg:mb-2">{slide.centralConcept.title}</div>
                <div className="space-y-1 lg:space-y-1.5">
                  {slide.centralConcept.agents.map((agent, idx) => {
                    const AgentIcon = iconMap[agent.icon];
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 lg:gap-3 bg-white/10 backdrop-blur rounded-lg p-1.5 lg:p-2"
                      >
                        <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-white/20 flex items-center justify-center">
                          <AgentIcon size={16} className="text-white lg:w-5 lg:h-5" />
                        </div>
                        <div className="text-sm lg:text-base font-bold">{agent.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supporting Resources */}
              <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
                {slide.supportingLayers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-1.5 lg:p-2 shadow-md border-t-4"
                    style={{ borderTopColor: layer.color }}
                  >
                    <div className="text-sm lg:text-base font-black text-ucsd-navy mb-1 lg:mb-1.5">{layer.name}</div>
                    <div className="flex flex-wrap gap-0.5 lg:gap-1">
                      {layer.items.map((item, i) => (
                        <div key={i} className="text-[11px] lg:text-sm font-semibold text-white rounded px-1.5 lg:px-2 py-0.5" style={{ backgroundColor: layer.color }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Stages 4-6 - Shows after center on mobile */}
            <div className="flex flex-col gap-1.5 lg:justify-between order-2 lg:order-3">
              {slide.workflowStages.slice(3, 6).map((stage, idx) => {
                const StageIcon = iconMap[stage.icon];
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-2 lg:p-2.5 shadow-lg border-l-4"
                    style={{ borderLeftColor: stage.color }}
                  >
                    <div className="flex items-start gap-2 lg:gap-3">
                      <div
                        className="flex-shrink-0 w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${stage.color}20` }}
                      >
                        <StageIcon size={20} className="lg:w-6 lg:h-6" style={{ color: stage.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 lg:gap-1.5 mb-0.5">
                          <div className="text-2xl lg:text-4xl font-black" style={{ color: stage.color }}>{stage.number}</div>
                          <div className="text-sm lg:text-lg font-black text-ucsd-navy uppercase leading-none">{stage.name}</div>
                        </div>
                        <div className="text-xs lg:text-base font-bold text-ucsd-navy/70 mb-0.5 lg:mb-1 leading-snug">{stage.description}</div>
                        <div className="text-[11px] lg:text-sm text-ucsd-navy/60 italic bg-gray-50 rounded px-1.5 lg:px-2 py-0.5 lg:py-1 border-l-2 leading-snug" style={{ borderLeftColor: `${stage.color}40` }}>
                          {stage.example}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* API Gateway Layout */}
      {isApiGateway && (() => {
        const providers = slide.providers || [];
        const consumers = slide.consumers || [];
        const devTools = slide.devTools || [];
        const modelTypes = slide.modelTypes || [];
        const accessSteps = slide.accessSteps || [];
        const guardrails = slide.guardrails || [];
        const hasDevTools = devTools.length > 0;
        const stageHeaderClass = "text-xs sm:text-sm font-black uppercase tracking-[0.16em] text-ucsd-navy/60 text-center md:min-h-[18px] md:flex md:items-end md:justify-center";
        const stageColumnClass = "flex flex-col gap-1.5 sm:gap-2 md:grid md:grid-rows-[18px_1fr] md:gap-y-1";
        const stageContentClass = "flex flex-col gap-1.5 sm:gap-2 md:min-h-[320px] md:justify-start md:pt-1";
        const centeredStageContentClass = "flex flex-col gap-1.5 sm:gap-2 md:min-h-[320px] md:justify-center";
        const renderFlowConnector = (label, delay) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.45 }}
            className="flex flex-row items-center justify-center gap-2 md:grid md:grid-rows-[18px_1fr] md:gap-y-1"
          >
            <div className="hidden md:block" aria-hidden />
            <div className="flex flex-row md:flex-col items-center justify-center gap-1 text-ucsd-blue/70 md:min-h-[320px]">
              <span className="rounded-full border border-ucsd-blue/20 bg-white/75 px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-ucsd-navy/70 shadow-sm">
                {label}
              </span>
              <ArrowRight size={18} className="hidden md:block text-ucsd-blue/45" />
              <ArrowDown size={18} className="md:hidden text-ucsd-blue/45" />
            </div>
          </motion.div>
        );

        return (
          <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-2 sm:gap-3">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-3 sm:mb-4"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-ucsd-navy leading-none">{slide.title}</div>
            </motion.div>

            {/* Gateway Architecture Diagram */}
            <div className="relative px-2 sm:px-4">
              <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1.05fr)_auto_minmax(0,0.88fr)_auto_minmax(0,0.78fr)_auto_minmax(0,1.05fr)] items-stretch justify-center gap-2 sm:gap-3">
                {/* Campus Users */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className={stageColumnClass}
                >
                  <div className={stageHeaderClass}>Campus Users</div>
                  <div className={stageContentClass}>
                    {consumers.map((c, i) => {
                      const IconComp = iconMap[c.icon] || Users;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.08 }}
                          className="flex items-center gap-2 bg-white rounded-lg p-2 sm:p-2.5 shadow-sm border-l-4 hover:shadow-md transition-shadow"
                          style={{ borderLeftColor: '#00629B' }}
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-ucsd-blue/10">
                            <IconComp size={14} className="sm:w-4 sm:h-4 text-ucsd-blue" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-ucsd-navy leading-tight">{c.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {hasDevTools && renderFlowConnector('Use', 0.55)}

                {/* Dev Tools */}
                {hasDevTools && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className={stageColumnClass}
                  >
                    <div className={stageHeaderClass}>Claude Code / Codex</div>
                    <div className={centeredStageContentClass}>
                      {devTools.map((tool, i) => {
                        const IconComp = iconMap[tool.icon] || Code;
                        return (
                          <motion.div
                            key={`tool-${i}`}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.55 + i * 0.1, type: "spring", stiffness: 150 }}
                            className="flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-2.5 shadow-md border-2 hover:shadow-lg transition-shadow"
                            style={{ borderColor: `${tool.color}40` }}
                          >
                            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${tool.color}15` }}>
                              <IconComp size={18} style={{ color: tool.color }} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm sm:text-base font-black text-ucsd-navy leading-tight">{tool.name}</span>
                              <span className="text-[9px] sm:text-[10px] font-medium text-slate-500">{tool.vendor}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {hasDevTools && renderFlowConnector('Connect to', 0.72)}

                {/* LiteLLM Hub */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                  className="relative z-10 md:grid md:grid-rows-[18px_1fr] md:gap-y-1"
                >
                  <div className="hidden md:block" aria-hidden />
                  <div className="flex items-center justify-center py-2 sm:py-0 md:min-h-[320px]">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 0px rgba(0,98,155,0.2)',
                          '0 0 30px rgba(0,98,155,0.4)',
                          '0 0 0px rgba(0,98,155,0.2)'
                        ]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-ucsd-navy to-ucsd-blue text-white flex flex-col items-center justify-center shadow-2xl border-4 border-ucsd-gold/30"
                    >
                      <Server size={24} className="mb-1 text-ucsd-gold sm:w-8 sm:h-8" />
                      <span className="px-2 text-center text-base sm:text-lg font-black tracking-wider leading-tight">{slide.gateway?.name}</span>
                      {slide.gateway?.subtitle && (
                        <span className="px-2 text-center text-[9px] sm:text-[10px] font-medium text-ucsd-sky uppercase tracking-[0.15em] mt-0.5 leading-tight">
                          {slide.gateway.subtitle}
                        </span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {renderFlowConnector('Accesses', hasDevTools ? 0.9 : 0.65)}

                {/* Model Providers */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className={stageColumnClass}
                >
                  <div className={stageHeaderClass}>Model Providers</div>
                  <div className={`${stageContentClass} md:grid md:grid-cols-[minmax(0,1fr)_132px] md:items-start md:content-start md:gap-3`}>
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      {providers.map((p, i) => {
                        const IconComp = iconMap[p.icon] || Server;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            className="flex items-center gap-2 bg-white rounded-lg p-2 sm:p-2.5 shadow-sm border-r-4 hover:shadow-md transition-shadow"
                            style={{ borderRightColor: p.color }}
                          >
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${p.color}15` }}>
                              <IconComp size={14} className="sm:w-4 sm:h-4" style={{ color: p.color }} />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-ucsd-navy leading-tight">{p.name}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {modelTypes.length > 0 && (
                      <div className="flex flex-wrap md:flex-col justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-2.5 pt-1 md:pt-0">
                        {modelTypes.map((m, i) => {
                          const IconComp = iconMap[m.icon] || Cpu;
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.0 + i * 0.06 }}
                              className="flex items-center justify-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 border border-ucsd-blue/20 shadow-sm md:w-full"
                            >
                              <IconComp size={12} className="text-ucsd-blue sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                              <span className="text-[10px] sm:text-xs font-bold text-ucsd-navy uppercase tracking-wide whitespace-nowrap">{m.name}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Access Journey Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/60 shadow-lg p-3 sm:px-4 sm:py-3.5"
            >
              <div className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.16em] text-ucsd-navy/60 mb-1.5 sm:mb-2.5 text-center">How to Get Access</div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
                {accessSteps.map((step, i) => {
                  const IconComp = iconMap[step.icon] || CheckCircle;
                  return (
                    <React.Fragment key={i}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + i * 0.1 }}
                        className="flex-1 flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 px-2 sm:px-2.5 lg:px-3 min-w-0"
                      >
                        <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0" style={{ backgroundColor: step.color }}>
                          <span className="text-sm sm:text-lg font-black">{step.number}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] sm:text-[20px] font-black text-ucsd-navy leading-none">{step.title}</div>
                          <div className="text-[13px] sm:text-[15px] text-slate-600 font-medium leading-[1.15] sm:leading-[1.2] mt-0.5">{step.description}</div>
                        </div>
                      </motion.div>
                      {i < accessSteps.length - 1 && (
                        <div className="hidden sm:flex items-center px-0.5 lg:px-1">
                          <ArrowRight size={16} className="text-ucsd-blue/35" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>

            {/* Guardrails Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3"
            >
              {guardrails.map((g, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-ucsd-navy/70 uppercase tracking-wide">
                  <Shield size={12} className="text-ucsd-blue/60" />
                  <span>{g}</span>
                  {i < guardrails.length - 1 && <span className="text-ucsd-gold ml-1">|</span>}
                </div>
              ))}
            </motion.div>
          </div>
        );
      })()}

      {/* Hosting Pipeline Layout */}
      {isHostingPipeline && (() => {
        const steps = slide.pipelineSteps || [];
        const ownership = slide.ownership || {};
        const boundaries = slide.boundaries || {};
        const hasBoundaryPanels = Boolean(boundaries.whatItIs?.items?.length || boundaries.whatItIsNot?.items?.length);
        const contextNote = slide.contextNote;

        return (
          <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-2.5 sm:gap-3">
            {/* Title + Context Note */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-[28px] sm:text-[42px] md:text-[48px] font-black text-ucsd-navy leading-none">{slide.title}</div>
                  <div className="text-xs sm:text-base text-ucsd-blue font-bold mt-0.5">{slide.subtitle}</div>
                </div>
                {contextNote && (
                  <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ucsd-blue/8 border border-ucsd-blue/15 px-3 py-1.5 mb-1">
                    <ArrowRight size={12} className="text-ucsd-blue/60" />
                    <span className="text-[11px] sm:text-[12px] font-bold text-ucsd-blue/80 whitespace-nowrap">{contextNote}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Full-Width Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="relative overflow-hidden rounded-[28px] border border-white/75 bg-white/90 p-4 sm:p-5 shadow-[0_16px_32px_rgba(24,43,73,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-ucsd-blue/30 via-ucsd-sky/28 to-ucsd-blue/18" />

              {/* Connecting line behind steps */}
              <div className="hidden md:block absolute top-[50%] left-[8%] right-[8%] h-[2px] -translate-y-4 bg-gradient-to-r from-[#00629B20] via-[#00C6D720] to-[#6E963B20]" />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {steps.map((step, i) => {
                  const IconComp = iconMap[step.icon] || Code;
                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                      className="relative rounded-[20px] border bg-white/95 p-3 sm:p-3.5 shadow-sm flex flex-col"
                      style={{
                        borderColor: `${step.color}20`,
                        boxShadow: `inset 0 3px 0 ${step.color}35, 0 6px 16px rgba(24,43,73,0.05)`
                      }}
                    >
                      {/* Step number + icon */}
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-black text-white"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.number}
                        </div>
                        <IconComp size={18} style={{ color: step.color }} className="opacity-50" />
                      </div>

                      {/* Step name */}
                      <div className="text-[16px] sm:text-[18px] font-black text-ucsd-navy leading-tight mb-1.5">
                        {step.name}
                      </div>

                      {/* Step description */}
                      <div className="text-[12px] sm:text-[13px] font-medium leading-[1.35] text-slate-600 flex-1">
                        {step.description}
                      </div>

                      {/* Arrow between steps (desktop) */}
                      {i < steps.length - 1 && (
                        <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                          <ArrowRight size={14} className="text-slate-300" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Ownership + Boundaries Footer */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-2.5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="relative overflow-hidden rounded-[22px] border border-white/75 bg-white/90 p-3 sm:p-3.5 shadow-[0_10px_20px_rgba(24,43,73,0.06)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-ucsd-blue/25 via-ucsd-sky/20 to-ucsd-blue/12" />
                <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-ucsd-navy/40 mb-2">Responsibility</div>
                <div className="grid grid-cols-2 gap-0 rounded-[18px] overflow-hidden border border-slate-200/75 bg-slate-50/55">
                  <div className="p-2.5 border-r border-slate-200/75">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ownership.its?.color}10` }}>
                        <Server size={14} style={{ color: ownership.its?.color }} />
                      </div>
                      <span className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.06em] leading-none" style={{ color: ownership.its?.color }}>
                        {ownership.its?.title}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {ownership.its?.items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] font-semibold text-ucsd-navy leading-tight">
                          <div className="mt-[6px] h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ownership.its?.color }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-2.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ownership.builder?.color}10` }}>
                        <Code size={14} style={{ color: ownership.builder?.color }} />
                      </div>
                      <span className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.06em] leading-none text-ucsd-navy">
                        {ownership.builder?.title}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {ownership.builder?.items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] font-semibold text-ucsd-navy leading-tight">
                          <div className="mt-[6px] h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ownership.builder?.color }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {hasBoundaryPanels && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                  className="relative overflow-hidden rounded-[22px] border border-white/75 bg-white/90 p-3 sm:p-3.5 shadow-[0_10px_20px_rgba(24,43,73,0.06)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-ucsd-blue/25 via-ucsd-sky/20 to-ucsd-blue/12" />
                  <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-ucsd-navy/40 mb-2">Scope</div>
                  <div className="flex flex-col gap-2">
                    <div className="rounded-[16px] border border-ucsd-blue/14 bg-ucsd-blue/4 px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="shrink-0 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-ucsd-blue">In Scope:</div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {boundaries.whatItIs?.items?.map((item, i) => (
                            <span key={i} className="rounded-full bg-white/90 px-2.5 py-1 text-[12px] sm:text-[13px] font-semibold text-ucsd-navy/88">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[16px] border border-[#B56200]/14 bg-[#B56200]/4 px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="shrink-0 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-[#B56200]">Not For:</div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {boundaries.whatItIsNot?.items?.map((item, i) => (
                            <span key={i} className="rounded-full bg-white/90 px-2.5 py-1 text-[12px] sm:text-[13px] font-semibold text-[#8A5600]">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Intake Funnel Layout */}
      {isIntakeFunnel && (() => {
        const lanes = slide.lanes || [];
        const ownership = slide.ownership || {};
        const boundaries = slide.boundaries || {};
        const hasBoundaryPanels = Boolean(boundaries.whatItIs?.items?.length || boundaries.whatItIsNot?.items?.length);

        const DiamondNode = ({ label, color }) => (
          <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 110, height: 110 }}>
            <div
              className="absolute rounded-[7px] border-[2.5px]"
              style={{
                width: 78,
                height: 78,
                transform: 'rotate(45deg)',
                borderColor: color,
                backgroundColor: `${color}25`,
                boxShadow: `0 4px 14px ${color}30`
              }}
            />
            <span
              className="relative z-10 font-extrabold text-center leading-[1.18] px-1"
              style={{ color, fontSize: '11.5px', maxWidth: 90 }}
            >
              {label}
            </span>
          </div>
        );

        const HorizontalArrow = ({ label, color, dashed = false, grow = false }) => (
          <div className={`flex flex-col items-center justify-center flex-shrink-0 ${grow ? 'flex-1 min-w-[30px]' : ''}`} style={grow ? undefined : { width: 55 }}>
            {label && (
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.1em] mb-0.5 whitespace-nowrap" style={{ color }}>
                {label}
              </div>
            )}
            <div className="relative w-full flex items-center">
              <div
                className="flex-1 h-0"
                style={{
                  borderTop: `2.5px ${dashed ? 'dashed' : 'solid'} ${color}88`
                }}
              />
              <ArrowRight size={14} style={{ color: `${color}` }} className="flex-shrink-0 -ml-1" />
            </div>
          </div>
        );

        const TeamIcons = ({ count, color }) => {
          if (count <= 1) {
            return <User size={22} style={{ color }} />;
          }
          if (count <= 3) {
            return (
              <div className="flex items-center -space-x-1">
                {Array.from({ length: count }).map((_, i) => (
                  <User key={i} size={18} style={{ color: i === 0 ? color : `${color}80` }} />
                ))}
              </div>
            );
          }
          return (
            <div className="flex items-center gap-1">
              <Users size={20} style={{ color }} />
              <span className="text-[12px] font-bold" style={{ color }}>{count}</span>
            </div>
          );
        };

        return (
          <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-2.5 sm:gap-3">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="text-[28px] sm:text-[42px] md:text-[48px] font-black text-ucsd-navy leading-none">{slide.title}</div>
              <div className="text-xs sm:text-base text-ucsd-blue font-bold mt-0.5">{slide.subtitle}</div>
            </motion.div>

            {/* Main Swim Lane Panel */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="relative rounded-[28px] border border-white/75 bg-white/90 pl-4 pr-3 sm:pl-6 sm:pr-4 py-4 sm:py-5 shadow-[0_16px_32px_rgba(24,43,73,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-ucsd-blue/30 via-ucsd-sky/28 to-ucsd-blue/18" />

              <div className="flex flex-col gap-0">
                {lanes.map((lane, laneIndex) => (
                  <React.Fragment key={lane.id}>
                    {/* Lane Row */}
                    <motion.div
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + laneIndex * 0.15, duration: 0.45 }}
                      className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4"
                      style={{ borderLeft: `5px solid ${lane.color}`, paddingLeft: 16 }}
                    >
                      {/* Lane Label + Volume */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0" style={{ width: 120 }}>
                        <div
                          className="text-[16px] sm:text-[20px] font-black leading-tight text-center"
                          style={{ color: lane.color }}
                        >
                          {lane.label}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <TeamIcons count={lane.teamSize} color={lane.color} />
                          <div className="text-[11px] sm:text-[12px] font-bold text-ucsd-navy/50 leading-none">
                            {lane.volume}
                          </div>
                        </div>
                      </div>

                      {/* Arrow to gate */}
                      <HorizontalArrow color={lane.color} />

                      {/* Gate Diamond */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + laneIndex * 0.15, duration: 0.35 }}
                      >
                        <DiamondNode label={lane.gate} color={lane.color} />
                      </motion.div>

                      {/* Arrow: Approved */}
                      <HorizontalArrow label="Approved" color={lane.color} />

                      {/* Deployment Box */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + laneIndex * 0.15, duration: 0.35 }}
                        className="rounded-[18px] border-2 bg-white/95 px-3.5 py-2.5 shadow-sm flex-1 min-w-0"
                        style={{
                          borderColor: `${lane.color}50`,
                          boxShadow: `inset 0 2px 0 ${lane.color}45`
                        }}
                      >
                        <div className="text-[14px] sm:text-[16px] font-black text-ucsd-navy leading-tight">
                          {lane.deployment}
                        </div>
                        <div
                          className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] sm:text-[12px] font-extrabold"
                          style={{
                            backgroundColor: `${lane.color}20`,
                            color: lane.color,
                            fontFamily: 'monospace'
                          }}
                        >
                          {lane.domain}
                        </div>
                      </motion.div>

                      {/* Arrow to recurring review (if applicable) */}
                      {lane.recurringReview && (
                        <>
                          <HorizontalArrow color={lane.color} />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + laneIndex * 0.15, duration: 0.35 }}
                          >
                            <DiamondNode label="Recurring Risk / Scope Review" color={lane.color} />
                          </motion.div>
                        </>
                      )}
                    </motion.div>

                    {/* Escalation indicator between lanes */}
                    {lane.escalatesTo && laneIndex < lanes.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85, duration: 0.4 }}
                        className="relative flex items-stretch ml-[131px] mr-4 py-0"
                        style={{ height: 28 }}
                      >
                        {/* Left escalate arrow under gate area */}
                        <div className="absolute left-[70px] top-0 bottom-0 flex items-center gap-2">
                          <div className="flex flex-col items-center h-full justify-between">
                            <div
                              className="flex-1 w-0 border-l-2 border-dashed"
                              style={{ borderColor: `${lane.color}45` }}
                            />
                            <ArrowDown size={11} style={{ color: `${lane.color}65` }} className="-mt-0.5" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap" style={{ color: `${lane.color}80` }}>
                            Escalate
                          </span>
                        </div>

                        {/* Right escalate/migrate arrow under deployment area */}
                        <div className="absolute right-[25%] top-0 bottom-0 flex items-center gap-2">
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap" style={{ color: `${lane.color}80` }}>
                            Escalate / Migrate
                          </span>
                          <div className="flex flex-col items-center h-full justify-between">
                            <div
                              className="flex-1 w-0 border-l-2 border-dashed"
                              style={{ borderColor: `${lane.color}45` }}
                            />
                            <ArrowDown size={11} style={{ color: `${lane.color}65` }} className="-mt-0.5" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Ownership + Boundaries Footer */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-2.5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="relative overflow-hidden rounded-[22px] border border-white/75 bg-white/90 p-3 sm:p-3.5 shadow-[0_10px_20px_rgba(24,43,73,0.06)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-ucsd-blue/25 via-ucsd-sky/20 to-ucsd-blue/12" />
                <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-ucsd-navy/40 mb-2">Responsibility</div>
                <div className="grid grid-cols-2 gap-0 rounded-[18px] overflow-hidden border border-slate-200/75 bg-slate-50/55">
                  <div className="p-2.5 border-r border-slate-200/75">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ownership.its?.color}10` }}>
                        <Server size={14} style={{ color: ownership.its?.color }} />
                      </div>
                      <span className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.06em] leading-none" style={{ color: ownership.its?.color }}>
                        {ownership.its?.title}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {ownership.its?.items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] font-semibold text-ucsd-navy leading-tight">
                          <div className="mt-[6px] h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ownership.its?.color }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-2.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ownership.builder?.color}10` }}>
                        <Code size={14} style={{ color: ownership.builder?.color }} />
                      </div>
                      <span className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.06em] leading-none text-ucsd-navy">
                        {ownership.builder?.title}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {ownership.builder?.items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] font-semibold text-ucsd-navy leading-tight">
                          <div className="mt-[6px] h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ownership.builder?.color }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {hasBoundaryPanels && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                  className="relative overflow-hidden rounded-[22px] border border-white/75 bg-white/90 p-3 sm:p-3.5 shadow-[0_10px_20px_rgba(24,43,73,0.06)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-ucsd-blue/25 via-ucsd-sky/20 to-ucsd-blue/12" />
                  <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-ucsd-navy/40 mb-2">Scope</div>
                  <div className="flex flex-col gap-2">
                    <div className="rounded-[16px] border border-ucsd-blue/14 bg-ucsd-blue/4 px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="shrink-0 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-ucsd-blue">In Scope:</div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {boundaries.whatItIs?.items?.map((item, i) => (
                            <span key={i} className="rounded-full bg-white/90 px-2.5 py-1 text-[12px] sm:text-[13px] font-semibold text-ucsd-navy/88">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[16px] border border-[#B56200]/14 bg-[#B56200]/4 px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="shrink-0 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-[#B56200]">Not For:</div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {boundaries.whatItIsNot?.items?.map((item, i) => (
                            <span key={i} className="rounded-full bg-white/90 px-2.5 py-1 text-[12px] sm:text-[13px] font-semibold text-[#8A5600]">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Innovation Flywheel Layout */}
      {isInnovationFlywheel && (() => {
        const stages = slide.flywheelStages || [];
        const centerX = 160;
        const centerY = 160;
        const radius = 120;

        return (
          <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-2 sm:gap-3">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-ucsd-navy leading-none">{slide.title}</div>
              <div className="text-sm sm:text-lg text-ucsd-blue font-bold mt-1">{slide.subtitle}</div>
            </motion.div>

            {/* Main Content: Flywheel + Detail Cards */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 px-2 sm:px-4">
              {/* Flywheel Diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative flex-shrink-0"
              >
                <svg width="320" height="320" viewBox="0 0 320 320" className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px]">
                  {/* Outer decorative ring */}
                  <motion.circle
                    cx={centerX} cy={centerY} r={radius + 25}
                    fill="none" stroke="#00629B" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4,4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                  />

                  {/* Main ring track */}
                  <motion.circle
                    cx={centerX} cy={centerY} r={radius}
                    fill="none" stroke="#E5E7EB" strokeWidth="8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                  />

                  {/* Colored arc segments for each stage */}
                  {stages.map((stage, i) => {
                    const circumference = 2 * Math.PI * radius;
                    const segmentLength = circumference / stages.length;
                    const gapLength = circumference - segmentLength;
                    const rotationDeg = (i * 360) / stages.length - 90;
                    return (
                      <motion.circle
                        key={`arc-${i}`}
                        cx={centerX} cy={centerY} r={radius}
                        fill="none" stroke={stage.color} strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${segmentLength - 8} ${gapLength + 8}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
                        style={{ transformOrigin: `${centerX}px ${centerY}px`, transform: `rotate(${rotationDeg}deg)` }}
                      />
                    );
                  })}

                  {/* Arrow indicators between stages */}
                  {stages.map((_, i) => {
                    const angleBetween = ((i + 0.5) * 360) / stages.length - 90;
                    const rad = (angleBetween * Math.PI) / 180;
                    const ax = centerX + (radius + 14) * Math.cos(rad);
                    const ay = centerY + (radius + 14) * Math.sin(rad);
                    const arrowRad = rad + Math.PI / 2;
                    return (
                      <motion.polygon
                        key={`arrow-${i}`}
                        points={`${ax + 5 * Math.cos(arrowRad)},${ay + 5 * Math.sin(arrowRad)} ${ax - 5 * Math.cos(arrowRad)},${ay - 5 * Math.sin(arrowRad)} ${ax + 8 * Math.cos(rad)},${ay + 8 * Math.sin(rad)}`}
                        fill="#00629B"
                        fillOpacity="0.4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 + i * 0.15 }}
                      />
                    );
                  })}

                  {/* Stage nodes on the ring */}
                  {stages.map((stage, i) => {
                    const angle = (i * 360) / stages.length - 90;
                    const rad = (angle * Math.PI) / 180;
                    const nx = centerX + radius * Math.cos(rad);
                    const ny = centerY + radius * Math.sin(rad);
                    const IconComp = iconMap[stage.icon] || Target;
                    return (
                      <g key={`node-${i}`}>
                        <motion.circle
                          cx={nx} cy={ny} r="22"
                          fill="white" stroke={stage.color} strokeWidth="3"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.0 + i * 0.15, type: "spring", stiffness: 200 }}
                          style={{ transformOrigin: `${nx}px ${ny}px` }}
                        />
                        <foreignObject x={nx - 11} y={ny - 11} width="22" height="22">
                          <div className="w-full h-full flex items-center justify-center">
                            <IconComp size={14} style={{ color: stage.color }} />
                          </div>
                        </foreignObject>
                        <text x={nx} y={ny + 34} textAnchor="middle" className="text-[10px] sm:text-xs font-bold fill-ucsd-navy">{stage.shortLabel}</text>
                      </g>
                    );
                  })}

                  {/* Center text */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                  >
                    <circle cx={centerX} cy={centerY} r="38" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                    <text x={centerX} y={centerY - 4} textAnchor="middle" className="text-sm font-black fill-ucsd-navy">TritonAI</text>
                    <text x={centerX} y={centerY + 10} textAnchor="middle" className="text-[8px] font-bold fill-ucsd-blue uppercase tracking-wider">Flywheel</text>
                  </motion.g>

                  {/* Animated flowing dot */}
                  <motion.circle
                    r="5" fill="#00629B"
                    animate={{
                      cx: stages.map((_, i) => {
                        const angle = (i * 360) / stages.length - 90;
                        const rad = (angle * Math.PI) / 180;
                        return centerX + radius * Math.cos(rad);
                      }).concat([centerX + radius * Math.cos(-Math.PI / 2)]),
                      cy: stages.map((_, i) => {
                        const angle = (i * 360) / stages.length - 90;
                        const rad = (angle * Math.PI) / 180;
                        return centerY + radius * Math.sin(rad);
                      }).concat([centerY + radius * Math.sin(-Math.PI / 2)])
                    }}
                    transition={{ delay: 2, duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </motion.div>

              {/* Detail Cards */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5 w-full">
                {stages.map((stage, i) => {
                  const IconComp = iconMap[stage.icon] || Target;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.15 }}
                      className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-sm border-l-4 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                      style={{ borderLeftColor: stage.color }}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: `${stage.color}15` }}>
                          <IconComp size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: stage.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm sm:text-base font-black text-ucsd-navy leading-tight mb-0.5">{stage.name}</div>
                          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">{stage.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Key Message Bar */}
            {slide.keyMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="text-center px-4"
              >
                <div className="inline-flex items-center gap-2 bg-ucsd-navy/5 rounded-full px-4 py-2 sm:px-6 sm:py-2.5 border border-ucsd-navy/10">
                  <Star size={14} className="text-ucsd-gold flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-ucsd-navy italic">{slide.keyMessage}</span>
                </div>
              </motion.div>
            )}
          </div>
        );
      })()}

      {/* Flywheel Case Study Layout */}
      {isFlywheelCaseStudy && (() => {
        const stages = slide.flywheelStages || [];
        const metrics = slide.impactMetrics || [];
        const highlights = slide.toolHighlights || [];
        const caseStudyVideoSrc = slide.videoSrc;
        const caseStudyPoster = slide.poster;
        const caseStudyDemoLabel = slide.demoLabel || 'Demo Preview';
        const centerX = 120;
        const centerY = 120;
        const radius = 90;

        return (
          <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-1 sm:gap-1.5">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-ucsd-navy/8 px-3 py-1 mb-1">
                <RefreshCw size={12} className="text-ucsd-blue" />
                <span className="text-[10px] sm:text-xs font-black text-ucsd-navy uppercase tracking-[0.2em]">Use Case</span>
              </div>
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-ucsd-navy leading-none">{slide.title}</div>
              <div className="text-sm sm:text-lg text-ucsd-blue font-bold mt-1 max-w-4xl mx-auto leading-snug">{slide.subtitle}</div>
            </motion.div>

            {/* Main Content: Flywheel + Stage Cards */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 items-center lg:items-start gap-1.5 sm:gap-3 px-2 sm:px-4">
              {caseStudyVideoSrc ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="w-full max-w-[640px] lg:max-w-none flex-shrink-0 self-start"
                >
                  <div className="rounded-[28px] border border-ucsd-navy/10 bg-white/88 p-2 shadow-[0_20px_44px_rgba(24,43,73,0.12)]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-slate-950">
                      <video
                        src={caseStudyVideoSrc}
                        poster={caseStudyPoster}
                        className="absolute inset-0 h-full w-full object-cover"
                        preload="auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent px-3 py-1.5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-2.5 py-1 backdrop-blur-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white">{caseStudyDemoLabel}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 px-1.5 pt-2">
                      <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] text-ucsd-navy/55">Live Product Preview</div>
                      <div className="text-[11px] sm:text-xs font-semibold text-ucsd-blue">Browser-first, campus-hosted</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative flex-shrink-0"
                >
                  <svg width="240" height="240" viewBox="0 0 240 240" className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px]">
                    {/* Outer decorative ring */}
                    <motion.circle
                      cx={centerX} cy={centerY} r={radius + 22}
                      fill="none" stroke="#00629B" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="4,4"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                    />

                    {/* Main ring track */}
                    <motion.circle
                      cx={centerX} cy={centerY} r={radius}
                      fill="none" stroke="#E5E7EB" strokeWidth="7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Colored arc segments */}
                    {stages.map((stage, i) => {
                      const circumference = 2 * Math.PI * radius;
                      const segmentLength = circumference / stages.length;
                      const gapLength = circumference - segmentLength;
                      const rotationDeg = (i * 360) / stages.length - 90;
                      return (
                        <motion.circle
                          key={`arc-${i}`}
                          cx={centerX} cy={centerY} r={radius}
                          fill="none" stroke={stage.color} strokeWidth="7" strokeLinecap="round"
                          strokeDasharray={`${segmentLength - 8} ${gapLength + 8}`}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
                          style={{ transformOrigin: `${centerX}px ${centerY}px`, transform: `rotate(${rotationDeg}deg)` }}
                        />
                      );
                    })}

                    {/* Arrow indicators */}
                    {stages.map((_, i) => {
                      const angleBetween = ((i + 0.5) * 360) / stages.length - 90;
                      const rad = (angleBetween * Math.PI) / 180;
                      const ax = centerX + (radius + 12) * Math.cos(rad);
                      const ay = centerY + (radius + 12) * Math.sin(rad);
                      const arrowRad = rad + Math.PI / 2;
                      return (
                        <motion.polygon
                          key={`arrow-${i}`}
                          points={`${ax + 4 * Math.cos(arrowRad)},${ay + 4 * Math.sin(arrowRad)} ${ax - 4 * Math.cos(arrowRad)},${ay - 4 * Math.sin(arrowRad)} ${ax + 7 * Math.cos(rad)},${ay + 7 * Math.sin(rad)}`}
                          fill="#00629B"
                          fillOpacity="0.35"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 + i * 0.15 }}
                        />
                      );
                    })}

                    {/* Stage nodes */}
                    {stages.map((stage, i) => {
                      const angle = (i * 360) / stages.length - 90;
                      const rad = (angle * Math.PI) / 180;
                      const nx = centerX + radius * Math.cos(rad);
                      const ny = centerY + radius * Math.sin(rad);
                      const IconComp = iconMap[stage.icon] || Target;
                      return (
                        <g key={`node-${i}`}>
                          <motion.circle
                            cx={nx} cy={ny} r="20"
                            fill="white" stroke={stage.color} strokeWidth="3"
                            filter="url(#nodeShadow)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.0 + i * 0.15, type: "spring", stiffness: 200 }}
                            style={{ transformOrigin: `${nx}px ${ny}px` }}
                          />
                          <foreignObject x={nx - 10} y={ny - 10} width="20" height="20">
                            <div className="w-full h-full flex items-center justify-center">
                              <IconComp size={13} style={{ color: stage.color }} />
                            </div>
                          </foreignObject>
                          <text x={nx} y={ny + 32} textAnchor="middle" className="text-[11px] sm:text-[13px] font-black fill-ucsd-navy">{stage.shortLabel}</text>
                        </g>
                      );
                    })}

                    {/* Center */}
                    <motion.g
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                    >
                      <circle cx={centerX} cy={centerY} r="36" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                      <text x={centerX} y={centerY - 7} textAnchor="middle" className="text-[13px] font-black fill-ucsd-navy">PDF</text>
                      <text x={centerX} y={centerY + 9} textAnchor="middle" className="text-[9px] font-bold fill-ucsd-blue uppercase tracking-wider">Remediator</text>
                    </motion.g>

                    {/* Animated flowing dot */}
                    <motion.circle
                      r="4" fill="#FFCD00"
                      filter="url(#dotGlow)"
                      animate={{
                        cx: stages.map((_, i) => {
                          const angle = (i * 360) / stages.length - 90;
                          const rad = (angle * Math.PI) / 180;
                          return centerX + radius * Math.cos(rad);
                        }).concat([centerX + radius * Math.cos(-Math.PI / 2)]),
                        cy: stages.map((_, i) => {
                          const angle = (i * 360) / stages.length - 90;
                          const rad = (angle * Math.PI) / 180;
                          return centerY + radius * Math.sin(rad);
                        }).concat([centerY + radius * Math.sin(-Math.PI / 2)])
                      }}
                      transition={{ delay: 2, duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Filters */}
                    <defs>
                      <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1" />
                      </filter>
                      <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                  </svg>
                </motion.div>
              )}

              {/* Stage Detail Cards */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-1 sm:gap-1.5 w-full">
                {stages.map((stage, i) => {
                  const IconComp = iconMap[stage.icon] || Target;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.15 }}
                      className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 shadow-sm border-l-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
                      style={{ borderLeftColor: stage.color }}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${stage.color}15` }}
                        >
                          <IconComp size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: stage.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-base sm:text-lg lg:text-[1.3rem] font-black text-ucsd-navy leading-tight mb-0.5">{stage.name}</div>
                          <p className="text-sm sm:text-base lg:text-[1rem] text-slate-600 font-medium leading-[1.3]">{stage.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="grid grid-cols-3 gap-1.5 sm:gap-2 px-2 sm:px-4"
            >
              {metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + i * 0.1 }}
                  className="bg-gradient-to-br from-ucsd-navy to-ucsd-blue p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg text-center text-white relative overflow-hidden group hover:scale-[1.02] transition-transform"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 bg-ucsd-gold/10 rounded-full blur-2xl group-hover:bg-ucsd-gold/20 transition-colors" />
                  <div className="relative z-10">
                    <div className="text-[8px] sm:text-[10px] font-bold text-ucsd-sky uppercase tracking-[0.12em] mb-0.5">{metric.label}</div>
                    <div className="text-lg sm:text-[2rem] font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 leading-none">{metric.value}</div>
                    <div className="text-[8px] sm:text-[10px] font-medium text-white/70 uppercase tracking-wide mt-0.5">{metric.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tool Highlights + Key Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="flex flex-col items-center gap-1 px-4"
            >
              {/* Tool pills */}
              <div className="flex flex-wrap justify-center gap-1">
                {highlights.map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.3 + i * 0.1 }}
                    className="px-2.5 py-0.5 rounded-full border border-ucsd-navy/15 bg-white/80 backdrop-blur-sm text-[9px] sm:text-[11px] font-bold text-ucsd-navy uppercase tracking-wide shadow-sm"
                  >
                    {h}
                  </motion.span>
                ))}
              </div>

              {/* Key Message */}
              {slide.keyMessage && (
                <div className="inline-flex items-center gap-2 bg-ucsd-navy/5 rounded-full px-3 py-1 sm:px-5 sm:py-1.5 border border-ucsd-navy/10">
                  <Star size={12} className="text-ucsd-gold flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-ucsd-navy italic">{slide.keyMessage}</span>
                </div>
              )}
            </motion.div>
          </div>
        );
      })()}

      {/* Analytics Chart Layout */}
      {isAnalyticsChart && slide.chartData && (() => {
        const ucsdColors = ['#00629B', '#C69214', '#00C6D7', '#182B49'];
        const maxValue = slide.chartData.maxValue;
        const dataPoints = slide.chartData.xAxis.length;
        const labelFontSize = dataPoints >= 14 ? 18 : dataPoints >= 12 ? 20 : 22;
        const xAxisLabelFontSize = dataPoints >= 14 ? 16 : dataPoints >= 12 ? 18 : 20;
        const pointRadius = dataPoints >= 14 ? 7 : 8;
        const getDataLabelPlacement = (idx, seriesIdx) => {
          const baseYOffset = seriesIdx === 0 ? 18 : 16;
          return { textAnchor: 'middle', xOffset: 0, yOffset: baseYOffset };
        };

        // Fixed viewBox dimensions - this ensures consistent scaling
        const vbWidth = 1000;
        const vbHeight = 450;
        const margin = { top: 50, right: 30, bottom: 50, left: 30 };
        const plotWidth = vbWidth - margin.left - margin.right;
        const plotHeight = vbHeight - margin.top - margin.bottom;

        return (
          <div className="w-full h-full flex flex-col items-center justify-start pt-2 px-2 sm:px-4">
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg p-4 sm:p-6">
              {/* Title */}
              <h3 className="text-xl sm:text-3xl font-bold text-ucsd-navy text-center mb-2">
                {slide.chartData.title}
              </h3>

              {/* Legend */}
              <div className="flex justify-center gap-8 mb-3">
                {slide.chartData.series.map((series, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg width="24" height="24">
                      <circle cx="12" cy="12" r="8" fill="white" stroke={ucsdColors[idx]} strokeWidth="3" />
                    </svg>
                    <span className="text-base sm:text-lg text-slate-600 font-medium">{series.name}</span>
                  </div>
                ))}
              </div>

              {/* Chart with Y-axis */}
              <div className="flex">
                {/* Y-Axis Labels - height matches SVG, with padding to align with plot area */}
                <div className="flex flex-col justify-between pr-3 shrink-0" style={{ height: '450px', paddingTop: '50px', paddingBottom: '60px' }}>
                  {slide.chartData.yAxis.map((label, idx) => (
                    <span key={idx} className="text-sm sm:text-base text-slate-400 text-right w-16 leading-none">{label}</span>
                  ))}
                </div>

                {/* Chart SVG */}
                <div className="flex-1" style={{ height: '450px' }}>
                  <svg
                    viewBox={`0 0 ${vbWidth} ${vbHeight}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ width: '100%', height: '100%' }}
                  >
                    {/* Grid lines */}
                    {slide.chartData.yAxis.map((_, idx) => {
                      const y = margin.top + (idx / (slide.chartData.yAxis.length - 1)) * plotHeight;
                      return (
                        <line
                          key={idx}
                          x1={margin.left}
                          y1={y}
                          x2={vbWidth - margin.right}
                          y2={y}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Area fills */}
                    {slide.chartData.series.map((series, seriesIdx) => {
                      if (!series.areaFill) return null;
                      const color = ucsdColors[seriesIdx];
                      const points = series.data.map((value, idx) => {
                        const x = margin.left + (idx / (dataPoints - 1)) * plotWidth;
                        const y = margin.top + plotHeight - (value / maxValue) * plotHeight;
                        return `${x},${y}`;
                      }).join(' ');
                      const bottomY = margin.top + plotHeight;
                      return (
                        <polygon
                          key={seriesIdx}
                          points={`${margin.left},${bottomY} ${points} ${margin.left + plotWidth},${bottomY}`}
                          fill={color}
                          fillOpacity="0.12"
                        />
                      );
                    })}

                    {/* Lines */}
                    {slide.chartData.series.map((series, seriesIdx) => {
                      const color = ucsdColors[seriesIdx];
                      const pathData = series.data.map((value, idx) => {
                        const x = margin.left + (idx / (dataPoints - 1)) * plotWidth;
                        const y = margin.top + plotHeight - (value / maxValue) * plotHeight;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ');
                      return (
                        <path
                          key={seriesIdx}
                          d={pathData}
                          fill="none"
                          stroke={color}
                          strokeWidth="3"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      );
                    })}

                    {/* Data points */}
                    {slide.chartData.series.map((series, seriesIdx) => {
                      const color = ucsdColors[seriesIdx];
                      return series.data.map((value, idx) => {
                        const x = margin.left + (idx / (dataPoints - 1)) * plotWidth;
                        const y = margin.top + plotHeight - (value / maxValue) * plotHeight;
                        return (
                          <circle
                            key={`point-${seriesIdx}-${idx}`}
                            cx={x}
                            cy={y}
                            r={pointRadius}
                            fill="white"
                            stroke={color}
                            strokeWidth="3"
                          />
                        );
                      });
                    })}

                    {/* Data labels */}
                    {slide.chartData.series.map((series, seriesIdx) => {
                      const color = ucsdColors[seriesIdx];
                      return series.data.map((value, idx) => {
                        const x = margin.left + (idx / (dataPoints - 1)) * plotWidth;
                        const y = margin.top + plotHeight - (value / maxValue) * plotHeight;
                        const placement = getDataLabelPlacement(idx, seriesIdx);
                        return (
                          <text
                            key={`label-${seriesIdx}-${idx}`}
                            x={x + placement.xOffset}
                            y={y - placement.yOffset}
                            textAnchor={placement.textAnchor}
                            fill={color}
                            fontSize={labelFontSize}
                            fontWeight="bold"
                            fontFamily="system-ui, sans-serif"
                          >
                            {value.toLocaleString()}
                          </text>
                        );
                      });
                    })}

                    {/* X-Axis Labels - inside SVG for perfect alignment */}
                    {slide.chartData.xAxis.map((label, idx) => {
                      const x = margin.left + (idx / (dataPoints - 1)) * plotWidth;
                      const y = margin.top + plotHeight + 30;
                      return (
                        <text
                          key={`xaxis-${idx}`}
                          x={x}
                          y={y}
                          textAnchor="middle"
                          fill="#64748b"
                          fontSize={xAxisLabelFontSize}
                          fontWeight="500"
                          fontFamily="system-ui, sans-serif"
                        >
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* X-Axis Title */}
              <div className="text-center mt-3">
                <span className="text-sm text-slate-400">{slide.chartData.xAxisTitle || 'Month'}</span>
              </div>
            </div>
          </div>
        );
      })()}

      {isTeamGrid && slide.teamMembers && (
        <div className="w-full max-w-[1800px] mx-auto h-full flex flex-col px-2 sm:px-4">
          {/* Leadership row - Service Owner & Offering Manager */}
          {slide.teamLeadership && (
            <div className="flex justify-center gap-3 lg:gap-5 mb-1.5">
              {slide.teamLeadership.map((leader, index) => {
                // Custom avatar seeds for leadership - Service Owner has mohawk, Offering Manager is male
                const leaderAvatarSeeds = {
                  'Service Owner': 'Felix',  // mohawk style
                  'Offering Manager': 'Robert'  // male
                };
                const avatarSeed = leaderAvatarSeeds[leader.role] || `leader${index}`;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.2 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="flex items-center gap-1.5 bg-white rounded-lg shadow-lg px-1.5 py-1 lg:px-2 lg:py-1 max-w-xl"
                    style={{ borderLeft: `5px solid ${leader.color}` }}
                  >
                    {/* Professional avatar */}
                    <div className="flex-shrink-0 relative">
                      <div
                        className="w-[4.5rem] h-[4.5rem] lg:w-24 lg:h-24 rounded-full shadow-sm overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200"
                        style={{ border: `3px solid ${leader.color}` }}
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}&backgroundColor=f8fafc`}
                          alt={leader.role}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Allocation badge */}
                      <span className="absolute -bottom-0.5 -right-0.5 text-[11px] font-bold text-ucsd-navy bg-ucsd-gold px-1.5 py-0.5 rounded-full shadow">
                        {leader.allocation}
                      </span>
                    </div>
                    {/* Role info and responsibilities */}
                    <div className="flex-1 min-w-0">
                      <div className="text-base lg:text-lg font-black text-ucsd-navy leading-tight">{leader.role}</div>
                      <p className="text-sm lg:text-[15px] text-slate-600 leading-snug line-clamp-2">
                        {leader.responsibilities}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Connecting lines visual with slide animation */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
            className="hidden md:flex justify-center mb-0.5 origin-top"
          >
            <div className="w-1 h-5 bg-ucsd-navy/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
                className="w-full h-full bg-ucsd-gold"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
            className="hidden md:block w-4/5 mx-auto mb-1.5 origin-center"
          >
            <div className="h-1 bg-gradient-to-r from-ucsd-navy/20 via-ucsd-navy/60 to-ucsd-navy/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
                className="w-1/3 h-full bg-gradient-to-r from-transparent via-ucsd-gold to-transparent"
              />
            </div>
          </motion.div>

          {/* Team members grid - 3 columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-1.5">
            {slide.teamMembers.map((member, index) => {
              const roleColors = {
                'Platform': '#00629B',
                'Infrastructure': '#006A96',
                'Delivery': '#182B49',
                'Knowledge': '#00C6D7',
                'Governance': '#C69214',
                'Services': '#6E963B',
                'Strategy': '#FC8900',
                'Architecture': '#B56200'
              };
              const roleColor = roleColors[member.category] || '#182B49';

              // Custom avatar seeds - Project Manager is female, others are male
              const memberAvatarSeeds = {
                'Lead Architect': 'James',
                'Platform Lead': 'Michael',
                'Project Manager': 'Jennifer',  // female
                'Platform Engineer': 'David',
                'Infra/DevOps': 'Thomas',
                'Knowledge Engineer': 'Marcus'
              };
              const memberAvatarSeed = memberAvatarSeeds[member.role] || `team${index}`;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.7 + index * 0.08,
                    type: "spring",
                    stiffness: 120,
                    damping: 14
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-2 bg-white rounded-lg shadow-md hover:shadow-lg px-1.5 py-0.5 lg:px-2 lg:py-0.5 transition-all"
                  style={{ borderLeft: `4px solid ${roleColor}` }}
                >
                  {/* Professional avatar */}
                  <div className="flex-shrink-0 relative">
                    <div
                      className="w-14 h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-sm bg-gradient-to-br from-slate-100 to-slate-200"
                      style={{ border: `2px solid ${roleColor}` }}
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${memberAvatarSeed}&backgroundColor=f8fafc`}
                        alt={member.role}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Allocation badge */}
                    <span className="absolute -bottom-0.5 -right-0.5 text-[11px] font-bold text-ucsd-navy bg-ucsd-gold px-1.5 py-0.5 rounded-full shadow">
                      {member.allocation}
                    </span>
                  </div>

                  {/* Role info and responsibilities */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg lg:text-[1.35rem] font-bold text-ucsd-navy leading-tight">
                      {member.role}
                    </h3>
                    <p className="text-[15px] lg:text-base text-slate-600 leading-snug line-clamp-2">
                      {member.responsibilities}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Student Workers row */}
          {slide.studentWorkers && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-2 flex items-center justify-center gap-3"
            >
              <span className="text-base lg:text-lg font-semibold text-slate-500">Student Workers:</span>
              <div className="flex items-center gap-2.5">
                {slide.studentWorkers.map((student, index) => {
                  // Mix of male and female student avatars
                  const studentAvatarSeeds = ['Alex', 'Emma', 'Ryan', 'Mia'];
                  const studentSeed = studentAvatarSeeds[index] || `student${index}`;
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.1, type: "spring" }}
                      className="relative"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-md border-2 border-ucsd-sky bg-gradient-to-br from-slate-100 to-slate-200">
                        <img
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${studentSeed}&backgroundColor=f8fafc`}
                          alt={student.role}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-[10px] font-bold text-ucsd-navy bg-ucsd-gold px-1.5 py-0.5 rounded-full shadow">
                        {student.allocation}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
              <span className="text-sm text-slate-400 ml-2">(Part-time)</span>
            </motion.div>
          )}

          {/* Stats footer - highlighted banner style */}
          {slide.teamStats && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 80 }}
              className="mt-3 sm:mt-4"
            >
              <div className="relative bg-gradient-to-r from-ucsd-gold/20 via-ucsd-sky/40 to-ucsd-gold/20 rounded-2xl px-8 lg:px-12 py-3.5 lg:py-4 overflow-hidden shadow-lg border-2 border-ucsd-navy/20">
                {/* Decorative elements */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-ucsd-gold via-ucsd-navy to-ucsd-gold" />
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-ucsd-gold via-ucsd-navy to-ucsd-gold" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-20 h-1.5 bg-ucsd-navy/20 rounded-full" />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 bg-ucsd-gold/50 rounded-full blur-sm" />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-3 h-3 bg-ucsd-gold rounded-full" />

                {/* Static decorative dots */}
                <div className="absolute left-12 top-3 w-2 h-2 bg-ucsd-gold/60 rounded-full" />
                <div className="absolute right-16 bottom-3 w-2 h-2 bg-ucsd-sky/80 rounded-full" />

                <div className="flex items-center justify-center gap-10 lg:gap-16">
                  {slide.teamStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className="text-center relative"
                    >
                      <div className="text-4xl lg:text-5xl font-black text-ucsd-navy leading-none">
                        {stat.value}
                      </div>
                      <div className="text-sm lg:text-base font-bold text-ucsd-navy/80 uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Origin Story Layout */}
      {isOriginStory && (() => {
        const storyBeats = slide.storyBeats || [];
        const beatIcons = {
          'Lightbulb': Lightbulb,
          'Landmark': Landmark,
          'GraduationCap': GraduationCap,
          'FlaskConical': FlaskConical,
          'TrendingUp': TrendingUp,
        };
        const beatColors = ['#FFCD00', '#00629B', '#00C6D7', '#6E963B', '#FC8900'];

        const isDarkOrigin = slide.dark;
        return (
          <div className="w-full flex flex-col items-center relative">
            {/* Title section */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-4 md:mb-6 w-full"
            >
              <h1 className={clsx("text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-1.5", isDarkOrigin ? "text-white" : "text-ucsd-navy")}>
                {slide.title}
              </h1>
              <p className={clsx("text-sm sm:text-base md:text-lg font-bold tracking-wide", isDarkOrigin ? "text-white/60" : "text-ucsd-navy/60")}>
                {slide.subtitle}
              </p>
            </motion.div>

            {/* Two-column layout */}
            <div className="flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8 items-center w-full max-w-[1600px]">
              {/* Left: Video */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="w-full lg:w-[48%] flex-shrink-0"
              >
                <div className={clsx("relative rounded-2xl overflow-hidden shadow-2xl", isDarkOrigin ? "ring-1 ring-white/10" : "ring-1 ring-black/10")}>
                  <video
                    src={slide.videoSrc}
                    className="w-full h-auto object-contain bg-black"
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {/* Video label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3">
                    <div className="text-white font-bold text-sm sm:text-base tracking-wide">
                      {slide.videoLabel}
                    </div>
                    {slide.videoCaption && (
                      <div className="text-white/60 text-xs sm:text-sm mt-0.5">
                        {slide.videoCaption}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right: Story beats */}
              <div className="w-full lg:w-[52%] flex flex-col gap-2.5 md:gap-3">
                {storyBeats.map((beat, idx) => {
                  const BeatIcon = beatIcons[beat.icon] || Lightbulb;
                  const color = beatColors[idx % beatColors.length];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.12, duration: 0.5, ease: "easeOut" }}
                      className={clsx(
                        "flex items-start gap-3 md:gap-4 p-2.5 md:p-3.5 rounded-xl border backdrop-blur-sm transition-colors",
                        isDarkOrigin ? "bg-white/5 border-white/8 hover:bg-white/8" : "bg-white/60 border-ucsd-navy/8 hover:bg-white/80 shadow-sm"
                      )}
                    >
                      <div
                        className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: `${color}20`, border: `2px solid ${color}40` }}
                      >
                        <BeatIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={clsx("text-sm md:text-base lg:text-lg font-bold tracking-wide mb-0.5", isDarkOrigin ? "text-white" : "text-ucsd-navy")}>
                          {beat.heading}
                        </div>
                        <div className={clsx("text-xs md:text-sm text-leading-relaxed", isDarkOrigin ? "text-white/65" : "text-ucsd-navy/65")}>
                          {beat.description}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {!isEcosystem && !isPlatformArchitecture && !isPlatformLayers && !isPlatformSimple && !isSolution && !isSolutionVideo && !isCaseStudyHero && !isAssistantCategories && !isKeyTakeaways && !isAgentDevStrategy && !isRoadmap && !isProblemStatement && !isContractReviewChallenge && !isFeatureGrid && !isComparisonTable && !isCompoundArchitecture && !isAgentWorkflow && !isAnalyticsChart && !isTeamGrid && !isTimelineEvolution && !isCampusMetrics && !isApiGateway && !isHostingPipeline && !isIntakeFunnel && !isInnovationFlywheel && !isFlywheelCaseStudy && !isOriginStory && !isHeroList && slide.content && slide.content.length > 0 && (
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
                      isHeroList ? "flex flex-col gap-1.5 sm:gap-2 max-w-7xl w-full" :
                        "flex flex-col text-lg md:text-xl"
          )}
        >
          {isHeroList && <div className="absolute top-5 sm:top-8 bottom-5 sm:bottom-8 left-[1.1rem] sm:left-[2.15rem] w-0.5 sm:w-1 bg-ucsd-blue/30 -z-10" />}
          {slide.content.map((item, index) => {
            const borderColors = ['border-ucsd-navy', 'border-ucsd-sky', 'border-ucsd-blue', 'border-ucsd-gold', 'border-ucsd-poppy-orange', 'border-ucsd-palm-green', 'border-ucsd-tierra-clay', 'border-ucsd-pacific-blue', 'border-ucsd-navy', 'border-ucsd-sky', 'border-ucsd-poppy-orange', 'border-ucsd-palm-green', 'border-ucsd-tierra-clay', 'border-ucsd-navy', 'border-ucsd-blue', 'border-ucsd-pacific-blue', 'border-ucsd-sky'];
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
                  isHeroList && "flex-row items-center gap-2 sm:gap-4"
                )}
              >
                {isFeatureGrid && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-3 rounded-t-2xl" style={{ backgroundColor: topBarColor }} />
                    <div className={clsx("absolute top-0 right-0 p-5 opacity-[0.07] text-7xl font-black pointer-events-none select-none", headerColorClass)}>{index + 1}</div>
                  </>
                )}
                {isHeroList && (
                  <motion.div
                    animate={pulseAnimation}
                    className={clsx("flex-shrink-0 w-9 h-9 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl z-10 relative", !customBgColor && bgColorClass)}
                    style={customBgColor ? { backgroundColor: customBgColor } : {}}
                  >
                    {IconComponent ? <IconComponent size={18} className="text-white drop-shadow-md sm:w-7 sm:h-7" strokeWidth={2.5} /> : <span className="text-lg sm:text-xl font-bold text-white">{index + 1}</span>}
                  </motion.div>
                )}
                <div className={clsx("flex flex-col flex-1", isHeroList && clsx("p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border-l-3 sm:border-l-6 bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all", borderColorClass))}>
                  {item.heading && (
                    <span className={clsx(
                      "font-semibold mb-1",
                      useThreeColumns ? clsx("text-sm uppercase tracking-wide border-b pb-1 mb-2", isDark ? "text-ucsd-sky border-white/20" : "text-ucsd-blue border-ucsd-gold/30") : "text-lg",
                      isGraphicHeavy && "text-base font-bold text-ucsd-blue",
                      isFeatureGrid && clsx("text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-tight pr-20", headerColorClass),
                      isHeroList && "text-sm sm:text-[1.5rem] font-black text-ucsd-navy mb-0 sm:mb-0.5 leading-tight"
                    )}>{item.heading}</span>
                  )}
                  {item.text && (
                    <span className={clsx(
                      "leading-relaxed",
                      isFeatureGrid && "text-lg md:text-xl text-slate-800 font-semibold",
                      isHeroList && "text-[10px] sm:text-base text-slate-700 font-medium leading-snug",
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
  const quarterCircleColor = quarterCircleColors[Math.floor(slide.id) % quarterCircleColors.length];

  // Upper right orb colors - offset by 1 to ensure always different color from lower left
  const upperRightOrbColors = [
    'rgba(252, 137, 0, 0.12)',     // Orange (lighter)
    'rgba(110, 150, 59, 0.12)',    // Green (lighter)
    'rgba(255, 205, 0, 0.12)',     // Gold (lighter)
    'rgba(0, 198, 215, 0.12)',     // Sky blue (lighter)
  ];
  const upperRightOrbColor = upperRightOrbColors[(Math.floor(slide.id) + 1) % upperRightOrbColors.length];

  // ── CAMPUS METRICS: Hero Trio + Categorized Clusters ──
  if (isCampusMetrics) {
    const metrics = slide.metrics || [];
    const heroes = metrics.filter(m => m.tier === 'hero');
    const people = metrics.filter(m => m.category === 'people');
    const academic = metrics.filter(m => m.category === 'academic');
    const heroAccents = ['#FFCD00', '#00629B', '#00C6D7'];
    const peopleAccent = '#FC8900';
    const academicAccent = '#00C6D7';

    return (
      <div className="w-full h-full relative overflow-hidden bg-[#0a1628]">
        {/* ── Background: campus photo with cinematic dark overlay ── */}
        {slide.campusImage && (
          <>
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${slide.campusImage})` }}
            />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0a1628] via-[#0a1628]/75 to-[#0a1628]/50" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a1628]/80 via-transparent to-[#0a1628]/60" />
          </>
        )}

        {/* ── Decorative ambient glows ── */}
        <motion.div
          animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-ucsd-blue rounded-full blur-[160px] z-[2] pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-15%] left-[-10%] w-[40vw] h-[40vw] bg-ucsd-gold rounded-full blur-[140px] z-[2] pointer-events-none"
        />

        {/* ── Content layer ── */}
        <div className="relative z-10 w-full h-full flex flex-col p-4 sm:p-8 md:p-10">

          {/* ── Title block — compact, top-left ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 sm:mb-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-[0.9] drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              {slide.title}
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="h-1 sm:h-1.5 w-20 sm:w-28 bg-ucsd-gold mt-2 origin-left rounded-full"
            />
          </motion.div>

          {/* ── Hero Metrics — the 3 most impressive numbers ── */}
          <div className="flex justify-center items-end gap-8 sm:gap-12 md:gap-16 lg:gap-24 mb-4 sm:mb-6">
            {heroes.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.12, type: "spring", stiffness: 80, damping: 16 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.12, type: "spring", stiffness: 100 }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
                >
                  {metric.value}
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7 + index * 0.12, duration: 0.6, ease: "easeOut" }}
                  className="h-1 w-full max-w-[120px] rounded-full mt-2 mb-1.5 origin-center"
                  style={{ backgroundColor: heroAccents[index] }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.12 }}
                  className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.15em] text-white/70"
                >
                  {metric.label}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* ── Subtle divider ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-4 sm:mb-6"
          />

          {/* ── Category Clusters ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-[1400px] mx-auto w-full">

            {/* People Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 80, damping: 18 }}
              className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-5 sm:px-6 md:px-8 py-3 sm:py-4"
            >
              <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4" style={{ color: peopleAccent }}>
                People
              </div>
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-5">
                {people.map((metric, index) => {
                  const IconComponent = metric.icon ? iconMap[metric.icon] : null;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + index * 0.06 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      {IconComponent && (
                        <IconComponent size={28} className="sm:w-8 sm:h-8 md:w-9 md:h-9 flex-shrink-0" style={{ color: peopleAccent }} strokeWidth={1.5} />
                      )}
                      <div>
                        <div className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-none">
                          {metric.value}
                        </div>
                        <div className="text-[9px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white/50 mt-0.5 leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Academic & Research Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 80, damping: 18 }}
              className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-5 sm:px-6 md:px-8 py-3 sm:py-4"
            >
              <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4" style={{ color: academicAccent }}>
                Academic & Research
              </div>
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-5">
                {academic.map((metric, index) => {
                  const IconComponent = metric.icon ? iconMap[metric.icon] : null;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + index * 0.06 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      {IconComponent && (
                        <IconComponent size={28} className="sm:w-8 sm:h-8 md:w-9 md:h-9 flex-shrink-0" style={{ color: academicAccent }} strokeWidth={1.5} />
                      )}
                      <div>
                        <div className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-none">
                          {metric.value}
                        </div>
                        <div className="text-[9px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white/50 mt-0.5 leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8 text-white/20 text-xs font-bold tracking-widest z-20">UC SAN DIEGO | {slide.id}</div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col relative overflow-hidden transition-colors duration-500 break-words",
        isTimelineEvolution ? "p-1.5 sm:p-3 md:p-4" : isHeroList ? "p-2 sm:p-3 md:p-4" : isContractReviewChallenge ? "p-2 sm:p-2.5 md:p-3" : isTritonAIEvolutionSlide ? "p-1.5 sm:p-2.5 md:p-3" : isPlatformSimple ? "p-2 sm:p-4 md:p-6" : isSolutionVideo ? "p-2 sm:p-3 md:p-4" : isCaseStudyHero ? "p-2 sm:p-4 md:p-6" : isRoadmap ? "p-2 sm:p-4 md:p-5" : isFlywheelCaseStudy ? "p-2 sm:p-3 md:p-4" : isAgentDevStrategy ? "p-2 sm:p-3 md:p-4" : "p-2 sm:p-6 md:p-12",
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
      <div className={clsx("flex-1 w-full h-full z-10 flex flex-col", isTimelineEvolution ? "justify-start" : "justify-center")}>
        {hasImage ? (
          <div className={clsx("h-full items-center gap-8", isGraphicHeavy ? "grid grid-cols-1 lg:grid-cols-12" : "flex flex-col md:flex-row")}>
            <div className={clsx("flex flex-col h-full overflow-y-auto touch-pan-y pr-4 custom-scrollbar", isGraphicHeavy ? "lg:col-span-4 order-2 lg:order-1 pt-4" : "flex-1", isDense ? "justify-start pt-4" : "justify-center")}>
              {renderContent()}
            </div>
            <div className={clsx("h-full flex items-center justify-center p-4", isGraphicHeavy ? "lg:col-span-8 order-1 lg:order-2 bg-gray-50/50 rounded-xl" : "flex-1")}>
              <motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }} src={slide.imageSrc} alt="Slide visual" className={clsx("object-contain rounded-lg shadow-xl bg-white", isGraphicHeavy ? "max-h-[85vh] w-full" : "max-h-[80vh] max-w-full")} />
            </div>
          </div>
        ) : (
          <div className={clsx("flex flex-col h-full w-full", isTitle ? "justify-center items-center text-center" : isTimelineEvolution ? "justify-start pt-0.5 sm:pt-1 overflow-y-auto touch-pan-y custom-scrollbar" : isHeroList ? "justify-start pt-0.5 sm:pt-1 overflow-y-auto touch-pan-y custom-scrollbar" : isContractReviewChallenge ? "justify-start pt-0 sm:pt-0.5 overflow-y-auto touch-pan-y custom-scrollbar" : isTritonAIEvolutionSlide ? "justify-start pt-0.5 sm:pt-1 overflow-y-auto touch-pan-y custom-scrollbar" : isPlatformSimple ? "justify-start pt-0.5 sm:pt-1 overflow-y-auto touch-pan-y custom-scrollbar" : isSolutionVideo ? "justify-start pt-0.5 sm:pt-1 overflow-y-auto touch-pan-y custom-scrollbar" : isCaseStudyHero ? "justify-start pt-0.5 sm:pt-1 overflow-y-auto touch-pan-y custom-scrollbar" : isRoadmap ? "justify-start pt-0.5 sm:pt-1 overflow-y-auto touch-pan-y custom-scrollbar" : isFlywheelCaseStudy ? "justify-start pt-0.5 sm:pt-1 overflow-y-auto touch-pan-y custom-scrollbar" : isAgentDevStrategy ? "justify-start pt-1 sm:pt-2 overflow-y-auto touch-pan-y custom-scrollbar" : "justify-start pt-4 overflow-y-auto touch-pan-y custom-scrollbar")}>
            <div className={clsx("w-full mx-auto", (isTimelineEvolution || isHeroList) && "max-w-[1800px] h-full flex flex-col", (isSolution || isSolutionVideo || isCaseStudyHero || isProblemStatement || isContractReviewChallenge || isFeatureGrid || isCampusMetrics || isAgentDevStrategy || isFlywheelCaseStudy || isHeroList) ? "max-w-[1800px]" : !isTimelineEvolution && "max-w-7xl")}>{renderContent()}</div>
          </div>
        )}
      </div>
      <div className="absolute bottom-1 right-2 sm:bottom-6 sm:right-8 text-ucsd-navy/20 sm:text-ucsd-navy/30 text-[10px] sm:text-xs font-bold tracking-widest z-20">UC SAN DIEGO | {slide.id}</div>
    </div>
  );
};

export default Slide;
