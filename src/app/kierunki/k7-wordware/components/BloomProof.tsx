"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";

export function BloomProof() {
  const reduced = useReducedMotion();
  const { proof } = SHARED;

  return (
    <section id="realizacje" className="relative py-32 lg:py-40 overflow-hidden border-t" style={{ borderColor: "var(--k7-line)" }}>
      <div className="k7-container">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="k7-mono text-[11px] tracking-[0.2em] mb-16 flex items-center gap-2"
          style={{ color: "var(--k7-accent)" }}
        >
          <span aria-hidden="true">//</span>
          CASE PL-2024-087
        </motion.p>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Giant delta */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 scale-125"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 60%, oklch(0.72 0.19 145 / 0.40), transparent 60%)",
                filter: "blur(30px)",
              }}
            />
            <p
              className="k7-display relative text-[clamp(6.5rem,4rem+12vw,20rem)] leading-[0.88] italic"
              style={{
                color: "var(--k7-accent)",
                textShadow: "0 0 80px oklch(0.72 0.19 145 / 0.5)",
                letterSpacing: "-0.04em",
              }}
            >
              {proof.delta}
            </p>
            <p className="k7-mono text-[12px] mt-4 text-[color:var(--k7-ink-faint)] uppercase tracking-[0.15em]">
              redukcja zużycia rok do roku
            </p>
          </motion.div>

          {/* Case card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 lg:p-10 rounded-sm border"
            style={{
              background: "var(--k7-bg-elevated)",
              borderColor: "var(--k7-line-strong)",
            }}
          >
            <p className="k7-mono text-[11px] tracking-[0.15em] text-[color:var(--k7-ink-faint)] uppercase">
              {proof.caseId}
            </p>
            <h3 className="k7-serif text-[28px] lg:text-[32px] mt-3 leading-tight">
              {proof.client}
            </h3>
            <p className="text-[14px] text-[color:var(--k7-ink-muted)] mt-1">
              {proof.region} · {proof.year}
            </p>

            {/* Before / After */}
            <div className="mt-8 grid grid-cols-2 gap-6 pb-6 border-b" style={{ borderColor: "var(--k7-line)" }}>
              <div>
                <p className="k7-mono text-[11px] text-[color:var(--k7-ink-faint)] uppercase tracking-[0.1em]">
                  {proof.before.label}
                </p>
                <p className="k7-display text-[26px] lg:text-[32px] mt-2 text-[color:var(--k7-ink-muted)]">
                  {proof.before.value}{" "}
                  <span className="text-[16px] text-[color:var(--k7-ink-faint)]">
                    {proof.before.unit}
                  </span>
                </p>
              </div>
              <div>
                <p className="k7-mono text-[11px] text-[color:var(--k7-ink-faint)] uppercase tracking-[0.1em]">
                  {proof.after.label}
                </p>
                <p className="k7-display text-[26px] lg:text-[32px] mt-2" style={{ color: "var(--k7-accent)" }}>
                  {proof.after.value}{" "}
                  <span className="text-[16px] text-[color:var(--k7-ink-faint)]">
                    {proof.after.unit}
                  </span>
                </p>
              </div>
            </div>

            {/* Stats */}
            <dl className="mt-6 space-y-3">
              <div className="flex justify-between text-[14px]">
                <dt className="text-[color:var(--k7-ink-muted)]">ROI</dt>
                <dd className="text-[color:var(--k7-ink)] font-medium">{proof.roi}</dd>
              </div>
              <div className="flex justify-between text-[14px]">
                <dt className="text-[color:var(--k7-ink-muted)]">Redukcja CO₂</dt>
                <dd className="text-[color:var(--k7-ink)] font-medium">{proof.co2}</dd>
              </div>
              <div className="flex justify-between text-[14px]">
                <dt className="text-[color:var(--k7-ink-muted)]">Bonus</dt>
                <dd className="text-[color:var(--k7-ink)] font-medium">{proof.certificates}</dd>
              </div>
            </dl>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 mt-8 text-[14px] font-medium transition-all hover:gap-3 focus-visible:outline-none focus-visible:underline"
              style={{ color: "var(--k7-accent)" }}
            >
              Poproś o pełne case study
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
