"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";

/**
 * K10 Zero proof — light mode case study.
 * Clean white card with green accent strip. No dark section.
 * SEO: H2, structured data references, numbers.
 */
export function ZeroProof() {
  const reduced = useReducedMotion();
  const { proof } = SHARED;

  return (
    <section
      id="realizacje"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--k10-surface)" }}
    >
      <div className="k10-container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="k10-label mb-4">// Realizacja</p>
          <h2
            className="text-[clamp(2rem,1.25rem+2.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.025em]"
            style={{ color: "var(--k10-ink)" }}
          >
            {proof.caseId}:{" "}
            <span style={{ color: "var(--k10-accent)" }}>{proof.delta}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-14 items-start"
        >
          {/* Left — big number + description */}
          <div>
            <p
              className="text-[clamp(5rem,3rem+8vw,10rem)] font-bold leading-[0.9] tracking-[-0.04em]"
              style={{ color: "var(--k10-accent)" }}
            >
              {proof.delta}
            </p>
            <p className="mt-4 text-[14px] font-medium uppercase tracking-[0.1em]" style={{ color: "var(--k10-ink-faint)" }}>
              Redukcja zużycia energii rok do roku
            </p>
            <p className="mt-6 text-[16px] leading-[1.55] max-w-[50ch]" style={{ color: "var(--k10-ink-muted)" }}>
              Zakład produkcji spożywczej w Małopolsce. Kompleksowy audyt energetyczny
              obejmujący sprężone powietrze, chłód procesowy i HVAC. Wdrożenie
              3 kluczowych rekomendacji w ciągu 18 miesięcy.
            </p>
          </div>

          {/* Right — stats card */}
          <div
            className="p-7 lg:p-9 rounded-xl"
            style={{
              background: "var(--k10-bg)",
              border: "1px solid var(--k10-line)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}
          >
            <p className="k10-mono text-[11px] uppercase tracking-[0.15em] mb-6" style={{ color: "var(--k10-accent)" }}>
              {proof.caseId}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6 pb-6" style={{ borderBottom: "1px solid var(--k10-line)" }}>
              <div>
                <p className="text-[12px] uppercase tracking-[0.08em] mb-1" style={{ color: "var(--k10-ink-faint)" }}>
                  {proof.before.label}
                </p>
                <p className="text-[28px] font-bold tracking-[-0.02em]" style={{ color: "var(--k10-ink-muted)" }}>
                  {proof.before.value} <span className="text-[14px] font-normal">{proof.before.unit}</span>
                </p>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.08em] mb-1" style={{ color: "var(--k10-ink-faint)" }}>
                  {proof.after.label}
                </p>
                <p className="text-[28px] font-bold tracking-[-0.02em]" style={{ color: "var(--k10-accent)" }}>
                  {proof.after.value} <span className="text-[14px] font-normal">{proof.after.unit}</span>
                </p>
              </div>
            </div>

            <dl className="space-y-3 text-[14px]">
              {[
                ["ROI", proof.roi],
                ["Redukcja CO₂", proof.co2],
                ["Dodatkowe", proof.certificates],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt style={{ color: "var(--k10-ink-muted)" }}>{k}</dt>
                  <dd className="font-medium" style={{ color: "var(--k10-ink)" }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
