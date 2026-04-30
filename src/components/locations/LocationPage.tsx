import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  EnvelopeSimple,
  MapPin,
  Clock,
  Buildings,
  Truck,
  Factory,
  Flask,
  Wrench,
  Storefront,
  Lightning,
  ForkKnife,
  ChartLineUp,
  ShieldCheck,
  Compass,
  HandCoins,
} from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/seo";

const BASE = "https://gsenergia.pl";

export type LocationData = {
  city: string;
  cityGenitive: string;
  cityIn: string;
  voivodeship: string;
  postalCode?: string;
  isHQ?: boolean;
  geo: { lat: number; lng: number; bbox: [number, number, number, number] };
  population: string;
  industries: string[];
  nearbyClients: string[];
  zipCodesServed: string[];
  drivingDistance: string;
  slug: string;
};

const SERVICES_HERE: { label: string; href: string; description: string }[] = [
  {
    label: "Audyt energetyczny przedsiębiorstwa",
    href: "/uslugi/audyt-energetyczny-przedsiebiorstwa",
    description: "Obowiązkowy co 4 lata dla dużych firm.",
  },
  {
    label: "Audyt efektywności energetycznej",
    href: "/uslugi/audyt-efektywnosci-energetycznej",
    description: "Pod białe certyfikaty i dotacje.",
  },
  {
    label: "Audyt energetyczny budynku",
    href: "/uslugi/audyt-energetyczny-budynku",
    description: "Przed termomodernizacją.",
  },
  {
    label: "EMS / Telemetria",
    href: "/uslugi/ems-i-telemetria_2",
    description: "Monitoring mediów 24/7.",
  },
  {
    label: "Banki energii",
    href: "/uslugi/banki-energii",
    description: "Magazynowanie i zarządzanie energią.",
  },
  {
    label: "Dekarbonizacja",
    href: "/uslugi/dekarbonizacja",
    description: "Ścieżka do Net Zero zgodna z CSRD.",
  },
];

const INDUSTRY_ICONS: Record<string, typeof Factory> = {
  motoryzacja: Wrench,
  spożywcza: ForkKnife,
  chemia: Flask,
  metalurgia: Factory,
  energetyka: Lightning,
  retail: Storefront,
  "biurowce klasy A": Buildings,
  "IT/biurowce": Buildings,
  "budynki biurowe": Buildings,
  logistyka: Truck,
  farmaceutyczna: Flask,
  AGD: Wrench,
  elektronika: Lightning,
  tekstylia: Wrench,
  górnictwo: Factory,
};

function FactTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
      <p className="font-display text-[1.4rem] tracking-[-0.01em] text-[#222328]">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] font-mono uppercase tracking-[0.16em] text-[#26890d]">
        {label}
      </p>
    </div>
  );
}

export function LocationPage({ data }: { data: LocationData }) {
  const {
    city,
    cityGenitive,
    cityIn,
    voivodeship,
    isHQ,
    geo,
    population,
    industries,
    nearbyClients,
    zipCodesServed,
    drivingDistance,
    slug,
  } = data;

  const bbox = geo.bbox.join("%2C");
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${geo.lat}%2C${geo.lng}`;

  const faqs = [
    {
      q: `Czy obsługują Państwo audyty w ${cityIn}?`,
      a: `Tak. Działamy w ${cityIn} i całej ${voivodeship}. Dojazd w promieniu 80 km od siedziby jest bezpłatny.`,
    },
    {
      q: `Jak długo trwa audyt energetyczny w ${cityIn}?`,
      a: `Standardowo 4–8 tygodni. Lokalna lokalizacja skraca czas pomiarów i wizyt na terenie zakładu.`,
    },
    {
      q: `Ile kosztuje audyt energetyczny w ${city}?`,
      a: `Cena zależy od skali zakładu. Wstępna konsultacja jest bezpłatna — po krótkiej rozmowie podamy widełki.`,
    },
    {
      q: `Czy dotacje OZE w ${voivodeship} obejmują audyty?`,
      a: `Tak. Wojewódzki Fundusz Ochrony Środowiska oraz programy unijne często finansują audyty energetyczne. Pomożemy w aplikacji.`,
    },
  ];

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE}/lokalizacje/${slug}#localbusiness`,
    name: `GS Energia — Audyt energetyczny ${city}`,
    url: `${BASE}/lokalizacje/${slug}`,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: "2008",
    description: `Niezależne doradztwo energetyczne i audyty dla zakładów produkcyjnych w ${cityIn} i ${voivodeship}.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: isHQ ? "Rynek Główny 28" : undefined,
      addressLocality: city,
      postalCode: isHQ ? "31-010" : data.postalCode,
      addressRegion: voivodeship,
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    areaServed: [
      { "@type": "City", name: city },
      { "@type": "AdministrativeArea", name: voivodeship },
      ...zipCodesServed.map((z) => ({ "@type": "PostalCodeRangeSpecification", postalCodeRange: z })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Strona główna", url: `${BASE}/` },
    { name: "Lokalizacje", url: `${BASE}/lokalizacje` },
    { name: `Audyt energetyczny — ${city}`, url: `${BASE}/lokalizacje/${slug}` },
  ]);

  const faqLd = faqSchema(faqs);

  const reasons = [
    {
      icon: Compass,
      title: isHQ ? "Bliskość siedziby" : `Zespół audytorów w ${voivodeship}`,
      desc: isHQ
        ? `Z Krakowa jesteśmy w Twojej firmie w 2h (najczęściej 1h). ${drivingDistance}`
        : `${drivingDistance} Promień 80 km gratis.`,
    },
    {
      icon: Buildings,
      title: "Znajomość lokalnego rynku",
      desc: `Pracowaliśmy z firmami z branż: ${industries.join(", ")} w ${voivodeship}.`,
    },
    {
      icon: Lightning,
      title: "Lokalni dostawcy energii",
      desc: `Współpracujemy z lokalnymi OSD i znamy specyfikę taryf operatorów obsługujących ${voivodeship}.`,
    },
    {
      icon: ChartLineUp,
      title: `${population} mieszkańców`,
      desc: `Region ma swoją specyfikę. Kalkulator ROI uwzględnia lokalną cenę MWh i charakter przemysłu.`,
    },
  ];

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqLd} />

      {/* 1. HERO */}
      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[12px] font-mono uppercase tracking-[0.16em] text-[#222328]/60"
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-[#26890d]">Strona główna</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/lokalizacje" className="hover:text-[#26890d]">Lokalizacje</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#26890d]">Audyt — {city}</li>
            </ol>
          </nav>

          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Lokalizacja · {voivodeship}
          </p>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
            }}
          >
            Audyt energetyczny — {city}
            <span style={{ color: "#8DC73F" }}>.</span>
          </h1>

          <p className="mt-6 max-w-[60ch] text-[1.1rem] leading-[1.6] text-[#222328]/75">
            Niezależne doradztwo energetyczne dla zakładów produkcyjnych w {cityIn} i regionie {voivodeship}. Od 2008 r.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.surveyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#26890d] text-white px-6 py-3 text-sm font-medium hover:bg-[#1f6f0a] transition-colors"
            >
              Zamów konsultację
              <ArrowUpRight size={14} weight="bold" />
            </a>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 text-[#222328] px-6 py-3 text-sm font-medium hover:border-[#26890d] hover:text-[#26890d] transition-colors"
            >
              <Phone size={14} weight="bold" />
              Zadzwoń
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
            <FactTile value="80 km" label="Dojazd gratis" />
            <FactTile value="24h" label="Czas reakcji" />
            <FactTile value="400+" label="Projektów" />
            <FactTile value="ISO 50001" label="Certyfikat" />
          </div>
        </div>
      </section>

      {/* 2. WHY US HERE */}
      <section className="bg-[#f7f7f4]">
        <div className="container-site py-[clamp(4rem,6vw,6rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Dlaczego my w {cityIn}
          </p>
          <h2
            className="font-display max-w-[28ch]"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Lokalna obecność, krajowe kompetencje
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl bg-white p-7 ring-1 ring-black/[0.06]"
              >
                <r.icon size={28} weight="duotone" className="text-[#26890d]" />
                <h3 className="mt-4 font-display text-[1.3rem] tracking-[-0.01em] text-[#222328]">
                  {r.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-[1.6] text-[#222328]/70">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIES */}
      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,6vw,6rem)]">
          <h2
            className="font-display max-w-[28ch]"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Branże, dla których pracujemy w {cityIn}
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {industries.map((ind) => {
              const Icon = INDUSTRY_ICONS[ind] ?? Factory;
              return (
                <div
                  key={ind}
                  className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3.5"
                >
                  <Icon size={22} weight="duotone" className="text-[#26890d] shrink-0" />
                  <span className="text-[0.95rem] text-[#222328] capitalize">
                    {ind}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CLIENTS */}
      <section className="bg-[#f7f7f4]">
        <div className="container-site py-[clamp(4rem,6vw,6rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Zaufanie
          </p>
          <h2
            className="font-display max-w-[28ch]"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {nearbyClients.length}+ klientów w regionie zaufało nam
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyClients.map((c) => (
              <div key={c} className="rounded-2xl bg-white p-5 ring-1 ring-black/[0.06]">
                <p className="font-display text-[1.05rem] tracking-[-0.01em] text-[#222328]">
                  {c}
                </p>
                <p className="mt-1.5 text-[0.85rem] text-[#222328]/65 leading-[1.5]">
                  Audyt i doradztwo energetyczne dla zakładu w {voivodeship}.
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[0.9rem] text-[#222328]/60 italic">
            …i wielu innych zakładów w {voivodeship}.
          </p>
        </div>
      </section>

      {/* 5. MAP + NAP */}
      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,6vw,6rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-black/10 aspect-[4/3] lg:aspect-auto lg:min-h-[460px]">
              <iframe
                src={mapSrc}
                className="w-full h-full"
                style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa — ${city}`}
              />
              <div className="absolute top-4 right-4 rounded-lg bg-white/95 backdrop-blur px-3 py-2 text-xs text-[#222328] shadow-lg">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-[#26890d]">
                  {city}
                </p>
                <p className="mt-0.5 font-medium">{voivodeship}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-[oklch(0.16_0.02_150)] text-white p-7 lg:p-8">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#86bc25] mb-3">
                Kontakt — {city}
              </p>
              <h3 className="font-display text-[1.6rem] tracking-[-0.01em] mb-6">
                Skontaktuj się z nami
              </h3>

              <ul className="space-y-4 text-[0.95rem]">
                <li className="flex items-start gap-3">
                  <MapPin size={18} weight="bold" className="mt-0.5 shrink-0 text-[#86bc25]" />
                  <span className="text-white/85">
                    {isHQ ? (
                      <>
                        Rynek Główny 28<br />
                        31-010 Kraków
                      </>
                    ) : (
                      <>
                        Obsługujemy {city} z siedziby w Krakowie<br />
                        Rynek Główny 28, 31-010 Kraków
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} weight="bold" className="mt-0.5 shrink-0 text-[#86bc25]" />
                  <a href={SITE.phoneHref} className="text-white/85 hover:text-white">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <EnvelopeSimple size={18} weight="bold" className="mt-0.5 shrink-0 text-[#86bc25]" />
                  <a href={SITE.emailHref} className="text-white/85 hover:text-white">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} weight="bold" className="mt-0.5 shrink-0 text-[#86bc25]" />
                  <span className="text-white/85">Pn–Pt 8:00–17:00</span>
                </li>
              </ul>

              <a
                href={SITE.surveyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#8DC73F] text-[#222328] px-5 py-2.5 text-sm font-medium hover:bg-white transition-colors"
              >
                Bezpłatna konsultacja
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES */}
      <section className="bg-[#f7f7f4]">
        <div className="container-site py-[clamp(4rem,6vw,6rem)]">
          <h2
            className="font-display max-w-[28ch]"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Usługi, które realizujemy w {cityIn}
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES_HERE.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl bg-white p-6 ring-1 ring-black/[0.06] hover:ring-[#26890d]/40 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[1.15rem] tracking-[-0.01em] text-[#222328] leading-[1.25]">
                    {s.label}
                  </h3>
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="text-[#26890d] mt-1 shrink-0 group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <p className="mt-2 text-[0.9rem] text-[#222328]/65 leading-[1.55]">
                  {s.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,6vw,6rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            FAQ — {cityIn}
          </p>
          <h2
            className="font-display max-w-[28ch]"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Najczęstsze pytania klientów z {voivodeship}
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>

          <div className="mt-10 max-w-3xl divide-y divide-black/10 border-y border-black/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <span className="font-display text-[1.05rem] text-[#222328] tracking-[-0.005em]">
                    {f.q}
                  </span>
                  <span className="mt-1 shrink-0 rounded-full bg-[#f7f7f4] p-1.5 text-[#26890d] group-open:rotate-45 transition-transform">
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-[0.95rem] leading-[1.6] text-[#222328]/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)] text-center">
          <h2
            className="font-display mx-auto max-w-[24ch]"
            style={{
              fontSize: "clamp(2rem, 3.75vw, 3.5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Zaplanuj audyt energetyczny w {cityIn}
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>
          <p className="mt-5 mx-auto max-w-[52ch] text-[1.05rem] leading-[1.6] text-white/70">
            Bezpłatna konsultacja, odpowiadamy w 24h.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.surveyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#8DC73F] text-[#222328] px-6 py-3 text-sm font-medium hover:bg-white transition-colors"
            >
              <HandCoins size={14} weight="bold" />
              Zamów
            </a>
            <Link
              href="/lokalizacje"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-[oklch(0.16_0.02_150)] transition-colors"
            >
              Wszystkie miasta
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>

          <p className="mt-10 text-[11px] font-mono uppercase tracking-[0.18em] text-white/65">
            Audyt energetyczny {cityGenitive} · ISO 50001 · Od 2008 r.
            {zipCodesServed.length > 0 && (
              <> · Kody pocztowe: {zipCodesServed.join(", ")}</>
            )}
          </p>
          {/* Trust strip — Shield/icon flourish */}
          <div className="mt-6 flex items-center justify-center gap-2 text-white/65">
            <ShieldCheck size={14} weight="duotone" />
            <span className="text-[11px] font-mono uppercase tracking-[0.18em]">
              400+ projektów · 18 lat doświadczenia
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
