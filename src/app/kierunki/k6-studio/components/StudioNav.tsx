"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SURVEY_URL } from "../../_data/content";

export function StudioNav() {
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
          ? "1px solid var(--k6-line)"
          : "1px solid transparent",
      }}
    >
      <div className="k6-container flex items-center justify-between h-[84px]">
        {/* Logo — real GS Energia mark */}
        <a href="#" className="flex items-center gap-3 group" aria-label="GS Energia — strona główna">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full transition-transform group-hover:scale-125"
            style={{ background: "var(--k6-accent)" }}
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
          {[
            { label: "Usługi", href: "#uslugi" },
            { label: "Realizacje", href: "#realizacje" },
            { label: "O nas", href: "#o-nas" },
            { label: "Kontakt", href: "#kontakt" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[color:var(--k6-ink-muted)] hover:text-[color:var(--k6-ink)] transition-colors focus-visible:outline-none focus-visible:text-[color:var(--k6-ink)] focus-visible:underline underline-offset-8"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={SURVEY_URL}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-full border text-[13px] font-medium transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--k6-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--k6-bg)]"
          style={{
            borderColor: "var(--k6-accent)",
            color: "var(--k6-accent)",
          }}
        >
          Porozmawiajmy
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  );
}
