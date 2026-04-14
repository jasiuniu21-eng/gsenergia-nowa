"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED, SURVEY_URL } from "../../_data/content";

/**
 * K4 Editorial Hero — extreme minimalism.
 * Pure white. Gigantic serif typography.
 * Left 70%: huge H1 + body. Right 30%: single giant number.
 */
export function EditorialHero() {
  const reduced = useReducedMotion();
  const words = SHARED.hero.h1.split(" ");

  return (
    <section className="pt-[180px] lg:pt-[220px] pb-24 lg:pb-32">
      <div className="k4-container">
        {/* Top meta row */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between pb-8 border-b border-[color:var(--k4-line-strong)]"
        >
          <span className="k4-label">— 01 {SHARED.hero.kicker}</span>
          <span className="k4-label">MMXXVI · PL</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-12 lg:gap-16 pt-16 lg:pt-24">
          {/* Left — giant H1 */}
          <div>
            <h1 className="k4-display text-[clamp(3rem,1rem+8vw,9rem)] leading-[0.9]">
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 1,
                    delay: 0.15 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.18em]"
                >
                  {w === "realnie" ? (
                    <span className="k4-italic text-[color:var(--k4-accent)]">
                      {w}
                    </span>
                  ) : (
                    w
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-start max-w-[900px]"
            >
              <span className="k4-label whitespace-nowrap">
                — Manifest
              </span>
              <p className="text-[clamp(1.125rem,0.95rem+0.5vw,1.35rem)] leading-[1.55] max-w-[60ch] text-[color:var(--k4-ink-muted)]">
                Od 2008 roku wykonujemy audyty energetyczne dla zakładów
                produkcyjnych — <span className="text-[color:var(--k4-ink)]">konkretne, mierzalne, policzone</span>.
                Nie obiecujemy magii. Przychodzimy, mierzymy, liczymy i mówimy
                prawdę: ile, gdzie, w jakim czasie się zwróci. Koniec, kropka.
              </p>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-14 flex flex-wrap items-center gap-8"
            >
              <a
                href={SURVEY_URL}
                className="group inline-flex items-baseline gap-3 k4-display text-[1.5rem] text-[color:var(--k4-ink)] border-b-2 border-[color:var(--k4-ink)] pb-1 hover:text-[color:var(--k4-accent)] hover:border-[color:var(--k4-accent)] transition-colors"
              >
                {SHARED.hero.ctaPrimary.label}
                <span
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  →
                </span>
              </a>
              <a
                href={SHARED.hero.ctaSecondary.href}
                className="k4-label hover:text-[color:var(--k4-ink)] transition-colors"
              >
                {SHARED.hero.ctaSecondary.label} ↓
              </a>
            </motion.div>
          </div>

          {/* Right — single massive number */}
          <motion.aside
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="border-l border-[color:var(--k4-line-strong)] pl-8 lg:pl-10 pt-4 lg:pt-8"
          >
            <p className="k4-label">— Przykładowy case</p>
            <p className="mt-6 k4-display text-[clamp(4rem,2rem+6vw,8rem)] text-[color:var(--k4-accent)]">
              −26
              <span className="text-[0.5em] align-top">.8%</span>
            </p>
            <p className="mt-6 text-[14px] leading-[1.6] text-[color:var(--k4-ink-muted)] max-w-[24ch]">
              Redukcja rocznego zużycia energii w zakładzie spożywczym w Małopolsce.
              Zwrot w 2 lata 4 mies.
            </p>
            <p className="mt-8 k4-mono text-[11px] text-[color:var(--k4-ink-faint)]">
              Case PL-2024-087
            </p>
          </motion.aside>
        </div>

        {/* Bottom trust row */}
        <motion.ul
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-32 flex flex-wrap gap-x-10 gap-y-2 pt-8 border-t border-[color:var(--k4-line)]"
        >
          {SHARED.hero.trust.map((t) => (
            <li key={t} className="k4-label">
              — {t}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
