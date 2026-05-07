import React from 'react';
import { motion } from 'framer-motion';

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
  mono: "'JetBrains Mono','SF Mono',Menlo,monospace"
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

const Shell = ({ children }) => (
  <div className="absolute inset-0 overflow-hidden" style={{ background: T.bg, color: T.ink, fontFamily: T.serif }}>
    <div className="absolute inset-x-0 top-0 h-1" style={{ background: '#f1c232' }} />
    {children}
  </div>
);

const Marker = ({ children }) => (
  <motion.div
    {...fade(0.05, -4)}
    className="absolute left-[4.8vw] top-[4.2vh] text-[13px] uppercase"
    style={{ color: T.coral, fontFamily: T.mono, fontWeight: 600, letterSpacing: '0.26em' }}
  >
    {children}
  </motion.div>
);

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

const Header = ({ slide, maxWidth = '74vw', titleFontSize = 'clamp(44px, 4.4vw, 70px)', subheadFontSize = 'clamp(18px, 1.35vw, 23px)' }) => (
  <>
    <Marker>{slide.marker}</Marker>
    <JobSpine activeKey={slide.spineActive} />
    <div className="absolute left-[4.8vw] right-[4.8vw] top-[8.3vh]" style={{ maxWidth }}>
      <h1 className="leading-[0.98]" style={{ fontSize: titleFontSize, fontWeight: 520 }}>
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

const Kicker = ({ children, className = '' }) => (
  <div className={`text-[12px] uppercase ${className}`} style={{ color: T.coralDark, fontFamily: T.mono, fontWeight: 600, letterSpacing: '0.22em' }}>
    {children}
  </div>
);

const MiniIcon = ({ type = 'dot', color = T.coralDark }) => {
  const common = { fill: 'none', stroke: color, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg viewBox="0 0 52 52" className="h-10 w-10" aria-hidden="true">
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
      {type === 'lane' && (
        <>
          <path d="M10 14h18l6 6h8v20H10V14z" {...common} />
          <path d="M17 29h18" {...common} />
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

const HarnessQuestionVariant = ({ slide }) => (
  <Shell>
    <Marker>{slide.marker}</Marker>
    <motion.div {...fade(0.18)} className="absolute left-[4.8vw] top-[18vh] text-[13px] uppercase" style={{ color: T.coral, fontFamily: T.mono, letterSpacing: '0.22em' }}>
      {slide.kicker}
    </motion.div>
    <h1 className="absolute left-[4.8vw] right-[4.8vw] top-[23vh] leading-[0.95]" style={{ fontSize: 'clamp(54px, 6.2vw, 100px)', fontWeight: 520 }}>
      <PartText parts={slide.parts} delay={0.25} />
    </h1>
    {(slide.contextCards || []).length > 0 && (
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[43.8vh] grid max-w-[1180px] grid-cols-2 gap-5">
        {slide.contextCards.map((card, index) => (
          <Card key={card.title} delay={0.74 + index * 0.1} className="p-4" style={index === 1 ? { background: '#fff8f2', borderColor: T.coralPale } : undefined}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Kicker>{card.kicker}</Kicker>
                <div className="mt-2" style={{ fontSize: 29, lineHeight: 1.02, fontWeight: 620 }}>
                  {card.title}
                </div>
              </div>
              {index === 0 ? (
                <div className="flex items-center gap-2 pt-1" style={{ color: T.blue }}>
                  <div className="rounded-[5px] border px-3 py-2 text-[11px]" style={{ borderColor: '#b9d3dc', background: T.bluePale, fontFamily: T.mono, fontWeight: 800 }}>PROMPT</div>
                  <span style={{ color: '#9ab4c1' }}>→</span>
                  <div className="rounded-full border px-3 py-2 text-[11px]" style={{ borderColor: '#b9d3dc', background: '#fff', fontFamily: T.mono, fontWeight: 800 }}>ANSWER</div>
                </div>
              ) : (
                <div className="flex items-center gap-1 pt-1" style={{ color: T.coralDark, fontFamily: T.mono }}>
                  {['context', 'tools', 'loop'].map((label) => (
                    <span key={label} className="rounded-full border px-2.5 py-1 text-[10px] uppercase" style={{ borderColor: T.coralPale, background: '#fff' }}>
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-3">
              {index === 0 ? (
                <div className="grid grid-cols-[1fr_74px_1fr] items-center gap-3">
                  <div className="rounded-[7px] border px-4 py-2.5 text-center" style={{ borderColor: '#b9d3dc', background: T.bluePale, color: T.blue, fontFamily: T.mono, fontSize: 12, fontWeight: 800 }}>
                    user asks
                  </div>
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border" style={{ borderColor: T.blue, color: T.blue, fontFamily: T.serif, fontStyle: 'italic', fontSize: 31 }}>M</div>
                  <div className="rounded-[7px] border px-4 py-2.5 text-center" style={{ borderColor: '#b9d3dc', background: '#fff', color: T.blue, fontFamily: T.mono, fontSize: 12, fontWeight: 800 }}>
                    answer returns
                  </div>
                </div>
              ) : (
                <div className="rounded-[9px] border px-4 py-2.5" style={{ borderColor: T.coralPale, background: '#fff' }}>
                  <div className="grid grid-cols-[1fr_72px_1fr] items-center gap-3">
                    <div className="space-y-2">
                      {['files', 'rules', 'memory'].map((label) => (
                        <div key={label} className="rounded-[5px] border px-3 py-1.5 text-center text-[11px]" style={{ borderColor: T.faint, color: T.muted, fontFamily: T.mono, fontWeight: 800 }}>{label}</div>
                      ))}
                    </div>
                    <div className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full border" style={{ borderColor: T.coral, color: T.coralDark, fontFamily: T.serif, fontStyle: 'italic', fontSize: 36 }}>
                      M
                      <span className="absolute bottom-[-7px] right-[-7px] rounded-full px-1.5 text-[10px]" style={{ background: T.coral, color: '#fff', fontFamily: T.mono, fontStyle: 'normal' }}>↺</span>
                    </div>
                    <div className="space-y-2">
                      {['read', 'edit', 'verify'].map((label) => (
                        <div key={label} className="rounded-[5px] border px-3 py-1.5 text-center text-[11px]" style={{ borderColor: T.coralPale, color: T.coralDark, fontFamily: T.mono, fontWeight: 800 }}>{label}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3" style={{ color: T.muted, fontSize: 17, lineHeight: 1.18 }}>
              {card.body}
            </div>
          </Card>
        ))}
      </div>
    )}
    {slide.bottomLine && (
      <motion.div {...fade(1.0)} className="absolute left-[4.8vw] top-[86.5vh] italic" style={{ color: T.muted, fontSize: 20 }}>
        {slide.bottomLine}
      </motion.div>
    )}
  </Shell>
);

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
              <motion.text {...fade(0.55)} x="108" y="214" textAnchor="end" style={{ fontFamily: T.serif, fontSize: 26, fontStyle: 'italic' }} fill={T.blue}>goal</motion.text>
              <Arrow x1={128} y1={205} x2={250} y2={205} delay={0.65} color={T.blue} />
              <motion.rect {...lineDraw(0.75)} x="270" y="80" width="770" height="250" rx="14" fill="none" stroke={T.coral} strokeWidth="1.6" />
              <motion.text {...fade(0.9)} x="300" y="116" style={{ fontFamily: T.mono, fontSize: 14, letterSpacing: '0.22em', fontWeight: 600 }} fill={T.coralDark}>HARNESS</motion.text>
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
      <div className="relative flex h-12 w-16 items-center justify-center rounded-[6px]" style={{ background: color, color: '#fff' }}>
        <span style={{ fontFamily: T.serif, fontSize: 28, fontStyle: 'italic', fontWeight: 620 }}>A</span>
        <span className="absolute bottom-[-5px] left-4 h-2 w-2 rounded-full" style={{ background: color }} />
        <span className="absolute bottom-[-5px] right-4 h-2 w-2 rounded-full" style={{ background: color }} />
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
    <Marker>{slide.marker}</Marker>
    <div className="absolute left-[5.4vw] right-[5.4vw] top-[8vh]">
      <h1 className="leading-[1.02]" style={{ fontSize: 'clamp(44px, 4.35vw, 74px)', fontWeight: 520 }}>
        <PartText parts={slide.parts} />
      </h1>
      <motion.div {...fade(0.62, 0)} className="mt-6 h-px w-full" style={{ background: T.rule }} />
    </div>
    <div className="absolute left-[10vw] right-[10vw] top-[46vh] grid grid-cols-[1fr_88px_1fr_88px_1fr] items-center">
      {(slide.equation || []).map((item, index) => (
        <React.Fragment key={`${item.title}-${index}`}>
          <Card delay={0.75 + index * 0.14} className="flex h-[255px] flex-col items-center justify-center p-7 text-center" style={{ background: item.result ? '#f8f1ea' : 'rgba(255,255,255,0.55)', borderColor: item.result ? T.coralPale : 'rgba(217,210,196,0.62)' }}>
            <EquationIcon type={item.icon} color={item.color || T.ink} />
            <div className="mt-8" style={{ fontSize: 32, lineHeight: 1, fontWeight: 560 }}>{item.title}</div>
            <div className="mt-5 text-[12px] uppercase" style={{ color: T.muted, fontFamily: T.mono, letterSpacing: '0.2em', fontWeight: 700 }}>
              {item.kicker}
            </div>
            <div className="mt-4" style={{ color: item.wordColor || T.coralDark, fontSize: 42, lineHeight: 1, fontStyle: 'italic', fontWeight: 430 }}>
              {item.word}
            </div>
          </Card>
          {index < (slide.equation || []).length - 1 && (
            <motion.div {...fade(0.92 + index * 0.14, 0)} className="flex items-center justify-center" style={{ color: T.muted, fontFamily: T.serif, fontSize: 58, fontWeight: 300 }}>
              {index === 0 ? '+' : '='}
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
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
    <Content className="grid grid-rows-[1fr_auto] gap-4" style={{ top: '31vh', bottom: '17vh' }}>
      <div className="grid grid-cols-4 gap-4">
        {(slide.vendors || []).map((vendor, index) => (
          <Card key={`${vendor.name}-${index}`} delay={0.42 + index * 0.09} className="flex min-h-[218px] flex-col p-5">
            <div className="flex h-14 items-center justify-center">
              {vendor.logoUrl ? (
                <img src={vendor.logoUrl} alt={`${vendor.name} logo`} className="max-h-11 max-w-[140px] object-contain" />
              ) : (
                <div style={{ color: vendor.color || T.ink, fontSize: 28, fontWeight: 620 }}>{vendor.name}</div>
              )}
            </div>
            <div className="mt-4 text-center" style={{ color: T.ink, fontSize: 27, lineHeight: 1, fontWeight: 620 }}>{vendor.name}</div>
            <div className="mt-2 text-center text-[11px] uppercase" style={{ color: vendor.color || T.coralDark, fontFamily: T.mono, letterSpacing: '0.13em', fontWeight: 700 }}>
              {vendor.surface || `agent · ${vendor.year}`}
            </div>
            <div className="mt-3 text-center" style={{ color: T.muted, fontSize: 14.5, lineHeight: 1.28 }}>
              {vendor.capability}
            </div>
          </Card>
        ))}
      </div>
      <Card delay={0.95} className="p-4">
        <div className="grid grid-cols-[32%_1fr] items-center gap-5">
          <div>
            <Kicker>Where the harness lives</Kicker>
            <div className="mt-1" style={{ fontSize: 25, lineHeight: 1.05, fontWeight: 560 }}>
              It runs where the work already is.
            </div>
            <div className="mt-1.5" style={{ color: T.muted, fontSize: 15.5, lineHeight: 1.25 }}>
              The shift is local agency: reading files, editing work, running commands, and calling approved tools.
            </div>
            {slide.toolboxTakeaway ? (
              <div className="mt-3 rounded-[6px] border px-3 py-2.5" style={{ borderColor: T.coralPale, background: '#fff8f2' }}>
                <div style={{ color: T.ink, fontSize: 20, lineHeight: 1.05, fontWeight: 560 }}>
                  {slide.toolboxTakeaway.title}
                </div>
                <div className="mt-1.5" style={{ color: T.muted, fontSize: 13.5, lineHeight: 1.22 }}>
                  {slide.toolboxTakeaway.body}
                </div>
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(slide.localSurfaces || []).map((surface, index) => (
              <div key={`${surface.label}-${index}`} className="rounded-[6px] border px-4 py-3" style={{ borderColor: T.coralPale, background: '#fff8f2' }}>
                <div style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 11.5, letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                  {surface.label}
                </div>
                <div className="mt-1.5" style={{ color: T.ink, fontSize: 21, lineHeight: 1.04, fontWeight: 560 }}>
                  {surface.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Content>
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
    {slide.marker && <Marker>{slide.marker}</Marker>}
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

const HarnessComponentsFrameworkVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} maxWidth="86vw" />
    <Content className="grid grid-cols-[29%_1fr] gap-8 items-center" style={{ top: '28vh', bottom: '13vh' }}>
      <Card delay={0.42} className="p-6">
        <Kicker>{slide.leftKicker || 'Framework'}</Kicker>
        <div className="mt-4" style={{ fontSize: 39, lineHeight: 1.04, fontWeight: 560 }}>
          {slide.leftTitle || 'The harness is the working environment around the model.'}
        </div>
        <div className="mt-5" style={{ color: T.muted, fontSize: 19, lineHeight: 1.35 }}>
          {slide.leftBody}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {(slide.components || []).map((component, index) => (
          <Card
            key={`${component.title}-${index}`}
            delay={0.56 + index * 0.045}
            className="min-h-[205px] p-5"
            style={component.highlight ? { background: '#fff8f2', borderColor: T.coral } : undefined}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-[11px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.16em' }}>
                {String(index + 1).padStart(2, '0')} · {component.kicker}
              </div>
              {component.icon && (
                <div className="rounded-[6px] border bg-white p-1.5" style={{ borderColor: component.color || T.coralPale }}>
                  <MiniIcon type={component.icon} color={component.color || T.coralDark} />
                </div>
              )}
            </div>
            <div className="mt-2" style={{ fontSize: 30, lineHeight: 1.03, fontWeight: 610 }}>{component.title}</div>
            <div className="mt-3" style={{ color: T.muted, fontSize: 16, lineHeight: 1.28 }}>{component.body}</div>
            {component.question && (
              <div className="mt-3 rounded-[5px] border px-3 py-2" style={{ borderColor: T.rule, background: 'rgba(255,255,255,0.46)', color: T.ink, fontSize: 15, lineHeight: 1.2 }}>
                {component.question}
              </div>
            )}
            {component.examples && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {component.examples.map((example) => (
                  <span key={example} className="rounded-[4px] border px-2 py-1 text-[10px] uppercase" style={{ borderColor: T.coralPale, color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.08em', fontWeight: 700 }}>
                    {example}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Content>
  </Shell>
);

const HarnessWhileLoopVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} />
    <Content className="grid grid-cols-[52%_1fr] gap-9 items-center">
      <svg viewBox="0 0 620 410" className="h-full w-full">
        <Model x={310} y={210} r={58} blue delay={0.45} />
        {[
          ['read', 112, 95],
          ['run', 418, 95],
          ['edit', 112, 300],
          ['check', 418, 300]
        ].map(([label, x, y], index) => (
          <g key={`${label}-${index}`}>
            <motion.line {...lineDraw(0.62 + index * 0.08)} x1="310" y1="210" x2={x + 75} y2={y + 24} stroke={T.faint} strokeWidth="1.3" strokeDasharray="5 7" />
            <motion.g {...fade(0.8 + index * 0.08)}>
              <rect x={x} y={y} width="150" height="48" rx="6" fill="#fff" stroke={T.faint} />
              <text x={x + 75} y={y + 30} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 16, fontWeight: 600 }} fill={T.ink}>{label}</text>
            </motion.g>
          </g>
        ))}
        <motion.g {...fade(1.15)}>
          <rect x="232" y="356" width="198" height="32" rx="16" fill={T.blue} />
          <text x="331" y="377" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 700 }} fill="#fff">task complete</text>
        </motion.g>
      </svg>
      <Card delay={0.72} className="p-5">
        <Kicker>Bounded loop</Kicker>
        <div className="mt-1 mb-4" style={{ color: T.coralDark, fontSize: 34, lineHeight: 1.05, fontWeight: 600 }}>
          repeat
          <span className="ml-3" style={{ color: T.muted, fontSize: 18, fontWeight: 400 }}>
            until done or a control stops the run
          </span>
        </div>
        <div className="rounded-[5px] p-5" style={{ background: T.black, color: '#f4eee2', fontFamily: T.mono, fontSize: 15, lineHeight: 1.55 }}>
          {[
            'while task_not_done:',
            '  decide_next_step()',
            '  take_action_or_call_tool()',
            '  inspect_the_result()',
            '  update_context()',
            '  if control_requires_stop: break',
            'return completed_work'
          ].map((line, index) => (
            <motion.div key={`${line}-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 + index * 0.05 }}>{line}</motion.div>
          ))}
        </div>
      </Card>
    </Content>
  </Shell>
);

const HarnessContextVariant = ({ slide }) => (
  <Shell>
    <Marker>{slide.marker}</Marker>
    <JobSpine activeKey={slide.spineActive} />
    <div className="absolute left-[4.8vw] right-[4.8vw] top-[9vh]">
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
    <div className="absolute left-[4.8vw] right-[4.8vw] top-[30vh]">
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
    <Header slide={slide} maxWidth="86vw" />
    <Content className="grid grid-rows-[1fr_auto] gap-6" style={{ top: '30vh', bottom: '12vh' }}>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${slide.gridColumns || (slide.connected ? 4 : slide.columns?.length > 4 ? 3 : 4)}, minmax(0, 1fr))` }}
      >
        {(slide.columns || []).map((item, index) => (
          <div key={`${item.title}-${index}`} className="relative">
            {slide.connected && index > 0 && (
              <motion.div {...fade(0.7 + index * 0.08, 0)} className="absolute left-[-22px] top-1/2 z-10 -translate-y-1/2" style={{ color: T.coralDark, fontSize: 28 }}>
                →
              </motion.div>
            )}
            <Card delay={0.42 + index * 0.065} className={`p-5 ${slide.connected ? 'min-h-[270px]' : ''}`} style={{ borderColor: item.color || T.faint, background: item.fill || 'rgba(255,255,255,0.65)' }}>
              <div className="flex items-start justify-between gap-4">
                <Kicker>{item.kicker}</Kicker>
                {item.icon && (
                  <div className="rounded-[6px] border p-2" style={{ borderColor: item.color || T.coralPale, background: '#fff' }}>
                    <MiniIcon type={item.icon} color={item.color || T.coralDark} />
                  </div>
                )}
              </div>
              <div className="mt-3" style={{ fontSize: slide.connected ? 27 : 29, lineHeight: 1.05, fontWeight: 610 }}>{item.title}</div>
            <div className="mt-3" style={{ color: T.muted, fontSize: 17, lineHeight: 1.35 }}>{item.body}</div>
            </Card>
          </div>
        ))}
      </div>
      {slide.steps && (
        <Card delay={0.88} className="p-4">
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${slide.steps.length}, minmax(0, 1fr))` }}>
            {slide.steps.map((step, index) => (
              <motion.div key={`${step.title}-${index}`} {...fade(1.02 + index * 0.045)} className="rounded-[5px] border px-3 py-3 text-center" style={{ borderColor: T.coralPale, background: '#fff8f2' }}>
                <div style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 12, fontWeight: 700 }}>{String(index + 1).padStart(2, '0')}</div>
                <div className="mt-1" style={{ fontSize: 21, lineHeight: 1.05, fontWeight: 620 }}>{step.title}</div>
                <div className="mt-1" style={{ color: T.muted, fontSize: 13, lineHeight: 1.25 }}>{step.body}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </Content>
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

const HarnessDeveloperApiProgramVariant = ({ slide }) => {
  const users = slide.users || [];
  const harnesses = slide.harnesses || [];
  const providers = slide.providers || [];
  const capabilities = slide.capabilities || [];
  const accessSteps = slide.accessSteps || [];
  const ownership = slide.ownership || [];
  const footerBadges = slide.footerBadges || [];

  return (
    <Shell>
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[4.8vh] text-center">
        <motion.h1 {...fade(0.12)} style={{ color: T.ink, fontFamily: T.serif, fontSize: 'clamp(40px, 3.8vw, 62px)', lineHeight: 0.92, fontWeight: 560, letterSpacing: '0' }}>
          {slide.programTitle || 'TritonAI Developer API Program'}
        </motion.h1>
      </div>

      <div className="absolute left-[5.8vw] right-[5.8vw] top-[13.2vh] grid grid-cols-[22%_18.5%_1fr_26%] items-center gap-4">
        <div>
          <Kicker className="mb-2" style={{ color: T.muted }}>Campus users</Kicker>
          <div className="space-y-2">
            {users.map((user, index) => (
              <ApiProgramCard key={user.title} delay={0.28 + index * 0.06} color={T.blue} className="flex h-[54px] items-center gap-3 px-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: T.bluePale }}>
                  <MiniIcon type={user.icon || 'people'} color={T.blue} />
                </div>
                <div style={{ color: T.ink, fontFamily: T.serif, fontSize: 20, lineHeight: 1, fontWeight: 620 }}>{user.title}</div>
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
                    <div style={{ color: T.ink, fontFamily: T.serif, fontSize: 21, lineHeight: 0.95, fontWeight: 650 }}>{harness.title}</div>
                    <div className="mt-0.5" style={{ color: T.muted, fontFamily: T.serif, fontSize: 13 }}>{harness.subtitle}</div>
                  </div>
                </ApiProgramCard>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <motion.div {...fade(0.74)} className="relative flex h-[168px] w-[168px] items-center justify-center rounded-full" style={{ background: 'radial-gradient(circle at 35% 28%, #1c5c91, #153457 72%)', boxShadow: '0 0 0 6px rgba(21,36,61,0.18), 0 12px 24px rgba(23,24,20,0.2)' }}>
            <div className="text-center" style={{ color: '#fff', fontFamily: T.serif }}>
              <div className="flex justify-center">
                <MiniIcon type="gateway" color="#ffc928" />
              </div>
              <div className="mt-1" style={{ fontSize: 30, lineHeight: 0.93, fontWeight: 620 }}>LLM<br />Gateway</div>
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
                  <div style={{ color: T.ink, fontFamily: T.serif, fontSize: 19, lineHeight: 0.95, fontWeight: 650 }}>{provider.title}</div>
                </ApiProgramCard>
              ))}
            </div>
            <div className="space-y-2">
              {capabilities.map((capability, index) => (
                <motion.div key={capability} {...fade(1.02 + index * 0.04, 0)} className="rounded-full border bg-white px-4 py-1.5 text-center" style={{ borderColor: '#c9d7df', color: T.ink, boxShadow: '0 2px 8px rgba(23,24,20,0.07)', fontFamily: T.mono, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
                  {capability}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[21.5%] top-[139px] flex items-center gap-2">
            <ApiProgramPill delay={0.72}>Use</ApiProgramPill>
            <ApiConnectorArrow width={28} />
          </div>
          <div className="absolute left-[43.2%] top-[139px] flex items-center gap-2">
            <ApiProgramPill delay={0.78}>Connect to</ApiProgramPill>
            <ApiConnectorArrow width={18} />
          </div>
          <div className="absolute left-[64.5%] top-[139px] flex items-center gap-2">
            <ApiProgramPill delay={0.95}>Accesses</ApiProgramPill>
            <ApiConnectorArrow width={28} />
          </div>
        </div>
      </div>

      <Card delay={1.08} className="absolute left-[5.8vw] right-[5.8vw] top-[47.8vh] p-3.5">
        <div className="mb-2 text-center text-[12px] uppercase" style={{ color: T.muted, fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.18em' }}>How to get access</div>
        <div className="grid grid-cols-4 gap-4">
          {accessSteps.map((step, index) => (
            <motion.div key={step.title} {...fade(1.2 + index * 0.06, 0)} className="grid grid-cols-[42px_1fr] gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: step.color || T.blue, color: '#fff', fontFamily: T.mono, fontSize: 17, fontWeight: 800 }}>{index + 1}</div>
              <div>
                <div style={{ color: T.ink, fontFamily: T.serif, fontSize: 25, lineHeight: 0.9, fontWeight: 650 }}>{step.title}</div>
                <div className="mt-1" style={{ color: '#5f6f82', fontFamily: T.serif, fontSize: 15, lineHeight: 1.08 }}>{step.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="absolute left-[5.8vw] right-[5.8vw] top-[63.8vh] grid grid-cols-2 gap-4">
        {ownership.map((owner, index) => (
          <Card key={owner.title} delay={1.35 + index * 0.08} className="p-3">
            <Kicker>{owner.title}</Kicker>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {owner.items.map((item) => (
                <span key={item} className="rounded-full px-3 py-1 text-center text-[10.5px]" style={{ background: '#edf1f5', color: '#5f6f82', fontFamily: T.mono, fontWeight: 700, letterSpacing: '0' }}>{item}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="absolute left-[5.8vw] right-[5.8vw] top-[75.6vh] grid grid-cols-[1fr_290px_1fr] items-center gap-4">
        {[footerBadges.slice(0, 3), footerBadges.slice(3)].map((group, groupIndex) => (
          <div key={`footer-group-${groupIndex}`} className={`flex items-center gap-4 ${groupIndex === 0 ? 'justify-end' : 'col-start-3 justify-start'}`}>
            {group.map((badge, index) => (
              <motion.div key={badge} {...fade(1.52 + (groupIndex * 3 + index) * 0.04, 0)} className="text-[11px] uppercase" style={{ color: '#6f7b8b', fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.06em' }}>
                {badge}
                {index < group.length - 1 && <span className="ml-4" style={{ color: '#f0b400' }}>|</span>}
              </motion.div>
            ))}
          </div>
        ))}
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

const HarnessCampusHostingVariant = ({ slide }) => {
  const steps = slide.hostingSteps || slide.steps || [];
  const lanes = slide.hostingLanes || [];

  return (
    <Shell>
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[4.6vh]">
        <motion.h1 {...fade(0.12)} style={{ color: T.ink, fontFamily: T.serif, fontSize: 'clamp(42px, 4.4vw, 68px)', lineHeight: 0.9, fontWeight: 560 }}>
          {slide.hostingTitle || 'Campus App Hosting'}
        </motion.h1>
        <motion.div {...fade(0.26)} className="mt-2" style={{ color: '#00629b', fontFamily: T.serif, fontSize: 21, lineHeight: 1.02, fontWeight: 650 }}>
          {slide.hostingSubtitle || slide.subhead}
        </motion.div>
      </div>

      <Card delay={0.38} className="absolute left-[4.8vw] right-[4.8vw] top-[18vh] rounded-[14px] p-3">
        <div className="grid grid-cols-6 gap-2.5">
          {steps.map((step, index) => {
            const color = step.color || ['#0076a8', '#0076a8', '#11c5d6', '#ffc928', '#ff8500', '#6f9363'][index] || T.blue;
            return (
              <motion.div key={step.title} {...fade(0.5 + index * 0.055)} className="relative rounded-[8px] border bg-[#fbfcfd] px-3 py-3" style={{ borderColor: '#d9e4eb', minHeight: 118 }}>
                {index < steps.length - 1 && (
                  <div className="absolute right-[-13px] top-1/2 z-10 -translate-y-1/2" style={{ color: '#b5c5d0', fontSize: 20 }}>→</div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: color, color: '#fff', fontFamily: T.mono, fontSize: 13, fontWeight: 800 }}>{index + 1}</div>
                  <MiniIcon type={step.icon || 'template'} color={color} />
                </div>
                <div className="mt-2" style={{ color: T.ink, fontFamily: T.serif, fontSize: 25, lineHeight: 0.9, fontWeight: 650 }}>{step.title}</div>
                <div className="mt-1.5" style={{ color: '#627089', fontFamily: T.serif, fontSize: 15.2, lineHeight: 1.05 }}>{step.body}</div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      <Card delay={0.7} className="absolute left-[4.8vw] right-[4.8vw] top-[40.6vh] bottom-[8.5vh] rounded-[14px] p-5">
        <div className="grid h-full grid-rows-3 gap-3">
          {lanes.map((lane, index) => (
            <motion.div key={lane.title} {...fade(0.82 + index * 0.08)} className="grid grid-cols-[14%_16%_1fr_16%] items-center gap-4">
              <div className="flex h-full items-center gap-4 border-l-[5px] pl-5" style={{ borderColor: lane.color }}>
                <div>
                  <div style={{ color: lane.color, fontFamily: T.serif, fontSize: 29, lineHeight: 0.94, fontWeight: 650 }}>{lane.title}</div>
                  <div className="mt-1.5 text-[12px]" style={{ color: '#7a8596', fontFamily: T.mono, fontWeight: 700 }}>{lane.volume}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="hidden xl:block" style={{ color: lane.color, fontSize: 23 }}>→</div>
                <HostingDiamond label={lane.review} color={lane.color} delay={0.95 + index * 0.08} />
              </div>

              <div className="relative">
                <div className="absolute left-[-22px] top-1/2 -translate-y-1/2 text-[10px] uppercase" style={{ color: lane.color, fontFamily: T.mono, fontWeight: 800, letterSpacing: '0.12em' }}>Approved →</div>
                <div className="rounded-[9px] border-2 bg-white px-5 py-3" style={{ borderColor: lane.softColor || lane.color }}>
                  <div style={{ color: T.ink, fontFamily: T.serif, fontSize: 29, lineHeight: 0.94, fontWeight: 650 }}>{lane.deployment}</div>
                  <div className="mt-2 inline-flex rounded-full px-3 py-1 text-[12px]" style={{ background: lane.fill, color: lane.color, fontFamily: T.mono, fontWeight: 800 }}>{lane.domain}</div>
                </div>
                {index < lanes.length - 1 && (
                  <div className="absolute left-1/2 top-[calc(100%+2px)] -translate-x-1/2 text-[11px] uppercase" style={{ color: lane.color, fontFamily: T.mono, letterSpacing: '0.16em', fontWeight: 800 }}>
                    escalate / migrate ↓
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                {lane.recurring && (
                  <>
                    <div style={{ color: lane.color, fontSize: 23 }}>→</div>
                    <HostingDiamond label={lane.recurring} color={lane.color} delay={1.08 + index * 0.08} />
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
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

const HarnessSubagentsVariant = ({ slide }) => (
  <Shell>
    <Header slide={slide} />
    <Content style={{ top: '30vh', bottom: '15vh' }}>
      <div className="mx-auto flex h-16 w-56 items-center justify-center rounded-[6px] text-center" style={{ background: T.black, color: '#fff', fontFamily: T.mono, fontSize: 16 }}>
        PARENT<br />main thread
      </div>
      <svg viewBox="0 0 1180 335" className="mt-3 h-[41vh] w-full overflow-visible">
        {[190, 590, 990].map((x, index) => (
          <g key={`branch-${index}`}>
            <motion.line {...lineDraw(0.62 + index * 0.08)} x1="590" y1="0" x2={x} y2="95" stroke={T.faint} strokeWidth="1.4" strokeDasharray="4 6" />
            <motion.text {...fade(0.76 + index * 0.08, 0)} x={(590 + x) / 2 + (index - 1) * 12} y={index === 1 ? 62 : 54} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.18em', fontWeight: 700 }} fill={T.muted}>SPAWN</motion.text>
          </g>
        ))}
        {(slide.agents || []).map((agent, index) => {
          const x = [50, 430, 810][index];
          return (
            <motion.g key={`${agent.name}-${index}`} {...fade(0.85 + index * 0.12)}>
              <rect x={x} y="95" width="320" height="150" rx="8" fill={agent.fill} stroke={agent.stroke} strokeWidth="1.5" />
              <text x={x + 28} y="132" style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: '0.16em', fontWeight: 700 }} fill={agent.stroke}>{agent.kicker || 'ISOLATED SESSION'}</text>
              <circle cx={x + 78} cy="178" r="38" fill={T.bg} stroke={agent.stroke} strokeWidth="1.4" />
              <text x={x + 78} y="188" textAnchor="middle" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 42 }} fill={agent.stroke}>{agent.letter}</text>
              <text x={x + 142} y="158" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.12em', fontWeight: 700 }} fill={T.muted}>{agent.mode || 'scoped work'}</text>
              {(agent.tools || ['tool', 'state']).map((tool, toolIndex) => {
                const tx = x + 142 + (toolIndex % 2) * 86;
                const ty = 169 + Math.floor(toolIndex / 2) * 31;
                return (
                  <g key={`${agent.name}-${tool}`}>
                    <rect x={tx} y={ty} width="76" height="23" rx="3" fill="#fff" stroke={T.faint} />
                    <text x={tx + 38} y={ty + 15} textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700 }} fill={T.muted}>{tool}</text>
                  </g>
                );
              })}
              {agent.locked && (
                <g>
                  <rect x={x + 42} y="224" width="236" height="18" rx="3" fill="#f4ded4" stroke={T.coralPale} />
                  <text x={x + 160} y="237" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.12em', fontWeight: 700 }} fill={T.coralDark}>NO NESTED DELEGATION</text>
                </g>
              )}
              <text x={x + 160} y="274" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 24, fontStyle: 'italic' }} fill={T.ink}>{agent.name}</text>
            </motion.g>
          );
        })}
        <motion.path {...lineDraw(1.25)} d="M90 292 C330 340, 850 340, 1090 292" fill="none" stroke={T.coralDark} strokeWidth="1.5" />
      </svg>
      <motion.div {...fade(1.35)} className="text-center" style={{ color: T.coralDark, fontSize: 45, fontStyle: 'italic' }}>
        divide · bound · reassemble
      </motion.div>
    </Content>
  </Shell>
);

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
  const summaryCards = slide.summaryCards || slide.rubric || [];
  const summaryColumns = Math.max(1, Math.min(slide.summaryColumns || summaryCards.length || 5, 5));
  const usesWideCards = summaryColumns <= 4;

  return (
    <Shell>
      <Marker>{slide.marker}</Marker>
      <div className="absolute left-[4.8vw] right-[4.8vw] top-[9.5vh] bottom-[10.5vh]">
        <div className="max-w-[88vw]">
          <h1 className="leading-[0.98]" style={{ fontSize: 'clamp(42px, 4.2vw, 68px)', fontWeight: 520 }}>
            <PartText parts={slide.parts || [{ text: 'Recap: rubric, harness, expectations.' }]} />
          </h1>
          {slide.subhead && (
            <motion.div {...fade(0.34)} className="mt-2 max-w-[82vw] italic" style={{ color: T.muted, fontSize: 'clamp(18px, 1.28vw, 22px)' }}>
              {slide.subhead}
            </motion.div>
          )}
        </div>
        <div className="mt-5 grid items-start gap-6" style={{ gridTemplateColumns: usesWideCards ? 'minmax(0, 1fr) minmax(360px, 36%)' : 'minmax(0, 1fr) minmax(320px, 34%)' }}>
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${summaryColumns}, minmax(0, 1fr))` }}>
            {summaryCards.map((level, index) => (
              <Card key={`${level.title}-${index}`} delay={0.48 + index * 0.055} className={usesWideCards ? 'flex min-h-[312px] flex-col p-5' : 'flex min-h-[285px] flex-col p-4'} style={{ borderColor: level.highlight || level.chipDark ? T.coral : T.faint }}>
                <div className="text-[12px] uppercase" style={{ color: T.coralDark, fontFamily: T.mono, letterSpacing: '0.16em' }}>{level.label || `Level ${index + 1}`}</div>
                <div className="mt-3" style={{ fontSize: usesWideCards ? 25 : 23, lineHeight: 1.04, fontWeight: 650 }}>{level.title}</div>
                <div className="mt-3 flex-1" style={{ color: T.muted, fontSize: usesWideCards ? 15.3 : 14.2, lineHeight: usesWideCards ? 1.28 : 1.24 }}>{level.body}</div>
                <div className="mt-auto rounded-[5px] px-3 py-2" style={{ background: level.highlight || level.chipDark ? T.coral : '#fff8f2', color: level.highlight || level.chipDark ? '#fff' : T.coralDark, fontFamily: T.mono, fontSize: usesWideCards ? 12.2 : 11.5, fontWeight: 700 }}>
                  {level.expectation}
                </div>
              </Card>
            ))}
          </div>
          <Card delay={0.82} className={usesWideCards ? 'p-5' : 'p-4'}>
            <Kicker>{slide.expectationKicker || 'Staff expectation'}</Kicker>
            <div className="mt-2" style={{ fontSize: usesWideCards ? 30 : 27, lineHeight: 1.02, fontWeight: 560 }}>{slide.expectationTitle}</div>
            {slide.practice && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {slide.practice.map((item, index) => (
                  <motion.div key={item.title} {...fade(0.92 + index * 0.06, 0)} className="rounded-[5px] border px-2 py-1.5 text-center" style={{ borderColor: T.coralPale, background: '#fff8f2' }}>
                    <div style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 9, letterSpacing: '0.1em', fontWeight: 700 }}>{item.kicker}</div>
                    <div className="mt-0.5" style={{ fontSize: usesWideCards ? 17 : 16, lineHeight: 1.05, fontWeight: 650 }}>{item.title}</div>
                  </motion.div>
                ))}
              </div>
            )}
            <div className="mt-3 space-y-0">
              {(slide.expectations || []).map((item, index) => (
                <motion.div key={`${item}-${index}`} {...fade(1 + index * 0.055)} className="grid grid-cols-[38px_1fr] border-b py-2" style={{ borderColor: T.rule }}>
                  <span style={{ color: T.coralDark, fontFamily: T.mono, fontSize: 12, fontWeight: 700 }}>{String(index + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: usesWideCards ? 17 : 16.2, lineHeight: usesWideCards ? 1.18 : 1.16 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export const harnessVariantMap = {
  'harness-pressure': HarnessPressureVariant,
  'harness-rubric': HarnessRubricVariant,
  'harness-question': HarnessQuestionVariant,
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
  'harness-action-plan': HarnessActionPlanVariant,
  'harness-recap': HarnessRecapVariant
};

export default harnessVariantMap;
