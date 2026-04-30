// Per-slug metadata for realizacje case studies.
// Hand-curated based on MDX bodies — extracting key metric, sector, region,
// duration, and recommended related services. Used by both list and detail
// pages so the same client/sector mapping is consistent everywhere.

export type RealizacjaMeta = {
  client: string;
  sector: string;
  region: string;
  duration: string;
  metric: string;
  metricLabel: string;
  relatedServices: string[]; // slugs from content/uslugi
};

export const REALIZACJE_META: Record<string, RealizacjaMeta> = {
  "2895-2": {
    client: "PGE GiEK · Elektrownia Turów",
    sector: "Energetyka konwencjonalna",
    region: "Bogatynia, Dolny Śląsk",
    duration: "Wieloetapowy",
    metric: "−18%",
    metricLabel: "energii w systemach chłodniczych",
    relatedServices: [
      "chlodnictwo-klimatyzacja-efektywne-energetycznie",
      "okresowa-kontrola-systemu-klimatyzacji-i-ogrzewania",
      "audyt-energetyczny-przedsiebiorstwa",
    ],
  },
  "4474-2": {
    client: "Wody Polskie",
    sector: "Infrastruktura publiczna",
    region: "Cała Polska",
    duration: "Co 4 lata",
    metric: "−16%",
    metricLabel: "potencjał oszczędności w infrastrukturze",
    relatedServices: [
      "audyt-energetyczny-przedsiebiorstwa",
      "audyt-oswietlenia",
      "ems-telemetria",
    ],
  },
  "4476-2": {
    client: "PSE — Polskie Sieci Elektroenergetyczne",
    sector: "Operator systemu przesyłowego",
    region: "Konstancin-Jeziorna + cała Polska",
    duration: "Wieloetapowy",
    metric: "−15%",
    metricLabel: "oszczędności energii własnej",
    relatedServices: [
      "audyt-energetyczny-przedsiebiorstwa",
      "audyt-jakosci-energii",
      "audyt-oswietlenia",
    ],
  },
  "kompleksowy-audyt-energetyczny-przedsiebiorstwa-2": {
    client: "ZF Friedrichshafen Polska",
    sector: "Motoryzacja",
    region: "Polska (4 zakłady)",
    duration: "Co 4 lata",
    metric: "−18%",
    metricLabel: "potencjał w zakładach produkcyjnych",
    relatedServices: [
      "audyt-energetyczny-przedsiebiorstwa",
      "audyt-sprezonego-powietrza",
      "audyt-energetyczny-technologii-produkcji",
    ],
  },
  "kompleksowy-audyt-energetyczny-przedsiebiorstwa-3": {
    client: "BSH Sprzęt Gospodarstwa Domowego",
    sector: "Produkcja AGD",
    region: "Polska",
    duration: "Co 4 lata",
    metric: "−20%",
    metricLabel: "i mapa do neutralności klimatycznej",
    relatedServices: [
      "audyt-energetyczny-przedsiebiorstwa",
      "audyt-sprezonego-powietrza",
      "dekarbonizacja",
    ],
  },
  "kompleksowy-audyt-energetyczny-przedsiebiorstwa": {
    client: "PGE Energia Odnawialna",
    sector: "OZE — wiatr, woda, PV",
    region: "Cała Polska",
    duration: "Co 4 lata",
    metric: "−22%",
    metricLabel: "potencjał oszczędności OPEX",
    relatedServices: [
      "audyt-energetyczny-przedsiebiorstwa",
      "odnawialne-zrodla-energii",
      "ems-telemetria",
    ],
  },
  "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-phasellus-aliquet-egestas-urna-vitae-efficitur":
    {
      client: "Mando Corporation Poland",
      sector: "Motoryzacja",
      region: "Polska",
      duration: "Pojedyncza ocena",
      metric: "7 urządzeń",
      metricLabel: "od 12 kW — ocena EER zgodna z ErP",
      relatedServices: [
        "chlodnictwo-klimatyzacja-efektywne-energetycznie",
        "okresowa-kontrola-systemu-klimatyzacji-i-ogrzewania",
        "audyt-chlodniczy",
      ],
    },
  "przeprowadzenie-oceny-efektywnosci-energetycznej-systemu-grzewczego-i-klimatyzacyjnego-2":
    {
      client: "Mercedes-Benz Manufacturing Poland",
      sector: "Motoryzacja — silniki i baterie EV",
      region: "Jawor, Dolny Śląsk",
      duration: "Wieloetapowy",
      metric: "ESEER",
      metricLabel: "rzeczywiste wskaźniki efektywności HVAC",
      relatedServices: [
        "okresowa-kontrola-systemu-klimatyzacji-i-ogrzewania",
        "chlodnictwo-klimatyzacja-efektywne-energetycznie",
        "audyt-energetyczny-technologii-produkcji",
      ],
    },
  "przeprowadzenie-oceny-efektywnosci-energetycznej-systemu-grzewczego-i-klimatyzacyjnego":
    {
      client: "BSH Bosch und Siemens Hausgeräte",
      sector: "Produkcja AGD",
      region: "Polska (wiele lokalizacji)",
      duration: "Wielodniowe kampanie",
      metric: "SCOP / SEER",
      metricLabel: "ocena sezonowa systemów HVAC",
      relatedServices: [
        "okresowa-kontrola-systemu-klimatyzacji-i-ogrzewania",
        "chlodnictwo-klimatyzacja-efektywne-energetycznie",
        "budynek-inteligentny-automatyka",
      ],
    },
  telemetria: {
    client: "Shell Polska",
    sector: "Sieć stacji paliw",
    region: "Cała Polska",
    duration: "Wdrożenie + utrzymanie",
    metric: "EMS 24/7",
    metricLabel: "centralna telemetria setek obiektów",
    relatedServices: [
      "ems-telemetria",
      "optymalizacja-sprzedazy-i-dystrybucji-energii-elektrycznej-gazu",
      "audyt-efektywnosci-energetycznej",
    ],
  },
  "wykonanie-badan-efektywnosci-energetycznej-urzadzen-chlodniczych-w-klimatyzacji":
    {
      client: "Polska Agencja Żeglugi Powietrznej",
      sector: "Infrastruktura krytyczna — ATC",
      region: "Warszawa, Gdańsk, Łódź, Szczecin, Rzeszów",
      duration: "5 oddziałów",
      metric: "5 oddziałów",
      metricLabel: "ocena EER zgodna z ErP, 24/7 niezawodność",
      relatedServices: [
        "chlodnictwo-klimatyzacja-efektywne-energetycznie",
        "okresowa-kontrola-systemu-klimatyzacji-i-ogrzewania",
        "audyt-chlodniczy",
      ],
    },
};

export function getRealizacjaMeta(slug: string): RealizacjaMeta {
  return (
    REALIZACJE_META[slug] ?? {
      client: "Realizacja GS Energia",
      sector: "Audyt energetyczny",
      region: "Polska",
      duration: "Zrealizowano",
      metric: "Realizacja",
      metricLabel: "audyt energetyczny",
      relatedServices: [
        "audyt-efektywnosci-energetycznej",
        "audyt-energetyczny-przedsiebiorstwa",
        "ems-telemetria",
      ],
    }
  );
}
