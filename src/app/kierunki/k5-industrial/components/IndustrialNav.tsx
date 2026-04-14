"use client";

import { useEffect, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

export function IndustrialNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[color:var(--k5-bg)]/85 backdrop-blur-md border-b border-[color:var(--k5-line)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="k5-container flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-5">
          <a href="#" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex items-center justify-center h-8 w-8 border border-[color:var(--k5-line-strong)] bg-[color:var(--k5-surface)]"
            >
              <span
                className="h-2 w-2 rounded-full bg-[color:var(--k5-accent)]"
                style={{ animation: "kierunki-dot 1.4s ease-in-out infinite" }}
              />
            </span>
            <span className="k5-caps text-[14px]">GS ENERGIA</span>
          </a>
          <span className="hidden md:inline h-4 w-px bg-[color:var(--k5-line)]" />
          <span className="hidden md:inline k5-label">SECTOR // ENERGY AUDIT</span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          <a href="#uslugi" className="k5-label hover:text-[color:var(--k5-accent)] transition-colors">
            [01]/USŁUGI
          </a>
          <a href="#proof" className="k5-label hover:text-[color:var(--k5-accent)] transition-colors">
            [02]/PROOF
          </a>
          <a href="#why" className="k5-label hover:text-[color:var(--k5-accent)] transition-colors">
            [03]/METODA
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline k5-mono text-[11px] text-[color:var(--k5-ink)]">
            {SHARED.contact.phone}
          </span>
          <a
            href={SURVEY_URL}
            className="inline-flex items-center gap-2 px-4 h-[38px] bg-[color:var(--k5-accent)] text-[color:var(--k5-bg)] k5-caps text-[11.5px] hover:brightness-110 transition-all"
          >
            KONSULTACJA
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
