"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SURVEY_URL } from "../../_data/content";

/**
 * K8 Tree hero — wordware-style centered composition.
 * Central animated TREE grows from the bottom (trunk → branches → leaves),
 * then gently sways. Below: editorial headline "Energy Intelligence."
 * + rolling live counter (MWh saved — ticks up every 5s to feel alive).
 */
export function TreeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center pt-[140px] pb-20 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[1100px] h-[1100px] opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle at center 65%, oklch(0.72 0.19 145) 0%, transparent 55%)",
          filter: "blur(60px)",
        }}
      />

      <GrowingTree reduced={!!reduced} />

      <div className="k8-container relative w-full max-w-[1100px] flex flex-col items-center mt-8 lg:mt-10">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="k8-mono text-[11px] tracking-[0.18em] uppercase mb-8 flex items-center gap-2"
          style={{ color: "var(--k8-accent)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-[6px] w-[6px] rounded-full"
            style={{ background: "var(--k8-accent)" }}
          />
          GS Energia · Kraków · od 2008
        </motion.p>

        {/* Main headline — two lines, serif display */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
          className="k8-display text-[clamp(2.75rem,1.5rem+4.5vw,6.5rem)] leading-[1] tracking-[-0.035em] max-w-[18ch]"
        >
          <span className="italic" style={{ color: "var(--k8-accent)" }}>
            Energy Intelligence.
          </span>
          <br />
          Budujemy tanią energię.
        </motion.h1>

        {/* Live counter */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.1 }}
          className="mt-12"
        >
          <LiveCounter reduced={!!reduced} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href={SURVEY_URL}
            className="group inline-flex items-center gap-3 h-[56px] px-8 rounded-full text-[15px] font-medium transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--k8-bg)]"
            style={{
              background: "var(--k8-accent)",
              color: "var(--k8-bg)",
              // @ts-expect-error CSS var
              "--tw-ring-color": "var(--k8-accent)",
            }}
          >
            Bezpłatna wycena w 48 h
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#uslugi"
            className="group inline-flex items-center h-[48px] px-3 -mx-3 text-[15px] font-medium text-[color:var(--k8-ink-muted)] hover:text-[color:var(--k8-ink)] transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--k8-accent)]"
          >
            Zobacz co robimy
            <span aria-hidden="true" className="inline-block ml-2 transition-transform group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- LIVE COUNTER (rolling, feels alive) ---------- */

function LiveCounter({ reduced }: { reduced: boolean }) {
  // Starts at 2,487,920 MWh. Increments by 1-3 every 5s to simulate live data.
  const [value, setValue] = useState(2_487_920);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setValue((v) => v + 1 + Math.floor(Math.random() * 3)),
      5000,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="inline-flex flex-col items-center gap-2 px-8 py-5 rounded-2xl border" style={{
      background: "oklch(0.13 0.008 145 / 0.6)",
      borderColor: "var(--k8-line-strong)",
      backdropFilter: "blur(8px)",
    }}>
      <p className="k8-mono text-[10px] tracking-[0.18em] uppercase flex items-center gap-2" style={{ color: "var(--k8-accent)" }}>
        <span
          aria-hidden="true"
          className="inline-block h-[6px] w-[6px] rounded-full"
          style={{
            background: "var(--k8-accent)",
            animation: reduced ? "none" : "k8-pulse 2s ease-in-out infinite",
          }}
        />
        LIVE · MWh zaoszczędzonych u naszych klientów
      </p>
      <p
        className="k8-display text-[clamp(2rem,1.5rem+2vw,3.5rem)] tabular-nums tracking-[-0.02em]"
        style={{ color: "var(--k8-ink)" }}
      >
        {value.toLocaleString("pl-PL")}{" "}
        <span className="k8-mono text-[14px] lg:text-[18px]" style={{ color: "var(--k8-ink-faint)" }}>MWh</span>
      </p>

      <style jsx>{`
        @keyframes k8-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

/* ---------- GROWING TREE SVG ---------- */

function GrowingTree({ reduced }: { reduced: boolean }) {
  // Tree grows from bottom. Trunk (vertical line), then symmetric branching fractal.
  // After draw-in, tree sways very subtly.
  const leafPositions = [
    // [x, y, size, delay]
    [-120, -180, 7, 2.0],
    [120, -180, 7, 2.1],
    [-60, -220, 6, 2.2],
    [60, -220, 6, 2.25],
    [0, -260, 8, 2.3],
    [-180, -120, 5, 1.9],
    [180, -120, 5, 1.95],
    [-40, -140, 4, 2.4],
    [40, -140, 4, 2.42],
    [-90, -100, 4, 2.45],
    [90, -100, 4, 2.47],
    [-150, -80, 4, 2.0],
    [150, -80, 4, 2.02],
    [-30, -80, 3, 2.5],
    [30, -80, 3, 2.52],
  ] as const;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[35%] left-1/2 -translate-x-1/2 w-[min(90vw,560px)] h-[min(90vw,560px)]"
    >
      <motion.svg
        viewBox="-250 -300 500 400"
        className="w-full h-full"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          color: "var(--k8-accent)",
          animation: reduced ? "none" : "k8-tree-sway 8s ease-in-out infinite",
          transformOrigin: "50% 100%",
        }}
      >
        {/* Ground line (subtle horizon) */}
        <motion.line
          x1="-240"
          y1="0"
          x2="240"
          y2="0"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 5"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* TRUNK — straight line from ground up */}
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="-180"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* MAIN BRANCHES — from trunk at ~-80 and -140 */}
        {/* Lower left branch */}
        <motion.line
          x1="0"
          y1="-80"
          x2="-140"
          y2="-100"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Lower right branch */}
        <motion.line
          x1="0"
          y1="-80"
          x2="140"
          y2="-100"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Middle left */}
        <motion.line
          x1="0"
          y1="-130"
          x2="-180"
          y2="-130"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Middle right */}
        <motion.line
          x1="0"
          y1="-130"
          x2="180"
          y2="-130"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.9, delay: 1.22, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Upper left */}
        <motion.line
          x1="0"
          y1="-170"
          x2="-110"
          y2="-200"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Upper right */}
        <motion.line
          x1="0"
          y1="-170"
          x2="110"
          y2="-200"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.42, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Top apex */}
        <motion.line
          x1="0"
          y1="-180"
          x2="0"
          y2="-240"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* SUB-BRANCHES — fractal splits */}
        {[
          { x1: -140, y1: -100, x2: -200, y2: -150 },
          { x1: -140, y1: -100, x2: -160, y2: -60 },
          { x1: 140, y1: -100, x2: 200, y2: -150 },
          { x1: 140, y1: -100, x2: 160, y2: -60 },
          { x1: -180, y1: -130, x2: -220, y2: -170 },
          { x1: 180, y1: -130, x2: 220, y2: -170 },
          { x1: -110, y1: -200, x2: -80, y2: -240 },
          { x1: 110, y1: -200, x2: 80, y2: -240 },
        ].map((b, i) => (
          <motion.line
            key={`sub-${i}`}
            x1={b.x1}
            y1={b.y1}
            x2={b.x2}
            y2={b.y2}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 0.7, delay: 1.7 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* LEAVES — small circles at branch tips */}
        {leafPositions.map(([x, y, size, delay], i) => (
          <motion.circle
            key={`leaf-${i}`}
            cx={x as number}
            cy={y as number}
            r={size as number}
            fill="currentColor"
            initial={reduced ? undefined : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: delay as number,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformOrigin: `${x}px ${y}px`,
              filter: "drop-shadow(0 0 4px currentColor)",
            }}
          />
        ))}

        {/* Roots — small dashes at base (optional) */}
        {[-1, 1].map((dir, i) => (
          <motion.line
            key={`root-${i}`}
            x1="0"
            y1="0"
            x2={40 * dir}
            y2={10}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
          />
        ))}
      </motion.svg>

      <style jsx>{`
        @keyframes k8-tree-sway {
          0%, 100% { transform: rotate(-0.5deg); }
          50% { transform: rotate(0.5deg); }
        }
      `}</style>
    </div>
  );
}
