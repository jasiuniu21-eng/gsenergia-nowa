"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED, SURVEY_URL } from "../../_data/content";

export function StudioCTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="kontakt"
      className="relative py-32 lg:py-48 border-t text-center overflow-hidden"
      style={{ borderColor: "var(--k6-line)" }}
    >
      {/* Glow accent bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.12]"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.19 140) 0%, transparent 60%)",
        }}
      />

      <div className="k6-container relative">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="k6-mono text-[11px] tracking-[0.2em] mb-10 flex items-center justify-center gap-2"
          style={{ color: "var(--k6-accent)" }}
        >
          <span aria-hidden="true">//</span>
          {SHARED.ctaBanner.kicker.toUpperCase()}
        </motion.p>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="k6-display text-[clamp(2.5rem,1.5rem+3.5vw,5.5rem)] leading-[1.02] max-w-[20ch] mx-auto"
        >
          Policzmy co możesz <em className="not-italic" style={{ color: "var(--k6-accent)" }}>zaoszczędzić.</em>
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-[17px] text-[color:var(--k6-ink-muted)] max-w-[55ch] mx-auto leading-[1.55]"
        >
          Pierwsza rozmowa jest darmowa. Odpowiadamy w 24 godziny z konkretnym
          zakresem, wyceną i harmonogramem.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-4"
        >
          <a
            href={SURVEY_URL}
            className="group inline-flex items-center gap-3 h-[56px] px-8 rounded-full text-[15px] font-medium transition-all hover:scale-[1.02]"
            style={{
              background: "var(--k6-accent)",
              color: "var(--k6-bg)",
            }}
          >
            Napisz do nas
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <span className="text-[14px] text-[color:var(--k6-ink-faint)]">
            albo zadzwoń:
          </span>
          <a
            href={SHARED.contact.phoneHref}
            className="k6-mono text-[15px] font-medium transition-colors hover:text-[color:var(--k6-accent)]"
            style={{ color: "var(--k6-ink)" }}
          >
            {SHARED.contact.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
