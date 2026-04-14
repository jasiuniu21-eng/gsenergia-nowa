"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";
import { CountUp, staggerParent } from "../../_shared/motion";

/**
 * K3 Hero — Bento 2.0 grid. Live-dashboard feel.
 * Left: H1, subhead, CTAs.
 * Right: bento grid of 4 mini-widgets with perpetual micro-animations.
 */
export function DashboardHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative pt-[110px] lg:pt-[150px] pb-20 lg:pb-24 overflow-hidden">
      {/* Ambient gradients */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/3 size-[600px] rounded-full blur-[160px] opacity-40"
          style={{ background: "radial-gradient(closest-side, oklch(0.55 0.18 140 / 0.4), transparent)" }}
        />
        <div
          className="absolute top-1/2 -right-40 size-[500px] rounded-full blur-[140px] opacity-30"
          style={{ background: "radial-gradient(closest-side, oklch(0.55 0.16 200 / 0.35), transparent)" }}
        />
        {/* Dotted grid */}
        <svg className="absolute inset-0 size-full opacity-[0.10]">
          <defs>
            <pattern id="k3-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#k3-dots)" />
        </svg>
      </div>

      <div className="k3-container relative">
        <motion.div
          variants={staggerParent(0, 0.12)}
          initial={reduced ? undefined : "hidden"}
          animate="shown"
          className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-start"
        >
          {/* Left — intro */}
          <div>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0 } }}
              className="k3-label flex items-center gap-2"
            >
              <span className="inline-block size-1.5 rounded-full bg-[color:var(--k3-accent)]"
                style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
              />
              {SHARED.hero.kicker}
            </motion.p>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
              className="k3-display mt-6 text-[clamp(2.75rem,1.5rem+5.5vw,5.5rem)]"
            >
              Energia{" "}
              <span className="text-[color:var(--k3-accent)]">pod kontrolą.</span>
              <br />
              Rachunek{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[color:var(--k3-accent)]">realnie</span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-[0.12em] h-[0.16em]"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--k3-accent), transparent)",
                    opacity: 0.35,
                  }}
                />
              </span>{" "}
              spada.
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
              className="mt-8 max-w-[56ch] text-[17px] leading-[1.6] text-[color:var(--k3-ink-muted)]"
            >
              {SHARED.hero.subheadline}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href={SURVEY_URL}
                className="group inline-flex items-center gap-3 px-6 h-[54px] rounded-full bg-[color:var(--k3-accent)] text-[color:var(--k3-bg)] text-[14.5px] font-semibold hover:brightness-110 transition-all"
              >
                {SHARED.hero.ctaPrimary.label}
                <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
              <a
                href={SHARED.hero.ctaSecondary.href}
                className="inline-flex items-center gap-3 px-6 h-[54px] rounded-full border border-[color:var(--k3-line-strong)] text-[color:var(--k3-ink)] text-[14.5px] hover:bg-[color:var(--k3-surface)] transition-colors"
              >
                {SHARED.hero.ctaSecondary.label}
                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>

            <motion.ul
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
              className="mt-10 flex flex-wrap gap-x-5 gap-y-2 k3-label"
            >
              {SHARED.hero.trust.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span className="text-[color:var(--k3-accent)]" aria-hidden="true">✓</span>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — Bento 2.0 grid */}
          <BentoGrid />
        </motion.div>
      </div>
    </section>
  );
}

function BentoGrid() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={staggerParent(0.2, 0.1)}
      initial={reduced ? undefined : "hidden"}
      animate="shown"
      className="grid grid-cols-6 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-3 min-h-[520px] lg:min-h-[600px]"
    >
      {/* Big primary: live savings */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }}
        className="col-span-6 md:col-span-4 row-span-1 k3-card relative p-6 overflow-hidden k3-scanline"
      >
        <div className="flex items-center justify-between">
          <span className="k3-label">Real-time savings · PL-087</span>
          <span className="flex items-center gap-1.5 k3-mono text-[11px] text-[color:var(--k3-accent)]">
            <span
              className="inline-block size-[6px] rounded-full bg-[color:var(--k3-accent)]"
              style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
              aria-hidden="true"
            />
            live
          </span>
        </div>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="k3-display text-[clamp(2.5rem,1rem+3vw,3.5rem)] text-[color:var(--k3-accent)]">
            <CountUp to={26.8} duration={2} format={(n) => n.toFixed(1)} />%
          </span>
          <span className="k3-label">vs 2023 baseline</span>
        </div>
        <div className="mt-6">
          <Sparkline />
        </div>
      </motion.div>

      {/* MWh counter */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }}
        className="col-span-3 md:col-span-2 row-span-1 k3-card p-5 relative overflow-hidden"
      >
        <p className="k3-label">Zaoszczędzone, YTD</p>
        <p className="mt-4 k3-display text-[clamp(1.75rem,1rem+1.6vw,2.5rem)]">
          <CountUp to={2274} format={(n) => Math.round(n).toLocaleString("pl-PL").replace(",", " ")} />
        </p>
        <p className="k3-label mt-1">MWh</p>
        <div className="mt-4 h-[6px] rounded-full bg-[color:var(--k3-surface-2)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "68%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-[color:var(--k3-accent)]"
          />
        </div>
      </motion.div>

      {/* Gauge */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }}
        className="col-span-3 md:col-span-2 row-span-1 k3-card p-5 relative"
      >
        <p className="k3-label">ROI · case 087</p>
        <Gauge value={0.78} />
      </motion.div>

      {/* Alerts feed */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }}
        className="col-span-6 md:col-span-2 row-span-1 k3-card p-5 relative"
      >
        <div className="flex items-center justify-between">
          <p className="k3-label">Alerty · ostatnie 24h</p>
          <span className="k3-mono text-[10.5px] text-[color:var(--k3-ink-faint)]">
            3/12
          </span>
        </div>
        <ul className="mt-4 space-y-3">
          <Alert color="amber" label="Sprężone powietrze" sub="wyciek 2.4 kW @ 03:12" />
          <Alert color="green" label="Chłód procesowy" sub="optymalizacja −8.1%" />
          <Alert color="blue" label="HVAC · sektor B" sub="scheduler online" />
        </ul>
      </motion.div>

      {/* Services pulse strip */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }}
        className="col-span-6 md:col-span-4 row-span-1 k3-card p-5 relative overflow-hidden k3-shimmer"
      >
        <div className="flex items-center justify-between">
          <p className="k3-label">Media energetyczne · obecny odczyt</p>
          <span className="k3-mono text-[10.5px] text-[color:var(--k3-accent)]">stabilny</span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          <MediaCell label="EL" value="1 284" unit="kW" pulse />
          <MediaCell label="G" value="312" unit="Nm³/h" />
          <MediaCell label="H₂O" value="48" unit="m³/h" />
          <MediaCell label="SP" value="820" unit="m³/h" pulse />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -- widgets -- */

function Sparkline() {
  // Static path (no re-renders). Animated once with Framer for line-draw.
  const points = [
    [0, 40],
    [8, 34],
    [18, 38],
    [28, 28],
    [38, 32],
    [48, 22],
    [58, 26],
    [68, 16],
    [78, 20],
    [88, 10],
    [100, 14],
  ];
  const d = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 50" className="w-full h-[68px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="k3-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--k3-accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--k3-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* area fill */}
      <motion.path
        d={`${d} L 100 50 L 0 50 Z`}
        fill="url(#k3-spark)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
      {/* line */}
      <motion.path
        d={d}
        fill="none"
        stroke="var(--k3-accent)"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* last point */}
      <circle cx="100" cy="14" r="1.5" fill="var(--k3-accent)">
        <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function Gauge({ value }: { value: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <div className="mt-3 relative flex items-center justify-center">
      <svg viewBox="0 0 120 120" className="w-full max-w-[140px]">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--k3-surface-2)" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--k3-accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value) }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="k3-display text-[1.5rem]">
          <CountUp to={value * 100} format={(n) => Math.round(n).toString()} />%
        </span>
        <span className="k3-label mt-0.5">osiągnięty</span>
      </div>
    </div>
  );
}

function Alert({
  color,
  label,
  sub,
}: {
  color: "amber" | "green" | "blue";
  label: string;
  sub: string;
}) {
  const dotColor =
    color === "amber"
      ? "var(--k3-amber)"
      : color === "green"
        ? "var(--k3-accent)"
        : "var(--k3-blue)";
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-1 inline-block size-[7px] rounded-full"
        style={{
          background: dotColor,
          animation: "kierunki-dot 2.2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-[13px] font-medium truncate">{label}</p>
        <p className="k3-mono text-[10.5px] text-[color:var(--k3-ink-faint)] truncate">{sub}</p>
      </div>
    </li>
  );
}

function MediaCell({
  label,
  value,
  unit,
  pulse,
}: {
  label: string;
  value: string;
  unit: string;
  pulse?: boolean;
}) {
  return (
    <div className="border border-[color:var(--k3-line)] rounded-lg p-3 bg-[color:var(--k3-surface-2)]/40">
      <div className="flex items-center justify-between">
        <span className="k3-label">{label}</span>
        {pulse && (
          <span
            className="inline-block size-[5px] rounded-full bg-[color:var(--k3-accent)]"
            style={{ animation: "kierunki-dot 1.4s ease-in-out infinite" }}
            aria-hidden="true"
          />
        )}
      </div>
      <p className="mt-1.5 k3-mono text-[15px] text-[color:var(--k3-ink)]">{value}</p>
      <p className="k3-label text-[9.5px]">{unit}</p>
    </div>
  );
}
