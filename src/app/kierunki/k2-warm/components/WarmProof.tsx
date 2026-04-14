"use client";

import { Reveal } from "../../_shared/motion";
import { SHARED } from "../../_data/content";
import { motion, useReducedMotion } from "framer-motion";

/**
 * K2 Proof — editorial case study in two-column layout.
 * Left: magazine-style intro. Right: data comparison card.
 */
export function WarmProof() {
  const p = SHARED.proof;
  const reduced = useReducedMotion();

  return (
    <section
      id="proof"
      className="relative py-28 lg:py-36 bg-[color:var(--k2-dark)] text-[color:var(--k2-dark-fg)] overflow-hidden"
    >
      {/* Organic decorative gradient */}
      <div aria-hidden="true" className="absolute inset-0 opacity-40 pointer-events-none">
        <div
          className="absolute -top-40 right-0 size-[520px] rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(closest-side, oklch(0.75 0.14 140 / 0.6), transparent 70%)",
          }}
        />
      </div>

      <div className="k2-container relative">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20 items-center">
          {/* Left — narrative */}
          <Reveal className="max-w-[540px]">
            <p className="k2-label" style={{ color: "oklch(0.75 0.14 140)" }}>
              Case study · {p.year}
            </p>
            <h2 className="k2-display mt-5 text-[clamp(2.25rem,1rem+3.5vw,3.75rem)]">
              Gdzie znika{" "}
              <span className="k2-italic" style={{ color: "oklch(0.82 0.16 140)" }}>
                prawie miliard złotych
              </span>{" "}
              przemysłu, co roku.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.65] text-white/80">
              W tej fabryce odpowiedź brzmiała: sprężone powietrze (wycieki,
              nieszczelne zawory), chłód procesowy (stara kompresja, brak
              odzysku ciepła) i HVAC (brak sterowania zapotrzebowaniem).
              Sumarycznie — <span className="font-medium text-white">2 274 MWh rocznie</span>,
              warte ponad 1.6 mln zł w aktualnych cenach.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              <Meta label="Case ID" value={p.caseId} />
              <Meta label="Branża" value={p.client} />
              <Meta label="Region" value={p.region} />
              <Meta label="Zwrot inwestycji" value={p.roi} />
            </dl>
          </Reveal>

          {/* Right — paper card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem]"
              style={{ background: "oklch(0.28 0.04 150)" }}
            />
            <article className="relative rounded-[2rem] bg-[color:var(--k2-bg)] text-[color:var(--k2-ink)] p-8 lg:p-10 shadow-[0_40px_80px_-30px_oklch(0.05_0_0/0.5)]">
              <header className="flex items-start justify-between gap-6 border-b border-dashed border-[color:var(--k2-line-strong)] pb-5">
                <div>
                  <p className="k2-label">Report · {p.caseId}</p>
                  <p className="mt-2 text-[16px] font-medium">
                    {p.client} · {p.region}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--k2-accent-bg)] px-3 py-1.5 text-[11px] font-medium text-[color:var(--k2-accent)]">
                  <span
                    className="inline-block size-[6px] rounded-full bg-[color:var(--k2-accent)]"
                    style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
                  />
                  Wdrożone
                </span>
              </header>

              {/* Main comparison */}
              <div className="mt-8 grid grid-cols-[1fr_auto_1fr] gap-6 items-end">
                <div>
                  <p className="k2-label">Przed</p>
                  <p className="mt-2 k2-display text-[2rem] text-[color:var(--k2-ink-faint)] line-through decoration-[1.5px]">
                    {p.before.value}
                  </p>
                  <p className="k2-mono text-[11px] text-[color:var(--k2-ink-faint)] mt-1">
                    MWh / rok
                  </p>
                </div>

                <div className="flex flex-col items-center text-[color:var(--k2-accent)]">
                  <span className="k2-label">Δ</span>
                  <span className="k2-display text-[1.75rem]">{p.delta}</span>
                </div>

                <div className="text-right">
                  <p className="k2-label">Po wdrożeniu</p>
                  <p className="mt-2 k2-display text-[clamp(2.5rem,1rem+3vw,3.5rem)] text-[color:var(--k2-accent)]">
                    {p.after.value}
                  </p>
                  <p className="k2-mono text-[11px] text-[color:var(--k2-ink-faint)] mt-1">
                    MWh / rok
                  </p>
                </div>
              </div>

              {/* Bars */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {p.bars.map((bar, i) => (
                  <BarBlock key={bar.label} bar={bar} index={i} />
                ))}
              </div>

              {/* Chips */}
              <div className="mt-8 flex flex-wrap gap-2">
                {[p.certificates, "Modernizacja sprężarek", p.co2].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[color:var(--k2-gold-tint)] px-3 py-1.5 text-[11.5px] text-[color:var(--k2-ink-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="k2-label text-white/50">{label}</dt>
      <dd className="mt-1.5 text-[15px] text-white/95">{value}</dd>
    </div>
  );
}

function BarBlock({
  bar,
  index,
}: {
  bar: { label: string; value: number; color: "brand" | "amber" };
  index: number;
}) {
  const color = bar.color === "amber" ? "var(--k2-gold)" : "var(--k2-accent)";
  return (
    <div>
      <p className="k2-label h-9 leading-[1.2]">{bar.label}</p>
      <div className="relative mt-1 h-24 rounded-md bg-[color:var(--k2-bg)] border border-[color:var(--k2-line)] overflow-hidden">
        <motion.span
          initial={{ height: "100%" }}
          whileInView={{ height: `${Math.round(bar.value * 100)}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0"
          style={{
            background: `linear-gradient(to top, ${color}, color-mix(in oklch, ${color} 55%, transparent))`,
          }}
        />
      </div>
      <p className="mt-1.5 k2-mono text-[11px] text-[color:var(--k2-ink-muted)]">
        −{Math.round((1 - bar.value) * 100)}%
      </p>
    </div>
  );
}
