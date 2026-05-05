import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { HelpCalculator } from "@/components/sections/HelpCalculator";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientsWall } from "@/components/sections/ClientsWall";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { News } from "@/components/sections/News";
import { Newsletter } from "@/components/sections/Newsletter";
import { Contact } from "@/components/sections/Contact";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/seo";

const HOMEPAGE_TITLE =
  "GS Energia — audyty energetyczne dla przemysłu i budynków";
const HOMEPAGE_DESCRIPTION =
  "Audyty energetyczne, EMS, BESS i fotowoltaika dla zakładów produkcyjnych. Od 2008 r., 400+ realizacji, redukcja rachunku 15–30%.";

export const metadata: Metadata = {
  title: { absolute: HOMEPAGE_TITLE },
  description: HOMEPAGE_DESCRIPTION,
  alternates: {
    canonical: "https://gsenergia.pl/",
  },
  openGraph: {
    type: "website",
    url: "https://gsenergia.pl/",
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    locale: "pl_PL",
    siteName: "GS Energia",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GS Energia — audyty energetyczne dla przemysłu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

// Structured data — services on the homepage (uses {title, description, slug} per serviceSchema signature)
const SERVICES_SCHEMA = [
  { title: "Audyt energetyczny przedsiębiorstwa",     description: "Obowiązkowy co 4 lata audyt dla dużych firm. Pomiar, analiza i biały certyfikat.",      slug: "audyt-energetyczny-przedsiebiorstwa" },
  { title: "Audyt efektywności energetycznej",         description: "Identyfikacja źródeł oszczędności i wsparcie dla pozyskania białych certyfikatów.",     slug: "audyt-efektywnosci-energetycznej" },
  { title: "Magazyn energii / BESS",                   description: "Analiza opłacalności, dobór mocy i pojemności, integracja z PV i siecią.",              slug: "aktualne-i-planowane-nabory" },
  { title: "Świadectwo charakterystyki energetycznej", description: "Pełna dokumentacja energetyczna budynków komercyjnych i mieszkaniowych.",                slug: "audyt-energetyczny-budynku" },
  { title: "Audyt chłodniczy",                         description: "Efektywność energetyczna urządzeń chłodniczych i klimatyzacji.",                         slug: "audyt-chlodniczy" },
  { title: "Audyt wodorowy",                           description: "Audyt wodorowy, analiza opłacalności i wdrożenia.",                                       slug: "audyt-wodorowy" },
  { title: "Audyt na cele OZE",                        description: "Projektowanie, dobór i nadzór instalacji PV, pomp ciepła i innych OZE.",                  slug: "audyt-energetyczny-na-cele-oze" },
  { title: "Audyt energetyczny budynku — Kraków",      description: "Audyt energetyczny budynków komercyjnych i biurowych w Krakowie i Małopolsce.",          slug: "audyt-energetyczny-krakow" },
];

// FAQ matching the value props on the page
const FAQS = [
  {
    q: "Ile kosztuje audyt energetyczny przedsiębiorstwa?",
    a: "Cena audytu zależy od skali zakładu, mocy zamówionej i zakresu pomiarów. Wstępna konsultacja jest bezpłatna — po krótkiej rozmowie podamy widełki cenowe i czas realizacji (zwykle 4–8 tygodni).",
  },
  {
    q: "O ile obniżymy rachunek za prąd po audycie?",
    a: "Średnia redukcja rachunku w naszych projektach to 15–30%. Dokładną wartość pokazuje raport audytu — z konkretną kalkulacją ROI dla każdej rekomendacji.",
  },
  {
    q: "Czy audyt energetyczny jest obowiązkowy?",
    a: "Tak — duże przedsiębiorstwa (zatrudniające ponad 250 osób lub spełniające kryteria obrotu i sumy bilansowej) mają obowiązek przeprowadzania audytu energetycznego co 4 lata, zgodnie z ustawą o efektywności energetycznej.",
  },
  {
    q: "W jakim czasie zwraca się inwestycja w rekomendacje audytu?",
    a: "W naszych realizacjach średni czas zwrotu inwestycji (ROI) z rekomendacji audytu to poniżej 18 miesięcy. Każda rekomendacja zawiera szczegółową kalkulację okresu zwrotu.",
  },
  {
    q: "Czy działacie w całej Polsce?",
    a: "Tak. Mamy siedzibę w Krakowie, ale realizujemy projekty w całym kraju — od Warszawy, przez Wrocław, Łódź, Poznań po Katowice. Współpracujemy z 400+ zakładami w Polsce.",
  },
];

export default function Home() {
  return (
    <>
      {/* SEO structured data — Service catalog and FAQ */}
      {SERVICES_SCHEMA.map((s) => (
        <JsonLd key={s.slug} data={serviceSchema(s)} />
      ))}
      <JsonLd data={faqSchema(FAQS)} />

      <Hero />
      <ClientsWall />
      <HelpCalculator />
      <Services />
      <CaseStudies />
      <WhyUs />
      <Testimonials />
      <HowItWorks />
      <News />
      <Newsletter />
      <Contact />
    </>
  );
}
