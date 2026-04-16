"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";

export function StudioServices() {
  const reduced = useReducedMotion();

  return (
    <section id="uslugi" className="relative py-32 lg:py-40">
      <div className="k6-container">
        {/* Section header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-[60ch]"
        >
          <p
            className="k6-mono text-[11px] tracking-[0.2em] mb-6 flex items-center gap-2"
            style={{ color: "var(--k6-accent)" }}
          >
            <span aria-hidden="true">//</span>
            SIEDEM DZIEDZIN
          </p>
          <h2 className="k6-display text-[clamp(2.5rem,1.5rem+3vw,4.5rem)]">
            Każda usługa zaczyna się od pomiarów.
          </h2>
          <p className="mt-6 text-[17px] text-[color:var(--k6-ink-muted)] leading-[1.55]">
            Nie spekulujemy. Nie kopiujemy benchmarków z internetu. Każda
            rekomendacja ma dane, które potwierdzają jej sens.
          </p>
        </motion.div>

        {/* Services list */}
        <ul className="border-t" style={{ borderColor: "var(--k6-line)" }}>
          {SHARED.services.map((s, idx) => (
            <motion.li
              key={s.id}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href={`#${s.id}`}
                className="group block py-10 lg:py-12 border-b relative transition-colors"
                style={{ borderColor: "var(--k6-line)" }}
              >
                <div className="grid grid-cols-[auto_1fr_auto] gap-6 lg:gap-12 items-baseline">
                  {/* Index */}
                  <span
                    className="k6-serif italic text-[28px] lg:text-[36px]"
                    style={{ color: "var(--k6-accent-dim)" }}
                  >
                    {s.n}
                  </span>

                  {/* Title + description */}
                  <div className="min-w-0">
                    <h3 className="k6-display text-[clamp(1.75rem,1.25rem+1.5vw,3rem)] transition-colors group-hover:text-[color:var(--k6-accent)]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15px] lg:text-[16px] text-[color:var(--k6-ink-muted)] leading-[1.5] max-w-[60ch]">
                      {s.body}
                    </p>
                    <div className="mt-4 flex items-baseline gap-3">
                      <span
                        className="k6-mono text-[12px]"
                        style={{ color: "var(--k6-accent)" }}
                      >
                        {s.metric}
                      </span>
                      <span className="text-[12px] text-[color:var(--k6-ink-faint)]">
                        {s.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span
                    aria-hidden="true"
                    className="k6-serif text-[24px] transition-transform group-hover:translate-x-2"
                    style={{ color: "var(--k6-accent)" }}
                  >
                    →
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
