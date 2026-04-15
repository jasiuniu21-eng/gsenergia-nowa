import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDoc, listSlugs } from "@/lib/content";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/seo";

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
  // Auto-generate excerpt from content if not in frontmatter
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

// ─── Reading time helper ──────────────────────────────────────────────────────

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

      <article className="max-w-2xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:underline">Strona główna</a></li>
            <li aria-hidden="true">›</li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li aria-hidden="true">›</li>
            <li className="text-neutral-800 font-medium truncate max-w-[200px]" aria-current="page">
              {frontmatter.title}
            </li>
          </ol>
        </nav>

        {/* Categories */}
        {frontmatter.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {(frontmatter.categories as string[]).map((cat) => (
              <a
                key={cat}
                href={`/blog?kategoria=${cat}`}
                className="text-xs font-medium uppercase tracking-wider px-3 py-1 border border-neutral-300 text-neutral-600 hover:border-neutral-500 transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
          {frontmatter.title}
        </h1>

        {/* Meta bar */}
        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-10 pb-8 border-b border-neutral-200">
          {dateStr && <time dateTime={frontmatter.date}>{dateStr}</time>}
          <span aria-hidden="true">·</span>
          <span>{mins} min czytania</span>
        </div>

        {/* Content */}
        <div className="prose prose-neutral max-w-none">
          <MDXRemote source={content} />
        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-wrap gap-4">
          <a href="/blog" className="text-sm text-neutral-600 hover:underline">
            ← Wróć do bloga
          </a>
          <a
            href="https://ankieta.gsenergia.pl/ankieta/konsultacja-energetyczna"
            className="ml-auto text-sm font-medium text-neutral-900 hover:underline"
          >
            Zamów audyt →
          </a>
        </div>
      </article>
    </>
  );
}
