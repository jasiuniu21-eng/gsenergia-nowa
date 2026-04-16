"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SURVEY_URL } from "../../_data/content";

const CYCLE = [
  "redukuje rachunek",
  "spala mniej CO₂",
  "zwraca się w 2 lata",
  "pracuje za Ciebie",
  "kosztuje mniej",
] as const;

export function StudioHero() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((x) => (x + 1) % CYCLE.length), 2800);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative min-h-[92vh] flex items-center pt-[120px] pb-20 lg:pt-[140px] overflow-hidden">
      {/* Subtle centered glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.10]"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.19 140) 0%, transparent 60%)",
        }}
      />

      <div className="k6-container relative w-full">
        {/* Headline — single focus, no eyebrow, generous whitespace */}
        <h1 className="k6-display text-[clamp(3.25rem,2rem+6vw,9rem)] leading-[0.95] tracking-[-0.035em] max-w-[16ch]">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[color:var(--k6-ink)]"
          >
            Audyt, który
          </motion.span>

          <span className="relative block h-[1.05em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={i}
                initial={reduced ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? undefined : { opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="italic absolute left-0 top-0"
                style={{ color: "var(--k6-accent)" }}
              >
                {CYCLE[i]}.
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Subheadline — short, single line on desktop */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-12 max-w-[48ch] text-[18px] lg:text-[19px] leading-[1.55] text-[color:var(--k6-ink-muted)]"
        >
          Od 2008 r. — 400+ audytów w przemyśle, pomiary klasy A,
          raport z&nbsp;obliczonym ROI dla każdej rekomendacji.
        </motion.p>

        {/* Single primary CTA, secondary is a text link */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 flex flex-wrap gap-8 items-center"
        >
          <a
            href={SURVEY_URL}
            className="group inline-flex items-center gap-3 h-[56px] px-8 rounded-full text-[15px] font-medium transition-transform hover:scale-[1.03]"
            style={{
              background: "var(--k6-accent)",
              color: "var(--k6-bg)",
            }}
          >
            Bezpłatna wycena w 48 h
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#realizacje"
            className="group text-[15px] font-medium text-[color:var(--k6-ink-muted)] hover:text-[color:var(--k6-ink)] transition-colors"
          >
            Zobacz realizacje
            <span aria-hidden="true" className="inline-block ml-2 transition-transform group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
