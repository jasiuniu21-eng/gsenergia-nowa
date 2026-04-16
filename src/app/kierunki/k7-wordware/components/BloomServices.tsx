"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

/**
 * Detailed breakdowns per service — shown when row is expanded.
 * 3 bullet points each — scope / methodology / output.
 */
const DETAILS: Record<string, string[]> = {
  aep: [
    "Pomiary klasy A w zakładzie 7–14 dni, analizatory IEC 61000-4-30",
    "Raport z wykazem środków poprawy efektywności (SPE) i obliczonym ROI per pozycja",
    "Zgłoszenie wyników do URE — pełne wsparcie prawne",
  ],
  aee: [
    "Kwantyfikacja oszczędności metodą IPMVP (M&V protocol)",
    "Obliczenie liczby świadectw efektywności energetycznej (białe certyfikaty)",
    "Wniosek do URE + sprzedaż certyfikatów na TGE",
  ],
  chlodniczy: [
    "Pomiary COP/EER agregatów, analiza czynników chłodniczych (F-gazy)",
    "Audyt strat w systemach dystrybucji wody lodowej i czynnika",
    "Rekomendacje pod PN-EN 378 + plan zgodności z F-gas regulation",
  ],
  wodorowy: [
    "Ocena gotowości zakładu (ATEX, materiały, wentylacja, bezpieczeństwo)",
    "Analiza LCOH i kalkulacja CAPEX/OPEX elektrolizera",
    "Roadmap integracji z OZE i siecią przesyłową",
  ],
  ems: [
    "Architektura systemu EMS — liczniki, protokół (Modbus/BACnet/OPC-UA)",
    "Integracja z istniejącą infrastrukturą SCADA/BMS",
    "Dashboard + alerty + cykliczne raporty zgodne z ISO 50001",
  ],
  bess: [
    "Dobór pojemności i mocy BESS pod profil zużycia zakładu",
    "Optymalizacja taryf, peak shaving, udział w DSR/rynku mocy",
    "Projekt wykonawczy, dobór PCS, integracja z siecią",
  ],
  dekarbo: [
    "Audyt emisji Scope 1, 2, 3 zgodny z GHG Protocol",
    "Ścieżka do Net Zero z kamieniami milowymi (SBTi)",
    "Raport CSRD — ESRS E1 + wsparcie przy zielonym finansowaniu",
  ],
};

export function BloomServices() {
  const reduced = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(SHARED.services[0].id);

  return (
    <section id="uslugi" className="relative py-32 lg:py-40">
      <div className="k7-container">
        {/* Section header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-[20ch]"
        >
          <h2 className="k7-display text-[clamp(2.5rem,1.5rem+3vw,5rem)] leading-[1]">
            Siedem
            <br />
            dziedzin.
            <br />
            <em className="italic" style={{ color: "var(--k7-accent)" }}>
              Kliknij, żeby rozwinąć.
            </em>
          </h2>
        </motion.div>

        {/* Accordion list */}
        <ul
          className="border-t"
          style={{ borderColor: "var(--k7-line-strong)" }}
        >
          {SHARED.services.map((s) => {
            const isOpen = openId === s.id;
            return (
              <motion.li
                key={s.id}
                layout={!reduced}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="border-b"
                style={{ borderColor: "var(--k7-line)" }}
              >
                {/* Header row — always visible, clickable */}
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : s.id)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${s.id}`}
                  className="group w-full text-left py-8 lg:py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--k7-accent)] rounded-sm"
                >
                  <div className="grid grid-cols-[60px_1fr_auto] lg:grid-cols-[100px_1fr_auto] gap-6 lg:gap-12 items-baseline">
                    {/* Index */}
                    <span
                      className="k7-serif italic text-[28px] lg:text-[48px] leading-none transition-colors"
                      style={{
                        color: isOpen
                          ? "var(--k7-accent)"
                          : "var(--k7-accent-dim)",
                      }}
                    >
                      {s.n}
                    </span>

                    {/* Title + short */}
                    <div className="min-w-0">
                      <h3
                        className="k7-display text-[clamp(1.75rem,1rem+2vw,3rem)] leading-[1.05] transition-colors"
                        style={{
                          color: isOpen
                            ? "var(--k7-accent)"
                            : "var(--k7-ink)",
                        }}
                      >
                        {s.title}
                      </h3>
                      {!isOpen && (
                        <p className="mt-2 text-[15px] lg:text-[17px] text-[color:var(--k7-ink-muted)] leading-[1.5] max-w-[60ch]">
                          {s.short}
                        </p>
                      )}
                    </div>

                    {/* Toggle icon — animated + / × */}
                    <span
                      className="relative inline-flex items-center justify-center w-11 h-11 rounded-full border transition-all group-hover:scale-110"
                      style={{
                        borderColor: isOpen
                          ? "var(--k7-accent)"
                          : "var(--k7-line-strong)",
                        color: isOpen
                          ? "var(--k7-accent)"
                          : "var(--k7-ink-muted)",
                        background: isOpen
                          ? "oklch(0.72 0.19 145 / 0.08)"
                          : "transparent",
                      }}
                      aria-hidden="true"
                    >
                      {/* Horizontal bar (always visible) */}
                      <span
                        className="absolute w-[14px] h-[2px] rounded-full"
                        style={{ background: "currentColor" }}
                      />
                      {/* Vertical bar — rotates out when open */}
                      <span
                        className="absolute w-[14px] h-[2px] rounded-full transition-transform duration-300"
                        style={{
                          background: "currentColor",
                          transform: isOpen
                            ? "rotate(90deg) scaleX(0)"
                            : "rotate(90deg) scaleX(1)",
                        }}
                      />
                    </span>
                  </div>
                </button>

                {/* Expandable panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-panel-${s.id}`}
                      initial={
                        reduced
                          ? undefined
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reduced ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{
                        height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.3, delay: 0.08 },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_auto] gap-6 lg:gap-12 pb-10 lg:pb-12">
                        {/* Empty cell to align with grid */}
                        <div aria-hidden="true" className="hidden lg:block" />

                        {/* Content */}
                        <div className="max-w-[64ch]">
                          <p className="text-[16px] lg:text-[18px] text-[color:var(--k7-ink)] leading-[1.55] mb-6">
                            {s.body}
                          </p>

                          <ul className="space-y-3 mb-8">
                            {(DETAILS[s.id] ?? []).map((d) => (
                              <li
                                key={d}
                                className="flex gap-3 text-[14px] lg:text-[15px] text-[color:var(--k7-ink-muted)] leading-[1.5]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="k7-mono text-[12px] shrink-0 mt-1"
                                  style={{ color: "var(--k7-accent)" }}
                                >
                                  ─
                                </span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>

                          <a
                            href={SURVEY_URL}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-[14px] font-medium transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--k7-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--k7-bg)]"
                            style={{
                              background: "var(--k7-accent)",
                              color: "var(--k7-bg)",
                            }}
                          >
                            Zamów tę usługę
                            <span aria-hidden="true">→</span>
                          </a>
                        </div>

                        {/* Metric — right aligned on desktop */}
                        <div className="flex items-start lg:justify-end">
                          <div
                            className="inline-flex flex-col items-start lg:items-end gap-1 p-4 lg:p-5 rounded-lg border"
                            style={{
                              background: "var(--k7-bg-elevated)",
                              borderColor: "var(--k7-line-strong)",
                            }}
                          >
                            <span
                              className="k7-display text-[36px] lg:text-[44px] leading-none"
                              style={{ color: "var(--k7-accent)" }}
                            >
                              {s.metric}
                            </span>
                            <span className="k7-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--k7-ink-faint)]">
                              {s.metricLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        {/* Helper hint under list */}
        <p className="mt-10 text-[13px] text-[color:var(--k7-ink-faint)] k7-mono text-center">
          Kliknij dowolny wiersz, żeby zobaczyć szczegóły · jedno otwarte na raz
        </p>
      </div>
    </section>
  );
}
