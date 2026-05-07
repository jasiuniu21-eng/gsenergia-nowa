"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const CASES = [
  {
    client: "PGE GiEK · Elektrownia Turów",
    location: "Bogatynia",
    sector: "Energetyka",
    metric: "−18%",
    metricLabel: "zużycia energii",
    savings: "systemy chłodnicze",
    roi: "< 14 mies.",
    href: "/realizacje/2895-2",
  },
  {
    client: "BSH Sprzęt Gospodarstwa Domowego",
    location: "Łódź",
    sector: "Produkcja AGD",
    metric: "−27%",
    metricLabel: "sprężone powietrze",
    savings: "redukcja strat",
    roi: "< 18 mies.",
    href: "/realizacje",
  },
  {
    client: "Shell Polska",
    location: "Cała Polska",
    sector: "Sieć stacji paliw",
    metric: "360°",
    metricLabel: "monitoring mediów",
    savings: "setki obiektów",
    roi: "Real-time",
    href: "/realizacje/telemetria",
  },
  {
    client: "Skanska",
    location: "Warszawa",
    sector: "Budownictwo komercyjne",
    metric: "−22%",
    metricLabel: "OPEX budynku",
    savings: "termomodernizacja",
    roi: "ESG/CSRD",
    href: "/realizacje",
  },
  {
    client: "ZF Friedrichshafen",
    location: "Bielsko-Biała",
    sector: "Motoryzacja",
    metric: "ISO 50001",
    metricLabel: "wdrożenie + cert.",
    savings: "system zarządz.",
    roi: "Certyfikat",
    href: "/realizacje",
  },
  {
    client: "Kaufland Polska",
    location: "Sieć krajowa",
    sector: "Retail",
    metric: "Świadectwa",
    metricLabel: "charakt. energet.",
    savings: "HVAC + oświetlenie",
    roi: "Compliance",
    href: "/realizacje",
  },
] as const;

export function CaseStudies() {
  const reduced = useReducedMotion();

  return (
    <section
      id="cases"
      aria-labelledby="cases-heading"
      className="bg-[#f7f6f1] border-t border-black/8"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--c-brand-500)] mb-3">
              Realizacje
            </p>
            <motion.h2
              id="cases-heading"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[#1a1a18] leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)", fontWeight: 700 }}
            >
              Liczby, nie obietnice
            </motion.h2>
          </div>
          <Link
            href="/realizacje"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--c-brand-600)] hover:text-[color:var(--c-brand-700)] transition-colors"
          >
            Wszystkie realizacje <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASES.map((c, i) => (
            <motion.article
              key={c.client}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-6 hover:border-[color:var(--c-brand-300)] hover:shadow-[0_20px_48px_-16px_rgba(38,137,13,0.20)] transition-colors"
            >
              {/* Top: location + sector */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--c-fg-subtle)]">
                  {c.sector}
                </p>
                <p className="text-[11px] text-[color:var(--c-fg-subtle)]">{c.location}</p>
              </div>

              {/* BIG metric — first thing visible */}
              <div className="mb-4 pb-4 border-b border-black/8">
                <p
                  className="font-display text-[color:var(--c-brand-500)] leading-none tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800 }}
                >
                  {c.metric}
                </p>
                <p className="text-sm text-[color:var(--c-fg-muted)] mt-1">{c.metricLabel}</p>
              </div>

              {/* Client name */}
              <h3 className="font-display font-semibold text-[#1a1a18] text-lg leading-snug mb-2">
                {c.client}
              </h3>

              {/* Meta row */}
              <div className="flex items-center gap-3 mt-auto pt-4">
                <span className="text-xs text-[color:var(--c-fg-subtle)]">{c.savings}</span>
                <span className="text-black/20">·</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--c-brand-500)" }}
                >
                  ROI {c.roi}
                </span>
                <Link
                  href={c.href}
                  className="ml-auto text-[color:var(--c-fg-subtle)] group-hover:text-[color:var(--c-brand-500)] transition-colors"
                  aria-label={`Zobacz realizację: ${c.client}`}
                >
                  <ArrowUpRight size={15} weight="bold" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
