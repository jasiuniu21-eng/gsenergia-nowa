import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/industries/IndustryPage";
import { INDUSTRIES, INDUSTRY_SLUGS } from "@/lib/industries";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/seo";

const BASE = "https://gsenergia.pl";

export async function generateStaticParams() {
  return INDUSTRY_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const data = INDUSTRIES[industry];
  if (!data) return {};

  const title = `${data.hero.headline} · GS Energia`;
  const description = data.hero.subline;
  const url = `${BASE}/branze/${industry}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "GS Energia",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function industryServiceSchema(data: (typeof INDUSTRIES)[string]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.hero.headline,
    description: data.hero.subline,
    serviceType: data.name,
    provider: { "@id": `${BASE}/#organization` },
    areaServed: "Polska",
    url: `${BASE}/branze/${data.slug}`,
  };
}

export default async function BranzaPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const data = INDUSTRIES[industry];
  if (!data) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", url: BASE },
          { name: "Branże", url: `${BASE}/branze` },
          { name: data.name },
        ])}
      />
      <JsonLd data={industryServiceSchema(data)} />
      <JsonLd data={faqSchema(data.faq)} />

      <IndustryPage data={data} />
    </>
  );
}
