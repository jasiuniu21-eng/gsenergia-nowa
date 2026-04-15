import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDoc, listSlugs } from "@/lib/content";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";

const BASE = "https://gsenergia.pl";

export async function generateStaticParams() {
  return listSlugs("realizacje").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("realizacje", slug);
  if (!doc) return {};

  const client = doc.frontmatter.realizacja_name ?? "";
  const type = doc.frontmatter.realizacja_type ?? "Audyt energetyczny";
  const savings = doc.frontmatter.metrics?.savings_pct;

  const title = `${client ? `${client} — ` : ""}${type} · GS Energia`;
  const description = savings
    ? `${client}: redukcja zużycia energii o ${savings}%. Case study audytu energetycznego GS Energia.`
    : `Case study: ${type}${client ? ` dla ${client}` : ""}. Realizacje GS Energia.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE}/realizacje/${slug}` },
    openGraph: { type: "website", title, description, url: `${BASE}/realizacje/${slug}` },
  };
}

export default async function RealizacjaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("realizacje", slug);
  if (!doc) notFound();

  const { frontmatter, content } = doc;
  const metrics = frontmatter.metrics as
    | { savings_pct?: number; roi_months?: number; kwh_saved?: number; co2_t_year?: number }
    | undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Realizacje", url: `${BASE}/realizacje` },
          { name: frontmatter.title },
        ])}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:underline">Strona główna</a></li>
            <li aria-hidden="true">›</li>
            <li><a href="/realizacje" className="hover:underline">Realizacje</a></li>
            <li aria-hidden="true">›</li>
            <li className="text-neutral-800 font-medium" aria-current="page">{frontmatter.title}</li>
          </ol>
        </nav>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-6">
          {frontmatter.realizacja_type && (
            <span className="text-xs font-medium uppercase tracking-wider px-3 py-1 border border-neutral-300 text-neutral-600">
              {frontmatter.realizacja_type}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-2">
          {frontmatter.realizacja_name ?? frontmatter.title}
        </h1>

        {frontmatter.realizacja_type && (
          <p className="text-lg text-neutral-500 mb-10">{frontmatter.realizacja_type}</p>
        )}

        {/* Key metrics */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10 p-6 bg-neutral-50 border border-neutral-200">
            {metrics.savings_pct !== undefined && (
              <div>
                <p className="text-3xl font-bold text-neutral-900">−{metrics.savings_pct}%</p>
                <p className="text-xs text-neutral-500 mt-1">Redukcja zużycia</p>
              </div>
            )}
            {metrics.roi_months !== undefined && (
              <div>
                <p className="text-3xl font-bold text-neutral-900">{metrics.roi_months} mies.</p>
                <p className="text-xs text-neutral-500 mt-1">Zwrot inwestycji</p>
              </div>
            )}
            {metrics.kwh_saved !== undefined && (
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  {(metrics.kwh_saved / 1000).toFixed(0)} MWh
                </p>
                <p className="text-xs text-neutral-500 mt-1">Oszczędność roczna</p>
              </div>
            )}
            {metrics.co2_t_year !== undefined && (
              <div>
                <p className="text-3xl font-bold text-neutral-900">{metrics.co2_t_year} t</p>
                <p className="text-xs text-neutral-500 mt-1">CO₂/rok mniej</p>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        {content.trim() ? (
          <div className="prose prose-neutral max-w-none">
            <MDXRemote source={content} />
          </div>
        ) : (
          <div className="text-neutral-500 italic">
            Szczegółowy opis tej realizacji jest w przygotowaniu.
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <p className="text-neutral-600 mb-4">Chcesz podobnych wyników w swoim zakładzie?</p>
          <a
            href="https://ankieta.gsenergia.pl/ankieta/konsultacja-energetyczna"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            Zamów bezpłatną wycenę →
          </a>
        </div>
      </article>
    </>
  );
}
