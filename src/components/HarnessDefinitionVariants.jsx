import React from 'react';
import { motion } from 'framer-motion';

/**
 * HarnessDefinitionVariants — editorial design system for the harness-definition
 * subset of the cabinet-may-2026 deck. Light cream background, high-contrast
 * editorial serif, monospace section markers. Distinct from the rest of the
 * cabinet deck, which uses a dark navy editorial system.
 *
 * Variants exported:
 *   - harness-question        Large editorial-serif question, no chrome
 *   - harness-anatomy         Section marker + headline + 6-card affordance grid
 *   - harness-vs-model        Model-alone vs model-in-harness side-by-side
 *   - harness-vendors         Vendor convergence grid (with Onyx Craft as local)
 *   - harness-manifesto       Single-line editorial manifesto
 *
 * Slide data shape (per variant):
 *   { variant: "harness-question",   marker, eyebrow, headline, accents:[...], subhead, footer }
 *   { variant: "harness-anatomy",    marker, eyebrow, title, subtitle, items:[{label, kind, note}] }
 *   { variant: "harness-vs-model",   marker, eyebrow, title, subtitle, leftLabel, rightLabel }
 *   { variant: "harness-vendors",    marker, eyebrow, title, subtitle, vendors:[{name, org, year, highlight}] }
 *   { variant: "harness-manifesto",  marker, headline, accents, subhead }
 */

// ───────────────────────────────────────────────────────────────────────────
// Design tokens
// ───────────────────────────────────────────────────────────────────────────

const H = {
  bg: '#EFE8D6',              // warm cream / parchment
  ink: '#1F1E1A',             // warm near-black
  inkSoft: '#3A3833',         // soft body
  inkMuted: '#6F6B62',        // tertiary gray
  inkDim: '#94908A',          // dimmer
  rule: 'rgba(31,30,26,0.10)',
  ruleStrong: 'rgba(31,30,26,0.18)',
  coral: '#C56A53',           // warm terracotta — primary accent (italics, numbers, marker)
  coralSoft: '#E2A892',       // softer coral for fills/borders
  coralFill: 'rgba(197,106,83,0.08)',
  navy: '#2A4A6F',            // secondary emphasis
  serif: "'Fraunces','Iowan Old Style','Charter',Georgia,serif",
  mono: "'JetBrains Mono','SF Mono',Menlo,monospace",
  sans: "'Inter','Helvetica Neue',system-ui,-apple-system,sans-serif"
};

const SHELL_PAD_X = 'px-16';
const BOTTOM_SAFE = 'pb-32';

// ───────────────────────────────────────────────────────────────────────────
// Primitives
// ───────────────────────────────────────────────────────────────────────────

const Shell = ({ children }) => (
  <div
    className="absolute inset-0 flex flex-col"
    style={{
      backgroundColor: H.bg,
      color: H.ink,
      fontFamily: H.serif
    }}
  >
    {children}
  </div>
);

const SectionMarker = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    className="text-[12px] uppercase"
    style={{
      fontFamily: H.mono,
      letterSpacing: '0.18em',
      color: H.coral,
      fontWeight: 400
    }}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, delay = 0.1 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay }}
    className="text-[11px] uppercase mb-3"
    style={{
      fontFamily: H.mono,
      letterSpacing: '0.22em',
      color: H.inkMuted
    }}
  >
    {children}
  </motion.div>
);

const Subhead = ({ children, delay = 0.5 }) => (
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className="mt-4 max-w-4xl"
    style={{
      fontFamily: H.serif,
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: 'clamp(18px, 1.7vw, 26px)',
      color: H.inkMuted,
      lineHeight: 1.4
    }}
  >
    {children}
  </motion.p>
);

// Render a headline with inline accent words (italic + colored).
// `parts` is an array of { text, accent? } segments; whitespace must be inside the segments.
const EditorialHeadline = ({ parts = [], delay = 0.2, maxFontSize = 88 }) => (
  <h1
    className="leading-[1.05]"
    style={{
      fontFamily: H.serif,
      fontWeight: 500,
      fontSize: `clamp(40px, 5.4vw, ${maxFontSize}px)`,
      letterSpacing: '-0.015em',
      color: H.ink
    }}
  >
    {parts.map((p, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
        style={{
          color: p.accent ? H.coral : H.ink,
          fontStyle: p.accent ? 'italic' : 'normal',
          fontWeight: p.accent ? 400 : 500
        }}
      >
        {p.text}
      </motion.span>
    ))}
  </h1>
);

// Pill-shaped tool/skill label with monospace text, thin coral border.
const Pill = ({ label, kind, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    className="inline-flex flex-col items-start rounded-md px-4 py-2.5"
    style={{
      backgroundColor: H.coralFill,
      border: `1px solid ${H.coralSoft}`,
      minWidth: 160
    }}
  >
    <div
      style={{
        fontFamily: H.mono,
        fontSize: 13,
        color: H.ink,
        letterSpacing: '0.02em'
      }}
    >
      {label}
    </div>
    {kind && (
      <div
        className="mt-1"
        style={{
          fontFamily: H.mono,
          fontSize: 9.5,
          color: H.inkDim,
          letterSpacing: '0.15em',
          textTransform: 'uppercase'
        }}
      >
        {kind}
      </div>
    )}
  </motion.div>
);

// ───────────────────────────────────────────────────────────────────────────
// Variant: harness-question
// Single editorial-serif question, no chrome. Slide opens a section.
// ───────────────────────────────────────────────────────────────────────────

const HarnessQuestionVariant = ({ slide }) => (
  <Shell>
    <div className={`absolute top-12 left-16 ${SHELL_PAD_X.replace('px-16', '')}`}>
      <SectionMarker>{slide.marker || '§ DEFINITION'}</SectionMarker>
    </div>
    <div className={`flex-1 flex flex-col justify-center ${SHELL_PAD_X} ${BOTTOM_SAFE}`}>
      <div className="max-w-5xl">
        {slide.eyebrow && <Eyebrow delay={0.2}>{slide.eyebrow}</Eyebrow>}
        <EditorialHeadline parts={slide.parts || []} delay={0.4} maxFontSize={120} />
        {slide.subhead && <Subhead delay={0.9}>{slide.subhead}</Subhead>}
      </div>
    </div>
    {slide.footer && (
      <div
        className={`absolute bottom-24 left-16 text-[11px] uppercase`}
        style={{ fontFamily: H.mono, letterSpacing: '0.22em', color: H.inkDim }}
      >
        {slide.footer}
      </div>
    )}
  </Shell>
);

// ───────────────────────────────────────────────────────────────────────────
// Variant: harness-anatomy
// Section marker + headline + 2x3 grid of affordance cards.
// Card shape: monospace label + small-caps kind + italic note.
// ───────────────────────────────────────────────────────────────────────────

const HarnessAnatomyVariant = ({ slide }) => (
  <Shell>
    <div className="absolute top-12 left-16">
      <SectionMarker>{slide.marker || '§ ANATOMY'}</SectionMarker>
    </div>
    <div className={`flex-1 flex flex-col justify-center ${SHELL_PAD_X} ${BOTTOM_SAFE}`}>
      <div className="max-w-6xl">
        <EditorialHeadline parts={slide.parts || []} delay={0.3} maxFontSize={76} />
        {slide.subhead && <Subhead delay={0.7}>{slide.subhead}</Subhead>}
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-5xl">
          {(slide.items || []).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-md px-5 py-4"
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                border: `1px solid ${H.coralSoft}`,
                minHeight: 110
              }}
            >
              <div
                style={{
                  fontFamily: H.mono,
                  fontSize: 14.5,
                  color: H.ink,
                  letterSpacing: '0.01em'
                }}
              >
                {item.label}
              </div>
              {item.kind && (
                <div
                  className="mt-1.5"
                  style={{
                    fontFamily: H.mono,
                    fontSize: 9.5,
                    color: H.coral,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase'
                  }}
                >
                  {item.kind}
                </div>
              )}
              {item.note && (
                <div
                  className="mt-3"
                  style={{
                    fontFamily: H.serif,
                    fontStyle: 'italic',
                    fontSize: 14,
                    color: H.inkSoft,
                    lineHeight: 1.4
                  }}
                >
                  {item.note}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        {slide.footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 + (slide.items?.length || 0) * 0.1 + 0.2 }}
            className="mt-10 text-[12px] uppercase"
            style={{
              fontFamily: H.mono,
              letterSpacing: '0.18em',
              color: H.inkMuted
            }}
          >
            {slide.footer}
          </motion.div>
        )}
      </div>
    </div>
  </Shell>
);

// ───────────────────────────────────────────────────────────────────────────
// Variant: harness-vs-model
// Two side-by-side schematics: model-alone (input → model → output → STOP)
// vs model-in-loop (goal → harness wrapping model + tools + review).
// ───────────────────────────────────────────────────────────────────────────

const ModelCircle = ({ x, y, r = 36 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="none" stroke={H.ink} strokeWidth="1" />
    <text
      x={x}
      y={y + 1}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontFamily: H.serif, fontStyle: 'italic', fontSize: r * 0.95, fontWeight: 500 }}
      fill={H.ink}
    >
      M
    </text>
    <text
      x={x}
      y={y + r + 16}
      textAnchor="middle"
      style={{
        fontFamily: H.mono,
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase'
      }}
      fill={H.inkMuted}
    >
      MODEL
    </text>
  </g>
);

const ArrowLine = ({ x1, y1, x2, y2, color = H.inkMuted, dashed = false }) => (
  <g>
    <line
      x1={x1}
      y1={y1}
      x2={x2 - 8}
      y2={y2}
      stroke={color}
      strokeWidth="1"
      strokeDasharray={dashed ? '3 3' : 'none'}
    />
    <polygon
      points={`${x2},${y2} ${x2 - 8},${y2 - 3.5} ${x2 - 8},${y2 + 3.5}`}
      fill={color}
    />
  </g>
);

const HarnessVsModelVariant = ({ slide }) => (
  <Shell>
    <div className="absolute top-12 left-16">
      <SectionMarker>{slide.marker || '§ DISTINCTION'}</SectionMarker>
    </div>
    <div className={`flex-1 flex flex-col justify-center ${SHELL_PAD_X} ${BOTTOM_SAFE}`}>
      <div className="max-w-6xl">
        <EditorialHeadline parts={slide.parts || []} delay={0.3} maxFontSize={68} />
        {slide.subhead && <Subhead delay={0.8}>{slide.subhead}</Subhead>}
        <div className="mt-12 grid grid-cols-2 gap-12">
          {/* LEFT: model alone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div
              className="text-[10.5px] uppercase mb-4"
              style={{ fontFamily: H.mono, letterSpacing: '0.22em', color: H.inkMuted }}
            >
              {slide.leftLabel || 'MODEL ALONE — ANSWERS, THEN STOPS'}
            </div>
            <svg viewBox="0 0 540 200" className="w-full">
              <text
                x="20"
                y="105"
                style={{ fontFamily: H.serif, fontStyle: 'italic', fontSize: 16 }}
                fill={H.inkMuted}
              >
                "answer this"
              </text>
              <ArrowLine x1={130} y1={100} x2={210} y2={100} />
              <ModelCircle x={250} y={100} r={36} />
              <ArrowLine x1={300} y1={100} x2={400} y2={100} />
              <rect x="400" y="86" width="80" height="28" rx="6" fill={H.coral} />
              <text
                x="440"
                y="105"
                textAnchor="middle"
                style={{ fontFamily: H.mono, fontSize: 12, letterSpacing: '0.18em' }}
                fill="#FFF"
              >
                STOP
              </text>
            </svg>
            <div
              className="mt-3 text-center"
              style={{
                fontFamily: H.serif,
                fontStyle: 'italic',
                fontSize: 14,
                color: H.inkMuted
              }}
            >
              no memory · no follow-through · no recovery
            </div>
          </motion.div>
          {/* RIGHT: harness loop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <div
              className="text-[10.5px] uppercase mb-4"
              style={{ fontFamily: H.mono, letterSpacing: '0.22em', color: H.inkMuted }}
            >
              {slide.rightLabel || 'INSIDE A HARNESS — ACT, OBSERVE, ADJUST'}
            </div>
            <svg viewBox="0 0 540 200" className="w-full">
              <rect
                x="6"
                y="6"
                width="528"
                height="188"
                rx="10"
                fill="none"
                stroke={H.coralSoft}
                strokeWidth="1"
              />
              <text
                x="20"
                y="22"
                style={{
                  fontFamily: H.mono,
                  fontSize: 9.5,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase'
                }}
                fill={H.coral}
              >
                HARNESS
              </text>
              <text
                x="60"
                y="105"
                style={{ fontFamily: H.serif, fontStyle: 'italic', fontSize: 14 }}
                fill={H.inkMuted}
              >
                goal
              </text>
              <ArrowLine x1={100} y1={100} x2={180} y2={100} />
              <ModelCircle x={220} y={100} r={32} />
              {/* Tool pills on the right */}
              {[
                { label: 'take action', y: 60 },
                { label: 'observe', y: 100 },
                { label: 'adjust', y: 140 }
              ].map((t, i) => (
                <g key={i}>
                  <ArrowLine x1={258} y1={100} x2={350} y2={t.y} color={H.coralSoft} />
                  <rect
                    x="350"
                    y={t.y - 12}
                    width="120"
                    height="24"
                    rx="5"
                    fill="none"
                    stroke={H.coralSoft}
                  />
                  <text
                    x="410"
                    y={t.y + 4}
                    textAnchor="middle"
                    style={{ fontFamily: H.mono, fontSize: 11.5 }}
                    fill={H.ink}
                  >
                    {t.label}
                  </text>
                </g>
              ))}
              {/* loop arrow back to model */}
              <path
                d={`M 410 ${152} Q 410 175, 220 175 Q 130 175, 130 130 Q 130 95, 178 95`}
                fill="none"
                stroke={H.coralSoft}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <polygon
                points={`190,95 178,90 178,100`}
                fill={H.coralSoft}
              />
            </svg>
            <div
              className="mt-3 text-center"
              style={{
                fontFamily: H.serif,
                fontStyle: 'italic',
                fontSize: 14,
                color: H.inkMuted
              }}
            >
              the closed loop · what makes an agent capable
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </Shell>
);

// ───────────────────────────────────────────────────────────────────────────
// Variant: harness-vendors
// Vendor cards in a row showing convergence; final card highlighted as our local instance.
// ───────────────────────────────────────────────────────────────────────────

const HarnessVendorsVariant = ({ slide }) => {
  const vendors = slide.vendors || [];
  return (
    <Shell>
      <div className="absolute top-12 left-16">
        <SectionMarker>{slide.marker || '§ ALREADY IN YOUR TOOLBOX'}</SectionMarker>
      </div>
      <div className={`flex-1 flex flex-col justify-center ${SHELL_PAD_X} ${BOTTOM_SAFE}`}>
        <div className="max-w-6xl">
          <EditorialHeadline parts={slide.parts || []} delay={0.3} maxFontSize={64} />
          {slide.subhead && <Subhead delay={0.8}>{slide.subhead}</Subhead>}
          <div
            className="mt-12 grid gap-5"
            style={{
              gridTemplateColumns: `repeat(${Math.min(vendors.length, 5)}, minmax(0,1fr))`
            }}
          >
            {vendors.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                className="rounded-md px-4 py-5 flex flex-col items-center text-center"
                style={{
                  backgroundColor: v.highlight ? H.coralFill : 'rgba(255,255,255,0.45)',
                  border: `1px solid ${v.highlight ? H.coral : H.ruleStrong}`,
                  minHeight: 130
                }}
              >
                <div
                  style={{
                    fontFamily: H.serif,
                    fontWeight: 500,
                    fontSize: 19,
                    color: H.ink,
                    letterSpacing: '-0.005em'
                  }}
                >
                  {v.name}
                </div>
                <div
                  className="mt-1.5"
                  style={{
                    fontFamily: H.mono,
                    fontSize: 9.5,
                    color: v.highlight ? H.coral : H.inkDim,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase'
                  }}
                >
                  {v.org} · {v.year}
                </div>
                {v.note && (
                  <div
                    className="mt-3 px-1"
                    style={{
                      fontFamily: H.serif,
                      fontStyle: 'italic',
                      fontSize: 13,
                      color: H.inkSoft,
                      lineHeight: 1.4
                    }}
                  >
                    {v.note}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {slide.footer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 + vendors.length * 0.12 + 0.3 }}
              className="mt-10 flex items-baseline gap-4"
            >
              <span
                className="text-[11px] uppercase"
                style={{ fontFamily: H.mono, letterSpacing: '0.22em', color: H.inkMuted }}
              >
                THE RESULT
              </span>
              <span
                style={{
                  fontFamily: H.serif,
                  fontSize: 18,
                  fontStyle: 'italic',
                  color: H.inkSoft
                }}
              >
                {slide.footer}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </Shell>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Variant: harness-component
// Per-component drilldown. Two-column body with a configurable diagram on
// the left and a code/metrics/list panel on the right. Same visual depth as
// the source's anatomy-component pages.
//
// Slide schema:
//   {
//     variant: 'harness-component',
//     marker, parts, subhead,            // top section
//     diagram: 'orbit' | 'flow' | 'bar', // left-side diagram type
//     diagramData: { ... },              // see implementations below
//     panel: { kind: 'code' | 'list' | 'table', ... },  // right-side panel
//     footer
//   }
// ───────────────────────────────────────────────────────────────────────────

const OrbitDiagram = ({ data, delay = 1.0 }) => {
  // Center label + 4 satellite pills connected by thin-line spokes.
  // data: { center, satellites: [{label, pos: 'tl'|'tr'|'bl'|'br'}], decideLabel, feedbackLabel }
  const { center = 'M', satellites = [], decideLabel = 'DECIDE', feedbackLabel = 'FEED BACK' } = data || {};
  const positions = {
    tl: { x: 80, y: 130 },
    tr: { x: 380, y: 130 },
    bl: { x: 80, y: 330 },
    br: { x: 380, y: 330 }
  };
  return (
    <svg viewBox="0 0 540 460" className="w-full">
      {satellites.map((s, i) => {
        const p = positions[s.pos || ['tl', 'tr', 'bl', 'br'][i % 4]];
        return (
          <motion.line
            key={`line-${i}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 + i * 0.08, ease: 'easeOut' }}
            x1="270"
            y1="230"
            x2={p.x + 80}
            y2={p.y + 18}
            stroke={H.inkMuted}
            strokeWidth="0.8"
          />
        );
      })}
      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] }}
      >
        <circle cx="270" cy="230" r="44" fill="none" stroke={H.ink} strokeWidth="1" />
        <text
          x="270"
          y="232"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontFamily: H.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 38 }}
          fill={H.ink}
        >
          {center}
        </text>
        <text
          x="270"
          y="295"
          textAnchor="middle"
          style={{ fontFamily: H.mono, fontSize: 10, letterSpacing: '0.22em' }}
          fill={H.inkMuted}
        >
          MODEL
        </text>
      </motion.g>
      <text
        x="200"
        y="225"
        textAnchor="end"
        style={{ fontFamily: H.mono, fontSize: 10, letterSpacing: '0.18em' }}
        fill={H.inkDim}
      >
        {decideLabel}
      </text>
      <text
        x="340"
        y="225"
        style={{ fontFamily: H.mono, fontSize: 10, letterSpacing: '0.18em' }}
        fill={H.inkDim}
      >
        {feedbackLabel}
      </text>
      {satellites.map((s, i) => {
        const p = positions[s.pos || ['tl', 'tr', 'bl', 'br'][i % 4]];
        return (
          <motion.g
            key={`pill-${i}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: delay + 0.5 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
          >
            <rect
              x={p.x}
              y={p.y}
              width="160"
              height="36"
              rx="6"
              fill="none"
              stroke={H.coralSoft}
              strokeWidth="1"
            />
            <text
              x={p.x + 80}
              y={p.y + 22}
              textAnchor="middle"
              style={{ fontFamily: H.mono, fontSize: 12.5 }}
              fill={H.ink}
            >
              {s.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
};

const FlowDiagram = ({ data, delay = 1.0 }) => {
  // Left → middle → right vertical sequence with arrows.
  // data: { steps: [{label, kind}], goal, output }
  const { steps = [], goal = 'goal', output = 'done' } = data || {};
  return (
    <svg viewBox="0 0 540 460" className="w-full">
      {/* outer harness frame */}
      <motion.rect
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        x="20"
        y="20"
        width="500"
        height="420"
        rx="12"
        fill="none"
        stroke={H.coralSoft}
        strokeWidth="1"
      />
      <text
        x="36"
        y="44"
        style={{
          fontFamily: H.mono,
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase'
        }}
        fill={H.coral}
      >
        {data?.frameLabel || 'HARNESS · CLOSED LOOP'}
      </text>
      <text
        x="36"
        y="100"
        style={{ fontFamily: H.serif, fontStyle: 'italic', fontSize: 16 }}
        fill={H.inkMuted}
      >
        {goal}
      </text>
      {steps.map((s, i) => {
        const y = 150 + i * 70;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.4 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            <rect
              x="60"
              y={y}
              width="200"
              height="44"
              rx="6"
              fill={H.coralFill}
              stroke={H.coralSoft}
              strokeWidth="1"
            />
            <text
              x="80"
              y={y + 22}
              style={{ fontFamily: H.mono, fontSize: 12 }}
              fill={H.ink}
            >
              {s.label}
            </text>
            <text
              x="80"
              y={y + 36}
              style={{
                fontFamily: H.mono,
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase'
              }}
              fill={H.coral}
            >
              {s.kind}
            </text>
            {/* connector to next step */}
            {i < steps.length - 1 && (
              <line
                x1="160"
                y1={y + 44}
                x2="160"
                y2={y + 70}
                stroke={H.inkDim}
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
            )}
            {/* lateral annotation */}
            {s.note && (
              <text
                x="290"
                y={y + 25}
                style={{ fontFamily: H.serif, fontStyle: 'italic', fontSize: 13 }}
                fill={H.inkSoft}
              >
                {s.note}
              </text>
            )}
          </motion.g>
        );
      })}
      <motion.text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.4 + steps.length * 0.12 + 0.2 }}
        x="36"
        y={150 + steps.length * 70 + 32}
        style={{ fontFamily: H.serif, fontStyle: 'italic', fontSize: 16 }}
        fill={H.coral}
      >
        ↳ {output}
      </motion.text>
    </svg>
  );
};

const BarDiagram = ({ data, delay = 1.0 }) => {
  // Horizontal usage bar with subdivisions and a reserve segment + side metric.
  // data: { label, segments: [{label, weight}], reserveLabel, current, max, unit }
  const { label = 'BUDGET', segments = [], reserveLabel = 'reserve', current = '0', max = '0', unit = '' } =
    data || {};
  const totalWeight = segments.reduce((s, x) => s + x.weight, 0) || 1;
  const fillFraction = 0.78; // visual: 78% of bar is "used" (segments)
  const barTotalWidth = 880;
  const usedWidth = barTotalWidth * fillFraction;
  const reserveWidth = barTotalWidth - usedWidth;

  let cursor = 0;
  return (
    <svg viewBox="0 0 920 240" className="w-full">
      <text
        x="6"
        y="20"
        style={{
          fontFamily: H.mono,
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase'
        }}
        fill={H.inkMuted}
      >
        {label}
      </text>
      <text
        x={barTotalWidth + 18}
        y={68}
        textAnchor="end"
        style={{
          fontFamily: H.serif,
          fontWeight: 500,
          fontSize: 28
        }}
        fill={H.coral}
      >
        {current}
      </text>
      <text
        x={barTotalWidth + 24}
        y={68}
        style={{ fontFamily: H.mono, fontSize: 11, letterSpacing: '0.12em' }}
        fill={H.inkMuted}
      >
        of {max} {unit}
      </text>
      {/* outer rule */}
      <motion.line
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay }}
        x1="6"
        y1="34"
        x2={barTotalWidth + 6}
        y2="34"
        stroke={H.rule}
        strokeWidth="1"
      />
      {segments.map((seg, i) => {
        const w = (seg.weight / totalWeight) * usedWidth;
        const x = 6 + cursor;
        cursor += w;
        const opacity = 0.6 + (i / Math.max(1, segments.length - 1)) * 0.35;
        return (
          <motion.rect
            key={i}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: w, opacity }}
            transition={{ duration: 0.5, delay: delay + 0.2 + i * 0.08, ease: 'easeOut' }}
            x={x}
            y="50"
            height="40"
            fill={H.coral}
          />
        );
      })}
      {/* reserve segment */}
      <motion.rect
        initial={{ width: 0 }}
        animate={{ width: reserveWidth }}
        transition={{ duration: 0.5, delay: delay + 0.6, ease: 'easeOut' }}
        x={6 + usedWidth}
        y="50"
        height="40"
        fill="none"
        stroke={H.coralSoft}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <text
        x={6 + usedWidth + reserveWidth / 2}
        y="74"
        textAnchor="middle"
        style={{
          fontFamily: H.mono,
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase'
        }}
        fill={H.inkDim}
      >
        {reserveLabel}
      </text>
      {/* segment labels */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.9 }}
      >
        {segments.map((seg, i) => (
          <g key={i}>
            <circle cx={20 + i * 130} cy="120" r="2" fill={H.coral} />
            <text
              x={28 + i * 130}
              y="124"
              style={{
                fontFamily: H.serif,
                fontStyle: 'italic',
                fontSize: 14
              }}
              fill={H.inkSoft}
            >
              {seg.label}
            </text>
          </g>
        ))}
      </motion.g>
    </svg>
  );
};

const CodePanel = ({ data, delay = 1.4 }) => {
  // Dark warm-navy block with traffic-light dots + monospace lines.
  // data: { filename, lines: [{text, type?}] }
  const { filename = 'example.py', lines = [] } = data || {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-md p-4"
      style={{
        backgroundColor: '#1F2530',
        fontFamily: H.mono,
        fontSize: 12.5,
        lineHeight: 1.55,
        minHeight: 280
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
        <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
        <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
        <span
          className="ml-3"
          style={{
            color: 'rgba(245,241,234,0.5)',
            fontFamily: H.mono,
            fontSize: 11,
            letterSpacing: '0.05em'
          }}
        >
          {filename}
        </span>
      </div>
      {lines.map((ln, i) => {
        const color =
          ln.type === 'kw' ? '#E2A892' :
          ln.type === 'str' ? '#A6C77A' :
          ln.type === 'comment' ? '#6F6B62' :
          ln.type === 'flag' ? '#F4A088' :
          'rgba(245,241,234,0.92)';
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, delay: delay + 0.25 + i * 0.06 }}
            style={{ color, whiteSpace: 'pre' }}
          >
            {ln.text}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const ListPanel = ({ data, delay = 1.4 }) => {
  // Headed list of name/value/note rows for registry-style content.
  // data: { heading, rows: [{name, value, note}] }
  const { heading = 'REGISTRY', rows = [] } = data || {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-md px-5 py-4"
      style={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        border: `1px solid ${H.coralSoft}`,
        minHeight: 280
      }}
    >
      <div
        className="mb-4 text-[10.5px] uppercase"
        style={{ fontFamily: H.mono, letterSpacing: '0.22em', color: H.coral }}
      >
        {heading}
      </div>
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.2 + i * 0.06 }}
            className="flex items-baseline gap-3"
          >
            <span
              style={{
                fontFamily: H.mono,
                fontSize: 12.5,
                color: H.ink,
                minWidth: 110
              }}
            >
              {r.name}
            </span>
            <span
              style={{
                fontFamily: H.serif,
                fontStyle: 'italic',
                fontSize: 13,
                color: H.coral,
                minWidth: 80
              }}
            >
              {r.value}
            </span>
            <span
              style={{
                fontFamily: H.mono,
                fontSize: 10.5,
                color: H.inkDim,
                letterSpacing: '0.16em',
                textTransform: 'uppercase'
              }}
            >
              {r.note}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const HarnessComponentVariant = ({ slide }) => {
  const { diagram = 'orbit', diagramData, panel } = slide;
  const Diagram =
    diagram === 'flow' ? FlowDiagram :
    diagram === 'bar' ? BarDiagram :
    OrbitDiagram;
  const Panel =
    panel?.kind === 'code' ? CodePanel :
    panel?.kind === 'list' ? ListPanel :
    null;

  return (
    <Shell>
      <div className="absolute top-12 left-16">
        <SectionMarker>{slide.marker || '§ COMPONENT'}</SectionMarker>
      </div>
      <div className={`flex-1 flex flex-col justify-center ${SHELL_PAD_X} ${BOTTOM_SAFE}`}>
        <div className="max-w-6xl">
          {slide.eyebrow && <Eyebrow delay={0.2}>{slide.eyebrow}</Eyebrow>}
          <EditorialHeadline parts={slide.parts || []} delay={0.3} maxFontSize={68} />
          {slide.subhead && <Subhead delay={0.7}>{slide.subhead}</Subhead>}
          <div
            className="mt-10 grid gap-10"
            style={{ gridTemplateColumns: panel ? '1.1fr 1fr' : '1fr' }}
          >
            <div>
              <Diagram data={diagramData} delay={1.0} />
            </div>
            {Panel && (
              <div>
                <Panel data={panel} delay={1.4} />
              </div>
            )}
          </div>
          {slide.footer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="mt-8 text-[12px] uppercase"
              style={{
                fontFamily: H.mono,
                letterSpacing: '0.18em',
                color: H.inkMuted
              }}
            >
              {slide.footer}
            </motion.div>
          )}
        </div>
      </div>
    </Shell>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Variant: harness-manifesto
// Single-line editorial declaration; closes a section.
// ───────────────────────────────────────────────────────────────────────────

const HarnessManifestoVariant = ({ slide }) => (
  <Shell>
    <div className="absolute top-12 left-16">
      <SectionMarker>{slide.marker || '§'}</SectionMarker>
    </div>
    <div className={`flex-1 flex flex-col justify-center ${SHELL_PAD_X} ${BOTTOM_SAFE}`}>
      <div className="max-w-5xl">
        <EditorialHeadline parts={slide.parts || []} delay={0.3} maxFontSize={104} />
        {slide.subhead && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 origin-left"
            style={{
              height: 1,
              backgroundColor: H.ruleStrong,
              width: 280
            }}
          />
        )}
        {slide.subhead && <Subhead delay={0.9}>{slide.subhead}</Subhead>}
      </div>
    </div>
  </Shell>
);

// ───────────────────────────────────────────────────────────────────────────
// Exports
// ───────────────────────────────────────────────────────────────────────────

export const harnessVariantMap = {
  'harness-question': HarnessQuestionVariant,
  'harness-anatomy': HarnessAnatomyVariant,
  'harness-vs-model': HarnessVsModelVariant,
  'harness-vendors': HarnessVendorsVariant,
  'harness-manifesto': HarnessManifestoVariant
};

export default harnessVariantMap;
