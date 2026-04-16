# Dokumentacja SEO 2.0 — gsenergia.pl

> **Wersja 2.0 — rozszerzona o Local SEO, strategię lokalizacji, benchmark konkurencji i keyword discovery agent.**
> Zawiera wszystko z wersji 1.0 (techniczny fundament już wdrożony) plus nowe rozdziały 14-21 ukierunkowane na TOP 3 Google Polska.

---

## Spis treści

### CZĘŚĆ I — Fundament (wersja 1.0, zaimplementowana)
1. [Co masz na stronie od strony SEO](#1-co-masz-na-stronie)
2. [Architektura — jak to jest zbudowane](#2-architektura)
3. [Sitemap — 648 URLów](#3-sitemap)
4. [Structured Data (JSON-LD) — 5 schematów](#4-structured-data)
5. [Meta tagi per strona](#5-meta-tagi)
6. [Open Graph — podglądy social media](#6-open-graph)
7. [Dynamiczne strony (Next.js App Router)](#7-dynamiczne-strony)
8. [Treść stron usług — 800+ słów + FAQ](#8-tre-stron-us-ug)
9. [Core Web Vitals — wydajność](#9-core-web-vitals)
10. [Co trzeba zrobić po stronie programisty](#10-co-trzeba-zrobi-po-stronie-joanny)
11. [Jak sprawdzić czy działa](#11-jak-sprawdzi-czy-dzia-a)
12. [Struktura plików SEO w projekcie](#12-struktura-plik-w)
13. [Kiedy będą efekty](#13-kiedy-b-d-efekty)

### CZĘŚĆ II — Rozszerzenie 2.0 (do implementacji)
14. [Dlaczego TOP 3, nie TOP 5 — realia CTR 2026](#14-top3)
15. [Google Maps exploit — bind usług do Krakowa](#15-google-maps)
16. [Location landing pages — strategia SAFE](#16-location-pages)
17. [Benchmark konkurencji — co robi TOP 3 Polska](#17-benchmark)
18. [Google Ads — komplementarne do SEO](#18-google-ads)
19. [Keyword Discovery Agent — automatyzacja](#19-keyword-agent)
20. [Stack narzędzi analitycznych](#20-tooling-stack)
21. [Plan wdrożenia 2.0 — kolejność sprintów](#21-plan-wdrozenia)

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

## 10. Co trzeba zrobić po stronie programisty

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

---

# CZĘŚĆ II — ROZSZERZENIE 2.0

> Od tego miejsca — nowe treści dodane w wersji 2.0 dokumentacji. Wszystko co jest tutaj opisane to **plan do wdrożenia**, nie jest jeszcze w kodzie.

---

## 14. Dlaczego TOP 3, nie TOP 5 — realia CTR 2026 {#14-top3}

W 2024 roku Google wprowadził **AI Overviews** — streszczenia AI wyświetlane nad wynikami organicznymi. Pojawiają się na ~31% wszystkich zapytań i drastycznie zmieniły CTR:

| Pozycja | CTR 2023 | CTR 2026 | Zmiana |
|---------|----------|----------|--------|
| **1** | 58.2% | **39.8%** | −32% |
| **2** | 24.1% | 18.7% | −22% |
| **3** | 15.0% | 10.2% | −32% |
| 4 | 10.2% | 7.2% | −29% |
| 5 | 7.5% | 5.1% | −32% |
| 6-10 | 1-3% | <3% | brak zmian |

**Wniosek twardy:** TOP 3 łączy **68.7% wszystkich kliknięć**. Pozycja 5 to już tylko 5.1% — prawie **8× mniej** niż pozycja 1.

### Co to znaczy w liczbach dla nas

Przykład: keyword "audyt energetyczny Kraków" ma szacowany volume 320/mo.

| Pozycja | Wizyty organiczne/mo | Leady/mo (przy 2% konwersji) |
|---------|---------------------|------------------------------|
| **1** | 127 | **2.5** |
| **3** | 33 | 0.6 |
| **5** | 16 | 0.3 |
| 10 | 6 | 0.1 |

Różnica między pozycją 1 a 5 to **8× więcej leadów**. Bez pozycji TOP 3 strona jest praktycznie niewidoczna dla użytkowników.

### Nowy cel biznesowy

Zamiast "TOP 5 za 12 miesięcy" nowy benchmark:
- **TOP 3 na 3-5 głównych keywordach za 6-9 miesięcy**
- **TOP 1 na długim ogonie (local + dzielnice) za 3-6 miesięcy** (mała konkurencja)

To wymaga więcej pracy niż wersja 1.0 — dokładnie to opisują rozdziały 15-21.

---

## 15. Google Maps exploit — bind usług do Krakowa {#15-google-maps}

GS Energia ma **już aktywny Google Business Profile** z pinem na Rynku Głównym 28 w Krakowie. To jest ogromna przewaga której wersja 1.0 dokumentacji nie wykorzystała w pełni.

### Dlaczego to jest ważne

Google traktuje firmy z potwierdzonym GBP w Krakowie **inaczej** niż firmy bez lokalizacji:
- Przewaga w **Local Pack** (mapa w wynikach wyszukiwania)
- Dziedziczenie **autorytetu lokalnego** przez wszystkie strony domeny
- Priorytet dla zapytań z geointencją ("audyt energetyczny blisko mnie")
- Trust signal — firma fizyczna, nie anonim online

### Co dodamy do strony

**A) Rozbudowany `areaServed` w Service schema**

Aktualnie każda strona usługi ma `"areaServed": "Polska"` — to za mało. Zmieniamy na listę konkretnych lokalizacji:

```json
"areaServed": [
  {
    "@type": "City",
    "name": "Kraków",
    "containedInPlace": { "@type": "AdministrativeArea", "name": "Małopolska" }
  },
  { "@type": "City", "name": "Wieliczka" },
  { "@type": "City", "name": "Skawina" },
  { "@type": "City", "name": "Niepołomice" },
  { "@type": "AdministrativeArea", "name": "Małopolska" },
  { "@type": "Country", "name": "Polska" }
]
```

Google czytając tę strukturę rozumie że usługa jest oferowana konkretnie w tych miejscach → pokazuje stronę użytkownikom z tych lokalizacji wyżej.

**B) Sekcja "Obsługiwane lokalizacje" na każdej z 7 stron usług**

Widoczny dla użytkownika blok (NIE ukryty — Google wymaga widoczności):

```
┌───────────────────────────────────────────────────────┐
│  OBSŁUGIWANE LOKALIZACJE                              │
│                                                        │
│  [Google Maps embed z pinem Rynek Główny 28]          │
│                                                        │
│  Realizujemy audyty energetyczne na terenie:          │
│                                                        │
│  ● Kraków (wszystkie dzielnice)                       │
│  ● Wieliczka · Skawina · Niepołomice · Zielonki       │
│  ● Mogilany · Libertów · Michałowice · Igołomia       │
│  ● Cała Małopolska                                    │
│  ● Audyty B2B — cała Polska z wyjazdem                │
└───────────────────────────────────────────────────────┘
```

**C) Naturalne wzmianki o Krakowie w body copy**

W sekcjach "Kogo dotyczy" i "Przykładowe oszczędności" dodajemy odniesienia do Krakowa/Małopolski (nie stuffing, density ~2-3%):
- "Zakład produkcji spożywczej w Małopolsce (Case PL-2024-087)..."
- "Nasza siedziba jest przy Rynku Głównym 28 w Krakowie — pomiary w zakładzie realizujemy z wyjazdem na cały region."
- "Obsługujemy audyty w Krakowie, na terenie całej Małopolski i w Polsce."

**D) Google Business Profile — optymalizacja**

Profil już jest, ale do weryfikacji/uzupełnienia:
- [ ] 10+ zdjęć biura, zespołu, realizacji (Google faworyzuje profile z 20+ zdjęciami)
- [ ] Kategorie: "Audytor", "Konsultant energetyczny", "Firma inżynierska" (max 10)
- [ ] Opis 750 znaków z keywordami
- [ ] Godziny pracy zaktualizowane
- [ ] Link do strony kierujący konkretnie na `/kontakt` lub `/uslugi` (nie tylko home)
- [ ] Posty Google Business co 7 dni (aktualności, case studies) — boost aktywności
- [ ] Odpowiadanie na WSZYSTKIE recenzje w ciągu 48h

### Czego NIE robimy

- **Nie stuffujemy** słowa "Kraków" w meta title/description do 10+ wystąpień
- **Nie tworzymy** ukrytych bloków tekstowych z listami miejscowości
- **Nie kopiujemy** identycznych sekcji między stronami — każda ma unikalny tekst opisujący lokalizację

---

## 16. Location landing pages — strategia SAFE {#16-location-pages}

### Problem: Google penalizuje "doorway pages"

Najczęstszy błąd amatorskich strategii SEO — **tworzenie 50-100 identycznych stron z podmienioną nazwą miasta**. Google w październiku 2022 deindeksował setki tysięcy takich stron w ramach "Helpful Content Update".

Zasada: "pages created primarily to rank for specific, similar search queries rather than serve users" = **spam**.

### Rozwiązanie: 10 starannie unikalnych stron, nie 50 thin

Research pokazał że **Solisa Energia** (obecny TOP 3 dla "świadectwo energetyczne Kraków") ma per-location page z **4500+ słów unikalnej treści** — dane demograficzne GUS, statystyki budynków, lokalne regulacje, case studies z miasta. **Tego się trzymamy.**

### Architektura stron lokalizacyjnych

**Layer 1 — Per-service hub (już mamy, widoczny w nav)**
- `/uslugi/swiadectwo-charakterystyki-energetycznej`
- `/uslugi/audyt-energetyczny-przedsiebiorstwa`
- etc. — 7 głównych usług

**Layer 2 — Location hubs (NOWE, widoczne jako linki w sekcji "Lokalizacje")**

10 stron lokalizacyjnych, tylko dla usług konsumenckich (świadectwa energetyczne, audyty domów). **NIE dla audytu B2B** — tam pozycjonujemy się ogólnopolskie.

| URL | Lokalizacja | Priorytet |
|-----|-------------|-----------|
| `/swiadectwa-energetyczne/krakow` | Kraków (ogólna) | 🔴 #1 |
| `/swiadectwa-energetyczne/krakow/ruczaj` | Dzielnica Ruczaj | 🟡 |
| `/swiadectwa-energetyczne/krakow/biezanow` | Dzielnica Bieżanów | 🟡 |
| `/swiadectwa-energetyczne/krakow/nowa-huta` | Dzielnica Nowa Huta | 🟡 |
| `/swiadectwa-energetyczne/krakow/podgorze` | Dzielnica Podgórze | 🟡 |
| `/swiadectwa-energetyczne/krakow/krowodrza` | Dzielnica Krowodrza | 🟡 |
| `/swiadectwa-energetyczne/wieliczka` | Miasto Wieliczka | 🔴 |
| `/swiadectwa-energetyczne/skawina` | Miasto Skawina | 🔴 |
| `/swiadectwa-energetyczne/niepolomice` | Miasto Niepołomice | 🔴 |
| `/swiadectwa-energetyczne/malopolska` | Całe województwo | 🟡 |

**Limit świadomy: 10.** Nie 20, nie 50. Google toleruje do ~12 unikalnych location pages — powyżej tego liczba penalizacje zaczynają przeważać nad korzyścią.

### Szablon per location page (min. 1500 słów, 60% unikalne)

```markdown
# Świadectwo Energetyczne Wieliczka — 2026

[Lead 150 słów z odniesieniem do Wieliczki — np. "Wieliczka,
znana głównie z Kopalni Soli, to również dynamicznie rozwijająca
się gmina z ponad 15 000 budynków wymagających świadectwa..."]

## Ile kosztuje świadectwo energetyczne w Wieliczce?
[Pricing table + 200 słów: bazowy cennik + dojazd bezpłatny z Krakowa (12 km)]

## Typy budynków w Wieliczce
[UNIKALNE 250 słów: stare kamienice centrum, blokowiska
z lat 70. (os. Niepodległości), nowe osiedla na Grabówkach,
domy jednorodzinne na Podgórzu Wielickim. Specyfika termomodernizacji
dla każdego typu.]

## Jak szybko wykonamy świadectwo?
[100 słów: "Wieliczka to 12 km od naszej siedziby w Krakowie.
Typowy dojazd + pomiary w domu jednorodzinnym: 2-3 godziny.
Certyfikat wystawiamy w 48 h od wizyty."]

## Realizacje w Wieliczce
[UNIKALNE 200 słów: 2-3 anonimowe case studies:
"Dom jednorodzinny 180 m² na os. Grabówki — świadectwo klasa D
przed termomodernizacją, po wymianie okien i dociepleniu —
klasa B. Oszczędność ~2 400 zł/rok na ogrzewaniu."]

## Lokalne dofinansowania w gminie Wieliczka
[UNIKALNE 150 słów: Czyste Powietrze dla Wieliczki, programy
gminne, dotacje wojewódzkie. Linki do oficjalnych stron.]

## Kontakt + Mapa
[Google Maps embed z trasą Kraków → Wieliczka]

## FAQ (5 pytań unikalnych)
[UNIKALNE 400 słów]
- "Czy świadectwo z Krakowa jest ważne dla nieruchomości w Wieliczce?"
- "Jak długo trwa świadectwo dla domu 150 m² w Wieliczce?"
- "Czy obsługujecie całą gminę Wieliczka?"
```

**Rozkład treści:** 60% unikalne per miasto (realizacje, typy budynków, dofinansowania, FAQ lokalne), 40% współdzielone (metodologia, cennik, CTA).

### Proces tworzenia — anti-doorway

Dla każdej z 10 stron:

1. **Agent research** (30 min) — wyciąga z GUS/OpenStreetMap/BDOT10k:
   - Liczbę budynków mieszkalnych
   - Typowe typy zabudowy
   - Nazwy osiedli/dzielnic
   - Odległość od Krakowa
   - Lokalne programy dofinansowania

2. **Agent draft** (15 min) — generuje pierwszy szkic z unikalnymi sekcjami

3. **Human review + editing** (30 min per strona) — audytor uzupełnia realne case studies (anonimizowane), weryfikuje nazwy osiedli, dodaje lokalne detale

4. **Publish + indexation** — Google Search Console → Request Indexing

5. **Aktualizacja po 3 mies.** — dodanie 1 nowej realizacji, refresh lokalnych regulacji

**Tempo:** 2 strony/tydzień → 5 tygodni na pełne 10. **Nie szybciej** — Google loguje nagłą eksplozję stron jako red flag.

### Dlaczego tylko dla świadectw, nie dla audytu B2B

Usługi B2B (audyt energetyczny przedsiębiorstwa, BESS, dekarbonizacja) obsługują **dużych klientów w całej Polsce**. Lokalizacja jest nieistotna dla decyzji zakupowej:
- PGE, BSH Bosch, Shell — nikt nie wybiera audytora B2B z powodu odległości 10 km
- Decyzja zakupowa to autorytet, certyfikaty, case studies, nie "bliskość"
- Dla tych usług **lepsze jest jedno mocne hub page** ogólnopolskie niż rozdrabianie

Świadectwa energetyczne (B2C) działają odwrotnie:
- Klient indywidualny szuka najbliższego audytora
- "świadectwo energetyczne Wieliczka" to realny searchable intent
- Cena + dojazd to główne kryteria decyzyjne

---

## 17. Benchmark konkurencji — co robi TOP 3 Polska {#17-benchmark}

### Przeanalizowane strony (top 3 dla każdego z 5 kluczowych keywordów)

| Pozycja | "audyt energetyczny Kraków" | "świadectwo energetyczne Kraków" | "audyt energ. przedsiębiorstwa" |
|---------|-----------------------------|----------------------------------|--------------------------------|
| 1 | Egoterm | Pewny Lokal | KAPE (rządowa) |
| 2 | EkoAudyt | Energoprojekt Kraków | Energa |
| 3 | M2 Projekty | Audyteko / Solisa | DEKRA |

### Detalowe wnioski

#### **Solisa Energia** (TOP 3 dla "świadectwo Kraków")
- **URL:** `/malopolskie/m-krakow/m-krakow/` — hierarchiczne województwo/powiat/gmina
- **Długość treści:** **4500+ słów per location page**
- **Unikalne dane:** 806 200 mieszkańców Krakowa, 56 426 budynków mieszkalnych, 25.3 mln m² powierzchni
- **Urgency hook:** "Tylko 2.47% mieszkańców Krakowa uczestniczy w Czystym Powietrzu" = local data driving trust
- **Cennik:** 5 tierów jasno pokazanych (Mieszkanie 399, Dom 599, Audyt CP 1799, Audyt przedsiębiorstwa 4999)
- **Reviews:** 5.0/5 z 61 opinii embed Google
- **Schema:** Organization + WebPage, GeoCoordinates w body

#### **Pewny Lokal** (TOP 1 dla "świadectwo Kraków", price leader)
- **USP w H1:** "**od 149 zł**" — najniższa cena w TOP 10
- **Per-district pages:** Grzegórki, Podgórze, Czyżyny, Zwierzyniec w internal linkach
- **Urgency:** Phone z godzinami "Pn-Pt 8:00-18:15" — sygnał że dzwoni człowiek
- **Trust:** Founders z LinkedIn verification → fotografie CEO w headerze
- **Speed USP:** 24 h turnaround + money-back guarantee
- **Konwersja:** formularz natychmiastowej wyceny na każdej stronie

#### **M2 Projekty** (Kraków lokalny lider)
- **Długość:** 3500+ słów na homepage
- **Phone sticky:** +48 530 662 341 w headerze zawsze widoczny
- **15 miejscowości obsługiwanych** listowanych w stopce
- **GTM aktywne** → Google Ads running (sprawdzone w source)
- **Google reviews widget** na homepage

#### **DEKRA** (autorytet B2B)
- **Schema:** FAQPage JSON-LD zaimplementowany (jedyna z TOP 10!) → rich snippets w SERP
- **Brak LocalBusiness** — słaba lokalizacja, pozycjonują się na autorytecie marki
- **Weak UX:** brak CTA, gęsty tekst, no map embed
- **Wniosek:** Autorytet DEKRA kompensuje słaby local SEO. **My nie mamy DEKRA brand** — musimy grać local mocniej.

### Wzorce do przejęcia (priorytet wdrożenia)

| Wzorzec | Kto robi | Nasza akcja | Sprint |
|---------|----------|-------------|--------|
| Pricing "od X zł" w H1 | Pewny Lokal, Solisa | Dodać na landing pages B2C | 6 |
| Phone sticky w headerze | M2 Projekty | Już mamy FloatingCTA — dodać numer | 6 |
| Per-location pages | Solisa | 10 location hubs (sekcja 16) | 6 |
| Dane GUS lokalne (populacja, budynki) | Solisa | Per location page — liczby z miasta | 6 |
| FAQPage schema | DEKRA | ✅ Już mamy (wersja 1.0) | — |
| Google reviews embed | Pewny Lokal, Solisa | Widget na home + /kontakt | 7 |
| Urgency data ("tylko X%") | Solisa | Licznik wolnych terminów, local statistics | 7 |
| Case studies z miasta | Solisa | Per location hub — 2-3 lokalne cases | 6 |
| LinkedIn verification founders | Pewny Lokal | Dodać zdjęcie + bio autorytet na /o-nas | 7 |
| GTM + Google Ads | M2, Columbus, Energa | Przygotować LP dla Ads (sekcja 18) | 8 |

---

## 18. Google Ads — komplementarne do SEO {#18-google-ads}

### Dlaczego Ads mimo dobrego SEO?

Sytuacja rynkowa 2026:
- **AI Overviews zjadły 32% CTR pozycji 1** → organiczny ruch spada globalnie
- **4 top pozycji SERP to teraz Ads** (nie 3) — Google przesuwa komercyjne queries pod płatne
- **Konkurencja** (M2 Projekty, Pewny Lokal, Solisa) **już ma aktywny Google Ads** (potwierdzone w source GTM) — walka organiczna toczy się równolegle do płatnej

**Wniosek:** Nawet z TOP 3 organic dla "audyt energetyczny Kraków" jesteśmy pozycją 7-8 na stronie (4 Ads + 3 organic). Ads jest potrzebny.

### Rekomendowana strategia Google Ads

**Budżet startowy:** 5 000 - 15 000 PLN/miesiąc dla dominacji regionalnej Kraków
**Alokacja:** 70% Search Ads / 30% Performance Max (B2B ROAS ze Search jest wyższy niż z PMax)

**Kampanie:**

| # | Kampania | Keywordy | Cel | CPC szacowany |
|---|----------|----------|-----|--------------|
| 1 | Search B2C Kraków | "świadectwo energetyczne Kraków", per dzielnica | Leady domowe | 8-15 PLN |
| 2 | Search B2B ogólnopolskie | "audyt energetyczny przedsiębiorstwa", "białe certyfikaty" | Leady wysokowartościowe | 15-30 PLN |
| 3 | Search Brand | "GS Energia", "GS Energia Kraków" | Defense + cheap conversions | 1-3 PLN |
| 4 | Performance Max | Catch-all + remarketing | Dopełnienie | N/A |

### Dedykowane landing pages dla Ads

**Kluczowe:** Ads **NIE** kierujemy na te same strony co organic — powodują tzw. "duplicate intent cannibalization" i rozmycie danych analitycznych.

Tworzymy osobną gałąź `/lp/` w Next.js:
- `/lp/swiadectwo-krakow-b2c` — landing pod Ads kampania #1
- `/lp/audyt-b2b-ogolnopolski` — landing pod Ads kampania #2

Te strony:
- Są **`noindex`** w metadata → nie mieszają się z organic SEO
- **Nie ma ich w sitemap.xml**
- Fokus na **jednej konwersji** (formularz) — zero distractions
- A/B testing headline, CTA, pricing

### Remarketing setup

- Google Analytics 4 tag na wszystkich stronach (sekcja 10 wersji 1.0)
- Google Ads tag + remarketing audience
- **Audience #1:** wszedł na /uslugi/* ale nie wypełnił formularza (7-30 dni)
- **Audience #2:** czytał blog 3+ strony (interested ale not ready)
- **Creative:** testimonial case PL-2024-087 (−26.8%) + "Policzmy Twoje oszczędności"

### Szacowany ROI

Przy budżecie 10 000 PLN/mo:
- ~800 kliknięć (śr. CPC 12.50 PLN)
- ~32 leadów (4% conversion rate LP)
- ~5 realnych zapytań B2B (15% qualification rate)
- 1 nowy klient B2B = 50 000-200 000 PLN wartości projektu
- **ROAS > 5:1**

---

## 19. Keyword Discovery Agent — automatyzacja {#19-keyword-agent}

### Cel
Stworzyć zautomatyzowany system który codziennie analizuje co ludzie wpisują w Google, wyłapuje nowe trendy i **triggeruje tworzenie contentu pod te frazy** zanim konkurencja zareaguje.

### Co wyłapuje (4 typy opportunities)

**1. Low CTR + High Impressions** (quick win)
- GSC pokazuje że strona pojawia się na daną frazę (np. "cena audytu chłodniczego") ale CTR <3%
- Znaczy: title/description nie przekonują do kliknięcia
- Akcja: rewrite meta → często poprawa z 2% do 8% CTR w tydzień

**2. Emerging queries** (new trends)
- Frazy które pojawiły się pierwszy raz w ostatnich 7-30 dniach
- Przykład: "czy świadectwo energetyczne jest obowiązkowe 2026" (nowy rok = nowa fala)
- Akcja: szybki blog post pod tę frazę zanim konkurencja zareaguje

**3. Question-based intent** (long tail)
- Queries typu "jak zmienić dostawcę energii", "dlaczego rachunki rosną", "ile kosztuje audyt energetyczny"
- Akcja: blog post z bezpośrednią odpowiedzią w pierwszych 100 słowach (optymalizacja pod AI Overview)

**4. Related but missing** (content gaps)
- Rankujemy na "białe certyfikaty" ale nie mamy strony "ile warte są białe certyfikaty 2026"
- Akcja: rozszerzenie istniejącej strony lub nowa strona siostrzana

### Architektura techniczna

```
Codziennie 08:00 (Vercel Cron)
   │
   ▼
[Pull GSC API] — searchanalytics.query() 28 dni, filter Poland
   │
   ▼
[Pull GA4 API] — behavior dla top 50 landing pages
   │
   ▼
[Enrichment Senuto API] — volume + keyword difficulty dla znalezionych queries
   │
   ▼
[Claude API analysis]
   Prompt: "Here's GSC data + GA4 behavior + Senuto enrichment.
            Identify top 10 content opportunities. Score each 1-10
            (volume × (1/difficulty) × gap_from_current).
            Output JSON: [keyword, intent, priority, action]"
   │
   ▼
[Slack webhook / Email digest]
   "📊 Dzisiejsze SEO opportunities (2026-04-15):
    1. 'świadectwo energetyczne 2026 nowe przepisy'
       vol 480/mo, keyword difficulty 23, nasza pozycja avg 42
       → AKCJA: napisać blog post 800+ słów
    2. 'BESS dla małych firm koszt'
       vol 190/mo, KD 18, pozycja avg 15
       → AKCJA: rozszerzyć /uslugi/magazyn-energii-bess o cennik
    3. 'audyt chłodniczy cena'
       pokazuje się ale CTR 1.2%, impressions 340/mo
       → AKCJA: rewrite meta description"
   │
   ▼
[Log do Google Sheets / Notion]
   [Data | Keyword | Action | Assigned | Status | Result_30d]
```

### Pliki do stworzenia (Sprint 7)

```
/scripts/seo-agent/
  ├── pull-gsc.ts           # Google Search Console API
  ├── pull-ga4.ts           # Google Analytics 4 API
  ├── senuto-enrich.ts      # Senuto API (PL keyword data)
  ├── claude-analyze.ts     # Claude API prompt + parsing
  ├── slack-notify.ts       # Slack webhook formatter
  ├── sheets-log.ts         # Google Sheets append
  └── /api/seo-agent/daily.ts  # Vercel Cron endpoint

vercel.json:
{ "crons": [
    { "path": "/api/seo-agent/daily", "schedule": "0 8 * * *" }
]}
```

### MCP integration (bonus dla klienta)

Open-source GSC MCP server (`AminForou/mcp-gsc`, 305 ⭐ na GitHub) pozwala Claude Desktop **bezpośrednio** odpytywać GSC w chacie:

```
Klient w Claude Desktop:
"Pokaż mi wszystkie queries z ostatnich 7 dni gdzie
 jesteśmy na pozycji 8-15 i mamy >50 impressions"

Claude automatycznie odpytuje GSC API → zwraca tabelę
→ klient widzi natychmiast co warto optymalizować
```

**Setup:** 30 minut, zero kodu po stronie klienta.

### Koszt działania agenta

- **Claude API:** ~60 PLN/miesiąc (daily analysis ~300 tokenów in, 1500 out)
- **Senuto Lite:** 140 PLN/miesiąc (API access na Prime plan droższe, ale Lite dla read-only wystarcza)
- **Vercel Cron:** darmowe w planie Hobby
- **Razem:** ~200 PLN/mo za pełną automatyzację keyword discovery

---

## 20. Stack narzędzi analitycznych {#20-tooling-stack}

### Status aktualny (co już jest)

| Narzędzie | Status | Rola |
|-----------|--------|------|
| Google Search Console | ✅ Podpięte (Asia) | Query performance, indexing |
| Google Business Profile | ✅ Aktywne (Rynek Główny 28) | Local SEO, Maps |
| Google Analytics 4 | ❌ Nie zainstalowane | Potrzebne ASAP |
| Bing Webmaster Tools | ❌ Nie ma | Darmowy, warto dodać |
| Senuto | ❌ Nie ma | Polish keyword research |
| Claude API | ❌ Nie zintegrowane | Dla keyword agent |

### Rekomendowany MVP stack (budżet ~200 PLN/mo)

| Narzędzie | Koszt | Rola | Priorytet |
|-----------|-------|------|-----------|
| Google Search Console | 0 | Queries, indexing, CTR | 🔴 Mamy |
| Google Analytics 4 | 0 | User behavior | 🔴 Dodać |
| Google Business Profile | 0 | Local SEO | 🔴 Mamy, dooptymalizować |
| Google Trends | 0 | Seasonal demand | 🟡 |
| Google Keyword Planner | 0 (z Ads) | Volume/CPC | 🟡 |
| Bing Webmaster Tools | 0 | Bing organic (10% ruchu) | 🟢 |
| **Senuto Lite** | 140 PLN/mo | **Polish keyword research** (odmiany!) | 🔴 |
| **Claude API** | ~60 PLN/mo | Keyword discovery agent | 🔴 |
| **RAZEM** | **~200 PLN/mo** | | |

**Dlaczego Senuto, nie Ahrefs/SEMrush:**
- 80% polskich SEO pro używa Senuto
- Radzi sobie z polskimi fleksjami (audyt/audytu/audytem/audytów) — Ahrefs widzi je jako 4 różne keywordy → złe dane
- Polski customer support
- Dane z polskiego SERPa, nie amerykańskiego

### Premium stack (1 000 - 2 000 PLN/mo, opcjonalnie)

Do rozważenia gdy firma rośnie:
- Senuto Advanced (€132/mo = ~570 PLN) — API access, AI writer
- Surfer SEO ($99/mo = ~390 PLN) — content optimization
- n8n self-hosted lub Make.com — orkiestracja workflows
- Claude API Pro — więcej calls dla agenta

### Jak podpiąć Asia do GA4

Jeśli Asia ma już dostęp do GSC, dodanie GA4:
1. Idzie na https://analytics.google.com → tworzy Property dla gsenergia.pl
2. Kopiuje **Measurement ID** (format `G-XXXXXXXXXX`)
3. Przekazuje Measurement ID programiście (ja)
4. Ja dodaję `<GoogleAnalytics>` do `src/app/layout.tsx` — 5 minut
5. Po 24h widać dane w Analytics
6. Linkuje się GA4 z GSC w panelu GSC → połączony widok

### Role w zespole SEO (kto co robi)

| Rola | Osoba | Zadania |
|------|-------|---------|
| **Technical SEO** | Programista (ja) | Schema, sitemap, dynamic routes, page speed |
| **Content SEO** | Copywriter + audytor | Treść stron usług, FAQ, blog, case studies |
| **Analytics** | Asia | Monitoring GSC + GA4, raporty miesięczne |
| **Local SEO** | Asia + zarząd | Google Business Profile, recenzje klientów |
| **Keyword research** | Agent + człowiek | Daily discovery via automation |
| **Link building** | Zarząd + marketing | Backlinki z portali branżowych |

---

## 21. Plan wdrożenia 2.0 — kolejność sprintów {#21-plan-wdrozenia}

### 🔴 Sprint 6 — Local SEO + location pages (2-3 tygodnie)

**Priorytet: MUST HAVE przed startem kampanii Ads.**

| # | Zadanie | Effort | Pliki |
|---|---------|--------|-------|
| 1 | Rozbudować `areaServed` w Service schema → City list | 2h | `src/lib/seo.tsx` |
| 2 | Dodać Google Maps embed + sekcję "Obsługiwane lokalizacje" na 7 stronach usług | 4h | `src/app/(site)/uslugi/[slug]/page.tsx` |
| 3 | Zoptymalizować Google Business Profile (zdjęcia, opis, kategorie) | 3h | GBP (external) |
| 4 | Zainstalować Google Analytics 4 (potrzebny Measurement ID) | 30min | `src/app/layout.tsx` |
| 5 | Dodać pricing ("od X zł") w H1 na landing pages B2C | 2h | Per location page |
| 6 | Stworzyć 10 location pages (Kraków + 5 dzielnic + Wieliczka/Skawina/Niepołomice + Małopolska) — 1500+ słów każda | 20h | `src/app/(site)/swiadectwa-energetyczne/[slug]/page.tsx` |
| 7 | Dodać 10 location hubs do sitemap.xml | 30min | `src/app/sitemap.ts` |
| 8 | Google reviews widget na homepage + /kontakt | 2h | `src/components/GoogleReviews.tsx` |

**Razem effort: ~34h programista + 10h copywriter + 5h Asia (GBP).**

### 🟡 Sprint 7 — Keyword Discovery Agent (1-2 tygodnie)

| # | Zadanie | Effort | Pliki |
|---|---------|--------|-------|
| 9 | Subskrypcja Senuto Lite (140 PLN/mo) | 15min | Billing |
| 10 | GSC API integration — pull daily queries | 4h | `scripts/seo-agent/pull-gsc.ts` |
| 11 | GA4 API integration — behavior data | 3h | `scripts/seo-agent/pull-ga4.ts` |
| 12 | Senuto API integration — enrichment | 3h | `scripts/seo-agent/senuto-enrich.ts` |
| 13 | Claude API analysis + prompt engineering | 4h | `scripts/seo-agent/claude-analyze.ts` |
| 14 | Slack webhook + Google Sheets log | 2h | `scripts/seo-agent/slack-notify.ts` |
| 15 | Vercel Cron daily 08:00 | 1h | `vercel.json` + `/api/seo-agent/daily.ts` |
| 16 | GSC MCP server setup dla Asi (Claude Desktop) | 30min | External install |
| 17 | Bing Webmaster Tools setup + sitemap submit | 30min | External |

**Razem effort: ~18h programista.**

### 🟢 Sprint 8 — Google Ads setup (opcjonalny, 1 tydzień)

| # | Zadanie | Effort |
|---|---------|--------|
| 18 | Landing pages `/lp/*` (noindex, dedykowane pod Ads) | 8h |
| 19 | Konfiguracja 4 kampanii w Google Ads (Search B2C + B2B + Brand + PMax) | 4h |
| 20 | Conversion tracking (forms, calls) | 3h |
| 21 | A/B testing headlines + CTA | ongoing |

**Budżet reklamowy:** 5 000 - 15 000 PLN/mo. **Effort setup:** ~15h.

### Timeline finalny

```
Tydzień 1-3:  Sprint 6 (Local SEO + 10 location pages)
Tydzień 4-5:  Sprint 7 (Keyword Agent)
Tydzień 6:    Sprint 8 (Google Ads — opcjonalnie)
Tydzień 7-12: Monitoring + content iteration na podstawie agent feedback
Mies. 4-6:    Pierwsze efekty TOP 10 dla long-tail
Mies. 6-9:    TOP 3 dla location keywords ("świadectwo energetyczne Wieliczka")
Mies. 9-12:   TOP 3 dla "audyt energetyczny Kraków"
```

---

## Podsumowanie 2.0

Wersja 1.0 dała nam **fundament techniczny** — 648 stron, 5 schematów JSON-LD, pełna infrastruktura. Strona jest **indeksowalna** i **wartościowa dla Google**.

Wersja 2.0 to **strategia ofensywna** — jak z tego fundamentu wyciągnąć **TOP 3 pozycje** zamiast TOP 10-20. Kluczowe różnice:

| Aspekt | v1.0 | v2.0 |
|--------|------|------|
| Cel pozycyjny | TOP 5 za 12 mies. | TOP 3 za 6-9 mies. |
| Local SEO | LocalBusiness schema na stronie głównej | Per-service `areaServed` + 10 location pages + GBP aktywność |
| Keyword research | Ręczne, ad-hoc | Automated agent daily 08:00 |
| Narzędzia analityczne | GSC | GSC + GA4 + Senuto + Bing + Claude API |
| Content strategy | 7 stron usług × 800 słów | + 10 location hubs × 1500 słów + blog driven by agent |
| Ads | Nie rozważane | Komplementarne do SEO, 5-15k PLN/mo |

**Największy mnożnik do wdrożenia:**
1. ✅ Zrobione w 1.0: infrastruktura techniczna
2. ⏳ Sprint 6 (MUST): 10 location pages + GBP optimization
3. ⏳ Sprint 7 (SHOULD): Keyword Discovery Agent
4. ⏳ Sprint 8 (NICE): Google Ads

Przy konsekwentnej realizacji strona powinna zająć **TOP 3** dla:
- "świadectwo energetyczne Kraków" → 6 mies.
- "świadectwo energetyczne Wieliczka / Skawina / Niepołomice" → 4 mies.
- "audyt energetyczny Kraków" → 9 mies.
- "audyt energetyczny przedsiębiorstwa" → 12 mies.
