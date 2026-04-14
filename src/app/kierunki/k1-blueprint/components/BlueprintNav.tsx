"use client";

import { useEffect, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

export function BlueprintNav() {
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
          ? "bg-[color:var(--k1-bg)]/92 backdrop-blur-md border-b border-[color:var(--k1-line)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="k1-container flex items-center justify-between h-[64px]">
        {/* Left: drawing-title block */}
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="k1-display text-[17px] font-semibold tracking-[-0.02em]">
              GS Energia
            </span>
            <span className="k1-mono text-[10px] text-[color:var(--k1-ink-faint)]">
              /
            </span>
            <span className="k1-mono text-[10px] text-[color:var(--k1-ink-faint)] uppercase tracking-[0.18em]">
              DWG-GSE-HERO-01
            </span>
          </div>
        </div>

        {/* Right: minimal nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#uslugi"
            className="k1-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--k1-ink-muted)] hover:text-[color:var(--k1-ink)] transition-colors"
          >
            01 · Usługi
          </a>
          <a
            href="#proof"
            className="k1-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--k1-ink-muted)] hover:text-[color:var(--k1-ink)] transition-colors"
          >
            02 · Realizacje
          </a>
          <a
            href="#why"
            className="k1-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--k1-ink-muted)] hover:text-[color:var(--k1-ink)] transition-colors"
          >
            03 · Metoda
          </a>
          <a
            href={SHARED.contact.phoneHref}
            className="k1-mono text-[11px] text-[color:var(--k1-ink)] tracking-[0.02em]"
          >
            {SHARED.contact.phone}
          </a>
        </nav>

        {/* CTA */}
        <a
          href={SURVEY_URL}
          className="inline-flex items-center gap-2 px-4 h-[36px] bg-[color:var(--k1-ink)] text-[color:var(--k1-bg)] text-[12px] k1-mono uppercase tracking-[0.12em]"
        >
          Wycena 48h
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      {/* Spec ticks */}
      <div className="k1-container">
        <div className="k1-ticks h-[3px]" aria-hidden="true" />
      </div>
    </header>
  );
}
