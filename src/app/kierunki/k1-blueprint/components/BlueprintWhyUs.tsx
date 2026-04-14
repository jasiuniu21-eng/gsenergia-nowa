"use client";

import { SHARED } from "../../_data/content";
import { Reveal, CountUp } from "../../_shared/motion";

export function BlueprintWhyUs() {
  return (
    <section
      id="why"
      className="py-24 lg:py-32 border-t border-[color:var(--k1-line-strong)]"
    >
      <div className="k1-container">
        <Reveal className="max-w-[720px]">
          <p className="k1-label">Section 03 · Metoda</p>
          <h2 className="k1-display mt-4 text-[clamp(2rem,1rem+3vw,3.25rem)]">
            Cztery zasady, które dzielą nas od reszty rynku.
          </h2>
        </Reveal>

        {/* 4-col principles */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 border-y border-[color:var(--k1-line-strong)] divide-y md:divide-y-0 md:divide-x divide-[color:var(--k1-line)]">
          {SHARED.whyUs.map((w, i) => (
            <Reveal
              key={w.n}
              delay={i * 0.08}
              className="p-6 lg:p-8 min-h-[240px] flex flex-col"
            >
              <span className="k1-mono text-[13px] text-[color:var(--k1-ink-faint)]">
                {w.n}
              </span>
              <h3 className="k1-display mt-8 text-[1.35rem] tracking-[-0.01em]">
                {w.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-[color:var(--k1-ink-muted)]">
                {w.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Stats ledger */}
        <Reveal delay={0.2} className="mt-24">
          <p className="k1-label mb-6">Rolling totals · since 2008</p>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[color:var(--k1-line-strong)] divide-x divide-[color:var(--k1-line)]">
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
  // Parse numeric vs symbolic
  const numericMatch = stat.value.match(/^([\d\s,.]+)(.*)$/);
  const num = numericMatch ? parseFloat(numericMatch[1].replace(/[\s,]/g, "").replace(",", ".")) : null;
  const suffix = numericMatch ? numericMatch[2] : "";

  return (
    <div className="p-6 lg:p-8 relative overflow-hidden">
      {/* Index */}
      <span className="absolute top-3 right-3 k1-mono text-[10px] text-[color:var(--k1-ink-faint)]">
        /{String(index + 1).padStart(2, "0")}
      </span>
      <p className="k1-display text-[clamp(2rem,1rem+2.5vw,3rem)] text-[color:var(--k1-ink)]">
        {num ? (
          <>
            <CountUp to={num} format={(n) => n.toLocaleString("pl-PL", { maximumFractionDigits: 1 })} />
            <span className="ml-1 text-[color:var(--k1-accent)]">{suffix}</span>
          </>
        ) : (
          stat.value
        )}
      </p>
      <p className="k1-label mt-3">{stat.label}</p>
    </div>
  );
}
