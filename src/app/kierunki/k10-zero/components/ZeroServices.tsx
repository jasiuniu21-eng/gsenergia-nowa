"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED, SURVEY_URL } from "../../_data/content";

/**
 * K10 Zero services — Zeronest-style modular cards.
 * Clean white bg, icon-number left, content right, green accent on hover.
 * SEO-optimized: H2+H3 hierarchy, descriptive text, internal anchors.
 */
export function ZeroServices() {
  const reduced = useReducedMotion();

  return (
    <section id="uslugi" className="relative py-24 lg:py-32" style={{ background: "var(--k10-bg)" }}>
      <div className="k10-container">
        {/* Section heading — SEO H2 */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-[56ch] mb-16 lg:mb-20"
        >
          <p className="k10-label mb-4">// Usługi</p>
          <h2
            className="text-[clamp(2rem,1.25rem+2.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.025em]"
            style={{ color: "var(--k10-ink)" }}
          >
            7 dziedzin.{" "}
            <span style={{ color: "var(--k10-accent)" }}>Każda z pomiarami.</span>
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[17px] leading-[1.55]"
            style={{ color: "var(--k10-ink-muted)" }}
          >
            Nie spekulujemy. Każda rekomendacja ma dane, które potwierdzają
            jej sens ekonomiczny. Średni ROI naszych projektów: 2,4 lata.
          </p>
        </motion.div>

        {/* Service cards — 2 column on desktop, stacked on mobile */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {SHARED.services.map((s, idx) => (
            <motion.a
              key={s.id}
              href={`#${s.id}`}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : idx * 0.06 }}
              className="group relative flex gap-5 p-6 lg:p-8 rounded-xl transition-all duration-200"
              style={{
                border: "1px solid var(--k10-line)",
                background: "var(--k10-bg)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--k10-accent)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(22,163,74,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--k10-line)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Number badge */}
              <div
                className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg text-[18px] font-bold transition-colors"
                style={{
                  background: "var(--k10-accent-faint)",
                  color: "var(--k10-accent)",
                }}
              >
                {s.n}
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className="text-[17px] lg:text-[19px] font-semibold leading-[1.2] group-hover:text-[color:var(--k10-accent)] transition-colors"
                  style={{ color: "var(--k10-ink)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-2 text-[14px] leading-[1.5]"
                  style={{ color: "var(--k10-ink-muted)" }}
                >
                  {s.body}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className="k10-mono text-[12px] font-semibold px-2 py-0.5 rounded"
                    style={{ background: "var(--k10-accent-faint)", color: "var(--k10-accent)" }}
                  >
                    {s.metric}
                  </span>
                  <span className="text-[12px]" style={{ color: "var(--k10-ink-faint)" }}>
                    {s.metricLabel}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <span
                aria-hidden="true"
                className="shrink-0 self-center text-[18px] transition-transform group-hover:translate-x-1"
                style={{ color: "var(--k10-accent)" }}
              >
                →
              </span>
            </motion.a>
          ))}

          {/* 8th card — CTA */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center justify-center p-8 rounded-xl"
            style={{ background: "var(--k10-accent-faint)", border: "1px dashed var(--k10-accent)" }}
          >
            <div className="text-center">
              <p className="text-[15px] font-medium mb-4" style={{ color: "var(--k10-ink)" }}>
                Nie widzisz swojej potrzeby?
              </p>
              <a
                href={SURVEY_URL}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-lg text-[13px] font-semibold transition-all hover:shadow-lg"
                style={{ background: "var(--k10-accent)", color: "#fff" }}
              >
                Porozmawiajmy →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
