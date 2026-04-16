"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

/**
 * K9 Light navigation — directly inspired by user's HTML mockup.
 * Two-row structure: dark topbar + white main nav.
 * Hover-underline links, right-side search button + green CTA.
 * Search expands as full-width dropdown under nav.
 */

const NAV_LINKS = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Audyt energetyczny", href: "#aep" },
  { label: "EMS / BESS", href: "#bess" },
  { label: "Fotowoltaika", href: "#pv" },
  { label: "ESG & Raportowanie", href: "#dekarbo" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "O nas", href: "#o-nas" },
];

export function LightNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  return (
    <div className="relative z-50">
      {/* ── TOPBAR ── */}
      <div
        className="hidden md:flex items-center justify-end gap-5 h-9 px-[52px]"
        style={{ background: "var(--k9-topbar)" }}
      >
        {[
          { label: "Włączam oszczędność", href: "#uslugi" },
          { label: "Energy Intelligence", href: "#about" },
          { label: SHARED.contact.phone, href: SHARED.contact.phoneHref },
          { label: "Kontakt", href: "#kontakt" },
        ].map((i, idx) => (
          <div key={i.label} className="flex items-center gap-5">
            {idx > 0 && (
              <span
                aria-hidden="true"
                className="text-[10px]"
                style={{ color: "#333" }}
              >
                |
              </span>
            )}
            <a
              href={i.href}
              className="text-[11px] transition-colors"
              style={{ color: "var(--k9-topbar-ink)", letterSpacing: "0.04em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--k9-topbar-ink)")
              }
            >
              {i.label}
            </a>
          </div>
        ))}
      </div>

      {/* ── MAIN NAV ── */}
      <nav
        className="relative flex items-center justify-between h-[66px] px-[52px]"
        style={{
          background: "var(--k9-bg)",
          borderBottom: "1px solid var(--k9-line)",
          boxShadow: "0 1px 14px rgba(0,0,0,.05)",
        }}
      >
        {/* Logo block */}
        <a
          href="#"
          className="flex flex-col gap-[2px] shrink-0"
          aria-label="GS Energia — strona główna"
        >
          <Image
            src="/logos/gs-energia.png"
            alt="GS Energia"
            width={180}
            height={44}
            priority
            className="h-9 w-auto object-contain"
          />
          <span
            className="text-[10.5px] font-medium flex items-center gap-[5px]"
            style={{ color: "var(--k9-accent)" }}
          >
            <span
              aria-hidden="true"
              className="inline-block w-[5px] h-[5px] rounded-full"
              style={{
                background: "var(--k9-accent)",
                animation: "k9-blink 2s infinite",
              }}
            />
            Włączam oszczędność
          </span>
        </a>

        {/* Center links */}
        <div className="hidden md:flex items-stretch h-[66px]">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-center px-4 text-[13.5px] whitespace-nowrap transition-colors border-b-2 border-transparent"
              style={{ color: "var(--k9-ink)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--k9-accent)";
                e.currentTarget.style.borderBottomColor = "var(--k9-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--k9-ink)";
                e.currentTarget.style.borderBottomColor = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side: search + CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="p-2 rounded-md transition-colors"
            style={{ color: "#555" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f5f5f5";
              e.currentTarget.style.color = "var(--k9-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#555";
            }}
            aria-label="Szukaj"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <a
            href={SURVEY_URL}
            className="inline-flex items-center h-10 px-[22px] rounded-[7px] text-[13px] font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: "var(--k9-accent)",
              color: "#fff",
              // @ts-expect-error CSS var
              "--tw-ring-color": "var(--k9-accent)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 18px rgba(22,163,74,.35)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Bezpłatna analiza
          </a>
        </div>

        {/* Expanded search dropdown */}
        {searchOpen && (
          <div
            className="absolute top-full inset-x-0 flex items-center gap-3.5 px-[52px] py-[18px]"
            style={{
              background: "var(--k9-bg)",
              borderBottom: "2px solid var(--k9-accent)",
              boxShadow: "0 8px 32px rgba(0,0,0,.09)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--k9-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Czego szukasz? np. audyt energetyczny, BESS, obniżenie FV..."
              className="flex-1 border-0 outline-none text-[16px] bg-transparent"
              style={{ color: "var(--k9-ink)" }}
            />
            <button
              type="button"
              className="inline-flex items-center h-10 px-6 rounded-[7px] text-[14px] font-semibold whitespace-nowrap"
              style={{ background: "var(--k9-accent)", color: "#fff" }}
            >
              Szukaj
            </button>
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes k9-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
