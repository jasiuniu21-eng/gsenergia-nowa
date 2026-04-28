export const SITE = {
  name: "GS Energia",
  phone: "+48 606 590 931",
  phoneHref: "tel:+48606590931",
  email: "biuro@gsenergia.pl",
  emailHref: "mailto:biuro@gsenergia.pl",
  addressMain: "Rynek Główny 28, 31-010 Kraków",
  addressReg: "Trzcinica 536, 38-207 Przysieki",
  nip: "685-221-14-17",
  bank: "36 1910 1048 2116 4621 5823 0001",
  surveyUrl: "https://ankieta.gsenergia.pl/ankieta/konsultacja-energetyczna",
  social: {
    facebook: "https://www.facebook.com/pages/GS-Energia/410864732305106",
    twitter: "https://twitter.com/gsenergia",
    youtube: "https://www.youtube.com/user/gsenergiapl",
  },
  copyright: "2008–2026",
} as const;

export type NavChild = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavChild[] };
export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
  groups?: NavGroup[]; // two-column mega-menu (e.g. Audyty + Usługi)
  cta?: { label: string; href: string; description?: string };
};

/** Back-compat: flat SERVICES list (used by existing MDX/content flows). */
export const SERVICES: NavChild[] = [
  {
    label: "Audyt Energetyczny Przedsiębiorstwa",
    href: "/uslugi/audyt-energetyczny-przedsiebiorstwa",
    description: "Obowiązkowy audyt co 4 lata dla dużych firm",
  },
  {
    label: "Audyt Efektywności Energetycznej",
    href: "/uslugi/audyt-efektywnosci-energetycznej",
    description: "Do białych certyfikatów i dotacji",
  },
  {
    label: "Audyt Chłodniczy",
    href: "/uslugi/audyt-chlodniczy",
    description: "Specjalistyczny audyt systemów chłodu",
  },
  {
    label: "Audyt Wodorowy",
    href: "/uslugi/audyt-wodorowy",
    description: "H2-ready dla nowej ery energetyki",
  },
  {
    label: "EMS / Telemetria",
    href: "/uslugi/ems-telemetria",
    description: "Monitoring mediów w czasie rzeczywistym",
  },
  {
    label: "Magazyn Energii / BESS",
    href: "/uslugi/magazyn-energii-bess",
    description: "Dobór, wdrożenie, integracja z OZE",
  },
  {
    label: "Dekarbonizacja",
    href: "/uslugi/dekarbonizacja",
    description: "Ścieżka do Net Zero zgodnie z CSRD",
  },
];

/** Biznesowy — dwa segmenty: Audyty + Usługi (per Joanna+Iwona 16.04.2026). */
const BIZNES_AUDYTY: NavChild[] = [
  {
    label: "Audyt Energetyczny Przedsiębiorstwa",
    href: "/uslugi/audyt-energetyczny-przedsiebiorstwa",
    description: "Obowiązkowy co 4 lata dla dużych firm",
  },
  {
    label: "Audyt Efektywności Energetycznej",
    href: "/uslugi/audyt-efektywnosci-energetycznej",
    description: "Do białych certyfikatów i dotacji",
  },
  {
    label: "Audyt Energetyczny Budynku",
    href: "/uslugi/audyt-energetyczny-budynku",
    description: "Przed termomodernizacją i dotacjami",
  },
];

const BIZNES_USLUGI: NavChild[] = [
  {
    label: "EMS / Telemetria",
    href: "/uslugi/ems-i-telemetria_2",
    description: "Monitoring mediów 24/7",
  },
  {
    label: "Banki Energii",
    href: "/uslugi/banki-energii",
    description: "Magazynowanie i zarządzanie energią",
  },
  {
    label: "Dekarbonizacja",
    href: "/uslugi/dekarbonizacja",
    description: "Ścieżka do Net Zero",
  },
  {
    label: "Kogeneracja",
    href: "/uslugi/kogeneracja",
    description: "Skojarzone wytwarzanie energii",
  },
];

/** Indywidualny — B2C (świadectwa, audyty budynków). */
const INDYWIDUALNY: NavChild[] = [
  {
    label: "Świadectwo charakterystyki energetycznej",
    href: "/uslugi/swiadectwa-charakterystyki-energetycznej",
    description: "Wymagane przy sprzedaży i najmie",
  },
  {
    label: "Audyt energetyczny budynku",
    href: "/uslugi/audyt-energetyczny-budynku",
    description: "Przed termomodernizacją",
  },
  {
    label: "Audyt remontowy",
    href: "/uslugi/audyt-remontowy",
    description: "Pod kredyt Czyste Powietrze",
  },
];

export const NAV: NavItem[] = [
  {
    label: "Klient biznesowy",
    href: "/uslugi",
    groups: [
      { label: "Audyty", items: BIZNES_AUDYTY },
      { label: "Usługi", items: BIZNES_USLUGI },
    ],
    cta: {
      label: "Zamów audyt biznesowy",
      href: "https://ankieta.gsenergia.pl/ankieta/konsultacja-energetyczna",
      description: "Bezpłatna konsultacja dla Twojego zakładu",
    },
  },
  {
    label: "Klient indywidualny",
    href: "/uslugi/indywidualny",
    children: INDYWIDUALNY,
    cta: {
      label: "Wyceń świadectwo online",
      href: "/kontakt",
      description: "Szybka wycena 24h",
    },
  },
  { label: "Realizacje", href: "/realizacje" },
  { label: "O nas", href: "/o-nas" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];
