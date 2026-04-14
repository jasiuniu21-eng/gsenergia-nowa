"use client";

import { Reveal, CountUp, staggerParent } from "../../_shared/motion";
import { SHARED } from "../../_data/content";
import { motion, useReducedMotion } from "framer-motion";

export function DashboardWhyUs() {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="py-24 lg:py-32 relative">
      <div className="k3-container">
        <Reveal className="max-w-[680px]">
          <p className="k3-label">Section 03 · Metoda</p>
          <h2 className="k3-display mt-4 text-[clamp(2rem,1rem+3vw,3.5rem)]">
            Zasady, na których opiera się każdy audyt.
          </h2>
        </Reveal>

        <motion.div
          variants={staggerParent(0.1, 0.08)}
          initial={reduced ? undefined : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {SHARED.whyUs.map((w) => (
            <motion.article
              key={w.n}
              variants={{
                hidden: { opacity: 0, y: 18 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="k3-card p-6 lg:p-7 relative overflow-hidden group hover:border-[color:var(--k3-accent)]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="k3-mono text-[11px] text-[color:var(--k3-accent)]">
                  {w.n}
                </span>
                <span
                  className="inline-block size-[6px] rounded-full bg-[color:var(--k3-accent)]"
                  style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="k3-display mt-10 text-[1.25rem] leading-[1.15]">
                {w.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-[color:var(--k3-ink-muted)]">
                {w.body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Stats */}
        <Reveal delay={0.2} className="mt-16">
          <div className="k3-card p-8 lg:p-10 relative overflow-hidden k3-shimmer">
            <div className="flex items-center justify-between">
              <p className="k3-label">Rolling totals · since 2008</p>
              <span className="k3-mono text-[11px] text-[color:var(--k3-accent)]">
                auto-updated
              </span>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {SHARED.stats.map((s, i) => (
                <StatCell key={s.label} stat={s} index={i} />
              ))}
            </div>
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
      <span className="k3-mono text-[11px] text-[color:var(--k3-ink-faint)]">
        /{String(index + 1).padStart(2, "0")}
      </span>
      <p className="mt-2 k3-display text-[clamp(2.25rem,1rem+2.5vw,3.25rem)]">
        {num && isFinite(num) ? (
          <>
            <span className="text-[color:var(--k3-accent)]">
              <CountUp to={num} format={(n) => n.toLocaleString("pl-PL", { maximumFractionDigits: 1 })} />
            </span>
            <span className="text-[color:var(--k3-ink)] ml-1">{suffix}</span>
          </>
        ) : (
          stat.value
        )}
      </p>
      <p className="mt-2 k3-label">{stat.label}</p>
    </div>
  );
}
