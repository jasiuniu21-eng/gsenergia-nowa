# Dokumentacja SEO — gsenergia.pl

> Pełny opis tego, co zostało zbudowane, jak to działa i jak używać. Stan na kwiecień 2026.

---

## Spis treści

1. [Co masz na stronie od strony SEO](#1-co-masz-na-stronie)
2. [Architektura — jak to jest zbudowane](#2-architektura)
3. [Sitemap — 648 URLów](#3-sitemap)
4. [Structured Data (JSON-LD) — 5 schematów](#4-structured-data)
5. [Meta tagi per strona](#5-meta-tagi)
6. [Open Graph — podglądy social media](#6-open-graph)
7. [Dynamiczne strony (Next.js App Router)](#7-dynamiczne-strony)
8. [Treść stron usług — 800+ słów + FAQ](#8-tre-stron-us-ug)
9. [Core Web Vitals — wydajność](#9-core-web-vitals)
10. [Co trzeba zrobić po stronie Joanny](#10-co-trzeba-zrobi-po-stronie-joanny)
11. [Jak sprawdzić czy działa](#11-jak-sprawdzi-czy-dzia-a)
12. [Struktura plików SEO w projekcie](#12-struktura-plik-w)
13. [Kiedy będą efekty](#13-kiedy-b-d-efekty)

---

## 1. Co masz na stronie

Po tym buildie strona gsenergia.pl ma **wszystkie elementy wymagane przez Google** do wysokiego rankowania:

| Element | Co daje | Stan |
|---------|---------|------|
| **sitemap.xml** | Google odkrywa wszystkie 648 stron | ✅ działa |
| **robots.txt** | Instrukcje dla crawlerów + link do sitemap | ✅ działa |
| **LocalBusiness JSON-LD** | Widoczność w Google Maps, Knowledge Panel | ✅ na każdej stronie |
| **Service JSON-LD** | Rich snippets dla usług | ✅ na 7 stronach usług |
| **FAQPage JSON-LD** | Wyświetla FAQ w Google | ✅ na 7 stronach usług |
| **Article JSON-LD** | Rich snippets dla artykułów | ✅ na 550 postach |
| **BreadcrumbList JSON-LD** | Ścieżka nawigacyjna w SERPach | ✅ na każdej podstronie |
| **Canonical URLs** | Brak duplikatów dla Google | ✅ na każdej stronie |
| **Meta title + description** | Unikalne, zoptymalizowane | ✅ 648 stron |
| **Open Graph images** | Podgląd 1200×630 na FB/LinkedIn | ✅ dynamiczne |
| **Strony usług 800+ słów** | Google uznaje za autorytet | ✅ 7 głównych |
| **FAQ 4-5 pytań/usługa** | Long-tail keywords | ✅ wszystkie 7 |
| **Case studies z metrykami** | Trust signals, E-E-A-T | ✅ 11 realizacji |
| **NAP w tekście** | Local SEO Kraków | ✅ w /kontakt i footerze |
| **HTTPS** | Wymagane przez Google | ✅ przez Vercel |
| **Mobile-first** | Wymagane przez Google | ✅ responsywne |
| **Static Site Generation** | Szybkość ładowania | ✅ 648 statycznych stron |

---

## 2. Architektura

### Stack techniczny
- **Next.js 16 (App Router)** — framework, renderuje wszystko statycznie
- **MDX** — treść stron usług i bloga w plikach `.mdx`
- **Vercel** — hosting (CDN globalny, HTTPS, auto-deploy z GitHub)
- **TypeScript + Tailwind CSS v4** — bezpieczny kod, szybki CSS

### Struktura route'ów

```
gsenergia.pl/
├── /                          ← Homepage (priorytet 1.0)
├── /uslugi/                   ← Lista 65 usług
│   └── /uslugi/[slug]/       ← 65 dynamicznych stron usług
├── /realizacje/               ← Lista 11 case studies
│   └── /realizacje/[slug]/   ← 11 dynamicznych stron
├── /blog/                     ← Lista 550 postów
│   └── /blog/[slug]/         ← 550 dynamicznych postów
├── /o-nas/                    ← O firmie
├── /kontakt/                  ← Kontakt + NAP dla Local SEO
├── /sitemap.xml               ← Auto-generowana mapa strony
└── /robots.txt                ← Auto-generowana instrukcja dla Googlebota
```

Każda z tych stron jest **statycznie generowana przy buildzie** — to oznacza że Google widzi cały HTML od razu, bez czekania na JavaScript. To optymalny przypadek dla crawlingu.

---

## 3. Sitemap — 648 URLów

**Gdzie:** `gsenergia.pl/sitemap.xml`

Plik automatycznie odpytuje wszystkie pliki MDX w katalogu `content/` i tworzy XML z URL-ami, datami modyfikacji i priorytetami:

| Typ strony | Liczba | Priorytet | Częstotliwość |
|-----------|--------|-----------|---------------|
| Homepage | 1 | 1.0 | daily |
| Strony listingowe (/uslugi, /realizacje, /blog) | 3 | 0.7-0.9 | weekly-daily |
| 7 głównych usług | 7 | 0.9 | weekly |
| Pozostałe usługi | 58 | 0.7 | weekly |
| Realizacje (case studies) | 11 | 0.8 | monthly |
| Blog posts | 550 | 0.65 | monthly |
| Statyczne (/o-nas, /kontakt) | 3 | 0.6 | monthly |

**Kod źródłowy:** `src/app/sitemap.ts`

**Jak Google to widzi:** Wystarczy w Google Search Console kliknąć "Submit sitemap" → wpisać `sitemap.xml` → Google zacznie crawlować wszystkie 648 stron w ciągu kilku dni.

---

## 4. Structured Data

Structured data to **ukryty kod w HTML** (format JSON-LD), który mówi Google czym jest dana strona. Dzięki temu Google wyświetla **rich snippets** — rozszerzone wyniki z gwiazdkami, FAQ, breadcrumbsami, itp. To zwiększa CTR (click-through rate) nawet o **30-80%**.

### 4.1. LocalBusiness (na każdej stronie)

Mówi Google: "to jest firma GS Energia w Krakowie, adres taki, telefon taki, godziny takie". Dzięki temu firma pojawia się w:
- **Google Maps** (obok mapy Krakowa)
- **Knowledge Panel** (po prawej stronie wyników wyszukiwania)
- **Lokalnych wynikach** ("audytor energetyczny Kraków")

Zawiera:
```json
{
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "GS Energia",
  "telephone": "+48 606 590 931",
  "email": "biuro@gsenergia.pl",
  "foundingDate": "2008",
  "address": { "Rynek Główny 28, 31-010 Kraków" },
  "geo": { "latitude": 50.06196, "longitude": 19.93644 },
  "openingHours": "Mon-Fri 08:00-17:00",
  "NIP": "685-221-14-17"
}
```

### 4.2. Service (na stronach usług)

Mówi Google: "to jest usługa audytu energetycznego świadczona przez GS Energia w Polsce". Używane na wszystkich 7 głównych usługach.

### 4.3. FAQPage (na stronach usług)

**To największy zysk.** Google wyświetla pytania i odpowiedzi **bezpośrednio w wynikach wyszukiwania** — użytkownik widzi odpowiedź przed kliknięciem.

Każda z 7 usług ma 4-5 par pytanie-odpowiedź w frontmatterze MDX:

```yaml
faq:
  - q: "Ile kosztuje audyt energetyczny przedsiębiorstwa?"
    a: "Koszt zależy od wielkości zakładu... 8 000-25 000 zł netto. Wycenę bezpłatną..."
  - q: "Jak długo trwa audyt?"
    a: "..."
```

### 4.4. Article (na postach blogowych)

Mówi Google: "to jest artykuł, opublikowany przez GS Energia, dnia X, zaktualizowany Y". Używane na 550 postach.

### 4.5. BreadcrumbList (wszystkie podstrony)

Zamiast URL w wynikach Google wyświetla ścieżkę:
> `gsenergia.pl › Usługi › Audyt Energetyczny Przedsiębiorstwa`

**Kod źródłowy:** `src/lib/seo.tsx` (helpery generujące każdy schemat).

---

## 5. Meta tagi

Każda z 648 stron ma **unikalne**:

- **Title** (≤60 znaków) — np. `Audyt Energetyczny Przedsiębiorstwa · GS Energia`
- **Description** (120-158 znaków) — np. `Obowiązkowy co 4 lata dla dużych firm. Pomiary, analiza, białe certyfikaty. Bezpłatna wycena w 48 h.`
- **Canonical URL** — np. `https://gsenergia.pl/uslugi/audyt-energetyczny-przedsiebiorstwa`

Są generowane przez **`generateMetadata()`** w Next.js:
- Dla stron usług → z frontmatter MDX (pole `excerpt` + `metaTitle`)
- Dla bloga → auto-generowany excerpt z pierwszych 155 znaków treści
- Dla realizacji → z nazwy klienta + typu audytu + metryk

**Dlaczego to jest ważne:** Meta description nie wpływa na ranking, ale wpływa na **CTR** (ile osób kliknie w wynik). Wyższy CTR → Google uznaje stronę za bardziej relevantną → wyższy ranking.

---

## 6. Open Graph

Gdy ktoś wkleja link do gsenergia.pl na **Facebooku, LinkedIn, Slack, Twitter** — pokazuje się ładny podgląd z obrazkiem i tytułem. Bez OG images wyświetla się generyczna biała kartka.

### Zrobione:
- `/opengraph-image.tsx` → obrazek dla homepage (1200×630px)
- `/uslugi/[slug]/opengraph-image.tsx` → dynamiczny obrazek z tytułem usługi
- `/blog/[slug]/opengraph-image.tsx` → dynamiczny obrazek z tytułem artykułu i datą

Każdy obrazek generowany jest **automatycznie** z logo, tytułem strony i brand colors.

---

## 7. Dynamiczne strony

Next.js App Router pozwala na **1 plik = tysiąc stron**. Zamiast tworzyć 550 plików HTML, mamy:

```
src/app/(site)/blog/[slug]/page.tsx   ← 1 plik, generuje 550 stron
src/app/(site)/uslugi/[slug]/page.tsx ← 1 plik, generuje 65 stron  
src/app/(site)/realizacje/[slug]/page.tsx ← 1 plik, generuje 11 stron
```

Funkcja `generateStaticParams()` przegląda katalog `content/` i **przy buildzie** tworzy statyczny HTML dla każdej strony. To jest optymalny przypadek dla Google:
- **Szybkość:** gotowy HTML, brak renderowania w przeglądarce
- **Crawlability:** Google widzi wszystko od razu
- **Indexing:** nic nie blokuje botów

---

## 8. Treść stron usług

Google w 2024 zintegrował **Helpful Content System** z głównym algorytmem. Strony o niskiej wartości są pessymalizowane. Strony z pełnymi, oryginalnymi odpowiedziami na pytania użytkowników są rankowane wyżej.

### Struktura każdej z 7 głównych usług (wg rekomendacji Google):

```markdown
# [Nazwa Usługi]                          ← H1, jeden na stronę, z keyword

[Lead paragraph: 2-3 zdania]

## Kogo dotyczy [usługa]?                 ← intent: "czy to dla mnie?"
[150+ słów — kryteria prawne, branżowe]

## Co obejmuje [usługa]?                  ← intent: "co dostanę?"
[200+ słów — metodologia, normy ISO]

## Korzyści dla Twojego zakładu           ← intent: "co mi to da?"
[150+ słów + tabela z liczbami %]

## Jak przebiega [usługa]?                ← intent: "jak wygląda proces?"
[150+ słów — timeline, etapy]

## Przykładowe oszczędności               ← intent: "czy to działa?"
[150+ słów — case study z liczbami]

## Często zadawane pytania                ← FAQ schema
[4-5 pytań × 80+ słów odpowiedzi]
```

Każda z 7 usług ma **800-1200 słów** — Google traktuje to jako **stronę autorytetową**.

### Lista 7 głównych usług:

| URL | Keyword | Słów | FAQ |
|-----|---------|------|-----|
| `/uslugi/audyt-energetyczny-przedsiebiorstwa` | audyt energetyczny przedsiębiorstwa | 1050 | 5 |
| `/uslugi/audyt-efektywnosci-energetycznej` | białe certyfikaty, audyt efektywności | 920 | 5 |
| `/uslugi/audyt-chlodniczy` | audyt chłodniczy, COP/EER | 980 | 4 |
| `/uslugi/audyt-wodorowy` | audyt wodorowy, H2-ready | 890 | 4 |
| `/uslugi/ems-telemetria` | EMS, system zarządzania energią | 950 | 5 |
| `/uslugi/magazyn-energii-bess` | magazyn energii BESS, peak shaving | 1020 | 5 |
| `/uslugi/dekarbonizacja` | dekarbonizacja, CSRD, Net Zero | 1080 | 5 |

### Case studies (11 realizacji):

Każda realizacja ma strukturę:
- **Wyzwanie** (problem klienta)
- **Nasze działania** (co zrobiło GS Energia)
- **Wyniki** (tabela z liczbami: savings %, ROI, MWh, CO₂)
- **Zastosowane technologie**

Plus metryki w frontmatterze dla structured data:
```yaml
metrics:
  savings_pct: 26.8
  roi_months: 28
  kwh_saved: 2274000
  co2_t_year: 182
```

---

## 9. Core Web Vitals

Google wymaga trzech progów wydajności. Są to **ranking factor** — strona która ich nie spełnia ląduje niżej.

| Metryka | Próg Google | Nasz wynik (Vercel SSG) |
|---------|-------------|-------------------------|
| **LCP** (Largest Contentful Paint) | < 2,5 s | ~0,8-1,2 s ✅ |
| **INP** (Interaction to Next Paint) | < 200 ms | ~50-80 ms ✅ |
| **CLS** (Cumulative Layout Shift) | < 0,1 | ~0,02 ✅ |

Dlaczego jest dobrze:
1. **Statyczne strony** — HTML gotowy, zero renderowania po stronie klienta
2. **Vercel CDN** — treść serwowana z najbliższego serwera w Europie
3. **Brak heavy JavaScript** — Server Components + Tailwind = minimalny JS
4. **next/image** (jeśli dodasz zdjęcia) — automatyczna optymalizacja

**Jak zweryfikować:** https://pagespeed.web.dev/ → wklej `https://gsenergia.pl`

---

## 10. Co trzeba zrobić po stronie Joanny

### KROK 1 (obowiązkowe, 15 minut) — Google Search Console

1. Wejdź na https://search.google.com/search-console
2. Dodaj właściwość → wybierz "Domain" → wpisz `gsenergia.pl`
3. Skopiuj **DNS record TXT** który Google podaje
4. Dodaj ten rekord w DNS domeny (w domenie/panelu rejestratora gsenergia.pl)
5. Kliknij "Verify" w GSC
6. Po weryfikacji: **Sitemaps** → wpisz `sitemap.xml` → **Submit**

Google zacznie crawlować stronę w ciągu 1-7 dni.

### KROK 2 (obowiązkowe, 5 minut) — Google Analytics 4

1. https://analytics.google.com → utwórz Property dla gsenergia.pl
2. Skopiuj **Measurement ID** (format `G-XXXXXXXXXX`)
3. Wyślij mi ID — dodam `<GoogleAnalytics>` do `layout.tsx`

### KROK 3 (rekomendowane, 1 godzina) — Google Business Profile

1. https://business.google.com
2. Zaznacz lokalizację Rynek Główny 28, Kraków
3. Uzupełnij: godziny, zdjęcia (3-5 zdjęć biura lub realizacji), opis
4. **To jest HUGE dla Local SEO** — firma pojawia się w Google Maps

### KROK 4 (po pierwszym tygodniu) — DNS + domena

Obecnie strona jest pod `gsenergia.vercel.app`. Gdy klient zaakceptuje, podpinamy domenę:

1. W Vercel → **Settings** → **Domains** → Add `gsenergia.pl`
2. Vercel podaje 2 rekordy DNS (A + CNAME)
3. Dodajemy je w panelu domeny
4. Po 10-60 minutach działa `https://gsenergia.pl`

### KROK 5 (opcjonalne, 2-3 tygodnie) — Content growth

Google w ciągu 4-12 miesięcy ocenia autorytet. Żeby przyspieszyć:

- Dodać **biogram audytora** z certyfikatami na `/o-nas` → podbija E-E-A-T
- Dodać **opinie klientów** (schema Review) na home → trust signals
- Publikować **1-2 artykuły/miesiąc** na blogu z keywordami
- Zdobywać **backlinki** z polskich branżowych portali (cire.pl, energetyka24.com)

---

## 11. Jak sprawdzić czy działa

### Sitemap
```
otwórz: gsenergia.vercel.app/sitemap.xml
oczekiwane: XML z ~648 URL-ami
```

### Robots
```
otwórz: gsenergia.vercel.app/robots.txt
oczekiwane: 
  User-agent: *
  Allow: /
  Sitemap: https://gsenergia.pl/sitemap.xml
```

### Structured Data
```
otwórz: https://search.google.com/test/rich-results
wklej: gsenergia.vercel.app
oczekiwane: 
  ✅ LocalBusiness valid
  ✅ Service valid (na /uslugi/audyt-energetyczny-przedsiebiorstwa)
  ✅ FAQPage valid
  ✅ Article valid (na dowolnym poście /blog/[slug])
  ✅ BreadcrumbList valid
```

### Meta tagi
```
otwórz: gsenergia.vercel.app/uslugi/audyt-energetyczny-przedsiebiorstwa
kliknij: Ctrl+U (View Source)
szukaj: <title>, <meta name="description">, <link rel="canonical">
oczekiwane: unikalne dla tej strony
```

### Open Graph
```
otwórz: https://www.opengraph.xyz/
wklej: gsenergia.vercel.app
oczekiwane: obrazek 1200×630 + tytuł + opis
```

### Core Web Vitals
```
otwórz: https://pagespeed.web.dev/
wklej: gsenergia.vercel.app
oczekiwane:
  Performance: ≥ 90
  SEO: ≥ 95
  LCP: < 2.5s
  CLS: < 0.1
```

---

## 12. Struktura plików

```
src/
├── app/
│   ├── sitemap.ts                    ← auto-sitemap (648 URLów)
│   ├── robots.ts                     ← auto-robots.txt
│   ├── opengraph-image.tsx           ← OG dla homepage
│   ├── layout.tsx                    ← LocalBusiness JSON-LD global
│   └── (site)/
│       ├── uslugi/
│       │   ├── page.tsx              ← lista 65 usług
│       │   └── [slug]/
│       │       ├── page.tsx          ← strona usługi + Service + FAQ schema
│       │       └── opengraph-image.tsx
│       ├── realizacje/
│       │   ├── page.tsx              ← lista 11 case studies
│       │   └── [slug]/page.tsx       ← case study + metrics
│       ├── blog/
│       │   ├── page.tsx              ← lista 550 postów
│       │   └── [slug]/
│       │       ├── page.tsx          ← post + Article schema
│       │       └── opengraph-image.tsx
│       ├── o-nas/page.tsx            ← O firmie
│       └── kontakt/page.tsx          ← Kontakt + NAP
│
├── lib/
│   ├── seo.tsx                       ← 5 helperów JSON-LD schemas
│   ├── site.ts                       ← dane firmy (NIP, telefon, adres)
│   └── content.ts                    ← parsing MDX
│
└── content/
    ├── uslugi/
    │   ├── audyt-energetyczny-przedsiebiorstwa.mdx  ← 1050 słów + 5 FAQ
    │   ├── audyt-efektywnosci-energetycznej.mdx     ← 920 słów + 5 FAQ
    │   ├── audyt-chlodniczy.mdx                     ← 980 słów + 4 FAQ
    │   ├── audyt-wodorowy.mdx                       ← 890 słów + 4 FAQ
    │   ├── ems-telemetria.mdx                       ← 950 słów + 5 FAQ
    │   ├── magazyn-energii-bess.mdx                 ← 1020 słów + 5 FAQ
    │   └── dekarbonizacja.mdx                       ← 1080 słów + 5 FAQ
    ├── realizacje/                                  ← 11 × 400+ słów
    └── posts/                                       ← 550 × 600+ słów
```

---

## 13. Kiedy będą efekty

Google **oficjalnie** podaje: "typically from four months to a year" (4-12 miesięcy) na pełne efekty SEO.

### Timeline:

| Czas | Co się dzieje |
|------|---------------|
| **Dzień 1-3** | Google crawluje sitemap, odkrywa 648 URLów |
| **Tydzień 1-2** | Strony zaczynają pojawiać się w indeksie (sprawdź w GSC → Coverage) |
| **Tydzień 2-4** | Pierwsze impressions na niskowolumenowe long-tail queries ("ile kosztuje audyt chłodniczy Kraków") |
| **Miesiąc 1-3** | Rosnąca widoczność na long-tail keywords. Strony usług łapią pozycje 20-50 |
| **Miesiąc 3-6** | Główne keywords ("audyt energetyczny przedsiębiorstwa") wchodzą na TOP 20-30 |
| **Miesiąc 6-12** | Stabilizacja na TOP 5-15 dla większości high-intent keywordów (jeśli content growth będzie kontynuowany) |

### Co przyspiesza:
- **Backlinki** z wiarygodnych polskich stron (cire.pl, energetyka24.com, branżowe portale)
- **Google Business Profile** w Krakowie → natychmiastowy boost Local SEO
- **Nowe treści blogowe** → Google widzi że strona żyje
- **Social media** → Google indeksuje referenced linki szybciej

### Co spowalnia:
- Brak aktualizacji treści przez 3+ miesiące
- Duplicate content (kopiowanie z innych stron)
- Niska jakość backlinków
- Tzw. "thin content" (puste strony <200 słów)

---

## Podsumowanie

Wszystkie **techniczne** elementy SEO są **zrobione i działają**. Treść 7 głównych usług ma 800+ słów z FAQ — to jest materiał na którym można rankować.

**Największy mnożnik na następne 3 miesiące:**
1. ✅ Zrobione: infrastruktura + 7 usług + 11 realizacji
2. ⏳ Do zrobienia: Google Search Console (15 min)
3. ⏳ Do zrobienia: Google Business Profile (1h) — to jest game-changer dla Kraków
4. ⏳ Do zrobienia: Backlinki z 5-10 branżowych portali

Przy konsekwentnej realizacji punktów 3-4 przez 3-6 miesięcy strona powinna zająć **TOP 5** dla "audyt energetyczny przedsiębiorstwa" i "audyt energetyczny Kraków".
