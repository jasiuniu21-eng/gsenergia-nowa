import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getDoc, listSlugs } from "@/lib/content";
import { SITE } from "@/lib/site";
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  JsonLd,
} from "@/lib/seo";

const BASE = "https://gsenergia.pl";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return listSlugs("uslugi").map((slug) => ({ slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("uslugi", slug);
  if (!doc) return {};

  const title =
    doc.frontmatter.metaTitle ?? `${doc.frontmatter.title} · GS Energia`;
  const description =
    doc.frontmatter.excerpt ??
    `${doc.frontmatter.title} dla zakładów produkcyjnych. Bezpłatna wycena audytu w 48 h.`;
  const url = `${BASE}/uslugi/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "GS Energia",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ─── Static content for layout blocks ─────────────────────────────────────────

const FACTS: { label: string; value: string }[] = [
  { label: "Czas realizacji", value: "4–8 tygodni" },
  { label: "Wycena", value: "Bezpłatna" },
  { label: "Zwrot inwestycji", value: "Średnio 18 mies." },
  { label: "Zasięg", value: "Cała Polska" },
];

const PROCESS: { title: string; desc: string }[] = [
  {
    title: "Wywiad i analiza",
    desc: "Rozumiemy Twój zakład. Dane, cele, ograniczenia.",
  },
  {
    title: "Pomiary terenowe",
    desc: "Audytorzy zbierają realne dane na obiekcie. 1–4 tyg.",
  },
  {
    title: "Raport z rekomendacjami",
    desc: "Każda rekomendacja z konkretnym ROI w PLN.",
  },
  {
    title: "Wsparcie wdrożenia",
    desc: "Pomagamy w realizacji i monitoringu efektów.",
  },
];

const RELATED_CASES: {
  client: string;
  sector: string;
  metric: string;
  metricLabel: string;
  summary: string;
  href: string;
}[] = [
  {
    client: "PGE GiEK · Elektrownia Turów",
    sector: "Energetyka konwencjonalna",
    metric: "−18%",
    metricLabel: "energii w systemach chłodniczych",
    summary:
      "Ocena efektywności i modernizacja chłodni kominowych oraz instalacji klimatyzacyjnych w jednej z największych elektrowni węglowych w Polsce.",
    href: "/realizacje/2895-2",
  },
  {
    client: "Shell Polska",
    sector: "Sieć stacji paliw",
    metric: "Centralna telemetria",
    metricLabel: "dla setek obiektów 24/7",
    summary:
      "Architektura i wdrożenie systemu monitoringu mediów + audyt energetyczny stacji benzynowych — bieżący wgląd w zużycie i optymalizacja taryf.",
    href: "/realizacje/telemetria",
  },
  {
    client: "BSH Sprzęt Gospodarstwa Domowego",
    sector: "Produkcja AGD",
    metric: "−27%",
    metricLabel: "w obszarze sprężonego powietrza",
    summary:
      "Audyt sprężonego powietrza i sieci dystrybucji w zakładzie produkcyjnym — wykrycie strat, rekompresja, zalecenia o ROI < 18 mies.",
    href: "/realizacje",
  },
];

const DEFAULT_FAQS: { q: string; a: string }[] = [
  {
    q: "Ile to kosztuje?",
    a: "Cena zależy od wielkości zakładu i zakresu pomiarów. Wstępna konsultacja jest bezpłatna — po krótkiej rozmowie podamy widełki cenowe.",
  },
  {
    q: "Jak długo trwa realizacja?",
    a: "Standardowo 4–8 tygodni od momentu rozpoczęcia pomiarów. Dla mniejszych zakładów 2–3 tygodnie.",
  },
  {
    q: "Co dostaję jako wynik?",
    a: "Pełen raport audytu w PDF z konkretnymi rekomendacjami i kalkulacją ROI dla każdej. Spotkanie podsumowujące z prezentacją wyników.",
  },
  {
    q: "Czy pomagacie wdrożyć rekomendacje?",
    a: "Tak. Po raporcie oferujemy nadzór nad wdrożeniem i monitoring efektów (model ESCO — opcjonalnie rozliczenie z oszczędności).",
  },
];

// Render the H1 title with a lime period at the end.
function renderTitleWithDot(title: string) {
  const trimmed = title.replace(/[.。．]\s*$/u, "");
  return (
    <>
      {trimmed}
      <span style={{ color: "#8DC73F" }}>.</span>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UslugaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("uslugi", slug);
  if (!doc || doc.content.trim().length === 0) notFound();

  const { frontmatter, content } = doc;
  const frontmatterFaqs: { q: string; a: string }[] = frontmatter.faq ?? [];
  const faqs = frontmatterFaqs.length > 0 ? frontmatterFaqs : DEFAULT_FAQS;
  const excerpt =
    frontmatter.excerpt ?? `${frontmatter.title} dla zakładów produkcyjnych.`;

  return (
    <>
      {/* Structured data */}
      <JsonLd
        data={serviceSchema({
          title: frontmatter.title,
          description: excerpt,
          slug,
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Usługi", url: `${BASE}/uslugi` },
          { name: frontmatter.title },
        ])}
      />

      {/* ─── Block 1: Hero ───────────────────────────────────────────────── */}
      <section className="bg-white text-[#222328] border-b border-black/5">
        <div className="container-site py-[clamp(5rem,9vw,8rem)]">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--c-fg-muted)]"
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
              <li
                className="text-[#222328] truncate max-w-[40ch]"
                aria-current="page"
              >
                {frontmatter.title}
              </li>
            </ol>
          </nav>

          {/* Eyebrow */}
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-4">
            Usługa
          </p>

          {/* H1 */}
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {renderTitleWithDot(frontmatter.title)}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 max-w-[68ch] text-[color:var(--c-fg-muted)] leading-[1.6]"
            style={{ fontSize: "1.15rem" }}
          >
            {excerpt}
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={SITE.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#26890d] px-6 py-3 text-sm font-medium text-white hover:bg-[#1e6e0a] transition-colors"
            >
              Zamów bezpłatną wycenę
              <ArrowRight size={15} weight="bold" />
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-[#222328] hover:border-[#26890d] hover:text-[#26890d] transition-colors"
            >
              Skontaktuj się
            </Link>
          </div>

          {/* Fact tiles */}
          <div className="mt-14 rounded-2xl bg-white border border-black/10 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {FACTS.map((f) => (
              <div key={f.label} className="min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[color:var(--c-fg-muted)]">
                  {f.label}
                </p>
                <p
                  className="mt-2 font-display text-[#222328]"
                  style={{
                    fontSize: "clamp(1.25rem, 1vw + 1rem, 1.6rem)",
                    fontWeight: 100,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                  }}
                >
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Block 2: MDX Body ───────────────────────────────────────────── */}
      <section className="bg-[oklch(0.98_0.01_140)]">
        <div
          className="container-narrow mx-auto py-[clamp(4rem,7vw,7rem)]"
          style={{ maxWidth: 820 }}
        >
          <div
            className="prose prose-zinc max-w-none
              prose-headings:font-display prose-headings:font-light prose-headings:tracking-[-0.01em]
              prose-h2:text-[#26890d] prose-h2:mt-12 prose-h2:mb-5
              prose-h3:text-[#222328]
              prose-p:leading-[1.75] prose-p:text-[#222328]/85
              prose-a:text-[#26890d] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#222328]
              prose-li:leading-[1.7]"
          >
            <MDXRemote source={content} />
          </div>
        </div>
      </section>

      {/* ─── Block 3: Process ─────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[40ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
              Jak działamy
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Cztery kroki do oszczędności
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

      {/* ─── Block 4: Related case studies ────────────────────────────────── */}
      <section className="bg-white border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-[40ch]">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
                Realizacje
              </p>
              <h2
                className="font-display text-[#222328]"
                style={{
                  fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                  fontWeight: 100,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Realizacje, które zrobiliśmy
                <span style={{ color: "#8DC73F" }}>.</span>
              </h2>
            </div>
            <Link
              href="/realizacje"
              className="inline-flex items-center gap-1.5 text-[0.95rem] text-[#26890d] hover:underline underline-offset-4"
            >
              Wszystkie realizacje <ArrowUpRight size={15} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RELATED_CASES.map((c) => (
              <article
                key={c.client}
                className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
              >
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                  {c.sector}
                </p>
                <h3 className="mt-2 font-display text-[1.25rem] tracking-[-0.01em] text-[#222328]">
                  {c.client}
                </h3>

                <div className="mt-6 flex items-baseline gap-2.5">
                  <span
                    className="font-display tracking-[-0.03em] text-[#26890d]"
                    style={{
                      fontSize: "clamp(2.2rem, 2vw + 1rem, 2.8rem)",
                      fontWeight: 100,
                    }}
                  >
                    {c.metric}
                  </span>
                  <span className="text-sm text-[color:var(--c-fg-muted)] leading-tight">
                    {c.metricLabel}
                  </span>
                </div>

                <p className="mt-5 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55]">
                  {c.summary}
                </p>

                <Link
                  href={c.href}
                  className="mt-6 inline-flex items-center gap-1 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors"
                >
                  Zobacz realizację
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Block 5: FAQ ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[40ch] mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
              FAQ
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Najczęstsze pytania o tę usługę
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <div className="max-w-[820px] divide-y divide-black/10 border-y border-black/10">
            {faqs.map(({ q, a }) => (
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

      {/* ─── Block 6: Final CTA ───────────────────────────────────────────── */}
      <section className="bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)] text-center">
          <h2
            className="font-display mx-auto max-w-[20ch]"
            style={{
              fontSize: "clamp(2.25rem, 4vw + 0.8rem, 3.75rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Gotowi na audyt, który się zwraca
            <span style={{ color: "#86bc25" }}>?</span>
          </h2>
          <p className="mt-5 mx-auto max-w-[52ch] text-white/70 text-[1.05rem] leading-[1.6]">
            Bezpłatna wstępna konsultacja, odpowiadamy w 24h.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#8DC73F] px-7 py-3.5 text-sm font-medium text-[#0c1a0c] hover:bg-[#9bd44a] transition-colors"
            >
              Zamów konsultację
              <ArrowRight size={15} weight="bold" />
            </a>
            <Link
              href="/uslugi"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              Zobacz inne usługi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
