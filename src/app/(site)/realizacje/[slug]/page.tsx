import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getAll, getDoc, listSlugs } from "@/lib/content";
import { SITE } from "@/lib/site";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/seo";
import { getRealizacjaMeta } from "@/lib/realizacje-meta";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

const BASE = "https://gsenergia.pl";

// ─── Static params ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return listSlugs("realizacje").map((slug) => ({ slug }));
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("realizacje", slug);
  if (!doc) return {};

  const meta = getRealizacjaMeta(slug);
  const title = `${meta.client} — ${doc.frontmatter.title} · GS Energia`;
  const description =
    (doc.frontmatter.excerpt as string | undefined) ??
    `Case study: ${doc.frontmatter.title} dla ${meta.client}.`;
  const url = `${BASE}/realizacje/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "GS Energia",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

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

function renderTitleWithDot(title: string) {
  const trimmed = title.replace(/[.。．]\s*$/u, "");
  return (
    <>
      {trimmed}
      <span style={{ color: "#8DC73F" }}>.</span>
    </>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function RealizacjaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("realizacje", slug);
  if (!doc || doc.content.trim().length === 0) notFound();

  const { frontmatter, content } = doc;
  const meta = getRealizacjaMeta(slug);
  const dateStr = formatPlDate(frontmatter.date as string);
  const excerpt = (frontmatter.excerpt as string | undefined) ?? "";

  const allRealizacje = getAll("realizacje");
  const related = allRealizacje.filter((r) => r.slug !== slug).slice(0, 3);

  // Resolve related services from /content/uslugi (best-effort)
  const relatedServices = meta.relatedServices
    .map((serviceSlug) => {
      const sDoc = getDoc("uslugi", serviceSlug);
      if (!sDoc) return null;
      return {
        slug: serviceSlug,
        title: (sDoc.frontmatter.title as string) ?? serviceSlug,
        excerpt: (sDoc.frontmatter.excerpt as string | undefined) ?? "",
      };
    })
    .filter(
      (s): s is { slug: string; title: string; excerpt: string } => s !== null,
    )
    .slice(0, 3);

  const metricTiles: { label: string; value: string }[] = [
    { label: "Branża", value: meta.sector },
    { label: "Region", value: meta.region },
    { label: "Czas trwania", value: meta.duration },
    { label: "Wynik główny", value: meta.metric },
  ];

  return (
    <>
      <ReadingProgress />

      <JsonLd
        data={articleSchema({
          title: frontmatter.title as string,
          date: (frontmatter.date as string) ?? new Date().toISOString(),
          slug,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Realizacje", url: `${BASE}/realizacje` },
          { name: frontmatter.title as string },
        ])}
      />

      {/* ─── Block 1: Header ──────────────────────────────────────────────── */}
      <section className="bg-white text-[#222328] border-b border-black/5">
        <div
          className="container-narrow mx-auto px-6 py-[clamp(3rem,5vw,5rem)]"
          style={{ maxWidth: 820 }}
        >
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
                  href="/realizacje"
                  className="hover:text-[#26890d] transition-colors"
                >
                  Realizacje
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-50">
                ›
              </li>
              <li
                className="text-[#222328] truncate max-w-[40ch]"
                aria-current="page"
              >
                {frontmatter.title as string}
              </li>
            </ol>
          </nav>

          {dateStr ? (
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-4">
              {dateStr}
            </p>
          ) : null}

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {renderTitleWithDot(frontmatter.title as string)}
          </h1>

          <p className="mt-4 text-[0.95rem] text-[#26890d]">{meta.client}</p>

          {excerpt ? (
            <p
              className="mt-5 max-w-[58ch] text-[color:var(--c-fg-muted)] leading-[1.65]"
              style={{ fontSize: "1.1rem" }}
            >
              {excerpt}
            </p>
          ) : null}
        </div>
      </section>

      {/* ─── Block 2: Key metric tiles ────────────────────────────────────── */}
      <section className="bg-white">
        <div className="container-site pb-[clamp(2rem,4vw,3rem)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metricTiles.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl bg-[oklch(0.97_0.02_140)] ring-1 ring-black/5 p-6 text-center"
              >
                <p
                  className="font-display text-[#26890d]"
                  style={{
                    fontSize: "clamp(1.3rem, 1.5vw + 0.6rem, 1.75rem)",
                    fontWeight: 100,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {t.value}
                </p>
                <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.22em] text-[color:var(--c-fg-muted)]">
                  {t.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Block 3: MDX body ────────────────────────────────────────────── */}
      <section className="bg-[oklch(0.98_0.01_140)] border-y border-black/5">
        <div
          className="container-narrow mx-auto px-6 py-[clamp(4rem,7vw,7rem)]"
          style={{ maxWidth: 820 }}
        >
          <div
            className="prose prose-zinc max-w-none
              prose-headings:font-display prose-headings:font-light prose-headings:tracking-[-0.01em]
              prose-h2:text-[#26890d] prose-h2:mt-12 prose-h2:mb-5
              prose-h3:text-[#222328]
              prose-p:leading-[1.75] prose-p:text-[#222328]/85
              prose-a:text-[#8DC73F] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#222328]
              prose-blockquote:border-l-4 prose-blockquote:border-[#8DC73F] prose-blockquote:not-italic
              prose-li:leading-[1.7]"
          >
            <MDXRemote source={content} />
          </div>
        </div>
      </section>

      {/* ─── Block 4: Related services ────────────────────────────────────── */}
      {relatedServices.length > 0 ? (
        <section className="bg-white border-b border-black/5">
          <div className="container-site py-[clamp(4rem,7vw,7rem)]">
            <div className="mb-10">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
                Usługi w tej realizacji
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
                Co tu wykorzystaliśmy
                <span style={{ color: "#8DC73F" }}>.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/uslugi/${s.slug}`}
                  className="group flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                    Usługa
                  </p>
                  <h3 className="mt-2 font-display text-[1.15rem] tracking-[-0.01em] text-[#222328] leading-[1.3]">
                    {s.title}
                  </h3>
                  {s.excerpt ? (
                    <p className="mt-3 text-[0.92rem] text-[color:var(--c-fg-muted)] leading-[1.55] line-clamp-3">
                      {s.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-5 inline-flex items-center gap-1 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors">
                    Zobacz usługę
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ─── Block 5: Related case studies ────────────────────────────────── */}
      {related.length > 0 ? (
        <section className="bg-[oklch(0.98_0.01_140)] border-b border-black/5">
          <div className="container-site py-[clamp(4rem,7vw,7rem)]">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
                  Inne realizacje
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
                  Zobacz też
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
              {related.map((doc2) => {
                const m = getRealizacjaMeta(doc2.slug);
                return (
                  <article
                    key={doc2.slug}
                    className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
                  >
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                      {m.sector}
                    </p>
                    <h3 className="mt-2 font-display text-[1.2rem] tracking-[-0.01em] text-[#222328] leading-[1.25]">
                      {m.client}
                    </h3>

                    <div className="mt-5 inline-flex items-center self-start rounded-full bg-[#26890d]/10 text-[#26890d] ring-1 ring-[#26890d]/20 px-3.5 py-1.5">
                      <span
                        className="font-display tracking-[-0.02em]"
                        style={{ fontSize: "1.05rem", fontWeight: 400 }}
                      >
                        {m.metric}
                      </span>
                    </div>

                    <p className="mt-5 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55] line-clamp-4">
                      {(doc2.frontmatter.excerpt as string) ?? ""}
                    </p>

                    <Link
                      href={`/realizacje/${doc2.slug}`}
                      className="mt-6 inline-flex items-center gap-1 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors"
                    >
                      Czytaj realizację
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
      ) : null}

      {/* ─── Block 6: Final CTA ───────────────────────────────────────────── */}
      <section className="bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)] text-center">
          <h2
            className="font-display mx-auto max-w-[22ch]"
            style={{
              fontSize: "clamp(2.25rem, 4vw + 0.8rem, 3.75rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Masz podobne wyzwanie
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
              className="inline-flex items-center gap-2 rounded-full bg-[#26890d] px-7 py-3.5 text-sm font-medium text-white hover:bg-[#1e6e0a] transition-colors"
            >
              Zamów konsultację
              <ArrowRight size={15} weight="bold" />
            </a>
            <Link
              href="/realizacje"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              Wszystkie realizacje
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
