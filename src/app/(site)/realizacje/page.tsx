import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";
import { getAll } from "@/lib/content";
import { SITE } from "@/lib/site";
import { getRealizacjaMeta } from "@/lib/realizacje-meta";

const BASE = "https://gsenergia.pl";

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "11 udokumentowanych projektów audytów energetycznych dla zakładów produkcyjnych. PGE, Shell, BSH, ZF, Skanska, Kaufland.",
  alternates: { canonical: `${BASE}/realizacje` },
};

const STATS: { value: string; label: string }[] = [
  { value: "400+", label: "klientów" },
  { value: "11", label: "udokumentowanych case studies" },
  { value: "−19%", label: "średnio rachunku" },
  { value: "< 18 mies.", label: "ROI" },
];

const INDUSTRIES: string[] = [
  "Motoryzacja",
  "Produkcja AGD",
  "Energetyka konwencjonalna",
  "OZE",
  "Spożywcza",
  "Chemia",
  "Retail",
  "Budownictwo",
  "Logistyka",
  "Farmaceutyczna",
  "Metalurgia",
  "Infrastruktura publiczna",
  "Lotnictwo",
  "Sieć stacji paliw",
];

function formatPlDate(raw: string | undefined): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function RealizacjeListPage() {
  const realizacje = getAll("realizacje");
  const totalCount = realizacje.length;
  const featured = realizacje[0];
  const rest = realizacje.slice(1);

  return (
    <>
      {/* ─── Block A: Hero ────────────────────────────────────────────────── */}
      <section className="bg-white text-[#222328] border-b border-black/5">
        <div className="container-site py-[clamp(5rem,9vw,8rem)]">
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
              <li className="text-[#222328]" aria-current="page">
                Realizacje
              </li>
            </ol>
          </nav>

          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-4">
            Realizacje
          </p>

          <h1
            className="font-display max-w-[18ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Liczby, nie obietnice
            <span style={{ color: "#8DC73F" }}>.</span>
          </h1>

          <p
            className="mt-6 max-w-[68ch] text-[color:var(--c-fg-muted)] leading-[1.6]"
            style={{ fontSize: "1.15rem" }}
          >
            {totalCount} udokumentowanych projektów dla zakładów produkcyjnych w
            Polsce. Każda realizacja z konkretnym ROI.
          </p>
        </div>
      </section>

      {/* ─── Block B: Stats strip ────────────────────────────────────────── */}
      <section className="bg-[oklch(0.98_0.01_140)] border-b border-black/5">
        <div className="container-site py-[clamp(2.5rem,4vw,4rem)]">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {STATS.map((s) => (
              <li key={s.label} className="min-w-0">
                <p
                  className="font-display text-[#26890d]"
                  style={{
                    fontSize: "clamp(1.8rem, 2vw + 1rem, 2.6rem)",
                    fontWeight: 100,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  {s.value}
                </p>
                <p className="mt-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-muted)]">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Block C: Featured case study ───────────────────────────────── */}
      {featured ? (
        <section className="bg-white border-b border-black/5">
          <div className="container-site py-[clamp(4rem,7vw,7rem)]">
            <div className="mb-10">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
                Najnowsza realizacja
              </p>
              <h2
                className="font-display text-[#222328]"
                style={{
                  fontSize: "clamp(1.6rem, 2vw + 0.8rem, 2.2rem)",
                  fontWeight: 100,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Świeżo z terenu
                <span style={{ color: "#8DC73F" }}>.</span>
              </h2>
            </div>

            {(() => {
              const meta = getRealizacjaMeta(featured.slug);
              const dateStr = formatPlDate(featured.frontmatter.date as string);
              return (
                <Link
                  href={`/realizacje/${featured.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl border border-black/10 overflow-hidden hover:border-[#26890d]/40 hover:shadow-[0_24px_60px_-30px_rgba(38,137,13,0.30)] transition-all"
                >
                  <div className="relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-[#26890d] to-[#8DC73F] flex items-center justify-center">
                    <ChartLineUp size={120} weight="thin" className="text-white/90" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white/95">
                      <span className="text-[11px] font-mono uppercase tracking-[0.22em]">
                        {meta.sector}
                      </span>
                      <span
                        className="font-display text-[1.6rem]"
                        style={{ fontWeight: 100 }}
                      >
                        {meta.metric}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    {dateStr ? (
                      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--c-fg-muted)] mb-3">
                        {dateStr}
                      </p>
                    ) : null}
                    <h3
                      className="font-display text-[#222328]"
                      style={{
                        fontSize: "clamp(1.5rem, 2vw + 0.6rem, 2.1rem)",
                        fontWeight: 100,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                      }}
                    >
                      {(featured.frontmatter.title as string) ?? meta.client}
                    </h3>
                    <p className="mt-2 text-[0.95rem] text-[#26890d]">
                      {meta.client}
                    </p>
                    <p className="mt-5 text-[1rem] text-[color:var(--c-fg-muted)] leading-[1.6]">
                      {(featured.frontmatter.excerpt as string) ?? ""}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors">
                      Zobacz realizację
                      <ArrowRight
                        size={15}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              );
            })()}
          </div>
        </section>
      ) : null}

      {/* ─── Block D: All case studies grid ─────────────────────────────── */}
      <section className="bg-[oklch(0.98_0.01_140)] border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[40ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
              Wszystkie realizacje
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
              Każda z konkretnym ROI
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((doc) => {
              const meta = getRealizacjaMeta(doc.slug);
              const excerpt = (doc.frontmatter.excerpt as string) ?? "";
              return (
                <article
                  key={doc.slug}
                  className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                    {meta.sector}
                  </p>
                  <h3 className="mt-2 font-display text-[1.2rem] tracking-[-0.01em] text-[#222328] leading-[1.25]">
                    {meta.client}
                  </h3>

                  <div className="mt-5 inline-flex items-center self-start rounded-full bg-[#26890d]/10 text-[#26890d] ring-1 ring-[#26890d]/20 px-3.5 py-1.5">
                    <span
                      className="font-display tracking-[-0.02em]"
                      style={{ fontSize: "1.05rem", fontWeight: 400 }}
                    >
                      {meta.metric}
                    </span>
                  </div>

                  <p className="mt-5 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55] line-clamp-4">
                    {excerpt}
                  </p>

                  <Link
                    href={`/realizacje/${doc.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors"
                    aria-label={`Zobacz realizację: ${meta.client}`}
                  >
                    Zobacz realizację
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Block E: Industries ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,6rem)]">
          <div className="max-w-[44ch] mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
              Branże
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(1.8rem, 2.5vw + 0.6rem, 2.4rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Branże, dla których pracowaliśmy
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <ul className="flex flex-wrap gap-2.5">
            {INDUSTRIES.map((ind) => (
              <li
                key={ind}
                className="bg-[#26890d]/10 text-[#26890d] ring-1 ring-[#26890d]/20 rounded-full px-4 py-2 text-sm"
              >
                {ind}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Block F: Final CTA ──────────────────────────────────────────── */}
      <section className="bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)] text-center">
          <h2
            className="font-display mx-auto max-w-[24ch]"
            style={{
              fontSize: "clamp(2.25rem, 4vw + 0.8rem, 3.75rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Twoja firma może być następną realizacją
            <span style={{ color: "#86bc25" }}>.</span>
          </h2>
          <p className="mt-5 mx-auto max-w-[52ch] text-white/70 text-[1.05rem] leading-[1.6]">
            Bezpłatny audyt wstępny — odpowiadamy w 24h.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#8DC73F] px-7 py-3.5 text-sm font-medium text-[#0c1a0c] hover:bg-[#9bd44a] transition-colors"
            >
              Zamów bezpłatny audyt wstępny
              <ArrowRight size={15} weight="bold" />
            </a>
            <Link
              href="/uslugi"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              Wszystkie usługi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
