"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal } from "../../_shared/motion";

/**
 * K4 Services — as a table-of-contents list.
 * No cards, no grid of tiles — just type and rules.
 */
export function EditorialServices() {
  const reduced = useReducedMotion();

  return (
    <section id="uslugi" className="py-28 lg:py-40">
      <div className="k4-container">
        <Reveal className="flex items-end justify-between gap-6 pb-10 border-b border-[color:var(--k4-line-strong)]">
          <div>
            <p className="k4-label">— 02 Usługi</p>
            <h2 className="k4-display mt-8 text-[clamp(2.5rem,1rem+5vw,6rem)] max-w-[10ch]">
              Siedem obszarów.
            </h2>
          </div>
          <span className="k4-mono text-[12px] text-[color:var(--k4-ink-faint)]">
            s. {String(SHARED.services.length).padStart(2, "0")}
          </span>
        </Reveal>

        <motion.ol
          initial={reduced ? undefined : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
          className="mt-6"
        >
          {SHARED.services.map((s, i) => (
            <motion.li
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="group relative border-b border-[color:var(--k4-line)]"
              id={s.id}
            >
              <a
                href={`#${s.id}`}
                className="grid grid-cols-12 gap-4 items-baseline py-8 lg:py-10 hover:bg-[color:var(--k4-accent)]/[0.04] transition-colors -mx-4 px-4"
              >
                <span className="col-span-2 md:col-span-1 k4-mono text-[13px] text-[color:var(--k4-ink-faint)]">
                  {s.n}
                </span>

                <h3 className="col-span-10 md:col-span-6 k4-display text-[clamp(1.5rem,1rem+2.5vw,3rem)] leading-[1] tracking-[-0.02em]">
                  {i === 0 ? (
                    <>
                      {s.title.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className="k4-italic text-[color:var(--k4-accent)]">
                        {s.title.split(" ").slice(-1)}
                      </span>
                    </>
                  ) : i === SHARED.services.length - 1 ? (
                    <span className="k4-italic">{s.title}</span>
                  ) : (
                    s.title
                  )}
                </h3>

                <p className="col-span-12 md:col-span-4 text-[14px] leading-[1.55] text-[color:var(--k4-ink-muted)] max-w-[40ch] md:pl-4">
                  {s.body}
                </p>

                <div className="col-span-12 md:col-span-1 md:text-right">
                  <span className="k4-mono text-[13px] text-[color:var(--k4-accent)]">
                    {s.metric}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[color:var(--k4-accent)] text-xl"
                >
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
