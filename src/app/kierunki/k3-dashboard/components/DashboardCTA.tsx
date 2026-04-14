"use client";

import { SHARED } from "../../_data/content";
import { Reveal } from "../../_shared/motion";

export function DashboardCTA() {
  const c = SHARED.ctaBanner;

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="k3-container">
        <Reveal>
          <div className="relative k3-card p-10 md:p-16 overflow-hidden">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-20 size-[500px] rounded-full blur-[160px] opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.60 0.18 140 / 0.5), transparent 70%)",
              }}
            />

            <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
              <div>
                <p className="k3-label">{c.kicker}</p>
                <h2 className="k3-display mt-5 text-[clamp(2.25rem,1rem+3.5vw,4rem)]">
                  {c.headline}
                </h2>
                <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.6] text-[color:var(--k3-ink-muted)]">
                  {c.body}
                </p>

                {/* Metric strip */}
                <div className="mt-10 grid grid-cols-3 gap-6">
                  <Stat n="48h" label="wycena" />
                  <Stat n="0 zł" label="konsultacja" />
                  <Stat n="2,4 lata" label="średni ROI" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={c.button.href}
                  className="group inline-flex items-center justify-between gap-4 px-6 h-[64px] rounded-xl bg-[color:var(--k3-accent)] text-[color:var(--k3-bg)] hover:brightness-110 transition-all"
                >
                  <span className="k3-display text-[17px]">{c.button.label}</span>
                  <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform text-lg">
                    ↗
                  </span>
                </a>
                <a
                  href={SHARED.contact.phoneHref}
                  className="inline-flex items-center justify-between gap-4 px-6 h-[64px] rounded-xl border border-[color:var(--k3-line-strong)] text-[color:var(--k3-ink)] hover:bg-[color:var(--k3-surface-2)] transition-colors"
                >
                  <span className="k3-label">{c.phoneLabel}</span>
                  <span className="k3-mono text-[15px]">{SHARED.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="k3-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] text-[color:var(--k3-accent)]">
        {n}
      </p>
      <p className="k3-label mt-1">{label}</p>
    </div>
  );
}
