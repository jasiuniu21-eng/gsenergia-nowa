import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, CITY_SLUGS } from "@/lib/locations";
import { LocationPage } from "@/components/locations/LocationPage";

const BASE = "https://gsenergia.pl";

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = CITIES[city];
  if (!data) return {};

  const title = `Audyt energetyczny — ${data.city}`;
  const description = `Audyt energetyczny dla zakładów produkcyjnych w ${data.cityIn} i regionie ${data.voivodeship}. Niezależne doradztwo, ROI < 18 mies. Od 2008 r.`;
  const url = `${BASE}/lokalizacje/${city}`;

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

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = CITIES[city];
  if (!data) notFound();
  return <LocationPage data={data} />;
}
