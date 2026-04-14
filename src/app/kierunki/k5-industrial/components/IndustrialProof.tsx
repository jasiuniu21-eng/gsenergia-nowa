"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal, CountUp } from "../../_shared/motion";

export function IndustrialProof() {
  const p = SHARED.proof;
  const reduced = useReducedMotion();

  return (
    <section id="proof" className="py-28 lg:py-36 relative border-y border-[color:var(--k5-line)]">
      <div className="k5-container relative">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 k5-section-num select-none pointer-events-none"
          style={{ opacity: 0.4 }}
        >
          02
        </div>

        <Reveal className="relative max-w-[860px]">
          <div className="flex items-center gap-3 k5-label">
            <span className="inline-block size-[6px] bg-[color:var(--k5-accent)]" />
            <span className="text-[color:var(--k5-accent)]">[02] PROOF</span>
            <span className="h-px flex-1 max-w-[120px] bg-[color:var(--k5-line)]" />
          </div>
          <h2 className="k5-display mt-8 text-[clamp(2.25rem,1rem+3.5vw,4rem)]">
            Case study PL-087.
            <br />
            <span className="text-[color:var(--k5-accent)]">Po wdrożeniu, zweryfikowane.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-[1fr_1.3fr] gap-6">
          {/* Left — meta card */}
          <Reveal>
            <div className="bg-[color:var(--k5-surface)] border border-[color:var(--k5-line)] p-8 lg:p-10">
              <p className="k5-label">REPORT // DATA</p>
              <dl className="mt-8 divide-y divide-[color:var(--k5-line)]">
                {[
                  ["Case ID", p.caseId],
                  ["Klient", p.client],
                  ["Region", p.region],
                  ["Rok wdrożenia", p.year],
                  ["ROI", p.roi],
                  ["Redukcja CO₂", p.co2],
                  ["Certyfikaty", p.certificates],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between py-4"
                  >
                    <dt className="k5-label">{label}</dt>
                    <dd className="text-[14px] text-[color:var(--k5-ink)] text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Right — big comparison */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[color:var(--k5-surface)] border border-[color:var(--k5-line)] p-8 lg:p-12 relative overflow-hidden"
          >
            {/* Diagonal stripe BG */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--k5-accent) 0, var(--k5-accent) 1px, transparent 1px, transparent 12px)",
              }}
            />

            <p className="k5-label">ROCZNE ZUŻYCIE ENERGII // MWh</p>

            <div className="mt-10 grid grid-cols-[1fr_auto_1fr] gap-6 items-end">
              <div>
                <p className="k5-label">BEFORE</p>
                <p className="mt-3 k5-mono text-[2rem] text-[color:var(--k5-ink-faint)] line-through decoration-[1.5px]">
                  {p.before.value}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="k5-label">DELTA</span>
                <span className="mt-2 k5-display text-[1.75rem] text-[color:var(--k5-accent)]">
                  {p.delta}
                </span>
              </div>
              <div className="text-right">
                <p className="k5-label">AFTER</p>
                <p className="mt-3 k5-display text-[clamp(2.5rem,1rem+3vw,4rem)] text-[color:var(--k5-accent)]">
                  <CountUp to={6198} format={(n) => Math.round(n).toLocaleString("pl-PL").replace(",", " ")} />
                </p>
              </div>
            </div>

            {/* Bars */}
            <div className="mt-12 space-y-6">
              {p.bars.map((bar, i) => (
                <IndustrialBar key={bar.label} bar={bar} delay={i * 0.12} />
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[color:var(--k5-line)] flex items-center justify-between">
              <span className="k5-label">
                SIGNED{" "}
                <span className="text-[color:var(--k5-accent)]">OK</span>
              </span>
              <span className="k5-mono text-[11px] text-[color:var(--k5-ink-faint)]">
                seal: PL-ISO-50001 / 2024-11
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IndustrialBar({
  bar,
  delay,
}: {
  bar: { label: string; value: number; color: "brand" | "amber" };
  delay: number;
}) {
  const color =
    bar.color === "amber" ? "var(--k5-copper)" : "var(--k5-accent)";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="k5-caps text-[12px] text-[color:var(--k5-ink)]">
          {bar.label}
        </span>
        <span className="k5-mono text-[14px] text-[color:var(--k5-accent)]">
          −{Math.round((1 - bar.value) * 100)}%
        </span>
      </div>
      <div className="mt-2 relative h-[10px] bg-[color:var(--k5-bg)] border border-[color:var(--k5-line)]">
        <motion.div
          initial={{ width: "100%" }}
          whileInView={{ width: `${Math.round(bar.value * 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
