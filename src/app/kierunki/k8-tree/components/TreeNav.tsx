"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

/**
 * DEKRA-style two-tier navigation:
 *   Row 1 (utility bar): small text, right-aligned — Kontakt, telefon
 *   Row 2 (main nav):    big logo left + top-level [Klient biznesowy ▾ | Klient indywidualny ▾ | O GS Energia ▾] + CTA
 * Hover on top-level opens a full mega-menu panel.
 */

const B2B_COLUMNS = [
  {
    header: "Audyty energetyczne",
    items: [
      { label: "Audyt Energetyczny Przedsiębiorstwa", href: "#aep" },
      { label: "Audyt Efektywności Energetycznej", href: "#aee" },
      { label: "Audyt Chłodniczy", href: "#chlodniczy" },
      { label: "Audyt Wodorowy", href: "#wodorowy" },
    ],
  },
  {
    header: "Systemy i inwestycje",
    items: [
      { label: "EMS / Telemetria", href: "#ems" },
      { label: "Magazyn Energii / BESS", href: "#bess" },
      { label: "Dekarbonizacja & CSRD", href: "#dekarbo" },
    ],
  },
  {
    header: "Dla kogo",
    items: [
      { label: "Przemysł spożywczy", href: "#uslugi" },
      { label: "Automotive", href: "#uslugi" },
      { label: "Chemia & farmaceutyka", href: "#uslugi" },
      { label: "Data center / IT", href: "#uslugi" },
    ],
  },
];

const B2C_ITEMS = [
  { label: "Świadectwo energetyczne — mieszkanie", href: "#swiadectwa" },
  { label: "Świadectwo energetyczne — dom", href: "#swiadectwa" },
  { label: "Audyt budynku — Czyste Powietrze", href: "#swiadectwa" },
];

const ABOUT_ITEMS = [
  { label: "O nas — 18 lat w branży", href: "#o-nas" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Blog", href: "#blog" },
  { label: "Kariera", href: "#kariera" },
];

export function TreeNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-40 transition-[background,border-color,backdrop-filter] duration-300"
      style={{
        background: scrolled ? "oklch(0.08 0.005 145 / 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--k8-line)"
          : "1px solid transparent",
      }}
    >
      {/* ── UTILITY BAR (row 1) ─────────────────────────────────────── */}
      <div
        className="hidden md:block border-b"
        style={{ borderColor: "var(--k8-line)" }}
      >
        <div className="k8-container flex items-center justify-end h-8 gap-6 k8-mono text-[11px] text-[color:var(--k8-ink-faint)]">
          <a
            href={SHARED.contact.phoneHref}
            className="hover:text-[color:var(--k8-accent)] transition-colors"
          >
            {SHARED.contact.phone}
          </a>
          <span aria-hidden="true" className="opacity-30">|</span>
          <a
            href="#kontakt"
            className="hover:text-[color:var(--k8-accent)] transition-colors"
          >
            Kontakt
          </a>
          <span aria-hidden="true" className="opacity-30">|</span>
          <a
            href="#kariera"
            className="hover:text-[color:var(--k8-accent)] transition-colors"
          >
            Kariera
          </a>
          <span aria-hidden="true" className="opacity-30">|</span>
          <span className="text-[color:var(--k8-ink-muted)]">PL</span>
        </div>
      </div>

      {/* ── MAIN NAV (row 2) ────────────────────────────────────────── */}
      <div className="k8-container flex items-center justify-between h-[88px] lg:h-[96px]">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group shrink-0"
          aria-label="GS Energia — strona główna"
        >
          <Image
            src="/logos/gs-energia-white.png"
            alt="GS Energia"
            width={300}
            height={72}
            priority
            className="h-12 lg:h-16 w-auto object-contain"
          />
        </a>

        {/* Top-level categories */}
        <div className="hidden md:flex items-center">
          <MegaMenu
            label="Klient biznesowy"
            columns={B2B_COLUMNS}
            ctaLabel="Nie wiesz co wybrać? Napisz do nas"
            ctaHref={SURVEY_URL}
          />
          <SimpleMenu label="Klient indywidualny" items={B2C_ITEMS} />
          <SimpleMenu label="O GS Energia" items={ABOUT_ITEMS} />
        </div>

        {/* Right CTA */}
        <a
          href={SURVEY_URL}
          className="hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-full border text-[13px] font-medium transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--k8-accent)]"
          style={{
            borderColor: "var(--k8-accent)",
            color: "var(--k8-accent)",
          }}
        >
          Bezpłatna wycena
          <span aria-hidden="true">→</span>
        </a>

        {/* Mobile hamburger (very simple, just links to #uslugi) */}
        <a
          href="#uslugi"
          className="md:hidden inline-flex items-center gap-2 h-10 px-4 rounded-full border text-[12px]"
          style={{
            borderColor: "var(--k8-accent)",
            color: "var(--k8-accent)",
          }}
        >
          Menu
        </a>
      </div>
    </nav>
  );
}

/* ─── MEGA-MENU (Klient biznesowy) ───────────────────────────────── */

function MegaMenu({
  label,
  columns,
  ctaLabel,
  ctaHref,
}: {
  label: string;
  columns: typeof B2B_COLUMNS;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="relative group h-[88px] lg:h-[96px] flex items-center">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-4 h-full text-[14px] text-[color:var(--k8-ink-muted)] hover:text-[color:var(--k8-ink)] group-hover:text-[color:var(--k8-ink)] transition-colors focus-visible:outline-none focus-visible:text-[color:var(--k8-ink)]"
        aria-haspopup="true"
      >
        {label}
        <span
          aria-hidden="true"
          className="inline-block text-[10px] transition-transform duration-200 group-hover:rotate-180"
        >
          ▾
        </span>
      </button>

      {/* Full-width mega-menu panel — anchored to nav, stretches wide */}
      <div
        className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto focus-within:pointer-events-auto"
        role="menu"
      >
        <div
          className="w-[min(900px,90vw)] rounded-2xl border shadow-2xl overflow-hidden"
          style={{
            background: "oklch(0.11 0.006 145 / 0.98)",
            backdropFilter: "blur(20px) saturate(140%)",
            borderColor: "var(--k8-line-strong)",
            boxShadow:
              "0 32px 64px -12px oklch(0 0 0 / 0.8), 0 0 40px oklch(0.72 0.19 145 / 0.08)",
          }}
        >
          {/* 3 columns */}
          <div className="grid grid-cols-3 gap-0">
            {columns.map((col) => (
              <div
                key={col.header}
                className="p-7 border-r"
                style={{ borderColor: "var(--k8-line)" }}
              >
                <p
                  className="k8-mono text-[10px] tracking-[0.18em] uppercase mb-4 pb-3 border-b"
                  style={{
                    color: "var(--k8-accent)",
                    borderColor: "var(--k8-line)",
                  }}
                >
                  // {col.header}
                </p>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item.label + item.href}>
                      <a
                        href={item.href}
                        role="menuitem"
                        className="group/item flex items-center gap-2 text-[13.5px] text-[color:var(--k8-ink)] hover:text-[color:var(--k8-accent)] transition-colors"
                      >
                        <span
                          aria-hidden="true"
                          className="inline-block w-3 opacity-0 -ml-3 group-hover/item:opacity-100 group-hover/item:ml-0 transition-all"
                          style={{ color: "var(--k8-accent)" }}
                        >
                          →
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer CTA strip */}
          <div
            className="px-7 py-4 border-t flex items-center justify-between"
            style={{
              borderColor: "var(--k8-line)",
              background: "var(--k8-bg)",
            }}
          >
            <p className="k8-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--k8-ink-faint)]">
              Dla przemysłu · 7 dziedzin · 400+ audytów od 2008
            </p>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors"
              style={{ color: "var(--k8-accent)" }}
            >
              {ctaLabel}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SIMPLE DROPDOWN (Klient indywidualny, O GS Energia) ───────── */

function SimpleMenu({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="relative group h-[88px] lg:h-[96px] flex items-center">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-4 h-full text-[14px] text-[color:var(--k8-ink-muted)] hover:text-[color:var(--k8-ink)] group-hover:text-[color:var(--k8-ink)] transition-colors focus-visible:outline-none focus-visible:text-[color:var(--k8-ink)]"
        aria-haspopup="true"
      >
        {label}
        <span
          aria-hidden="true"
          className="inline-block text-[10px] transition-transform duration-200 group-hover:rotate-180"
        >
          ▾
        </span>
      </button>

      <div
        className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto focus-within:pointer-events-auto"
        role="menu"
      >
        <div
          className="w-[320px] rounded-xl border shadow-2xl overflow-hidden"
          style={{
            background: "oklch(0.11 0.006 145 / 0.98)",
            backdropFilter: "blur(20px) saturate(140%)",
            borderColor: "var(--k8-line-strong)",
            boxShadow: "0 24px 48px -12px oklch(0 0 0 / 0.8)",
          }}
        >
          <ul className="py-2">
            {items.map((item) => (
              <li key={item.label + item.href}>
                <a
                  href={item.href}
                  role="menuitem"
                  className="group/item flex items-center gap-2 px-5 py-3 text-[13.5px] text-[color:var(--k8-ink)] hover:text-[color:var(--k8-accent)] hover:bg-[color:var(--k8-bg-elevated)] transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block w-3 opacity-0 -ml-3 group-hover/item:opacity-100 group-hover/item:ml-0 transition-all"
                    style={{ color: "var(--k8-accent)" }}
                  >
                    →
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
