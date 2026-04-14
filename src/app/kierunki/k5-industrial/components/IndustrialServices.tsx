"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal, staggerParent } from "../../_shared/motion";

/**
 * K5 Services — industrial "control panel" of service modules.
 * Big section numeral as background. Strong-typed titles.
 */
export function IndustrialServices() {
  const reduced = useReducedMotion();

  return (
    <section id="uslugi" className="py-28 lg:py-36 relative">
      <div className="k5-container relative">
        {/* Section background number */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 k5-section-num select-none pointer-events-none"
          style={{ opacity: 0.5 }}
        >
          01
        </div>

        <Reveal className="relative max-w-[900px]">
          <div className="flex items-center gap-3 k5-label">
            <span className="inline-block size-[6px] bg-[color:var(--k5-accent)]" />
            <span className="text-[color:var(--k5-accent)]">[01] USŁUGI</span>
            <span className="h-px flex-1 max-w-[120px] bg-[color:var(--k5-line)]" />
          </div>
          <h2 className="k5-display mt-8 text-[clamp(2.25rem,1rem+3.5vw,4rem)]">
            Siedem modułów.
            <br />
            <span className="text-[color:var(--k5-accent)]">Jedna instalacja operacyjna.</span>
          </h2>
        </Reveal>

        {/* Services list with engineering-table feel */}
        <motion.div
          variants={staggerParent(0.1, 0.07)}
          initial={reduced ? undefined : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid md:grid-cols-2 gap-0 border border-[color:var(--k5-line)]"
        >
          {SHARED.services.map((s, i) => (
            <motion.article
              key={s.id}
              id={s.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              className={[
                "group relative p-6 lg:p-8 border-b border-[color:var(--k5-line)] md:last:border-b-0 md:nth-last-2:border-b-0",
                "odd:md:border-r odd:md:border-[color:var(--k5-line)]",
                "hover:bg-[color:var(--k5-surface)] transition-colors",
              ].join(" ")}
              style={{
                // last two items should not have bottom border
                borderBottomWidth: i >= SHARED.services.length - (SHARED.services.length % 2 || 2) ? undefined : undefined,
              }}
            >
              <div className="flex items-start justify-between">
                <span className="k5-label">MODULE / {s.n}</span>
                <span
                  className="inline-block size-[6px] bg-[color:var(--k5-accent)]"
                  style={{ animation: "kierunki-dot 2.2s ease-in-out infinite" }}
                  aria-hidden="true"
                />
              </div>

              <h3 className="k5-display mt-6 text-[clamp(1.4rem,1rem+1vw,2rem)]">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-[color:var(--k5-ink-muted)] max-w-[42ch]">
                {s.body}
              </p>

              <div className="mt-6 flex items-end justify-between pt-4 border-t border-dashed border-[color:var(--k5-line)]">
                <div>
                  <p className="k5-label">{s.metricLabel}</p>
                  <p className="mt-1 k5-mono text-[18px] text-[color:var(--k5-accent)] font-semibold">
                    {s.metric}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="k5-caps text-[11px] text-[color:var(--k5-ink-faint)] group-hover:text-[color:var(--k5-accent)] group-hover:translate-x-0.5 transition-all"
                >
                  ACCESS →
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
