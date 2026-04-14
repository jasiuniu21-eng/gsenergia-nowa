"use client";

import { SHARED } from "../../_data/content";
import { Reveal, CountUp } from "../../_shared/motion";

export function EditorialWhyUs() {
  return (
    <section id="why" className="py-28 lg:py-44">
      <div className="k4-container">
        <Reveal className="pb-12 border-b border-[color:var(--k4-line-strong)]">
          <p className="k4-label">— 04 Metoda</p>
          <h2 className="k4-display mt-8 text-[clamp(2.5rem,1rem+5vw,6rem)] max-w-[14ch]">
            Co nas dzieli od{" "}
            <span className="k4-italic text-[color:var(--k4-accent)]">
              reszty rynku.
            </span>
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {SHARED.whyUs.map((w, i) => (
            <Reveal
              key={w.n}
              delay={i * 0.05}
              className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start"
            >
              <div>
                <span className="k4-mono text-[15px] text-[color:var(--k4-ink-faint)]">
                  {w.n} / 04
                </span>
              </div>
              <div>
                <h3 className="k4-display text-[clamp(2rem,1rem+3vw,4rem)] leading-[1.02]">
                  {w.title}
                </h3>
                <p className="mt-8 text-[clamp(1.125rem,0.95rem+0.5vw,1.35rem)] leading-[1.55] text-[color:var(--k4-ink-muted)] max-w-[56ch]">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats strip */}
        <Reveal delay={0.1} className="mt-28 lg:mt-40 pt-16 border-t border-[color:var(--k4-line-strong)]">
          <p className="k4-label">— Ogółem od 2008</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4">
            {SHARED.stats.map((s, i) => (
              <StatCell key={s.label} stat={s} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCell({ stat, index }: { stat: { value: string; label: string }; index: number }) {
  const m = stat.value.match(/^([\d.,\s]+)(.*)$/);
  const num = m ? parseFloat(m[1].replace(/\s/g, "").replace(",", ".")) : null;
  const suffix = m ? m[2] : "";
  return (
    <div>
      <p className="k4-mono text-[11px] text-[color:var(--k4-ink-faint)]">
        /{String(index + 1).padStart(2, "0")}
      </p>
      <p className="mt-4 k4-display text-[clamp(2.5rem,1rem+3vw,4rem)] leading-[1]">
        {num && isFinite(num) ? (
          <>
            <CountUp to={num} format={(n) => n.toLocaleString("pl-PL", { maximumFractionDigits: 1 })} />
            <span className="text-[color:var(--k4-accent)]">{suffix}</span>
          </>
        ) : (
          stat.value
        )}
      </p>
      <p className="mt-4 text-[13.5px] text-[color:var(--k4-ink-muted)] leading-[1.4] max-w-[24ch]">
        {stat.label}
      </p>
    </div>
  );
}
