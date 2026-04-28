"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const CASES = [
  {
    client: "PGE GiEK · Elektrownia Turów",
    sector: "Energetyka konwencjonalna",
    metric: "−18%",
    metricLabel: "energii w systemach chłodniczych",
    summary:
      "Ocena efektywności i modernizacja chłodni kominowych oraz instalacji klimatyzacyjnych w jednej z największych elektrowni węglowych w Polsce.",
    href: "/realizacje/2895-2",
  },
  {
    client: "Shell Polska",
    sector: "Sieć stacji paliw",
    metric: "Centralna telemetria",
    metricLabel: "dla setek obiektów 24/7",
    summary:
      "Architektura i wdrożenie systemu monitoringu mediów + audyt energetyczny stacji benzynowych — bieżący wgląd w zużycie i optymalizacja taryf.",
    href: "/realizacje/telemetria",
  },
  {
    client: "BSH Sprzęt Gospodarstwa Domowego",
    sector: "Produkcja AGD",
    metric: "−27%",
    metricLabel: "w obszarze sprężonego powietrza",
    summary:
      "Audyt sprężonego powietrza i sieci dystrybucji w zakładzie produkcyjnym — wykrycie strat, rekompresja, zalecenia o ROI < 18 mies.",
    href: "/realizacje",
  },
  {
    client: "ZF Friedrichshafen",
    sector: "Motoryzacja",
    metric: "ISO 50001",
    metricLabel: "wdrożenie + utrzymanie certyfikatu",
    summary:
      "Pełen cykl: audyt zerowy, wdrożenie systemu zarządzania energią, szkolenia zespołu i przygotowanie do recertyfikacji.",
    href: "/realizacje",
  },
  {
    client: "Kaufland Polska",
    sector: "Retail wielkopowierzchniowy",
    metric: "Świadectwa",
    metricLabel: "charakterystyki energet. dla sieci",
    summary:
      "Pełna dokumentacja energetyczna marketów + rekomendacje modernizacyjne dla oświetlenia, HVAC i instalacji chłodniczych.",
    href: "/realizacje",
  },
  {
    client: "Skanska",
    sector: "Budownictwo komercyjne",
    metric: "−22%",
    metricLabel: "OPEX po termomodernizacji",
    summary:
      "Audyt energetyczny biurowca klasy A — analiza kogeneracji, modernizacja BMS, raport zgodny z wymogami ESG/CSRD.",
    href: "/realizacje",
  },
];

export function CaseStudies() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="cases-heading"
      className="relative bg-white text-[#222328] border-t border-black/10"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-[40ch]">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
              Realizacje
            </p>
            <motion.h2
              id="cases-heading"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 3.5vw + 1rem, 3.5rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Liczby, nie obietnice<span style={{ color: "#8DC73F" }}>.</span>
            </motion.h2>
          </div>
          <Link
            href="/realizacje"
            className="inline-flex items-center gap-1.5 text-[0.95rem] text-[#26890d] hover:underline underline-offset-4"
          >
            Wszystkie realizacje <ArrowUpRight size={15} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <motion.article
              key={c.client}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                {c.sector}
              </p>
              <h3 className="mt-2 font-display text-[1.25rem] tracking-[-0.01em] text-[#222328]">
                {c.client}
              </h3>

              <div className="mt-6 flex items-baseline gap-2.5">
                <span
                  className="font-display tracking-[-0.03em] text-[#26890d]"
                  style={{ fontSize: "clamp(2.2rem, 2vw + 1rem, 2.8rem)", fontWeight: 100 }}
                >
                  {c.metric}
                </span>
                <span className="text-sm text-[color:var(--c-fg-muted)] leading-tight">
                  {c.metricLabel}
                </span>
              </div>

              <p className="mt-5 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55]">
                {c.summary}
              </p>

              <Link
                href={c.href}
                className="mt-6 inline-flex items-center gap-1 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors"
              >
                Czytaj realizację
                <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
