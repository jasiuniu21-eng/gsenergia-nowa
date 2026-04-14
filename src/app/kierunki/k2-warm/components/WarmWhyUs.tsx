"use client";

import { Reveal, CountUp, staggerParent } from "../../_shared/motion";
import { SHARED } from "../../_data/content";
import { motion, useReducedMotion } from "framer-motion";

export function WarmWhyUs() {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="py-28 lg:py-36">
      <div className="k2-container">
        <Reveal className="max-w-[680px]">
          <p className="k2-label">Metoda</p>
          <h2 className="k2-display mt-5 text-[clamp(2.25rem,1rem+3.5vw,3.75rem)]">
            Cztery zasady,{" "}
            <span className="k2-italic text-[color:var(--k2-accent)]">
              które dzielą nas od reszty rynku.
            </span>
          </h2>
        </Reveal>

        {/* Bento grid 2x2 */}
        <motion.div
          variants={staggerParent(0.1, 0.12)}
          initial={reduced ? undefined : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid md:grid-cols-2 gap-5"
        >
          {SHARED.whyUs.map((w, i) => (
            <Card key={w.n} w={w} accent={i === 0 || i === 3} large={i === 0} />
          ))}
        </motion.div>

        {/* Stats ledger */}
        <Reveal delay={0.2} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--k2-line)] rounded-[1.5rem] overflow-hidden">
            {SHARED.stats.map((s) => (
              <StatCell key={s.label} stat={s} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Card({
  w,
  accent,
  large,
}: {
  w: (typeof SHARED.whyUs)[number];
  accent: boolean;
  large: boolean;
}) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 32 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={[
        "rounded-[1.75rem] p-8 lg:p-10 relative overflow-hidden",
        "border border-[color:var(--k2-line)]",
        accent
          ? "bg-[color:var(--k2-accent-bg)]"
          : "bg-[color:var(--k2-surface)]",
        large ? "md:min-h-[340px]" : "md:min-h-[280px]",
      ].join(" ")}
    >
      <span
        className="k2-mono absolute top-6 right-7 text-[13px] text-[color:var(--k2-ink-faint)]"
        aria-hidden="true"
      >
        /{w.n}
      </span>

      {/* Decorative symbol */}
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--k2-ink)]/12 bg-white/50 text-[color:var(--k2-accent)]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {/* Unique glyph per card using w.n */}
          {w.n === "01" && <path d="M3 8l2 3 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
          {w.n === "02" && <path d="M8 2v12M3 5l5-3 5 3M3 11l5 3 5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
          {w.n === "03" && <path d="M2 12l5-5 3 3 4-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
          {w.n === "04" && (
            <>
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </>
          )}
        </svg>
      </span>

      <h3
        className={[
          "k2-display mt-8 leading-[1.02]",
          large ? "text-[clamp(1.75rem,1rem+1.8vw,2.5rem)]" : "text-[clamp(1.5rem,1rem+1.2vw,2rem)]",
        ].join(" ")}
      >
        {w.title}
      </h3>
      <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.6] text-[color:var(--k2-ink-muted)]">
        {w.body}
      </p>
    </motion.article>
  );
}

function StatCell({ stat }: { stat: { value: string; label: string } }) {
  // Parse a numeric prefix if present
  const m = stat.value.match(/^([\d.,\s]+)(.*)$/);
  const num = m ? parseFloat(m[1].replace(/[\s,]/g, ".").replace(/\.(?=.*\.)/g, "")) : null;
  const suffix = m ? m[2] : "";

  return (
    <div className="bg-[color:var(--k2-surface)] p-8 lg:p-10">
      <p className="k2-display text-[clamp(2.25rem,1rem+3vw,3.5rem)] text-[color:var(--k2-ink)]">
        {num && isFinite(num) ? (
          <>
            <CountUp
              to={num}
              format={(n) => n.toLocaleString("pl-PL", { maximumFractionDigits: 1 })}
            />
            <span className="ml-1 text-[color:var(--k2-accent)]">{suffix}</span>
          </>
        ) : (
          stat.value
        )}
      </p>
      <p className="mt-3 k2-label">{stat.label}</p>
    </div>
  );
}
