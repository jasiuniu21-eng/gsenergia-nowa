"use client";

import { SHARED } from "../../_data/content";
import { Reveal } from "../../_shared/motion";

export function BlueprintCTA() {
  const c = SHARED.ctaBanner;
  return (
    <section className="py-24 lg:py-32 bg-[color:var(--k1-ink)] text-[color:var(--k1-bg)] relative overflow-hidden">
      {/* Blueprint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="k1-cta-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#k1-cta-grid)" />
        </svg>
      </div>

      <div className="k1-container relative">
        <Reveal className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
          <div>
            <p className="k1-label text-[color:var(--k1-bg)]/60">
              {c.kicker}
            </p>
            <h2 className="k1-display mt-6 text-[clamp(2.25rem,1rem+4vw,4rem)] leading-[1]">
              {c.headline}
            </h2>
            <p className="mt-8 max-w-[56ch] text-[17px] leading-[1.55] text-[color:var(--k1-bg)]/75">
              {c.body}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <a
              href={c.button.href}
              className="group inline-flex items-center justify-between px-7 h-[68px] bg-[color:var(--k1-accent)] hover:bg-[color:var(--k1-bg)] hover:text-[color:var(--k1-ink)] text-[color:var(--k1-bg)] transition-colors"
            >
              <span className="k1-display text-[20px]">
                {c.button.label}
              </span>
              <span
                aria-hidden="true"
                className="k1-mono text-[18px] group-hover:translate-x-1 transition-transform"
              >
                ↗
              </span>
            </a>
            <a
              href={SHARED.contact.phoneHref}
              className="flex items-center justify-between px-7 h-[68px] border border-[color:var(--k1-bg)]/20 text-[color:var(--k1-bg)] hover:bg-[color:var(--k1-bg)]/5 transition-colors"
            >
              <span className="k1-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--k1-bg)]/60">
                {c.phoneLabel}
              </span>
              <span className="k1-display text-[18px]">
                {SHARED.contact.phone}
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
