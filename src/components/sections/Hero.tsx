"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroVideo } from "./HeroVideo";
import { SITE } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const STATS = [
  { num: "18", unit: "lat", label: "na rynku" },
  { num: "400+", unit: "", label: "projektów" },
  { num: "30%", unit: "", label: "śr. oszczędność" },
];

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden min-h-[100svh] flex flex-col justify-end bg-[#0c1f12]"
    >
      {/* Background video */}
      <HeroVideo />

      {/* Dark gradient overlay — bottom-to-mid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(12,31,18,0.96) 0%, rgba(12,31,18,0.72) 40%, rgba(12,31,18,0.20) 70%, transparent 100%)",
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 container-site pb-16 pt-32 md:pb-20">
        {/* Eyebrow */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeUp}
          className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-[color:var(--c-brand-400)] mb-6"
        >
          <span className="block w-7 h-px bg-[color:var(--c-brand-400)]" aria-hidden />
          Audyty i zarządzanie energią od 2008
        </motion.p>

        {/* H1 */}
        <motion.h1
          id="hero-heading"
          initial="hidden"
          animate="visible"
          custom={0.45}
          variants={fadeUp}
          className="font-display text-white leading-[1.0] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", fontWeight: 800 }}
        >
          Obniżamy koszty energii
          <br />
          <span style={{ color: "var(--c-brand-400)" }}>o 15–30%</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.6}
          variants={fadeUp}
          className="text-white/55 text-lg md:text-xl font-light leading-relaxed max-w-md mb-10"
        >
          Kompleksowe audyty energetyczne, ISO 50001 i outsourcing mediów dla przemysłu i budynków.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.72}
          variants={fadeUp}
          className="flex flex-wrap items-center gap-4 mb-16 md:mb-20"
        >
          <Link
            href={SITE.surveyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "var(--c-brand-500)",
              boxShadow: "0 4px 24px rgba(134,188,37,0.35)",
            }}
          >
            Zamów bezpłatną wycenę
          </Link>
          <Link
            href="/realizacje"
            className="text-white/50 text-sm font-medium hover:text-white/80 transition-colors flex items-center gap-1.5"
          >
            <span>→</span> Zobacz realizacje
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.88}
          variants={fadeUp}
          className="flex flex-wrap gap-8 md:gap-12 border-t border-white/10 pt-8"
        >
          {STATS.map(({ num, unit, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <p
                className="font-display text-white leading-none"
                style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 800 }}
              >
                {num}
                {unit && (
                  <span className="text-[0.45em] font-semibold ml-1 text-white/60 align-top mt-1 inline-block">
                    {unit}
                  </span>
                )}
              </p>
              <p className="text-xs text-white/35 uppercase tracking-widest font-medium">{label}</p>
            </div>
          ))}

          {/* Social proof */}
          <div className="ml-auto hidden md:flex items-center gap-2 self-center">
            <div className="flex -space-x-2">
              {["PGE", "PKN", "SHL"].map((t) => (
                <div
                  key={t}
                  className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[8px] font-bold text-white/60"
                >
                  {t}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/35">PGE, Orlen, Shell i inni</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
