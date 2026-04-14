"use client";

import { useEffect, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

export function EditorialNav() {
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
          ? "bg-[color:var(--k4-bg)]/92 backdrop-blur-md border-b border-[color:var(--k4-line)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="k4-container flex items-center justify-between h-[80px]">
        <div className="flex items-center gap-6">
          <span className="k4-display text-[22px] tracking-[-0.01em]">
            GS Energia
          </span>
          <span className="hidden md:inline-block h-4 w-px bg-[color:var(--k4-line-strong)]" />
          <span className="hidden md:inline k4-label">2008 — pres.</span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#uslugi"
            className="text-[14px] text-[color:var(--k4-ink)] hover:text-[color:var(--k4-accent)] transition-colors"
          >
            Usługi
          </a>
          <a
            href="#proof"
            className="text-[14px] text-[color:var(--k4-ink)] hover:text-[color:var(--k4-accent)] transition-colors"
          >
            Case
          </a>
          <a
            href="#why"
            className="text-[14px] text-[color:var(--k4-ink)] hover:text-[color:var(--k4-accent)] transition-colors"
          >
            Metoda
          </a>
          <a
            href={SHARED.contact.phoneHref}
            className="k4-mono text-[13px] text-[color:var(--k4-ink)]"
          >
            {SHARED.contact.phone}
          </a>
        </nav>

        <a
          href={SURVEY_URL}
          className="group inline-flex items-center gap-2 k4-label text-[color:var(--k4-ink)] hover:text-[color:var(--k4-accent)] transition-colors"
        >
          Konsultacja
          <span
            aria-hidden="true"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            →
          </span>
        </a>
      </div>
    </header>
  );
}
