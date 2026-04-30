import type { IndustryData } from "@/components/industries/IndustryPage";

export const INDUSTRIES: Record<string, IndustryData> = {
  spozywcza: {
    slug: "spozywcza",
    name: "Spożywcza",
    nameInflected: "spożywczego",
    hero: {
      headline: "Audyt energetyczny dla branży spożywczej",
      subline:
        "Chłodnictwo, sterylizacja, suszarnie, mycie CIP — energochłonne procesy w mleczarniach, mięsie, browarach i piekarniach. Mierzymy każdy z osobna.",
    },
    industryStats:
      "Branża spożywcza w Polsce zużywa ~22 TWh rocznie. Średnio 30% to chłodnictwo i sprężone powietrze.",
    metrics: [
      { label: "Chłodnictwo", value: "−24%" },
      { label: "Sprężone powietrze", value: "−18%" },
      { label: "ROI średnio", value: "16 mies." },
      { label: "ISO 50001", value: "✓" },
    ],
    challenges: [
      {
        icon: "Snowflake",
        title: "Chłodnictwo 24/7",
        description:
          "Komory, tunele, schładzarki — często 30-40% rachunku za prąd. Optymalizujemy temperatury, odszranianie i COP.",
      },
      {
        icon: "Wind",
        title: "Sprężone powietrze",
        description:
          "Wycieki, niewłaściwe ciśnienia, brak rekompresji. Mierzymy realne straty i wskazujemy ROI.",
      },
      {
        icon: "Thermometer",
        title: "HVAC i pasteryzacja",
        description:
          "Wymóg HACCP vs efektywność energetyczna — godzimy oba cele przy zachowaniu jakości produktu.",
      },
      {
        icon: "Drop",
        title: "Zużycie wody i CIP",
        description:
          "Procesy mycia w obiegu — analizujemy zużycie wody, ciepła i chemii pod kątem oszczędności.",
      },
      {
        icon: "Warning",
        title: "F-gaz i nowe regulacje",
        description:
          "Wymiana czynników chłodniczych, nowe limity GWP. Audytujemy zgodność i planujemy migrację.",
      },
      {
        icon: "ShieldCheck",
        title: "Pasteryzacja a HACCP",
        description:
          "Certyfikacja IFS/BRC + ISO 50001 razem. Zarządzanie energią bez ryzyka dla bezpieczeństwa żywności.",
      },
    ],
    services: [
      {
        slug: "audyt-chlodniczy",
        name: "Audyt chłodniczy",
        reason:
          "Komory, tunele, agregaty — największy potencjał oszczędności w spożywce.",
      },
      {
        slug: "audyt-energetyczny-przedsiebiorstwa",
        name: "Audyt energetyczny przedsiębiorstwa",
        reason:
          "Obowiązkowy co 4 lata dla dużych firm — robimy go pod kątem produkcji spożywczej.",
      },
      {
        slug: "audyt-jakosci-energii",
        name: "Audyt sprężonego powietrza",
        reason:
          "Wycieki + złe ciśnienia to typowo 25-30% strat. Pomiary i rekomendacje z ROI.",
      },
      {
        slug: "uslugi",
        name: "EMS dla produkcji",
        reason:
          "Telemetria liniowa — wiesz ile energii kosztuje każda partia produktu.",
      },
      {
        slug: "uslugi",
        name: "Modernizacja oświetlenia hal",
        reason:
          "LED + sterowanie strefowe w halach produkcyjnych i magazynach niskotemperaturowych.",
      },
      {
        slug: "uslugi",
        name: "Kogeneracja i odzysk ciepła",
        reason:
          "Ciepło odpadowe z pasteryzatorów i sprężarek — odzysk redukuje koszty pary i CWU.",
      },
    ],
    caseStudies: [
      {
        client: "ZM Łuków",
        metric: "−17% energii w chłodnictwie",
        description:
          "Audyt chłodniczy zakładu mięsnego — modernizacja agregatów, sterowanie odszranianiem, izolacje.",
        href: "/realizacje",
      },
      {
        client: "Polmlek",
        metric: "ISO 50001 + EMS",
        description:
          "Wdrożenie systemu zarządzania energią w mleczarni z telemetrią dla każdej linii produkcyjnej.",
        href: "/realizacje",
      },
      {
        client: "Cefarm",
        metric: "CSRD reporting",
        description:
          "Pełna kalkulacja śladu węglowego i raportowanie ESG zgodne z dyrektywą CSRD.",
        href: "/realizacje",
      },
    ],
    faq: [
      {
        q: "Ile kosztuje audyt energetyczny zakładu spożywczego?",
        a: "Cena zależy od wielkości zakładu i zakresu (chłodnictwo, sprężone, HVAC, oświetlenie). Wstępna konsultacja jest bezpłatna — po wizycie podajemy widełki cenowe.",
      },
      {
        q: "Jak długo trwa audyt w zakładzie produkcji żywności?",
        a: "Standardowo 4-6 tygodni: 1-2 tyg. pomiary, 2-3 tyg. analiza i raport. Pomiary ustawiamy tak, by nie kolidowały z reżimem HACCP i czystością procesową.",
      },
      {
        q: "Czy uwzględniacie nowe regulacje F-gazowe?",
        a: "Tak. Sprawdzamy zgodność istniejącej instalacji chłodniczej z aktualnymi limitami GWP i przygotowujemy harmonogram migracji do czynników naturalnych (CO₂, NH₃) lub niskoGWP.",
      },
      {
        q: "Czy są dotacje WFOSiGW dla spożywki?",
        a: "Tak — programy NFOŚiGW i regionalne WFOŚiGW finansują modernizacje chłodnictwa, OZE i odzysku ciepła w przemyśle spożywczym. Pomagamy w aplikowaniu i rozliczeniu.",
      },
    ],
  },

  motoryzacja: {
    slug: "motoryzacja",
    name: "Motoryzacja",
    nameInflected: "motoryzacyjnych",
    hero: {
      headline: "Audyt energetyczny dla motoryzacji i AGD",
      subline:
        "Linie produkcyjne, lakiernie, hartownie, prasy, automaty CNC. Niezawodność i wydajność energetyczna w zakładach Tier 1.",
    },
    industryStats:
      "Sektor motoryzacyjny w Polsce zatrudnia 250+ tys. osób. Energochłonność na poziomie 8-12% kosztów produkcji.",
    metrics: [
      { label: "Redukcja energii", value: "−15%" },
      { label: "Moc bierna", value: "−22%" },
      { label: "Certyfikacja", value: "ISO 50001" },
      { label: "Redukcja CO₂", value: "−18%" },
    ],
    challenges: [
      {
        icon: "Thermometer",
        title: "Lakiernia i HVAC",
        description:
          "Suszarki, kabiny lakiernicze, dopalacze VOC — najwięksi konsumenci ciepła i energii w zakładzie.",
      },
      {
        icon: "Lightning",
        title: "Automaty CNC i moc szczytowa",
        description:
          "Rosnące moce szczytowe, opłaty za przekroczenia. Optymalizujemy harmonogramy i kompensację.",
      },
      {
        icon: "Gauge",
        title: "Prasy i napęd",
        description:
          "Silniki napędowe, falowniki, odzysk energii hamowania — typowy potencjał −10-15%.",
      },
      {
        icon: "Fire",
        title: "Suszarki i piece",
        description:
          "Procesy wysokotemperaturowe — izolacje, odzysk, sterowanie palnikami pod kątem ROI.",
      },
      {
        icon: "ShieldCheck",
        title: "ISO 50001 jako wymóg OEM",
        description:
          "VW, Stellantis, BMW wymagają certyfikatu od dostawców Tier 1. Wdrażamy i utrzymujemy.",
      },
      {
        icon: "Clock",
        title: "Just-in-Time vs energia",
        description:
          "JIT wymusza ciągłą pracę. Jak optymalizować energię bez ryzyka dla harmonogramu OEM?",
      },
    ],
    services: [
      {
        slug: "audyt-energetyczny-przedsiebiorstwa",
        name: "Audyt energetyczny przedsiębiorstwa",
        reason:
          "Wymóg ustawy o efektywności energetycznej — robimy go pod profil produkcji motoryzacyjnej.",
      },
      {
        slug: "uslugi",
        name: "Wdrożenie ISO 50001",
        reason:
          "Wymagane przez OEM (VW, Stellantis, BMW). Pełen cykl od audytu zerowego po recertyfikację.",
      },
      {
        slug: "uslugi",
        name: "EMS / telemetria",
        reason:
          "Pomiar energii na poziomie linii i gniazda — koszt energii per produkt.",
      },
      {
        slug: "audyt-jakosci-energii",
        name: "Audyt jakości energii",
        reason:
          "Harmoniczne, zapady, moc bierna — krytyczne dla CNC i robotów spawalniczych.",
      },
      {
        slug: "aktualne-i-planowane-nabory",
        name: "Magazyn energii BESS",
        reason:
          "Ścinanie szczytów, zasilanie awaryjne dla linii krytycznych, arbitraż taryf.",
      },
      {
        slug: "uslugi",
        name: "Kompensacja mocy biernej",
        reason:
          "Eliminacja opłat za moc bierną — szybki ROI < 12 mies.",
      },
    ],
    caseStudies: [
      {
        client: "ZF Friedrichshafen",
        metric: "ISO 50001",
        description:
          "Pełen cykl wdrożenia systemu zarządzania energią dla zakładu Tier 1 — szkolenia, audyty, recertyfikacja.",
        href: "/realizacje",
      },
      {
        client: "BSH SGD",
        metric: "−27% w sprężonym powietrzu",
        description:
          "Audyt sprężonego powietrza i sieci dystrybucji w zakładzie produkcyjnym AGD — wykrycie strat, rekompresja.",
        href: "/realizacje",
      },
      {
        client: "Volkswagen Poznań",
        metric: "−15% energii produkcji",
        description:
          "Audyt linii lakierniczej i utility — modernizacja HVAC, odzysk ciepła z dopalaczy VOC.",
        href: "/realizacje",
      },
    ],
    faq: [
      {
        q: "Czy ISO 50001 jest wymagane przez naszego OEM?",
        a: "VW, Stellantis, BMW i większość OEM Tier 1 wymaga certyfikatu ISO 50001 lub zatwierdzonego planu jego wdrożenia. Sprawdzamy wymagania i przygotowujemy zakład do audytu certyfikującego.",
      },
      {
        q: "Jak długo trwa wdrożenie ISO 50001?",
        a: "Typowo 6-9 miesięcy: audyt zerowy, polityka energetyczna, EnPI, audyty wewnętrzne, audyt certyfikujący. Można skrócić do 4 mies. dla mniejszych zakładów.",
      },
      {
        q: "Czy audyt nie zakłóci pracy linii JIT?",
        a: "Nie. Pomiary są nieinwazyjne (rejestratory, kamery termowizyjne) i ustawiamy je w ramach harmonogramu produkcyjnego. Żaden istniejący proces nie zostaje zatrzymany.",
      },
      {
        q: "Czy raport energetyczny pomoże w raportowaniu ESG?",
        a: "Tak. Raport zawiera kalkulację śladu węglowego (Scope 1, 2, częściowo 3) i jest wykorzystywany do raportów CSRD oraz CDP, których wymagają OEM od dostawców.",
      },
    ],
  },

  energetyka: {
    slug: "energetyka",
    name: "Energetyka",
    nameInflected: "energetycznego",
    hero: {
      headline: "Audyt energetyczny dla sektora energetycznego",
      subline:
        "Elektrownie, sieci ciepłownicze, OSD, kogeneracja. Audyty efektywności, modernizacja, raportowanie EU ETS i CSRD.",
    },
    industryStats:
      "Sektor energetyczny generuje 70% emisji CO₂ w Polsce. Inwestycje w efektywność = obowiązek + szansa biznesowa.",
    metrics: [
      { label: "Straty sieci", value: "−18%" },
      { label: "ROI średnio", value: "24 mies." },
      { label: "EU ETS", value: "compliant" },
      { label: "Certyfikacja", value: "ISO 50001" },
    ],
    challenges: [
      {
        icon: "Lightning",
        title: "Stare bloki vs OZE",
        description:
          "Mix węgla, gazu i OZE wymaga elastyczności. Audytujemy efektywność każdej technologii.",
      },
      {
        icon: "Thermometer",
        title: "Straty sieci ciepłowniczych",
        description:
          "Średnia strata na przesyle 12-18%. Termowizja, modernizacja izolacji, optymalizacja temperatur.",
      },
      {
        icon: "Gauge",
        title: "Pomiar dla OSD i odbiorców",
        description:
          "Smart metering, telemetria, billing — kompletna architektura pomiarowa zgodna z URE.",
      },
      {
        icon: "ChartLineUp",
        title: "EU ETS i raportowanie",
        description:
          "Coraz droższe uprawnienia do emisji. Pomagamy w MRV, weryfikacji i strategii redukcji.",
      },
      {
        icon: "ShieldCheck",
        title: "ISO 14001 + 50001",
        description:
          "Zintegrowane systemy zarządzania środowiskiem i energią — wymagane przez regulatorów.",
      },
      {
        icon: "Wallet",
        title: "Modernizacja i dotacje",
        description:
          "NFOŚiGW, FENX, KPO — pomagamy aplikować i rozliczać projekty modernizacyjne.",
      },
    ],
    services: [
      {
        slug: "audyt-efektywnosci-energetycznej",
        name: "Audyt efektywności energetycznej",
        reason:
          "Identyfikacja oszczędności + białe certyfikaty (świadectwa efektywności energetycznej).",
      },
      {
        slug: "audyt-energetyczny-wezlow-cieplnych",
        name: "Audyt ciepłowniczy",
        reason:
          "Sieci, węzły, źródła. Analiza strat i potencjału modernizacji izolacji.",
      },
      {
        slug: "uslugi",
        name: "EMS / SCADA",
        reason:
          "Telemetria sieci i źródeł — bieżące zarządzanie energią i raportowanie URE.",
      },
      {
        slug: "audyt-jakosci-energii",
        name: "Audyt jakości energii",
        reason:
          "Krytyczne dla OSD i odbiorców przemysłowych — harmoniczne, zapady, niesymetria.",
      },
      {
        slug: "uslugi",
        name: "Kogeneracja",
        reason:
          "Audyt, finansowanie, wdrożenie — wsparcie w aplikacji o wsparcie operacyjne CHP.",
      },
      {
        slug: "aktualne-i-planowane-nabory",
        name: "Magazyn energii BESS",
        reason:
          "Stabilizacja sieci, usługi systemowe DSR, arbitraż na rynku bilansującym.",
      },
    ],
    caseStudies: [
      {
        client: "PGE GiEK · Elektrownia Turów",
        metric: "−18% energii w chłodnictwie",
        description:
          "Ocena efektywności i modernizacja chłodni kominowych oraz instalacji klimatyzacyjnych w elektrowni węglowej.",
        href: "/realizacje/2895-2",
      },
      {
        client: "Tauron Ciepło",
        metric: "Redukcja strat sieci",
        description:
          "Audyt sieci ciepłowniczej z termowizją lotniczą — identyfikacja punktów strat i plan modernizacji.",
        href: "/realizacje",
      },
      {
        client: "Grupa Azoty",
        metric: "EU ETS compliance",
        description:
          "MRV, weryfikacja emisji i strategia dekarbonizacji dla zakładu uczestniczącego w systemie EU ETS.",
        href: "/realizacje",
      },
    ],
    faq: [
      {
        q: "Czy pomagacie w MRV i raportowaniu EU ETS?",
        a: "Tak. Przygotowujemy plany monitorowania (MP), raporty roczne emisji oraz wspieramy w weryfikacji przez akredytowanego weryfikatora.",
      },
      {
        q: "Jakie dotacje NFOŚiGW są aktualne dla energetyki?",
        a: "Programy z FENX (Fundusze Europejskie na Infrastrukturę i Środowisko), KPO (modernizacja sieci ciepłowniczych) oraz programy NFOŚiGW na OZE i magazyny energii. Pełna lista i terminy w naszej sekcji nabory.",
      },
      {
        q: "Czym różni się audyt od modernizacji?",
        a: "Audyt to identyfikacja potencjału + raport z rekomendacjami i ROI. Modernizacja to wdrożenie. Robimy oba — w modelu ESCO rozliczamy się z oszczędności.",
      },
      {
        q: "Czy mogę uzyskać białe certyfikaty?",
        a: "Tak. Audyt efektywności energetycznej zgodny z ustawą daje podstawę do uzyskania świadectw efektywności energetycznej (białych certyfikatów) — wsparcie w pełnej procedurze do URE.",
      },
    ],
  },

  chemia: {
    slug: "chemia",
    name: "Chemia",
    nameInflected: "chemicznych",
    hero: {
      headline: "Audyt energetyczny dla chemii i farmacji",
      subline:
        "Reaktory, kolumny destylacyjne, sprężone powietrze, chłodnictwo, sterylizacja. Energochłonna ciągła produkcja 24/7.",
    },
    industryStats:
      "Sektor chemiczny w Polsce: ~50 mld zł rocznie. Energia to 25-40% kosztów produkcji w niektórych podsektorach.",
    metrics: [
      { label: "Sprężone powietrze", value: "−21%" },
      { label: "Chłodnictwo", value: "−14%" },
      { label: "Walidacja GxP", value: "✓" },
      { label: "ROI średnio", value: "20 mies." },
    ],
    challenges: [
      {
        icon: "Fire",
        title: "Reaktory i wysokie temp.",
        description:
          "Procesy egzotermiczne — odzysk ciepła i optymalizacja wymienników to najszybszy ROI.",
      },
      {
        icon: "Thermometer",
        title: "Kolumny destylacyjne",
        description:
          "Największy konsument pary w zakładach chemicznych. Pinch analysis i integracja procesowa.",
      },
      {
        icon: "Wind",
        title: "Sprężone powietrze klasy lab.",
        description:
          "Klasa ISO 8573-1 dla farmacji — wyższe wymagania = wyższe koszty. Optymalizujemy bez kompromisów.",
      },
      {
        icon: "Drop",
        title: "CIP / SIP",
        description:
          "Mycie i sterylizacja w obiegu — duże zużycie wody, pary i chemii. Audyt każdej fazy.",
      },
      {
        icon: "ShieldCheck",
        title: "GxP i walidacja",
        description:
          "Każda zmiana wymaga walidacji GMP/GLP. Przygotowujemy dokumentację change control.",
      },
      {
        icon: "Warning",
        title: "F-gaz i ATEX",
        description:
          "Strefy zagrożenia wybuchem + nowe limity GWP. Audyt zgodności + plan migracji.",
      },
    ],
    services: [
      {
        slug: "audyt-energetyczny-przedsiebiorstwa",
        name: "Audyt energetyczny przedsiębiorstwa",
        reason:
          "Obowiązkowy co 4 lata — dopasowany do specyfiki ciągłej produkcji chemicznej i farmaceutycznej.",
      },
      {
        slug: "audyt-chlodniczy",
        name: "Audyt chłodniczy",
        reason:
          "Procesowe chłodzenie reaktorów i magazynów GMP — wysokie wymagania niezawodnościowe.",
      },
      {
        slug: "audyt-jakosci-energii",
        name: "Audyt sprężonego powietrza",
        reason:
          "Klasa ISO 8573-1 dla farmacji — wyższe wymagania wymagają precyzyjnej optymalizacji.",
      },
      {
        slug: "uslugi",
        name: "EMS dla produkcji ciągłej",
        reason:
          "Telemetria 24/7, integracja z DCS, raportowanie GMP-compliant.",
      },
      {
        slug: "uslugi",
        name: "Kogeneracja",
        reason:
          "Para technologiczna + energia elektryczna z jednego źródła — typowo −30% kosztów energii.",
      },
      {
        slug: "audyt-energetyczny-wezlow-cieplnych",
        name: "Audyt ciepłowniczy",
        reason:
          "Pinch analysis, integracja procesowa, odzysk ciepła z reakcji egzotermicznych.",
      },
    ],
    caseStudies: [
      {
        client: "Cefarm",
        metric: "GxP-compliant audit",
        description:
          "Audyt energetyczny zakładu farmaceutycznego z pełną dokumentacją GMP i change control.",
        href: "/realizacje",
      },
      {
        client: "Grupa Azoty",
        metric: "−14% w chłodnictwie procesowym",
        description:
          "Modernizacja systemów chłodzenia reaktorów + odzysk ciepła odpadowego dla CWU i ogrzewania hal.",
        href: "/realizacje",
      },
      {
        client: "ICN Polfa Rzeszów",
        metric: "ISO 50001",
        description:
          "Wdrożenie systemu zarządzania energią dla producenta API z pełną zgodnością GMP.",
        href: "/realizacje",
      },
    ],
    faq: [
      {
        q: "Czy audyt energetyczny w farmacji wymaga walidacji GxP?",
        a: "Sam audyt nie — to czynność diagnostyczna. Ale każde wdrożenie rekomendacji w obszarze GMP (HVAC, sprężone, woda) wymaga change control i rewalidacji. Przygotowujemy pełną dokumentację.",
      },
      {
        q: "Jak długo trwa audyt z dokumentacją GMP?",
        a: "6-10 tygodni dla zakładu farmaceutycznego. Dłużej niż standardowy audyt ze względu na dokumentację change control, walidację oraz uzgodnienia z QA.",
      },
      {
        q: "Czy są dotacje POIŚ / FENX dla chemii?",
        a: "Tak. FENX (następca POIŚ) finansuje modernizacje energetyczne w przemyśle chemicznym, w tym kogenerację, OZE, magazyny energii i odzysk ciepła. Pomagamy w aplikowaniu.",
      },
      {
        q: "Czy uwzględniacie strefy ATEX?",
        a: "Tak. Nasi audytorzy posiadają uprawnienia do pracy w strefach ATEX 0/1/2 i 20/21/22. Wszystkie pomiary i propozycje modernizacji uwzględniają wymagania dyrektywy ATEX.",
      },
    ],
  },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRIES);

export type IndustrySlug = keyof typeof INDUSTRIES;
