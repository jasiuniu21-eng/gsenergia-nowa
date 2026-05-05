import type { Metadata } from "next";
import Link from "next/link";
import {
  IdentificationCard,
  House,
  Thermometer,
  SunHorizon,
  ArrowRight,
  ArrowUpRight,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/seo";

const BASE = "https://gsenergia.pl";

export const metadata: Metadata = {
  title: "Klient indywidualny — świadectwa i audyty",
  description:
    "Świadectwa charakterystyki energetycznej, audyty termomodernizacyjne, doradztwo PV i pomp ciepła dla osób fizycznych. Wpis do CRORE, cała Polska.",
  alternates: { canonical: `${BASE}/uslugi/indywidualny` },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: {
  title: string;
  desc: string;
  price: string;
  time: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
}[] = [
  {
    title: "Świadectwo charakterystyki energetycznej",
    desc: "Wymagane prawnie przy sprzedaży i wynajmie.",
    price: "od 350 PLN",
    time: "2–3 dni",
    href: "/uslugi/swiadectwa-charakterystyki-energetycznej",
    Icon: IdentificationCard,
  },
  {
    title: "Audyt energetyczny budynku jednorodzinnego",
    desc: "Pełna diagnostyka strat ciepła, plan termomodernizacji.",
    price: "od 1500 PLN",
    time: "5–10 dni",
    href: "/uslugi/audyt-energetyczny-budynku",
    Icon: House,
  },
  {
    title: "Audyt termomodernizacyjny",
    desc: "Wymagany do programów: Czyste Powietrze, Mój Prąd, Stop Smog.",
    price: "od 2200 PLN",
    time: "7–14 dni",
    href: "/uslugi",
    Icon: Thermometer,
  },
  {
    title: "Doradztwo PV i pomp ciepła",
    desc: "Niezależne projektowanie + dobór mocy bez sprzedawców.",
    price: "wycena indywidualna",
    time: "ustalany",
    href: "/uslugi",
    Icon: SunHorizon,
  },
];

const PROGRAMS: { title: string; desc: string }[] = [
  {
    title: "Czyste Powietrze",
    desc: "Do 136 000 PLN dotacji na termomodernizację. Wymagany audyt termomodernizacyjny.",
  },
  {
    title: "Mój Prąd 6.0",
    desc: "Do 7 000 PLN dotacji + magazyn ciepła + pompa ciepła. Wymagana dokumentacja techniczna.",
  },
  {
    title: "Stop Smog",
    desc: "100% dofinansowania dla osób z niskimi dochodami.",
  },
  {
    title: "Moje Ciepło",
    desc: "Do 21 000 PLN na pompę ciepła. Wymagane świadectwo charakterystyki energetycznej.",
  },
];

const PROCESS: { title: string; desc: string }[] = [
  {
    title: "Krótka rozmowa telefoniczna",
    desc: "Ustalamy zakres i koszt. 15 min.",
  },
  {
    title: "Wizyta w domu",
    desc: "Przyjeżdżamy z aparaturą pomiarową. 2–3h.",
  },
  {
    title: "Dokumenty w 5–10 dni",
    desc: "Świadectwo lub audyt PDF + wpis do CRORE.",
  },
  {
    title: "Wsparcie aplikacyjne",
    desc: "Pomagamy w aplikacji do programów dotacyjnych.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Czy świadectwo charakterystyki energetycznej jest obowiązkowe?",
    a: "Tak. Od 2023 r. każda transakcja sprzedaży lub wynajmu nieruchomości wymaga aktualnego świadectwa. Brak = kara 5 000 zł.",
  },
  {
    q: "Ile kosztuje świadectwo dla domu jednorodzinnego?",
    a: "Standardowo 350–600 PLN, w zależności od wielkości domu i lokalizacji. Wstępna wycena bezpłatna.",
  },
  {
    q: "Jak długo ważne jest świadectwo?",
    a: "10 lat od daty wystawienia, chyba że zmienia się charakterystyka budynku.",
  },
  {
    q: "Czy macie uprawnienia do wystawiania świadectw?",
    a: "Tak. Jesteśmy wpisani do Centralnego Rejestru Charakterystyki Energetycznej Budynków (CRORE), a nasi audytorzy mają uprawnienia z Ministerstwa Rozwoju i Technologii.",
  },
  {
    q: "Czy pomagacie w aplikacji do Czystego Powietrza?",
    a: "Tak. Wspieramy w przygotowaniu dokumentacji wymaganej przez program — audyt termomodernizacyjny, kosztorys, opis technologii.",
  },
  {
    q: "Czy obsługujecie indywidualnych klientów w całej Polsce?",
    a: "Tak. Mamy zespół audytorów z dojazdem w promieniu 100 km od głównych miast (Kraków, Warszawa, Wrocław, Łódź, Katowice). Dla obiektów poza zasięgiem ustalamy ofertę indywidualnie.",
  },
];

const STATS: { value: string; label: string }[] = [
  { value: "1500+", label: "świadectw rocznie" },
  { value: "98%", label: "klientów poleca" },
  { value: "10 lat", label: "ważności świadectwa" },
  { value: "CRORE", label: "wpis do rejestru" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KlientIndywidualnyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Usługi", url: `${BASE}/uslugi` },
          { name: "Klient indywidualny" },
        ])}
      />
      <JsonLd data={faqSchema(FAQS)} />

      {/* ─── 1. Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-white text-[#222328] border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-muted)]"
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-[#26890d] transition-colors">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-50">
                ›
              </li>
              <li>
                <Link
                  href="/uslugi"
                  className="hover:text-[#26890d] transition-colors"
                >
                  Usługi
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-50">
                ›
              </li>
              <li className="text-[#222328]" aria-current="page">
                Klient indywidualny
              </li>
            </ol>
          </nav>

          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-4">
            Dla osób fizycznych
          </p>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Świadectwa, audyty, doradztwo dla Twojego domu
            <span style={{ color: "#8DC73F" }}>.</span>
          </h1>

          <p
            className="mt-6 max-w-[68ch] text-[color:var(--c-fg-muted)] leading-[1.6]"
            style={{ fontSize: "1.15rem" }}
          >
            Świadectwo charakterystyki energetycznej, audyt termomodernizacyjny,
            dobór pompy ciepła i fotowoltaiki. Profesjonalnie, szybko, w cenie
            wynagrodzenia.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[#26890d] px-6 py-3 text-sm font-medium text-white hover:bg-[#1e6e0a] transition-colors"
            >
              Wyceń świadectwo online
              <ArrowRight size={15} weight="bold" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-[#222328] hover:border-[#26890d] hover:text-[#26890d] transition-colors"
            >
              <Phone size={15} weight="bold" />
              Zadzwoń: {SITE.phone}
            </a>
          </div>

          <p className="mt-6 text-[0.85rem] text-[color:var(--c-fg-muted)]">
            ✓ Wpis do CRORE  ·  ✓ Uprawnienia MRiT  ·  ✓ Doświadczenie od 2008
              ·  ✓ Cała Polska
          </p>
        </div>
      </section>

      {/* ─── 2. Quick services ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[44ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
              Co możemy dla Ciebie zrobić
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Cztery najpopularniejsze usługi
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(({ title, desc, price, time, href, Icon }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] hover:-translate-y-0.5 transition-all"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#8DC73F]/20 text-[#26890d]">
                  <Icon size={22} weight="regular" />
                </span>
                <h3 className="mt-5 font-display text-[1.15rem] tracking-[-0.01em] text-[#222328] leading-[1.25]">
                  {title}
                </h3>
                <p className="mt-2 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55]">
                  {desc}
                </p>

                <dl className="mt-5 space-y-2 border-t border-black/5 pt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                      Cena od
                    </dt>
                    <dd className="text-sm text-[#222328]">{price}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                      Czas
                    </dt>
                    <dd className="text-sm text-[#222328]">{time}</dd>
                  </div>
                </dl>

                <span className="mt-6 inline-flex items-center gap-1 text-sm text-[#26890d] group-hover:gap-1.5 transition-all">
                  Zamów
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Programs ──────────────────────────────────────────────────── */}
      <section className="bg-[oklch(0.98_0.01_140)]">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[60ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
              Dotacje
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Pomagamy w aplikacji do programów dotacyjnych
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
            <p className="mt-5 text-[1.02rem] text-[color:var(--c-fg-muted)] leading-[1.65]">
              Oferujemy wsparcie w przygotowaniu dokumentacji do dotacji, w tym
              audytu wymaganego przez program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAMS.map(({ title, desc }) => (
              <article
                key={title}
                className="rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 transition-colors"
              >
                <span className="inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-[#26890d] bg-[#8DC73F]/20 rounded-full px-3 py-1">
                  Pomagamy w aplikacji
                </span>
                <h3 className="mt-5 font-display text-[1.2rem] tracking-[-0.01em] text-[#222328]">
                  {title}
                </h3>
                <p className="mt-3 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.6]">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. How it works ──────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[44ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
              Jak działamy
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Cztery kroki do gotowych dokumentów
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step, idx) => (
              <li
                key={step.title}
                className="relative flex flex-col rounded-2xl border border-black/10 bg-white p-6 hover:border-[#26890d]/40 transition-colors"
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#8DC73F]/20 text-[#26890d] font-display"
                  style={{ fontSize: "1.1rem", fontWeight: 400 }}
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <h3 className="mt-5 font-display text-[1.15rem] tracking-[-0.01em] text-[#222328]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55]">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 5. FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[44ch] mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
              FAQ
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Najczęstsze pytania klientów indywidualnych
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <div className="max-w-[820px] divide-y divide-black/10 border-y border-black/10">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                  <span className="font-display text-[1.1rem] tracking-[-0.01em] text-[#222328]">
                    {q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-black/15 text-[#26890d] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[68ch] text-[0.98rem] leading-[1.7] text-[color:var(--c-fg-muted)]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Trust strip ───────────────────────────────────────────────── */}
      <section className="bg-[oklch(0.98_0.01_140)] border-b border-black/5">
        <div className="container-site py-[clamp(2.5rem,4vw,4rem)]">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <li key={s.label} className="text-center md:text-left">
                <p
                  className="font-display text-[#26890d]"
                  style={{
                    fontSize: "clamp(1.6rem, 1.5vw + 1rem, 2.2rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-muted)]">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 7. Final CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[oklch(0.16_0.02_150)] text-white py-[clamp(4rem,7vw,7rem)]">
        <div className="container-site text-center">
          <h2
            className="font-display mx-auto max-w-[20ch]"
            style={{
              fontSize: "clamp(2.25rem, 4vw + 0.8rem, 3.75rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Gotowy na świadectwo
            <span style={{ color: "#86bc25" }}>?</span>
          </h2>
          <p className="mt-5 mx-auto max-w-[52ch] text-white/70 text-[1.05rem] leading-[1.6]">
            Krótki formularz, wycena w 24h.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[#8DC73F] px-7 py-3.5 text-sm font-medium text-[#0c1a0c] hover:bg-[#9bd44a] transition-colors"
            >
              Wypełnij formularz
              <ArrowRight size={15} weight="bold" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              <Phone size={15} weight="bold" />
              Zadzwoń: {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─── 8. Related links ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="container-site py-[clamp(3rem,5vw,5rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-5">
            Powiązane
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <Link
                href="/uslugi"
                className="inline-flex items-center gap-1 text-[1rem] text-[#222328] hover:text-[#26890d] transition-colors"
              >
                Klient biznesowy
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </li>
            <li>
              <Link
                href="/realizacje"
                className="inline-flex items-center gap-1 text-[1rem] text-[#222328] hover:text-[#26890d] transition-colors"
              >
                Realizacje
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-[1rem] text-[#222328] hover:text-[#26890d] transition-colors"
              >
                Blog
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
