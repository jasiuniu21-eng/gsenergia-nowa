"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Service = {
  img: string;
  title: string;
  subtitle?: string;
  href: string;
};

const PAGE_1: Service[] = [
  { img: "/uslugi/01-audyt-przedsiebiorstwa.png", title: "Audyt Energetyczny Przedsiębiorstwa", href: "/uslugi/audyt-energetyczny-przedsiebiorstwa" },
  { img: "/uslugi/02-audyt-efektywnosci.png", title: "Audyt Efektywności Energetycznej", href: "/uslugi/audyt-efektywnosci-energetycznej" },
  { img: "/uslugi/03-bess.png", title: "Magazyn Energii / BESS", href: "/uslugi/aktualne-i-planowane-nabory" },
  { img: "/uslugi/04-ems.png", title: "EMS / Telemetria", subtitle: "Inteligentne zarządzanie i monitorowanie energii", href: "/uslugi" },
  { img: "/uslugi/05-swiadectwo.png", title: "Świadectwo Charakterystyki Energetycznej", href: "/uslugi/audyt-energetyczny-budynku" },
  { img: "/uslugi/06-spoldzielnie.png", title: "Spółdzielnie Energetyczne", subtitle: "Kompleksowe przygotowanie i prowadzenie spółdzielni energetycznych", href: "/uslugi" },
  { img: "/uslugi/07-klimatyzacja.png", title: "Kontrola Systemu Klimatyzacji i Ogrzewania", subtitle: "Ocena Efektywności Energetycznej Klimatyzacji", href: "/uslugi/audyt-energetyczny-wezlow-cieplnych" },
  { img: "/uslugi/08-dekarbonizacja.png", title: "Dekarbonizacja", href: "/uslugi" },
  { img: "/uslugi/09-ogrzewanie.png", title: "Wsparcie w pozyskiwaniu funduszy", subtitle: "Kredyt Ekologiczny, FENIKS, Krajowy Plan Odbudowy", href: "/uslugi/aktualne-i-planowane-nabory" },
];

const PAGE_2: Service[] = [
  { img: "/uslugi/10-kogeneracja.png", title: "Kogeneracja, Trigeneracja, Mikrokogeneracja", subtitle: "Audyt, finansowanie, wdrożenie", href: "/uslugi" },
  { img: "/uslugi/11-wodor.png", title: "Technologie Wodorowe", href: "/uslugi/audyt-wodorowy" },
  { img: "/uslugi/12-audyt-budynku.png", title: "Audyt Energetyczny", subtitle: "Oświetlenia, elektroenergetyczny", href: "/uslugi/audyt-energetyczny-budynku" },
  { img: "/uslugi/13-chlodniczy.png", title: "Audyt Chłodniczy", subtitle: "Efektywność Energetyczna Urządzeń Chłodniczych i Klimatyzacji", href: "/uslugi/audyt-chlodniczy" },
  { img: "/uslugi/14-oze.png", title: "Odnawialne Źródła Energii", subtitle: "Projektowanie, montaż", href: "/uslugi/audyt-energetyczny-na-cele-oze" },
  { img: "/uslugi/15-pozostale.png", title: "Pozostałe usługi", subtitle: "Zobacz pełną listę 65 usług", href: "/uslugi" },
];

function ServicesPage({
  id,
  pageIndex,
  totalPages,
  services,
  reduced,
}: {
  id: string;
  pageIndex: number;
  totalPages: number;
  services: Service[];
  reduced: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative bg-black text-white h-[calc(100vh-88px)] flex flex-col"
    >
      {/* Black header bar — sticky to top of section */}
      <div className="relative w-full bg-black border-b border-white/5 shrink-0">
        <div className="container-site flex items-center justify-between py-5 lg:py-6">
          <motion.h2
            id={`${id}-heading`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw + 1rem, 4rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            Oferta<span style={{ color: "#86bc25" }}>.</span>
          </motion.h2>
          <span className="font-mono text-[0.95rem] text-white/70 tabular-nums">
            {pageIndex + 1}/{totalPages}
          </span>
        </div>
      </div>

      {/* 3×3 grid filling remaining height */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-3 flex-1 min-h-0">
        {services.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Link
              href={s.href}
              itemProp="url"
              className="group relative block h-full overflow-hidden border-b border-r border-white/5"
            >
              <Image
                src={s.img}
                alt={s.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover grayscale brightness-[0.55] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10 transition-opacity duration-500 group-hover:opacity-70" />
              <div className="absolute inset-0 flex items-start p-5 lg:p-7">
                <div className="max-w-[26ch]">
                  <h3
                    className="font-display text-white leading-[1.1]"
                    style={{
                      fontSize: "clamp(1.05rem, 1.2vw + 0.4rem, 1.5rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.015em",
                    }}
                    itemProp="name"
                  >
                    {s.title}
                  </h3>
                  {s.subtitle && (
                    <p
                      className="mt-1.5 text-white/80 text-[0.85rem] leading-snug"
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
      </ul>
    </section>
  );
}

export function Services() {
  const reduced = !!useReducedMotion();
  return (
    <>
      <ServicesPage id="services-1" pageIndex={0} totalPages={2} services={PAGE_1} reduced={reduced} />
      <ServicesPage id="services-2" pageIndex={1} totalPages={2} services={PAGE_2} reduced={reduced} />
    </>
  );
}
