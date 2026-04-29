"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SITE } from "@/lib/site";

const MIN_BILL = 50_000;
const MAX_BILL = 5_000_000;
const STEP = 10_000;
const DEFAULT_BILL = 500_000;
const SAVINGS_PCT = 0.18;

const plnFormatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  maximumFractionDigits: 0,
});

function formatPLN(value: number): string {
  return plnFormatter.format(value);
}

export function HelpCalculator() {
  const [annualBill, setAnnualBill] = useState<number>(DEFAULT_BILL);
  const reduceMotion = useReducedMotion();

  const annualSavings = useMemo(() => annualBill * SAVINGS_PCT, [annualBill]);
  const fiveYearSavings = useMemo(() => annualSavings * 5, [annualSavings]);

  const pct = ((annualBill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

  const swap = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.18, ease: "easeOut" as const },
      };

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[oklch(0.16_0.02_150)] text-white">
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full opacity-[0.18] blur-[160px]"
        style={{ background: "oklch(0.78 0.20 130 / 0.6)" }}
      />

      <div className="container-site relative py-[clamp(4rem,7vw,7rem)]">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "#86bc25" }}>
            Kalkulator oszczędności
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight" style={{ fontWeight: 100 }}>
            O ile obniżymy Twój rachunek<span style={{ color: "#86bc25" }}>.</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-white/70 max-w-2xl">
            Przesuń suwak — pokażemy ile zaoszczędzisz po audycie energetycznym GS Energia.
          </p>
        </div>

        {/* Calculator card */}
        <div className="mt-10 rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-8 lg:p-12">
          {/* TOP: slider + value */}
          <div>
            <div className="text-sm uppercase tracking-[0.18em] text-white/60 font-medium">
              Twój roczny rachunek za prąd
            </div>
            <div className="mt-3 font-display leading-none" style={{ fontWeight: 100, fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              <motion.span key={Math.round(annualBill / 10_000)} {...swap} className="inline-block tabular-nums">
                {formatPLN(annualBill)}
              </motion.span>
            </div>

            <div className="mt-8">
              <input
                type="range"
                min={MIN_BILL}
                max={MAX_BILL}
                step={STEP}
                value={annualBill}
                onChange={(e) => setAnnualBill(Number(e.target.value))}
                aria-label="Roczny rachunek za prąd w PLN"
                style={{ ["--pct" as string]: `${pct}%` }}
                className="gs-range w-full"
              />
              <div className="mt-3 flex justify-between text-xs text-white/50 font-medium">
                <span>50 tys.</span>
                <span>5 mln.</span>
              </div>
            </div>
          </div>

          {/* BOTTOM: result tiles */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#26890d]/15 ring-1 ring-[#86bc25]/30 p-6 text-center">
              <div className="text-xs uppercase tracking-[0.18em] text-white/70 font-medium">
                Oszczędność rocznie
              </div>
              <div className="mt-3 font-display leading-tight" style={{ fontWeight: 100, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#86bc25" }}>
                <motion.span key={`y-${Math.round(annualSavings / 10_000)}`} {...swap} className="inline-block tabular-nums">
                  {formatPLN(annualSavings)}
                </motion.span>
              </div>
              <div className="mt-2 text-xs text-white/50">(18% niżej)</div>
            </div>

            <div className="rounded-2xl bg-[#26890d]/15 ring-1 ring-[#86bc25]/30 p-6 text-center">
              <div className="text-xs uppercase tracking-[0.18em] text-white/70 font-medium">
                W 5 lat
              </div>
              <div className="mt-3 font-display leading-tight" style={{ fontWeight: 100, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#86bc25" }}>
                <motion.span key={`f-${Math.round(fiveYearSavings / 10_000)}`} {...swap} className="inline-block tabular-nums">
                  {formatPLN(fiveYearSavings)}
                </motion.span>
              </div>
              <div className="mt-2 text-xs text-white/50">(+ inflacja energii)</div>
            </div>

            <div className="rounded-2xl bg-[#26890d]/15 ring-1 ring-[#86bc25]/30 p-6 text-center">
              <div className="text-xs uppercase tracking-[0.18em] text-white/70 font-medium">
                ROI audytu
              </div>
              <div className="mt-3 font-display leading-tight" style={{ fontWeight: 100, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#86bc25" }}>
                &lt; 18 miesięcy
              </div>
              <div className="mt-2 text-xs text-white/50">(średni czas zwrotu)</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href={SITE.surveyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#86bc25] text-black px-7 py-3.5 rounded-full font-medium hover:bg-[#9bd02e] transition-colors"
          >
            Zamów bezpłatną konsultację
            <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>
      </div>

      <style>{`
        .gs-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          width: 100%;
          height: 24px;
          cursor: pointer;
        }
        .gs-range:focus { outline: none; }
        .gs-range::-webkit-slider-runnable-track {
          height: 6px;
          background: linear-gradient(to right, #86bc25 var(--pct, 50%), rgba(255,255,255,0.1) var(--pct, 50%));
          border-radius: 999px;
        }
        .gs-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #86bc25;
          border: 4px solid #fff;
          border-radius: 50%;
          margin-top: -9px;
          box-shadow: 0 4px 12px rgba(134, 188, 37, 0.6);
          cursor: grab;
        }
        .gs-range::-webkit-slider-thumb:active { cursor: grabbing; }
        .gs-range::-moz-range-track {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 999px;
        }
        .gs-range::-moz-range-progress {
          height: 6px;
          background: #86bc25;
          border-radius: 999px;
        }
        .gs-range::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #86bc25;
          border: 4px solid #fff;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(134, 188, 37, 0.6);
          cursor: grab;
        }
        .gs-range:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 4px rgba(134, 188, 37, 0.35), 0 4px 12px rgba(134, 188, 37, 0.6);
        }
      `}</style>
    </section>
  );
}

export default HelpCalculator;
