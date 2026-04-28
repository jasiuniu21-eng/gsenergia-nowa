"use client";

import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";
import { EnergyFlower } from "./EnergyFlower";

const ROTATING_WORDS = [
  "się zwraca",
  "się liczy",
  "się opłaca",
  "pracuje",
  "oszczędza",
];

export function Hero() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden min-h-[100vh] flex flex-col bg-white text-[color:var(--c-ink-900)]"
    >
      <EnergyFlower />

      <div className="container-site relative z-10 mt-auto mb-auto pt-[clamp(6rem,12vw,9rem)] pb-[clamp(3rem,6vw,5rem)] text-center">
        <motion.h1
          id="hero-heading"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-balance mx-auto max-w-[18ch] leading-[1.02] tracking-[-0.03em]"
          style={{ fontSize: "var(--fs-display-xl)" }}
        >
          Energia,{" "}
          <span className="block sm:inline whitespace-nowrap">
            która{" "}
            <AnimatePresence mode="wait">
              <motion.em
                key={ROTATING_WORDS[idx]}
                initial={reduced ? false : { opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block italic font-medium"
                style={{ color: "#26890d" }}
              >
                {ROTATING_WORDS[idx]}.
              </motion.em>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-7 mx-auto max-w-[58ch] text-[color:var(--c-fg-muted)] leading-[1.55]"
          style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.35vw, 1.25rem)" }}
        >
          Audyty energetyczne, EMS, BESS i fotowoltaika dla zakładów produkcyjnych.
          Mierzymy, liczymy, redukujemy rachunek o <strong>15–30%</strong>.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={SITE.surveyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 rounded-full bg-[#26890d] text-white px-6 py-3.5 text-[0.98rem] font-medium leading-none hover:bg-[#1f6f0a] active:translate-y-[1px] transition-colors"
          >
            Zamów bezpłatną konsultację
            <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/uslugi"
            className="group inline-flex items-center gap-2 rounded-full border border-black/15 bg-white text-[color:var(--c-ink-900)] px-6 py-3.5 text-[0.98rem] leading-none hover:border-black/40 transition-colors"
          >
            Zobacz usługi
          </Link>
        </motion.div>
      </div>

      {/* Trust bar inside hero (bottom) */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-10 border-t border-black/10 bg-white/70 backdrop-blur-sm"
      >
        <ul className="container-site py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.78rem] tracking-[0.08em] uppercase font-semibold text-[color:var(--c-fg-muted)]">
          <li>400+ zakładów</li>
          <li className="opacity-30">·</li>
          <li>ISO 50001</li>
          <li className="opacity-30">·</li>
          <li>od 2008 r.</li>
          <li className="opacity-30">·</li>
          <li>Kraków · cała Polska</li>
          <li className="opacity-30">·</li>
          <li>Zgodność z ust. o efekt. energet.</li>
        </ul>
      </motion.div>
    </section>
  );
}
