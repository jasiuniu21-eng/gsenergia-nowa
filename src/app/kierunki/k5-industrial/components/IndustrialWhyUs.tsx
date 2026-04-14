"use client";

import { SHARED } from "../../_data/content";
import { Reveal, CountUp, staggerParent } from "../../_shared/motion";
import { motion, useReducedMotion } from "framer-motion";

export function IndustrialWhyUs() {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="py-28 lg:py-36 relative">
      <div className="k5-container relative">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 k5-section-num select-none pointer-events-none"
          style={{ opacity: 0.4 }}
        >
          03
        </div>

        <Reveal className="relative max-w-[860px]">
          <div className="flex items-center gap-3 k5-label">
            <span className="inline-block size-[6px] bg-[color:var(--k5-accent)]" />
            <span className="text-[color:var(--k5-accent)]">[03] METODA</span>
            <span className="h-px flex-1 max-w-[120px] bg-[color:var(--k5-line)]" />
          </div>
          <h2 className="k5-display mt-8 text-[clamp(2.25rem,1rem+3.5vw,4rem)]">
            Cztery zasady.
            <br />
            <span className="text-[color:var(--k5-accent)]">Nie negocjujemy.</span>
          </h2>
        </Reveal>

        <motion.div
          variants={staggerParent(0.1, 0.08)}
          initial={reduced ? undefined : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid md:grid-cols-2 gap-4"
        >
          {SHARED.whyUs.map((w) => (
            <motion.article
              key={w.n}
              variants={{
                hidden: { opacity: 0, y: 18 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="group relative border border-[color:var(--k5-line)] bg-[color:var(--k5-surface)] p-8 lg:p-10 overflow-hidden hover:border-[color:var(--k5-accent)]/50 transition-all"
            >
              {/* Top border bright on hover */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 h-[2px] w-0 bg-[color:var(--k5-accent)] group-hover:w-full transition-all duration-500"
              />

              <div className="flex items-center justify-between">
                <span className="k5-display text-[3rem] text-[color:var(--k5-accent)]">
                  {w.n}
                </span>
                <span
                  className="inline-block size-[8px] bg-[color:var(--k5-accent)]"
                  style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="k5-display mt-8 text-[clamp(1.5rem,1rem+1.2vw,2rem)]">
                {w.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-[color:var(--k5-ink-muted)] max-w-[44ch]">
                {w.body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Stats */}
        <Reveal delay={0.15} className="mt-16 bg-[color:var(--k5-surface)] border border-[color:var(--k5-line)] p-8 lg:p-12">
          <div className="flex items-center justify-between pb-6 border-b border-[color:var(--k5-line)]">
            <p className="k5-label">TOTALS // SINCE 2008</p>
            <span className="k5-caps text-[11px] text-[color:var(--k5-accent)]">
              // VERIFIED
            </span>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {SHARED.stats.map((s, i) => (
              <StatCell key={s.label} stat={s} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCell({
  stat,
  index,
}: {
  stat: { value: string; label: string };
  index: number;
}) {
  const m = stat.value.match(/^([\d.,\s]+)(.*)$/);
  const num = m ? parseFloat(m[1].replace(/\s/g, "").replace(",", ".")) : null;
  const suffix = m ? m[2] : "";
  return (
    <div>
      <p className="k5-label">{`#${String(index + 1).padStart(2, "0")}`}</p>
      <p className="mt-3 k5-display text-[clamp(2.25rem,1rem+2.5vw,3.25rem)]">
        {num && isFinite(num) ? (
          <>
            <span className="text-[color:var(--k5-accent)]">
              <CountUp to={num} format={(n) => n.toLocaleString("pl-PL", { maximumFractionDigits: 1 })} />
            </span>
            <span className="text-[color:var(--k5-ink)] ml-1">{suffix}</span>
          </>
        ) : (
          stat.value
        )}
      </p>
      <p className="mt-3 k5-caps text-[11px] text-[color:var(--k5-ink-muted)]">
        {stat.label}
      </p>
    </div>
  );
}
