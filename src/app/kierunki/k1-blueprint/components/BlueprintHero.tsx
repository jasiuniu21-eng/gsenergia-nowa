"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED, SURVEY_URL } from "../../_data/content";
import { CountUp } from "../../_shared/motion";

/**
 * K1 Hero — "engineering drawing" feel.
 * Left: document-title + H1 + 3-number metric table + CTAs.
 * Right: animated SVG blueprint of an energy plant (lines draw in).
 */
export function BlueprintHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative pt-[120px] pb-20 lg:pt-[160px] lg:pb-32 overflow-hidden">
      {/* Grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="k1-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#k1-grid)" />
        </svg>
      </div>

      <div className="k1-container relative">
        {/* Drawing-sheet titleblock (top) */}
        <div className="flex items-center justify-between k1-label pb-4 border-b border-[color:var(--k1-line)]">
          <span>Sheet 01 / 07 · Audyty Energetyczne</span>
          <span>Rev. 2026-04 · PL</span>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 pt-12 lg:pt-20">
          {/* LEFT */}
          <div className="flex flex-col">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="k1-label flex items-center gap-3"
            >
              <span
                className="inline-block h-[6px] w-[6px] bg-[color:var(--k1-accent)]"
                aria-hidden="true"
              />
              {SHARED.hero.kicker}
            </motion.p>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="k1-display mt-8 text-[clamp(2.75rem,1.5rem+5vw,5.5rem)]"
            >
              Audyt, po którym{" "}
              <span className="relative inline-block">
                <span className="relative z-10">realnie</span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 bottom-[0.08em] h-[0.12em] w-full bg-[color:var(--k1-accent)] opacity-95"
                />
              </span>
              <br />
              spada rachunek.
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-[54ch] text-[17px] leading-[1.55] text-[color:var(--k1-ink-muted)]"
            >
              {SHARED.hero.subheadline}
            </motion.p>

            {/* Metric table */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 border-t border-b border-[color:var(--k1-line-strong)]"
            >
              <div className="grid grid-cols-3 divide-x divide-[color:var(--k1-line)]">
                <Cell
                  label="Zrealizowane audyty"
                  value={<CountUp to={400} format={(n) => `${Math.round(n)}+`} />}
                />
                <Cell
                  label="Lat doświadczenia"
                  value={<CountUp to={18} />}
                />
                <Cell
                  label="Redukcja zużycia, case PL-087"
                  value={<span className="text-[color:var(--k1-accent)]">−26.8%</span>}
                />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href={SURVEY_URL}
                className="inline-flex items-center gap-3 px-6 h-[52px] bg-[color:var(--k1-ink)] text-[color:var(--k1-bg)] k1-mono text-[13px] uppercase tracking-[0.1em] hover:bg-[color:var(--k1-accent)] transition-colors"
              >
                {SHARED.hero.ctaPrimary.label}
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={SHARED.hero.ctaSecondary.href}
                className="inline-flex items-center gap-3 px-6 h-[52px] border border-[color:var(--k1-line-strong)] text-[color:var(--k1-ink)] k1-mono text-[13px] uppercase tracking-[0.1em] hover:bg-[color:var(--k1-ink)]/5 transition-colors"
              >
                {SHARED.hero.ctaSecondary.label}
                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.ul
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2 k1-label"
            >
              {SHARED.hero.trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <path
                      d="M2 5l2 2 4-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-[color:var(--k1-accent)]"
                    />
                  </svg>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — animated blueprint */}
          <div className="relative">
            <HeroBlueprintSVG />
          </div>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="p-4 lg:p-5">
      <p className="k1-label">{label}</p>
      <p className="k1-display mt-2 text-[clamp(1.5rem,0.8rem+1.8vw,2.25rem)]">
        {value}
      </p>
    </div>
  );
}

/** Animated technical blueprint — energy plant schematic. */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type DrawTransition = {
  pathLength: { duration: number; delay: number; ease: readonly [number, number, number, number] };
  opacity: { duration: number; delay: number };
};

function HeroBlueprintSVG() {
  const reduced = useReducedMotion();
  const drawTransition = (delay: number, duration = 1.2): DrawTransition => ({
    pathLength: { duration, delay, ease: EASE_OUT_EXPO },
    opacity: { duration: 0.3, delay },
  });

  return (
    <div className="relative aspect-[5/6] sm:aspect-[4/5] border border-[color:var(--k1-line-strong)] bg-[color:var(--k1-surface)]">
      {/* Titleblock corners */}
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />

      {/* Drawing number bottom-right */}
      <div className="absolute bottom-3 right-3 text-right">
        <p className="k1-label leading-tight">DWG · GSE / 087</p>
        <p className="k1-mono text-[10px] text-[color:var(--k1-ink-faint)]">
          SCALE 1:250
        </p>
      </div>

      {/* Drawing title top-left */}
      <div className="absolute top-3 left-3">
        <p className="k1-label leading-tight">Flow · Energy Audit</p>
        <p className="k1-mono text-[10px] text-[color:var(--k1-ink-faint)]">
          Case PL-2024-087 · Food production
        </p>
      </div>

      <svg
        viewBox="0 0 400 480"
        className="w-full h-full p-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Technical grid */}
        <defs>
          <pattern id="blueprint-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="400"
          height="480"
          fill="url(#blueprint-dots)"
          className="text-[color:var(--k1-line)]"
        />

        {/* Source: grid */}
        <Node x={50} y={60} label="GRID 110kV" delay={0.2} />
        {/* Transformer */}
        <Node x={200} y={60} label="TRAFO" delay={0.6} />
        {/* Main bus */}
        <Node x={350} y={60} label="MAIN BUS" delay={0.9} />

        {/* Lines from source */}
        <AnimLine d="M 90 60 L 160 60" delay={0.5} reduced={reduced} drawTransition={drawTransition} />
        <AnimLine d="M 240 60 L 310 60" delay={0.8} reduced={reduced} drawTransition={drawTransition} />

        {/* Distribution (down from bus) */}
        <AnimLine d="M 350 76 L 350 200" delay={1.1} reduced={reduced} drawTransition={drawTransition} />
        <AnimLine d="M 350 200 L 80 200" delay={1.3} reduced={reduced} drawTransition={drawTransition} />
        <AnimLine d="M 80 200 L 80 260" delay={1.5} reduced={reduced} drawTransition={drawTransition} />
        <AnimLine d="M 200 200 L 200 260" delay={1.55} reduced={reduced} drawTransition={drawTransition} />
        <AnimLine d="M 320 200 L 320 260" delay={1.6} reduced={reduced} drawTransition={drawTransition} />

        {/* Loads (consumers) */}
        <Node x={80} y={290} label="CHILLER" sub="42% SAVED" delay={1.75} accent />
        <Node x={200} y={290} label="HVAC" sub="34% SAVED" delay={1.85} accent />
        <Node x={320} y={290} label="AIR" sub="71% SAVED" delay={1.95} accent warn />

        {/* EMS node */}
        <AnimLine d="M 200 306 L 200 380" delay={2.05} reduced={reduced} drawTransition={drawTransition} />
        <Node x={200} y={410} label="EMS / LOG" delay={2.15} />

        {/* Scale marker */}
        <AnimLine d="M 40 440 L 120 440" delay={2.3} reduced={reduced} drawTransition={drawTransition} />
        <g className="text-[color:var(--k1-ink-faint)]" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="0.1em">
          <text x="40" y="455">0</text>
          <text x="113" y="455">100m</text>
        </g>
      </svg>

      {/* Live indicator */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <span
          className="inline-block h-[6px] w-[6px] rounded-full bg-[color:var(--k1-accent)]"
          style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
          aria-hidden="true"
        />
        <span className="k1-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--k1-ink-muted)]">
          Live pomiar
        </span>
      </div>
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={`absolute text-[color:var(--k1-ink)] ${className}`}
      aria-hidden="true"
    >
      <path d="M0 0 H6 M0 0 V6" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

function AnimLine({
  d,
  delay,
  reduced,
  drawTransition,
}: {
  d: string;
  delay: number;
  reduced: boolean | null;
  drawTransition: (delay: number, duration?: number) => {
    pathLength: { duration: number; delay: number; ease: readonly [number, number, number, number] };
    opacity: { duration: number; delay: number };
  };
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
      initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={drawTransition(delay)}
      className="text-[color:var(--k1-ink)]"
    />
  );
}

function Node({
  x,
  y,
  label,
  sub,
  delay,
  accent,
  warn,
}: {
  x: number;
  y: number;
  label: string;
  sub?: string;
  delay: number;
  accent?: boolean;
  warn?: boolean;
}) {
  const color = warn
    ? "var(--k1-warn)"
    : accent
      ? "var(--k1-accent)"
      : "var(--k1-ink)";
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <rect
        x={x - 40}
        y={y - 16}
        width="80"
        height="32"
        fill="var(--k1-surface)"
        stroke={color}
        strokeWidth="1.3"
      />
      <text
        x={x}
        y={y - 1}
        textAnchor="middle"
        fontSize="9"
        fontFamily="JetBrains Mono"
        fill={color}
        letterSpacing="0.1em"
        fontWeight="600"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x}
          y={y + 10}
          textAnchor="middle"
          fontSize="7.5"
          fontFamily="JetBrains Mono"
          fill={color}
          opacity="0.8"
          letterSpacing="0.08em"
        >
          {sub}
        </text>
      )}
    </motion.g>
  );
}
