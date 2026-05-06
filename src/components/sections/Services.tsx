"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Service = {
  img: string;
  title: string;
  subtitle?: string;
  href: string;
};

// 15 services — gsenergia.pl style oferta with our generated images
const SERVICES: Service[] = [
  // ── Strona 1 (9 usług) ──
  {
    img: "/uslugi/01-audyt-przedsiebiorstwa.png",
    title: "Audyt Energetyczny Przedsiębiorstwa",
    href: "/uslugi/audyt-energetyczny-przedsiebiorstwa",
  },
  {
    img: "/uslugi/02-audyt-efektywnosci.png",
    title: "Audyt Efektywności Energetycznej",
    href: "/uslugi/audyt-efektywnosci-energetycznej",
  },
  {
    img: "/uslugi/03-bess.png",
    title: "Magazyn Energii / BESS",
    href: "/uslugi/aktualne-i-planowane-nabory",
  },
  {
    img: "/uslugi/04-ems.png",
    title: "EMS / Telemetria",
    subtitle: "Inteligentne zarządzanie i monitorowanie energii",
    href: "/uslugi",
  },
  {
    img: "/uslugi/05-swiadectwo.png",
    title: "Świadectwo Charakterystyki Energetycznej",
    href: "/uslugi/audyt-energetyczny-budynku",
  },
  {
    img: "/uslugi/06-spoldzielnie.png",
    title: "Spółdzielnie Energetyczne",
    subtitle: "Kompleksowe przygotowanie i prowadzenie spółdzielni energetycznych",
    href: "/uslugi",
  },
  {
    img: "/uslugi/07-klimatyzacja.png",
    title: "Kontrola Systemu Klimatyzacji i Ogrzewania",
    subtitle: "Ocena Efektywności Energetycznej Klimatyzacji",
    href: "/uslugi/audyt-energetyczny-wezlow-cieplnych",
  },
  {
    img: "/uslugi/08-dekarbonizacja.png",
    title: "Dekarbonizacja",
    href: "/uslugi",
  },
  {
    img: "/uslugi/09-ogrzewanie.png",
    title: "Wsparcie w pozyskiwaniu funduszy",
    subtitle: "Kredyt Ekologiczny, FENIKS, Krajowy Plan Odbudowy",
    href: "/uslugi/aktualne-i-planowane-nabory",
  },
  // ── Strona 2 (6 usług + Pozostałe) ──
  {
    img: "/uslugi/10-kogeneracja.png",
    title: "Kogeneracja, Trigeneracja, Mikrokogeneracja",
    subtitle: "Audyt, finansowanie, wdrożenie",
    href: "/uslugi",
  },
  {
    img: "/uslugi/11-wodor.png",
    title: "Technologie Wodorowe",
    href: "/uslugi/audyt-wodorowy",
  },
  {
    img: "/uslugi/12-audyt-budynku.png",
    title: "Audyt Energetyczny",
    subtitle: "Oświetlenia, elektroenergetyczny",
    href: "/uslugi/audyt-energetyczny-budynku",
  },
  {
    img: "/uslugi/13-chlodniczy.png",
    title: "Audyt Chłodniczy",
    subtitle: "Efektywność Energetyczna Urządzeń Chłodniczych i Klimatyzacji",
    href: "/uslugi/audyt-chlodniczy",
  },
  {
    img: "/uslugi/14-oze.png",
    title: "Odnawialne Źródła Energii",
    subtitle: "Projektowanie, montaż",
    href: "/uslugi/audyt-energetyczny-na-cele-oze",
  },
  {
    img: "/uslugi/15-pozostale.png",
    title: "Pozostałe usługi",
    subtitle: "Zobacz pełną listę 65 usług",
    href: "/uslugi",
  },
];

const PER_PAGE = 9; // 3×3 grid like gsenergia.pl reference
const PAGE_COUNT = Math.ceil(SERVICES.length / PER_PAGE);

export function Services() {
  const reduced = useReducedMotion();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const slice = SERVICES.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section
      aria-labelledby="services-heading"
      className="relative bg-black text-white"
    >
      {/* ── Black header bar — "Oferta." + page indicator ── */}
      <div className="relative w-full bg-black border-b border-white/5">
        <div className="container-site flex items-center justify-between py-7 lg:py-9">
          <motion.h2
            id="services-heading"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white"
            style={{
              fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            Oferta<span style={{ color: "#86bc25" }}>.</span>
          </motion.h2>
          <span className="font-mono text-[0.95rem] text-white/70 tabular-nums">
            {page + 1}/{PAGE_COUNT}
          </span>
        </div>
      </div>

      {/* ── 3×3 grid of tiles + vertical dot pagination ── */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.ul
            key={page}
            initial={reduced ? false : { opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0"
          >
            {slice.map((s, i) => (
              <motion.li
                key={s.title}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={s.href}
                  itemProp="url"
                  className="group relative block aspect-[16/10] overflow-hidden border-b border-r border-white/5"
                >
                  {/* Background image — grayscale by default, color on hover */}
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale brightness-[0.55] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-[1.04]"
                  />

                  {/* Subtle dark overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10 transition-opacity duration-500 group-hover:opacity-70" />

                  {/* Content — top-left, like reference */}
                  <div className="absolute inset-0 flex items-start p-7 lg:p-9">
                    <div className="max-w-[26ch]">
                      <h3
                        className="font-display text-white leading-[1.1]"
                        style={{
                          fontSize: "clamp(1.25rem, 1.5vw + 0.5rem, 1.85rem)",
                          fontWeight: 500,
                          letterSpacing: "-0.015em",
                        }}
                        itemProp="name"
                      >
                        {s.title}
                      </h3>
                      {s.subtitle && (
                        <p
                          className="mt-2 text-white/80 text-[0.92rem] leading-snug"
                          itemProp="description"
                        >
                          {s.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Vertical dot pagination on right edge */}
        {PAGE_COUNT > 1 && (
          <div className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > page ? 1 : -1);
                  setPage(i);
                }}
                aria-label={`Strona ${i + 1} z ${PAGE_COUNT}`}
                className={`size-2.5 rounded-full transition-all ${
                  i === page
                    ? "bg-[#86bc25] ring-2 ring-[#86bc25]/30 ring-offset-2 ring-offset-black"
                    : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
