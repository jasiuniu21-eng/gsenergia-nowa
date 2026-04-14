"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED, SURVEY_URL } from "../../_data/content";
import { CountUp, staggerParent } from "../../_shared/motion";

export function WarmHero() {
  const reduced = useReducedMotion();
  const h1Parts = SHARED.hero.h1Parts;

  return (
    <section className="relative pt-[140px] lg:pt-[180px] pb-24 lg:pb-32 overflow-hidden">
      {/* Organic warm gradient backdrop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute -top-40 -right-32 size-[680px] rounded-full blur-[120px] opacity-[0.55]"
          style={{
            background: "radial-gradient(closest-side, oklch(0.88 0.10 130 / 0.85), transparent 70%)",
            animation: "kierunki-float 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 -left-40 size-[520px] rounded-full blur-[110px] opacity-[0.35]"
          style={{
            background: "radial-gradient(closest-side, oklch(0.86 0.11 75 / 0.75), transparent 70%)",
            animation: "kierunki-float 24s ease-in-out infinite",
            animationDelay: "-6s",
          }}
        />
        {/* Engineering grid overlay */}
        <svg
          className="absolute inset-0 size-full opacity-[0.05]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="k2-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#k2-grid)" />
        </svg>
      </div>

      <div className="k2-container">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20 items-start">
          {/* Left */}
          <motion.div
            variants={staggerParent(0.1, 0.14)}
            initial={reduced ? undefined : "hidden"}
            animate="shown"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
              className="k2-label flex items-center gap-2.5"
            >
              <span
                className="inline-block h-[7px] w-[7px] rounded-full bg-[color:var(--k2-accent)]"
                style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
                aria-hidden="true"
              />
              {SHARED.hero.kicker}
            </motion.p>

            <h1 className="k2-display mt-8 text-[clamp(2.75rem,1.2rem+6vw,5.75rem)]">
              {h1Parts.map((part, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
                    shown: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="inline-block"
                >
                  {part === "realnie" ? (
                    <span className="relative inline-block">
                      <span className="k2-italic relative z-10">{part}</span>
                      <motion.svg
                        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        viewBox="0 0 200 12"
                        preserveAspectRatio="none"
                        className="absolute left-0 right-0 -bottom-1 h-[11px] w-full overflow-visible"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M4 8 C 40 2, 80 2, 118 6 S 180 10, 196 6"
                          fill="none"
                          stroke="var(--k2-accent)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </motion.svg>
                    </span>
                  ) : (
                    part
                  )}{" "}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
              className="mt-10 max-w-[56ch] text-[18px] leading-[1.55] text-[color:var(--k2-ink-muted)]"
            >
              {SHARED.hero.subheadline}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href={SURVEY_URL}
                className="group inline-flex items-center gap-2.5 px-7 h-[56px] rounded-full bg-[color:var(--k2-ink)] text-[color:var(--k2-bg)] text-[15px] font-medium hover:bg-[color:var(--k2-accent)] transition-colors"
              >
                {SHARED.hero.ctaPrimary.label}
                <span
                  aria-hidden="true"
                  className="group-hover:translate-x-0.5 transition-transform"
                >
                  ↗
                </span>
              </a>
              <a
                href={SHARED.hero.ctaSecondary.href}
                className="group inline-flex items-center gap-2.5 px-7 h-[56px] rounded-full border border-[color:var(--k2-line-strong)] text-[color:var(--k2-ink)] text-[15px] font-medium hover:bg-[color:var(--k2-ink)]/[0.04] transition-colors"
              >
                {SHARED.hero.ctaSecondary.label}
                <span
                  aria-hidden="true"
                  className="group-hover:translate-y-0.5 transition-transform"
                >
                  ↓
                </span>
              </a>
            </motion.div>

            <motion.ul
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
              className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-[color:var(--k2-ink-muted)]"
            >
              {SHARED.hero.trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M2 6l3 3 5-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="text-[color:var(--k2-accent)]"
                    />
                  </svg>
                  {t}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right — engineering slip case study */}
          <WarmProofCard />
        </div>
      </div>
    </section>
  );
}

function WarmProofCard() {
  const reduced = useReducedMotion();
  const p = SHARED.proof;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-6 lg:mt-0"
    >
      {/* Offset shadow card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-[color:var(--k2-accent-bg)]"
      />
      <article className="k2-paper relative rounded-[2rem] border border-[color:var(--k2-line-strong)] p-7 sm:p-8">
        <header className="flex items-start justify-between gap-6 border-b border-dashed border-[color:var(--k2-line-strong)] pb-5">
          <div>
            <p className="k2-label">Case · PL-2024-087</p>
            <p className="mt-2 text-[15px] font-medium">
              Zakład produkcji spożywczej · Małopolska
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--k2-accent-bg)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--k2-accent)]">
            <span
              className="inline-block size-[6px] rounded-full bg-[color:var(--k2-accent)]"
              style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
            />
            Po audycie
          </span>
        </header>

        <div className="mt-6">
          <p className="k2-label">Roczne zużycie energii</p>
          <div className="mt-3 flex items-baseline gap-4">
            <span className="k2-mono text-[color:var(--k2-ink-faint)] line-through decoration-[1.5px] text-[18px]">
              8 472 MWh
            </span>
            <span aria-hidden="true" className="text-[color:var(--k2-accent)]">↓</span>
            <span
              className="k2-display text-[color:var(--k2-ink)] text-[clamp(2.6rem,1rem+3vw,3.75rem)]"
            >
              <CountUp to={6198} format={(n) => Math.round(n).toLocaleString("pl-PL").replace(",", " ")} />
              <span className="ml-2 text-[0.42em] text-[color:var(--k2-ink-muted)]">MWh</span>
            </span>
          </div>
          <p className="mt-2 k2-mono text-[13px] text-[color:var(--k2-accent)]">
            {p.delta} · {p.roi}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-3 gap-4">
          {p.bars.map((bar, i) => (
            <ProofBar key={bar.label} bar={bar} delay={i * 0.15 + 0.2} />
          ))}
        </div>

        <footer className="mt-7 flex flex-wrap gap-2">
          {[p.certificates, "Modernizacja sprężarek", p.co2].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--k2-gold-tint)] px-2.5 py-1 text-[11px] text-[color:var(--k2-ink-muted)]"
            >
              {label}
            </span>
          ))}
        </footer>
      </article>
    </motion.div>
  );
}

function ProofBar({
  bar,
  delay,
}: {
  bar: { label: string; value: number; color: "brand" | "amber" };
  delay: number;
}) {
  const color =
    bar.color === "amber" ? "var(--k2-gold)" : "var(--k2-accent)";
  return (
    <div>
      <p className="k2-label h-8 leading-tight">{bar.label}</p>
      <div
        className="relative mt-1 h-20 rounded-md bg-[color:var(--k2-bg)] border border-[color:var(--k2-line)] overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          initial={{ height: "100%" }}
          whileInView={{ height: `${Math.round(bar.value * 100)}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0"
          style={{
            background: `linear-gradient(to top, ${color}, color-mix(in oklch, ${color} 65%, transparent))`,
          }}
        />
      </div>
      <p className="k2-mono mt-1.5 text-[11px] text-[color:var(--k2-ink-muted)]">
        {Math.round((1 - bar.value) * 100)}% ↓
      </p>
    </div>
  );
}
