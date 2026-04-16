"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";

export function StudioServices() {
  const reduced = useReducedMotion();

  return (
    <section id="uslugi" className="relative py-32 lg:py-40">
      <div className="k6-container">
        {/* Section header — simpler, no mono eyebrow */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-24 max-w-[20ch]"
        >
          <h2 className="k6-display text-[clamp(2.5rem,1.5rem+3vw,5rem)] leading-[1]">
            Siedem<br/>dziedzin.<br/>
            <em className="italic" style={{ color: "var(--k6-accent)" }}>Każda z pomiarami.</em>
          </h2>
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
                <div className="grid grid-cols-[48px_1fr_auto] gap-8 lg:gap-16 items-baseline">
                  {/* Index — smaller, understated */}
                  <span
                    className="k6-mono text-[13px] pt-2"
                    style={{ color: "var(--k6-ink-faint)" }}
                  >
                    {s.n}
                  </span>

                  {/* Title + one-line description */}
                  <div className="min-w-0">
                    <h3 className="k6-display text-[clamp(1.75rem,1rem+2vw,3.5rem)] leading-[1.05] transition-colors group-hover:text-[color:var(--k6-accent)]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15px] lg:text-[17px] text-[color:var(--k6-ink-muted)] leading-[1.5] max-w-[56ch]">
                      {s.short}
                    </p>
                  </div>

                  {/* Metric on the right (replaces arrow for clarity) */}
                  <span
                    className="k6-mono text-[13px] whitespace-nowrap pt-3"
                    style={{ color: "var(--k6-accent)" }}
                  >
                    {s.metric}
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
