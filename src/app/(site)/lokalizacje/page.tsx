import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { CITIES, CITY_SLUGS } from "@/lib/locations";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";

const BASE = "https://gsenergia.pl";

export const metadata: Metadata = {
  title: "Audyt energetyczny w Polsce — lokalizacje · GS Energia",
  description:
    "Audyty energetyczne dla zakładów produkcyjnych w Krakowie, Warszawie, Wrocławiu, Łodzi i Katowicach. Niezależne doradztwo od 2008 r.",
  alternates: { canonical: `${BASE}/lokalizacje` },
};

const CITY_BLURB: Record<string, string> = {
  krakow: "Siedziba GS Energia — Małopolska, Podkarpacie i Świętokrzyskie.",
  warszawa: "Mazowsze i centralna Polska — biurowce, logistyka, farmacja.",
  wroclaw: "Dolny Śląsk — motoryzacja, AGD, elektronika.",
  lodz: "Łódzkie — AGD, tekstylia, logistyka, chemia.",
  katowice: "Górny Śląsk — górnictwo, metalurgia, energetyka.",
};

export default function LocationsIndex() {
  const breadcrumb = breadcrumbSchema([
    { name: "Strona główna", url: `${BASE}/` },
    { name: "Lokalizacje", url: `${BASE}/lokalizacje` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[12px] font-mono uppercase tracking-[0.16em] text-[#222328]/60"
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-[#26890d]">Strona główna</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#26890d]">Lokalizacje</li>
            </ol>
          </nav>

          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Lokalizacje
          </p>
          <h1
            className="font-display max-w-[24ch]"
            style={{
              fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
            }}
          >
            Audyt energetyczny w całej Polsce
            <span style={{ color: "#8DC73F" }}>.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-[1.1rem] leading-[1.6] text-[#222328]/75">
            Pracujemy z zakładami produkcyjnymi w pięciu największych regionach przemysłowych Polski. Dojazd w promieniu 80 km od siedziby — bezpłatny.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CITY_SLUGS.map((slug) => {
              const c = CITIES[slug];
              return (
                <Link
                  key={slug}
                  href={`/lokalizacje/${slug}`}
                  className="group rounded-2xl bg-[#f7f7f4] p-7 ring-1 ring-black/[0.05] hover:ring-[#26890d]/40 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-2 flex items-center gap-1.5">
                        <MapPin size={12} weight="bold" />
                        {c.voivodeship}
                      </p>
                      <h2 className="font-display text-[1.65rem] tracking-[-0.01em] text-[#222328]">
                        {c.city}
                      </h2>
                    </div>
                    <ArrowUpRight
                      size={18}
                      weight="bold"
                      className="text-[#26890d] mt-1 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </div>
                  <p className="mt-4 text-[0.95rem] leading-[1.55] text-[#222328]/70">
                    {CITY_BLURB[slug]}
                  </p>
                  <p className="mt-5 text-[0.85rem] font-medium text-[#26890d]">
                    Zobacz szczegóły →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
