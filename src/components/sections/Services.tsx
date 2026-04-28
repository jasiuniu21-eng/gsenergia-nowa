"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

const SERVICES = [
  // ── Strona 1 (8 usług) ──
  {
    img: "/uslugi/01-audyt-przedsiebiorstwa.jpg",
    title: "Audyt Energetyczny Przedsiębiorstwa",
    desc: "Obowiązkowy co 4 lata audyt dla dużych firm.",
    href: "/uslugi/audyt-energetyczny-przedsiebiorstwa",
  },
  {
    img: "/uslugi/02-audyt-efektywnosci.jpg",
    title: "Audyt Efektywności Energetycznej",
    desc: "Identyfikacja oszczędności + białe certyfikaty.",
    href: "/uslugi/audyt-efektywnosci-energetycznej",
  },
  {
    img: "/uslugi/03-bess.png",
    title: "Magazyn Energii / BESS",
    desc: "Dobór mocy, integracja z PV, analiza ROI.",
    href: "/uslugi/aktualne-i-planowane-nabory",
  },
  {
    img: "/uslugi/04-ems.jpg",
    title: "EMS / Telemetria",
    desc: "Inteligentne zarządzanie i monitoring energii.",
    href: "/uslugi",
  },
  {
    img: "/uslugi/05-swiadectwo.jpg",
    title: "Świadectwo Charakterystyki Energetycznej",
    desc: "Pełna dokumentacja energetyczna budynków.",
    href: "/uslugi/audyt-energetyczny-budynku",
  },
  {
    img: "/uslugi/06-spoldzielnie.png",
    title: "Spółdzielnie Energetyczne",
    desc: "Kompleksowe przygotowanie i prowadzenie.",
    href: "/uslugi",
  },
  {
    img: "/uslugi/07-klimatyzacja.jpg",
    title: "Kontrola Klimatyzacji i Ogrzewania",
    desc: "Ocena efektywności systemów HVAC.",
    href: "/uslugi/audyt-energetyczny-wezlow-cieplnych",
  },
  {
    img: "/uslugi/08-dekarbonizacja.jpg",
    title: "Dekarbonizacja",
    desc: "Strategia redukcji CO₂, ślad węglowy, CSRD.",
    href: "/uslugi",
  },
  // ── Strona 2 (7 usług + Pozostałe) ──
  {
    img: "/uslugi/09-ogrzewanie.jpg",
    title: "Kontrola Systemu Ogrzewania",
    desc: "Ocena efektywności kotłów i instalacji.",
    href: "/uslugi/audyt-energetyczny-kotlowni",
  },
  {
    img: "/uslugi/10-kogeneracja.jpg",
    title: "Kogeneracja, Trigeneracja",
    desc: "Audyt, finansowanie i wdrożenie.",
    href: "/uslugi",
  },
  {
    img: "/uslugi/11-wodor.jpg",
    title: "Technologie Wodorowe",
    desc: "Audyt, analiza opłacalności, wdrożenia.",
    href: "/uslugi/audyt-wodorowy",
  },
  {
    img: "/uslugi/12-audyt-budynku.jpg",
    title: "Audyt Energetyczny Budynku",
    desc: "Oświetlenie, elektroenergetyczny, termowizja.",
    href: "/uslugi/audyt-energetyczny-budynku",
  },
  {
    img: "/uslugi/13-chlodniczy.jpg",
    title: "Audyt Chłodniczy",
    desc: "Efektywność urządzeń chłodniczych i klimatyzacji.",
    href: "/uslugi/audyt-chlodniczy",
  },
  {
    img: "/uslugi/14-oze.jpg",
    title: "Odnawialne Źródła Energii",
    desc: "Projektowanie, dobór i nadzór instalacji OZE.",
    href: "/uslugi/audyt-energetyczny-na-cele-oze",
  },
  {
    img: "/uslugi/15-pozostale.jpg",
    title: "Pozostałe usługi",
    desc: "Zobacz pełną listę 65 usług.",
    href: "/uslugi",
    cta: true,
  },
];

const PER_PAGE = 8;
const PAGE_COUNT = Math.ceil(SERVICES.length / PER_PAGE);

export function Services() {
  const reduced = useReducedMotion();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setPage((p) => (p + 1) % PAGE_COUNT);
  };
  const prev = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + PAGE_COUNT) % PAGE_COUNT);
  };

  const slice = SERVICES.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section
      aria-labelledby="services-heading"
      className="relative bg-[oklch(0.16_0.02_150)] text-white border-t border-white/10"
    >
      <div className="container-site relative py-[clamp(4rem,7vw,7rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-[640px]">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#86bc25] mb-3">
              Oferta · {page + 1}/{PAGE_COUNT}
            </p>
            <motion.h2
              id="services-heading"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-balance"
              style={{
                fontSize: "clamp(2.25rem, 3.5vw + 1rem, 3.5rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Wszystkie nasze usługi
              <span style={{ color: "#86bc25" }}>.</span>
            </motion.h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Poprzednia strona usług"
              className="size-11 inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-[#86bc25] hover:text-[#86bc25] transition-colors"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Następna strona usług"
              className="size-11 inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-[#86bc25] hover:text-[#86bc25] transition-colors"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.ul
            key={page}
            initial={reduced ? false : { opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {slice.map((s, i) => (
              <motion.li
                key={s.title}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={s.href}
                  className="group relative block aspect-[4/3] sm:aspect-[5/4] rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-[#86bc25]/60 transition-all"
                >
                  {/* Background image */}
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 group-hover:from-black/90 transition-colors" />

                  {/* Green accent on hover */}
                  <div className="absolute inset-0 bg-[#26890d]/0 group-hover:bg-[#26890d]/15 transition-colors" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="font-display text-[1.1rem] tracking-[-0.01em] text-white leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[0.85rem] text-white/80 leading-tight line-clamp-2">
                      {s.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#86bc25] font-medium">
                      {s.cta ? "Zobacz wszystkie" : "Dowiedz się więcej"}
                      <ArrowUpRight
                        size={12}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Page dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: PAGE_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > page ? 1 : -1);
                setPage(i);
              }}
              aria-label={`Strona ${i + 1} z ${PAGE_COUNT}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-[#86bc25]" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
