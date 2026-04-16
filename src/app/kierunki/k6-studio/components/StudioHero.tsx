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
    <section className="relative pt-[160px] pb-32 lg:pt-[200px] lg:pb-40 overflow-hidden">
      {/* Subtle accent glow top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.19 140) 0%, transparent 65%)",
        }}
      />

      <div className="k6-container relative">
        {/* Eyebrow */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="k6-label mb-10 flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="inline-block h-[6px] w-[6px] rounded-full"
            style={{ background: "var(--k6-accent)" }}
          />
          Studio · Kraków · od 2008
        </motion.p>

        {/* Headline */}
        <h1 className="k6-display text-[clamp(3rem,2rem+5vw,8rem)] leading-[0.98] max-w-[18ch]">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[color:var(--k6-ink)]"
          >
            Audyt, który
          </motion.span>

          {/* Cycling word */}
          <span className="relative block h-[1.05em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={i}
                initial={reduced ? false : { opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? undefined : { opacity: 0, y: -30, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="italic absolute left-0 top-0"
                style={{ color: "var(--k6-accent)" }}
              >
                {CYCLE[i]}.
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Closing line */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="k6-serif italic text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] text-[color:var(--k6-ink-muted)] mt-6"
        >
          — bez magii, tylko liczby.
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 max-w-[55ch] text-[17px] leading-[1.55] text-[color:var(--k6-ink-muted)]"
        >
          400+ audytów w przemyśle od 2008. Pomiary klasy A, raport z
          obliczonym ROI dla każdej rekomendacji, wsparcie do wdrożenia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-4 items-center"
        >
          <a
            href={SURVEY_URL}
            className="group inline-flex items-center gap-3 h-[52px] px-7 rounded-full text-[14px] font-medium transition-all hover:scale-[1.02]"
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
            className="group inline-flex items-center gap-3 h-[52px] px-7 rounded-full border text-[14px] font-medium text-[color:var(--k6-ink)] transition-colors"
            style={{ borderColor: "var(--k6-line-strong)" }}
          >
            Zobacz realizacje
            <span aria-hidden="true" className="transition-transform group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </motion.div>

        {/* Stat bar */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 pt-6 border-t flex flex-wrap gap-x-8 gap-y-2 k6-mono text-[12px] text-[color:var(--k6-ink-muted)]"
          style={{ borderColor: "var(--k6-line)" }}
        >
          <span>
            <span className="text-[color:var(--k6-ink)] font-medium">400+</span>{" "}
            audytów
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <span className="text-[color:var(--k6-ink)] font-medium">18</span>{" "}
            lat doświadczenia
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <span style={{ color: "var(--k6-accent)" }} className="font-medium">
              −26.8%
            </span>{" "}
            średnia redukcja (case PL-087)
          </span>
        </motion.div>
      </div>
    </section>
  );
}
