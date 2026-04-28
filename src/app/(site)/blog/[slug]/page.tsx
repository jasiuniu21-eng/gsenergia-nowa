import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDoc, listSlugs } from "@/lib/content";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/seo";
import { ClientsWall } from "@/components/sections/ClientsWall";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

const BASE = "https://gsenergia.pl";

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
  const excerpt =
    frontmatter.excerpt ??
    content
      .replace(/[#*`[\]]/g, "")
      .trim()
      .slice(0, 155)
      .replace(/\s+\S*$/, "") + "…";

  const title = `${frontmatter.title} · GS Energia`;

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
        ? new Date(frontmatter.date).toISOString()
        : undefined,
    },
  };
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
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
  const mins = readingTime(content);
  const dateStr = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <ReadingProgress />

      <JsonLd
        data={articleSchema({
          title: frontmatter.title,
          date: frontmatter.date ?? new Date().toISOString(),
          slug,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Blog", url: `${BASE}/blog` },
          { name: frontmatter.title },
        ])}
      />

      <article className="max-w-[720px] mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-10" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-neutral-700 transition-colors">Strona główna</a></li>
            <li aria-hidden="true" className="text-neutral-300">›</li>
            <li><a href="/blog" className="hover:text-neutral-700 transition-colors">Blog</a></li>
            <li aria-hidden="true" className="text-neutral-300">›</li>
            <li className="text-neutral-600 truncate max-w-[200px]" aria-current="page">
              {frontmatter.title}
            </li>
          </ol>
        </nav>

        {/* Categories */}
        {frontmatter.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {(frontmatter.categories as string[]).map((cat) => (
              <a
                key={cat}
                href={`/blog?kategoria=${cat}`}
                className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[color:var(--c-brand-50)] text-[color:var(--c-brand-700)] hover:bg-[color:var(--c-brand-100)] transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.15] tracking-tight text-[color:var(--c-ink-900)] mb-6">
          {frontmatter.title}
        </h1>

        {/* Meta bar */}
        <div className="flex items-center gap-3 text-sm text-neutral-400 mb-10 pb-8 border-b border-neutral-100">
          {dateStr && (
            <time dateTime={frontmatter.date} className="text-neutral-500 font-medium">
              {dateStr}
            </time>
          )}
          <span aria-hidden="true" className="text-neutral-200">|</span>
          <span>{mins} min czytania</span>
        </div>

        {/* Content — bigger text, better line-height, styled headings */}
        <div className="
          prose prose-neutral max-w-none
          prose-p:text-[1.0625rem] prose-p:leading-[1.85] prose-p:text-neutral-700
          prose-headings:font-bold prose-headings:text-[color:var(--c-ink-900)] prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pl-4 prose-h2:border-l-4 prose-h2:border-[color:var(--c-brand-500)]
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-a:text-[color:var(--c-brand-700)] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[color:var(--c-ink-900)]
          prose-blockquote:border-l-4 prose-blockquote:border-[color:var(--c-brand-400)] prose-blockquote:bg-[color:var(--c-brand-50)] prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:not-italic
          prose-img:rounded-xl prose-img:shadow-md
          prose-code:text-[color:var(--c-brand-700)] prose-code:bg-[color:var(--c-brand-50)] prose-code:px-1.5 prose-code:rounded
          prose-li:text-[1.0625rem] prose-li:leading-[1.8] prose-li:text-neutral-700
          [&>p:first-of-type]:text-[1.2rem] [&>p:first-of-type]:leading-[1.75] [&>p:first-of-type]:text-neutral-600 [&>p:first-of-type]:font-medium
        ">
          <MDXRemote source={content} />
        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-wrap items-center gap-4">
          <a href="/blog" className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors">
            ← Wróć do bloga
          </a>
          <a
            href="https://ankieta.gsenergia.pl/ankieta/konsultacja-energetyczna"
            className="ml-auto inline-flex items-center gap-1.5 bg-[color:var(--c-brand-500)] text-[color:var(--c-ink-950)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[color:var(--c-brand-400)] transition-colors"
          >
            Zamów bezpłatny audyt →
          </a>
        </div>
      </article>

      <ClientsWall />
    </>
  );
}
