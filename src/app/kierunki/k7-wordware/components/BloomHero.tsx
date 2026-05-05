"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SURVEY_URL } from "../../_data/content";

/**
 * Wordware-core hero for GS Energia.
 * Centered layout, editorial serif headline, and an animated "Energy Bloom" —
 * a radiating network of energy nodes that draws itself, then idles.
 */
export function BloomHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center pt-[120px] pb-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.19 145) 0%, transparent 55%)",
          filter: "blur(60px)",
        }}
      />

      <EnergyBloom reduced={!!reduced} />

      <div className="k7-container relative w-full max-w-[1100px] flex flex-col items-center mt-12 lg:mt-16">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="k7-mono text-[11px] tracking-[0.18em] uppercase mb-8 flex items-center gap-2"
          style={{ color: "var(--k7-accent)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-[6px] w-[6px] rounded-full"
            style={{ background: "var(--k7-accent)" }}
          />
          GS Energia · Kraków · od 2008
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="k7-display text-[clamp(3rem,2rem+5vw,7.5rem)] leading-[1.02] tracking-[-0.035em] max-w-[18ch]"
        >
          Budujemy przyszłość{" "}
          <em className="italic" style={{ color: "var(--k7-accent)" }}>
            energii przemysłu,
          </em>{" "}
          z Tobą.
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-10 max-w-[52ch] text-[17px] lg:text-[19px] leading-[1.55] text-[color:var(--k7-ink-muted)]"
        >
          Od 2008 r. mierzymy, obliczamy i doradzamy. 400+ audytów energetycznych,
          realne liczby, ROI dla każdej rekomendacji.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href={SURVEY_URL}
            className="group inline-flex items-center gap-3 h-[56px] px-8 rounded-full text-[15px] font-medium transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--k7-bg)]"
            style={{
              background: "var(--k7-accent)",
              color: "var(--k7-bg)",
              // @ts-expect-error CSS var
              "--tw-ring-color": "var(--k7-accent)",
            }}
          >
            Zaczynamy
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#uslugi"
            className="group inline-flex items-center h-[48px] px-3 -mx-3 text-[15px] font-medium text-[color:var(--k7-ink-muted)] hover:text-[color:var(--k7-ink)] transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--k7-accent)]"
          >
            Zobacz co robimy
            <span aria-hidden="true" className="inline-block ml-2 transition-transform group-hover:translate-y-1">↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function EnergyBloom({ reduced }: { reduced: boolean }) {
  const SPOKES = 7;
  const RINGS = [70, 130, 200];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(88vw,520px)] h-[min(88vw,520px)] -mt-24 lg:-mt-32"
    >
      <motion.svg
        viewBox="-250 -250 500 500"
        className="w-full h-full"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          color: "var(--k7-accent)",
          animation: reduced ? "none" : "k7-bloom-spin 60s linear infinite",
        }}
      >
        {RINGS.map((r, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx="0"
            cy="0"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="2 4"
            initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
          />
        ))}

        {Array.from({ length: SPOKES }).map((_, i) => {
          const angle = (i / SPOKES) * Math.PI * 2 - Math.PI / 2;
          const x2 = Math.cos(angle) * 220;
          const y2 = Math.sin(angle) * 220;
          return (
            <motion.line
              key={`spoke-${i}`}
              x1="0"
              y1="0"
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{
                pathLength: { duration: 1, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4, delay: 0.6 + i * 0.1 },
              }}
            />
          );
        })}

        {RINGS.map((r, ringIdx) =>
          Array.from({ length: SPOKES }).map((_, spokeIdx) => {
            const angle = (spokeIdx / SPOKES) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            const size = ringIdx === 2 ? 6 : 4;
            const delay = 1.1 + spokeIdx * 0.08 + ringIdx * 0.15;
            return (
              <motion.circle
                key={`node-${ringIdx}-${spokeIdx}`}
                cx={x}
                cy={y}
                r={size}
                fill="currentColor"
                initial={reduced ? undefined : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformOrigin: `${x}px ${y}px`,
                  filter: "drop-shadow(0 0 6px currentColor)",
                }}
              />
            );
          }),
        )}

        {Array.from({ length: SPOKES }).map((_, i) => {
          const a1 = (i / SPOKES) * Math.PI * 2 - Math.PI / 2;
          const a2 = ((i + 1) / SPOKES) * Math.PI * 2 - Math.PI / 2;
          const r = 200;
          const x1 = Math.cos(a1) * r;
          const y1 = Math.sin(a1) * r;
          const x2 = Math.cos(a2) * r;
          const y2 = Math.sin(a2) * r;
          return (
            <motion.path
              key={`arc-${i}`}
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{
                pathLength: { duration: 0.9, delay: 1.6 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4, delay: 1.6 + i * 0.09 },
              }}
            />
          );
        })}

        <motion.circle
          cx="0"
          cy="0"
          r="18"
          fill="currentColor"
          initial={reduced ? undefined : { scale: 0, opacity: 0 }}
          animate={{ scale: reduced ? 1 : [0, 1.4, 1], opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "center", filter: "drop-shadow(0 0 24px currentColor)" }}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={reduced ? undefined : { opacity: 0, scale: 1 }}
          animate={
            reduced
              ? { opacity: 0.3 }
              : {
                  opacity: [0, 0.6, 0, 0.6, 0],
                  scale: [1, 2.5, 3.5, 2.5, 1],
                }
          }
          transition={{ duration: 4, delay: 2.5, repeat: reduced ? 0 : Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>

      <style jsx>{`
        @keyframes k7-bloom-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
