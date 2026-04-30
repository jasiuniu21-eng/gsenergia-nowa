import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  XCircle,
  Check,
  Buildings,
  Clock,
  ChartBar,
  Factory,
  ShieldCheck,
  MapPin,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";
import { HelpCalculator } from "@/components/sections/HelpCalculator";

const BASE = "https://gsenergia.pl";

export const metadata: Metadata = {
  title: "Cennik — ile kosztuje audyt energetyczny",
  description:
    "Transparentny cennik audytów energetycznych. Audyt podstawowy od 8 500 PLN. ROI < 18 miesięcy. Bezpłatna konsultacja, model ESCO dostępny.",
  alternates: { canonical: `${BASE}/cennik` },
};

type Principle = {
  title: string;
  description: string;
};

const PRINCIPLES: Principle[] = [
  {
    title: "Brak ukrytych kosztów",
    description:
      "Cena podana w ofercie to cena ostateczna. Zero dopłat za „dodatkowe pomiary”.",
  },
  {
    title: "Brak ofert pod konkretnego dostawcę",
    description:
      "Nasze rekomendacje nie są pisane pod sprzedawcę pomp ciepła czy paneli.",
  },
  {
    title: "Brak długich umów",
    description:
      "Płacisz za projekt, nie za „subskrypcję doradztwa”. Bez zobowiązań.",
  },
  {
    title: "Brak „estymacji 5–25%”",
    description: "Każda rekomendacja z konkretną kalkulacją ROI w PLN.",
  },
];

type Tier = {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  includes: string[];
  cta: { label: string; href: string };
  badge: string;
  featured?: boolean;
  ctaStyle: "primary" | "outline";
};

const TIERS: Tier[] = [
  {
    name: "Konsultacja energetyczna",
    price: "Bezpłatna",
    description:
      "Wstępna analiza, identyfikacja głównych obszarów, ofertowanie.",
    includes: [
      "1h rozmowa telefoniczna lub video",
      "Analiza Twoich obecnych rachunków",
      "Wstępna identyfikacja oszczędności",
      "Ofertowanie kolejnych kroków",
    ],
    cta: { label: "Zamów konsultację", href: SITE.surveyUrl },
    badge: "Rekomendowane na początek",
    ctaStyle: "outline",
  },
  {
    name: "Audyt energetyczny przedsiębiorstwa",
    price: "od 12 000 PLN",
    priceNote: "netto",
    description:
      "Standardowy audyt zgodny z ustawą o efektywności energetycznej.",
    includes: [
      "Pełny pomiar energetyczny zakładu (2–4 tyg.)",
      "Raport audytowy z konkretnymi rekomendacjami",
      "Kalkulacja ROI dla każdej rekomendacji",
      "Spotkanie podsumowujące",
      "Biały certyfikat (wsparcie)",
      "Wsparcie wdrożeniowe (opcjonalnie)",
    ],
    cta: { label: "Zamów audyt", href: "/kontakt" },
    badge: "Najczęściej wybierany",
    featured: true,
    ctaStyle: "primary",
  },
  {
    name: "Audyt + EMS + Wdrożenie",
    price: "Wycena indywidualna",
    description: "Pełny program optymalizacji energii w zakładzie.",
    includes: [
      "Audyt energetyczny + audyt jakości energii",
      "Wdrożenie EMS (system zarządzania energią)",
      "Certyfikacja ISO 50001",
      "Roczne wsparcie i monitoring",
      "Raport ESG/CSRD",
      "Model ESCO opcjonalnie (rozliczenie z oszczędności)",
    ],
    cta: { label: "Zamów wycenę", href: "/kontakt" },
    badge: "Dla dużych zakładów",
    ctaStyle: "outline",
  },
];

type Factor = {
  title: string;
  description: string;
  Icon: typeof Buildings;
};

const FACTORS: Factor[] = [
  {
    title: "Skala zakładu",
    description:
      "Moc zamówiona, liczba punktów pomiarowych, wielkość obiektów.",
    Icon: Buildings,
  },
  {
    title: "Charakter pracy",
    description:
      "1-zmianowy vs 24/7. Pomiary 24/7 wymagają więcej czasu.",
    Icon: Clock,
  },
  {
    title: "Zakres pomiarów",
    description:
      "Tylko energia elektryczna vs kompleksowy (energia + ciepło + sprężone powietrze + chłodnictwo).",
    Icon: ChartBar,
  },
  {
    title: "Branża i procesy",
    description:
      "Specjalistyczne procesy (chłodnictwo, sterylizacja, ATEX) wymagają specjalisty.",
    Icon: Factory,
  },
  {
    title: "Wymagania prawne",
    description:
      "Pełna zgodność z ustawą + biały certyfikat = więcej dokumentacji.",
    Icon: ShieldCheck,
  },
  {
    title: "Lokalizacja",
    description:
      "Promień 80 km od Krakowa: bezpłatny dojazd. Dalej: koszt dojazdu wliczony w wycenę.",
    Icon: MapPin,
  },
];

type Example = {
  title: string;
  rows: { label: string; value: string }[];
  price: string;
  result: string;
};

const EXAMPLES: Example[] = [
  {
    title: "Mała pralnia chemiczna",
    rows: [
      { label: "Branża", value: "Usługi" },
      { label: "Moc", value: "0,5 MW" },
      { label: "Punkty pomiarowe", value: "8" },
      { label: "Czas trwania", value: "3 tygodnie" },
    ],
    price: "8 500 PLN netto",
    result: "−22% rachunku, ROI 11 mies.",
  },
  {
    title: "Średni zakład spożywczy",
    rows: [
      { label: "Branża", value: "Mleczarnia" },
      { label: "Moc", value: "2 MW" },
      { label: "Punkty pomiarowe", value: "35" },
      { label: "Czas trwania", value: "6 tygodni" },
    ],
    price: "22 000 PLN netto",
    result: "−18% rachunku, ROI 16 mies.",
  },
  {
    title: "Duży zakład produkcyjny",
    rows: [
      { label: "Branża", value: "Motoryzacja" },
      { label: "Moc", value: "8 MW" },
      { label: "Punkty pomiarowe", value: "120+" },
      { label: "Czas trwania", value: "10 tygodni" },
    ],
    price: "65 000 PLN netto",
    result: "−15% rachunku, ROI 18 mies. (10 mln rocznych oszczędności)",
  },
];

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "Czy oferujecie rozliczenie z oszczędności (ESCO)?",
    a: "Tak, dla projektów powyżej 50 000 PLN. Płacisz procent z realnych oszczędności po wdrożeniu, weryfikowany pomiarami przez 12–36 miesięcy.",
  },
  {
    q: "Czy macie ofertę dla startupów / małych firm?",
    a: "Konsultacja jest bezpłatna dla wszystkich. Audyt energetyczny dla małych firm (poniżej 1 MW) zaczyna się od 8 500 PLN — pełen pakiet.",
  },
  {
    q: "Czy cena obejmuje wsparcie wdrożeniowe?",
    a: "Standardowy audyt zawiera 2h spotkania podsumowującego. Pełne wsparcie wdrożeniowe (nadzór + monitoring) to opcjonalna wycena indywidualna.",
  },
  {
    q: "Czy musi być audyt zgodny z ustawą?",
    a: "Dla dużych firm (>250 osób lub kryteria obrotu/sumy bilansowej) — tak. Dla mniejszych firm robimy audyty komercyjne, które nie wymagają zgodności ustawowej, ale dają takie same rekomendacje.",
  },
  {
    q: "Czy są ukryte koszty?",
    a: "Nie. Cena ofertowa = cena finalna. Jeśli zakres się zmieni (np. więcej punktów pomiarowych), informujemy przed pomiarami i ustalamy nowe widełki.",
  },
];

export default function CennikPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Strona główna", url: `${BASE}/` },
    { name: "Cennik", url: `${BASE}/cennik` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* 1. HERO */}
      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[12px] font-mono uppercase tracking-[0.16em] text-[#222328]/60"
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-[#26890d]">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#26890d]">Cennik</li>
            </ol>
          </nav>

          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Cennik
          </p>
          <h1
            className="font-display max-w-[22ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
            }}
          >
            Ile kosztuje audyt energetyczny
            <span style={{ color: "#8DC73F" }}>?</span>
          </h1>
          <p className="mt-6 max-w-[62ch] text-[1.1rem] leading-[1.6] text-[#222328]/75">
            Każdy projekt jest inny — ale dajemy jasne widełki cenowe i pełną
            transparentność. Bez „skontaktujemy się z ceną”.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[#26890d] text-white px-6 py-3 text-sm font-medium hover:bg-[#1f6f0a] transition-colors"
            >
              Zamów wycenę
              <ArrowUpRight size={14} weight="bold" />
            </Link>
            <Link
              href={SITE.surveyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[#222328]/20 px-6 py-3 text-sm font-medium text-[#222328] hover:border-[#26890d] hover:text-[#26890d] transition-colors"
            >
              Bezpłatna konsultacja
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. HONEST PRICING PRINCIPLES */}
      <section className="bg-[#f7f7f4]">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Nasze zasady
          </p>
          <h2
            className="font-display max-w-[22ch]"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Cztery rzeczy, których u nas nie ma
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl border border-black/10 p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <XCircle size={22} weight="bold" />
                </div>
                <h3 className="mt-5 font-display text-[1.15rem] tracking-[-0.01em] text-[#222328]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#222328]/70">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRICING TIERS */}
      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Cennik
          </p>
          <h2
            className="font-display max-w-[22ch]"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Trzy główne pakiety
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>
          <p className="mt-5 max-w-[62ch] text-[1rem] leading-[1.6] text-[#222328]/70">
            Wszystkie ceny netto. VAT 23%. Wycena dostosowana do skali zakładu i
            zakresu pomiarów.
          </p>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {TIERS.map((tier) => {
              const featured = tier.featured;
              const cardBg = featured
                ? "bg-[#26890d] text-white"
                : "bg-white text-[#222328] border border-black/10";
              const badgeBg = featured
                ? "bg-white/15 text-white"
                : "bg-[#26890d]/10 text-[#26890d]";
              const priceColor = featured ? "text-[#cdee9a]" : "text-[#26890d]";
              const descColor = featured ? "text-white/80" : "text-[#222328]/70";
              const checkColor = featured ? "text-[#cdee9a]" : "text-[#26890d]";
              const itemColor = featured ? "text-white/90" : "text-[#222328]/85";
              const ctaClasses =
                tier.ctaStyle === "primary"
                  ? "bg-white text-[#26890d] hover:bg-[#cdee9a]"
                  : featured
                  ? "border border-white/40 text-white hover:bg-white/10"
                  : "border border-[#222328]/20 text-[#222328] hover:border-[#26890d] hover:text-[#26890d]";

              return (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-3xl p-8 lg:p-9 ${cardBg}`}
                >
                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${badgeBg}`}
                  >
                    {tier.badge}
                  </span>

                  <h3
                    className="mt-6 font-display text-[1.4rem] tracking-[-0.01em]"
                    style={{ fontWeight: 200 }}
                  >
                    {tier.name}
                  </h3>

                  <div className="mt-5 flex items-baseline gap-2">
                    <p
                      className={`font-display ${priceColor}`}
                      style={{
                        fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
                        fontWeight: 100,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {tier.price}
                    </p>
                    {tier.priceNote ? (
                      <span className={`text-xs ${descColor}`}>
                        {tier.priceNote}
                      </span>
                    ) : null}
                  </div>

                  <p className={`mt-3 text-sm leading-relaxed ${descColor}`}>
                    {tier.description}
                  </p>

                  <ul className="mt-7 space-y-3 text-sm">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          weight="bold"
                          className={`mt-0.5 shrink-0 ${checkColor}`}
                        />
                        <span className={itemColor}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-2">
                    <Link
                      href={tier.cta.href}
                      target={tier.cta.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        tier.cta.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${ctaClasses}`}
                    >
                      {tier.cta.label}
                      <ArrowUpRight size={14} weight="bold" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRICING FACTORS */}
      <section className="bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] mb-3" style={{ color: "#86bc25" }}>
            Co wpływa na cenę
          </p>
          <h2
            className="font-display max-w-[24ch]"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Cena audytu zależy od 6 czynników
            <span style={{ color: "#86bc25" }}>.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACTORS.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-6"
              >
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(134,188,37,0.15)", color: "#86bc25" }}
                >
                  <Icon size={22} weight="bold" />
                </div>
                <h3
                  className="mt-5 font-display tracking-[-0.01em]"
                  style={{ fontSize: "1rem", fontWeight: 300 }}
                >
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING EXAMPLES */}
      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Przykłady
          </p>
          <h2
            className="font-display max-w-[24ch]"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Konkretne wyceny z naszej praktyki
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {EXAMPLES.map((ex) => (
              <article
                key={ex.title}
                className="flex flex-col rounded-2xl bg-white border border-black/10 p-7"
              >
                <h3 className="font-display text-[1.25rem] tracking-[-0.01em] text-[#222328]" style={{ fontWeight: 200 }}>
                  {ex.title}
                </h3>

                <dl className="mt-5 divide-y divide-black/[0.06] text-sm">
                  {ex.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-3 py-2.5"
                    >
                      <dt className="text-[#222328]/60">{row.label}</dt>
                      <dd className="text-[#222328] font-medium text-right">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#222328]/60">
                    Cena
                  </p>
                  <p
                    className="font-display mt-1"
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)",
                      fontWeight: 100,
                      color: "#26890d",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                    }}
                  >
                    {ex.price}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="rounded-xl bg-[#26890d]/[0.08] ring-1 ring-[#26890d]/20 px-4 py-3">
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d]">
                      Wynik
                    </p>
                    <p className="mt-1 text-sm text-[#222328]">{ex.result}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ROI CALCULATOR */}
      <section className="bg-[#f7f7f4]">
        <div className="container-site pt-[clamp(4rem,7vw,7rem)] pb-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Kalkulator
          </p>
          <h2
            className="font-display max-w-[22ch]"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Oblicz, ile możesz zaoszczędzić
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>
        </div>
        <HelpCalculator />
      </section>

      {/* 7. FAQ */}
      <section className="bg-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            FAQ
          </p>
          <h2
            className="font-display max-w-[22ch]"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Najczęstsze pytania o cenę
            <span style={{ color: "#8DC73F" }}>.</span>
          </h2>

          <div className="mt-10 max-w-[68ch] divide-y divide-black/10 border-t border-b border-black/10">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[#222328]">
                  <span className="font-display text-[1.1rem] tracking-[-0.01em]" style={{ fontWeight: 300 }}>
                    {faq.q}
                  </span>
                  <CaretDown
                    size={18}
                    weight="bold"
                    className="mt-1 shrink-0 text-[#26890d] transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 max-w-[62ch] text-[0.95rem] leading-[1.65] text-[#222328]/75">
                  {faq.a}
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
            className="font-display mx-auto max-w-[22ch]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Gotowi do wyceny
            <span style={{ color: "#86bc25" }}>?</span>
          </h2>
          <p className="mt-5 mx-auto max-w-[58ch] text-[1.05rem] leading-[1.6] text-white/70">
            Odpowiadamy w ciągu 24h roboczych z konkretnymi widełkami i planem
            audytu dla Twojego zakładu.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[#86bc25] text-[#0d1a0d] px-6 py-3 text-sm font-medium hover:bg-[#cdee9a] transition-colors"
            >
              Zamów wycenę indywidualną
              <ArrowUpRight size={14} weight="bold" />
            </Link>
            <Link
              href={SITE.surveyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Bezpłatna konsultacja
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
