import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getAll, getDoc, listSlugs } from "@/lib/content";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/seo";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";

const BASE = "https://gsenergia.pl";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(date: string | undefined | null): string | null {
  if (!date) return null;
  const d = new Date(String(date).replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return null;
  return dateFormatter.format(d);
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}

function deriveExcerpt(post: { content: string; frontmatter: Record<string, unknown> }): string {
  const fm = post.frontmatter.excerpt;
  if (typeof fm === "string" && fm.trim().length > 0) return fm;
  const stripped = post.content.replace(/[#*_`>\-\[\]()]/g, "").trim();
  return stripped.slice(0, 160).replace(/\s+\S*$/, "") + "…";
}

export async function generateStaticParams() {
  return listSlugs("posts").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("posts", slug);
  if (!doc) return {};

  const { frontmatter, content } = doc;
  const excerpt = deriveExcerpt({ content, frontmatter });
  const title = (frontmatter.title as string) ?? slug;

  return {
    title,
    description: excerpt,
    alternates: { canonical: `${BASE}/blog/${slug}` },
    openGraph: {
      type: "article",
      title,
      description: excerpt,
      url: `${BASE}/blog/${slug}`,
      publishedTime: frontmatter.date
        ? new Date(String(frontmatter.date).replace(" ", "T")).toISOString()
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("posts", slug);
  if (!doc) notFound();

  const { frontmatter, content } = doc;
  const title = (frontmatter.title as string) ?? slug;
  const dateRaw = frontmatter.date as string | undefined;
  const dateLabel = formatDate(dateRaw);
  const mins = readingTime(content);
  const url = `${BASE}/blog/${slug}`;

  // Related: 3 most recent posts excluding current one
  const related = getAll("posts")
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <JsonLd
        data={articleSchema({
          title,
          date: dateRaw ?? new Date().toISOString(),
          slug,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Blog", url: `${BASE}/blog` },
          { name: title },
        ])}
      />

      <article className="bg-white text-[#222328]">
        {/* Block A: Header */}
        <header className="container-narrow max-w-[820px] mx-auto px-6 py-[clamp(3rem,5vw,5rem)]">
          <nav aria-label="Okruszki" className="text-sm text-[color:var(--c-fg-subtle)] mb-8">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#26890d] transition-colors">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true" className="text-black/20">/</li>
              <li>
                <Link href="/blog" className="hover:text-[#26890d] transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-black/20">/</li>
              <li className="text-[#222328] truncate max-w-[28ch]" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          {dateLabel && (
            <time
              dateTime={dateRaw}
              className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d]"
            >
              {dateLabel}
            </time>
          )}

          <h1
            className="mt-4 font-display"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            {title}
            <span style={{ color: "#8DC73F" }}>.</span>
          </h1>

          <div className="mt-7 flex items-center justify-between flex-wrap gap-5 pb-8 border-b border-black/10">
            <p className="text-sm text-[color:var(--c-fg-muted)]">
              By <span className="text-[#222328] font-medium">GS Energia</span>
              <span className="mx-2 text-black/20">·</span>
              {mins} min czytania
            </p>
            <ShareButtons url={url} title={title} />
          </div>
        </header>

        {/* Block B: Body */}
        <div className="container-narrow max-w-[820px] mx-auto px-6 pb-[clamp(3rem,5vw,5rem)]">
          <div
            className="
              prose prose-zinc max-w-none
              prose-p:text-[1.0625rem] prose-p:leading-[1.85] prose-p:text-[color:var(--c-fg-muted)]
              prose-headings:font-display prose-headings:tracking-[-0.01em] prose-headings:font-normal
              prose-h2:text-[1.75rem] prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-[#26890d]
              prose-h3:text-[1.3rem] prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-[#222328]
              prose-a:text-[#26890d] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#222328]
              prose-blockquote:border-l-4 prose-blockquote:border-[#8DC73F] prose-blockquote:bg-[oklch(0.98_0.02_140)] prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-[1.15rem] prose-blockquote:leading-[1.7] prose-blockquote:font-display prose-blockquote:font-light
              prose-img:rounded-2xl
              prose-li:text-[1.0625rem] prose-li:leading-[1.8] prose-li:text-[color:var(--c-fg-muted)]
              [&>p:first-of-type]:text-[1.2rem] [&>p:first-of-type]:leading-[1.7] [&>p:first-of-type]:text-[#222328]
            "
          >
            <MDXRemote source={content} />
          </div>
        </div>

        {/* Block C: Author / CTA card */}
        <section className="container-narrow max-w-[820px] mx-auto px-6 pb-[clamp(2.5rem,4vw,4rem)]">
          <div className="rounded-2xl bg-[oklch(0.98_0.01_140)] ring-1 ring-black/5 p-7 lg:p-8 flex items-start gap-6 flex-col sm:flex-row">
            <div
              className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-display text-[#26890d] bg-[#8DC73F]/15 ring-1 ring-[#26890d]/15"
              aria-hidden="true"
            >
              <span style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}>GS</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                Autor: GS Energia
              </p>
              <p className="mt-2 font-display text-[1.25rem] tracking-[-0.01em] text-[#222328]">
                Niezależne doradztwo energetyczne od 2008.
              </p>
              <p className="mt-2 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.6]">
                Bezpłatna konsultacja — odpowiadamy w 24h.
              </p>
              <Link
                href="/kontakt"
                className="mt-5 inline-flex items-center gap-1.5 bg-[#26890d] hover:bg-[#1f7409] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
              >
                Umów konsultację
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </section>

        {/* TODO: Newsletter block — reuse NewsletterForm component once available. */}

        {/* Block D: Related posts */}
        {related.length > 0 && (
          <section className="border-t border-black/10 bg-white">
            <div className="container-site py-[clamp(4rem,6vw,6rem)]">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
                    Czytaj dalej
                  </p>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.5rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    Powiązane artykuły<span style={{ color: "#8DC73F" }}>.</span>
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-[0.95rem] text-[#26890d] hover:underline underline-offset-4"
                >
                  Wszystkie wpisy <ArrowUpRight size={15} weight="bold" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((post) => {
                  const rDate = formatDate(post.frontmatter.date as string | undefined);
                  const rTitle = (post.frontmatter.title as string) ?? post.slug;
                  return (
                    <article
                      key={post.slug}
                      className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] hover:-translate-y-0.5 transition-all"
                    >
                      {rDate && (
                        <time
                          dateTime={(post.frontmatter.date as string | undefined) ?? undefined}
                          className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]"
                        >
                          {rDate}
                        </time>
                      )}
                      <h3
                        className="mt-3 font-display tracking-[-0.01em] text-[#222328] line-clamp-3"
                        style={{ fontSize: "1.15rem", lineHeight: 1.25 }}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="before:absolute before:inset-0 before:rounded-2xl before:content-['']"
                        >
                          {rTitle}
                        </Link>
                      </h3>
                      <p className="mt-4 text-sm text-[color:var(--c-fg-muted)] leading-[1.6] line-clamp-3">
                        {deriveExcerpt(post)}
                      </p>
                      <span className="mt-auto pt-6 inline-flex items-center gap-1 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors">
                        Czytaj
                        <ArrowUpRight
                          size={14}
                          weight="bold"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
