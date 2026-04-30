import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Newspaper, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { getAll } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktyczne case studies, regulacje OZE, dotacje. Wiedza energetyczna od audytorów GS Energia.",
  alternates: { canonical: "https://gsenergia.pl/blog" },
};

const PAGE_SIZE = 12;

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

function deriveExcerpt(post: { content: string; frontmatter: Record<string, unknown> }): string {
  const fm = post.frontmatter.excerpt;
  if (typeof fm === "string" && fm.trim().length > 0) return fm;
  const stripped = post.content.replace(/[#*_`>\-\[\]()]/g, "").trim();
  return stripped.slice(0, 180).replace(/\s+\S*$/, "") + "…";
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const allPosts = getAll("posts");
  const total = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const rawPage = Number.parseInt(params?.page ?? "1", 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.min(rawPage, totalPages) : 1;

  const isFirstPage = page === 1;
  const featured = isFirstPage ? allPosts[0] : null;
  const offset = isFirstPage ? 1 : (page - 1) * PAGE_SIZE;
  const limit = isFirstPage ? PAGE_SIZE - 1 : PAGE_SIZE;
  const gridPosts = allPosts.slice(offset, offset + limit);

  const pageList = buildPageList(page, totalPages);
  const pageHref = (n: number) => (n === 1 ? "/blog" : `/blog?page=${n}`);

  return (
    <div className="bg-white text-[#222328]">
      {/* Block A: Hero */}
      <section className="container-site py-[clamp(4rem,7vw,7rem)]">
        <nav aria-label="Okruszki" className="text-sm text-[color:var(--c-fg-subtle)] mb-8">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#26890d] transition-colors">
                Strona główna
              </Link>
            </li>
            <li aria-hidden="true" className="text-black/20">/</li>
            <li className="text-[#222328]" aria-current="page">Blog</li>
          </ol>
        </nav>

        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-4">
          Blog
        </p>
        <h1
          className="font-display max-w-[20ch]"
          style={{
            fontSize: "clamp(2.5rem, 4vw + 1rem, 4.25rem)",
            fontWeight: 100,
            letterSpacing: "-0.02em",
            lineHeight: 1.04,
          }}
        >
          Wiedza energetyczna<span style={{ color: "#8DC73F" }}>.</span>
        </h1>
        <p className="mt-6 max-w-[60ch] text-[1.05rem] leading-[1.65] text-[color:var(--c-fg-muted)]">
          Praktyczne case studies, regulacje, dotacje, analizy rynku — pisane przez audytorów dla
          zakładów przemysłowych. {total} artykułów.
        </p>
      </section>

      {/* Block B: Featured (only on page 1) */}
      {featured && (
        <section className="container-site pb-[clamp(2.5rem,4vw,4rem)]">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-3xl border border-black/10 overflow-hidden bg-white hover:border-[#26890d]/40 hover:shadow-[0_28px_60px_-30px_rgba(38,137,13,0.32)] transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0">
              <div className="relative bg-gradient-to-br from-[#26890d] to-[#8DC73F] aspect-[4/3] lg:aspect-auto lg:min-h-[420px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
                <Newspaper
                  size={140}
                  weight="thin"
                  color="white"
                  className="relative drop-shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-6 left-6 text-[11px] font-mono uppercase tracking-[0.22em] text-white/90 bg-black/15 backdrop-blur px-3 py-1.5 rounded-full">
                  Polecane
                </span>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {formatDate(featured.frontmatter.date as string | undefined) && (
                  <time
                    dateTime={featured.frontmatter.date as string | undefined}
                    className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d]"
                  >
                    {formatDate(featured.frontmatter.date as string | undefined)}
                  </time>
                )}
                <h2
                  className="mt-4 font-display tracking-[-0.01em] text-[#222328]"
                  style={{ fontSize: "clamp(1.5rem, 1.6vw + 0.8rem, 2rem)", lineHeight: 1.2 }}
                >
                  {(featured.frontmatter.title as string) ?? featured.slug}
                </h2>
                <p className="mt-5 text-[1rem] leading-[1.65] text-[color:var(--c-fg-muted)] line-clamp-3">
                  {deriveExcerpt(featured)}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-[#26890d] font-medium group-hover:gap-2.5 transition-all">
                  Czytaj całość
                  <ArrowUpRight size={16} weight="bold" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Block C: Grid */}
      <section className="container-site pb-[clamp(3rem,5vw,5rem)]">
        {!isFirstPage && (
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--c-fg-subtle)] mb-8">
            Strona {page} z {totalPages}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gridPosts.map((post) => {
            const dateLabel = formatDate(post.frontmatter.date as string | undefined);
            const title = (post.frontmatter.title as string) ?? post.slug;
            return (
              <article
                key={post.slug}
                className="group relative rounded-2xl border border-black/10 p-7 bg-white hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] hover:-translate-y-0.5 transition-all flex flex-col"
              >
                {dateLabel && (
                  <time
                    dateTime={(post.frontmatter.date as string | undefined) ?? undefined}
                    className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]"
                  >
                    {dateLabel}
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
                    {title}
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
      </section>

      {/* Block D: Pagination */}
      {totalPages > 1 && (
        <section className="container-site pb-[clamp(4rem,7vw,7rem)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-black/10">
            <p className="text-sm text-[color:var(--c-fg-muted)]">
              Strona <span className="text-[#222328] font-medium">{page}</span> z {totalPages}
              <span className="mx-2 text-black/20">·</span>
              {total} artykułów
            </p>

            <nav aria-label="Paginacja" className="flex items-center gap-1.5">
              <Link
                href={page > 1 ? pageHref(page - 1) : "#"}
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : undefined}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 transition-colors ${
                  page === 1
                    ? "opacity-40 pointer-events-none"
                    : "hover:border-[#26890d]/40 hover:text-[#26890d]"
                }`}
                aria-label="Poprzednia strona"
              >
                <CaretLeft size={16} weight="bold" />
              </Link>

              {pageList.map((p, i) =>
                p === "…" ? (
                  <span
                    key={`e-${i}`}
                    className="inline-flex items-center justify-center w-10 h-10 text-sm text-[color:var(--c-fg-subtle)]"
                  >
                    …
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={pageHref(p)}
                    aria-current={p === page ? "page" : undefined}
                    className={`inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-full text-sm transition-colors ${
                      p === page
                        ? "bg-[#26890d] text-white font-medium"
                        : "border border-black/10 hover:border-[#26890d]/40 hover:text-[#26890d]"
                    }`}
                  >
                    {p}
                  </Link>
                )
              )}

              <Link
                href={page < totalPages ? pageHref(page + 1) : "#"}
                aria-disabled={page === totalPages}
                tabIndex={page === totalPages ? -1 : undefined}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 transition-colors ${
                  page === totalPages
                    ? "opacity-40 pointer-events-none"
                    : "hover:border-[#26890d]/40 hover:text-[#26890d]"
                }`}
                aria-label="Następna strona"
              >
                <CaretRight size={16} weight="bold" />
              </Link>
            </nav>
          </div>
        </section>
      )}
    </div>
  );
}
