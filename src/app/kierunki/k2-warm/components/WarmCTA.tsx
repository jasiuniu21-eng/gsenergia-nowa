"use client";

import { SHARED } from "../../_data/content";
import { Reveal } from "../../_shared/motion";

export function WarmCTA() {
  const c = SHARED.ctaBanner;
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="k2-container">
        <Reveal>
          <div className="relative rounded-[2.5rem] bg-[color:var(--k2-dark)] text-[color:var(--k2-dark-fg)] p-10 md:p-16 overflow-hidden">
            {/* Decorative */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <div
                className="absolute -top-40 -right-32 size-[520px] rounded-full blur-[140px] opacity-60"
                style={{
                  background:
                    "radial-gradient(closest-side, oklch(0.80 0.16 140 / 0.5), transparent 70%)",
                }}
              />
              <svg className="absolute inset-0 size-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="k2-cta-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#k2-cta-grid)" />
              </svg>
            </div>

            <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
              <div>
                <p className="k2-label" style={{ color: "oklch(0.80 0.14 140)" }}>
                  {c.kicker}
                </p>
                <h2 className="k2-display mt-5 text-[clamp(2.5rem,1.2rem+4vw,4.5rem)]">
                  {c.headline}
                </h2>
                <p className="mt-8 max-w-[54ch] text-[17px] leading-[1.6] text-white/80">
                  {c.body}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={c.button.href}
                  className="group inline-flex items-center justify-between gap-4 px-7 h-[68px] rounded-full bg-[color:var(--k2-bg)] text-[color:var(--k2-ink)] hover:bg-white transition-colors"
                >
                  <span className="k2-display text-[18px]">{c.button.label}</span>
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center size-10 rounded-full bg-[color:var(--k2-ink)] text-[color:var(--k2-bg)] group-hover:translate-x-0.5 transition-transform"
                  >
                    ↗
                  </span>
                </a>
                <a
                  href={SHARED.contact.phoneHref}
                  className="flex items-center justify-between gap-4 px-7 h-[68px] rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
                >
                  <span className="k2-label text-white/60">{c.phoneLabel}</span>
                  <span className="k2-display text-[18px]">
                    {SHARED.contact.phone}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
