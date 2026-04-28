"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";

const COLS = [
  {
    title: "Usługi",
    links: [
      { label: "Audyt energetyczny przedsiębiorstwa", href: "/uslugi/audyt-energetyczny-przedsiebiorstwa" },
      { label: "Audyt termowizyjny", href: "/uslugi/audyt-jakosci-energii" },
      { label: "Fotowoltaika dla firm", href: "/uslugi" },
      { label: "Magazyny energii BESS", href: "/uslugi" },
      { label: "EMS / ISO 50001", href: "/uslugi" },
      { label: "ESG / CSRD", href: "/uslugi" },
    ],
  },
  {
    title: "Firma",
    links: [
      { label: "O nas", href: "/o-nas" },
      { label: "Realizacje", href: "/realizacje" },
      { label: "Blog", href: "/blog" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Lokalizacje",
    links: [
      { label: "Audyt — Kraków", href: "/uslugi/audyt-energetyczny-krakow" },
      { label: "Audyt — Warszawa", href: "/uslugi/audyt-energetyczny-warszawa" },
      { label: "Audyt — Wrocław", href: "/uslugi/audyt-energetyczny-wroclaw" },
      { label: "Audyt — Łódź", href: "/uslugi/audyt-energetyczny-lodz" },
      { label: "Audyt — Katowice", href: "/uslugi/audyt-energetyczny-katowice" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-site py-[clamp(3rem,5vw,5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_3fr] gap-12">
          {/* Brand + NAP */}
          <div>
            <p className="font-display text-[1.5rem] tracking-[-0.02em]">
              GS <span style={{ color: "#86bc25" }}>Energia</span>
            </p>
            <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-[34ch]">
              Niezależne doradztwo energetyczne, audyty i wdrożenia OZE dla firm
              i instytucji. Od 2008 r.
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} weight="bold" className="mt-0.5 shrink-0 text-[#86bc25]" />
                <span className="text-white/80">
                  Rynek Główny 28<br />
                  31-010 Kraków
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} weight="bold" className="mt-0.5 shrink-0 text-[#86bc25]" />
                <a href={SITE.phoneHref} className="text-white/80 hover:text-white transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <EnvelopeSimple size={16} weight="bold" className="mt-0.5 shrink-0 text-[#86bc25]" />
                <a href="mailto:biuro@gsenergia.pl" className="text-white/80 hover:text-white transition-colors">
                  biuro@gsenergia.pl
                </a>
              </li>
            </ul>

            <Link
              href={SITE.surveyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#26890d] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#1f6f0a] transition-colors"
            >
              Bezpłatna konsultacja
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40 mb-4">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/75 hover:text-[#86bc25] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} GS Energia · NIP 685-221-14-17 · Wszystkie prawa zastrzeżone.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">
                Polityka prywatności
              </Link>
            </li>
            <li>
              <Link href="/akty-prawne" className="hover:text-white transition-colors">
                Akty prawne
              </Link>
            </li>
            <li>
              <a href="https://facebook.com/GS.GSENERGIA" target="_blank" rel="noreferrer noopener" className="hover:text-white transition-colors">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
