import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CaretRight, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

import { getAll } from "@/lib/content";
import { SITE } from "@/lib/site";
import {
  ServicesGrid,
  type CategoryKey,
  type ServiceItem,
} from "@/components/sections/ServicesGrid";

export const metadata: Metadata = {
  title: "Wszystkie usługi",
  description:
    "Audyty energetyczne, EMS, BESS, fotowoltaika, kogeneracja, ESG. 65 usług dla zakładów produkcyjnych. Od 2008 r.",
  alternates: { canonical: "https://gsenergia.pl/uslugi" },
};

/** Map slug → existing /public/uslugi/*.jpg image when one fits. */
const SLUG_IMAGE_MAP: Record<string, string> = {
  "audyt-energetyczny-przedsiebiorstwa": "/uslugi/01-audyt-przedsiebiorstwa.png",
  "audyt-efektywnosci-energetycznej": "/uslugi/02-audyt-efektywnosci.png",
  "magazyn-energii-bess": "/uslugi/03-bess.png",
  "przemyslowy-magazyn-energii-dla-firm": "/uslugi/03-bess.png",
  "magazynowanie-energii-dla-domu-i-malych-obiektow": "/uslugi/03-bess.png",
  "banki-energii": "/uslugi/03-bess.png",
  "om-bess": "/uslugi/03-bess.png",
  "ems-telemetria": "/uslugi/04-ems.png",
  "ems-i-telemetria_2": "/uslugi/04-ems.png",
  "swiadectwa-charakterystyki-energetycznej": "/uslugi/05-swiadectwo.png",
  "swiadectwo-charakterystyki-energetycznej-jaslo": "/uslugi/05-swiadectwo.png",
  "swiadectwo-charakterystyki-energetycznej-michalowice": "/uslugi/05-swiadectwo.png",
  "swiadectwo-charakterystyki-energetycznej-sosnowiec": "/uslugi/05-swiadectwo.png",
  "swiadectwo-charakterystyki-energetycznej-tarnow": "/uslugi/05-swiadectwo.png",
  "swiadectwo-charakterystyki-energetycznej-wieliczka": "/uslugi/05-swiadectwo.png",
  "swiadectwo-charakterystyki-energetycznej-zielonki": "/uslugi/05-swiadectwo.png",
  "co-zawiera-swiadectwo-energetyczne": "/uslugi/05-swiadectwo.png",
  "czemu-sluza-swiadectwa-energetyczne": "/uslugi/05-swiadectwo.png",
  "jak-interpretowac-swiadectwa": "/uslugi/05-swiadectwo.png",
  "wzor-swiadectwa": "/uslugi/05-swiadectwo.png",
  "zlec-wykonanie-swiadectwa-budynku": "/uslugi/05-swiadectwo.png",
  "zlec-wykonanie-swiadectwa-domu": "/uslugi/05-swiadectwo.png",
  "zlec-wykonanie-swiadectwa-mieszkania-lokalu": "/uslugi/05-swiadectwo.png",
  "spoldzielnie-energetyczne": "/uslugi/06-spoldzielnie.png",
  "okresowa-kontrola-systemu-klimatyzacji-i-ogrzewania": "/uslugi/07-klimatyzacja.png",
  "chlodnictwo-klimatyzacja-efektywne-energetycznie": "/uslugi/07-klimatyzacja.png",
  "dekarbonizacja": "/uslugi/08-dekarbonizacja.png",
  "audyt-energetyczny-kotlowni": "/uslugi/09-ogrzewanie.png",
  "ocena-efektywnosci-energetycznej-kotlow": "/uslugi/09-ogrzewanie.png",
  "audyt-energetyczny-wezlow-cieplnych": "/uslugi/09-ogrzewanie.png",
  "kogeneracja": "/uslugi/10-kogeneracja.png",
  "o-kogeneracji": "/uslugi/10-kogeneracja.png",
  "korzysci-z-kogeneracji": "/uslugi/10-kogeneracja.png",
  "potencjal-kogeneracji-w-ue-i-polsce": "/uslugi/10-kogeneracja.png",
  "technologie-wodorowe": "/uslugi/11-wodor.png",
  "audyt-wodorowy": "/uslugi/11-wodor.png",
  "audyt-energetyczny-budynku": "/uslugi/12-audyt-budynku.png",
  "audyt-energetyczny-budynku-jednorodzinnego": "/uslugi/12-audyt-budynku.png",
  "audyt-energetyczny-katowice": "/uslugi/12-audyt-budynku.png",
  "audyt-energetyczny-krakow": "/uslugi/12-audyt-budynku.png",
  "audyt-energetyczny-lodz": "/uslugi/12-audyt-budynku.png",
  "audyt-energetyczny-warszawa": "/uslugi/12-audyt-budynku.png",
  "audyt-energetyczny-wroclaw": "/uslugi/12-audyt-budynku.png",
  "audyt-chlodniczy": "/uslugi/13-chlodniczy.png",
  "odnawialne-zrodla-energii": "/uslugi/14-oze.png",
  "fotowoltaika": "/uslugi/14-oze.png",
  "fotowoltaika-dom": "/uslugi/14-oze.png",
  "audyt-energetyczny-na-cele-oze": "/uslugi/14-oze.png",
};

const FALLBACK_IMAGE = "/uslugi/15-pozostale.png";

function categorize(slug: string): CategoryKey {
  const s = slug.toLowerCase();

  // Audyty: slugs starting with audyt-
  if (s.startsWith("audyt-")) return "audyty";

  // OZE / fotowoltaika
  if (
    s.includes("oze") ||
    s.includes("pv") ||
    s.includes("solarne") ||
    s.includes("fotowoltaika") ||
    s.includes("odnawialne")
  ) {
    return "oze";
  }

  // Magazyny i EMS
  if (
    s.includes("bess") ||
    s.includes("magazyn") ||
    s.includes("ems") ||
    s.includes("telemetria") ||
    s.includes("monitoring") ||
    s.includes("banki-energii")
  ) {
    return "ems";
  }

  // Budynki
  if (
    s.includes("budynek") ||
    s.includes("budynku") ||
    s.includes("swiadectwo") ||
    s.includes("swiadectwa") ||
    s.includes("klimatyzacj") ||
    s.includes("kotlow") ||
    s.includes("wezlow-cieplnych") ||
    s.includes("ogrzewani") ||
    s.includes("chlodnictwo")
  ) {
    return "budynki";
  }

  // Strategia
  if (
    s.includes("dekarbonizacja") ||
    s.includes("csrd") ||
    s.includes("esg") ||
    s.includes("strategia") ||
    s.includes("plan") ||
    s.includes("studium")
  ) {
    return "strategia";
  }

  // Wdrożenie
  if (
    s.includes("wdrozenie") ||
    s.includes("realizacja") ||
    s.includes("kogeneracja") ||
    s.includes("serwis") ||
    s.includes("wodor") ||
    s.includes("outsourcing")
  ) {
    return "wdrozenie";
  }

  return "pozostale";
}

function buildServices(): ServiceItem[] {
  const docs = getAll("uslugi");
  return docs
    .map((d): ServiceItem => {
      const title = (d.frontmatter.title as string | undefined) ?? d.slug;
      const excerpt = (d.frontmatter.excerpt as string | undefined) ?? "";
      const image = SLUG_IMAGE_MAP[d.slug] ?? null;
      return {
        slug: d.slug,
        title,
        excerpt,
        image,
        category: categorize(d.slug),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "pl"));
}

export default function UslugiPage() {
  const services = buildServices();
  // For services without a mapped image, prefer fallback image so the grid stays visually consistent.
  const withFallback: ServiceItem[] = services.map((s) =>
    s.image ? s : { ...s, image: FALLBACK_IMAGE },
  );

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-white text-[#222328]">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          {/* Breadcrumbs */}
          <nav
            aria-label="Okruszki"
            className="flex items-center gap-1.5 text-[12px] text-[#222328]/55 mb-6"
          >
            <Link href="/" className="hover:text-[#26890d] transition-colors">
              Strona główna
            </Link>
            <CaretRight size={11} weight="bold" className="text-[#222328]/30" />
            <span className="text-[#222328]/80">Usługi</span>
          </nav>

          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
            Pełna oferta
          </p>

          <h1
            className="font-display text-balance max-w-[20ch]"
            style={{
              fontSize: "clamp(2.5rem, 4vw + 1rem, 4.25rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Wszystkie nasze usługi
            <span style={{ color: "#8DC73F" }}>.</span>
          </h1>

          <p className="mt-6 max-w-[60ch] text-[1.05rem] text-[#222328]/70 leading-relaxed">
            {services.length} usług w jednym miejscu. Audyty, EMS, BESS, fotowoltaika,
            kogeneracja, ESG, dekarbonizacja. Od pomiaru po wdrożenie.
          </p>

          <div className="mt-8">
            <Link
              href={SITE.surveyUrl}
              className="inline-flex items-center gap-2 rounded-full bg-[#26890d] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#1f7a0a] transition-colors shadow-[0_8px_24px_-8px_rgba(38,137,13,0.5)]"
            >
              Nie wiesz, której usługi potrzebujesz? Zamów bezpłatną konsultację
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2 + 3. Filter + grid */}
      <section className="bg-[#fafaf7] border-t border-black/[0.06]">
        <div className="container-site py-[clamp(3rem,5vw,5rem)]">
          <Suspense fallback={null}>
            <ServicesGrid services={withFallback} />
          </Suspense>
        </div>
      </section>

      {/* 4. CTA strip */}
      <section className="bg-[oklch(0.16_0.02_150)] text-white py-[clamp(4rem,6vw,6rem)]">
        <div className="container-site">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[52ch]">
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.85rem, 2.5vw + 1rem, 2.75rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Nie znalazłeś swojej usługi
                <span style={{ color: "#8DC73F" }}>?</span>
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Zadzwoń lub wyślij zapytanie — przygotujemy ofertę dopasowaną do Twojego
                zakładu.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#8DC73F] px-6 py-3.5 text-sm font-medium text-[#0e1a10] hover:bg-[#9ed64f] transition-colors"
              >
                <Phone size={15} weight="fill" />
                Zadzwoń: {SITE.phone}
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:border-[#8DC73F] hover:text-[#8DC73F] transition-colors"
              >
                <EnvelopeSimple size={15} weight="bold" />
                Wyślij zapytanie
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
