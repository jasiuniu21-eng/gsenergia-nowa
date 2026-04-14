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

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: { label: string; href: string; description?: string }[];
};

export const SERVICES: NavItem["children"] = [
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

export const NAV: NavItem[] = [
  { label: "Usługi", href: "/uslugi", children: SERVICES },
  { label: "Realizacje", href: "/realizacje" },
  { label: "O nas", href: "/o-nas" },
  { label: "Referencje", href: "/referencje" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];
