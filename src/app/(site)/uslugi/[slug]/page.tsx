import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDoc, listSlugs } from "@/lib/content";
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
    doc.frontmatter.metaTitle ??
    `${doc.frontmatter.title} · GS Energia`;
  const description =
    doc.frontmatter.excerpt ??
    `${doc.frontmatter.title} dla zakładów produkcyjnych. Bezpłatna wycena audytu w 48 h.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE}/uslugi/${slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${BASE}/uslugi/${slug}`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UslugaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("uslugi", slug);
  if (!doc) notFound();

  const { frontmatter, content } = doc;
  const faqs: { q: string; a: string }[] = frontmatter.faq ?? [];
  const excerpt =
    frontmatter.excerpt ??
    `${frontmatter.title} dla zakładów produkcyjnych.`;

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
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Usługi", url: `${BASE}/uslugi` },
          { name: frontmatter.title },
        ])}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:underline">Strona główna</a></li>
            <li aria-hidden="true">›</li>
            <li><a href="/uslugi" className="hover:underline">Usługi</a></li>
            <li aria-hidden="true">›</li>
            <li className="text-neutral-800 font-medium" aria-current="page">{frontmatter.title}</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold leading-tight mb-6">
          {frontmatter.title}
        </h1>

        {frontmatter.su_header && (
          <p className="text-lg text-neutral-600 leading-relaxed mb-10 border-l-0 pl-0">
            {frontmatter.su_header}
          </p>
        )}

        {/* MDX content */}
        {content.trim() ? (
          <div className="prose prose-neutral max-w-none">
            <MDXRemote source={content} />
          </div>
        ) : (
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-500 italic">
              Szczegółowy opis tej usługi jest w przygotowaniu. Skontaktuj się z nami, aby uzyskać więcej informacji.
            </p>
          </div>
        )}

        {/* FAQ section */}
        {faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Często zadawane pytania</h2>
            <dl className="space-y-6">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border-t border-neutral-200 pt-6">
                  <dt className="font-semibold text-neutral-900 mb-3">{q}</dt>
                  <dd className="text-neutral-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 bg-neutral-50 border border-neutral-200">
          <h2 className="text-xl font-bold mb-2">Zamów bezpłatną wycenę</h2>
          <p className="text-neutral-600 mb-6">
            Odpowiadamy w ciągu 48 h. Zadzwoń lub wyślij formularz.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://ankieta.gsenergia.pl/ankieta/konsultacja-energetyczna"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
            >
              Wypełnij formularz →
            </a>
            <a
              href="tel:+48606590931"
              className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 text-neutral-900 text-sm font-medium hover:bg-neutral-100 transition-colors"
            >
              +48 606 590 931
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
