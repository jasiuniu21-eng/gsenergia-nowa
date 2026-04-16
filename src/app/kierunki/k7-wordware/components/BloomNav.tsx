"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SHARED, SURVEY_URL } from "../../_data/content";

export function BloomNav() {
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
        background: scrolled ? "oklch(0.08 0.005 145 / 0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--k7-line)"
          : "1px solid transparent",
      }}
    >
      <div className="k7-container flex items-center justify-between h-[84px]">
        {/* Logo — real GS Energia mark */}
        <a href="#" className="flex items-center gap-3 group" aria-label="GS Energia — strona główna">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full transition-transform group-hover:scale-125"
            style={{ background: "var(--k7-accent)" }}
          />
          <Image
            src="/logos/gs-energia-white.png"
            alt="GS Energia"
            width={240}
            height={56}
            priority
            className="h-12 lg:h-14 w-auto object-contain"
          />
        </a>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Usługi — with hover dropdown */}
          <div className="relative group h-[84px] flex items-center">
            <a
              href="#uslugi"
              className="inline-flex items-center gap-1.5 text-[14px] text-[color:var(--k7-ink-muted)] hover:text-[color:var(--k7-ink)] transition-colors focus-visible:outline-none focus-visible:text-[color:var(--k7-ink)] group-hover:text-[color:var(--k7-ink)]"
              aria-haspopup="true"
            >
              Usługi
              <span
                aria-hidden="true"
                className="inline-block text-[10px] transition-transform duration-200 group-hover:rotate-180"
              >
                ▾
              </span>
            </a>

            {/* Dropdown */}
            <div
              className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto focus-within:pointer-events-auto"
              role="menu"
            >
              <div
                className="w-[460px] rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden"
                style={{
                  background: "oklch(0.11 0.006 145 / 0.96)",
                  borderColor: "var(--k7-line-strong)",
                  boxShadow:
                    "0 32px 64px -12px oklch(0 0 0 / 0.8), 0 0 40px oklch(0.88 0.22 140 / 0.08)",
                }}
              >
                {/* Header */}
                <div
                  className="px-6 py-4 border-b"
                  style={{ borderColor: "var(--k7-line)" }}
                >
                  <p
                    className="k7-mono text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--k7-accent)" }}
                  >
                    // Siedem dziedzin
                  </p>
                </div>

                {/* List */}
                <ul className="py-2">
                  {SHARED.services.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        role="menuitem"
                        className="group/item flex items-baseline gap-4 px-6 py-3 transition-colors hover:bg-[color:var(--k7-bg-elevated)] focus-visible:outline-none focus-visible:bg-[color:var(--k7-bg-elevated)]"
                      >
                        <span
                          className="k7-serif italic text-[18px] leading-none shrink-0 w-6"
                          style={{ color: "var(--k7-accent-dim)" }}
                        >
                          {s.n}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[14px] font-medium text-[color:var(--k7-ink)] group-hover/item:text-[color:var(--k7-accent)] transition-colors">
                            {s.title}
                          </span>
                          <span className="block text-[12px] text-[color:var(--k7-ink-faint)] leading-[1.4] mt-0.5">
                            {s.short}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="k7-mono text-[11px] shrink-0 whitespace-nowrap"
                          style={{ color: "var(--k7-accent)" }}
                        >
                          {s.metric}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Footer CTA */}
                <div
                  className="px-6 py-4 border-t"
                  style={{
                    borderColor: "var(--k7-line)",
                    background: "var(--k7-bg)",
                  }}
                >
                  <a
                    href={SURVEY_URL}
                    className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors"
                    style={{ color: "var(--k7-accent)" }}
                  >
                    Nie wiesz co wybrać? Porozmawiajmy
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Other links */}
          {[
            { label: "Realizacje", href: "#realizacje" },
            { label: "O nas", href: "#o-nas" },
            { label: "Kontakt", href: "#kontakt" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[color:var(--k7-ink-muted)] hover:text-[color:var(--k7-ink)] transition-colors focus-visible:outline-none focus-visible:text-[color:var(--k7-ink)] focus-visible:underline underline-offset-8"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={SURVEY_URL}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-full border text-[13px] font-medium transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--k7-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--k7-bg)]"
          style={{
            borderColor: "var(--k7-accent)",
            color: "var(--k7-accent)",
          }}
        >
          Porozmawiajmy
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  );
}
