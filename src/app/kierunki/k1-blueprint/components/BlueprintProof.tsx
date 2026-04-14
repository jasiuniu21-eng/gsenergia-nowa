"use client";

import { motion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal } from "../../_shared/motion";

export function BlueprintProof() {
  const p = SHARED.proof;
  return (
    <section
      id="proof"
      className="py-24 lg:py-32 bg-[color:var(--k1-surface)] border-t border-[color:var(--k1-line-strong)]"
    >
      <div className="k1-container">
        <Reveal className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left: narrative */}
          <div>
            <p className="k1-label">Section 02 · Proof</p>
            <h2 className="k1-display mt-4 text-[clamp(2rem,1rem+3vw,3.25rem)]">
              Jak wygląda<br />audyt w liczbach.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-[color:var(--k1-ink-muted)] max-w-[48ch]">
              Anonimizowany case z naszego portfolio. Dane po wdrożeniu
              rekomendacji, zweryfikowane w trzech cyklach rozliczeniowych.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
              <Meta label="Case ID" value={p.caseId} />
              <Meta label="Rok" value={p.year} />
              <Meta label="Branża" value={p.client} />
              <Meta label="Region" value={p.region} />
            </dl>

            <div className="mt-10 flex flex-wrap gap-2">
              <Tag>{p.certificates}</Tag>
              <Tag>{p.co2}</Tag>
              <Tag>{p.roi}</Tag>
            </div>
          </div>

          {/* Right: data sheet */}
          <div className="relative border border-[color:var(--k1-line-strong)] bg-[color:var(--k1-bg)]">
            {/* Drawing-sheet header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[color:var(--k1-line-strong)] k1-label">
              <span>Data sheet · Annual consumption</span>
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-[6px] w-[6px] rounded-full bg-[color:var(--k1-accent)]"
                  style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
                  aria-hidden="true"
                />
                Verified
              </span>
            </div>

            {/* Before/After comparison */}
            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-3 gap-6 items-end">
                <div>
                  <p className="k1-label">{p.before.label}</p>
                  <p className="k1-display mt-3 text-[1.75rem] text-[color:var(--k1-negative)] line-through decoration-[1px]">
                    {p.before.value}
                    <span className="k1-mono text-[0.7rem] font-normal ml-1 opacity-70">
                      {p.before.unit}
                    </span>
                  </p>
                </div>

                {/* Arrow bar */}
                <div className="flex flex-col items-center">
                  <span className="k1-mono text-[11px] text-[color:var(--k1-ink-faint)] mb-1">
                    ΔE
                  </span>
                  <span className="k1-display text-[1.6rem] text-[color:var(--k1-accent)]">
                    {p.delta}
                  </span>
                </div>

                <div className="text-right">
                  <p className="k1-label">{p.after.label}</p>
                  <p className="k1-display mt-3 text-[clamp(2rem,1rem+2.5vw,3rem)] text-[color:var(--k1-ink)]">
                    {p.after.value}
                    <span className="k1-mono text-[0.7rem] font-normal ml-1 opacity-70">
                      {p.after.unit}
                    </span>
                  </p>
                </div>
              </div>

              {/* Breakdown bars */}
              <div className="mt-10 grid grid-cols-3 gap-5">
                {p.bars.map((b, i) => (
                  <BarBlock key={b.label} bar={b} index={i} />
                ))}
              </div>

              {/* Annotations */}
              <ul className="mt-8 space-y-2 k1-mono text-[11px] text-[color:var(--k1-ink-muted)]">
                <li className="flex gap-3">
                  <span className="text-[color:var(--k1-ink-faint)]">Δ01</span>
                  <span>Wymiana sprężarek na przetwornicowe + odzysk ciepła</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[color:var(--k1-ink-faint)]">Δ02</span>
                  <span>Modernizacja agregatu wody lodowej, nowy sterownik</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[color:var(--k1-ink-faint)]">Δ03</span>
                  <span>Sekcjonowanie HVAC + sterowanie zapotrzebowaniem</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="k1-label">{label}</dt>
      <dd className="k1-mono mt-1 text-[14px] text-[color:var(--k1-ink)]">{value}</dd>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[color:var(--k1-line-strong)] k1-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--k1-ink-muted)]">
      {children}
    </span>
  );
}

function BarBlock({
  bar,
  index,
}: {
  bar: { label: string; value: number; color: "brand" | "amber" };
  index: number;
}) {
  const color = bar.color === "amber" ? "var(--k1-warn)" : "var(--k1-accent)";
  return (
    <div>
      <p className="k1-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--k1-ink-faint)] h-8 leading-tight">
        {bar.label}
      </p>
      <div className="relative h-[104px] border border-[color:var(--k1-line-strong)] bg-[color:var(--k1-surface)] overflow-hidden">
        {/* Horizontal tick marks */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((t) => (
            <span
              key={t}
              className="h-px bg-[color:var(--k1-line)]"
              aria-hidden="true"
            />
          ))}
        </div>
        <motion.div
          initial={{ height: "100%" }}
          whileInView={{ height: `${Math.round(bar.value * 100)}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 1.3,
            delay: 0.15 * index,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-x-0 bottom-0"
          style={{ background: color }}
        />
      </div>
      <p className="k1-mono mt-1.5 text-[11px] text-[color:var(--k1-accent)]">
        −{Math.round((1 - bar.value) * 100)}%
      </p>
    </div>
  );
}
