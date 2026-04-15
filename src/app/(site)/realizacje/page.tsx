import type { Metadata } from "next";
import Link from "next/link";
import { getAll } from "@/lib/content";

export const metadata: Metadata = {
  title: "Realizacje — case studies · GS Energia",
  description:
    "Przegląd zrealizowanych audytów energetycznych GS Energia: duże przedsiębiorstwa, infrastruktura publiczna, przemysł. Sprawdzone wyniki – oszczędności 10–45% zużycia energii.",
};

export default function RealizacjePage() {
  const realizacje = getAll("realizacje");

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Realizacje</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">
        Wybrane projekty audytów energetycznych zrealizowanych przez GS Energia od 2008 roku.
        Ponad 400 audytów dla firm produkcyjnych, instytucji publicznych i infrastruktury krytycznej.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {realizacje.map((doc) => {
          const savings = doc.frontmatter.metrics?.savings_pct;
          return (
            <Link
              key={doc.slug}
              href={`/realizacje/${doc.slug}`}
              className="block border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {doc.frontmatter.realizacja_type ?? "Audyt energetyczny"}
                </span>
                {savings != null && (
                  <span className="text-sm font-bold text-green-700 shrink-0">
                    −{savings}%
                  </span>
                )}
              </div>
              <h2 className="font-semibold text-gray-900 leading-snug">
                {doc.frontmatter.realizacja_name ?? doc.frontmatter.title}
              </h2>
              {doc.frontmatter.excerpt && (
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {doc.frontmatter.excerpt}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
