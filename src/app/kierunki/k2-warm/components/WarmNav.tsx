"use client";

import { useEffect, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

export function WarmNav() {
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
        "fixed top-0 inset-x-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-[color:var(--k2-bg)]/90 backdrop-blur-md border-b border-[color:var(--k2-line)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="k2-container flex items-center justify-between h-[72px]">
        <a href="#" className="flex items-center gap-2.5 group">
          <span
            className="flex items-center justify-center h-9 w-9 rounded-full border border-[color:var(--k2-line-strong)] text-[color:var(--k2-ink)] group-hover:border-[color:var(--k2-accent)] transition-colors"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M12 7 L12 12 L16 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="k2-display text-[22px] tracking-[-0.01em]">
            GS <span className="k2-italic text-[color:var(--k2-accent)]">Energia</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#uslugi"
            className="text-[14px] text-[color:var(--k2-ink)] hover:text-[color:var(--k2-accent)] transition-colors"
          >
            Usługi
          </a>
          <a
            href="#proof"
            className="text-[14px] text-[color:var(--k2-ink)] hover:text-[color:var(--k2-accent)] transition-colors"
          >
            Realizacje
          </a>
          <a
            href="#why"
            className="text-[14px] text-[color:var(--k2-ink)] hover:text-[color:var(--k2-accent)] transition-colors"
          >
            O nas
          </a>
          <span className="h-5 w-px bg-[color:var(--k2-line-strong)]" />
          <a
            href={SHARED.contact.phoneHref}
            className="k2-mono text-[13px] text-[color:var(--k2-ink)]"
          >
            {SHARED.contact.phone}
          </a>
        </nav>

        <a
          href={SURVEY_URL}
          className="inline-flex items-center gap-2 px-5 h-[42px] rounded-full bg-[color:var(--k2-ink)] text-[color:var(--k2-bg)] text-[13px] font-medium hover:bg-[color:var(--k2-accent)] transition-colors"
        >
          Bezpłatna konsultacja
          <span aria-hidden="true" className="text-[11px]">↗</span>
        </a>
      </div>
    </header>
  );
}
