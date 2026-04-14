/**
 * Shared copy for all 5 direction landing pages.
 * Client compares DESIGN, not copy — so this is identical across variants.
 */

import type { ReactNode } from "react";

export const SURVEY_URL =
  "https://ankieta.gsenergia.pl/ankieta/konsultacja-energetyczna";

export const SHARED = {
  brand: {
    name: "GS Energia",
    tagline: "Audyty energetyczne dla przemysłu",
    founded: 2008,
  },

  contact: {
    phone: "+48 606 590 931",
    phoneHref: "tel:+48606590931",
    email: "biuro@gsenergia.pl",
    emailHref: "mailto:biuro@gsenergia.pl",
    address: "Rynek Główny 28, 31-010 Kraków",
    nip: "685-221-14-17",
  },

  hero: {
    kicker: "Audyty energetyczne dla przemysłu",
    h1: "Audyt, po którym realnie spada rachunek.",
    h1Parts: ["Audyt, po którym", "realnie", "spada rachunek."] as const,
    subheadline:
      "Od 2008 roku wykonujemy audyty energetyczne, efektywnościowe, chłodnicze i wodorowe dla zakładów produkcyjnych. Pracujemy z konkretem — pokazujemy, ile i gdzie można zaoszczędzić, w jakim czasie się zwróci.",
    ctaPrimary: { label: "Zamów bezpłatną konsultację", href: SURVEY_URL },
    ctaSecondary: { label: "Zobacz nasze usługi", href: "#uslugi" },
    trust: [
      "Zgodność z ustawą o efektywności energetycznej",
      "Audytor ISO 50001",
      "18 lat, 400+ zakładów",
    ],
  },

  services: [
    {
      id: "aep",
      n: "01",
      title: "Audyt Energetyczny Przedsiębiorstwa",
      short: "Obowiązkowy co 4 lata dla dużych firm.",
      body: "Pełen przegląd zużycia we wszystkich mediach. Pomiary, analiza, raport zgodny z ustawą o efektywności energetycznej.",
      metric: "−26.8%",
      metricLabel: "typowa redukcja zużycia",
    },
    {
      id: "aee",
      n: "02",
      title: "Audyt Efektywności Energetycznej",
      short: "Do białych certyfikatów i dotacji.",
      body: "Identyfikacja konkretnych środków poprawy efektywności. Obliczenia ROI, wnioski o świadectwa efektywności energetycznej.",
      metric: "2,4 lata",
      metricLabel: "średni zwrot inwestycji",
    },
    {
      id: "chlodniczy",
      n: "03",
      title: "Audyt Chłodniczy",
      short: "Specjalistyczny audyt systemów chłodu.",
      body: "Agregaty wody lodowej, COP/EER, czynniki chłodnicze, sterowanie. Dla branż spożywczej, farmaceutycznej, data center.",
      metric: "15–30%",
      metricLabel: "oszczędności w chłodzeniu",
    },
    {
      id: "wodorowy",
      n: "04",
      title: "Audyt Wodorowy",
      short: "H2-ready dla nowej ery energetyki.",
      body: "Analiza gotowości zakładu do integracji technologii wodorowych. Infrastruktura, bezpieczeństwo ATEX, ścieżka transformacji.",
      metric: "H2",
      metricLabel: "zielony wodór",
    },
    {
      id: "ems",
      n: "05",
      title: "EMS / Telemetria",
      short: "Monitoring mediów w czasie rzeczywistym.",
      body: "System zarządzania energią. Liczniki, transmisja, dashboard, alerty, raporty. Podstawa ciągłej optymalizacji.",
      metric: "24/7",
      metricLabel: "real-time monitoring",
    },
    {
      id: "bess",
      n: "06",
      title: "Magazyn Energii / BESS",
      short: "Dobór, projekt, integracja z OZE.",
      body: "Peak shaving, rezerwa mocy, optymalizacja taryf, współpraca z fotowoltaiką. Pełen design + wdrożenie.",
      metric: "BESS",
      metricLabel: "battery energy storage",
    },
    {
      id: "dekarbo",
      n: "07",
      title: "Dekarbonizacja",
      short: "Ścieżka do Net Zero zgodna z CSRD.",
      body: "Audyt emisji Scope 1, 2, 3. Plan transformacji, raport CSRD, wsparcie przy ESG i zielonym finansowaniu.",
      metric: "Net Zero",
      metricLabel: "strategia 2030+",
    },
  ] as const,

  proof: {
    caseId: "Case PL-2024-087",
    client: "Zakład produkcji spożywczej",
    region: "Małopolska",
    year: "2024",
    metricLabel: "Roczne zużycie energii",
    before: { value: "8 472", unit: "MWh", label: "Przed audytem" },
    after: { value: "6 198", unit: "MWh", label: "Po wdrożeniu" },
    delta: "−26.8%",
    roi: "Zwrot 2 lata 4 mies.",
    co2: "1 842 t CO₂ / rok",
    certificates: "Białe certyfikaty",
    bars: [
      { label: "Sprężone powietrze", value: 0.42, color: "brand" as const },
      { label: "Chłód procesowy", value: 0.71, color: "amber" as const },
      { label: "HVAC", value: 0.34, color: "brand" as const },
    ],
  },

  whyUs: [
    {
      n: "01",
      title: "Mierzymy, nie zgadujemy",
      body: "Pomiary w zakładzie 7–14 dni, analizatory klasy A. Raport z danymi, nie opiniami.",
    },
    {
      n: "02",
      title: "Mówimy o pieniądzach",
      body: "Każda rekomendacja ma wyliczony ROI. Pokazujemy, co robić najpierw, co potem, a czego nie opłaca się wcale.",
    },
    {
      n: "03",
      title: "Prowadzimy do wdrożenia",
      body: "Pomagamy w przetargach, nadzorze, białych certyfikatach i raportowaniu CSRD. Od pomiaru do odbioru.",
    },
    {
      n: "04",
      title: "18 lat, 400+ zakładów",
      body: "Pierwszy audyt zrobiliśmy w 2008. Od tego czasu — spożywcza, chemia, automotive, infrastruktura krytyczna.",
    },
  ] as const,

  stats: [
    { value: "400+", label: "audytów energetycznych" },
    { value: "18", label: "lat doświadczenia" },
    { value: "2,4 GWh", label: "oszczędności rocznie dla klientów" },
    { value: "1 842 t", label: "CO₂ zredukowane rocznie" },
  ] as const,

  ctaBanner: {
    kicker: "Bezpłatna wycena w 48h",
    headline: "Policzmy, co możesz zaoszczędzić.",
    body:
      "Powiedz nam o swoim zakładzie. Odpowiemy konkretną wyceną audytu w ciągu 48 godzin — żadnej magii marketingowej, tylko zakres, cena i czas.",
    button: { label: "Zamów konsultację", href: SURVEY_URL },
    phoneLabel: "albo zadzwoń:",
  },

  footer: {
    navUslugi: [
      { label: "Audyt Energetyczny Przedsiębiorstwa", href: "#aep" },
      { label: "Audyt Efektywności", href: "#aee" },
      { label: "Audyt Chłodniczy", href: "#chlodniczy" },
      { label: "Audyt Wodorowy", href: "#wodorowy" },
      { label: "EMS / Telemetria", href: "#ems" },
      { label: "Magazyn Energii / BESS", href: "#bess" },
      { label: "Dekarbonizacja", href: "#dekarbo" },
    ],
    navFirma: [
      { label: "O nas", href: "/o-nas" },
      { label: "Realizacje", href: "/realizacje" },
      { label: "Blog", href: "/blog" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    copyright: `© 2008–${new Date().getFullYear()} GS Energia. Wszystkie prawa zastrzeżone.`,
  },
};

export type Service = (typeof SHARED.services)[number];
export type WhyUs = (typeof SHARED.whyUs)[number];
