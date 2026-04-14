"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal, CountUp } from "../../_shared/motion";

/**
 * K4 Proof — editorial spread, like a magazine feature.
 * Full-bleed giant number statement + one paragraph + minimal data.
 */
export function EditorialProof() {
  const p = SHARED.proof;
  const reduced = useReducedMotion();

  return (
    <section id="proof" className="py-28 lg:py-44">
      <div className="k4-container">
        <Reveal className="pb-12 border-b border-[color:var(--k4-line-strong)]">
          <p className="k4-label">— 03 Case study</p>
          <h2 className="k4-display mt-8 text-[clamp(2.5rem,1rem+5vw,6rem)]">
            Zakład spożywczy,
            <br />
            <span className="k4-italic text-[color:var(--k4-accent)]">
              Małopolska, 2024.
            </span>
          </h2>
        </Reveal>

        {/* Full-bleed giant number statement */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-32 mb-24 lg:mb-40"
        >
          <p className="k4-label text-center">Roczne zużycie energii, przed → po</p>
          <p className="mt-8 text-center k4-display text-[clamp(5rem,2rem+14vw,22rem)] leading-[0.85] tracking-[-0.035em]">
            <CountUp
              to={26.8}
              duration={2.2}
              format={(n) => `−${n.toFixed(1)}`}
            />
            <span className="text-[0.5em] align-top">%</span>
          </p>
          <p className="mt-8 text-center text-[14px] k4-mono text-[color:var(--k4-ink-faint)]">
            z 8 472 MWh → do 6 198 MWh · rocznie
          </p>
        </motion.div>

        {/* Two-column editorial */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24">
          <Reveal>
            <p className="k4-label">— Teza</p>
            <p className="mt-8 k4-display text-[clamp(1.75rem,1rem+2vw,3rem)] leading-[1.08]">
              Nie istnieje zakład, w którym nie da się{" "}
              <span className="k4-italic text-[color:var(--k4-accent)]">
                oszczędzić 15 procent.
              </span>
            </p>
            <p className="mt-10 text-[17px] leading-[1.65] text-[color:var(--k4-ink-muted)] max-w-[52ch]">
              Wystarczy zmierzyć, co naprawdę konsumuje energię — i policzyć,
              ile kosztowałaby zmiana. Trzy obszary, które w tym zakładzie
              odpowiadały za całą różnicę: sprężone powietrze, chłód procesowy i HVAC.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-[color:var(--k4-line)] border-t border-[color:var(--k4-line-strong)]">
              {[
                { label: "Sprężone powietrze", value: "−58%" },
                { label: "Chłód procesowy", value: "−29%" },
                { label: "HVAC", value: "−66%" },
                { label: "Zwrot inwestycji", value: p.roi },
                { label: "Redukcja CO₂", value: p.co2 },
                { label: "Białe certyfikaty", value: "Przyznane" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_auto] gap-6 items-baseline py-5"
                >
                  <dt className="text-[15px] text-[color:var(--k4-ink)]">
                    {row.label}
                  </dt>
                  <dd className="k4-display text-[1.35rem] text-[color:var(--k4-accent)]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
