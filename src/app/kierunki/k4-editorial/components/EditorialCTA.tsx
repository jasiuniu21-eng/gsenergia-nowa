"use client";

import { SHARED } from "../../_data/content";
import { Reveal } from "../../_shared/motion";

/**
 * K4 CTA — one huge statement, one CTA link. Nothing else.
 */
export function EditorialCTA() {
  const c = SHARED.ctaBanner;
  return (
    <section className="py-32 lg:py-52">
      <div className="k4-container">
        <Reveal>
          <p className="k4-label">— 05 Kontakt</p>
          <h2 className="k4-display mt-10 text-[clamp(3rem,1rem+8vw,9.5rem)] leading-[0.92] max-w-[12ch]">
            Policzmy, co możesz{" "}
            <span className="k4-italic text-[color:var(--k4-accent)]">
              zaoszczędzić.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-16 grid md:grid-cols-[auto_1fr] gap-12 md:gap-20 items-end">
          <p className="k4-label whitespace-nowrap">— Manifest</p>
          <p className="max-w-[52ch] text-[clamp(1.125rem,0.95rem+0.5vw,1.4rem)] leading-[1.55] text-[color:var(--k4-ink-muted)]">
            {c.body}
          </p>
        </Reveal>

        <Reveal
          delay={0.3}
          className="mt-20 flex flex-col md:flex-row md:items-end justify-between gap-10 pt-10 border-t border-[color:var(--k4-line-strong)]"
        >
          <a
            href={c.button.href}
            className="group inline-flex items-baseline gap-4 k4-display text-[clamp(2rem,1rem+2.5vw,3.5rem)] border-b-2 border-[color:var(--k4-ink)] pb-2 hover:text-[color:var(--k4-accent)] hover:border-[color:var(--k4-accent)] transition-colors"
          >
            {c.button.label}
            <span
              aria-hidden="true"
              className="group-hover:translate-x-2 transition-transform"
            >
              →
            </span>
          </a>

          <div className="md:text-right">
            <p className="k4-label">{c.phoneLabel}</p>
            <a
              href={SHARED.contact.phoneHref}
              className="mt-2 block k4-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] hover:text-[color:var(--k4-accent)] transition-colors"
            >
              {SHARED.contact.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
