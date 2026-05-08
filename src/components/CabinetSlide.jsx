import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import harnessVariantMap from './HarnessDefinitionVariants';

/**
 * CabinetSlide — self-contained editorial design system for the
 * citizen sub-presentation. Visual-first; text-light.
 *
 * Architecture:
 *   - Shell: consistent header bar, dark backdrop, bottom safe-zone for slide controls
 *   - Variants: title, manifesto, quote, list, versus, stats, analogy, roles, hero-visual
 *   - Visuals: SVG concept-illustration library, dispatched by slide.visual key
 *   - Portrait: stylized duotone portrait or initials-in-circle fallback
 */

// ───────────────────────────────────────────────────────────────────────────
// Design tokens
// ───────────────────────────────────────────────────────────────────────────

const T = {
  bg: '#0B1626',
  bgFrom: '#0B1626',
  bgTo: '#142136',
  ink: '#F5F1EA',
  inkMuted: 'rgba(245,241,234,0.62)',
  inkDim: 'rgba(245,241,234,0.38)',
  rule: 'rgba(245,241,234,0.10)',
  ruleStrong: 'rgba(245,241,234,0.22)',
  accent: '#F3D54E',
  accentBright: '#FFCD00',
  coral: '#F4A088',
  coralDeep: '#E07B5A',
  pacific: '#5BB4D4',
  serif: "'Fraunces','Charter','Iowan Old Style',Georgia,serif",
  sans: "'Inter','Helvetica Neue',system-ui,-apple-system,sans-serif",
  mono: "'JetBrains Mono','SF Mono',Menlo,monospace"
};

// Bottom safe zone — slide-control chrome from the parent Presentation overlays here.
// Reserve enough vertical room so content never collides with the 1/14 pill or arrows.
const BOTTOM_SAFE = 'pb-32';
const SHELL_PAD_X = 'px-14';

// ───────────────────────────────────────────────────────────────────────────
// Stylized Portrait — accepts image OR initials, applies duotone editorial treatment
// ───────────────────────────────────────────────────────────────────────────

const initialsFor = (name = '') => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(p => p[0]?.toUpperCase() || '')
  .join('');

const Portrait = ({ name, image, role, org, accent = T.accent, size = 120 }) => {
  const initials = initialsFor(name);
  return (
    <div className="flex items-center gap-5">
      <div
        className="relative flex items-center justify-center flex-shrink-0 rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          background: image
            ? T.bg
            : `linear-gradient(135deg, ${accent}26 0%, ${T.coralDeep}26 100%)`,
          border: `1.5px solid ${accent}`,
          boxShadow: `0 0 0 4px ${T.bg}, 0 0 0 5px ${accent}33`
        }}
      >
        {image ? (
          <>
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'grayscale(100%) contrast(1.05) brightness(0.95)',
                mixBlendMode: 'luminosity'
              }}
            />
            {/* duotone tint */}
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{ background: `linear-gradient(135deg, ${accent}88, ${T.coralDeep}aa)` }}
            />
            <div
              className="absolute inset-0 mix-blend-screen"
              style={{ background: `linear-gradient(135deg, ${T.bg}cc, transparent 60%)` }}
            />
          </>
        ) : (
          <div
            style={{
              fontFamily: T.serif,
              fontSize: size * 0.42,
              fontWeight: 500,
              color: accent,
              letterSpacing: '-0.02em'
            }}
          >
            {initials}
          </div>
        )}
      </div>
      <div>
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 22,
            fontWeight: 500,
            color: T.ink,
            lineHeight: 1.15,
            letterSpacing: '-0.01em'
          }}
        >
          {name}
        </div>
        {role && (
          <div className="mt-0.5 text-[12px] uppercase tracking-[0.2em]" style={{ color: T.inkMuted }}>
            {role}
          </div>
        )}
        {org && (
          <div className="mt-0.5 text-[12px] uppercase tracking-[0.2em]" style={{ color: T.inkDim }}>
            {org}
          </div>
        )}
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// SVG Concept Visual Library — dispatched by slide.visual
// ───────────────────────────────────────────────────────────────────────────

const VisualKitToShelf = () => (
  <svg viewBox="0 0 900 320" className="w-full" style={{ maxHeight: 320 }}>
    <defs>
      <linearGradient id="boardGrad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#1d3a5f" />
        <stop offset="1" stopColor="#0f2742" />
      </linearGradient>
    </defs>

    {/* LEFT: messy kit / circuit board */}
    <g transform="translate(80,40)">
      <rect x="0" y="0" width="280" height="200" rx="6" fill="url(#boardGrad)" stroke={T.coral} strokeWidth="1.4" />
      {/* traces */}
      <g stroke={T.coral} strokeOpacity="0.5" strokeWidth="1.4" fill="none">
        <path d="M 30 30 L 30 90 L 110 90 L 110 60 L 200 60" />
        <path d="M 50 110 L 90 110 L 90 160 L 220 160" />
        <path d="M 240 30 L 240 110 L 180 110" />
        <path d="M 30 180 L 70 180" />
      </g>
      {/* IC chips */}
      <rect x="120" y="40" width="60" height="40" rx="2" fill={T.bg} stroke={T.coral} strokeWidth="1.2" />
      <rect x="100" y="120" width="80" height="30" rx="2" fill={T.bg} stroke={T.coral} strokeWidth="1.2" />
      {/* capacitors */}
      <circle cx="40" cy="40" r="6" fill={T.bg} stroke={T.coral} strokeWidth="1.2" />
      <circle cx="220" cy="40" r="6" fill={T.bg} stroke={T.coral} strokeWidth="1.2" />
      <circle cx="220" cy="180" r="6" fill={T.bg} stroke={T.coral} strokeWidth="1.2" />
      <circle cx="40" cy="180" r="6" fill={T.bg} stroke={T.coral} strokeWidth="1.2" />
      {/* loose wires hanging off */}
      <path d="M 0 100 L -40 80" stroke={T.coralDeep} strokeWidth="2" fill="none" />
      <path d="M 280 100 L 320 80 L 360 100" stroke={T.coralDeep} strokeWidth="2" fill="none" />
      <path d="M 0 180 L -30 200" stroke={T.coralDeep} strokeWidth="2" fill="none" />
      {/* solder iron */}
      <g transform="translate(220,220)">
        <rect x="0" y="0" width="40" height="10" rx="2" fill={T.inkMuted} />
        <rect x="-25" y="2" width="25" height="6" fill={T.coralDeep} />
      </g>
      <text x="140" y="280" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase' }} fill={T.inkMuted}>
        Assembly required
      </text>
    </g>

    {/* arrow */}
    <g transform="translate(420,140)">
      <line x1="0" y1="0" x2="60" y2="0" stroke={T.accent} strokeWidth="2" />
      <path d="M 60 0 L 50 -7 M 60 0 L 50 7" stroke={T.accent} strokeWidth="2" fill="none" />
    </g>

    {/* RIGHT: clean off-the-shelf desktop */}
    <g transform="translate(530,40)">
      {/* monitor */}
      <rect x="40" y="20" width="220" height="140" rx="6" fill={T.bg} stroke={T.accent} strokeWidth="1.5" />
      <rect x="50" y="30" width="200" height="120" rx="3" fill={`${T.accent}10`} />
      {/* screen marks */}
      <line x1="70" y1="50" x2="200" y2="50" stroke={T.accent} strokeOpacity="0.6" strokeWidth="2" />
      <line x1="70" y1="70" x2="160" y2="70" stroke={T.accent} strokeOpacity="0.4" strokeWidth="2" />
      <line x1="70" y1="90" x2="180" y2="90" stroke={T.accent} strokeOpacity="0.4" strokeWidth="2" />
      <line x1="70" y1="110" x2="140" y2="110" stroke={T.accent} strokeOpacity="0.4" strokeWidth="2" />
      {/* stand */}
      <rect x="140" y="160" width="20" height="28" fill={T.inkMuted} />
      <rect x="100" y="186" width="100" height="6" rx="2" fill={T.inkMuted} />
      {/* keyboard */}
      <rect x="60" y="206" width="180" height="20" rx="3" fill={T.bg} stroke={T.accent} strokeOpacity="0.6" strokeWidth="1" />
      <text x="150" y="280" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase' }} fill={T.accent}>
        Plug & play
      </text>
    </g>
  </svg>
);

const VisualDeskDuo = () => (
  <svg viewBox="0 0 900 320" className="w-full" style={{ maxHeight: 320 }}>
    {/* LEFT: empty desk silhouette, faded */}
    <g transform="translate(80,40)" opacity="0.4">
      <rect x="40" y="180" width="280" height="10" fill={T.inkMuted} />
      <rect x="60" y="190" width="10" height="60" fill={T.inkMuted} />
      <rect x="290" y="190" width="10" height="60" fill={T.inkMuted} />
      {/* empty chair */}
      <g transform="translate(140,80)">
        <rect x="0" y="0" width="80" height="100" rx="4" fill="none" stroke={T.inkDim} strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="40" y1="100" x2="40" y2="160" stroke={T.inkDim} strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="20" y1="160" x2="60" y2="160" stroke={T.inkDim} strokeWidth="1.5" strokeDasharray="4 4" />
      </g>
      <text x="180" y="290" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase' }} fill={T.inkDim}>
        Brilliant. Stranded.
      </text>
    </g>

    {/* arrow */}
    <g transform="translate(420,150)">
      <line x1="0" y1="0" x2="60" y2="0" stroke={T.accent} strokeWidth="2" />
      <path d="M 60 0 L 50 -7 M 60 0 L 50 7" stroke={T.accent} strokeWidth="2" fill="none" />
    </g>

    {/* RIGHT: furnished desk with monitor, papers, plant, person */}
    <g transform="translate(530,40)">
      <rect x="40" y="180" width="280" height="10" fill={T.accent} />
      <rect x="60" y="190" width="10" height="60" fill={T.accent} opacity="0.7" />
      <rect x="290" y="190" width="10" height="60" fill={T.accent} opacity="0.7" />
      {/* monitor */}
      <rect x="170" y="80" width="100" height="70" rx="3" fill={T.bg} stroke={T.accent} strokeWidth="1.5" />
      <rect x="210" y="150" width="20" height="20" fill={T.bg} stroke={T.accent} strokeWidth="1" />
      {/* papers */}
      <rect x="80" y="160" width="50" height="20" fill={T.bg} stroke={T.accent} strokeWidth="1" />
      <rect x="90" y="155" width="50" height="20" fill={T.bg} stroke={T.accent} strokeWidth="1" />
      {/* mug */}
      <ellipse cx="60" cy="170" rx="14" ry="6" fill={T.coral} />
      <rect x="46" y="155" width="28" height="20" fill={T.coral} />
      {/* plant */}
      <rect x="285" y="155" width="22" height="22" fill={T.coralDeep} />
      <path d="M 296 155 Q 290 130 280 130 Q 290 145 296 155 Z" fill={T.accent} />
      <path d="M 296 155 Q 302 130 312 130 Q 302 145 296 155 Z" fill={T.accent} />
      {/* person silhouette */}
      <g transform="translate(115,80)">
        <circle cx="20" cy="20" r="14" fill={T.accent} />
        <rect x="0" y="36" width="40" height="50" rx="4" fill={T.accent} opacity="0.85" />
      </g>
      <text x="180" y="290" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase' }} fill={T.accent}>
        Brilliant. Equipped.
      </text>
    </g>
  </svg>
);

const VisualFourAffordances = () => {
  const cards = [
    { label: 'Memory', sub: 'Of the work', icon: 'memory' },
    { label: 'Tools', sub: 'At hand', icon: 'tools' },
    { label: 'Sandbox', sub: 'To try things', icon: 'sandbox' },
    { label: 'Review', sub: 'With humans', icon: 'review' }
  ];
  const Icon = ({ kind, color }) => {
    if (kind === 'memory') return (
      <g stroke={color} strokeWidth="2" fill="none">
        <rect x="-22" y="-22" width="44" height="44" rx="6" />
        <line x1="-30" y1="-12" x2="-22" y2="-12" />
        <line x1="-30" y1="0" x2="-22" y2="0" />
        <line x1="-30" y1="12" x2="-22" y2="12" />
        <line x1="22" y1="-12" x2="30" y2="-12" />
        <line x1="22" y1="0" x2="30" y2="0" />
        <line x1="22" y1="12" x2="30" y2="12" />
        <circle cx="-8" cy="-8" r="3" />
        <circle cx="8" cy="-8" r="3" />
        <circle cx="-8" cy="8" r="3" />
        <circle cx="8" cy="8" r="3" />
      </g>
    );
    if (kind === 'tools') return (
      <g stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round">
        <line x1="-22" y1="-18" x2="18" y2="22" />
        <circle cx="-22" cy="-18" r="5" />
        <line x1="-18" y1="22" x2="22" y2="-18" />
        <rect x="14" y="-26" width="14" height="14" rx="2" transform="rotate(15,21,-19)" />
      </g>
    );
    if (kind === 'sandbox') return (
      <g stroke={color} strokeWidth="2" fill="none">
        <rect x="-26" y="-20" width="52" height="40" rx="4" />
        <line x1="-26" y1="-8" x2="26" y2="-8" strokeOpacity="0.5" strokeDasharray="3 3" />
        <line x1="-26" y1="4" x2="26" y2="4" strokeOpacity="0.5" strokeDasharray="3 3" />
        <line x1="-12" y1="-20" x2="-12" y2="20" strokeOpacity="0.5" strokeDasharray="3 3" />
        <line x1="12" y1="-20" x2="12" y2="20" strokeOpacity="0.5" strokeDasharray="3 3" />
        <circle cx="0" cy="0" r="6" fill={color} fillOpacity="0.2" />
      </g>
    );
    // review
    return (
      <g stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="0" cy="-2" r="22" />
        <path d="M -10 -2 L -2 8 L 12 -10" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 900 280" className="w-full" style={{ maxHeight: 280 }}>
      {cards.map((c, i) => {
        const x = 60 + i * 200;
        const colors = [T.accent, T.coral, T.pacific, T.accentBright];
        return (
          <g key={i} transform={`translate(${x + 90},120)`}>
            <circle cx="0" cy="0" r="68" fill="none" stroke={colors[i]} strokeOpacity="0.25" strokeWidth="1" />
            <circle cx="0" cy="0" r="50" fill={`${colors[i]}10`} stroke={colors[i]} strokeWidth="1.4" />
            <Icon kind={c.icon} color={colors[i]} />
            <text x="0" y="98" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500 }} fill={T.ink}>
              {c.label}
            </text>
            <text x="0" y="118" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase' }} fill={T.inkMuted}>
              {c.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const VisualPhonePRs = () => (
  <svg viewBox="0 0 900 360" className="w-full" style={{ maxHeight: 360 }}>
    <defs>
      <linearGradient id="phoneGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={T.accent} stopOpacity="0.2" />
        <stop offset="1" stopColor={T.coral} stopOpacity="0.05" />
      </linearGradient>
    </defs>
    {/* phone */}
    <g transform="translate(120,40)">
      <rect x="0" y="0" width="180" height="280" rx="22" fill={T.bg} stroke={T.accent} strokeWidth="2" />
      <rect x="10" y="14" width="160" height="252" rx="14" fill="url(#phoneGrad)" />
      <circle cx="90" cy="6" r="3" fill={T.accent} />
      {/* status bar */}
      <text x="90" y="42" textAnchor="middle" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.2em' }} fill={T.accent}>
        CLAUDE CODE
      </text>
      {/* PR list inside phone */}
      {[60,90,120,150,180,210,240].map((y, i) => (
        <g key={i}>
          <rect x="20" y={y} width="140" height="22" rx="4" fill={T.bg} stroke={T.accent} strokeWidth="1" strokeOpacity={0.3 + i*0.08} />
          <circle cx="32" cy={y + 11} r="4" fill={T.accent} />
          <line x1="44" y1={y + 8} x2="120" y2={y + 8} stroke={T.ink} strokeOpacity="0.4" strokeWidth="2" />
          <line x1="44" y1={y + 16} x2="100" y2={y + 16} stroke={T.ink} strokeOpacity="0.25" strokeWidth="2" />
        </g>
      ))}
    </g>
    {/* outflow PR cards */}
    {[
      { x: 360, y: 30, op: 0.95 }, { x: 410, y: 80, op: 0.85 }, { x: 470, y: 50, op: 0.9 },
      { x: 510, y: 130, op: 0.7 }, { x: 580, y: 90, op: 0.8 }, { x: 620, y: 180, op: 0.6 },
      { x: 690, y: 50, op: 0.7 }, { x: 740, y: 140, op: 0.55 }, { x: 800, y: 80, op: 0.5 },
      { x: 460, y: 220, op: 0.45 }, { x: 560, y: 260, op: 0.4 }, { x: 660, y: 240, op: 0.35 },
      { x: 760, y: 220, op: 0.3 }, { x: 380, y: 160, op: 0.6 }
    ].map((p, i) => (
      <g key={i} transform={`translate(${p.x},${p.y})`} opacity={p.op}>
        <rect x="0" y="0" width="60" height="24" rx="3" fill={T.bg} stroke={T.accent} strokeWidth="1" />
        <circle cx="10" cy="12" r="3" fill={T.coral} />
        <line x1="18" y1="9" x2="50" y2="9" stroke={T.ink} strokeOpacity="0.5" strokeWidth="2" />
        <line x1="18" y1="16" x2="42" y2="16" stroke={T.ink} strokeOpacity="0.3" strokeWidth="2" />
      </g>
    ))}
  </svg>
);

const VisualAnchorFlow = () => (
  <svg viewBox="0 0 900 280" className="w-full" style={{ maxHeight: 280 }}>
    {/* anchor - left */}
    <g transform="translate(180,140)">
      <circle cx="0" cy="0" r="80" fill="none" stroke={T.accent} strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="0" cy="0" r="60" fill={`${T.accent}10`} stroke={T.accent} strokeWidth="1.5" />
      {/* anchor SVG */}
      <g stroke={T.accent} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="0" cy="-30" r="8" />
        <line x1="0" y1="-22" x2="0" y2="30" />
        <line x1="-18" y1="-12" x2="18" y2="-12" />
        <path d="M -32 22 Q -32 38 0 38 Q 32 38 32 22" />
      </g>
      <text x="0" y="115" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500 }} fill={T.ink}>
        Stays
      </text>
      <text x="0" y="135" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase' }} fill={T.inkMuted}>
        Judgment · Trust · Accountability
      </text>
    </g>
    {/* flowing arrows - right */}
    <g transform="translate(540,140)">
      <circle cx="100" cy="0" r="100" fill="none" stroke={T.coral} strokeOpacity="0.18" strokeWidth="1" />
      {[-60, -30, 0, 30, 60].map((y, i) => (
        <g key={i}>
          <path d={`M -10 ${y} Q 80 ${y - 12} 180 ${y}`} stroke={T.coral} strokeWidth="2" fill="none" strokeOpacity={0.4 + i*0.1} />
          <path d={`M 180 ${y} l -8 -5 m 8 5 l -8 5`} stroke={T.coral} strokeWidth="2" fill="none" strokeOpacity={0.4 + i*0.1} strokeLinecap="round" />
        </g>
      ))}
      <text x="100" y="115" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500 }} fill={T.ink}>
        Changes
      </text>
      <text x="100" y="135" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase' }} fill={T.inkMuted}>
        Tools · Tasks · Workflows
      </text>
    </g>
  </svg>
);

const VisualPrintingPress = () => (
  <svg viewBox="0 0 900 280" className="w-full" style={{ maxHeight: 280 }}>
    {/* horizontal timeline */}
    <line x1="60" y1="160" x2="840" y2="160" stroke={T.rule} strokeWidth="1" strokeDasharray="2 6" />

    {/* 1: Quill */}
    <g transform="translate(160,140)">
      <g stroke={T.inkMuted} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -20 30 L 20 -30" />
        <path d="M -10 20 L 10 -10" strokeWidth="3" />
        <path d="M 18 -28 L 30 -32 L 24 -20 Z" fill={T.inkMuted} />
      </g>
      <text x="0" y="60" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase' }} fill={T.inkMuted}>
        Pre-1450
      </text>
      <text x="0" y="80" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 500 }} fill={T.ink}>
        Scribes
      </text>
      <text x="0" y="100" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 13, fontStyle: 'italic' }} fill={T.inkMuted}>
        10% literacy
      </text>
    </g>

    {/* arrow */}
    <g transform="translate(260,160)">
      <line x1="0" y1="0" x2="80" y2="0" stroke={T.accent} strokeWidth="1.5" />
      <path d="M 80 0 L 72 -5 M 80 0 L 72 5" stroke={T.accent} strokeWidth="1.5" fill="none" />
    </g>

    {/* 2: Printing press */}
    <g transform="translate(420,135)">
      <g stroke={T.accent} strokeWidth="2" fill="none" strokeLinecap="round">
        <rect x="-30" y="-30" width="60" height="50" />
        <line x1="-30" y1="-15" x2="30" y2="-15" />
        <rect x="-22" y="-8" width="44" height="22" fill={`${T.accent}20`} />
        <line x1="-30" y1="20" x2="30" y2="20" />
        <line x1="-25" y1="20" x2="-25" y2="40" />
        <line x1="25" y1="20" x2="25" y2="40" />
        <rect x="-32" y="40" width="64" height="6" fill={T.accent} />
      </g>
      <text x="0" y="65" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase' }} fill={T.accent}>
        1450 + 50 yrs
      </text>
      <text x="0" y="85" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 500 }} fill={T.ink}>
        Printing press
      </text>
      <text x="0" y="105" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 13, fontStyle: 'italic' }} fill={T.inkMuted}>
        Books cost 100× less
      </text>
    </g>

    {/* arrow */}
    <g transform="translate(520,160)">
      <line x1="0" y1="0" x2="80" y2="0" stroke={T.coral} strokeWidth="1.5" />
      <path d="M 80 0 L 72 -5 M 80 0 L 72 5" stroke={T.coral} strokeWidth="1.5" fill="none" />
    </g>

    {/* 3: Modern keyboard */}
    <g transform="translate(680,140)">
      <g stroke={T.coral} strokeWidth="2" fill="none">
        <rect x="-40" y="-10" width="80" height="30" rx="3" />
        {[-30, -15, 0, 15, 30].map((x, i) => (
          <React.Fragment key={i}>
            <line x1={x - 5} y1="-5" x2={x + 5} y2="-5" />
            <line x1={x - 5} y1="5" x2={x + 5} y2="5" />
          </React.Fragment>
        ))}
        <line x1="-25" y1="15" x2="25" y2="15" strokeWidth="3" />
      </g>
      <text x="0" y="55" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase' }} fill={T.coral}>
        Today
      </text>
      <text x="0" y="75" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 500 }} fill={T.ink}>
        Software
      </text>
      <text x="0" y="95" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 13, fontStyle: 'italic' }} fill={T.inkMuted}>
        Anyone can do it
      </text>
    </g>
  </svg>
);

const VisualDomainExpert = () => (
  <svg viewBox="0 0 900 280" className="w-full" style={{ maxHeight: 280 }}>
    {/* center: person silhouette */}
    <g transform="translate(450,140)">
      <circle cx="0" cy="0" r="120" fill="none" stroke={T.accent} strokeOpacity="0.15" strokeWidth="1" />
      <circle cx="0" cy="0" r="90" fill="none" stroke={T.accent} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 5" />
      {/* person */}
      <g>
        <circle cx="0" cy="-30" r="22" fill={T.accent} />
        <path d="M -30 30 Q -30 -8 0 -8 Q 30 -8 30 30 Z" fill={T.accent} />
      </g>
      {/* harness/tool icon next to head */}
      <g transform="translate(56,-44)">
        <circle r="20" fill={T.bg} stroke={T.coral} strokeWidth="2" />
        <g stroke={T.coral} strokeWidth="2" fill="none" strokeLinecap="round">
          <line x1="-7" y1="-5" x2="7" y2="9" />
          <line x1="-9" y1="-3" x2="-5" y2="-7" />
          <circle cx="-9" cy="-7" r="2" />
          <line x1="9" y1="11" x2="5" y2="7" />
        </g>
      </g>
      {/* glow lines from tool to head */}
      <line x1="46" y1="-44" x2="22" y2="-30" stroke={T.coral} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 3" />
    </g>
    {/* labels around */}
    <text x="450" y="280" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 22, fontStyle: 'italic', fontWeight: 400 }} fill={T.inkMuted}>
      Domain expert  +  harness  =  the tool that fits the work.
    </text>
  </svg>
);

const VisualQuestionMarks = () => (
  <svg viewBox="0 0 900 240" className="w-full" style={{ maxHeight: 240 }}>
    {[
      { x: 200, color: T.accent, label: 'Verifiable' },
      { x: 450, color: T.coral, label: 'Wished away' },
      { x: 700, color: T.pacific, label: 'Workflow' }
    ].map((q, i) => (
      <g key={i} transform={`translate(${q.x},120)`}>
        <text x="0" y="40" textAnchor="middle" style={{ fontFamily: T.serif, fontSize: 200, fontWeight: 500, letterSpacing: '-0.04em' }} fill={q.color} opacity="0.85">
          ?
        </text>
        <text x="0" y="100" textAnchor="middle" style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase' }} fill={T.inkMuted}>
          {q.label}
        </text>
      </g>
    ))}
  </svg>
);

const VisualThreeBoxes = () => (
  // Generic 3-step launch indicator for slide 1's three product launches
  <svg viewBox="0 0 900 220" className="w-full" style={{ maxHeight: 220 }}>
    {[
      { x: 100, label: 'Cursor SDK', sub: 'April 2026', color: T.accent },
      { x: 360, label: 'Anthropic', sub: 'Managed Agents', color: T.coral },
      { x: 620, label: 'Microsoft', sub: 'Foundry Agents', color: T.pacific }
    ].map((b, i) => (
      <g key={i} transform={`translate(${b.x},40)`}>
        <rect x="0" y="0" width="220" height="120" rx="10" fill="none" stroke={b.color} strokeWidth="1.4" />
        <rect x="0" y="0" width="220" height="6" fill={b.color} />
        <text x="20" y="48" style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 500 }} fill={T.ink}>
          {b.label}
        </text>
        <text x="20" y="76" style={{ fontFamily: T.sans, fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase' }} fill={T.inkMuted}>
          {b.sub}
        </text>
        <text x="20" y="102" style={{ fontFamily: T.mono, fontSize: 11 }} fill={b.color}>
          ▸ shipped
        </text>
      </g>
    ))}
  </svg>
);

const visualMap = {
  'kit-to-shelf': VisualKitToShelf,
  'desk-duo': VisualDeskDuo,
  'four-affordances': VisualFourAffordances,
  'phone-prs': VisualPhonePRs,
  'anchor-flow': VisualAnchorFlow,
  'printing-press': VisualPrintingPress,
  'domain-expert': VisualDomainExpert,
  'question-marks': VisualQuestionMarks,
  'three-boxes': VisualThreeBoxes
};

const Visual = ({ name }) => {
  const Component = visualMap[name];
  if (!Component) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      className="w-full"
    >
      <Component />
    </motion.div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Shell
// ───────────────────────────────────────────────────────────────────────────

const Shell = ({ children, eyebrow, accent = T.accent }) => (
  <div
    className="relative w-full h-full overflow-hidden flex flex-col"
    style={{
      background: `linear-gradient(135deg, ${T.bgFrom} 0%, ${T.bgTo} 100%)`,
      color: T.ink,
      fontFamily: T.sans
    }}
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }}
    />
    <div
      className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
      style={{ background: `radial-gradient(circle, ${accent}33 0%, transparent 60%)` }}
    />
    <div className={`relative flex items-center justify-between ${SHELL_PAD_X} pt-7 z-10`}>
      <div
        className="text-[11px] font-semibold uppercase tracking-[0.32em]"
        style={{ color: accent }}
      >
        {eyebrow || 'A Cabinet Briefing'}
      </div>
      <div
        className="text-[11px] uppercase tracking-[0.28em]"
        style={{ color: T.inkDim }}
      >
        UC San Diego · May 2026
      </div>
    </div>
    <div className={`relative mx-14 mt-3 h-px`} style={{ backgroundColor: T.rule }} />
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="relative z-10 flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  </div>
);

// ───────────────────────────────────────────────────────────────────────────
// Variants — text-light, visual-led
// ───────────────────────────────────────────────────────────────────────────

const TitleVariant = ({ slide }) => (
  <Shell eyebrow={slide.eyebrow}>
    <div className={`flex-1 flex flex-col justify-center ${SHELL_PAD_X} ${BOTTOM_SAFE}`}>
      <div className="max-w-5xl">
        {slide.kicker && (
          <div className="mb-7 text-base uppercase tracking-[0.32em] font-medium" style={{ color: T.accent }}>
            {slide.kicker}
          </div>
        )}
        <h1
          className="leading-[0.95] tracking-tight"
          style={{
            fontFamily: T.serif,
            fontSize: 'clamp(48px, 6.4vw, 108px)',
            fontWeight: 400,
            color: T.ink,
            letterSpacing: '-0.02em'
          }}
        >
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p
            className="mt-8 max-w-3xl"
            style={{
              fontFamily: T.serif,
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: T.inkMuted,
              lineHeight: 1.35
            }}
          >
            {slide.subtitle}
          </p>
        )}
        {slide.attribution && (
          <div className="mt-10 flex items-center gap-3 text-sm uppercase tracking-[0.24em]" style={{ color: T.inkDim }}>
            <span className="h-px w-12" style={{ backgroundColor: T.ruleStrong }} />
            {slide.attribution}
          </div>
        )}
      </div>
    </div>
  </Shell>
);

const ManifestoVariant = ({ slide }) => (
  <Shell eyebrow={slide.eyebrow} accent={slide.accent || T.accent}>
    <div className={`flex-1 flex flex-col justify-center ${SHELL_PAD_X} ${BOTTOM_SAFE}`}>
      <div className="max-w-6xl">
        {slide.kicker && (
          <div className="mb-7 text-sm uppercase tracking-[0.3em] font-medium" style={{ color: slide.accent || T.accent }}>
            {slide.kicker}
          </div>
        )}
        <h1
          className="leading-[0.95] tracking-tight"
          style={{
            fontFamily: T.serif,
            fontSize: 'clamp(44px, 5.6vw, 92px)',
            fontWeight: 400,
            color: T.ink,
            letterSpacing: '-0.025em'
          }}
        >
          {slide.headlineParts ? (
            slide.headlineParts.map((p, i) => (
              <span
                key={i}
                style={{
                  color: p.accent ? (slide.accent || T.accentBright) : T.ink,
                  fontStyle: p.italic ? 'italic' : 'normal',
                  fontWeight: p.weight || 400
                }}
              >
                {p.text}{i < slide.headlineParts.length - 1 ? ' ' : ''}
              </span>
            ))
          ) : (
            slide.headline
          )}
        </h1>
        {slide.subhead && (
          <p
            className="mt-8 max-w-4xl"
            style={{
              fontFamily: T.serif,
              fontSize: 'clamp(20px, 1.8vw, 26px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: T.inkMuted,
              lineHeight: 1.4
            }}
          >
            {slide.subhead}
          </p>
        )}
        {slide.attribution && (
          <div className="mt-10 flex items-center gap-4 text-sm uppercase tracking-[0.22em]" style={{ color: T.inkDim }}>
            <span className="h-px w-16" style={{ backgroundColor: T.ruleStrong }} />
            <span>{slide.attribution}</span>
          </div>
        )}
      </div>
    </div>
  </Shell>
);

const QuoteVariant = ({ slide }) => (
  <Shell eyebrow={slide.eyebrow} accent={slide.accent || T.accent}>
    <div className={`flex-1 grid grid-cols-12 gap-8 ${SHELL_PAD_X} pt-4 ${BOTTOM_SAFE}`}>
      {/* portrait column */}
      <div className="col-span-3 flex flex-col justify-center pr-4 border-r" style={{ borderColor: T.rule }}>
        {slide.portrait && (
          <Portrait
            name={slide.portrait.name}
            role={slide.portrait.role}
            org={slide.portrait.org}
            image={slide.portrait.image}
            accent={slide.accent || T.accent}
            size={132}
          />
        )}
        {slide.contextStat && (
          <div className="mt-8">
            <div
              className="leading-none mb-2"
              style={{
                fontFamily: T.serif,
                fontSize: 'clamp(56px, 6vw, 84px)',
                fontWeight: 500,
                color: slide.accent || T.accentBright,
                letterSpacing: '-0.04em'
              }}
            >
              {slide.contextStat.value}
            </div>
            <div
              className="text-[11px] uppercase tracking-[0.22em] max-w-[220px]"
              style={{ color: T.inkMuted, lineHeight: 1.4 }}
            >
              {slide.contextStat.label}
            </div>
          </div>
        )}
      </div>
      {/* quote column */}
      <div className="col-span-9 flex flex-col justify-center pl-2">
        <div
          className="leading-none mb-4 select-none"
          style={{
            fontFamily: T.serif,
            fontSize: 180,
            fontWeight: 400,
            color: slide.accent || T.accent,
            opacity: 0.5,
            height: 80
          }}
        >
          “
        </div>
        <blockquote
          className="leading-[1.1] tracking-tight"
          style={{
            fontFamily: T.serif,
            fontSize: slide.quoteSize || 'clamp(30px, 3.6vw, 56px)',
            fontWeight: 400,
            color: T.ink,
            letterSpacing: '-0.015em'
          }}
        >
          {slide.quote}
        </blockquote>
        {slide.quoteEmphasis && (
          <div
            className="mt-6"
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 1.8vw, 30px)',
              color: slide.accent || T.coral,
              fontWeight: 400
            }}
          >
            {slide.quoteEmphasis}
          </div>
        )}
      </div>
    </div>
  </Shell>
);

const ListVariant = ({ slide }) => {
  const items = slide.items || [];
  return (
    <Shell eyebrow={slide.eyebrow} accent={slide.accent || T.accent}>
      <div className={`flex-1 grid grid-cols-12 gap-8 ${SHELL_PAD_X} pt-4 ${BOTTOM_SAFE}`}>
        <div className="col-span-5 pr-4 border-r flex flex-col justify-center" style={{ borderColor: T.rule }}>
          {slide.kicker && (
            <div className="text-[11px] uppercase tracking-[0.32em] mb-4" style={{ color: T.accent }}>
              {slide.kicker}
            </div>
          )}
          <h2
            className="leading-[1.02] tracking-tight"
            style={{
              fontFamily: T.serif,
              fontSize: 'clamp(34px, 3.8vw, 60px)',
              fontWeight: 400,
              color: T.ink,
              letterSpacing: '-0.02em'
            }}
          >
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p
              className="mt-5 pr-4 max-w-md"
              style={{
                fontFamily: T.serif,
                fontStyle: 'italic',
                fontSize: 'clamp(15px, 1.3vw, 20px)',
                color: T.inkMuted,
                lineHeight: 1.4
              }}
            >
              {slide.subtitle}
            </p>
          )}
        </div>
        <div className="col-span-7 pl-4 flex flex-col justify-center">
          {slide.visual && (
            <div className="mb-6">
              <Visual name={slide.visual} />
            </div>
          )}
          <ol className="space-y-5">
            {items.map((it, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.07, duration: 0.4 }}
                className="grid grid-cols-[48px_1fr] gap-5 items-baseline"
              >
                <div
                  className="leading-none"
                  style={{
                    fontFamily: T.serif,
                    fontSize: 36,
                    fontWeight: 500,
                    color: slide.accent || T.accent,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontFamily: T.serif,
                    fontSize: 'clamp(18px, 1.7vw, 26px)',
                    fontWeight: 500,
                    color: T.ink,
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {it.heading}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Shell>
  );
};

const VersusVariant = ({ slide }) => (
  <Shell eyebrow={slide.eyebrow}>
    <div className={`flex-1 ${SHELL_PAD_X} pt-4 ${BOTTOM_SAFE} flex flex-col`}>
      <div className="max-w-4xl mb-2">
        {slide.kicker && (
          <div className="text-[11px] uppercase tracking-[0.32em] mb-3" style={{ color: T.accent }}>
            {slide.kicker}
          </div>
        )}
        <h2
          className="leading-[1.05] tracking-tight"
          style={{
            fontFamily: T.serif,
            fontSize: 'clamp(34px, 4vw, 60px)',
            fontWeight: 400,
            color: T.ink,
            letterSpacing: '-0.02em'
          }}
        >
          {slide.title}
        </h2>
      </div>
      {slide.visual && (
        <div className="mt-6 mb-2">
          <Visual name={slide.visual} />
        </div>
      )}
      {slide.bottomCallout && (
        <div
          className="mt-auto pt-4 max-w-4xl"
          style={{
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 1.4vw, 22px)',
            lineHeight: 1.5,
            color: T.inkMuted
          }}
        >
          {slide.bottomCallout}
        </div>
      )}
    </div>
  </Shell>
);

const StatsVariant = ({ slide }) => {
  const stats = slide.stats || [];
  return (
    <Shell eyebrow={slide.eyebrow}>
      <div className={`flex-1 ${SHELL_PAD_X} pt-4 ${BOTTOM_SAFE} flex flex-col`}>
        <div className="max-w-4xl">
          {slide.kicker && (
            <div className="text-[11px] uppercase tracking-[0.32em] mb-3" style={{ color: T.accent }}>
              {slide.kicker}
            </div>
          )}
          <h2
            className="leading-[1.04] tracking-tight"
            style={{
              fontFamily: T.serif,
              fontSize: 'clamp(30px, 3.2vw, 50px)',
              fontWeight: 400,
              color: T.ink,
              letterSpacing: '-0.02em'
            }}
          >
            {slide.title}
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-10 items-end">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
              className="flex flex-col"
            >
              <div className="h-px w-full mb-5" style={{ background: T.ruleStrong }} />
              <div
                className="leading-[0.85] mb-3"
                style={{
                  fontFamily: T.serif,
                  fontSize: 'clamp(64px, 8vw, 148px)',
                  fontWeight: 500,
                  color: i === 0 ? T.accentBright : i === 1 ? T.coral : T.pacific,
                  letterSpacing: '-0.04em'
                }}
              >
                {s.value}
              </div>
              <div
                className="max-w-xs"
                style={{
                  fontFamily: T.serif,
                  fontSize: 'clamp(15px, 1.3vw, 19px)',
                  fontWeight: 500,
                  color: T.ink,
                  lineHeight: 1.3
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
};

const AnalogyVariant = ({ slide }) => (
  <Shell eyebrow={slide.eyebrow}>
    <div className={`flex-1 ${SHELL_PAD_X} pt-4 ${BOTTOM_SAFE} flex flex-col`}>
      <div className="max-w-4xl mb-3">
        {slide.kicker && (
          <div className="text-[11px] uppercase tracking-[0.32em] mb-3" style={{ color: T.accent }}>
            {slide.kicker}
          </div>
        )}
        <h2
          className="leading-[1.04] tracking-tight"
          style={{
            fontFamily: T.serif,
            fontSize: 'clamp(34px, 3.8vw, 60px)',
            fontWeight: 400,
            color: T.ink,
            letterSpacing: '-0.02em'
          }}
        >
          {slide.title}
        </h2>
      </div>
      {slide.visual && (
        <div className="mt-4">
          <Visual name={slide.visual} />
        </div>
      )}
      {slide.bottomCallout && (
        <div
          className="mt-auto pt-6 max-w-4xl"
          style={{
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 'clamp(17px, 1.5vw, 24px)',
            lineHeight: 1.45,
            color: T.inkMuted
          }}
        >
          {slide.bottomCallout}
        </div>
      )}
    </div>
  </Shell>
);

// "Hero visual" — visual is the message; text is minimal label
const HeroVisualVariant = ({ slide }) => (
  <Shell eyebrow={slide.eyebrow}>
    <div className={`flex-1 ${SHELL_PAD_X} pt-4 ${BOTTOM_SAFE} flex flex-col items-center justify-center`}>
      <div className="w-full max-w-5xl">
        {slide.kicker && (
          <div className="text-[11px] uppercase tracking-[0.32em] mb-2 text-center" style={{ color: T.accent }}>
            {slide.kicker}
          </div>
        )}
        {slide.title && (
          <h2
            className="text-center mb-6 leading-[1.02] tracking-tight"
            style={{
              fontFamily: T.serif,
              fontSize: 'clamp(32px, 3.6vw, 56px)',
              fontWeight: 400,
              color: T.ink,
              letterSpacing: '-0.02em'
            }}
          >
            {slide.title}
          </h2>
        )}
        {slide.visual && <Visual name={slide.visual} />}
        {slide.afterText && (
          <p
            className="mt-6 max-w-3xl mx-auto text-center"
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(17px, 1.4vw, 22px)',
              lineHeight: 1.5,
              color: T.inkMuted
            }}
          >
            {slide.afterText}
          </p>
        )}
      </div>
    </div>
  </Shell>
);

// Roles convergence — keeps custom SVG centerpiece; tighter layout
const RolesVariant = ({ slide }) => {
  const roles = slide.roles || [];
  const N = roles.length;
  const radius = 200;
  const cx = 380;
  const cy = 250;
  return (
    <Shell eyebrow={slide.eyebrow}>
      <div className={`flex-1 grid grid-cols-12 gap-8 ${SHELL_PAD_X} pt-4 ${BOTTOM_SAFE}`}>
        <div className="col-span-5 flex flex-col justify-center pr-6 border-r" style={{ borderColor: T.rule }}>
          {slide.kicker && (
            <div className="text-[11px] uppercase tracking-[0.32em] mb-4" style={{ color: T.accent }}>
              {slide.kicker}
            </div>
          )}
          <h2
            className="leading-[1.02] tracking-tight"
            style={{
              fontFamily: T.serif,
              fontSize: 'clamp(28px, 3.2vw, 48px)',
              fontWeight: 400,
              color: T.ink,
              letterSpacing: '-0.02em'
            }}
          >
            {slide.title}
          </h2>
          {slide.portrait && (
            <div className="mt-6">
              <Portrait
                name={slide.portrait.name}
                role={slide.portrait.role}
                org={slide.portrait.org}
                image={slide.portrait.image}
                accent={T.accent}
                size={84}
              />
            </div>
          )}
          {slide.quote && (
            <blockquote
              className="mt-6 pl-5 border-l-2"
              style={{
                borderColor: T.accent,
                fontFamily: T.serif,
                fontStyle: 'italic',
                fontSize: 'clamp(15px, 1.3vw, 19px)',
                lineHeight: 1.45,
                color: T.inkMuted
              }}
            >
              {slide.quote}
            </blockquote>
          )}
        </div>
        <div className="col-span-7 relative flex items-center justify-center">
          <svg viewBox="0 0 760 500" className="w-full" style={{ maxHeight: 500 }}>
            {[radius, radius * 0.7, radius * 0.4].map((r, idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={T.rule}
                strokeWidth="1"
                strokeDasharray={idx === 2 ? '0' : '4 6'}
              />
            ))}
            <circle cx={cx} cy={cy} r={78} fill={`${T.accent}14`} stroke={T.accent} strokeWidth="1.5" />
            <text x={cx} y={cy - 6} textAnchor="middle" fill={T.accentBright} style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 600, letterSpacing: '0.04em' }}>
              EVERY
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle" fill={T.accentBright} style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 600, letterSpacing: '0.04em' }}>
              ROLE
            </text>
            <text x={cx} y={cy + 36} textAnchor="middle" fill={T.accent} style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase' }}>
              ships software
            </text>
            {roles.map((role, i) => {
              const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
              const px = cx + Math.cos(angle) * radius;
              const py = cy + Math.sin(angle) * radius;
              const ix = cx + Math.cos(angle) * (radius - 26);
              const iy = cy + Math.sin(angle) * (radius - 26);
              const ax = cx + Math.cos(angle) * 92;
              const ay = cy + Math.sin(angle) * 92;
              return (
                <g key={i}>
                  <motion.line
                    x1={ix}
                    y1={iy}
                    x2={ax}
                    y2={ay}
                    stroke={T.accent}
                    strokeOpacity="0.35"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.55 + i * 0.06, duration: 0.5 }}
                  />
                  <motion.g
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.4 }}
                  >
                    <rect
                      x={px - 84}
                      y={py - 20}
                      rx={20}
                      ry={20}
                      width={168}
                      height={40}
                      fill={T.bg}
                      stroke={role.color || T.accent}
                      strokeWidth="1.5"
                    />
                    <text x={px} y={py + 5} textAnchor="middle" fill={T.ink} style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500 }}>
                      {role.name}
                    </text>
                  </motion.g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </Shell>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Dispatcher
// ───────────────────────────────────────────────────────────────────────────

const variantMap = {
  title: TitleVariant,
  manifesto: ManifestoVariant,
  quote: QuoteVariant,
  list: ListVariant,
  versus: VersusVariant,
  stats: StatsVariant,
  analogy: AnalogyVariant,
  hero: HeroVisualVariant,
  roles: RolesVariant,
  // Editorial harness-definition variants (light cream palette, Fraunces serif).
  // Scoped to a subset of citizen slides; do not affect the rest of the deck.
  ...harnessVariantMap
};

const CabinetSlide = ({ slide }) => {
  const variant = slide.variant || 'manifesto';
  const Component = variantMap[variant] || ManifestoVariant;
  return <Component slide={slide} />;
};

export default CabinetSlide;
