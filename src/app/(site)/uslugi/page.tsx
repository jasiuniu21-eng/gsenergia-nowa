import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/site";
import { getAll } from "@/lib/content";

export const metadata: Metadata = {
  title: "Usługi audytów energetycznych · GS Energia",
  description:
    "Kompleksowe usługi audytów energetycznych dla firm i instytucji: audyt przedsiębiorstwa, audyt efektywności, audyt chłodniczy, EMS/telemetria, dekarbonizacja i więcej. GS Energia – Kraków, 400+ audytów od 2008.",
};

export default async function UslugiPage() {
  const uslugiDocs = await Promise.resolve(getAll("uslugi"));

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Usługi audytów energetycznych</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">
        GS Energia świadczy kompleksowe usługi z zakresu efektywności energetycznej dla
        dużych przedsiębiorstw i instytucji publicznych. Ponad 400 zrealizowanych audytów
        od 2008 roku.
      </p>

      {/* Primary services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {SERVICES?.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="block border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h2 className="text-lg font-semibold mb-2">{service.label}</h2>
            {service.description && (
              <p className="text-sm text-gray-600">{service.description}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Additional uslugi from content */}
      {uslugiDocs.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Dodatkowe usługi</h2>
          <ul className="space-y-4">
            {uslugiDocs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/uslugi/${doc.slug}`}
                  className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:border-blue-400 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{doc.frontmatter.title}</h3>
                    {doc.frontmatter.excerpt && (
                      <p className="text-sm text-gray-500 mt-1">
                        {doc.frontmatter.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
