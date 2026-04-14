"use client";

import { useEffect, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

export function DashboardNav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const tick = () => {
      const d = new Date();
      setTime(
        `${String(d.getHours()).padStart(2, "0")}:${String(
          d.getMinutes(),
        ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[color:var(--k3-bg)]/80 backdrop-blur-md border-b border-[color:var(--k3-line)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="k3-container flex items-center justify-between h-[68px]">
        <div className="flex items-center gap-4">
          <span
            className="flex items-center gap-2 text-[color:var(--k3-accent)] k3-mono text-[10.5px] uppercase tracking-[0.16em]"
          >
            <span
              className="inline-block size-[8px] rounded-full bg-[color:var(--k3-accent)]"
              style={{ animation: "kierunki-dot 1.6s ease-in-out infinite" }}
              aria-hidden="true"
            />
            LIVE
          </span>
          <span className="k3-display text-[18px]">GS Energia</span>
          <span className="hidden md:inline k3-label">/ dashboard v4</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#uslugi" className="k3-label hover:text-[color:var(--k3-ink)] transition-colors">
            [01] Usługi
          </a>
          <a href="#proof" className="k3-label hover:text-[color:var(--k3-ink)] transition-colors">
            [02] Metryki
          </a>
          <a href="#why" className="k3-label hover:text-[color:var(--k3-ink)] transition-colors">
            [03] Metoda
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden md:block k3-mono text-[11px] text-[color:var(--k3-ink-faint)]">
            {time}
          </span>
          <a
            href={SURVEY_URL}
            className="inline-flex items-center gap-2 px-4 h-[36px] rounded-full bg-[color:var(--k3-accent)] text-[color:var(--k3-bg)] k3-mono text-[11px] uppercase tracking-[0.12em] font-semibold hover:brightness-110 transition-all"
          >
            Konsultacja
            <span aria-hidden="true">↗</span>
          </a>
          <span className="hidden sm:block k3-mono text-[11px] text-[color:var(--k3-ink-faint)]">
            {SHARED.contact.phone}
          </span>
        </div>
      </div>
    </header>
  );
}
