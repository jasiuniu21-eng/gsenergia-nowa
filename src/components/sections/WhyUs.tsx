"use client";

import { motion, useReducedMotion } from "framer-motion";

const STATS = [
  {
    num: "18",
    unit: "lat",
    label: "na rynku",
    context: "Dłużej niż większość konkurencji",
    proof: "Działamy od 2008 roku",
  },
  {
    num: "400+",
    unit: "",
    label: "projektów",
    context: "PGE, Orlen, Shell, KGHM",
    proof: "Największe firmy w Polsce",
  },
  {
    num: "30%",
    unit: "",
    label: "śr. oszczędność",
    context: "Gwarantujemy konkretny wynik",
    proof: "Każda rekomendacja z ROI",
  },
] as const;

export function WhyUs() {
  const reduced = useReducedMotion();

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="bg-white border-t border-black/8"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--c-brand-500)] mb-3">
              Dlaczego my
            </p>
            <motion.h2
              id="why-us-heading"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[#1a1a18] leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)", fontWeight: 700 }}
            >
              Liczby, które coś znaczą
            </motion.h2>
          </div>
          <p className="text-[color:var(--c-fg-muted)] max-w-xs text-sm leading-relaxed">
            Nie opowiadamy o wartościach — pokazujemy wyniki. Każda liczba ma za sobą konkretny projekt.
          </p>
        </div>

        {/* Stat blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-black/8">
          {STATS.map(({ num, unit, label, context, proof }, i) => (
            <motion.div
              key={label}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="px-0 md:px-10 py-12 first:pl-0 last:pr-0 flex flex-col"
            >
              {/* Top border accent */}
              <div
                className="w-10 h-0.5 mb-8"
                style={{ background: "var(--c-brand-500)" }}
                aria-hidden
              />

              {/* Big number */}
              <p
                className="font-display text-[#1a1a18] leading-none tracking-tight mb-3"
                style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 800 }}
              >
                {num}
                {unit && (
                  <span className="text-[0.35em] font-semibold ml-1 text-black/40 align-top mt-2 inline-block">
                    {unit}
                  </span>
                )}
              </p>

              {/* Label */}
              <p className="text-lg font-semibold text-[#1a1a18] mb-2">{label}</p>

              {/* Context */}
              <p className="text-[color:var(--c-fg-muted)] text-sm leading-relaxed mb-4 flex-1">{context}</p>

              {/* Proof */}
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--c-brand-500)" }}
              >
                {proof}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-[color:var(--c-fg-muted)] text-sm max-w-sm">
            Niezależne doradztwo — nie sprzedajemy urządzeń ani technologii. Nasz interes = Twoje oszczędności.
          </p>
          <a
            href="#kontakt"
            className="shrink-0 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--c-brand-500)", boxShadow: "0 4px 16px rgba(38,137,13,0.25)" }}
          >
            Bezpłatna analiza →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
