"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "hero",         label: "Start" },
  { id: "clients",      label: "Zaufali nam" },
  { id: "services-1",   label: "Oferta 1/2" },
  { id: "services-2",   label: "Oferta 2/2" },
  { id: "cases",        label: "Realizacje" },
  { id: "why-us",       label: "Dlaczego my" },
  { id: "testimonials", label: "Opinie" },
  { id: "how-it-works", label: "Jak działamy" },
  { id: "news",         label: "Aktualności" },
  { id: "newsletter",   label: "Newsletter" },
  { id: "contact",      label: "Kontakt" },
];

/**
 * Fixed vertical dot navigation on the right edge of the viewport.
 * Tracks which section is currently in view via IntersectionObserver and
 * jumps to it on click.
 */
export function ScrollSpy() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const targets = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio (most visible)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Nawigacja sekcji"
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 items-center"
    >
      {SECTIONS.map((s) => {
        const isActive = activeId === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => jumpTo(s.id)}
            aria-label={`Przejdź do sekcji: ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center justify-end p-1"
          >
            {/* Tooltip — appears on hover */}
            <span className="absolute right-full mr-3 whitespace-nowrap bg-black/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {s.label}
            </span>
            {/* Dot */}
            <span
              className={[
                "block rounded-full transition-all duration-300",
                isActive
                  ? "size-3 bg-[#86bc25] ring-2 ring-[#86bc25]/30 ring-offset-2 ring-offset-white"
                  : "size-2 bg-black/25 hover:bg-black/60",
              ].join(" ")}
            />
          </button>
        );
      })}
    </nav>
  );
}
