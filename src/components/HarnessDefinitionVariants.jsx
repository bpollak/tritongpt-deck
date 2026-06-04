import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const T = {
  bg: '#f2f0e7',
  paper: '#fbf8ef',
  paper2: '#f7f2e8',
  ink: '#171814',
  muted: '#6e685f',
  faint: '#d9d2c4',
  rule: 'rgba(23,24,20,0.12)',
  coral: '#d47a5f',
  coralDark: '#be634d',
  coralPale: '#efd8cc',
  blue: '#0d5f93',
  bluePale: '#e5f0f2',
  green: '#6f9363',
  black: '#151a1a',
  serif: "'Fraunces','Iowan Old Style','Charter',Georgia,serif",
  mono: "'JetBrains Mono','SF Mono',Menlo,monospace",
  sans: "'Inter','-apple-system','BlinkMacSystemFont','Segoe UI',system-ui,sans-serif"
};

const defaultArchitectureItems = [
  {
    kicker: '01 · LOOP',
    title: 'Keep going',
    body: 'The run can act, inspect the result, and continue until the work is done.',
    icon: 'pipeline',
    color: '#d47a5f',
    fill: '#fff8f2',
    position: 'top'
  },
  {
    kicker: '02 · CONTEXT',
    title: 'Carry the right context',
    body: 'Instructions, files, prior results, and working state stay available while the work is happening.',
    icon: 'library',
    color: '#0d5f93',
    fill: '#e5f0f2',
    position: 'left'
  },
  {
    kicker: '03 · ACTION',
    title: 'Use tools safely',
    body: 'Tools, connectors, APIs, and permissions determine what the harness can touch in real systems.',
    icon: 'mcp',
    color: '#be634d',
    fill: '#fff5ee',
    position: 'right'
  },
  {
    kicker: '04 · SCALE',
    title: 'Split work when needed',
    body: 'Larger jobs can separate planning, building, and verification without losing accountability.',
    icon: 'builder',
    color: '#6f9363',
    fill: '#f6f8ee',
    position: 'bottom'
  }
];

const ease = [0.22, 1, 0.36, 1];
const fade = (delay = 0, y = 14) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease }
});

const lineDraw = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.65, delay, ease }
});

const BackgroundCornerOrbs = () => (
  <>
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.88, 1, 0.88],
        x: [0, 20, 0],
        y: [0, -20, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-bl-full"
      style={{ backgroundColor: 'rgba(110, 150, 59, 0.12)' }}
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-tr-full"
      style={{ backgroundColor: 'rgba(110, 150, 59, 0.15)' }}
    />
  </>
);

const Shell = ({ children }) => (
  <div className="absolute inset-0 overflow-hidden" style={{ background: T.bg, color: T.ink, fontFamily: T.serif }}>
    <BackgroundCornerOrbs />
    <div className="absolute inset-x-0 top-0 h-1" style={{ background: '#f1c232' }} />
    {children}
  </div>
);

const UCSDLogoMark = ({ className = 'h-10 w-32' }) => (
  <img
    src="/media/uc-san-diego-primary-logo.svg"
    alt="UC San Diego"
    className={`${className} object-contain`}
  />
);

const isCitizenAudience = (slide) =>
  Array.isArray(slide?.audiences) && slide.audiences.includes('citizen');

const Marker = ({ children, slide }) => {
  if (isCitizenAudience(slide)) return null;
  return (
    <motion.div
      {...fade(0.05, -4)}
      className="absolute left-[4.8vw] top-[4.2vh] text-[13px] uppercase"
      style={{ color: T.coral, fontFamily: T.mono, fontWeight: 600, letterSpacing: '0.26em' }}
    >
      {children}
    </motion.div>
  );
};

const PartText = ({ parts = [], delay = 0.16, stagger = 0.045 }) => (
  <>
    {parts.map((part, index) => (
      <motion.span
        key={`${part.text}-${index}`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, delay: delay + index * stagger, ease }}
        style={{
          color: part.accent === 'blue' ? T.blue : part.accent ? T.coralDark : part.muted ? T.muted : T.ink,
          fontStyle: part.accent || part.muted ? 'italic' : 'normal',
          fontWeight: part.accent || part.muted ? 400 : 520,
          whiteSpace: part.text.includes('\n') ? 'pre-line' : 'normal'
        }}
      >
        {part.text}
      </motion.span>
    ))}
  </>
);

const jobSpineEntries = [
  { key: 'loop', label: 'LOOP', tone: '#d47a5f' },
  { key: 'context', label: 'CONTEXT', tone: '#0d5f93' },
  { key: 'action', label: 'ACTION', tone: '#be634d' },
  { key: 'scale', label: 'SCALE', tone: '#6f9363' }
];

const JobSpine = ({ activeKey }) => {
  if (!activeKey) return null;
  return (
    <motion.div
      {...fade(0.1, -4)}
      className="absolute right-[4.8vw] top-[4.0vh] flex items-center gap-2"
      style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.2em', fontWeight: 700 }}
    >
      {jobSpineEntries.map((entry, index) => {
        const isActive = entry.key === activeKey;
        return (
          <React.Fragment key={entry.key}>
            {index > 0 && <span style={{ color: T.faint }}>·</span>}
            <span
              style={{
                color: isActive ? entry.tone : T.muted,
                opacity: isActive ? 1 : 0.62,
                borderBottom: isActive ? `2px solid ${entry.tone}` : '2px solid transparent',
                paddingBottom: 2
              }}
            >
              {entry.label}
            </span>
          </React.Fragment>
        );
      })}
    </motion.div>
  );
};

const Header = ({
  slide,
  maxWidth = '74vw',
  titleFontSize = 'clamp(44px, 4.4vw, 70px)',
  subheadFontSize = 'clamp(18px, 1.35vw, 23px)',
  top,
  noWrap = false
}) => (
  <>
    <Marker slide={slide}>{slide.marker}</Marker>
    <JobSpine activeKey={slide.hideSpine ? null : slide.spineActive} />
    <div
      className={`absolute left-[4.8vw] right-[4.8vw] ${top ? '' : isCitizenAudience(slide) ? 'top-[4vh]' : 'top-[8.3vh]'}`}
      style={{ maxWidth, top }}
    >
      <h1 className="leading-[0.98]" style={{ fontSize: titleFontSize, fontWeight: 520, whiteSpace: noWrap ? 'nowrap' : 'normal' }}>
        <PartText parts={slide.parts} />
      </h1>
      {slide.subhead && (
        <motion.div {...fade(0.38)} className="mt-2 italic" style={{ color: T.muted, fontSize: subheadFontSize }}>
          {slide.subhead}
        </motion.div>
      )}
    </div>
  </>
);

const Content = ({ children, className = '', style }) => (
  <div className={`absolute left-[4.8vw] right-[4.8vw] top-[31vh] bottom-[12vh] ${className}`} style={style}>
    {children}
  </div>
);

const Card = ({ children, delay = 0.35, className = '', style }) => (
  <motion.div
    {...fade(delay)}
    className={`rounded-[7px] border bg-white/65 ${className}`}
    style={{ borderColor: T.faint, boxShadow: '0 1px 0 rgba(23,24,20,0.03)', ...style }}
  >
    {children}
  </motion.div>
);

const Kicker = ({ children, className = '', style }) => (
  <div className={`text-[12px] uppercase ${className}`} style={{ color: T.coralDark, fontFamily: T.mono, fontWeight: 600, letterSpacing: '0.22em', ...style }}>
    {children}
  </div>
);

const MiniIcon = ({ type = 'dot', color = T.coralDark, width, height, x, y, className }) => {
  const common = { fill: 'none', stroke: color, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const extraProps = {};
  if (width != null) extraProps.width = width;
  if (height != null) extraProps.height = height;
  if (x != null) extraProps.x = x;
  if (y != null) extraProps.y = y;
  return (
    <svg viewBox="0 0 52 52" className={className ?? 'h-10 w-10'} aria-hidden="true" {...extraProps}>
      {type === 'builder' && (
        <>
          <rect x="12" y="12" width="28" height="28" rx="6" {...common} />
          <path d="M20 27h12M26 21v12" {...common} />
        </>
      )}
      {type === 'library' && (
        <>
          <path d="M14 14h17a7 7 0 0 1 7 7v17H21a7 7 0 0 0-7 7V14z" {...common} />
          <path d="M21 21h11M21 28h10" {...common} />
        </>
      )}
      {type === 'mcp' && (
        <>
          <circle cx="16" cy="18" r="5" {...common} />
          <circle cx="36" cy="18" r="5" {...common} />
          <circle cx="26" cy="36" r="5" {...common} />
          <path d="M20 21l4 10M32 21l-4 10" {...common} />
        </>
      )}
      {type === 'api' && (
        <>
          <path d="M14 19l-7 7 7 7M38 19l7 7-7 7" {...common} />
          <path d="M30 14l-8 24" {...common} />
        </>
      )}
      {type === 'observe' && (
        <>
          <path d="M8 28s7-12 18-12 18 12 18 12-7 12-18 12S8 28 8 28z" {...common} />
          <circle cx="26" cy="28" r="5" {...common} />
        </>
      )}
      {type === 'pipeline' && (
        <>
          <rect x="8" y="16" width="10" height="20" rx="3" {...common} />
          <rect x="22" y="16" width="10" height="20" rx="3" {...common} />
          <rect x="36" y="16" width="10" height="20" rx="3" {...common} />
          <path d="M18 26h4M32 26h4" {...common} />
        </>
      )}
      {type === 'gateway' && (
        <>
          <rect x="10" y="12" width="32" height="28" rx="5" {...common} />
          <path d="M17 20h18M17 27h12M17 34h16" {...common} />
        </>
      )}
      {type === 'template' && (
        <>
          <path d="M16 9h15l7 7v27H16V9z" {...common} />
          <path d="M31 9v8h7M21 25h12M21 32h10" {...common} />
        </>
      )}
      {type === 'people' && (
        <>
          <circle cx="20" cy="19" r="6" {...common} />
          <circle cx="35" cy="22" r="5" {...common} />
          <path d="M10 40c2-8 7-12 10-12s8 4 10 12M29 39c1-5 4-8 7-8 2 0 5 2 7 8" {...common} />
        </>
      )}
      {type === 'code' && (
        <>
          <rect x="8" y="12" width="36" height="28" rx="5" {...common} />
          <path d="M17 24l-5 4 5 4M35 24l5 4-5 4M29 20l-6 16" {...common} />
        </>
      )}
      {type === 'chat' && (
        <>
          <path d="M10 15h32v20H23l-9 7v-7h-4V15z" {...common} />
          <path d="M18 23h16M18 29h11" {...common} />
        </>
      )}
      {type === 'reasoning' && (
        <>
          <circle cx="16" cy="18" r="5" {...common} />
          <circle cx="36" cy="18" r="5" {...common} />
          <circle cx="26" cy="36" r="5" {...common} />
          <path d="M20 20h12M18 22l5 10M34 22l-5 10" {...common} />
        </>
      )}
      {type === 'image' && (
        <>
          <rect x="10" y="13" width="32" height="26" rx="4" {...common} />
          <circle cx="34" cy="21" r="3" {...common} />
          <path d="M14 35l9-10 7 7 4-5 8 8" {...common} />
        </>
      )}
      {type === 'ocr' && (
        <>
          <path d="M12 20v-7h7M33 13h7v7M40 32v7h-7M19 39h-7v-7" {...common} />
          <path d="M17 24h18M17 30h14" {...common} />
        </>
      )}
      {type === 'lane' && (
        <>
          <path d="M10 14h18l6 6h8v20H10V14z" {...common} />
          <path d="M17 29h18" {...common} />
        </>
      )}
      {type === 'laptop' && (
        <>
          <rect x="10" y="13" width="32" height="20" rx="2.5" {...common} />
          <path d="M6 38h40" {...common} />
          <path d="M22 38h8" {...common} />
        </>
      )}
      {type === 'container' && (
        <>
          <rect x="8" y="12" width="36" height="9" rx="1.6" {...common} />
          <rect x="8" y="22" width="36" height="9" rx="1.6" {...common} />
          <rect x="8" y="32" width="36" height="9" rx="1.6" {...common} />
          <circle cx="13" cy="16.5" r="0.9" fill={color} stroke="none" />
          <circle cx="13" cy="26.5" r="0.9" fill={color} stroke="none" />
          <circle cx="13" cy="36.5" r="0.9" fill={color} stroke="none" />
        </>
      )}
      {type === 'lock' && (
        <>
          <rect x="12" y="22" width="28" height="20" rx="3" {...common} />
          <path d="M18 22v-5a8 8 0 0 1 16 0v5" {...common} />
          <circle cx="26" cy="32" r="2.5" {...common} />
        </>
      )}
      {type === 'folder' && (
        <>
          <path d="M8 16h12l4 4h20v20H8V16z" {...common} />
        </>
      )}
      {type === 'calendar' && (
        <>
          <rect x="9" y="14" width="34" height="28" rx="3" {...common} />
          <path d="M9 22h34M18 10v8M34 10v8" {...common} />
        </>
      )}
      {type === 'enterprise' && (
        <>
          <path d="M10 42V18l16-8 16 8v24" {...common} />
          <path d="M10 42h32" {...common} />
          <rect x="18" y="24" width="5" height="5" {...common} />
          <rect x="29" y="24" width="5" height="5" {...common} />
          <rect x="22" y="33" width="8" height="9" {...common} />
        </>
      )}
      {type === 'docker' && (
        <>
          <rect x="10" y="22" width="6" height="6" {...common} />
          <rect x="18" y="22" width="6" height="6" {...common} />
          <rect x="26" y="22" width="6" height="6" {...common} />
          <rect x="18" y="14" width="6" height="6" {...common} />
          <path d="M8 30c2 6 8 8 14 8s12-2 14-8" {...common} />
          <path d="M34 22c-1-2-3-3-5-3" {...common} />
        </>
      )}
      {type === 'github' && (
        <>
          <path d="M26 8a18 18 0 0 0-6 35c1 0 1.4-0.4 1.4-1v-3.5c-5 1-6-2.4-6-2.4-0.8-2-2-2.6-2-2.6-1.6-1.1 0.1-1.1 0.1-1.1 1.8 0.1 2.7 1.8 2.7 1.8 1.6 2.8 4.2 2 5.2 1.5 0.2-1.2 0.6-2 1.2-2.5-4-0.4-8.2-2-8.2-8.8 0-2 0.7-3.6 1.8-4.8-0.2-0.5-0.8-2.3 0.2-4.8 0 0 1.5-0.5 5 1.8a17 17 0 0 1 9 0c3.4-2.3 5-1.8 5-1.8 1 2.5 0.4 4.3 0.2 4.8 1.1 1.2 1.8 2.8 1.8 4.8 0 6.8-4.2 8.4-8.2 8.8 0.6 0.6 1.2 1.6 1.2 3.4v5c0 0.6 0.4 1 1.4 1A18 18 0 0 0 26 8z" fill={color} stroke="none" />
        </>
      )}
      {type === 'dot' && <circle cx="26" cy="26" r="13" {...common} />}
    </svg>
  );
};

const Model = ({ x, y, r = 44, blue = false, delay = 0.4, loop = false }) => (
  <motion.g initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay, ease }}>
    <circle cx={x} cy={y} r={r} fill={T.bg} stroke={blue ? T.blue : T.ink} strokeWidth="1.4" />
    <text x={x} y={y + 5} textAnchor="middle" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: r * 0.9, fontWeight: 520 }} fill={blue ? T.blue : T.ink}>M</text>
    {loop && (
      <>
        <motion.path
          {...lineDraw(delay + 0.48)}
          d={`M ${x - r * 0.53} ${y + r * 0.03} C ${x - r * 0.48} ${y + r * 0.58}, ${x + r * 0.46} ${y + r * 0.62}, ${x + r * 0.54} ${y + r * 0.03}`}
          fill="none"
          stroke={T.coralDark}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          {...fade(delay + 0.9, 0)}
          d={`M ${x + r * 0.54} ${y + r * 0.03} l -7 4 l 2 -9 z`}
          fill={T.coralDark}
        />
      </>
    )}
  </motion.g>
);

const Arrow = ({ x1, y1, x2, y2, color = T.ink, delay = 0.4, dashed = false }) => (
  <motion.g {...lineDraw(delay)}>
    <line x1={x1} y1={y1} x2={x2 - 12} y2={y2} stroke={color} strokeWidth="1.4" strokeDasharray={dashed ? '5 7' : 'none'} />
    <polygon points={`${x2},${y2} ${x2 - 12},${y2 - 5} ${x2 - 12},${y2 + 5}`} fill={color} />
  </motion.g>
);

const Pill = ({ children, delay = 0.4, tone = 'coral' }) => (
  <motion.div
    {...fade(delay, 8)}
    className="rounded-[5px] border px-4 py-3 text-center"
    style={{
      borderColor: tone === 'blue' ? '#b9d3dc' : T.coralPale,
      background: tone === 'blue' ? T.bluePale : '#fff8f2',
      color: tone === 'blue' ? T.blue : T.coralDark,
      fontFamily: T.mono,
      fontSize: 15,
      fontWeight: 600
    }}
  >
    {children}
  </motion.div>
);

// Inline M-circle that ties the word "model" in the tagline to the M circles in the diagram below
const InlineMCircle = () => (
  <span
    className="inline-flex items-center justify-center align-middle rounded-full border"
    style={{
      width: '1.15em',
      height: '1.15em',
      borderColor: 'currentColor',
      color: 'inherit',
      fontFamily: T.serif,
      fontStyle: 'italic',
      fontSize: '0.78em',
      fontWeight: 520,
      lineHeight: 1,
      background: '#fff',
      verticalAlign: '-0.12em',
      marginRight: '0.02em'
    }}
  >
    M
  </span>
);

const renderTaglineWithMCircle = (text) => {
  if (typeof text !== 'string') return text;
  const re = /model/i;
  const match = text.match(re);
  if (!match) return text;
  const idx = match.index;
  const matched = match[0]; // "model" / "Model"
  const before = text.slice(0, idx);
  const rest = matched.slice(1); // "odel"
  const after = text.slice(idx + matched.length);
  return (
    <>
      {before}
      <InlineMCircle />
      {rest}
      {after}
    </>
  );
};

const HarnessQuestionVariant = ({ slide }) => {
  const headlineText = (slide.parts || []).map((part) => part.text || '').join('');
  const hasLongHeadline = headlineText.length > 36;

  return (
  <Shell>
    <Marker slide={slide}>{slide.marker}</Marker>
    <motion.div {...fade(0.18)} className="absolute left-[4.8vw] top-[4vh] text-[13px] uppercase" style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em' }}>
      {slide.kicker}
    </motion.div>
    <h1
      className="absolute left-[4.8vw] right-[4.8vw] top-[9vh]"
      style={{
        fontSize: hasLongHeadline ? 'clamp(46px, 5vw, 78px)' : 'clamp(54px, 6.2vw, 100px)',
        fontWeight: 520,
        lineHeight: hasLongHeadline ? 0.98 : 0.95
      }}
    >
      <PartText parts={slide.parts} delay={0.25} />
    </h1>
    {slide.topTagline && (
      <motion.div
        {...fade(0.62)}
        className="absolute left-[4.8vw] right-[4.8vw] italic"
        style={{
          top: hasLongHeadline ? '24vh' : '20vh',
          color: T.coralDark,
          fontFamily: T.serif,
          fontSize: hasLongHeadline ? 'clamp(22px, 1.9vw, 32px)' : 'clamp(26px, 2.4vw, 40px)',
          lineHeight: 1.18,
          fontWeight: 480,
          maxWidth: '88vw'
        }}
      >
        {renderTaglineWithMCircle(slide.topTagline)}
      </motion.div>
    )}
    {(slide.contextCards || []).length > 0 && (
      <div className="absolute left-[4.8vw] right-[4.8vw] grid grid-cols-2 gap-8" style={{ top: hasLongHeadline ? '32vh' : '27vh' }}>
        {slide.contextCards.map((card, index) => (
          <Card key={card.title} delay={0.74 + index * 0.1} className="p-7" style={index === 1 ? { background: '#fff8f2', borderColor: T.coralPale } : { background: '#f3f8fa', borderColor: '#cfdde2' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="uppercase"
                  style={{
                    color: index === 0 ? T.blue : T.coralDark,
                    fontFamily: T.mono,
                    fontSize: 'clamp(28px, 2.7vw, 44px)',
                    lineHeight: 1,
                    fontWeight: 800,
                    letterSpacing: '0.04em'
                  }}
                >
                  {card.kicker}
                </div>
                <div className="mt-3 italic" style={{ fontSize: 22, lineHeight: 1.15, color: T.muted, maxWidth: '24ch' }}>
                  {card.title}
                </div>
              </div>
              {index === 0 ? (
                <div className="flex items-center gap-2 pt-1.5" style={{ color: T.blue }}>
                  <div className="rounded-[5px] border px-3 py-2 text-[12px]" style={{ borderColor: '#b9d3dc', background: T.bluePale, fontFamily: T.mono, fontWeight: 800 }}>PROMPT</div>
                  <span style={{ color: '#9ab4c1' }}>→</span>
                  <div className="rounded-full border px-3 py-2 text-[12px]" style={{ borderColor: '#b9d3dc', background: '#fff', fontFamily: T.mono, fontWeight: 800 }}>ANSWER</div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 pt-1.5" style={{ color: T.coralDark, fontFamily: T.mono }}>
                  {['context', 'tools', 'loop'].map((label) => (
                    <span key={label} className="rounded-full border px-3 py-1.5 text-[11px] uppercase" style={{ borderColor: T.coralPale, background: '#fff' }}>
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-6">
              {index === 0 ? (
                <div>
                  <div className="grid grid-cols-[1fr_104px_1fr] items-center gap-4">
                    <div className="rounded-[7px] border px-5 py-3.5 text-center" style={{ borderColor: '#b9d3dc', background: T.bluePale, color: T.blue, fontFamily: T.mono, fontSize: 14, fontWeight: 800 }}>
                      user asks
                    </div>
                    <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border mx-auto" style={{ borderColor: T.blue, color: T.blue, fontFamily: T.serif, fontStyle: 'italic', fontSize: 44 }}>M</div>
                    <div className="rounded-[7px] border px-5 py-3.5 text-center" style={{ borderColor: '#b9d3dc', background: '#fff', color: T.blue, fontFamily: T.mono, fontSize: 14, fontWeight: 800 }}>
                      answer returns
                    </div>
                  </div>
                  {/* Linear flow: a packet travels left → right once, then resets — emphasizes one-shot */}
                  <svg className="mt-3 w-full" height="18" viewBox="0 0 400 18" preserveAspectRatio="none" aria-hidden="true">
                    <line x1="6" y1="9" x2="388" y2="9" stroke="#b9d3dc" strokeWidth="1.4" strokeDasharray="4 5" />
                    <polygon points="388,9 380,4 380,14" fill="#b9d3dc" />
                    <circle r="4.5" fill={T.blue}>
                      <animate attributeName="cx" values="6;388;388" keyTimes="0;0.78;1" dur="8s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="9;9;9" keyTimes="0;0.78;1" dur="8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.78;0.82;0.97;1" dur="8s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
              ) : (
                <div className="rounded-[9px] border px-5 py-4" style={{ borderColor: T.coralPale, background: '#fff' }}>
                  <div className="grid grid-cols-[1fr_104px_1fr] items-center gap-4">
                    <div className="space-y-2.5">
                      {['files', 'rules', 'memory'].map((label) => (
                        <div key={label} className="rounded-[5px] border px-3 py-2 text-center text-[12px]" style={{ borderColor: T.faint, color: T.muted, fontFamily: T.mono, fontWeight: 800 }}>{label}</div>
                      ))}
                    </div>
                    {/* Cyclic loop: dashed ring rotates continuously around the M */}
                    <div className="relative flex h-[120px] w-[120px] items-center justify-center mx-auto">
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 120 120" aria-hidden="true">
                        <circle cx="60" cy="60" r="55" fill="none" stroke={T.coralPale} strokeWidth="1.2" strokeDasharray="3 4" />
                        <circle cx="60" cy="60" r="55" fill="none" stroke={T.coral} strokeWidth="1.6" strokeDasharray="9 80" strokeLinecap="round">
                          <animate attributeName="stroke-dashoffset" from="0" to="-89" dur="8s" repeatCount="indefinite" />
                        </circle>
                        <circle r="4" fill={T.coral}>
                          <animateMotion dur="8s" repeatCount="indefinite" path="M 60 5 A 55 55 0 1 1 60 115 A 55 55 0 1 1 60 5" />
                        </circle>
                      </svg>
                      <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border" style={{ borderColor: T.coral, background: '#fff', color: T.coralDark, fontFamily: T.serif, fontStyle: 'italic', fontSize: 52 }}>
                        M
                        <span className="absolute bottom-[-8px] right-[-8px] rounded-full px-2 py-0.5 text-[11px]" style={{ background: T.coral, color: '#fff', fontFamily: T.mono, fontStyle: 'normal' }}>↺</span>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      {['read', 'edit', 'verify'].map((label) => (
                        <div key={label} className="rounded-[5px] border px-3 py-2 text-center text-[12px]" style={{ borderColor: T.coralPale, color: T.coralDark, fontFamily: T.mono, fontWeight: 800 }}>{label}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* outcome row — what you actually get */}
            <div className="mt-6 rounded-[7px] border-t pt-4" style={{ borderColor: index === 1 ? T.coralPale : '#d9e2e6' }}>
              {index === 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase" style={{ color: '#7a96a4', fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 700 }}>You get</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded-[14px] border px-3 py-1.5 text-[13px]" style={{ borderColor: '#b9d3dc', background: '#fff', color: T.blue, fontFamily: T.serif }}>
                      &ldquo;Here&rsquo;s a summary&hellip;&rdquo;
                    </span>
                    <span className="text-[11px]" style={{ color: '#9ab4c1', fontFamily: T.mono, fontWeight: 700, letterSpacing: '0.18em' }}>
                      ▣ END OF TURN
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 700 }}>You get</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded-[5px] border px-2.5 py-1.5 text-[12px]" style={{ borderColor: T.coralPale, background: '#fff', color: T.coralDark, fontFamily: T.mono, fontWeight: 700 }}>
                      📄 contract.docx
                    </span>
                    <span className="rounded-[5px] border px-2.5 py-1.5 text-[12px]" style={{ borderColor: T.coralPale, background: '#fff', color: T.coralDark, fontFamily: T.mono, fontWeight: 700 }}>
                      ✓ routed for sign-off
                    </span>
                    <span className="rounded-[5px] border px-2.5 py-1.5 text-[12px]" style={{ borderColor: T.coralPale, background: '#fff', color: T.coralDark, fontFamily: T.mono, fontWeight: 700 }}>
                      🗒 logged
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-5" style={{ color: T.muted, fontSize: 19.5, lineHeight: 1.28 }}>
              {card.body}
            </div>
          </Card>
        ))}
      </div>
    )}
    {slide.bottomLine && (
      <motion.div
        {...fade(1.0)}
        className="absolute left-[4.8vw] right-[4.8vw] top-[82vh] flex items-center gap-5"
      >
        {slide.bottomLineLabel && (
          <span
            className="rounded-[5px] px-3 py-2 text-[12px]"
            style={{
              background: T.coral,
              color: '#fff',
              fontFamily: T.mono,
              fontWeight: 800,
              letterSpacing: '0.22em',
              whiteSpace: 'nowrap'
            }}
          >
            {slide.bottomLineLabel}
          </span>
        )}
        <div style={{ fontSize: 'clamp(20px, 1.7vw, 28px)', fontWeight: 560, lineHeight: 1.2 }}>
          {slide.bottomLine}
        </div>
      </motion.div>
    )}
  </Shell>
  );
};

const HarnessPressureVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} maxWidth="84vw" />
    <Content className="grid grid-cols-[38%_1fr] gap-10 items-center">
      <Card delay={0.42} className="p-7">
        <Kicker>The signal changed</Kicker>
        <div className="mt-5 space-y-5">
          {(slide.signals || []).map((signal, index) => (
            <motion.div key={`${signal.label}-${index}`} {...fade(0.62 + index * 0.09)} className="border-b pb-4" style={{ borderColor: T.rule }}>
              <div style={{ color: signal.accent ? T.coralDark : T.ink, fontSize: 30, fontWeight: 560 }}>{signal.label}</div>
              <div className="mt-1" style={{ color: T.muted, fontSize: 18 }}>{signal.note}</div>
            </motion.div>
          ))}
        </div>
      </Card>
      <div>
        <div className="grid grid-cols-3 gap-5">
          {(slide.flow || []).map((item, index) => (
            <Card key={`${item.title}-${index}`} delay={0.55 + index * 0.11} className="min-h-[210px] p-6">
              <div className="text-[13px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.18em' }}>{item.kicker}</div>
              <div className="mt-5" style={{ fontSize: 34, lineHeight: 1.05, fontWeight: 560 }}>{item.title}</div>
              <div className="mt-4" style={{ color: T.muted, fontSize: 18, lineHeight: 1.35 }}>{item.body}</div>
            </Card>
          ))}
        </div>
        <motion.div {...fade(1.05)} className="mt-8 rounded-[7px] border p-5" style={{ borderColor: T.coralPale, background: '#fff5ee', fontSize: 23 }}>
          <span className="text-[12px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.2em' }}>Manager implication</span>
          <span className="ml-4">Evaluate depth, judgment, and artifacts — not polished text alone.</span>
        </motion.div>
      </div>
    </Content>
  </Shell>
);

const HarnessRubricVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} maxWidth="86vw" />
    <Content>
      <div className="grid h-full grid-cols-5 gap-4">
        {(slide.levels || []).map((level, index) => (
          <motion.div
            key={`${level.title}-${index}`}
            {...fade(0.42 + index * 0.08)}
            className="flex flex-col justify-end rounded-[8px] border bg-white/60 p-5"
            style={{ borderColor: level.highlight ? T.coral : T.faint }}
          >
            <div className="text-[13px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.18em' }}>Level {index + 1}</div>
            <div className="mt-3" style={{ fontSize: 30, lineHeight: 1.05, fontWeight: 600 }}>{level.title}</div>
            <div className="mt-4" style={{ color: T.muted, fontSize: 17, lineHeight: 1.35 }}>{level.body}</div>
            {level.highlight && (
              <div className="mt-5 rounded-[5px] px-3 py-2 text-center" style={{ background: T.coral, color: '#fff', fontFamily: T.mono, fontSize: 13, fontWeight: 700 }}>
                SHIPPED WORK
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Content>
  </Shell>
);

const HarnessDefinitionCoreVariant = ({ slide }) => {
  const wrapped = slide.mode === 'wrapped';
  return (
    <Shell>
      <Header slide={slide} maxWidth="78vw" />
      <Content>
        <svg viewBox="0 0 1200 420" className="h-full w-full">
          {!wrapped && (
            <>
              <motion.text {...fade(0.55)} x="270" y="210" textAnchor="end" style={{ fontFamily: T.serif, fontSize: 26, fontStyle: 'italic' }} fill={T.muted}>"answer this"</motion.text>
              <Arrow x1={300} y1={202} x2={475} y2={202} delay={0.7} />
              <Model x={555} y={202} r={60} delay={0.85} />
              <Arrow x1={625} y1={202} x2={805} y2={202} delay={1.0} />
              <motion.g {...fade(1.14)}>
                <rect x="810" y="178" width="90" height="48" rx="6" fill={T.coralDark} />
                <text x="855" y="208" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 15, fontWeight: 700 }} fill="#fff">STOP</text>
              </motion.g>
              <motion.text {...fade(1.28)} x="555" y="325" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 24, fontStyle: 'italic' }} fill={T.muted}>
                no memory · no follow-through · no recovery
              </motion.text>
            </>
          )}
          {wrapped && (
            <>
              <motion.text {...fade(0.48)} x="655" y="55" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 16, letterSpacing: '0.26em', fontWeight: 700 }} fill={T.coralDark}>
                ACT · OBSERVE · ADJUST
              </motion.text>
              {/* User figure — the human who hands a goal to the harness */}
              <motion.g {...fade(0.42)}>
                <circle cx="80" cy="178" r="14" fill="none" stroke={T.blue} strokeWidth="1.8" />
                <path d="M 56 230 C 60 206, 100 206, 104 230" fill="none" stroke={T.blue} strokeWidth="1.8" strokeLinecap="round" />
                <text x="80" y="260" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.22em', fontWeight: 700 }} fill={T.blue}>YOU</text>
              </motion.g>
              <motion.text {...fade(0.6)} x="200" y="195" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 24, fontStyle: 'italic' }} fill={T.blue}>"do this"</motion.text>
              <motion.text {...fade(0.6)} x="200" y="222" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.2em', fontWeight: 700 }} fill={T.muted}>THE GOAL</motion.text>
              <Arrow x1={108} y1={205} x2={260} y2={205} delay={0.7} color={T.blue} />
              <motion.rect {...lineDraw(0.78)} x="270" y="80" width="770" height="250" rx="14" fill="none" stroke={T.coral} strokeWidth="1.6" />
              <motion.text {...fade(0.92)} x="300" y="116" style={{ fontFamily: T.mono, fontSize: 14, letterSpacing: '0.22em', fontWeight: 600 }} fill={T.coralDark}>HARNESS</motion.text>
              <Model x={595} y={205} r={58} delay={1.05} loop />
              {['take action', 'observe', 'adjust'].map((label, index) => {
                const y = 135 + index * 70;
                return (
                  <g key={`${label}-${index}`}>
                    <Arrow x1={660} y1={205} x2={800} y2={y} color={T.coralDark} delay={1.15 + index * 0.09} dashed />
                    <motion.g {...fade(1.28 + index * 0.09)}>
                      <rect x="812" y={y - 22} width="150" height="44" rx="18" fill="#fff8f2" stroke={T.coralPale} />
                      <text x="887" y={y + 6} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 600 }} fill={T.coralDark}>{label}</text>
                    </motion.g>
                  </g>
                );
              })}
              <motion.text {...fade(1.55)} x="655" y="371" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 26, fontStyle: 'italic' }} fill={T.ink}>
                the operating loop · what lets the work continue
              </motion.text>
            </>
          )}
        </svg>
      </Content>
    </Shell>
  );
};

const EquationIcon = ({ type, color = T.ink }) => {
  if (type === 'harness') {
    return (
      <svg viewBox="0 0 64 50" className="h-12 w-12">
        <rect x="12" y="8" width="40" height="32" rx="6" fill="none" stroke={color} strokeWidth="2.4" />
        <circle cx="23" cy="42" r="4" fill={color} />
        <circle cx="42" cy="42" r="4" fill={color} />
      </svg>
    );
  }

  if (type === 'agent') {
    return (
      <div
        className="relative flex h-12 w-[112px] items-center justify-center rounded-[6px] px-2"
        style={{ background: color, color: '#fff', fontFamily: T.serif, letterSpacing: '0.01em' }}
      >
        <span style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 620 }}>M</span>
        <span className="mx-1.5" style={{ fontSize: 18, fontStyle: 'normal', fontWeight: 500, opacity: 0.85 }}>+</span>
        <span style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 620 }}>H</span>
        <span className="mx-1.5" style={{ fontSize: 18, fontStyle: 'normal', fontWeight: 500, opacity: 0.85 }}>=</span>
        <span style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 620 }}>C</span>
        <span className="absolute bottom-[-5px] left-5 h-2 w-2 rounded-full" style={{ background: color }} />
        <span className="absolute bottom-[-5px] right-5 h-2 w-2 rounded-full" style={{ background: color }} />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: color, color }}>
      <span style={{ fontFamily: T.serif, fontSize: 27, fontStyle: 'italic', fontWeight: 520 }}>M</span>
    </div>
  );
};

const HarnessDefinitionEquationVariant = ({ slide }) => (
  <Shell>
    <Marker slide={slide}>{slide.marker}</Marker>
    {slide.kicker && (
      <motion.div
        {...fade(0.18)}
        className="absolute left-[4.8vw] top-[4vh] text-[13px] uppercase"
        style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em' }}
      >
        {slide.kicker}
      </motion.div>
    )}
    <div className="absolute left-[4.8vw] right-[4.8vw] top-[9vh]">
      <h1 className="leading-[1.02]" style={{ fontSize: 'clamp(44px, 4.35vw, 74px)', fontWeight: 520 }}>
        <PartText parts={slide.parts} />
      </h1>
    </div>
    <div className="absolute left-[5.5vw] right-[5.5vw] top-[25vh] bottom-[20vh] grid grid-cols-[1fr_72px_1fr_72px_1fr] items-stretch">
      {(slide.equation || []).map((item, index) => (
        <React.Fragment key={`${item.title}-${index}`}>
          <Card
            delay={0.75 + index * 0.14}
            className="flex flex-col items-center p-7 text-center"
            style={{
              background: item.result ? '#f8f1ea' : 'rgba(255,255,255,0.55)',
              borderColor: item.result ? T.coralPale : 'rgba(217,210,196,0.62)'
            }}
          >
            <EquationIcon type={item.icon} color={item.color || T.ink} />
            <div className="mt-6" style={{ fontSize: 40, lineHeight: 1, fontWeight: 560 }}>{item.title}</div>
            <div className="mt-3 text-[13px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.2em', fontWeight: 700 }}>
              {item.kicker}
            </div>
            <div className="mt-2.5" style={{ color: item.wordColor || T.coralDark, fontSize: 52, lineHeight: 1, fontStyle: 'italic', fontWeight: 430 }}>
              {item.word}
            </div>
            {item.chips && item.chips.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {item.chips.map((chip) => {
                  const accentColor = item.result ? T.blue : T.coralDark;
                  const palette = item.result
                    ? { borderColor: '#b9d3dc', background: '#fff', color: T.blue }
                    : { borderColor: T.coralPale, background: '#fff', color: T.coralDark };
                  return (
                    <span
                      key={chip}
                      className="rounded-[5px] border px-3 py-1.5 text-[14px]"
                      style={{
                        ...palette,
                        fontFamily: T.mono,
                        fontWeight: 700,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {chip}
                    </span>
                  );
                })}
              </div>
            )}
          </Card>
          {index < (slide.equation || []).length - 1 && (
            <motion.div
              {...fade(0.92 + index * 0.14, 0)}
              className="flex items-center justify-center"
              style={{ color: T.muted, fontFamily: T.serif, fontSize: 68, fontWeight: 300 }}
            >
              {index === 0 ? '+' : '='}
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
    {slide.concrete && slide.concrete.items && slide.concrete.items.length === 3 && (
      <motion.div
        {...fade(1.18)}
        className="absolute left-[5.5vw] right-[5.5vw] top-[68vh] grid grid-cols-[1fr_72px_1fr_72px_1fr] items-center"
      >
        {slide.concrete.items.map((label, index) => (
          <React.Fragment key={`${label}-${index}`}>
            <div className="flex items-center justify-center gap-2">
              {index === 0 && slide.concrete.label && (
                <span
                  className="text-[10px] uppercase"
                  style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 700 }}
                >
                  {slide.concrete.label}
                </span>
              )}
              <span
                className="rounded-[6px] border px-3 py-2 text-[13px]"
                style={{
                  borderColor: index === 2 ? T.coralPale : '#d6d0c2',
                  background: index === 2 ? '#fff8f2' : '#fff',
                  color: index === 2 ? T.coralDark : T.ink,
                  fontFamily: T.mono,
                  fontWeight: 700
                }}
              >
                {label}
              </span>
            </div>
            {index < 2 && (
              <div
                className="flex items-center justify-center"
                style={{ color: T.muted, fontFamily: T.serif, fontSize: 28, fontWeight: 300 }}
              >
                {index === 0 ? '+' : '='}
              </div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    )}
    {slide.bottomLine && (
      <motion.div
        {...fade(1.38)}
        className="absolute left-[4.8vw] right-[4.8vw] top-[86vh] flex items-center gap-5"
      >
        {slide.bottomLineLabel && (
          <span
            className="rounded-[5px] px-3 py-2 text-[12px]"
            style={{
              background: T.coral,
              color: '#fff',
              fontFamily: T.mono,
              fontWeight: 800,
              letterSpacing: '0.22em',
              whiteSpace: 'nowrap'
            }}
          >
            {slide.bottomLineLabel}
          </span>
        )}
        <div style={{ fontSize: 'clamp(20px, 1.7vw, 28px)', fontWeight: 560, lineHeight: 1.2 }}>
          {slide.bottomLine}
        </div>
      </motion.div>
    )}
  </Shell>
);

const HarnessWorkProductVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} maxWidth="82vw" />
    <Content className="grid grid-cols-[1fr_34%] gap-10 items-center">
      <div>
        <div className="grid grid-cols-4 gap-4">
          {(slide.pipeline || []).map((step, index) => (
            <React.Fragment key={`${step.title}-${index}`}>
              <Card delay={0.42 + index * 0.11} className="min-h-[185px] p-5">
                <div className="text-[12px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.18em' }}>{step.kicker}</div>
                <div className="mt-5" style={{ fontSize: 29, lineHeight: 1.04, fontWeight: 600 }}>{step.title}</div>
                <div className="mt-3" style={{ color: T.muted, fontSize: 16, lineHeight: 1.35 }}>{step.body}</div>
              </Card>
            </React.Fragment>
          ))}
        </div>
        <motion.div {...fade(1.02)} className="mt-8 grid grid-cols-3 gap-4">
          {(slide.outcomes || []).map((outcome, index) => (
            <div key={`${outcome}-${index}`} className="rounded-[6px] border px-4 py-3 text-center" style={{ borderColor: T.coralPale, background: '#fff8f2', color: T.coralDark, fontFamily: T.mono, fontSize: 15, fontWeight: 700 }}>
              {outcome}
            </div>
          ))}
        </motion.div>
      </div>
      <Card delay={0.75} className="p-7">
        <Kicker>Why it matters</Kicker>
        <div className="mt-4" style={{ fontSize: 44, lineHeight: 1.04, fontWeight: 560 }}>
          A deck becomes a product surface.
        </div>
        <div className="mt-5" style={{ color: T.muted, fontSize: 21, lineHeight: 1.35 }}>
          That is the leap managers should recognize: AI is not just rewriting copy; it is producing durable work people can reuse.
        </div>
      </Card>
    </Content>
  </Shell>
);

const HarnessToolboxVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} maxWidth="92vw" titleFontSize="clamp(38px, 3.95vw, 64px)" subheadFontSize="clamp(17px, 1.22vw, 21px)" />
    <div className="absolute left-[4.8vw] right-[4.8vw] top-[18vh]">
      <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${(slide.vendors || []).length || 1}, minmax(0, 1fr))` }}>
        {(slide.vendors || []).map((vendor, index) => (
          <Card
            key={`${vendor.name}-${index}`}
            delay={0.42 + index * 0.09}
            className="relative flex min-h-[505px] flex-col p-6"
            style={vendor.highlight ? { background: '#fff8f2', borderColor: T.coralPale } : undefined}
          >
            {vendor.powersBadge && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10.5px]"
                style={{
                  background: T.coral,
                  color: '#fff',
                  fontFamily: T.mono,
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(212,122,95,0.28)'
                }}
              >
                ★ {vendor.powersBadge}
              </div>
            )}
            <div className="flex h-16 items-center justify-center">
              {vendor.logoType === 'ucsd' ? (
                <UCSDLogoMark className="h-12 w-[150px]" />
              ) : vendor.logoUrl ? (
                <img src={vendor.logoUrl} alt={`${vendor.name} logo`} className="max-h-12 max-w-[150px] object-contain" />
              ) : (
                <div style={{ color: vendor.color || T.ink, fontSize: 28, fontWeight: 620 }}>{vendor.logoText || vendor.name}</div>
              )}
            </div>
            <div className="mt-5 text-center" style={{ color: T.ink, fontSize: 28, lineHeight: 1, fontWeight: 620 }}>{vendor.name}</div>
            <div className="mt-2.5 text-center text-[11.5px] uppercase" style={{ color: vendor.color || T.coralDark, fontFamily: T.mono, letterSpacing: '0.13em', fontWeight: 700 }}>
              {vendor.surface}
            </div>

            {vendor.origin && (
              <div className="mt-5">
                <div className="text-[11.5px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 700 }}>
                  Origin
                </div>
                <div className="mt-1.5" style={{ color: T.ink, fontSize: 18.5, lineHeight: 1.32 }}>
                  {vendor.origin}
                </div>
              </div>
            )}

            {vendor.now && (
              <div className="mt-4">
                <div className="text-[11.5px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 700 }}>
                  Today
                </div>
                <div className="mt-1.5" style={{ color: T.ink, fontSize: 18.5, lineHeight: 1.32 }}>
                  {vendor.now}
                </div>
              </div>
            )}

            {vendor.highlight && (
              <div className="mt-auto pt-4">
                <div className="rounded-[6px] border px-3 py-2.5" style={{ borderColor: T.coral, background: T.coral }}>
                  <div className="text-[11px] uppercase" style={{ color: '#fff', fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
                    UCSD angle
                  </div>
                  <div className="mt-1" style={{ color: '#fff', fontSize: 15.5, lineHeight: 1.32, fontWeight: 500 }}>
                    {vendor.highlight}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
    {slide.bottomLine && (
      <motion.div
        {...fade(1.0)}
        className="absolute left-[4.8vw] right-[4.8vw] top-[78vh] flex items-start gap-5"
      >
        {slide.bottomLineLabel && (
          <span
            className="shrink-0 rounded-[5px] px-3 py-2 text-[12px]"
            style={{
              background: T.coral,
              color: '#fff',
              fontFamily: T.mono,
              fontWeight: 800,
              letterSpacing: '0.22em',
              whiteSpace: 'nowrap'
            }}
          >
            {slide.bottomLineLabel}
          </span>
        )}
        <div style={{ fontSize: 'clamp(18px, 1.45vw, 24px)', fontWeight: 560, lineHeight: 1.25 }}>
          {slide.bottomLine}
        </div>
      </motion.div>
    )}
  </Shell>
);

const HarnessWiredVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} maxWidth="76vw" />
    <Content>
      <svg viewBox="0 0 1200 430" className="h-full w-full">
        <motion.text {...fade(0.52)} x="115" y="218" textAnchor="end" style={{ fontFamily: T.serif, fontSize: 27, fontStyle: 'italic' }} fill={T.blue}>goal</motion.text>
        <motion.circle {...fade(0.52)} cx="140" cy="210" r="13" fill={T.blue} />
        <Arrow x1={160} y1={210} x2={270} y2={210} color={T.blue} delay={0.65} />
        <motion.rect {...lineDraw(0.75)} x="295" y="92" width="710" height="235" rx="14" fill="none" stroke={T.coral} strokeWidth="1.6" />
        <motion.text {...fade(0.92)} x="325" y="128" style={{ fontFamily: T.mono, fontSize: 14, letterSpacing: '0.22em', fontWeight: 600 }} fill={T.coralDark}>HARNESS · STATIC BY DEFAULT</motion.text>
        <Model x={650} y={215} r={58} delay={1.05} />
        {[
          ['tool registry', 390, 166],
          ['while-loop', 390, 256],
          ['permissions', 792, 166],
          ['context mgmt', 792, 256]
        ].map(([label, x, y], index) => (
          <g key={`${label}-${index}`}>
            <Arrow x1={index < 2 ? 592 : 708} y1={215} x2={index < 2 ? x + 146 : x} y2={y} color={T.coralDark} delay={1.18 + index * 0.08} dashed />
            <motion.g {...fade(1.3 + index * 0.08)}>
              <rect x={x} y={y - 24} width="146" height="48" rx="6" fill="#fff8f2" stroke={T.coralPale} />
              <text x={x + 73} y={y + 6} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 600 }} fill={T.coralDark}>{label}</text>
            </motion.g>
          </g>
        ))}
        <motion.text {...fade(1.66)} x="650" y="392" textAnchor="middle" style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 14, letterSpacing: '0.24em', fontWeight: 600 }}>
          NO ASSEMBLY · NO WIRING · IT JUST RUNS
        </motion.text>
      </svg>
    </Content>
  </Shell>
);

const HarnessManifestoVariant = ({ slide }) => (
  <Shell>
    {slide.marker && !isCitizenAudience(slide) && <Marker slide={slide}>{slide.marker}</Marker>}
    <div className="absolute inset-x-[14vw] top-[30vh] text-center">
      <h1 className="leading-[1.04]" style={{ fontSize: 'clamp(58px, 6.3vw, 98px)', fontWeight: 520 }}>
        <PartText parts={slide.parts} delay={0.2} />
      </h1>
      <motion.div {...fade(0.7, 0)} className="mx-auto mt-9 h-px w-[28vw]" style={{ background: T.rule }} />
      {slide.subhead && (
        <motion.div {...fade(0.86, 0)} className="mx-auto mt-7 max-w-[62vw] italic" style={{ color: T.muted, fontSize: 'clamp(19px, 1.5vw, 26px)', lineHeight: 1.35 }}>
          {slide.subhead}
        </motion.div>
      )}
    </div>
  </Shell>
);

const architectureCardPositions = {
  top: 'left-1/2 top-0 w-[320px] -translate-x-1/2',
  left: 'left-0 top-1/2 w-[320px] -translate-y-1/2',
  right: 'right-0 top-1/2 w-[320px] -translate-y-1/2',
  bottom: 'left-1/2 bottom-0 w-[320px] -translate-x-1/2'
};

const HarnessArchitectureDiagram = ({ items }) => (
  <div className="relative mx-auto h-[49vh] w-full max-w-[780px]">
    <svg viewBox="0 0 780 520" className="absolute inset-0 h-full w-full overflow-visible">
      <motion.circle {...lineDraw(0.45)} cx="390" cy="260" r="116" fill="none" stroke={T.faint} strokeWidth="1.2" />
      <motion.circle {...lineDraw(0.52)} cx="390" cy="260" r="84" fill={T.paper} stroke={T.coralPale} strokeWidth="1.4" />
      {[
        ['390', '144', '390', '90', T.coral],
        ['272', '260', '154', '260', T.blue],
        ['508', '260', '626', '260', T.coralDark],
        ['390', '376', '390', '430', T.green]
      ].map(([x1, y1, x2, y2, stroke], index) => (
        <motion.line
          key={`architecture-link-${index}`}
          {...lineDraw(0.68 + index * 0.08)}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={stroke}
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
      ))}
      <motion.text {...fade(0.8, 0)} x="390" y="246" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 34, fontWeight: 620 }} fill={T.ink}>
        HARNESS
      </motion.text>
      <motion.text {...fade(0.9, 0)} x="390" y="272" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.18em', fontWeight: 700 }} fill={T.muted}>
        WORKING ENVIRONMENT
      </motion.text>
      <motion.text {...fade(0.98, 0)} x="390" y="292" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.18em', fontWeight: 700 }} fill={T.muted}>
        AROUND THE MODEL
      </motion.text>
    </svg>
    {items.map((item, index) => (
      <motion.div
        key={`${item.title}-${index}`}
        {...fade(0.72 + index * 0.08)}
        className={`absolute rounded-[10px] border p-4 shadow-[0_8px_24px_rgba(23,24,20,0.06)] ${architectureCardPositions[item.position] || architectureCardPositions.top}`}
        style={{ borderColor: item.color || T.faint, background: item.fill || '#fff' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="text-[11px] uppercase" style={{ color: item.color || T.coralDark, fontFamily: T.mono, letterSpacing: '0.15em', fontWeight: 700 }}>
            {item.kicker}
          </div>
          <div className="rounded-[6px] border bg-white p-1.5" style={{ borderColor: item.color || T.faint }}>
            <MiniIcon type={item.icon || 'dot'} color={item.color || T.coralDark} />
          </div>
        </div>
        <div className="mt-3" style={{ color: T.ink, fontSize: 28, lineHeight: 1.02, fontWeight: 620 }}>
          {item.title}
        </div>
        <div className="mt-2" style={{ color: T.muted, fontSize: 15.2, lineHeight: 1.28 }}>
          {item.body}
        </div>
      </motion.div>
    ))}
  </div>
);

const HarnessAnatomyIndexVariant = ({ slide }) => {
  const items = slide.architectureItems || defaultArchitectureItems;

  return (
    <Shell>
      <Header slide={slide} maxWidth="84vw" />
      <Content className="grid grid-cols-[58%_1fr] gap-8 items-center" style={{ top: '28vh', bottom: '12vh' }}>
        <HarnessArchitectureDiagram items={items} />
        <div className="space-y-4">
          <Card delay={0.52} className="p-6">
            <Kicker>{slide.architectureKicker || 'Manager lens'}</Kicker>
            <div className="mt-3" style={{ fontSize: 38, lineHeight: 1.03, fontWeight: 560 }}>
              {slide.architectureTitle || 'Four management questions, not nine technical parts.'}
            </div>
            <div className="mt-4" style={{ color: T.muted, fontSize: 18.5, lineHeight: 1.34 }}>
              {slide.architectureBody || 'Different tools surface these patterns differently, but managers are still governing the same core architecture around the model.'}
            </div>
          </Card>
          <Card delay={0.72} className="p-5">
            <Kicker>{slide.architectureListKicker || 'What stays constant'}</Kicker>
            <div className="mt-3 space-y-0">
              {(slide.architectureSignals || [
                'Vendors change, but the architecture does not.',
                'UC San Diego standards fit around context, tools, permissions, and controls.',
                'The next slides unpack each part in operating terms, not vendor jargon.'
              ]).map((item, index) => (
                <motion.div key={`${item}-${index}`} {...fade(0.9 + index * 0.06)} className="grid grid-cols-[34px_1fr] border-b py-2" style={{ borderColor: T.rule }}>
                  <span style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 12, fontWeight: 700 }}>{String(index + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 17, lineHeight: 1.18 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </Content>
      <motion.div {...fade(1.12, 0)} className="absolute left-[4.8vw] right-[4.8vw] bottom-[8.8vh] flex items-baseline gap-5">
        <span className="text-[12px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, fontWeight: 700, letterSpacing: '0.22em' }}>
          {slide.architectureFooterLabel || 'Across tools'}
        </span>
        <span style={{ color: T.ink, fontSize: 28, lineHeight: 1, fontWeight: 520 }}>
          {slide.architectureFooterPrefix || 'Different vendors. Different surfaces.'}{' '}
          <span style={{ color: T.coralDark, fontStyle: 'italic', fontWeight: 420 }}>
            {slide.architectureFooterEmphasis || 'Same architecture.'}
          </span>
        </span>
      </motion.div>
    </Shell>
  );
};

const ComponentVisual = ({ type, color = T.coralDark }) => {
  const stroke = { fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const tint = `${color}14`; // ~8% opacity tint
  const tintStrong = `${color}22`;

  if (type === 'loop') {
    return (
      <svg viewBox="0 0 360 140" className="h-full w-full">
        {['act', 'observe', 'adjust'].map((label, i) => {
          const x = 30 + i * 122;
          return (
            <g key={label}>
              <rect x={x} y={38} width={100} height={56} rx={11} fill={tint} stroke={color} strokeWidth="1.6" />
              <text x={x + 50} y={72} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 16, fontWeight: 800 }} fill={color}>{label}</text>
              {i < 2 && (
                <g>
                  <line x1={x + 100} y1={66} x2={x + 122} y2={66} {...stroke} />
                  <polygon points={`${x + 122},66 ${x + 113},61 ${x + 113},71`} fill={color} />
                </g>
              )}
            </g>
          );
        })}
        {/* loop-back arrow */}
        <path d="M 304 94 C 304 116, 56 116, 56 94" {...stroke} strokeDasharray="4 4" />
        <polygon points="56,94 51,103 61,103" fill={color} />
        <text x="180" y="132" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: '0.18em', fontWeight: 800 }} fill={color}>REPEAT UNTIL DONE</text>
      </svg>
    );
  }

  if (type === 'context') {
    return (
      <svg viewBox="0 0 360 140" className="h-full w-full">
        {[
          { label: 'system prompt', y: 14 },
          { label: 'files & memory', y: 44 },
          { label: 'prior results', y: 74 }
        ].map((row, i) => (
          <g key={row.label}>
            <rect x={36 + i * 10} y={row.y} width={236} height={30} rx={5} fill={i === 0 ? tintStrong : tint} stroke={color} strokeWidth="1.5" />
            <text x={48 + i * 10} y={row.y + 20} style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 800 }} fill={color}>{row.label}</text>
          </g>
        ))}
        {/* arrow into model */}
        <line x1="296" y1="60" x2="316" y2="60" {...stroke} />
        <polygon points="316,60 309,55 309,65" fill={color} />
        <circle cx="332" cy="60" r="14" fill="none" stroke={color} strokeWidth="1.6" />
        <text x="332" y="65" textAnchor="middle" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 16, fontWeight: 520 }} fill={color}>M</text>
        <text x="180" y="132" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: '0.18em', fontWeight: 800 }} fill={color}>WHAT'S IN VIEW</text>
      </svg>
    );
  }

  if (type === 'action') {
    return (
      <svg viewBox="0 0 360 140" className="h-full w-full">
        {/* center hub */}
        <circle cx="180" cy="64" r="26" fill={tintStrong} stroke={color} strokeWidth="1.7" />
        <text x="180" y="71" textAnchor="middle" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 22, fontWeight: 520 }} fill={color}>M</text>
        {/* tools fanning out — boxes pulled in, lines start exactly at box edges */}
        {[
          { label: 'files', x: 60, y: 24 },
          { label: 'web', x: 244, y: 24 },
          { label: 'API', x: 60, y: 92 },
          { label: 'tools', x: 244, y: 92 }
        ].map((tool) => (
          <g key={tool.label}>
            <line
              x1={tool.x < 180 ? tool.x + 56 : tool.x}
              y1={tool.y + 12}
              x2={180 + (tool.x < 180 ? -22 : 22)}
              y2={64 + (tool.y < 64 ? -14 : 14)}
              {...stroke}
              strokeDasharray="3 4"
            />
            <rect x={tool.x} y={tool.y} width="56" height="24" rx="5" fill={tint} stroke={color} strokeWidth="1.5" />
            <text x={tool.x + 28} y={tool.y + 17} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 800 }} fill={color}>{tool.label}</text>
          </g>
        ))}
        <text x="180" y="130" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: '0.18em', fontWeight: 800 }} fill={color}>WHAT IT CAN REACH</text>
      </svg>
    );
  }

  if (type === 'scale') {
    return (
      <svg viewBox="0 0 360 140" className="h-full w-full">
        {/* parent */}
        <rect x="138" y="10" width="84" height="32" rx="6" fill={tintStrong} stroke={color} strokeWidth="1.7" />
        <text x="180" y="32" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 800 }} fill={color}>main</text>
        {/* connecting lines */}
        {[64, 180, 296].map((cx, i) => (
          <line key={i} x1="180" y1="42" x2={cx} y2="74" {...stroke} strokeDasharray="3 4" />
        ))}
        {/* children */}
        {[
          { label: 'plan', x: 32 },
          { label: 'build', x: 148 },
          { label: 'verify', x: 264 }
        ].map((child) => (
          <g key={child.label}>
            <rect x={child.x} y={74} width="64" height="30" rx="5" fill={tint} stroke={color} strokeWidth="1.5" />
            <text x={child.x + 32} y={94} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 800 }} fill={color}>{child.label}</text>
          </g>
        ))}
        <text x="180" y="132" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: '0.18em', fontWeight: 800 }} fill={color}>SUB-AGENTS</text>
      </svg>
    );
  }

  return null;
};

const HarnessComponentsFrameworkVariant = ({ slide }) => (
  <Shell>
    <Marker slide={slide}>{slide.marker}</Marker>

    <div className="absolute left-[4.8vw] right-[4.8vw] top-[5vh]" style={{ maxWidth: '88vw' }}>
      <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 520 }}>
        <PartText parts={slide.parts} />
      </h1>
      {slide.subhead && (
        <motion.div {...fade(0.34)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(17px, 1.3vw, 22px)' }}>
          {slide.subhead}
        </motion.div>
      )}
    </div>

    <div className="absolute left-[4.8vw] right-[4.8vw] top-[18vh]">
      <div className="grid grid-cols-2 gap-4">
        {(slide.components || []).map((component, index) => (
          <Card
            key={`${component.title}-${index}`}
            delay={0.5 + index * 0.08}
            className="p-4"
            style={component.highlight ? { background: '#fff8f2', borderColor: T.coral } : undefined}
          >
            <div className="grid grid-cols-[1fr_320px] items-start gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] uppercase" style={{ color: component.color || T.coralDark, fontFamily: T.mono, letterSpacing: '0.16em', fontWeight: 800 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="uppercase" style={{ color: component.color || T.coralDark, fontFamily: T.mono, fontSize: 'clamp(20px, 1.65vw, 32px)', letterSpacing: '0.1em', fontWeight: 900, lineHeight: 0.92 }}>
                    {component.kicker}
                  </span>
                </div>
                <div className="mt-1.5" style={{ fontSize: 'clamp(23px, 1.62vw, 29px)', lineHeight: 1.02, fontWeight: 620, color: T.ink }}>
                  {component.title}
                </div>
              </div>
              {component.visual && (
                <div className="h-[104px] w-full">
                  <ComponentVisual type={component.visual} color={component.color || T.coralDark} />
                </div>
              )}
            </div>
            <div className="mt-2.5" style={{ color: T.ink, fontSize: 17.5, lineHeight: 1.24, fontWeight: 500 }}>
              {component.body}
            </div>
            {component.question && (
              <div className="mt-2 rounded-[5px] border-l-2 pl-3 py-1" style={{ borderColor: component.color || T.coralDark, color: T.muted, fontSize: 15, lineHeight: 1.22, fontStyle: 'italic' }}>
                {component.question}
              </div>
            )}
            {component.examples && (
              <div className="mt-2 flex flex-wrap gap-2">
                {component.examples.map((example) => (
                  <span key={example} className="rounded-[4px] border px-2.5 py-1 text-[11px] uppercase" style={{ borderColor: component.color || T.coralPale, color: component.color || T.coralDark, fontFamily: T.mono, letterSpacing: '0.08em', fontWeight: 700 }}>
                    {example}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  </Shell>
);

const HarnessWhileLoopVariant = ({ slide }) => {
  const iterations = slide.iterations || [
    { act: 'read state', observe: 'something missing', adjust: 'plan a fix' },
    { act: 'apply the fix', observe: 'something else broke', adjust: 'patch the side-effect' },
    { act: 'run a check', observe: 'everything passes', adjust: 'work is done' }
  ];
  const goalText = slide.scenarioGoal || 'Finish a piece of real work.';

  // Three labeled stops at 12, 4, 8 o'clock
  const stops = [
    { label: 'ACT', sub: 'do something', angle: -90, color: T.coral },
    { label: 'OBSERVE', sub: 'see the result', angle: 30, color: T.coralDark },
    { label: 'ADJUST', sub: 'pick next step', angle: 150, color: T.blue }
  ];

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>
      <JobSpine activeKey={slide.spineActive} />

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[5vh]" style={{ maxWidth: '78vw' }}>
        <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 520 }}>
          <PartText parts={slide.parts} />
        </h1>
        {slide.subhead && (
          <motion.div {...fade(0.38)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(17px, 1.3vw, 22px)' }}>
            {slide.subhead}
          </motion.div>
        )}
      </div>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[19vh] bottom-[12vh] grid grid-cols-[40%_1fr] gap-7 items-stretch">
        {/* Left: Animated loop diagram */}
        <Card delay={0.5} className="flex flex-col p-5">
          <div className="self-start text-[12px] uppercase" style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
            The mechanic
          </div>

          <div className="flex-1 flex items-center justify-center" style={{ minHeight: 0 }}>
            <svg viewBox="0 0 340 340" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '100%' }}>
              {/* Outer dashed orbit ring */}
              <circle cx="170" cy="170" r="120" fill="none" stroke={T.coralPale} strokeWidth={1.8} strokeDasharray="3 5" />

              {/* Three labeled stops */}
              {stops.map((stop) => {
                const rad = (stop.angle * Math.PI) / 180;
                const x = 170 + 120 * Math.cos(rad);
                const y = 170 + 120 * Math.sin(rad);
                // Position the sub-label outside the circle, away from center
                const subDistance = 64; // distance from center for sub-label
                const subX = 170 + (120 + subDistance - 120) * Math.cos(rad);
                const subY = 170 + (120 + subDistance - 120) * Math.sin(rad);
                // Calculate offset from circle edge for sub-label
                const offsetRad = rad;
                const subOffsetX = x + 56 * Math.cos(offsetRad);
                const subOffsetY = y + 56 * Math.sin(offsetRad);
                return (
                  <g key={stop.label}>
                    <circle cx={x} cy={y} r="44" fill="#fff" stroke={stop.color} strokeWidth={1.8} />
                    <text x={x} y={y + 6} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 15, fontWeight: 800, letterSpacing: '0.08em' }} fill={stop.color}>{stop.label}</text>
                  </g>
                );
              })}

              {/* Direction arrows along the orbit */}
              {[-30, 90, 210].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x = 170 + 120 * Math.cos(rad);
                const y = 170 + 120 * Math.sin(rad);
                const tan = rad + Math.PI / 2;
                const ax = Math.cos(tan);
                const ay = Math.sin(tan);
                const tip = `${x + 6 * ax},${y + 6 * ay}`;
                const base1 = `${x - 6 * ax + 4 * ay},${y - 6 * ay - 4 * ax}`;
                const base2 = `${x - 6 * ax - 4 * ay},${y - 6 * ay + 4 * ax}`;
                return <polygon key={angle} points={`${tip} ${base1} ${base2}`} fill={T.coral} fillOpacity="0.45" />;
              })}

              {/* Orbiting glow + dot (slower, more subtle) */}
              <g>
                <circle cx="290" cy="170" r="13" fill={T.coral} fillOpacity="0.18">
                  <animateTransform attributeName="transform" type="rotate" from="0 170 170" to="360 170 170" dur="11s" repeatCount="indefinite" />
                </circle>
                <circle cx="290" cy="170" r="8" fill={T.coral} fillOpacity="0.85">
                  <animateTransform attributeName="transform" type="rotate" from="0 170 170" to="360 170 170" dur="11s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Center model with subtle, slow pulse */}
              <circle cx="170" cy="170" r="46" fill={T.bg} stroke={T.ink} strokeWidth={1.8}>
                <animate attributeName="r" values="46;48;46" dur="5s" repeatCount="indefinite" />
              </circle>
              <text x="170" y="184" textAnchor="middle" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 42, fontWeight: 520 }} fill={T.ink}>M</text>
            </svg>
          </div>

          <div className="text-center" style={{ color: T.muted, fontSize: 19, lineHeight: 1.4, fontStyle: 'italic', fontWeight: 500 }}>
            One model. Many turns. Until done.
          </div>
        </Card>

        {/* Right: Live trace */}
        <Card delay={0.7} className="p-7">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] uppercase" style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 700 }}>
              Live trace
            </span>
            <span style={{ color: T.muted, fontFamily: T.serif, fontStyle: 'italic', fontSize: 14 }}>
              what one run actually looks like
            </span>
          </div>

          <motion.div
            {...fade(0.85)}
            className="mt-3 rounded-[7px] border-l-[3px] px-4 py-3"
            style={{ borderColor: T.blue, background: T.bluePale }}
          >
            <div className="text-[13px] uppercase" style={{ color: T.blue, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>Goal</div>
            <div className="mt-1.5" style={{ color: T.blue, fontSize: 21, fontWeight: 600, lineHeight: 1.28 }}>{goalText}</div>
          </motion.div>

          <div className="mt-3.5 space-y-2.5">
            {iterations.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 1.15 + i * 0.55, ease }}
                className="rounded-[6px] border px-4 py-2.5"
                style={{ borderColor: T.coralPale, background: '#fff8f2' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full px-3 py-0.5 text-[12px]" style={{ background: T.coral, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.14em' }}>
                    iter {i + 1}
                  </span>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-1.5" style={{ fontSize: 17, lineHeight: 1.34 }}>
                  <span style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 13.5, fontWeight: 800, letterSpacing: '0.04em' }}>act</span>
                  <span style={{ color: T.ink }}>{it.act}</span>
                  <span style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 13.5, fontWeight: 800, letterSpacing: '0.04em' }}>observe</span>
                  <span style={{ color: T.ink }}>{it.observe}</span>
                  <span style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 13.5, fontWeight: 800, letterSpacing: '0.04em' }}>adjust</span>
                  <span style={{ color: T.ink }}>{it.adjust}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.15 + iterations.length * 0.55 + 0.3, ease }}
            className="mt-3.5 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
            style={{ background: T.blue, color: '#fff', fontFamily: T.mono, fontSize: 14, fontWeight: 800, letterSpacing: '0.12em' }}
          >
            <span>✓ TASK COMPLETE</span>
            <span style={{ opacity: 0.65 }}>· {iterations.length} ITERATIONS</span>
          </motion.div>
        </Card>
      </div>
    </Shell>
  );
};

const HarnessContextVariant = ({ slide }) => (
  <Shell>
    <Marker slide={slide}>{slide.marker}</Marker>
    <JobSpine activeKey={slide.spineActive} />
    <div className="absolute left-[4.8vw] right-[4.8vw] top-[4vh]">
      <div className="flex items-baseline gap-7">
        {slide.number ? (
          <motion.div {...fade(0.16)} style={{ color: T.coral, fontSize: 'clamp(70px, 6.4vw, 108px)', fontStyle: 'italic', lineHeight: 0.9 }}>
            {slide.number}
          </motion.div>
        ) : null}
        <motion.div {...fade(0.22)} style={{ color: T.ink, fontSize: 'clamp(54px, 5vw, 86px)', lineHeight: 0.95, fontWeight: 520 }}>
          {slide.title || 'Context management'}
        </motion.div>
      </div>
      <motion.div {...fade(0.38)} className={`${slide.number ? 'ml-[9.7vw]' : ''} mt-2 italic`} style={{ color: T.muted, fontSize: 'clamp(22px, 1.9vw, 32px)', lineHeight: 1.15 }}>
        {slide.subtitle || 'what to keep · what to summarize · what to drop'}
      </motion.div>
    </div>
    <div className="absolute left-[4.8vw] right-[4.8vw] top-[25vh]">
      <Card delay={0.48} className="p-7">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5">
          <Kicker>Context budget</Kicker>
          <div className="h-px" style={{ background: T.rule }} />
          <div style={{ color: T.coralDark, fontSize: 34, lineHeight: 1 }}>
            {slide.activeBudget || '520,000'}
            <span className="ml-4" style={{ color: T.muted, fontFamily: T.mono, fontSize: 14, letterSpacing: '0.12em' }}>
              active · {slide.peakBudget || '780,000'} peak · {slide.budgetTotal || '1,000,000 tokens'}
            </span>
          </div>
        </div>
        <div className="relative mt-5 h-[118px] overflow-hidden rounded-[5px]" style={{ background: '#f5f2ec' }}>
          <motion.div
            initial={{ width: '0%', opacity: 0 }}
            animate={{ width: '78%', opacity: [0, 0.56, 0.3] }}
            transition={{ duration: 1.9, delay: 0.65, times: [0, 0.62, 1], ease }}
            className="absolute inset-y-0 left-0"
            style={{ background: 'linear-gradient(90deg,rgba(212,122,95,0.12),rgba(212,122,95,0.35))' }}
          />
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: ['0%', '78%', '52%'] }}
            transition={{ duration: 2.2, delay: 0.72, times: [0, 0.62, 1], ease }}
            className="absolute inset-y-0 left-0"
            style={{ background: 'linear-gradient(90deg,rgba(212,122,95,0.18),rgba(212,122,95,0.9))' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 2.5, ease }}
            className="absolute inset-y-0 left-[52%] w-[26%]"
            style={{
              background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.38) 0, rgba(255,255,255,0.38) 8px, rgba(212,122,95,0.08) 8px, rgba(212,122,95,0.08) 16px)'
            }}
          />
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 2.38, ease }}
            className="absolute inset-y-0 left-[18%] w-[9%]"
            style={{ background: 'rgba(255,255,255,0.25)' }}
          />
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 2.48, ease }}
            className="absolute inset-y-0 left-[27%] w-[9%]"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 2.65, ease }}
            className="absolute left-[54%] top-[43px] rounded-[3px] bg-white/70 px-3 py-2 text-[11px] uppercase"
            style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.12em', fontWeight: 700 }}
          >
            space recovered after compaction
          </motion.div>
          <div className="absolute inset-y-0 right-0 w-[20%] border-l border-dashed px-5 pt-4" style={{ borderColor: T.coralPale }}>
            <span className="rounded-[3px] bg-white/55 px-2 py-1 text-[11px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.12em', fontWeight: 700 }}>
              {slide.compactLabel || 'compact at ~80%'}
            </span>
          </div>
          <div className="absolute left-[5%] top-[38px] flex gap-3">
            {(slide.summaries || []).map((summary, index) => (
              <motion.div
                key={`${summary}-${index}`}
                {...fade(2.18 + index * 0.1, 0)}
                className="rounded-[5px] border bg-white/80 px-4 py-2 text-[12px]"
                style={{ borderColor: T.coralPale, color: T.coralDark, fontFamily: T.mono, fontWeight: 700, letterSpacing: '0.06em' }}
              >
                {summary}
              </motion.div>
            ))}
          </div>
          <motion.div
            {...fade(2.92, 0)}
            className="absolute left-[5%] bottom-[13px] text-[11px] uppercase"
            style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.14em', fontWeight: 700 }}
          >
            older context compressed into retained reference
          </motion.div>
        </div>
        <div className="mt-4 flex gap-8 italic" style={{ color: T.ink, fontSize: 22 }}>
          {(slide.legend || []).map((item, index) => (
            <motion.span key={`${item}-${index}`} {...fade(2.78 + index * 0.05, 0)}>
              <span style={{ color: T.coralDark }}>·</span> {item}
            </motion.span>
          ))}
        </div>
      </Card>
      <div className="mt-9 grid grid-cols-5 gap-7">
        {(slide.stats || []).map((stat, index) => (
          <motion.div key={`${stat.value}-${index}`} {...fade(2.92 + index * 0.08)}>
            <div style={{ color: T.coralDark, fontSize: 54, lineHeight: 1, fontWeight: 520 }}>{stat.value}</div>
            <div className="mt-2 text-[12px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.18em', fontWeight: 700 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </Shell>
);

const HarnessFrameworkCardsVariant = ({ slide }) => (
  <Shell>
    <Marker slide={slide}>{slide.marker}</Marker>
    <JobSpine activeKey={slide.spineActive} />

    <div className="absolute left-[4.8vw] right-[4.8vw] top-[10vh]" style={{ maxWidth: '88vw' }}>
      <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 520 }}>
        <PartText parts={slide.parts} />
      </h1>
      {slide.subhead && (
        <motion.div {...fade(0.34)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(17px, 1.3vw, 22px)' }}>
          {slide.subhead}
        </motion.div>
      )}
    </div>

    <div className="absolute left-[4.8vw] right-[4.8vw] top-[24vh] bottom-[12vh] flex flex-col gap-4">
      <div
        className="grid gap-5 flex-1"
        style={{ gridTemplateColumns: `repeat(${slide.gridColumns || (slide.connected ? 4 : slide.columns?.length > 4 ? 3 : 4)}, minmax(0, 1fr))` }}
      >
        {(slide.columns || []).map((item, index) => (
          <div key={`${item.title}-${index}`} className="relative h-full">
            {slide.connected && index > 0 && (
              <motion.div {...fade(0.7 + index * 0.08, 0)} className="absolute left-[-26px] top-1/2 z-10 -translate-y-1/2" style={{ color: T.coralDark, fontSize: 30 }}>
                →
              </motion.div>
            )}
            <Card
              delay={0.42 + index * 0.08}
              className="flex h-full flex-col p-6"
              style={{ borderColor: item.color || T.faint, background: item.fill || 'rgba(255,255,255,0.65)', borderTopWidth: 4, borderTopColor: item.color || T.coralDark }}
            >
              {/* Top: large central icon */}
              {item.icon && (
                <div className="flex justify-center mb-3">
                  <div className="rounded-[10px] border-2 p-3" style={{ borderColor: item.color || T.coralPale, background: '#fff' }}>
                    <div style={{ width: 56, height: 56 }}>
                      <MiniIcon type={item.icon} color={item.color || T.coralDark} />
                    </div>
                  </div>
                </div>
              )}
              {/* Kicker */}
              <div className="text-[12.5px] uppercase text-center" style={{ color: item.color || T.coralDark, fontFamily: T.mono, letterSpacing: '0.18em', fontWeight: 800 }}>
                {item.kicker}
              </div>
              {/* Title */}
              <div className="mt-2 text-center" style={{ fontSize: 26, lineHeight: 1.06, fontWeight: 650, color: T.ink }}>
                {item.title}
              </div>
              {/* Body */}
              <div className="mt-3 text-center" style={{ color: T.ink, fontSize: 16.5, lineHeight: 1.36 }}>
                {item.body}
              </div>
            </Card>
          </div>
        ))}
      </div>
      {slide.steps && (
        <Card delay={0.88} className="p-4">
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${slide.steps.length}, minmax(0, 1fr))` }}>
            {slide.steps.map((step, index) => (
              <motion.div key={`${step.title}-${index}`} {...fade(1.02 + index * 0.045)} className="rounded-[5px] border px-3 py-3 text-center" style={{ borderColor: T.coralPale, background: '#fff8f2' }}>
                <div style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 12, fontWeight: 800 }}>{String(index + 1).padStart(2, '0')}</div>
                <div className="mt-1" style={{ fontSize: 21, lineHeight: 1.05, fontWeight: 620 }}>{step.title}</div>
                <div className="mt-1" style={{ color: T.muted, fontSize: 14, lineHeight: 1.28 }}>{step.body}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  </Shell>
);

const ApiProgramPill = ({ children, delay = 0.4, color = T.blue }) => (
  <motion.div
    {...fade(delay, 0)}
    className="rounded-full border bg-white px-3 py-1 text-center text-[11px] uppercase"
    style={{ borderColor: '#c9d7df', color: T.black, fontFamily: T.mono, letterSpacing: '0.12em', fontWeight: 800, boxShadow: '0 2px 8px rgba(23,24,20,0.08)' }}
  >
    {children}
  </motion.div>
);

const ApiProgramCard = ({ children, delay = 0.4, color = T.blue, className = '' }) => (
  <motion.div
    {...fade(delay)}
    className={`rounded-[7px] border bg-white ${className}`}
    style={{ borderColor: '#e7e0d2', borderLeft: `4px solid ${color}`, boxShadow: '0 4px 12px rgba(23,24,20,0.07)' }}
  >
    {children}
  </motion.div>
);

const ApiConnectorArrow = ({ width = 32 }) => (
  <svg width={width} height="16" viewBox={`0 0 ${width} 16`} aria-hidden="true" className="shrink-0">
    <path d={`M 0 8 H ${width - 8}`} stroke="#9ab4c1" strokeWidth="2" strokeLinecap="round" />
    <path d={`M ${width - 8} 3 L ${width} 8 L ${width - 8} 13 Z`} fill="#9ab4c1" />
  </svg>
);

const HarnessCitizenEcosystemVariant = ({ slide }) => {
  const ecosystem = slide.ecosystem || [];
  const gateway = slide.gateway || {};
  const observability = slide.observability || {};
  const pillars = slide.pillars || [
    {
      title: 'Build workflows',
      label: 'create',
      body: 'Agent Builder, Developer APIs, and TritonCraft give units a governed way to turn use cases into AI workflows.',
      items: ecosystem.slice(0, 2).map((item) => item.title),
      icon: 'builder',
      tone: 'blue'
    },
    {
      title: 'Reuse components',
      label: 'share',
      body: 'Skills and connectors let teams start from trusted campus patterns instead of one-off builds.',
      items: ecosystem.slice(2, 4).map((item) => item.title),
      icon: 'library',
      tone: 'coral'
    },
    {
      title: 'Operate safely',
      label: 'govern',
      body: 'Gateway capabilities and observability keep cost, model routing, tool calls, and reliability visible.',
      items: [
        gateway.title || 'Gateway models',
        observability.title || 'Observability'
      ],
      icon: 'observe',
      tone: 'green'
    }
  ];
  const toneStyles = {
    blue: { ink: T.blue, fill: T.bluePale, border: '#b9d3dc' },
    coral: { ink: T.coralDark, fill: '#fff5ee', border: T.coralPale },
    green: { ink: T.green, fill: '#f6f8ee', border: '#cddbbf' }
  };
  const isCompactProgramSlide = slide.compactProgramLayout;

  return (
    <Shell>
      <Header
        slide={slide}
        maxWidth={isCompactProgramSlide ? '92vw' : '86vw'}
        titleFontSize={isCompactProgramSlide ? 'clamp(31px, 3.25vw, 56px)' : 'clamp(40px, 4.2vw, 66px)'}
        subheadFontSize={isCompactProgramSlide ? 'clamp(15px, 1.02vw, 19px)' : 'clamp(17px, 1.22vw, 22px)'}
        top={isCompactProgramSlide ? '6.4vh' : undefined}
        noWrap={isCompactProgramSlide}
      />

      <div className={`absolute left-[4.8vw] right-[4.8vw] ${isCompactProgramSlide ? 'top-[18vh] bottom-[22vh]' : 'top-[28vh] bottom-[12vh]'}`}>
        <div className={`grid h-full grid-cols-[34%_1fr] ${isCompactProgramSlide ? 'gap-4' : 'gap-6'}`}>
          <motion.div {...fade(0.42)} className={`flex min-h-0 flex-col rounded-[9px] border bg-white/78 ${isCompactProgramSlide ? 'self-start gap-4 p-3.5' : 'justify-between p-6'}`} style={{ borderColor: '#d8c6b9', boxShadow: '0 18px 38px rgba(23,24,20,0.10)' }}>
            <div>
              <UCSDLogoMark className={isCompactProgramSlide ? 'h-9 w-[136px]' : 'h-12 w-[168px]'} />
              <Kicker className={isCompactProgramSlide ? 'mt-3' : 'mt-7'}>{slide.center?.kicker || 'PROGRAM FOUNDATION'}</Kicker>
              <div className={isCompactProgramSlide ? 'mt-1' : 'mt-3'} style={{ color: T.ink, fontFamily: T.serif, fontSize: isCompactProgramSlide ? 'clamp(30px, 3vw, 50px)' : 'clamp(34px, 3.25vw, 54px)', lineHeight: 0.92, fontWeight: 560 }}>
                {slide.center?.title || 'Citizen Developer Program'}
              </div>
              <div className={isCompactProgramSlide ? 'mt-2.5 max-w-[34rem]' : 'mt-5 max-w-[34rem]'} style={{ color: T.muted, fontFamily: T.sans, fontSize: isCompactProgramSlide ? 'clamp(15px, 1vw, 18px)' : 'clamp(16px, 1.05vw, 19px)', lineHeight: 1.24, fontWeight: 560 }}>
                {slide.center?.body}
              </div>
            </div>
            <div className={`${isCompactProgramSlide ? 'px-2.5 py-2' : 'mt-7 px-4 py-3'} rounded-[7px] border`} style={{ borderColor: '#c9d7df', background: T.bluePale }}>
              <div style={{ color: T.blue, fontFamily: T.mono, fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Powered by TritonAI
              </div>
              <div className={isCompactProgramSlide ? 'mt-1' : 'mt-2'} style={{ color: T.ink, fontFamily: T.sans, fontSize: isCompactProgramSlide ? 15 : 17, lineHeight: 1.18, fontWeight: 700 }}>
                Gateway access, shared patterns, and run visibility stay centralized.
              </div>
            </div>
          </motion.div>

          <div className={`grid min-h-0 grid-rows-3 ${isCompactProgramSlide ? 'gap-2.5' : 'gap-4'}`}>
            {pillars.map((pillar, index) => {
              const tone = toneStyles[pillar.tone] || toneStyles.blue;
              return (
                <Card key={pillar.title} delay={0.54 + index * 0.1} className={`${isCompactProgramSlide ? 'grid-cols-[52px_1fr_180px] gap-3 p-3.5' : 'grid-cols-[72px_1fr_210px] gap-4 p-5'} grid min-h-0 items-center overflow-hidden`} style={{ background: tone.fill, borderColor: tone.border, boxShadow: '0 10px 24px rgba(23,24,20,0.08)' }}>
                  <div className={`${isCompactProgramSlide ? 'h-12 w-12' : 'h-16 w-16'} flex items-center justify-center rounded-full bg-white/85`} style={{ color: tone.ink }}>
                    <MiniIcon type={pillar.icon || 'dot'} color={tone.ink} className={isCompactProgramSlide ? 'h-7 w-7' : 'h-10 w-10'} />
                  </div>
                  <div>
                    <Kicker className={isCompactProgramSlide ? 'mb-1' : 'mb-1.5'} style={{ color: tone.ink }}>{pillar.label}</Kicker>
                    <div style={{ color: T.ink, fontFamily: T.sans, fontSize: isCompactProgramSlide ? 'clamp(20px, 1.55vw, 28px)' : 'clamp(24px, 1.95vw, 34px)', lineHeight: 0.98, fontWeight: 780 }}>
                      {pillar.title}
                    </div>
                    <div className={isCompactProgramSlide ? 'mt-1.5' : 'mt-2'} style={{ color: T.muted, fontFamily: T.sans, fontSize: isCompactProgramSlide ? 'clamp(13.5px, 0.86vw, 15.5px)' : 'clamp(15px, 1vw, 18px)', lineHeight: 1.24, fontWeight: 540 }}>
                      {pillar.body}
                    </div>
                  </div>
                  <div className={`flex flex-col ${isCompactProgramSlide ? 'gap-1.5' : 'gap-2'}`}>
                    {(pillar.items || []).slice(0, 3).map((item, itemIndex) => (
                      <motion.div key={item} {...fade(0.74 + index * 0.1 + itemIndex * 0.035, 0)} className={`rounded-full border bg-white/78 px-3 text-center ${isCompactProgramSlide ? 'py-1' : 'py-1.5'}`} style={{ borderColor: tone.border, color: tone.ink, fontFamily: T.mono, fontSize: isCompactProgramSlide ? 10 : 11, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {slide.bottomLine && (
        <motion.div {...fade(1.1)} className={`absolute left-[4.8vw] right-[4.8vw] ${isCompactProgramSlide ? 'top-[80vh]' : 'top-[90vh]'} flex items-start gap-5`}>
          <span className="shrink-0 rounded-[5px] px-3 py-2 text-[12px]" style={{ background: T.coral, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.22em', whiteSpace: 'nowrap' }}>
            {slide.bottomLineLabel || 'PROGRAM MODEL'}
          </span>
          <div style={{ color: T.ink, fontSize: 'clamp(15px, 1.12vw, 18px)', fontWeight: 560, lineHeight: 1.3 }}>
            {slide.bottomLine}
          </div>
        </motion.div>
      )}
    </Shell>
  );
};

const HarnessDeveloperApiProgramVariant = ({ slide }) => {
  const users = slide.users || [];
  const harnesses = slide.harnesses || [];
  const providers = slide.providers || [];
  const capabilities = slide.capabilities || [];
  const accessSteps = slide.accessSteps || [];
  const ownership = slide.ownership || [];
  const footerBadges = slide.footerBadges || [];
  const titleFont = isCitizenAudience(slide) ? T.serif : T.sans;
  const capabilityIcons = {
    CHAT: 'chat',
    REASONING: 'reasoning',
    VISION: 'observe',
    'IMAGE GEN': 'image',
    OCR: 'ocr',
    CODING: 'code'
  };

  return (
    <Shell>
     <div className="absolute inset-0" style={{ fontFamily: T.sans }}>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[2.5vh] text-center">
        <motion.h1 {...fade(0.12)} style={{ color: T.ink, fontFamily: titleFont, fontSize: 'clamp(32px, 3vw, 50px)', lineHeight: 0.92, fontWeight: isCitizenAudience(slide) ? 560 : 800, letterSpacing: '0' }}>
          {slide.programTitle || 'TritonAI API Program'}
        </motion.h1>
      </div>

      <div className="absolute left-[5.8vw] right-[5.8vw] top-[10vh] grid grid-cols-[20%_18.5%_1fr_26%] items-center gap-6">
        <div>
          <Kicker className="mb-2" style={{ color: T.muted }}>{slide.usersLabel || 'Campus users'}</Kicker>
          <div className="space-y-2">
            {users.map((user, index) => (
              <ApiProgramCard key={user.title} delay={0.28 + index * 0.06} color={T.blue} className="flex h-[54px] items-center gap-3 px-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: T.bluePale }}>
                  <MiniIcon type={user.icon || 'people'} color={T.blue} />
                </div>
                <div style={{ color: T.ink, fontFamily: T.sans, fontSize: 18, lineHeight: 1, fontWeight: 600 }}>{user.title}</div>
              </ApiProgramCard>
            ))}
          </div>
        </div>

        <div>
          <Kicker className="mb-2">{slide.harnessLabel || 'Claude Code / Codex'}</Kicker>
          <div className="relative">
            <div className="space-y-2.5">
              {harnesses.map((harness, index) => (
                <ApiProgramCard key={harness.title} delay={0.48 + index * 0.08} color={harness.color || T.coral} className="flex h-[56px] items-center gap-3 px-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: harness.fill || '#fff8f2' }}>
                    <MiniIcon type={harness.icon || 'code'} color={harness.color || T.coralDark} />
                  </div>
                  <div>
                    <div style={{ color: T.ink, fontFamily: T.sans, fontSize: 19, lineHeight: 0.95, fontWeight: 650 }}>{harness.title}</div>
                    <div className="mt-0.5" style={{ color: T.muted, fontFamily: T.sans, fontSize: 12.5 }}>{harness.subtitle}</div>
                  </div>
                </ApiProgramCard>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <motion.div {...fade(0.74)} className="relative flex h-[168px] w-[168px] items-center justify-center rounded-full" style={{ background: 'radial-gradient(circle at 35% 28%, #1c5c91, #153457 72%)', boxShadow: '0 0 0 6px rgba(21,36,61,0.18), 0 12px 24px rgba(23,24,20,0.2)' }}>
            <div className="text-center" style={{ color: '#fff', fontFamily: T.sans }}>
              <div className="flex justify-center">
                <MiniIcon type="gateway" color="#ffc928" />
              </div>
              <div className="mt-1" style={{ fontSize: 28, lineHeight: 0.95, fontWeight: 700, letterSpacing: '-0.01em' }}>LLM<br />Gateway</div>
              <div className="mt-2 text-[10px] uppercase" style={{ color: '#14b8d4', fontFamily: T.mono, letterSpacing: '0.16em', fontWeight: 800 }}>templates +<br />guardrails</div>
            </div>
          </motion.div>
        </div>

        <div>
          <Kicker className="mb-2">Model providers</Kicker>
          <div className="grid grid-cols-[1fr_1fr] gap-2.5">
            <div className="space-y-2">
              {providers.map((provider, index) => (
                <ApiProgramCard key={provider.title} delay={0.88 + index * 0.06} color={provider.color || T.blue} className="flex h-[56px] items-center gap-3 px-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: provider.fill || T.bluePale }}>
                    <MiniIcon type={provider.icon || 'gateway'} color={provider.color || T.blue} />
                  </div>
                  <div style={{ color: T.ink, fontFamily: T.sans, fontSize: 17, lineHeight: 0.95, fontWeight: 650 }}>{provider.title}</div>
                </ApiProgramCard>
              ))}
            </div>
            <div className="space-y-2">
              {capabilities.map((capability, index) => {
                const label = typeof capability === 'string' ? capability : capability.label;
                const icon = typeof capability === 'string' ? capabilityIcons[capability] : capability.icon;
                return (
                  <motion.div key={label} {...fade(1.02 + index * 0.04, 0)} className="flex items-center justify-start gap-2 rounded-full border bg-white px-4 py-1.5 text-left" style={{ borderColor: '#c9d7df', color: T.ink, boxShadow: '0 2px 8px rgba(23,24,20,0.07)', fontFamily: T.mono, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: T.bluePale }}>
                      <MiniIcon type={icon || 'dot'} color={T.blue} className="h-3.5 w-3.5" />
                    </span>
                    <span>{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[17.5%] top-[139px] flex items-center gap-2">
            <ApiProgramPill delay={0.72}>Use</ApiProgramPill>
            <ApiConnectorArrow width={20} />
          </div>
          <div className="absolute left-[42%] top-[139px] flex items-center gap-2">
            <ApiProgramPill delay={0.78}>Connect to</ApiProgramPill>
            <ApiConnectorArrow width={8} />
          </div>
          <div className="absolute left-[64.5%] top-[139px] flex items-center gap-2">
            <ApiProgramPill delay={0.95}>Accesses</ApiProgramPill>
            <ApiConnectorArrow width={28} />
          </div>
        </div>
      </div>

      <div className="absolute left-[5.8vw] right-[5.8vw] top-[42vh]">
        <div className="mb-3 text-center text-[15px] uppercase" style={{ color: T.muted, fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.18em' }}>How to get access</div>
        <div className="grid grid-cols-4 gap-5">
          {accessSteps.map((step, index) => (
            <motion.div key={step.title} {...fade(1.2 + index * 0.06, 0)} className="grid grid-cols-[46px_1fr] gap-3 items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full shrink-0" style={{ background: step.color || T.blue, color: '#fff', fontFamily: T.mono, fontSize: 21, fontWeight: 800 }}>{index + 1}</div>
              <div>
                <div style={{ color: T.ink, fontFamily: T.sans, fontSize: 26, lineHeight: 1, fontWeight: 700, letterSpacing: '-0.01em' }}>{step.title}</div>
                <div className="mt-1.5" style={{ color: '#5f6f82', fontFamily: T.sans, fontSize: 16, lineHeight: 1.25 }}>{step.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute left-[5.8vw] right-[5.8vw] top-[60vh] grid grid-cols-2 gap-4">
        {ownership.map((owner, index) => (
          <Card key={owner.title} delay={1.35 + index * 0.08} className="p-3">
            <div className="text-[14px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.18em', fontWeight: 800 }}>
              {owner.title}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {owner.items.map((item) => (
                <span key={item} className="rounded-full px-3 py-2 text-center text-[15px]" style={{ background: '#edf1f5', color: T.ink, fontFamily: T.mono, fontWeight: 700, letterSpacing: '0' }}>{item}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="absolute left-[5.8vw] right-[5.8vw] top-[76vh] flex items-center justify-between gap-3 flex-wrap">
        {footerBadges.map((badge, index) => (
          <React.Fragment key={badge}>
            <motion.div {...fade(1.52 + index * 0.04, 0)} className="whitespace-nowrap text-[14px] uppercase" style={{ color: '#6f7b8b', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.06em' }}>
              {badge}
            </motion.div>
            {index < footerBadges.length - 1 && (
              <span className="text-[14px]" style={{ color: '#f0b400' }}>|</span>
            )}
          </React.Fragment>
        ))}
      </div>
     </div>
    </Shell>
  );
};

const hostingDiamondLines = (label = '') => {
  if (label.includes('Recurring')) return ['Recurring', 'Risk / Scope', 'Review'];
  if (label.includes('Citizen App')) return ['Citizen App', 'Risk / Scope', 'Review'];
  if (label.includes('TritonAI')) return ['TritonAI Tools', '& Rapid Dev'];
  if (label.includes('Enterprise')) return ['Enterprise', 'Architecture /', 'Dev'];
  return label.split(' / ');
};

const HostingDiamond = ({ label, color, delay = 0.4 }) => (
  <motion.div {...fade(delay)} className="relative flex h-[88px] w-[88px] items-center justify-center">
    <div className="absolute inset-2 rotate-45 rounded-[7px] border-2 bg-white" style={{ borderColor: color, boxShadow: '0 4px 10px rgba(23,24,20,0.07)' }} />
    <div className="relative flex max-w-[74px] flex-col items-center text-center" style={{ color, fontFamily: T.mono, fontSize: 10, lineHeight: 1.05, fontWeight: 800, letterSpacing: '0' }}>
      {hostingDiamondLines(label).map((line, index) => (
        <span key={`${label}-${index}`} className="block">
          {line}
        </span>
      ))}
    </div>
  </motion.div>
);

const TierUserIcon = ({ tier, color }) => {
  if (tier === 0) {
    return (
      <svg viewBox="0 0 32 32" className="h-7 w-7">
        <circle cx="16" cy="11" r="5" fill={color} />
        <path d="M 6 28 C 8 20, 24 20, 26 28 Z" fill={color} />
      </svg>
    );
  }
  if (tier === 1) {
    return (
      <svg viewBox="0 0 48 32" className="h-7 w-12">
        {[10, 24, 38].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy="11" r="4" fill={color} />
            <path d={`M ${cx - 7} 28 C ${cx - 5} 22, ${cx + 5} 22, ${cx + 7} 28 Z`} fill={color} />
          </g>
        ))}
      </svg>
    );
  }
  if (tier === 2) {
    return (
      <svg viewBox="0 0 64 32" className="h-7 w-16">
        {[8, 20, 32, 44, 56].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy="11" r="3.5" fill={color} />
            <path d={`M ${cx - 6} 28 C ${cx - 4} 22, ${cx + 4} 22, ${cx + 6} 28 Z`} fill={color} />
          </g>
        ))}
      </svg>
    );
  }
  // Tier 3 — building
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7">
      <path d="M 4 28 V 12 L 16 5 L 28 12 V 28 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <rect x="10" y="18" width="3.5" height="6" fill={color} />
      <rect x="14.5" y="14" width="3" height="3" fill={color} />
      <rect x="18.5" y="18" width="3.5" height="6" fill={color} />
    </svg>
  );
};

const HarnessCampusHostingVariant = ({ slide }) => {
  const tiers = slide.hostingTiers || [];
  const titleFont = isCitizenAudience(slide) ? T.serif : T.sans;

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>
     <div className="absolute inset-0" style={{ fontFamily: T.sans }}>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[5vh]" style={{ maxWidth: '88vw' }}>
        <h1 className="leading-[0.98]" style={{ fontFamily: titleFont, fontSize: 'clamp(38px, 3.8vw, 60px)', fontWeight: isCitizenAudience(slide) ? 520 : 800 }}>
          <PartText parts={slide.parts} />
        </h1>
        {slide.subhead && (
          <motion.div {...fade(0.34)} className="mt-2" style={{ color: T.muted, fontFamily: T.sans, fontSize: 'clamp(16px, 1.2vw, 21px)' }}>
            {slide.subhead}
          </motion.div>
        )}
      </div>

      {/* 4 tier rows */}
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[17vh] bottom-[2vh] flex flex-col gap-12">
        {tiers.map((tier, index) => {
          const tierNum = index;
          return (
            <motion.div
              key={tier.tierLabel}
              {...fade(0.46 + index * 0.1)}
              className="relative grid grid-cols-[17%_24%_1fr_22%] items-center gap-4 rounded-[10px] border-2 px-6 py-5"
              style={{ borderColor: tier.color, background: tier.fill, borderLeftWidth: 9, boxShadow: `0 4px 14px ${tier.color}22` }}
            >
              {/* Col 1: Tier label + users + volume */}
              <div className="flex items-center gap-3.5">
                <TierUserIcon tier={tierNum} color={tier.color} />
                <div>
                  <div style={{ color: tier.color, fontFamily: T.mono, fontSize: 14, fontWeight: 800, letterSpacing: '0.18em' }}>{tier.tierLabel.toUpperCase()}</div>
                  <div className="mt-1" style={{ color: T.ink, fontFamily: T.sans, fontSize: 22, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.01em' }}>{tier.users}</div>
                  <div className="mt-1" style={{ color: T.muted, fontFamily: T.mono, fontSize: 14, fontWeight: 700 }}>{tier.volume}</div>
                </div>
              </div>

              {/* Col 2: Process step or review diamond */}
              <div className="flex items-center justify-center">
                {tier.review ? (
                  <div className="flex items-center gap-3">
                    <div className="rounded-full" style={{ background: tier.color, color: '#fff', fontFamily: T.mono, fontSize: 13, fontWeight: 800, padding: '8px 14px', whiteSpace: 'nowrap', letterSpacing: '0.1em' }}>
                      REVIEW
                    </div>
                    <div className="rounded-[8px] border-2 px-4 py-3 bg-white" style={{ borderColor: tier.color, color: tier.color, fontFamily: T.sans, fontSize: 16.5, lineHeight: 1.2, fontWeight: 650, maxWidth: 220 }}>
                      {tier.review}
                    </div>
                  </div>
                ) : tier.process ? (
                  <div className="rounded-[8px] border-2 bg-white px-4 py-3.5" style={{ borderColor: tier.color, color: tier.color, fontFamily: T.sans, fontSize: 17.5, lineHeight: 1.2, fontWeight: 650, maxWidth: 260 }}>
                    {tier.process}
                  </div>
                ) : null}
              </div>

              {/* Col 3: Deployment(s) — span Col 4 too when userDeployments is set, since Tier 0 has no recurring-review */}
              <div className="flex flex-wrap items-center gap-3" style={{ gridColumn: tier.userDeployments ? 'span 2' : 'auto' }}>
                {tier.userDeployments && tier.userDeployments.length > 0 && (
                  <div className="flex w-full flex-wrap items-stretch gap-3">
                    {tier.userDeployments.map((dep) => (
                      <div key={dep.label} className="flex flex-1 flex-col" style={{ minWidth: 240 }}>
                        <div className="rounded-[8px] border-2 bg-white px-4 py-3" style={{ borderColor: tier.softColor, color: T.ink, fontFamily: T.sans, fontSize: 17.5, fontWeight: 650 }}>
                          {dep.label}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(dep.tools || []).map((tool) => (
                            <span key={tool} className="rounded-[4px] border px-3 py-1 text-[14px]" style={{ borderColor: tier.softColor, color: tier.color, fontFamily: T.mono, fontWeight: 700, background: '#fff' }}>
                              {tool}
                            </span>
                          ))}
                        </div>
                        {dep.note && (
                          <div className="mt-1.5 italic" style={{ color: T.muted, fontFamily: T.serif, fontSize: 12.5, lineHeight: 1.3 }}>
                            {dep.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {tier.deploymentLabel && (
                  <div className="flex flex-col">
                    <div className="rounded-[8px] border-2 bg-white px-4 py-3" style={{ borderColor: tier.softColor, color: T.ink, fontFamily: T.sans, fontSize: 17.5, fontWeight: 650 }}>
                      {tier.deploymentLabel}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(tier.tools || []).map((tool) => (
                        <span key={tool} className="rounded-[4px] border px-3 py-1 text-[14px]" style={{ borderColor: tier.softColor, color: tier.color, fontFamily: T.mono, fontWeight: 700, background: '#fff' }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {tier.deployments &&
                  tier.deployments.map((dep) => (
                    <div key={dep.name} className="rounded-[8px] border-2 bg-white px-4 py-3" style={{ borderColor: tier.softColor, color: T.ink, fontFamily: T.sans, fontSize: 17.5, fontWeight: 650 }}>
                      <div>{dep.name}</div>
                      <div style={{ color: tier.color, fontFamily: T.mono, fontSize: 13.5, fontWeight: 700, marginTop: 4 }}>{dep.domain}</div>
                    </div>
                  ))}
                {tier.deployment && !tier.deployments && (
                  <div className="rounded-[8px] border-2 bg-white px-4 py-3" style={{ borderColor: tier.softColor, color: T.ink, fontFamily: T.sans, fontSize: 17.5, fontWeight: 650 }}>
                    <div>{tier.deployment}</div>
                    {tier.domain && <div style={{ color: tier.color, fontFamily: T.mono, fontSize: 13.5, fontWeight: 700, marginTop: 4 }}>{tier.domain}</div>}
                  </div>
                )}
              </div>

              {/* Col 4: Recurring review */}
              <div className="flex items-center justify-center">
                {tier.recurring && (
                  <div className="flex items-center gap-2.5">
                    <span style={{ color: tier.color, fontSize: 24, fontWeight: 600 }}>→</span>
                    <div className="rounded-[8px] border-2 px-4 py-3 bg-white" style={{ borderColor: tier.color, color: tier.color, fontFamily: T.sans, fontSize: 16.5, lineHeight: 1.2, fontWeight: 650, maxWidth: 200 }}>
                      {tier.recurring}
                    </div>
                  </div>
                )}
              </div>

              {/* Escalation badge (between tiers) — centered vertically in the gap */}
              {index < tiers.length - 1 && (
                <motion.div
                  {...fade(0.62 + index * 0.1, 0)}
                  className="absolute left-1/2 top-full z-10 -translate-x-1/2 translate-y-[14px] flex items-center gap-2 rounded-full px-4 py-1.5"
                  style={{
                    background: '#fff',
                    border: `2px solid ${T.coral}`,
                    boxShadow: '0 4px 10px rgba(212,122,95,0.18)'
                  }}
                >
                  <span style={{ color: T.coral, fontSize: 18, lineHeight: 1, fontWeight: 800 }}>↓</span>
                  <span style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 12, letterSpacing: '0.16em', fontWeight: 800, textTransform: 'uppercase' }}>
                    escalate / migrate
                  </span>
                  <span style={{ color: T.coral, fontSize: 18, lineHeight: 1, fontWeight: 800 }}>↓</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
     </div>
    </Shell>
  );
};

const HarnessSkillsVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} />
    <Content className="grid grid-cols-[1fr_28%] gap-8">
      <div className="space-y-7">
        {[
          [slide.skillsLabel || 'Skills · task-specific workflows', slide.skills],
          [slide.toolsLabel || 'Tools · universal primitives', slide.tools]
        ].map(([label, items], row) => (
          <Card key={`${label}-${row}`} delay={0.45 + row * 0.18} className="p-5">
            <Kicker>{label}</Kicker>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {(items || []).map((item, index) => (
                <Pill key={`${item.name}-${index}`} delay={0.7 + row * 0.18 + index * 0.05}>
                  <span className="block">{item.name}</span>
                  <span className="mt-1 block text-[11px]" style={{ color: T.muted }}>{item.note}</span>
                </Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Card delay={0.82} className="p-5">
        <Kicker>{slide.registryLabel || 'Registry'}</Kicker>
        <div className="mt-4">
          {(slide.registry || [
            { name: 'read_file', mode: 'allow' },
            { name: 'edit_file', mode: 'allow' },
            { name: 'bash', mode: 'allow' },
            { name: 'search', mode: 'allow' },
            { name: 'api_request', mode: 'allow' },
            { name: 'open_url', mode: 'allow' }
          ]).map((item, index) => (
            <motion.div key={`${item.name}-${index}`} {...fade(0.96 + index * 0.045)} className="grid grid-cols-[1fr_62px] border-b py-3" style={{ borderColor: T.rule, fontFamily: T.mono, fontSize: 14 }}>
              <span>{item.name}</span><span style={{ color: T.coralDark }}>{item.mode || 'allow'}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </Content>
  </Shell>
);

const SubagentOutputGlyph = ({ type, cx, cy, color }) => {
  if (type === 'deck') {
    return (
      <g>
        <rect x={cx - 7} y={cy - 6} width={14} height={12} rx={1.5} fill="none" stroke={color} strokeWidth={1.4} />
        <line x1={cx - 5} y1={cy - 2} x2={cx + 5} y2={cy - 2} stroke={color} strokeWidth={1.3} />
        <line x1={cx - 5} y1={cy + 1} x2={cx + 2} y2={cy + 1} stroke={color} strokeWidth={1.1} />
        <line x1={cx - 5} y1={cy + 4} x2={cx + 4} y2={cy + 4} stroke={color} strokeWidth={1.1} />
      </g>
    );
  }
  if (type === 'doc') {
    return (
      <g>
        <path d={`M ${cx - 5} ${cy - 7} L ${cx + 3} ${cy - 7} L ${cx + 6} ${cy - 4} L ${cx + 6} ${cy + 6} L ${cx - 5} ${cy + 6} Z`} fill="none" stroke={color} strokeWidth={1.4} />
        <line x1={cx - 3} y1={cy - 1} x2={cx + 4} y2={cy - 1} stroke={color} strokeWidth={1.1} />
        <line x1={cx - 3} y1={cy + 2} x2={cx + 4} y2={cy + 2} stroke={color} strokeWidth={1.1} />
      </g>
    );
  }
  if (type === 'app') {
    return (
      <text x={cx} y={cy + 4} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 800, letterSpacing: '0.02em' }} fill={color}>
        {'</>'}
      </text>
    );
  }
  if (type === 'flow') {
    return (
      <g>
        <path d={`M ${cx + 4} ${cy - 4} A 6 6 0 1 1 ${cx - 4} ${cy + 4}`} fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
        <polygon points={`${cx + 6.5},${cy - 4} ${cx + 1.5},${cy - 4} ${cx + 4},${cy - 7.5}`} fill={color} />
      </g>
    );
  }
  return null;
};

const HarnessSubagentsVariant = ({ slide }) => {
  const agents = slide.agents || [];
  const outputs = slide.outputs || [
    { type: 'deck', label: 'deck' },
    { type: 'doc', label: 'doc' },
    { type: 'app', label: 'app' },
    { type: 'flow', label: 'flow' }
  ];
  const targetXs = [180, 620, 1060];
  const mergeX = 522;

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>
      <JobSpine activeKey={slide.spineActive} />

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[5vh]" style={{ maxWidth: '88vw' }}>
        <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 520 }}>
          <PartText parts={slide.parts} />
        </h1>
        {slide.subhead && (
          <motion.div {...fade(0.34)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(17px, 1.3vw, 22px)' }}>
            {slide.subhead}
          </motion.div>
        )}
      </div>

      {/* Parent main-thread box, with breathing room under the subhead */}
      <motion.div
        {...fade(0.45)}
        className="absolute top-[19vh] left-1/2 -translate-x-1/2 flex h-[58px] w-[280px] items-center justify-center rounded-[8px]"
        style={{
          background: T.black,
          color: '#fff',
          fontFamily: T.mono,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.18em',
          boxShadow: '0 6px 18px rgba(0,0,0,0.18)'
        }}
      >
        <div className="text-center">
          <div style={{ color: '#f0c14d', fontSize: 11, letterSpacing: '0.22em' }}>PARENT</div>
          <div className="mt-0.5" style={{ fontSize: 14, letterSpacing: '0.06em' }}>main thread</div>
        </div>
      </motion.div>

      {/* Sub-agents diagram — orchestrator tree with animated dispatch + return.
          The container top is anchored to the bottom of the parent main-thread box
          (19vh + 58px) and the SVG itself is yMin-aligned so the dispatch paths
          emerge directly from the parent rather than from a floating gap below it. */}
      <div className="absolute left-[4.8vw] right-[4.8vw] bottom-[10vh]" style={{ top: 'calc(19vh + 58px)' }}>
        <svg viewBox="0 0 1240 460" preserveAspectRatio="xMidYMin meet" className="h-full w-full overflow-visible">
          {/* Top dispatch — colored paths from parent (above SVG) down to each sub-agent, with goal chips and marching-ants flow */}
          {agents.map((agent, index) => {
            const targetX = targetXs[index];
            const sourceX = 620;
            const pathD = index === 1
              ? `M ${sourceX} 0 L ${targetX} 80`
              : `M ${sourceX} 0 C ${sourceX} 38, ${targetX} 38, ${targetX} 80`;
            const goal = (agent.kicker || '').split(' ')[0].toLowerCase() || 'task';
            const midX = (sourceX + targetX) / 2;
            return (
              <g key={`dispatch-${index}`}>
                <motion.path
                  {...fade(0.5 + index * 0.06, 0)}
                  d={pathD}
                  fill="none"
                  stroke={agent.stroke}
                  strokeWidth="2"
                  strokeDasharray="4 5"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-9" dur="1.4s" repeatCount="indefinite" />
                </motion.path>
                {/* Goal chip mid-line — width sized to fit 'GOAL · VERIFY' */}
                <motion.g {...fade(0.78 + index * 0.06, 0)}>
                  <rect x={midX - 60} y={28} width={120} height={22} rx={5} fill="#fff" stroke={agent.stroke} strokeWidth={1.3} />
                  <text x={midX} y={43} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.12em', fontWeight: 800, textTransform: 'uppercase' }} fill={agent.stroke}>
                    goal · {goal}
                  </text>
                </motion.g>
              </g>
            );
          })}

          {/* Three sub-agent boxes */}
          {agents.map((agent, index) => {
            const x = [40, 480, 920][index];
            return (
              <motion.g key={`${agent.name}-${index}`} {...fade(0.85 + index * 0.14)}>
                <rect x={x} y="80" width="280" height="200" rx="10" fill={agent.fill} stroke={agent.stroke} strokeWidth="2" />
                <text x={x + 24} y="110" style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: '0.16em', fontWeight: 800 }} fill={agent.stroke}>
                  {agent.kicker || 'ISOLATED SESSION'}
                </text>

                {/* Big italic letter on the left */}
                <circle cx={x + 60} cy="168" r="36" fill={T.bg} stroke={agent.stroke} strokeWidth="1.6" />
                <text x={x + 60} y="178" textAnchor="middle" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 40, fontWeight: 520 }} fill={agent.stroke}>
                  {agent.letter}
                </text>

                {/* Mode + tools on the right */}
                <text x={x + 110} y="144" style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.12em', fontWeight: 700 }} fill={T.muted}>
                  {agent.mode || 'scoped work'}
                </text>
                {(agent.tools || ['tool', 'state']).map((tool, toolIndex) => {
                  const tx = x + 110 + (toolIndex % 2) * 80;
                  const ty = 158 + Math.floor(toolIndex / 2) * 28;
                  return (
                    <g key={`${agent.name}-${tool}-${toolIndex}`}>
                      <rect x={tx} y={ty} width="74" height="22" rx="4" fill="#fff" stroke={T.faint} />
                      <text x={tx + 37} y={ty + 15} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700 }} fill={T.ink}>
                        {tool}
                      </text>
                    </g>
                  );
                })}

                {/* Bottom name */}
                <text x={x + 140} y="260" textAnchor="middle" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 22, fontWeight: 520 }} fill={T.ink}>
                  {agent.name}
                </text>
              </motion.g>
            );
          })}

          {/* Bottom return — colored paths from each sub-agent merging into the result badge, with marching-ants reversed */}
          {agents.map((agent, index) => {
            const sourceX = targetXs[index];
            const pathD = index === 1
              ? `M ${sourceX} 280 L ${mergeX} 378`
              : `M ${sourceX} 280 C ${sourceX} 332, ${mergeX} 332, ${mergeX} 378`;
            return (
              <motion.path
                key={`return-${index}`}
                {...fade(1.55 + index * 0.06, 0)}
                d={pathD}
                fill="none"
                stroke={agent.stroke}
                strokeWidth="2"
                strokeDasharray="4 5"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="9" dur="1.4s" repeatCount="indefinite" />
              </motion.path>
            );
          })}

          {/* Result badge — moved left so the output icons can sit beside it */}
          <motion.rect
            {...fade(2.0, 0)}
            x="402"
            y="378"
            width="240"
            height="44"
            rx="8"
            fill={T.blue}
          />
          <motion.text
            {...fade(2.1, 0)}
            x="522"
            y="406"
            textAnchor="middle"
            style={{ fontFamily: T.mono, fontSize: 14, letterSpacing: '0.18em', fontWeight: 800 }}
            fill="#fff"
          >
            ASSEMBLED RESULT
          </motion.text>

          {/* Output icons next to the badge — what the orchestrator actually produces */}
          {outputs.map((out, i) => {
            const x = 666 + i * 46;
            return (
              <motion.g key={out.type} {...fade(2.25 + i * 0.08, 0)}>
                <rect x={x} y={378} width={38} height={44} rx={6} fill="#fff" stroke={T.blue} strokeWidth={1.5} />
                <SubagentOutputGlyph cx={x + 19} cy={394} type={out.type} color={T.blue} />
                <text x={x + 19} y={416} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: '0.12em', fontWeight: 800, textTransform: 'uppercase' }} fill={T.blue}>
                  {out.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

    </Shell>
  );
};

const HarnessBuiltinsVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} />
    <Content className="space-y-8">
      {[
        ['Vendor-specific skills', slide.vendorSkills],
        ['Non-negotiable primitives', slide.primitives]
      ].map(([label, items], row) => (
        <Card key={`${label}-${row}`} delay={0.45 + row * 0.2} className="p-6">
          <div className="flex items-center justify-between">
            <Kicker>{label}</Kicker>
            <div className="text-[12px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.18em' }}>
              {row === 0 ? 'where harness vendors compete' : 'no agent works without these'}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-5">
            {(items || []).map((item, index) => (
              <Pill key={`${item.name}-${index}`} delay={0.7 + row * 0.18 + index * 0.05}>
                <span className="block">{item.name}</span>
                <span className="mt-1 block text-[11px]" style={{ color: T.muted }}>{item.note}</span>
              </Pill>
            ))}
          </div>
        </Card>
      ))}
    </Content>
  </Shell>
);

const HarnessSessionVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} />
    <Content className="grid grid-cols-[60%_1fr] gap-8">
      <Card delay={0.45} className="p-0" style={{ background: T.black, borderColor: T.black }}>
        <div className="p-5 text-[13px]" style={{ color: '#a99f91', fontFamily: T.mono }}>
          ~/codex/projects/harness/session.jsonl <span style={{ color: T.coral }}>ACTIVE NOW</span>
        </div>
        <div className="px-6 pb-6" style={{ color: '#eee7db', fontFamily: T.mono, fontSize: 14, lineHeight: 1.65 }}>
          {(slide.logLines || []).slice(0, 11).map((line, index) => (
            <motion.div key={`${line}-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 + index * 0.04 }}>{line}</motion.div>
          ))}
        </div>
      </Card>
      <div className="space-y-5">
        {(slide.cards || []).map((card, index) => (
          <Card key={`${card.title}-${index}`} delay={0.7 + index * 0.1} className="p-5">
            <div style={{ color: card.accent ? T.coralDark : T.ink, fontSize: 31 }}>{card.title}</div>
            <div className="mt-1 text-[13px]" style={{ color: T.muted, fontFamily: T.mono }}>{card.note}</div>
          </Card>
        ))}
      </div>
    </Content>
  </Shell>
);

const HarnessSystemPromptVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} />
    <Content className="grid grid-cols-[38%_1fr] gap-8">
      <Card delay={0.45} className="p-6">
        <Kicker>Directory walk</Kicker>
        <div className="mt-5" style={{ fontFamily: T.mono, fontSize: 15, lineHeight: 2 }}>
          {['./', '  AGENTS.md', '  .codex/instructions.md', '  .github/rules.md'].map((line, index) => (
            <motion.div key={`${line}-${index}`} {...fade(0.7 + index * 0.07)}>
              {line}<span className="float-right" style={{ color: T.coralDark }}>{['3.2k', '2.8k', '1.4k', '0.9k'][index]}</span>
            </motion.div>
          ))}
        </div>
      </Card>
      <Card delay={0.55} className="p-6">
        <Kicker>System prompt · sent to LLM</Kicker>
        <div className="mt-5" style={{ fontFamily: T.mono, fontSize: 15 }}>
          {['You are an autonomous agent...', '# Environment', '# Project', '# Agent instructions', '# Runtime config'].map((line, index) => (
            <motion.div key={`${line}-${index}`} {...fade(0.78 + index * 0.08)} className="mb-6 grid grid-cols-[64px_1fr]">
              <span style={{ color: T.coralDark }}>{String(8 + index * 11).padStart(3, '0')}</span>
              <span>{line}<em className="float-right" style={{ color: T.muted }}>attached</em></span>
            </motion.div>
          ))}
        </div>
      </Card>
      <motion.div {...fade(1.28)} className="absolute bottom-0 left-0 right-0 rounded-[5px] border p-4" style={{ borderColor: T.coralPale, background: '#f8ebe2', fontSize: 18 }}>
        <span className="text-[12px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.2em' }}>Cache break</span>
        <span className="ml-4">Dynamic above static breaks prefix caching. Order matters.</span>
      </motion.div>
    </Content>
  </Shell>
);

const HarnessLifecycleVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} />
    <Content>
      <div className="flex items-center justify-center gap-6">
        {(slide.steps || []).map((step, index) => (
          <React.Fragment key={`${step.label}-${index}`}>
            <Card delay={0.45 + index * 0.08} className="min-w-[150px] px-5 py-4 text-center">
              <div style={{ color: step.dark ? T.ink : T.coralDark, fontSize: 25, fontStyle: 'italic' }}>{step.label}</div>
              <div className="text-[11px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.15em' }}>{step.note}</div>
            </Card>
            {index < slide.steps.length - 1 && (
              <motion.div {...fade(0.5 + index * 0.08)} style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 22 }}>→</motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-[34%_1fr] gap-8">
        <Card delay={0.9} className="p-6">
          <Kicker>Protocol</Kicker>
          <div className="mt-5 space-y-4" style={{ fontFamily: T.mono, fontSize: 15 }}>
            <div>JSON on stdin</div>
            <div>exit code: 0 = allow</div>
            <div>exit code: 2 = deny</div>
          </div>
        </Card>
        <Card delay={1.0} className="p-6">
          {['ls', 'cat /tmp/', 'rm -rf /'].map((cmd, index) => (
            <motion.div key={`${cmd}-${index}`} {...fade(1.12 + index * 0.1)} className="grid grid-cols-[1fr_110px] border-b py-4" style={{ borderColor: T.rule, fontFamily: T.mono, fontSize: 16 }}>
              <span>{cmd}</span>
              <span style={{ color: [T.green, T.coralDark, '#b7473d'][index], textAlign: 'right' }}>{['ALLOW', 'CONFIRM', 'DENY'][index]}</span>
            </motion.div>
          ))}
        </Card>
      </div>
    </Content>
  </Shell>
);

const HarnessPermissionsVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} />
    <Content className="grid grid-cols-[42%_1fr] gap-10 items-center">
      <Card delay={0.92} className="p-6">
        <Kicker>Interactive approval</Kicker>
        <div className="mt-4" style={{ fontSize: 31 }}>Should I run <code style={{ fontFamily: T.mono }}>rm output.txt</code>?</div>
        <div className="mt-5 flex gap-3">
          {['allow', 'deny', 'always allow'].map((label, index) => (
            <span key={`${label}-${index}`} className="rounded-[4px] border px-4 py-2 text-[13px]" style={{ borderColor: index === 0 ? T.coral : T.faint, color: index === 0 ? '#fff' : T.muted, background: index === 0 ? T.coral : '#fff', fontFamily: T.mono }}>
              {label}
            </span>
          ))}
        </div>
      </Card>
      <svg viewBox="0 0 560 430" className="h-full w-full overflow-visible">
        {[180, 132, 84].map((r, index) => (
          <motion.circle key={`ring-${index}`} {...lineDraw(0.45 + index * 0.12)} cx="280" cy="215" r={r} fill={index === 2 ? T.bluePale : 'none'} stroke={index === 0 ? T.coral : index === 1 ? T.coralPale : T.blue} strokeDasharray={index === 0 ? '4 5' : 'none'} />
        ))}
        <motion.text {...fade(0.85)} x="280" y="226" textAnchor="middle" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 43 }} fill={T.blue}>safe</motion.text>
        {[
          ['read_file', 220, 158],
          ['write_file', 340, 158],
          ['bash', 205, 270],
          ['grep', 325, 292],
          ['email', 388, 115],
          ['admin', 415, 78]
        ].map(([label, x, y], index) => (
          <motion.g key={`${label}-${index}`} {...fade(1 + index * 0.06)}>
            <rect x={x - 55} y={y - 16} width="110" height="32" rx="16" fill="#fff8f2" stroke={index > 3 ? T.coral : T.blue} />
            <text x={x} y={y + 5} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 600 }} fill={index > 3 ? T.coralDark : T.blue}>{label}</text>
          </motion.g>
        ))}
      </svg>
    </Content>
  </Shell>
);

const HarnessUcsdVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} maxWidth="86vw" />
    <Content className="grid grid-cols-[29%_1fr_29%] gap-7 items-center" style={{ top: '30vh', bottom: '12vh' }}>
      <div className="space-y-5">
        {(slide.left || []).map((item, index) => (
          <Card key={`${item.title}-${index}`} delay={0.42 + index * 0.1} className="p-5">
            <Kicker>{item.kicker}</Kicker>
            <div className="mt-3" style={{ fontSize: 28, lineHeight: 1.05, fontWeight: 600 }}>{item.title}</div>
            <div className="mt-2" style={{ color: T.muted, fontSize: 17, lineHeight: 1.35 }}>{item.body}</div>
          </Card>
        ))}
      </div>
      <div>
        <motion.div {...fade(0.62)} className="relative mx-auto flex h-[34vh] w-[34vh] items-center justify-center rounded-full border" style={{ borderColor: T.coralPale, background: '#fff8f2' }}>
          <div className="absolute inset-[9%] rounded-full border" style={{ borderColor: T.faint }} />
          <div className="absolute inset-[22%] rounded-full" style={{ background: T.bluePale }} />
          <div className="relative text-center">
            <div style={{ color: T.blue, fontSize: 38, lineHeight: 1.02, fontWeight: 620 }}>{slide.centerTitle || 'TritonAI'}</div>
            <div className="mt-2 text-[11px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.18em' }}>{slide.centerSubtitle || 'UCSD harness path'}</div>
          </div>
        </motion.div>
        <Card delay={0.82} className="mx-auto mt-5 max-w-[430px] p-4">
          <Kicker>{slide.harnessKicker || 'Harness surfaces'}</Kicker>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(slide.harnesses || []).map((harness, index) => (
              <motion.div key={harness.name} {...fade(0.98 + index * 0.055, 0)} className="rounded-[5px] border px-3 py-2 text-center" style={{ borderColor: harness.highlight ? T.coral : T.faint, background: harness.highlight ? '#fff8f2' : '#fff', color: harness.highlight ? T.coralDark : T.ink }}>
                <div style={{ fontSize: 17, lineHeight: 1, fontWeight: 650 }}>{harness.name}</div>
                <div className="mt-1 text-[9px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.1em', fontWeight: 700 }}>{harness.note}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        {(slide.right || []).map((item, index) => (
          <Card key={`${item.title}-${index}`} delay={0.62 + index * 0.1} className="p-5" style={item.highlight ? { background: '#fff8f2', borderColor: T.coral } : undefined}>
            <Kicker>{item.kicker}</Kicker>
            <div className="mt-3" style={{ fontSize: 28, lineHeight: 1.05, fontWeight: 600 }}>{item.title}</div>
            <div className="mt-2" style={{ color: T.muted, fontSize: 17, lineHeight: 1.35 }}>{item.body}</div>
          </Card>
        ))}
      </div>
    </Content>
  </Shell>
);

const HarnessActionPlanVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} maxWidth="86vw" />
    <Content className="grid grid-cols-[1fr_34%] gap-10 items-center">
      <div className="grid grid-cols-3 gap-5">
        {(slide.actions || []).map((action, index) => (
          <Card key={`${action.title}-${index}`} delay={0.42 + index * 0.12} className="min-h-[310px] p-7">
            <div style={{ color: T.coralDark, fontSize: 58, fontStyle: 'italic' }}>{String(index + 1).padStart(2, '0')}</div>
            <div className="mt-4" style={{ fontSize: 34, lineHeight: 1.04, fontWeight: 600 }}>{action.title}</div>
            <div className="mt-5" style={{ color: T.muted, fontSize: 19, lineHeight: 1.35 }}>{action.body}</div>
          </Card>
        ))}
      </div>
      <Card delay={0.88} className="p-7">
        <Kicker>The ask</Kicker>
        <div className="mt-4" style={{ fontSize: 43, lineHeight: 1.05, fontWeight: 560 }}>
          Move one person one level.
        </div>
        <div className="mt-5" style={{ color: T.muted, fontSize: 21, lineHeight: 1.35 }}>
          Use the rubric as a coaching tool: identify current adoption, pick one practical artifact, and make the next step visible.
        </div>
      </Card>
    </Content>
  </Shell>
);

const HarnessRecapVariant = ({ slide }) => {
  const rubric = slide.rubric || slide.summaryCards || [];
  const dimensions = slide.dimensions || [];

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[3vh]" style={{ maxWidth: '92vw' }}>
        <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(38px, 3.8vw, 60px)', fontWeight: 520 }}>
          <PartText parts={slide.parts || [{ text: 'Recap: rubric, harness, expectations.' }]} />
        </h1>
        {slide.subhead && (
          <motion.div {...fade(0.34)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(16px, 1.2vw, 20px)' }}>
            {slide.subhead}
          </motion.div>
        )}
      </div>

      {/* 5-level rubric — main visual */}
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[14vh] grid grid-cols-5 gap-3">
        {rubric.map((level, index) => {
          const accentColor = level.color || T.coralDark;
          const fillColor = level.fill || '#fff8f2';
          const isHighlight = level.highlight;
          // Visual lift: cards higher on the scale appear visually elevated
          const lift = index * 4; // 0, 4, 8, 12, 16 px
          // Render anchor text with **bold** markers
          const renderAnchor = (text) => {
            if (!text) return null;
            const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
            return parts.map((p, i) => {
              if (p.startsWith('**') && p.endsWith('**')) {
                return <strong key={i} style={{ color: accentColor, fontWeight: 700 }}>{p.slice(2, -2)}</strong>;
              }
              return <span key={i}>{p}</span>;
            });
          };
          return (
            <Card
              key={`${level.label}-${index}`}
              delay={0.5 + index * 0.08}
              className="flex min-h-[420px] flex-col p-5"
              style={{
                borderColor: accentColor,
                background: fillColor,
                borderTopWidth: 8,
                borderTopColor: accentColor,
                boxShadow: isHighlight
                  ? `0 10px 26px ${accentColor}3a`
                  : `0 ${4 + index}px ${10 + index * 2}px ${accentColor}22`,
                transform: `translateY(${-lift}px)`
              }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="rounded-[6px] px-3 py-1.5"
                  style={{ background: accentColor, color: '#fff', fontFamily: T.mono, fontSize: 22, fontWeight: 800 }}
                >
                  {level.score}
                </span>
                {isHighlight && (
                  <span className="text-[11px] uppercase" style={{ color: accentColor, fontFamily: T.mono, letterSpacing: '0.18em', fontWeight: 800 }}>
                    {level.kicker || 'Baseline'}
                  </span>
                )}
                {index === rubric.length - 1 && (
                  <span className="ml-auto text-[14px]" style={{ color: accentColor }}>★</span>
                )}
              </div>
              <div className="mt-4" style={{ fontSize: 26, lineHeight: 1.06, fontWeight: 700, color: accentColor }}>
                {level.label}
              </div>
              <div className="mt-4 flex-1" style={{ color: T.ink, fontSize: 17.5, lineHeight: 1.42 }}>
                {renderAnchor(level.anchor || level.body)}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Movement indicator — gradient arrow tight under the rubric */}
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[57vh] flex items-center gap-3">
        <span className="text-[11px] uppercase shrink-0" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
          Direction of growth
        </span>
        <svg className="flex-1" height="20" preserveAspectRatio="none" viewBox="0 0 1000 20">
          <defs>
            <linearGradient id="growth-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a04848" />
              <stop offset="25%" stopColor="#b48058" />
              <stop offset="50%" stopColor="#d47a5f" />
              <stop offset="72%" stopColor="#a8b070" />
              <stop offset="100%" stopColor="#5d8350" />
            </linearGradient>
          </defs>
          {/* Bar ends precisely where the arrowhead's flat edge begins */}
          <rect x="0" y="6" width="982" height="8" rx="4" fill="url(#growth-grad)" />
          {/* Arrowhead: triangle whose flat edge sits flush at x=982, tip at x=1000 */}
          <polygon points="982,0 982,20 1000,10" fill="#5d8350" />
        </svg>
        <span className="text-[11px] uppercase shrink-0" style={{ color: '#5d8350', fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
          Force multiplier →
        </span>
      </div>

      {/* Tagline — sits below the gradient arrow */}
      {slide.bottomLine && (
        <motion.div
          {...fade(1.0)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[65vh] flex items-start gap-5"
        >
          {slide.bottomLineLabel && (
            <span
              className="shrink-0 rounded-[5px] px-3 py-2 text-[12.5px]"
              style={{
                background: T.coral,
                color: '#fff',
                fontFamily: T.mono,
                fontWeight: 800,
                letterSpacing: '0.22em',
                whiteSpace: 'nowrap'
              }}
            >
              {slide.bottomLineLabel}
            </span>
          )}
          <div style={{ fontSize: 'clamp(17px, 1.4vw, 22px)', fontWeight: 560, lineHeight: 1.3 }}>
            {slide.bottomLine}
          </div>
        </motion.div>
      )}

      {/* Visual connection — what's behind the rubric */}
      {slide.poweredBy && (
        <motion.div
          {...fade(1.2)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[67vh] flex items-center gap-4 flex-wrap"
        >
          <span className="text-[11px] uppercase shrink-0" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
            {slide.poweredByLabel || 'Powered by the program'}
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            {slide.poweredBy.map((item) => (
              <span
                key={item}
                className="rounded-full border px-4 py-1.5 text-[15.5px]"
                style={{
                  borderColor: T.faint,
                  background: '#fff',
                  color: T.ink,
                  fontFamily: T.mono,
                  fontWeight: 700
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </Shell>
  );
};

const HarnessConvergenceVariant = ({ slide }) => {
  const streams = slide.streams || [];
  const left = streams[0] || {};
  const right = streams[1] || {};

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>
      {slide.kicker && (
        <motion.div
          {...fade(0.18)}
          className="absolute left-[4.8vw] top-[5vh] text-[13px] uppercase"
          style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em' }}
        >
          {slide.kicker}
        </motion.div>
      )}
      <h1
        className="absolute left-[4.8vw] right-[4.8vw] top-[10vh] leading-[0.96]"
        style={{ fontSize: 'clamp(48px, 5.4vw, 86px)', fontWeight: 520 }}
      >
        <PartText parts={slide.parts} delay={0.25} />
      </h1>
      {slide.subhead && (
        <motion.div
          {...fade(0.5)}
          className="absolute left-[4.8vw] top-[28vh] italic"
          style={{
            color: T.muted,
            fontSize: 'clamp(18px, 1.4vw, 24px)',
            maxWidth: '74vw',
            lineHeight: 1.32
          }}
        >
          {slide.subhead}
        </motion.div>
      )}

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[33vh] bottom-[20vh] grid grid-cols-[1fr_120px_1fr] items-stretch gap-0">
        <Card delay={0.65} className="p-9">
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3.5 py-2 text-[14px]"
              style={{
                background: T.bluePale,
                color: T.blue,
                fontFamily: T.mono,
                fontWeight: 800,
                letterSpacing: '0.2em'
              }}
            >
              {left.kicker || 'STREAM 1'}
            </span>
          </div>
          <div
            className="mt-6"
            style={{ fontSize: 46, lineHeight: 1.05, fontWeight: 620, color: T.blue }}
          >
            {left.title}
          </div>
          <div className="mt-5" style={{ color: T.muted, fontSize: 24, lineHeight: 1.34 }}>
            {left.body}
          </div>
          {left.examples && (
            <div className="mt-6 flex flex-wrap gap-3">
              {left.examples.map((ex) => {
                const item = typeof ex === 'string' ? { name: ex } : ex;
                return (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-3 rounded-[8px] border-2 px-5 py-3 text-[20px]"
                    style={{
                      borderColor: '#b9d3dc',
                      background: '#fff',
                      color: T.blue,
                      fontFamily: T.mono,
                      fontWeight: 700
                    }}
                  >
                    {item.logoType === 'ucsd' ? (
                      <UCSDLogoMark className="h-7 w-[104px] shrink-0" />
                    ) : item.logoUrl && (
                      <img
                        src={item.logoUrl}
                        alt=""
                        aria-hidden="true"
                        className="h-7 w-7 shrink-0"
                        style={{ objectFit: 'contain' }}
                      />
                    )}
                    {item.name}
                  </span>
                );
              })}
            </div>
          )}
        </Card>

        <div className="relative flex h-full items-center justify-center">
          <svg viewBox="0 0 120 220" className="h-full w-full overflow-visible">
            <motion.path
              {...lineDraw(0.95)}
              d="M 0 60 C 40 60, 50 110, 60 110"
              fill="none"
              stroke={T.blue}
              strokeWidth="1.6"
            />
            <motion.path
              {...lineDraw(1.05)}
              d="M 0 160 C 40 160, 50 110, 60 110"
              fill="none"
              stroke={T.coralDark}
              strokeWidth="1.6"
            />
            <motion.path
              {...lineDraw(1.18)}
              d="M 60 110 L 116 110"
              fill="none"
              stroke={T.ink}
              strokeWidth="1.8"
            />
            <motion.polygon
              {...fade(1.32, 0)}
              points="116,110 104,104 104,116"
              fill={T.ink}
            />
            <motion.circle
              {...fade(1.2, 0)}
              cx="60"
              cy="110"
              r="14"
              fill={T.coral}
            />
            <motion.text
              {...fade(1.32, 0)}
              x="60"
              y="115"
              textAnchor="middle"
              style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 800 }}
              fill="#fff"
            >
              ×
            </motion.text>
          </svg>
        </div>

        <Card
          delay={0.78}
          className="p-9"
          style={{ background: '#fff8f2', borderColor: T.coralPale }}
        >
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3.5 py-2 text-[14px]"
              style={{
                background: T.coralPale,
                color: T.coralDark,
                fontFamily: T.mono,
                fontWeight: 800,
                letterSpacing: '0.2em'
              }}
            >
              {right.kicker || 'STREAM 2'}
            </span>
          </div>
          <div
            className="mt-6"
            style={{ fontSize: 46, lineHeight: 1.05, fontWeight: 620, color: T.coralDark }}
          >
            {right.title}
          </div>
          <div className="mt-5" style={{ color: T.muted, fontSize: 24, lineHeight: 1.34 }}>
            {right.body}
          </div>
          {right.examples && (
            <div className="mt-6 flex flex-wrap gap-3">
              {right.examples.map((ex) => {
                const item = typeof ex === 'string' ? { name: ex } : ex;
                return (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-3 rounded-[8px] border-2 px-5 py-3 text-[20px]"
                    style={{
                      borderColor: T.coralPale,
                      background: '#fff',
                      color: T.coralDark,
                      fontFamily: T.mono,
                      fontWeight: 700
                    }}
                  >
                    {item.logoType === 'ucsd' ? (
                      <UCSDLogoMark className="h-7 w-[104px] shrink-0" />
                    ) : item.logoUrl && (
                      <img
                        src={item.logoUrl}
                        alt=""
                        aria-hidden="true"
                        className="h-7 w-7 shrink-0"
                        style={{ objectFit: 'contain' }}
                      />
                    )}
                    {item.name}
                  </span>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {slide.outcome && (
        <motion.div
          {...fade(1.4)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[86vh] flex items-center gap-5"
        >
          <span
            className="rounded-[5px] px-3 py-2 text-[12px]"
            style={{
              background: T.coral,
              color: '#fff',
              fontFamily: T.mono,
              fontWeight: 800,
              letterSpacing: '0.22em',
              whiteSpace: 'nowrap'
            }}
          >
            {slide.outcome.label || 'PARADIGM SHIFT'}
          </span>
          <div style={{ fontSize: 'clamp(20px, 1.7vw, 28px)', fontWeight: 560, lineHeight: 1.2 }}>
            {slide.outcome.headline}
          </div>
        </motion.div>
      )}
    </Shell>
  );
};

const HarnessDataUnlockVariant = ({ slide }) => {
  const harnesses = slide.harnesses || [
    { name: 'Claude Code', logoUrl: 'https://cdn.simpleicons.org/anthropic/171814' },
    { name: 'Codex', logoUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai.svg' },
    { name: 'OpenCode', logoUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/opencode.svg' }
  ];
  const prioritySystems = slide.prioritySystems || [];
  const alsoSystems = slide.alsoSystems || [];
  const governance = slide.governance || [];

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[3vh]" style={{ maxWidth: '88vw' }}>
        <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(34px, 3.5vw, 56px)', fontWeight: 520 }}>
          <PartText parts={slide.parts} />
        </h1>
        {slide.subhead && (
          <motion.div {...fade(0.38)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(16px, 1.25vw, 21px)' }}>
            {slide.subhead}
          </motion.div>
        )}
      </div>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[12.5vh] grid grid-cols-[1fr_300px] gap-4 items-start">
        {/* Center: stack of harnesses → MCP → data ecosystem */}
        <div className="flex flex-col gap-1.5">
          {/* Top: Harnesses row */}
          <Card delay={0.5} className="p-3">
            <div className="flex items-baseline gap-3">
              <span className="text-[12.5px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
                Harnesses
              </span>
              <span style={{ color: T.muted, fontFamily: T.serif, fontStyle: 'italic', fontSize: 16 }}>
                what teams actually use
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {harnesses.map((entry, i) => {
                const item = typeof entry === 'string' ? { name: entry } : entry;
                return (
                  <motion.span
                    key={item.name}
                    {...fade(0.62 + i * 0.06)}
                    className="inline-flex items-center gap-2 rounded-[5px] border px-3 py-1.5 text-[15px]"
                    style={{ borderColor: T.faint, background: '#fff', color: T.ink, fontFamily: T.mono, fontWeight: 700 }}
                  >
                    {item.logoType === 'ucsd' ? (
                      <UCSDLogoMark className="h-[18px] w-[50px] shrink-0" compact />
                    ) : item.logoUrl ? (
                      <img
                        src={item.logoUrl}
                        alt=""
                        aria-hidden="true"
                        className="h-[18px] w-[18px] shrink-0"
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-[18px] w-[18px] shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M9 7 L4 12 L9 17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 7 L20 12 L15 17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.name}
                  </motion.span>
                );
              })}
            </div>
          </Card>

          {/* MCP-enabled API layer — explained */}
          <motion.div {...fade(0.92)} className="flex items-center gap-3">
            <div className="h-px w-6" style={{ background: T.blue, opacity: 0.45 }} />
            <Card
              delay={0.95}
              className="flex-1 p-2.5"
              style={{ background: T.bluePale, borderColor: T.blue }}
            >
              <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                <span
                  className="rounded-full px-2.5 py-1 text-[11px]"
                  style={{ background: T.blue, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.22em' }}
                >
                  MCP
                </span>
                <span className="text-[13px] uppercase" style={{ color: T.blue, fontFamily: T.mono, letterSpacing: '0.2em', fontWeight: 800 }}>
                  API layer
                </span>
                <span style={{ color: T.blue, fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, opacity: 0.85 }}>
                  model context protocol
                </span>
              </div>
              <div className="mt-1" style={{ color: T.ink, fontSize: 13.5, lineHeight: 1.22 }}>
                One standardized bridge between agents and enterprise systems — so any harness can call any system through the same auth-aware, audited interface.
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {[
                  ['auth-aware', 'agent acts as the user, not as itself'],
                  ['typed schemas', 'tools describe what they can do'],
                  ['per-call audit', 'every read & write is logged']
                ].map(([label, sub]) => (
                  <div
                    key={label}
                    className="rounded-[5px] border px-2 py-0.5"
                    style={{ borderColor: '#b9d3dc', background: '#fff', color: T.blue }}
                  >
                    <span style={{ fontFamily: T.mono, fontSize: 11.5, fontWeight: 800, letterSpacing: '0.04em' }}>
                      {label}
                    </span>
                    <span className="ml-1.5" style={{ color: T.muted, fontFamily: T.serif, fontSize: 11.5, fontStyle: 'italic' }}>
                      {sub}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            <div className="h-px w-6" style={{ background: T.blue, opacity: 0.45 }} />
          </motion.div>

          {/* Priority systems (highlighted) */}
          <Card delay={1.05} className="p-3" style={{ background: '#fff8f2', borderColor: T.coralPale }}>
            <div className="flex items-baseline gap-3">
              <span
                className="rounded-[5px] px-2.5 py-1 text-[12px] uppercase"
                style={{ background: T.coral, color: '#fff', fontFamily: T.mono, letterSpacing: '0.18em', fontWeight: 800 }}
              >
                ★ {slide.priorityHeading || 'Agentic-priority'}
              </span>
              <span style={{ color: T.muted, fontFamily: T.serif, fontStyle: 'italic', fontSize: 15 }}>
                where harnesses unlock the most value first
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {prioritySystems.map((sys, i) => {
                const item = typeof sys === 'string' ? { name: sys } : sys;
                return (
                  <motion.span
                    key={item.name}
                    {...fade(1.18 + i * 0.06)}
                    className="rounded-[5px] border-2 px-3 py-1.5 text-[15.5px]"
                    style={{
                      borderColor: T.coral,
                      background: '#fff',
                      color: T.coralDark,
                      fontFamily: T.mono,
                      fontWeight: 800
                    }}
                  >
                    {item.name}
                  </motion.span>
                );
              })}
            </div>
          </Card>

          {/* Also-connected systems */}
          {alsoSystems.length > 0 && (
            <Card delay={1.5} className="p-3">
              <div className="flex items-baseline gap-3">
                <span className="text-[12px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.2em', fontWeight: 700 }}>
                  {slide.alsoHeading || 'Plus the rest'}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {alsoSystems.map((sys, i) => {
                  const isOverflow = sys.startsWith('+');
                  return (
                    <motion.span
                      key={sys}
                      {...fade(1.6 + i * 0.04)}
                      className="rounded-[4px] border px-2.5 py-1 text-[12.5px]"
                      style={{
                        borderColor: isOverflow ? T.coral : T.faint,
                        background: isOverflow ? '#fff8f2' : '#fff',
                        color: isOverflow ? T.coralDark : T.muted,
                        fontFamily: T.mono,
                        fontWeight: isOverflow ? 800 : 700,
                        fontStyle: isOverflow ? 'italic' : 'normal'
                      }}
                    >
                      {sys}
                    </motion.span>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Right rail: governance */}
        <Card delay={0.7} className="p-3" style={{ borderColor: T.coral, borderWidth: 2 }}>
          <div className="flex items-center gap-2">
            <span className="rounded-[4px] px-2 py-0.5 text-[10.5px] uppercase" style={{ background: T.coral, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.18em' }}>
              Proposed
            </span>
            <div className="text-[12.5px] uppercase" style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
              Governance rail
            </div>
          </div>
          <div className="mt-1" style={{ color: T.muted, fontSize: 13.2, lineHeight: 1.22, fontStyle: 'italic' }}>
            What we propose to wrap around every connection. Each row is open for Cabinet review.
          </div>
          <div className="mt-2.5 space-y-1.5">
            {governance.map((g, i) => {
              const item = typeof g === 'string' ? { label: g, note: '' } : g;
              return (
                <motion.div
                  key={item.label}
                  {...fade(0.82 + i * 0.08)}
                  className="rounded-[6px] border-l-[3px] px-2.5 py-1.5"
                  style={{ borderColor: T.coral, background: '#fff8f2' }}
                >
                  <div style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 13.5, fontWeight: 800, letterSpacing: '0.04em' }}>
                    {item.label}
                  </div>
                  {item.note && (
                    <div className="mt-0.5" style={{ color: T.muted, fontSize: 12.5, lineHeight: 1.2 }}>
                      {item.note}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      {slide.bottomLine && (
        <motion.div
          {...fade(2.05)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[83vh] flex items-start gap-5"
        >
          {slide.bottomLineLabel && (
            <span
              className="shrink-0 rounded-[5px] px-3 py-2.5 text-[12.5px]"
              style={{ background: T.coral, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.22em', whiteSpace: 'nowrap' }}
            >
              {slide.bottomLineLabel}
            </span>
          )}
          <div style={{ fontSize: 'clamp(19px, 1.55vw, 26px)', fontWeight: 560, lineHeight: 1.28 }}>
            {slide.bottomLine}
          </div>
        </motion.div>
      )}
    </Shell>
  );
};

// Split a long label across two lines at the last word boundary that keeps line 1 ≤ maxLineChars
const wrapLabel = (label, maxLineChars = 16) => {
  if (!label || label.length <= maxLineChars) return [label];
  const words = label.split(' ');
  let line1 = '';
  let i = 0;
  while (i < words.length && (line1 ? line1 + ' ' + words[i] : words[i]).length <= maxLineChars) {
    line1 = line1 ? line1 + ' ' + words[i] : words[i];
    i++;
  }
  if (!line1) {
    // First word already too long — just return as-is
    return [label];
  }
  const line2 = words.slice(i).join(' ');
  return line2 ? [line1, line2] : [line1];
};

const EnvironmentSceneSvg = ({ env, tone, baseDelay }) => {
  const reachable = env.reachable || [];
  const blocked = env.blocked || [];

  // Reach zone rectangle dimensions
  const rectX = 14;
  const rectY = 32;
  const rectW = 332;
  const rectH = 230;
  // Agent sits at the top center of the rect
  const agentCx = rectX + rectW / 2;
  const agentCy = rectY + 38;
  // Items grid below the agent (2 columns × up to 3 rows)
  // Pushed down to give breathing space under the "AGENT + HARNESS" label
  const gridTopY = rectY + 118;
  const rowHeight = 38;
  const colXs = [rectX + 18, rectX + rectW / 2 + 4]; // icon left edge per col

  return (
    <svg
      viewBox="0 0 360 280"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* REACH header above the zone */}
      <motion.text
        {...fade(baseDelay + 0.2, 0)}
        x={180}
        y={22}
        textAnchor="middle"
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.24em',
          textTransform: 'uppercase'
        }}
        fill={tone.ink}
      >
        reach
      </motion.text>

      {/* Rounded-rect reach zone with dashed border + tinted fill */}
      <motion.rect
        {...fade(baseDelay + 0.05, 0)}
        x={rectX}
        y={rectY}
        width={rectW}
        height={rectH}
        rx={14}
        ry={14}
        fill={tone.fill}
        opacity={0.55}
      />
      <motion.rect
        {...lineDraw(baseDelay + 0.1)}
        x={rectX}
        y={rectY}
        width={rectW}
        height={rectH}
        rx={14}
        ry={14}
        fill="none"
        stroke={tone.ink}
        strokeWidth="1.6"
        strokeDasharray="5 6"
      />

      {/* Agent at the top of the zone */}
      <motion.g {...fade(baseDelay + 0.22, 0)}>
        <circle cx={agentCx} cy={agentCy} r={22} fill="#fff" stroke={tone.ink} strokeWidth="1.8" />
        <text
          x={agentCx}
          y={agentCy + 7}
          textAnchor="middle"
          style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 22, fontWeight: 520 }}
          fill={tone.ink}
        >
          M
        </text>
        <circle cx={agentCx + 16} cy={agentCy + 16} r={6.5} fill={tone.ink} />
        <text
          x={agentCx + 16}
          y={agentCy + 19}
          textAnchor="middle"
          style={{ fontFamily: T.mono, fontSize: 8.5, fontWeight: 800 }}
          fill="#fff"
        >
          ↺
        </text>
        <text
          x={agentCx}
          y={agentCy + 38}
          textAnchor="middle"
          style={{
            fontFamily: T.mono,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase'
          }}
          fill={tone.ink}
        >
          agent + harness
        </text>
      </motion.g>

      {/* Reachable items — 2-column grid, side-by-side icon + label */}
      {reachable.map((item, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const iconLeft = colXs[col];
        const rowY = gridTopY + row * rowHeight;
        const lines = wrapLabel(item.label, 16);
        const proposed = !!item.proposed;
        return (
          <motion.g
            key={`reach-${item.label}-${i}`}
            {...fade(baseDelay + 0.32 + i * 0.05, 0)}
            opacity={proposed ? 0.78 : 1}
          >
            <rect
              x={iconLeft}
              y={rowY - 14}
              width={28}
              height={28}
              rx={6}
              fill="#fff"
              stroke={tone.ink}
              strokeWidth="1.2"
              strokeDasharray={proposed ? '3 2.5' : undefined}
            />
            <MiniIcon type={item.icon} color={tone.ink} x={iconLeft + 3} y={rowY - 11} width={22} height={22} className="" />
            {lines.length === 1 ? (
              <text
                x={iconLeft + 36}
                y={rowY + 5}
                style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700 }}
                fill={T.ink}
              >
                {lines[0]}
              </text>
            ) : (
              <text
                x={iconLeft + 36}
                y={rowY}
                style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700 }}
                fill={T.ink}
              >
                <tspan x={iconLeft + 36} dy={0}>{lines[0]}</tspan>
                <tspan x={iconLeft + 36} dy={13}>{lines[1]}</tspan>
              </text>
            )}
          </motion.g>
        );
      })}

      {/* "OUT OF REACH" section removed by request — the reach zone now stands on its own. */}
    </svg>
  );
};

const HarnessTwoEnvironmentsVariant = ({ slide }) => {
  const envs = slide.environments || [];
  const tones = {
    blue: { ink: T.blue, fill: T.bluePale, soft: '#cfdde2' },
    coral: { ink: T.coralDark, fill: '#fff8f2', soft: T.coralPale }
  };
  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[3vh]" style={{ maxWidth: '88vw' }}>
        <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(38px, 3.8vw, 60px)', fontWeight: 520 }}>
          <PartText parts={slide.parts} />
        </h1>
        {slide.subhead && (
          <motion.div {...fade(0.38)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(16px, 1.25vw, 21px)' }}>
            {slide.subhead}
          </motion.div>
        )}
      </div>

      {/* Two environment scenes */}
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[11vh] bottom-[37vh] grid grid-cols-2 grid-rows-[1fr] gap-6 items-stretch">
        {envs.map((env, i) => {
          const tone = tones[env.tone] || tones.blue;
          return (
            <Card
              key={env.kicker}
              delay={0.4 + i * 0.1}
              className="flex flex-col p-5 min-h-0 overflow-hidden"
              style={{ background: tone.fill, borderColor: tone.soft }}
            >
              {/* Chassis header */}
              <div className="flex items-center gap-3.5">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[7px] border bg-white"
                  style={{ borderColor: tone.soft }}
                >
                  <MiniIcon type={env.chassis || 'laptop'} color={tone.ink} />
                </div>
                <div className="flex-1">
                  <div
                    className="uppercase"
                    style={{
                      color: tone.ink,
                      fontFamily: T.mono,
                      fontSize: 'clamp(18px, 1.6vw, 24px)',
                      fontWeight: 800,
                      letterSpacing: '0.16em',
                      lineHeight: 1
                    }}
                  >
                    {env.kicker}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2.5 flex-wrap">
                    <span style={{ color: T.ink, fontSize: 17, lineHeight: 1.15, fontWeight: 620 }}>
                      {env.title}
                    </span>
                    {env.titleBadge && (
                      <span
                        className="rounded-[4px] px-2 py-0.5 text-[10px] uppercase whitespace-nowrap"
                        style={{
                          background: tone.ink,
                          color: '#fff',
                          fontFamily: T.mono,
                          letterSpacing: '0.18em',
                          fontWeight: 800
                        }}
                      >
                        {env.titleBadge}
                      </span>
                    )}
                  </div>
                  {env.caveat && (
                    <div
                      className="mt-1 italic"
                      style={{ color: T.muted, fontFamily: T.serif, fontSize: 12.5, lineHeight: 1.3 }}
                    >
                      {env.caveat}
                    </div>
                  )}
                </div>
              </div>

              {/* SVG scene */}
              <div className="flex-1 min-h-0 mt-2">
                <EnvironmentSceneSvg env={env} tone={tone} baseDelay={0.5 + i * 0.1} />
              </div>

              {/* Footnote */}
              {env.footnote && (
                <div className="mt-2 pt-3 border-t text-[11.5px] uppercase" style={{ borderColor: tone.soft, color: tone.ink, fontFamily: T.mono, letterSpacing: '0.2em', fontWeight: 800 }}>
                  {env.footnote}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Transition trigger */}
      {slide.transition && (
        <motion.div
          {...fade(0.92)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[65vh] rounded-[8px] border-2 border-dashed px-5 py-2.5"
          style={{ borderColor: T.coral, background: '#fffaf5' }}
        >
          <div className="flex items-center gap-4">
            <span
              className="rounded-full px-3 py-1 text-[11px] uppercase whitespace-nowrap"
              style={{ background: T.coral, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.18em' }}
            >
              {slide.transition.kicker}
            </span>
            <span
              className="text-[14px] uppercase whitespace-nowrap"
              style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.16em', fontWeight: 800 }}
            >
              {slide.transition.from} → {slide.transition.to}
            </span>
            <span style={{ color: T.ink, fontSize: 15.5, lineHeight: 1.32 }}>
              {slide.transition.rule}
            </span>
          </div>
          {slide.transition.optIn && (
            <div
              className="mt-2 pt-2 flex items-center gap-4 border-t"
              style={{ borderColor: T.coralPale }}
            >
              <span
                className="rounded-full px-3 py-1 text-[11px] uppercase whitespace-nowrap"
                style={{ background: '#fff', color: T.coralDark, border: `1px solid ${T.coral}`, fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.18em' }}
              >
                {slide.transition.optIn.kicker}
              </span>
              <span style={{ color: T.ink, fontSize: 15.5, lineHeight: 1.32, fontStyle: 'italic' }}>
                {slide.transition.optIn.rule}
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* Bottom line (legacy single-line footer — only rendered if no configRepo) */}
      {slide.bottomLine && !slide.configRepo && (
        <motion.div
          {...fade(1.1)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[87vh] italic"
          style={{ color: T.muted, fontFamily: T.serif, fontSize: 'clamp(15px, 1.15vw, 19px)' }}
        >
          {slide.bottomLine}
        </motion.div>
      )}

      {/* Config-repo + distribution strip (folds in the old slide 11b concepts) */}
      {slide.configRepo && (
        <motion.div
          {...fade(1.05)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[74vh] rounded-[8px] border-2 border-dashed px-5 py-2.5"
          style={{ borderColor: T.blue, background: T.bluePale }}
        >
          <div className="flex items-baseline gap-3 flex-wrap">
            <span
              className="rounded-full px-3 py-1 text-[11px] uppercase whitespace-nowrap"
              style={{ background: T.blue, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.18em' }}
            >
              {slide.configRepo.kicker || 'One config repo'}
            </span>
            <span className="text-[13.5px]" style={{ color: T.blue, fontFamily: T.mono, fontWeight: 700 }}>
              {slide.configRepo.name}
            </span>
            {slide.configRepo.files && (
              <span style={{ color: T.muted, fontFamily: T.serif, fontStyle: 'italic', fontSize: 13 }}>
                {slide.configRepo.files}
              </span>
            )}
          </div>
          {Array.isArray(slide.configRepo.lanes) && slide.configRepo.lanes.length > 0 && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span
                className="text-[10.5px] uppercase whitespace-nowrap"
                style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.18em', fontWeight: 800 }}
              >
                Shipped via
              </span>
              {slide.configRepo.lanes.map((lane) => (
                <span
                  key={lane}
                  className="rounded-[5px] border px-2.5 py-0.5 text-[11.5px] whitespace-nowrap"
                  style={{ borderColor: T.blue, color: T.blue, background: '#fff', fontFamily: T.mono, fontWeight: 700 }}
                >
                  {lane}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </Shell>
  );
};

const HarnessConfigRepoVariant = ({ slide }) => {
  const repo = slide.repo || {};
  const lanes = slide.lanes || [];
  const toneByColor = {
    blue: { ink: T.blue, fill: T.bluePale, soft: '#cfdde2' },
    coral: { ink: T.coralDark, fill: '#fff8f2', soft: T.coralPale },
    green: { ink: T.green, fill: '#f4f6ea', soft: '#d6dec4' }
  };
  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[3vh]" style={{ maxWidth: '88vw' }}>
        <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(38px, 3.8vw, 60px)', fontWeight: 520 }}>
          <PartText parts={slide.parts} />
        </h1>
        {slide.subhead && (
          <motion.div {...fade(0.38)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(16px, 1.25vw, 21px)' }}>
            {slide.subhead}
          </motion.div>
        )}
      </div>

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[15vh] bottom-[14vh] grid grid-cols-[42%_1fr] gap-8 items-stretch">
        {/* Repo box */}
        <Card delay={0.5} className="flex flex-col p-6">
          <div
            className="text-[12px] uppercase"
            style={{ color: T.coralDark, fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.22em' }}
          >
            ITS-owned config repo
          </div>
          <div
            className="mt-2 break-all"
            style={{ color: T.ink, fontFamily: T.mono, fontSize: 16.5, fontWeight: 700 }}
          >
            {repo.name}
          </div>
          <div className="mt-5 space-y-2">
            {(repo.files || []).map((f, i) => (
              <motion.div
                key={f.name}
                {...fade(0.65 + i * 0.05, 0)}
                className="flex items-baseline gap-3 rounded-[5px] border bg-white px-3 py-2"
                style={{ borderColor: T.faint }}
              >
                <span
                  className="shrink-0"
                  style={{ color: T.coralDark, fontFamily: T.mono, fontWeight: 700, fontSize: 14 }}
                >
                  {f.name}
                </span>
                <span
                  style={{ color: T.muted, fontFamily: T.serif, fontStyle: 'italic', fontSize: 13 }}
                >
                  {f.note}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Three lanes */}
        <div className="flex flex-col gap-3.5">
          {lanes.map((lane, i) => {
            const tone = toneByColor[lane.color] || toneByColor.blue;
            return (
              <motion.div
                key={lane.label}
                {...fade(0.85 + i * 0.1)}
                className="rounded-[8px] border-2 px-5 py-4"
                style={{ borderColor: tone.soft, background: tone.fill, borderLeftWidth: 9, borderLeftColor: tone.ink }}
              >
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] uppercase whitespace-nowrap"
                    style={{ background: tone.ink, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.18em' }}
                  >
                    {lane.label}
                  </span>
                  <span style={{ color: T.ink, fontSize: 19, fontWeight: 620 }}>
                    {lane.audience}
                  </span>
                </div>
                <div
                  className="mt-1.5"
                  style={{ color: tone.ink, fontFamily: T.mono, fontSize: 13, fontWeight: 700 }}
                >
                  {lane.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Principle */}
      {slide.principle && (
        <motion.div
          {...fade(1.2)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[87vh] italic"
          style={{ color: T.muted, fontFamily: T.serif, fontSize: 'clamp(15px, 1.15vw, 19px)' }}
        >
          {slide.principle}
        </motion.div>
      )}
    </Shell>
  );
};

const HarnessActionVariant = ({ slide }) => {
  const pipeline = slide.pipeline || [];
  const toolTiers = slide.toolTiers || [];
  const traceGoal = slide.traceGoal || '';
  const traceSteps = slide.traceSteps || [];

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>
      <JobSpine activeKey={slide.spineActive} />

      <div className="absolute left-[4.8vw] right-[4.8vw] top-[4vh]" style={{ maxWidth: '88vw' }}>
        <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 520 }}>
          <PartText parts={slide.parts} />
        </h1>
        {slide.subhead && (
          <motion.div {...fade(0.34)} className="mt-1.5 italic" style={{ color: T.muted, fontSize: 'clamp(17px, 1.3vw, 22px)' }}>
            {slide.subhead}
          </motion.div>
        )}
      </div>

      {/* Two-column: left = mechanics (the flow), right = a worked example */}
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[14vh] bottom-[22vh] grid grid-cols-[42%_1fr] gap-7 items-stretch">
        {/* Left: The action pipeline (vertical flow) — top-aligned */}
        <Card delay={0.5} className="flex flex-col p-6">
          <div className="flex items-baseline gap-3">
            <span className="text-[13px] uppercase" style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
              Mechanics
            </span>
            <span style={{ color: T.muted, fontFamily: T.serif, fontStyle: 'italic', fontSize: 16 }}>
              every tool call follows this path
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {pipeline.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div
                  {...fade(0.6 + i * 0.12)}
                  className="rounded-[8px] border-2 bg-white px-4 py-3"
                  style={{
                    borderColor: step.color,
                    borderLeftWidth: 6,
                    boxShadow: `0 3px 10px ${step.color}1f`
                  }}
                >
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className="rounded-[4px] px-2 py-0.5 text-[13px]"
                      style={{ background: step.color, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.14em' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: T.ink, fontFamily: T.serif, fontSize: 26, lineHeight: 1.1, fontWeight: 650 }}>
                      {step.label}
                    </span>
                  </div>
                  <div className="mt-1" style={{ color: T.muted, fontFamily: T.mono, fontSize: 15, lineHeight: 1.3 }}>
                    {step.sub}
                  </div>
                </motion.div>
                {i < pipeline.length - 1 && (
                  <motion.div
                    {...fade(0.7 + i * 0.12)}
                    className="flex items-center justify-center"
                    style={{ color: pipeline[i + 1].color, fontSize: 22, fontWeight: 700, height: 8, lineHeight: 1 }}
                  >
                    ↓
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Right: A worked example — the same pipeline, applied to a real staff action */}
        <Card delay={0.7} className="p-6 flex flex-col">
          <div className="flex items-baseline gap-3">
            <span className="text-[13px] uppercase" style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>
              Example
            </span>
            <span style={{ color: T.muted, fontFamily: T.serif, fontStyle: 'italic', fontSize: 16 }}>
              one staff action through the gates
            </span>
          </div>

          {traceGoal && (
            <motion.div
              {...fade(0.85)}
              className="mt-2.5 rounded-[7px] border-l-[3px] px-3.5 py-2.5"
              style={{ borderColor: T.blue, background: T.bluePale }}
            >
              <div className="text-[14px] uppercase" style={{ color: T.blue, fontFamily: T.mono, letterSpacing: '0.22em', fontWeight: 800 }}>Action</div>
              <div className="mt-1" style={{ color: T.blue, fontSize: 21, fontWeight: 600, lineHeight: 1.25 }}>{traceGoal}</div>
            </motion.div>
          )}

          <div className="mt-2 space-y-1.5">
            {traceSteps.map((step, i) => {
              const matchedColor = (pipeline[i] && pipeline[i].color) || T.coral;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.05 + i * 0.18, ease }}
                  className="rounded-[6px] border-l-[3px] px-3.5 py-2"
                  style={{ borderColor: matchedColor, background: '#fcfaf3' }}
                >
                  <div className="flex items-baseline gap-2.5">
                    <span style={{ color: matchedColor, fontFamily: T.mono, fontSize: 14, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', minWidth: 108 }}>
                      {step.stage}
                    </span>
                    <span style={{ color: T.ink, fontFamily: T.mono, fontSize: 16, lineHeight: 1.32 }}>
                      {step.detail}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive approval — set apart from the trace with a visible break */}
          {slide.approvalPrompt && (
            <motion.div
              {...fade(1.05 + traceSteps.length * 0.18 + 0.05, 0)}
              className="mt-5 pt-4 border-t-[3px] border-dashed"
              style={{ borderColor: T.coralPale }}
            />
          )}
          {slide.approvalPrompt && (() => {
            const rawActions = slide.approvalPrompt.actions || ['allow', 'deny', 'always allow'];
            const ccLabel = (action) => {
              const a = String(action).toLowerCase();
              if (a === 'allow') return 'Yes';
              if (a === 'always allow') return "Yes, and don't ask again this session";
              if (a === 'deny') return 'No, and tell Claude what to do differently';
              return action;
            };
            const code = slide.approvalPrompt.code || '';
            const toolHeader = (() => {
              const m = code.match(/^([a-zA-Z_][\w.]*)\s*\(/);
              return m ? m[1] : 'Tool call';
            })();
            return (
              <motion.div
                {...fade(1.05 + traceSteps.length * 0.18 + 0.15)}
                className="mt-3"
                style={{ fontFamily: T.mono, color: T.ink }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] uppercase" style={{ color: T.coral, letterSpacing: '0.22em', fontWeight: 800 }}>
                    Human in the loop
                  </span>
                  <span style={{ color: T.muted, fontFamily: T.serif, fontStyle: 'italic', fontSize: 12.5 }}>
                    {slide.approvalPrompt.kicker || 'the agent stops and asks before any write'}
                  </span>
                </div>
                {/* Claude-Code-style boxed tool call */}
                <div className="rounded-[6px] border" style={{ borderColor: T.coral, background: '#fffaf5' }}>
                  <div className="border-l-[3px] pl-3 pr-3 py-2.5" style={{ borderColor: T.coral }}>
                    <div className="text-[10.5px] uppercase mb-1" style={{ color: T.coralDark, fontWeight: 800, letterSpacing: '0.2em' }}>
                      Tool call · {toolHeader}
                    </div>
                    <div style={{ color: T.ink, fontSize: 13.5, fontWeight: 700, lineHeight: 1.4, wordBreak: 'break-word' }}>
                      {code}
                    </div>
                  </div>
                </div>
                {/* Prompt + numbered options */}
                <div className="mt-2">
                  <div className="mb-1" style={{ color: T.ink, fontSize: 13, fontWeight: 700 }}>
                    Do you want to proceed?
                  </div>
                  <div className="flex flex-col gap-[1px]">
                    {rawActions.map((action, i) => {
                      const selected = i === 0;
                      return (
                        <div
                          key={i}
                          className="flex items-baseline gap-1.5 rounded-[3px] px-1.5 py-[2px]"
                          style={{ background: selected ? '#ffe7d4' : 'transparent', fontSize: 12.5, lineHeight: 1.45 }}
                        >
                          <span style={{ width: 10, display: 'inline-block', color: selected ? T.coral : 'transparent', fontWeight: 800 }}>
                            ❯
                          </span>
                          <span style={{ color: T.muted, fontWeight: 700 }}>{i + 1}.</span>
                          <span style={{ color: selected ? T.coralDark : T.ink, fontWeight: selected ? 700 : 500 }}>
                            {ccLabel(action)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })()}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.05 + traceSteps.length * 0.18 + 0.55, ease }}
            className="mt-2.5 self-start inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
            style={{ background: T.coralDark, color: '#fff', fontFamily: T.mono, fontSize: 13, fontWeight: 800, letterSpacing: '0.12em' }}
          >
            <span>✓ APPROVED · SCOPED · AUDITED</span>
          </motion.div>
        </Card>
      </div>

      {/* Bottom callout */}
      {slide.bottomLine && (
        <motion.div
          {...fade(1.9)}
          className="absolute left-[4.8vw] right-[4.8vw] top-[88vh] flex items-start gap-5"
        >
          {slide.bottomLineLabel && (
            <span
              className="shrink-0 rounded-[5px] px-3 py-2 text-[12px]"
              style={{
                background: T.coral,
                color: '#fff',
                fontFamily: T.mono,
                fontWeight: 800,
                letterSpacing: '0.22em',
                whiteSpace: 'nowrap'
              }}
            >
              {slide.bottomLineLabel}
            </span>
          )}
          <div style={{ fontSize: 'clamp(15px, 1.2vw, 19px)', fontWeight: 560, lineHeight: 1.3 }}>
            {slide.bottomLine}
          </div>
        </motion.div>
      )}
    </Shell>
  );
};

/* ───────────────────── Memory Architecture ───────────────────── */

const FlowArrow = ({ delay = 0.6 }) => (
  <motion.div {...fade(delay, 0)} className="flex items-center justify-center h-full">
    <svg viewBox="0 0 48 80" className="w-8 h-16" fill="none">
      <motion.path
        d="M4 40h32M30 30l10 10-10 10"
        stroke={T.muted}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...lineDraw(delay + 0.15)}
      />
    </svg>
  </motion.div>
);

const FlowColumn = ({ kicker, items, delay = 0.3, accentColor }) => (
  <Card delay={delay} className="p-3 h-full" style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}>
    <Kicker className="mb-2" style={{ color: accentColor }}>{kicker}</Kicker>
    <div className="space-y-1.5">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          {...fade(delay + 0.08 + index * 0.05, 0)}
          className="flex items-center gap-2 rounded-md px-2 py-1.5"
          style={{ background: `${item.color}08` }}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: `${item.color}18` }}>
            <MiniIcon type={item.icon} color={item.color} className="h-5 w-5" />
          </div>
          <span style={{ color: T.ink, fontFamily: T.sans, fontSize: 14, fontWeight: 600, lineHeight: 1.15 }}>
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  </Card>
);

const MemoryNode = ({ item, delay = 0.4, compact = false, nodeRef }) => (
  <motion.div
    ref={nodeRef}
    {...fade(delay, 6)}
    className="rounded-[7px] border bg-white/80 px-3.5 py-2.5"
    style={{
      borderColor: `${item.color}55`,
      boxShadow: `0 4px 14px ${item.color}14`,
      borderLeftWidth: 4,
      borderLeftColor: item.color
    }}
  >
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: `${item.color}18` }}>
        <MiniIcon type={item.icon} color={item.color} className="h-5 w-5" />
      </div>
      <div>
        <div style={{ color: T.ink, fontFamily: T.sans, fontSize: compact ? 14.2 : 15, fontWeight: 750, lineHeight: 1.05 }}>
          {item.label}
        </div>
        {item.sub && (
          <div style={{ color: T.muted, fontFamily: T.mono, fontSize: compact ? 11.2 : 11.8, lineHeight: 1.18 }}>
            {item.sub}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const FlowPulsePath = ({ d, stroke, delay = 0 }) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={3.8}
      strokeLinecap="round"
      strokeDasharray="18 180"
      opacity={0.32}
      initial={{ strokeDashoffset: 44 }}
      animate={{ strokeDashoffset: [44, -220] }}
      transition={{
        duration: 3.9,
        delay,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: 1.2
      }}
    />
  );
};

const MemoryFlowField = ({ sources, knowledgeLayers, actions }) => {
  const fieldRef = React.useRef(null);
  const coreRef = React.useRef(null);
  const sourceRefs = React.useRef([]);
  const actionRefs = React.useRef([]);
  const [flow, setFlow] = React.useState({ width: 0, height: 0, sourcePaths: [], actionPaths: [] });
  const coreRows = knowledgeLayers.slice(0, 4);

  React.useLayoutEffect(() => {
    const field = fieldRef.current;
    const core = coreRef.current;
    if (!field || !core) return undefined;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const relativeRect = (node, parentRect) => {
      const rect = node.getBoundingClientRect();
      return {
        left: rect.left - parentRect.left,
        right: rect.right - parentRect.left,
        top: rect.top - parentRect.top,
        bottom: rect.bottom - parentRect.top,
        width: rect.width,
        height: rect.height
      };
    };
    const curvedPath = (start, end) => {
      const bend = Math.min(96, Math.max(36, Math.abs(end.x - start.x) * 0.42));
      return `M${start.x.toFixed(1)} ${start.y.toFixed(1)} C${(start.x + bend).toFixed(1)} ${start.y.toFixed(1)} ${(end.x - bend).toFixed(1)} ${end.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
    };
    const measure = () => {
      const parentRect = field.getBoundingClientRect();
      const coreRect = relativeRect(core, parentRect);
      const nextSourcePaths = sourceRefs.current
        .filter(Boolean)
        .map((node) => {
          const rect = relativeRect(node, parentRect);
          const start = { x: rect.right - 1, y: rect.top + rect.height / 2 };
          const end = {
            x: coreRect.left - 1,
            y: clamp(start.y, coreRect.top + 72, coreRect.bottom - 14)
          };
          return curvedPath(start, end);
        });
      const nextActionPaths = actionRefs.current
        .filter(Boolean)
        .map((node) => {
          const rect = relativeRect(node, parentRect);
          const end = { x: rect.left + 1, y: rect.top + rect.height / 2 };
          const start = {
            x: coreRect.right + 1,
            y: clamp(end.y, coreRect.top + 72, coreRect.bottom - 14)
          };
          return curvedPath(start, end);
        });
      setFlow({
        width: parentRect.width,
        height: parentRect.height,
        sourcePaths: nextSourcePaths,
        actionPaths: nextActionPaths
      });
    };

    const timers = [];
    const scheduleMeasure = () => {
      window.requestAnimationFrame(measure);
      timers.push(window.setTimeout(measure, 450));
      timers.push(window.setTimeout(measure, 1100));
    };

    scheduleMeasure();
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(field);
    resizeObserver.observe(core);
    sourceRefs.current.filter(Boolean).forEach((node) => resizeObserver.observe(node));
    actionRefs.current.filter(Boolean).forEach((node) => resizeObserver.observe(node));
    window.addEventListener('resize', scheduleMeasure);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [sources.length, actions.length, knowledgeLayers.length]);

  return (
    <div ref={fieldRef} className="relative h-full min-h-0">
      <svg
        viewBox={`0 0 ${flow.width || 1} ${flow.height || 1}`}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="deck-memory-source-flow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={flow.width || 1} y2="0">
            <stop offset="0%" stopColor={T.blue} stopOpacity="0.78" />
            <stop offset="100%" stopColor={T.green} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="deck-memory-action-flow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={flow.width || 1} y2="0">
            <stop offset="0%" stopColor={T.green} stopOpacity="0.9" />
            <stop offset="100%" stopColor={T.coralDark} stopOpacity="0.78" />
          </linearGradient>
        </defs>
        {flow.sourcePaths.map((d, i) => (
          <motion.path
            key={`source-${i}`}
            d={d}
            fill="none"
            stroke="url(#deck-memory-source-flow)"
            strokeWidth={2.2}
            strokeLinecap="round"
            opacity={0.76}
            {...lineDraw(0.65 + i * 0.04)}
          />
        ))}
        {flow.sourcePaths.map((d, i) => (
          <FlowPulsePath key={`source-pulse-${i}`} d={d} stroke={T.blue} delay={1.25 + i * 0.16} />
        ))}
        {flow.actionPaths.map((d, i) => (
          <motion.path
            key={`action-${i}`}
            d={d}
            fill="none"
            stroke="url(#deck-memory-action-flow)"
            strokeWidth={2.2}
            strokeLinecap="round"
            opacity={0.76}
            {...lineDraw(0.9 + i * 0.05)}
          />
        ))}
        {flow.actionPaths.map((d, i) => (
          <FlowPulsePath key={`action-pulse-${i}`} d={d} stroke={T.coralDark} delay={2.05 + i * 0.16} />
        ))}
      </svg>

      <div className="relative grid h-full grid-cols-[24%_1fr_24%] gap-7">
        <div className="flex flex-col justify-start gap-2.5 pt-1">
          <Kicker className="text-[13px]" style={{ color: T.blue, fontWeight: 850 }}>Inputs</Kicker>
          {sources.map((item, i) => (
            <MemoryNode key={item.label} item={item} delay={0.4 + i * 0.05} compact nodeRef={(node) => { sourceRefs.current[i] = node; }} />
          ))}
        </div>

        <div className="flex items-start justify-center pt-5">
          <motion.div
            ref={coreRef}
            {...fade(0.62, 8)}
            className="w-full max-w-[490px] rounded-[10px] border-2 bg-white/90 px-6 py-5"
            style={{ borderColor: T.green, boxShadow: `0 18px 45px ${T.green}22` }}
          >
            <div className="text-center">
              <div style={{ color: T.green, fontFamily: T.mono, fontSize: 13, fontWeight: 850, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Knowledge and memory ecosystem
              </div>
              <div className="mt-1" style={{ color: T.ink, fontFamily: T.serif, fontSize: 31, fontWeight: 620, lineHeight: 1.04 }}>
                Inputs become structured, retrievable memory.
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {coreRows.map((item, i) => (
                <MemoryNode key={item.label} item={item} delay={0.75 + i * 0.06} compact />
              ))}
            </div>
            <div className="mt-3 rounded-[6px] border px-3.5 py-2.5 text-center" style={{ borderColor: T.faint, background: '#fcfaf3' }}>
              <span style={{ color: T.muted, fontFamily: T.mono, fontSize: 11.8, fontWeight: 700 }}>
                automated jobs extract patterns, update context, and make memory available for actions and use cases
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col justify-start gap-2.5 pt-5">
          <Kicker className="text-[13px]" style={{ color: T.coralDark, fontWeight: 850 }}>Agent actions</Kicker>
          {actions.map((item, i) => (
            <MemoryNode key={item.label} item={item} delay={0.75 + i * 0.05} compact nodeRef={(node) => { actionRefs.current[i] = node; }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const JobRhythmStrip = ({ jobs = [] }) => (
  <div className="h-full">
    <motion.div {...fade(0.92, 6)} className="mb-2 flex items-center gap-3">
      <div style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 11, fontWeight: 850, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Agent action outcomes
      </div>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${T.coralDark}66, transparent)` }} />
      <div style={{ color: T.muted, fontFamily: T.sans, fontSize: 12, fontWeight: 650 }}>
        memory is retrieved when the agent acts
      </div>
    </motion.div>
    <div className="grid h-[calc(100%-26px)] grid-cols-4 gap-3">
      {jobs.map((job, i) => (
        <Card key={job.label} delay={1.0 + i * 0.07} className="p-3" style={{ borderTopWidth: 4, borderTopColor: job.color }}>
          <div className="flex items-start justify-between gap-2">
            <div style={{ color: job.color, fontFamily: T.mono, fontSize: 10.2, fontWeight: 850, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.15 }}>
              {job.time}
            </div>
            {job.fires && (
              <div className="shrink-0 rounded-full px-2 py-0.5" style={{ border: `1px solid ${job.color}33`, color: job.color, fontFamily: T.mono, fontSize: 9.5, fontWeight: 850, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.15 }}>
                {job.fires}
              </div>
            )}
          </div>
          <div className="mt-1" style={{ color: T.ink, fontFamily: T.sans, fontSize: 15, fontWeight: 750, lineHeight: 1.08 }}>
            {job.label}
          </div>
          <div className="mt-1" style={{ color: T.muted, fontFamily: T.sans, fontSize: 12.2, lineHeight: 1.22 }}>
            {job.detail}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const HarnessMemoryArchitectureVariant = ({ slide }) => {
  const sources = slide.sources || [];
  const knowledgeLayers = slide.knowledgeLayers || [];
  const actions = slide.actions || [];
  const jobs = slide.jobs || [];

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>
      <JobSpine activeKey={slide.hideSpine ? null : slide.spineActive} />
      <div className="absolute inset-0" style={{ fontFamily: T.serif }}>
        {/* Title */}
        <div className={`absolute left-[4.8vw] right-[4.8vw] ${isCitizenAudience(slide) ? 'top-[3.5vh]' : 'top-[5.8vh]'}`} style={{ maxWidth: '82vw' }}>
          <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(38px, 3.6vw, 58px)', fontWeight: 520 }}>
            <PartText parts={slide.parts} />
          </h1>
          {slide.subhead && (
            <motion.div {...fade(0.38)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(16px, 1.2vw, 21px)' }}>
              {slide.subhead}
            </motion.div>
          )}
          {slide.bottomLine && (
            <motion.div {...fade(0.46)} className="mt-3 flex items-start gap-3" style={{ color: T.ink, fontFamily: T.serif }}>
              {slide.bottomLineLabel && (
                <span className="shrink-0 rounded-full px-3 py-1" style={{ background: T.coralDark, fontSize: 11, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.18em', whiteSpace: 'nowrap' }}>
                  {slide.bottomLineLabel}
                </span>
              )}
              <div style={{ fontSize: 'clamp(14px, 1.05vw, 17px)', fontWeight: 520, lineHeight: 1.25, maxWidth: '66vw' }}>
                {slide.bottomLine}
              </div>
            </motion.div>
          )}
        </div>

        <div className="absolute left-[4.8vw] right-[4.8vw] top-[13.5vh] bottom-[28vh]">
          <MemoryFlowField sources={sources} knowledgeLayers={knowledgeLayers} actions={actions} />
        </div>

        {jobs.length > 0 && (
          <div className="absolute left-[4.8vw] right-[4.8vw] bottom-[22vh] h-[15vh]">
            <JobRhythmStrip jobs={jobs} />
          </div>
        )}
      </div>
    </Shell>
  );
};

const ScalingPyramidGraphic = ({ tiers = [], showTierDetails = true }) => {
  const sorted = tiers.length ? tiers : [
    { label: 'Campus', scope: 'Statistical patterns only', privacy: 'No individual records', status: 'Aspirational', color: '#93c5fd', textColor: '#17345f' },
    { label: 'Department', scope: 'Anonymized aggregates', privacy: 'Identity stripped before aggregation', status: 'Design exercise', color: '#60a5fa', textColor: '#17345f' },
    { label: 'Team', scope: 'Opt-in shared context', privacy: 'Members choose what to share', status: 'Pilot pattern', color: '#2563eb', textColor: '#eff6ff' },
    { label: 'Personal', scope: 'One agent per person', privacy: 'Data stays private by default', status: 'Working now', color: '#0d5f93', textColor: '#eff6ff' }
  ];
  const cx = showTierDetails ? 270 : 405;
  const viewBox = showTierDetails ? '0 0 880 455' : '0 0 730 455';
  const segments = showTierDetails ? [
    { top: 45, bottom: 135, topHalf: 55, bottomHalf: 115 },
    { top: 135, bottom: 225, topHalf: 115, bottomHalf: 175 },
    { top: 225, bottom: 315, topHalf: 175, bottomHalf: 235 },
    { top: 315, bottom: 405, topHalf: 235, bottomHalf: 300 }
  ] : [
    { top: 30, bottom: 128, topHalf: 105, bottomHalf: 158 },
    { top: 128, bottom: 226, topHalf: 158, bottomHalf: 211 },
    { top: 226, bottom: 324, topHalf: 211, bottomHalf: 264 },
    { top: 324, bottom: 422, topHalf: 264, bottomHalf: 318 }
  ];

  return (
    <svg viewBox={viewBox} className="h-full w-full" role="img" aria-label="Privacy-preserving scaling pyramid">
      <text x="30" y="42" style={{ fill: T.blue, fontFamily: T.mono, fontSize: 15, fontWeight: 850, letterSpacing: '0.2em' }}>PRIVACY</text>
      <text x="30" y="64" style={{ fill: T.muted, fontFamily: T.sans, fontSize: 14, fontWeight: 650 }}>aggregate-only upward</text>
      <line x1="82" y1="88" x2="82" y2="384" stroke={T.faint} strokeWidth="3.6" strokeDasharray="7 8" />
      <path d="M82 81l-7 12h14z" fill={T.muted} />
      <text x="18" y="438" style={{ fill: T.muted, fontFamily: T.sans, fontSize: 14, fontWeight: 650 }}>private by default</text>

      {sorted.map((tier, i) => {
        const s = segments[i];
        const points = `${cx - s.topHalf},${s.top} ${cx + s.topHalf},${s.top} ${cx + s.bottomHalf},${s.bottom} ${cx - s.bottomHalf},${s.bottom}`;
        const yMid = (s.top + s.bottom) / 2;
        const connectorX = cx + (s.topHalf + s.bottomHalf) / 2 + 8;
        return (
          <motion.g key={tier.label} {...fade(0.45 + i * 0.08, 0)}>
            <polygon points={points} fill={tier.color} stroke="#fbf8ef" strokeWidth="2" />
            <text x={cx} y={yMid - 5} textAnchor="middle" style={{ fill: tier.textColor, fontFamily: T.sans, fontSize: 27, fontWeight: 850 }}>
              {tier.label}
            </text>
            <text x={cx} y={yMid + 21} textAnchor="middle" style={{ fill: tier.textColor, fontFamily: T.sans, fontSize: 14, fontWeight: 650, opacity: 0.92 }}>
              {tier.scope}
            </text>
            {showTierDetails && (
              <>
                <line x1={connectorX} y1={yMid} x2="590" y2={yMid} stroke={T.faint} strokeWidth="1.5" />
                <text x="608" y={yMid - 14} style={{ fill: T.ink, fontFamily: T.sans, fontSize: 14, fontWeight: 800 }}>
                  {tier.detail}
                </text>
                <text x="608" y={yMid + 5} style={{ fill: T.blue, fontFamily: T.sans, fontSize: 12.5, fontWeight: 700 }}>
                  {tier.privacy}
                </text>
                <text x="608" y={yMid + 23} style={{ fill: T.muted, fontFamily: T.serif, fontSize: 12, fontStyle: 'italic' }}>
                  {tier.status}
                </text>
              </>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
};

const scaleTierCenterY = ['28.5%', '42.8%', '57.1%', '71.4%'];

const TierExplanationLegend = ({ tiers = [] }) => (
  <div className="relative h-full">
    {tiers.map((tier, i) => (
      <div key={tier.label} className="absolute left-0 right-0 -translate-y-1/2" style={{ top: scaleTierCenterY[i] }}>
        <motion.div
          {...fade(0.55 + i * 0.08, 8)}
          className="rounded-[7px] border bg-white/70 px-4 py-3"
          style={{ borderColor: T.faint, borderLeftWidth: 5, borderLeftColor: tier.color }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <div style={{ color: tier.color, fontFamily: T.mono, fontSize: 12, fontWeight: 850, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              {tier.label}
            </div>
            <div
              className="rounded-full px-2.5 py-1"
              style={{
                border: `1px solid ${tier.color}55`,
                background: `${tier.color}14`,
                color: tier.color,
                fontFamily: T.mono,
                fontSize: 10.5,
                fontWeight: 850,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
            >
              {tier.status}
            </div>
          </div>
          <div className="mt-1" style={{ color: T.ink, fontFamily: T.sans, fontSize: 14.5, fontWeight: 720, lineHeight: 1.2 }}>
            {tier.detail}
          </div>
          <div className="mt-1" style={{ color: T.muted, fontFamily: T.sans, fontSize: 12.5, fontWeight: 620, lineHeight: 1.25 }}>
            {tier.privacy}
          </div>
        </motion.div>
      </div>
    ))}
  </div>
);

const TierConnectorLines = ({ tiers = [] }) => {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      {tiers.map((tier, i) => (
        <motion.g key={`${tier.label}-connector`} {...lineDraw(0.72 + i * 0.08)}>
          <line
            x1="47%"
            x2="64.5%"
            y1={scaleTierCenterY[i]}
            y2={scaleTierCenterY[i]}
            stroke={tier.color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.42"
          />
          <circle cx="47%" cy={scaleTierCenterY[i]} r="3.5" fill={tier.color} opacity="0.62" />
        </motion.g>
      ))}
    </svg>
  );
};

const HarnessMemoryScaleVariant = ({ slide }) => {
  const tiers = slide.tiers || [];

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>
      <JobSpine activeKey={slide.hideSpine ? null : slide.spineActive} />
      <div className="absolute inset-0" style={{ fontFamily: T.serif }}>
        <div className={`absolute left-[4.8vw] right-[4.8vw] ${isCitizenAudience(slide) ? 'top-[4vh]' : 'top-[8.3vh]'}`} style={{ maxWidth: '80vw' }}>
          <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(38px, 3.6vw, 58px)', fontWeight: 520 }}>
            <PartText parts={slide.parts} />
          </h1>
          {slide.subhead && (
            <motion.div {...fade(0.38)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(16px, 1.2vw, 21px)' }}>
              {slide.subhead}
            </motion.div>
          )}
        </div>

        <div className="absolute left-[4.8vw] right-[4.8vw] top-[10.5vh] bottom-[7vh]">
          <motion.div {...fade(0.45)} className="relative grid h-full grid-cols-[62%_1fr] gap-5">
            <TierConnectorLines tiers={tiers} />
            <div className="relative z-10">
              <ScalingPyramidGraphic tiers={tiers} showTierDetails={false} />
            </div>
            <div className="relative z-10">
              <TierExplanationLegend tiers={tiers} />
            </div>
          </motion.div>
        </div>
      </div>
    </Shell>
  );
};

/* ───────────────────── Performance Review PoC ───────────────────── */

const HarnessPerformanceReviewVariant = ({ slide }) => {
  const steps = slide.steps || [];
  const setupVideo = (el) => {
    if (el) el.playbackRate = slide.videoPlaybackRate || 1;
  };

  return (
    <Shell>
      <Marker slide={slide}>{slide.marker}</Marker>
      <JobSpine activeKey={slide.hideSpine ? null : slide.spineActive} />
      <div className="absolute inset-0" style={{ fontFamily: T.serif }}>
        {/* Title */}
        <div className={`absolute left-[4.8vw] right-[4.8vw] ${isCitizenAudience(slide) ? 'top-[4vh]' : 'top-[8.3vh]'}`} style={{ maxWidth: '74vw' }}>
          <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(38px, 3.6vw, 58px)', fontWeight: 520 }}>
            <PartText parts={slide.parts} />
          </h1>
          {slide.subhead && (
            <motion.div {...fade(0.38)} className="mt-2 italic" style={{ color: T.muted, fontSize: 'clamp(16px, 1.2vw, 21px)' }}>
              {slide.subhead}
            </motion.div>
          )}
        </div>

        {/* Two-column: video + steps */}
        <div className="absolute left-[4.8vw] right-[4.8vw] top-[22vh] bottom-[14vh] grid grid-cols-[1.15fr_0.85fr] gap-5 items-stretch">
          {/* Video */}
          <Card delay={0.45} className="overflow-hidden p-0 flex items-center justify-center" style={{ background: '#0a0a0a' }}>
            {slide.videoSrc ? (
              <video
                ref={setupVideo}
                src={slide.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain rounded-[7px]"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full" style={{ color: T.muted, fontFamily: T.mono, fontSize: 14 }}>
                Video placeholder
              </div>
            )}
          </Card>

          {/* Step pipeline */}
          <Card delay={0.55} className="p-4 flex flex-col justify-center">
            <Kicker className="mb-4">How it works</Kicker>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.label}
                  {...fade(0.65 + index * 0.1, 0)}
                  className="grid grid-cols-[42px_1fr] gap-3 items-start"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full shrink-0" style={{ background: step.color, color: '#fff', fontFamily: T.mono, fontSize: 15, fontWeight: 800 }}>
                    {step.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <MiniIcon type={step.icon} color={step.color} className="h-5 w-5" />
                      <span style={{ color: T.ink, fontFamily: T.sans, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{step.label}</span>
                    </div>
                    <div className="mt-1" style={{ color: T.muted, fontFamily: T.sans, fontSize: 13.5, lineHeight: 1.35 }}>
                      {step.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom line */}
        {slide.bottomLine && (
          <motion.div {...fade(1.1)} className="absolute left-[4.8vw] right-[4.8vw] bottom-[4vh] flex items-center gap-3" style={{ color: T.ink, fontFamily: T.serif }}>
            {slide.bottomLineLabel && (
              <span className="shrink-0 rounded-full px-3 py-1" style={{ background: T.coralDark, fontSize: 11, color: '#fff', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.22em', whiteSpace: 'nowrap' }}>
                {slide.bottomLineLabel}
              </span>
            )}
            <div style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', fontWeight: 520, lineHeight: 1.3 }}>
              {slide.bottomLine}
            </div>
          </motion.div>
        )}
      </div>
    </Shell>
  );
};

export const harnessVariantMap = {
  'harness-pressure': HarnessPressureVariant,
  'harness-rubric': HarnessRubricVariant,
  'harness-question': HarnessQuestionVariant,
  'harness-convergence': HarnessConvergenceVariant,
  'harness-definition-core': HarnessDefinitionCoreVariant,
  'harness-definition-equation': HarnessDefinitionEquationVariant,
  'harness-work-product': HarnessWorkProductVariant,
  'harness-toolbox': HarnessToolboxVariant,
  'harness-wired': HarnessWiredVariant,
  'harness-manifesto': HarnessManifestoVariant,
  'harness-anatomy-index': HarnessAnatomyIndexVariant,
  'harness-components-framework': HarnessComponentsFrameworkVariant,
  'harness-while-loop': HarnessWhileLoopVariant,
  'harness-context': HarnessContextVariant,
  'harness-framework-cards': HarnessFrameworkCardsVariant,
  'harness-citizen-ecosystem': HarnessCitizenEcosystemVariant,
  'harness-developer-api-program': HarnessDeveloperApiProgramVariant,
  'harness-campus-hosting': HarnessCampusHostingVariant,
  'harness-skills-tools': HarnessSkillsVariant,
  'harness-subagents': HarnessSubagentsVariant,
  'harness-builtins': HarnessBuiltinsVariant,
  'harness-session': HarnessSessionVariant,
  'harness-system-prompt': HarnessSystemPromptVariant,
  'harness-lifecycle': HarnessLifecycleVariant,
  'harness-permissions': HarnessPermissionsVariant,
  'harness-ucsd': HarnessUcsdVariant,
  'harness-data-unlock': HarnessDataUnlockVariant,
  'harness-two-environments': HarnessTwoEnvironmentsVariant,
  'harness-config-repo': HarnessConfigRepoVariant,
  'harness-action': HarnessActionVariant,
  'harness-action-plan': HarnessActionPlanVariant,
  'harness-recap': HarnessRecapVariant,
  'harness-memory-architecture': HarnessMemoryArchitectureVariant,
  'harness-memory-scale': HarnessMemoryScaleVariant,
  'harness-perf-review': HarnessPerformanceReviewVariant
};

export default harnessVariantMap;
