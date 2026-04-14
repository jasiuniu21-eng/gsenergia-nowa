"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED, SURVEY_URL } from "../../_data/content";
import { CountUp, Magnetic, staggerParent } from "../../_shared/motion";

/**
 * K5 Hero — Industrial. Dark steel bg.
 * Full-bleed, hero with animated energy-flow SVG on the right.
 */
export function IndustrialHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative pt-[120px] lg:pt-[160px] pb-24 overflow-hidden">
      {/* Faint grid + copper glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 size-full opacity-[0.06]">
          <defs>
            <pattern id="k5-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#k5-grid)" />
        </svg>
        <div
          className="absolute -top-40 right-0 size-[700px] rounded-full blur-[180px] opacity-20"
          style={{ background: "radial-gradient(closest-side, oklch(0.75 0.14 55 / 0.5), transparent)" }}
        />
        <div
          className="absolute top-1/2 -left-40 size-[600px] rounded-full blur-[180px] opacity-20"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.18 138 / 0.45), transparent)" }}
        />
      </div>

      <div className="k5-container relative">
        {/* Top mil-tape */}
        <div className="flex items-center gap-3 k5-label pb-6 border-b border-[color:var(--k5-line)]">
          <span className="inline-block size-[7px] bg-[color:var(--k5-accent)]" aria-hidden="true" />
          <span className="text-[color:var(--k5-accent)]">SYSTEM ONLINE</span>
          <span className="mx-3 text-[color:var(--k5-ink-faint)]">//</span>
          <span>CASE PL-2024-087</span>
          <span className="mx-3 text-[color:var(--k5-ink-faint)] hidden sm:inline">//</span>
          <span className="hidden sm:inline">REV.04 · 26.4.2026</span>
        </div>

        <motion.div
          variants={staggerParent(0.1, 0.1)}
          initial={reduced ? undefined : "hidden"}
          animate="shown"
          className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center pt-16 lg:pt-24"
        >
          {/* Left */}
          <div>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0 } }}
              className="k5-label text-[color:var(--k5-accent)]"
            >
              {SHARED.hero.kicker.toUpperCase()}
            </motion.p>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
              className="k5-display mt-7 text-[clamp(2.75rem,1rem+6vw,6rem)]"
            >
              Audyt,{" "}
              <span className="text-[color:var(--k5-accent)]">po którym</span>
              <br />
              realnie{" "}
              <span className="relative inline-block">
                spada
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[color:var(--k5-accent)]"
                  style={{ boxShadow: "0 0 12px var(--k5-accent)" }}
                />
              </span>
              <br />
              rachunek.
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
              className="mt-10 max-w-[52ch] text-[16.5px] leading-[1.6] text-[color:var(--k5-ink-muted)]"
            >
              {SHARED.hero.subheadline}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Magnetic
                href={SURVEY_URL}
                strength={0.3}
                className="group inline-flex items-center gap-2.5 px-7 h-[56px] bg-[color:var(--k5-accent)] text-[color:var(--k5-bg)] k5-caps text-[13px]"
              >
                {SHARED.hero.ctaPrimary.label}
                <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Magnetic>
              <Magnetic
                href={SHARED.hero.ctaSecondary.href}
                strength={0.15}
                className="inline-flex items-center gap-2.5 px-7 h-[56px] border border-[color:var(--k5-line-strong)] text-[color:var(--k5-ink)] k5-caps text-[13px] hover:bg-[color:var(--k5-surface)] transition-colors"
              >
                {SHARED.hero.ctaSecondary.label}
                <span aria-hidden="true">↓</span>
              </Magnetic>
            </motion.div>

            <motion.ul
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
              className="mt-14 grid sm:grid-cols-3 gap-4 pt-6 border-t border-[color:var(--k5-line)]"
            >
              {[
                { v: "400+", l: "AUDYTÓW" },
                { v: "18", l: "LAT DOŚW." },
                { v: "2.4 GWh", l: "OSZCZ./ROK" },
              ].map((s) => (
                <li key={s.l} className="border-l border-[color:var(--k5-line)] pl-4 first:border-l-0 first:pl-0 sm:pl-5 sm:first:pl-0">
                  <span className="k5-label">{s.l}</span>
                  <p className="mt-2 k5-display text-[clamp(1.75rem,1rem+1.5vw,2.25rem)] text-[color:var(--k5-accent)]">
                    {s.v === "400+" ? (
                      <><CountUp to={400} format={(n) => `${Math.round(n)}+`} /></>
                    ) : s.v === "18" ? (
                      <CountUp to={18} />
                    ) : (
                      s.v
                    )}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — energy flow */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.94 }, shown: { opacity: 1, scale: 1, transition: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } } }}
            className="relative"
          >
            <EnergyFlowSVG />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Animated energy flow — nodes with particles moving along tubes. */
function EnergyFlowSVG() {
  const reduced = useReducedMotion();
  return (
    <div className="relative aspect-[1/1] lg:aspect-[4/5] k5-corners">
      <div className="absolute inset-0 border border-[color:var(--k5-line-strong)] bg-[color:var(--k5-surface)]/50 backdrop-blur-sm">
        {/* Corner labels */}
        <div className="absolute top-3 left-3 k5-label">
          <span className="text-[color:var(--k5-accent)]">ENERGY.FLOW</span>
          <span className="text-[color:var(--k5-ink-faint)]"> / 01</span>
        </div>
        <div className="absolute top-3 right-3 k5-label text-[color:var(--k5-ink-faint)]">
          scale 1:500
        </div>
        <div className="absolute bottom-3 right-3 k5-label text-[color:var(--k5-ink-faint)]">
          live · {new Date().getFullYear()}
        </div>

        <svg viewBox="0 0 400 500" className="size-full p-8" aria-hidden="true">
          <defs>
            <filter id="k5-glow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="k5-node-g">
              <stop offset="0%" stopColor="var(--k5-accent)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--k5-accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid lines */}
          {[60, 120, 180, 240, 300, 360, 420].map((y) => (
            <line
              key={y}
              x1="10"
              y1={y}
              x2="390"
              y2={y}
              stroke="var(--k5-line)"
              strokeWidth="0.5"
              strokeDasharray="2 6"
            />
          ))}

          {/* Main trunk */}
          <motion.path
            d="M 60 80 L 340 80 L 340 240 L 60 240 L 60 400 L 340 400"
            fill="none"
            stroke="var(--k5-line-strong)"
            strokeWidth="2"
            strokeLinecap="square"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Active overlay */}
          <motion.path
            d="M 60 80 L 340 80 L 340 240 L 60 240 L 60 400 L 340 400"
            fill="none"
            stroke="var(--k5-accent)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeDasharray="20 1080"
            initial={{ strokeDashoffset: 0 }}
            animate={reduced ? undefined : { strokeDashoffset: -1100 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            filter="url(#k5-glow)"
            style={{ opacity: 0.9 }}
          />

          {/* Branch down */}
          <motion.path
            d="M 200 80 L 200 180"
            fill="none"
            stroke="var(--k5-line-strong)"
            strokeWidth="2"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          />
          <motion.path
            d="M 200 260 L 200 360"
            fill="none"
            stroke="var(--k5-line-strong)"
            strokeWidth="2"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          />

          {/* Nodes */}
          {[
            { x: 60, y: 80, label: "GRID", sub: "110kV", delay: 0.4 },
            { x: 340, y: 80, label: "TRAFO", sub: "2.5 MVA", delay: 0.8 },
            { x: 340, y: 240, label: "BUS", sub: "04/C", delay: 1.2 },
            { x: 60, y: 240, label: "EMS", sub: "LIVE", delay: 1.6 },
            { x: 200, y: 220, label: "CHILLER", sub: "−42% ↓", delay: 2.2, accent: true },
            { x: 200, y: 380, label: "HVAC", sub: "−34% ↓", delay: 2.5, accent: true },
            { x: 60, y: 400, label: "PV", sub: "400 kWp", delay: 2.0, copper: true },
            { x: 340, y: 400, label: "BESS", sub: "320 kWh", delay: 2.8, copper: true },
          ].map((n) => (
            <Node key={n.label} {...n} />
          ))}
        </svg>
      </div>
    </div>
  );
}

function Node({
  x,
  y,
  label,
  sub,
  delay,
  accent,
  copper,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  delay: number;
  accent?: boolean;
  copper?: boolean;
}) {
  const color = accent
    ? "var(--k5-accent)"
    : copper
      ? "var(--k5-copper)"
      : "var(--k5-ink-muted)";
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {/* Halo */}
      <circle cx={x} cy={y} r="22" fill="url(#k5-node-g)" opacity="0.6" />
      {/* Frame */}
      <rect
        x={x - 32}
        y={y - 14}
        width="64"
        height="28"
        fill="var(--k5-bg)"
        stroke={color}
        strokeWidth="1.3"
      />
      {/* LED indicator */}
      <circle cx={x - 25} cy={y} r="2.5" fill={color}>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text
        x={x - 17}
        y={y - 1}
        fontSize="8.5"
        fontFamily="JetBrains Mono"
        fill={color}
        letterSpacing="0.1em"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x={x - 17}
        y={y + 8}
        fontSize="6.8"
        fontFamily="JetBrains Mono"
        fill={color}
        opacity="0.7"
        letterSpacing="0.08em"
      >
        {sub}
      </text>
    </motion.g>
  );
}
