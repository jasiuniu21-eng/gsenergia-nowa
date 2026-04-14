"use client";

import { SHARED } from "../../_data/content";
import { Reveal, Magnetic } from "../../_shared/motion";

export function IndustrialCTA() {
  const c = SHARED.ctaBanner;
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[1000px] rounded-full blur-[200px] opacity-15"
          style={{ background: "radial-gradient(closest-side, oklch(0.78 0.18 138), transparent)" }}
        />
      </div>
      <div className="k5-container relative">
        <Reveal>
          <div className="border-2 border-[color:var(--k5-line-strong)] bg-[color:var(--k5-surface)] p-10 md:p-16 relative">
            {/* Corner markers */}
            <span aria-hidden="true" className="absolute top-3 left-3 k5-label text-[color:var(--k5-accent)]">
              // SYSTEM READY
            </span>
            <span aria-hidden="true" className="absolute top-3 right-3 k5-label">
              SEC 04
            </span>

            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end pt-6">
              <div>
                <p className="k5-label">{c.kicker.toUpperCase()}</p>
                <h2 className="k5-display mt-6 text-[clamp(2.5rem,1rem+4.5vw,5rem)]">
                  {c.headline.replace("Policzmy,", "Policzmy,")}
                </h2>
                <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.6] text-[color:var(--k5-ink-muted)]">
                  {c.body}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Magnetic
                  href={c.button.href}
                  strength={0.25}
                  className="group inline-flex items-center justify-between gap-4 px-8 h-[72px] bg-[color:var(--k5-accent)] text-[color:var(--k5-bg)] hover:brightness-110 transition-all"
                >
                  <span className="k5-caps text-[15px]">{c.button.label}</span>
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform text-lg">→</span>
                </Magnetic>
                <a
                  href={SHARED.contact.phoneHref}
                  className="inline-flex items-center justify-between gap-4 px-8 h-[72px] border border-[color:var(--k5-line-strong)] text-[color:var(--k5-ink)] hover:bg-[color:var(--k5-surface-2)] transition-colors"
                >
                  <span className="k5-label text-[color:var(--k5-ink-faint)]">
                    {c.phoneLabel.toUpperCase()}
                  </span>
                  <span className="k5-mono text-[15px]">{SHARED.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
