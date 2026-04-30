import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { INDUSTRIES, INDUSTRY_SLUGS } from "@/lib/industries";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const BASE = "https://gsenergia.pl";

export const metadata: Metadata = {
  title: "Audyty energetyczne dla branż przemysłowych · GS Energia",
  description:
    "Dedykowane audyty energetyczne dla spożywki, motoryzacji, energetyki i chemii. Każda branża ma własną specyfikę — my znamy wszystkie.",
  alternates: { canonical: `${BASE}/branze` },
  openGraph: {
    type: "website",
    title: "Audyty energetyczne dla branż przemysłowych · GS Energia",
    description:
      "Dedykowane audyty energetyczne dla spożywki, motoryzacji, energetyki i chemii.",
    url: `${BASE}/branze`,
    siteName: "GS Energia",
  },
};

export default function BranzeIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Branże" },
        ])}
      />

      {/* Hero */}
      <section className="bg-white text-[#222328] border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
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
              <li aria-hidden="true" className="opacity-50">›</li>
              <li className="text-[#222328]" aria-current="page">Branże</li>
            </ol>
          </nav>

          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-4">
            Branże
          </p>

          <h1
            className="font-display text-balance"
            style={{
              fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Audyt energetyczny dla każdej branży
            <span style={{ color: "#8DC73F" }}>.</span>
          </h1>

          <p className="mt-6 max-w-[68ch] text-[color:var(--c-fg-muted)] leading-[1.6] text-[1.15rem]">
            Każdy sektor ma własną specyfikę — chłodnictwo w spożywce, lakiernie w motoryzacji,
            destylacja w chemii. Mierzymy każdy proces z osobna.
          </p>
        </div>
      </section>

      {/* Industry cards */}
      <section className="bg-[oklch(0.98_0.01_140)] border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRY_SLUGS.map((slug) => {
              const d = INDUSTRIES[slug];
              return (
                <Link
                  key={slug}
                  href={`/branze/${slug}`}
                  className="group flex flex-col rounded-2xl border border-black/10 bg-white p-8 lg:p-10 hover:border-[#26890d]/40 hover:shadow-[0_24px_60px_-30px_rgba(38,137,13,0.35)] transition-all"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d]">
                    Branża
                  </p>
                  <h2
                    className="mt-3 font-display text-[#222328]"
                    style={{
                      fontSize: "clamp(1.75rem, 2.5vw + 0.5rem, 2.5rem)",
                      fontWeight: 100,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {d.name}
                    <span style={{ color: "#8DC73F" }}>.</span>
                  </h2>
                  <p className="mt-4 text-[0.98rem] text-[color:var(--c-fg-muted)] leading-[1.6]">
                    {d.hero.subline}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-[#26890d]">
                    Zobacz szczegóły
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Other industry CTA */}
          <div className="mt-10 rounded-2xl border border-dashed border-black/15 bg-white px-7 py-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[1rem] text-[#222328]/85 max-w-[60ch]">
              Inna branża? Skontaktuj się — przygotujemy ofertę dopasowaną do Twojego zakładu.
            </p>
            <a
              href={SITE.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#26890d] px-6 py-3 text-sm font-medium text-white hover:bg-[#1e6e0a] transition-colors"
            >
              Zamów konsultację
              <ArrowRight size={15} weight="bold" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
