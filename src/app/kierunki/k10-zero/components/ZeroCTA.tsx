"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED, SURVEY_URL } from "../../_data/content";

export function ZeroCTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="kontakt"
      className="relative py-32 lg:py-56 border-t text-center overflow-hidden"
      style={{ borderColor: "var(--k10-line)" }}
    >
      {/* Big glow behind headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] opacity-[0.22]"
        style={{
          background:
            "radial-gradient(ellipse at center, #16A34A 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="k10-container relative">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="k10-mono text-[11px] tracking-[0.18em] mb-10 flex items-center justify-center gap-2"
          style={{ color: "var(--k10-accent)" }}
        >
          <span aria-hidden="true">//</span>
          {SHARED.ctaBanner.kicker.toUpperCase()}
        </motion.p>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="k10-display text-[clamp(2.5rem,1.5rem+3.5vw,5.5rem)] leading-[1.02] max-w-[20ch] mx-auto"
        >
          Policzmy co możesz{" "}
          <span className="italic" style={{ color: "var(--k10-accent)" }}>
            zaoszczędzić.
          </span>
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-[17px] text-[color:var(--k10-ink-muted)] max-w-[55ch] mx-auto leading-[1.55]"
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
            className="group inline-flex items-center gap-3 h-[56px] px-8 rounded-full text-[15px] font-medium transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--k10-bg)]"
            style={{
              background: "var(--k10-accent)",
              color: "var(--k10-bg)",
              // @ts-expect-error — CSS var for ring color
              "--tw-ring-color": "var(--k10-accent)",
            }}
          >
            Napisz do nas
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <span className="text-[14px] text-[color:var(--k10-ink-faint)]">
            albo zadzwoń:
          </span>
          <a
            href={SHARED.contact.phoneHref}
            className="k10-mono text-[15px] font-medium transition-colors hover:text-[color:var(--k10-accent)]"
            style={{ color: "var(--k10-ink)" }}
          >
            {SHARED.contact.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
