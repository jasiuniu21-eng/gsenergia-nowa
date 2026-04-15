import { SITE } from "./site";

const BASE_URL = "https://gsenergia.pl";

// ─── LocalBusiness + Organization (inject in root layout) ───────────────────

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE_URL}/#organization`,
    name: SITE.name,
    url: BASE_URL,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: "2008",
    areaServed: "Polska",
    description:
      "Audyty energetyczne dla zakładów produkcyjnych. Od 2008 r. pomagamy przemysłowi redukować zużycie energii i koszty.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rynek Główny 28",
      addressLocality: "Kraków",
      postalCode: "31-010",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.06196,
      longitude: 19.93644,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    additionalProperty: {
      "@type": "PropertyValue",
      name: "NIP",
      value: SITE.nip,
    },
    sameAs: [
      SITE.social.facebook,
      SITE.social.twitter,
      SITE.social.youtube,
    ],
  };
}

// ─── Service Schema (per /uslugi/[slug]) ────────────────────────────────────

export function serviceSchema({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    serviceType: "Energy Audit",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: "Polska",
    url: `${BASE_URL}/uslugi/${slug}`,
  };
}

// ─── FAQPage Schema (from frontmatter faq array) ─────────────────────────────

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ─── Article Schema (per /blog/[slug]) ──────────────────────────────────────

export function articleSchema({
  title,
  date,
  dateModified,
  slug,
}: {
  title: string;
  date: string;
  dateModified?: string;
  slug: string;
}) {
  const published = new Date(date).toISOString();
  const modified = dateModified
    ? new Date(dateModified).toISOString()
    : published;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: published,
    dateModified: modified,
    url: `${BASE_URL}/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: BASE_URL,
    },
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "pl-PL",
  };
}

// ─── BreadcrumbList (per dynamic page) ──────────────────────────────────────

export function breadcrumbSchema(
  items: { name: string; url?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

// ─── JsonLd component helper (renders <script> tag) ─────────────────────────

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
