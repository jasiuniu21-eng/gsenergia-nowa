# Plan SEO — gsenergia.pl (Next.js rebuild)

> Dokument roboczy. Na podstawie głębokiego researchu konkurencji i audytu obecnej struktury projektu.
> Autorzy: Claude + Joanna | Data: 2026-04-14

---

## 1. Sytuacja wyjściowa

### Co mamy w projekcie (gsenergia-nowa)

| Zasób | Liczba | Stan |
|-------|--------|------|
| MDX usługi | 65 | ✅ zaimportowane z WXR |
| MDX posty blog | 550 | ✅ zaimportowane |
| MDX realizacje | 11 | ✅ ale każda ma ~23–38 słów treści |
| MDX pages | 17 | ✅ |
| Dynamic routes | 0 | ❌ brak `/uslugi/[slug]` etc. |
| sitemap.ts | 0 | ❌ brak |
| robots.ts | 0 | ❌ brak |
| JSON-LD schema | 0 | ❌ brak |
| OG images | 0 | ❌ brak |
| `generateMetadata()` | 0 | ❌ brak na podstronach |

### Dane firmy (do JSON-LD)

```
Nazwa:    GS Energia
NIP:      685-221-14-17
Adres:    Rynek Główny 28, 31-010 Kraków
Tel:      +48 606 590 931
Email:    biuro@gsenergia.pl
Founded:  2008
Social:   Facebook, Twitter (@gsenergia), YouTube
Area:     Polska (B2B, zakłady produkcyjne)
```

---

## 2. Analiza konkurencji

### Columbus Energy — lider rynku (columbusenergy.pl)

**Stack:** WordPress + Yoast SEO + Cloudflare CDN

| Element | Wartość |
|---------|---------|
| Title tag | "Firma fotowoltaiczna ☀️0zł za prąd dzięki Zenera AI : Columbus Energy" |
| Meta description | "0zł za prąd dzięki technologii AI. Polska firma fotowoltaiczne..." |
| H1 | "Rachunek za prąd 0 zł z Gwarancją ZERO Absolutne przez 3 lata!" |
| Blog posts | **481 artykułów** w 8 kategoriach |
| Linki wewnętrzne homepage | **80–90** |
| Schema markup | WebPage, BreadcrumbList, WebSite, SearchAction |
| Open Graph | Pełne — og:title, og:description, og:image 1200×631px |
| Sitemap | 4 osobne sitemappy (posts, pages, realizacje, kategorie) |
| Local SEO | Setki stron lokalnych (fotowoltaika-bilgoraj, pompa-ciepla-opolskie) |

**Co robi dobrze:** Content volume (481 postów), lokalne strony, UX kalkulatorów, mega-menu.  
**Czego mu brakuje:** Brak case studies z liczbami, brak FAQPage schema, OG tags niekompletne.  
**Nasza przewaga:** B2B + konkretne audyty + case studies z ROI — inna liga zapytań.

---

### Zeronest (zeronest.pl)

**Stack:** Custom/SaaS

| Element | Wartość |
|---------|---------|
| Title tag | "Zeronest - Steruj magazynem w oparciu o dynamiczną taryfę" |
| Meta description | "Oszczędzaj dzięki zeronest" — **32 znaki, katastrofalne** |
| H1 | "Oszczędzaj dzięki zeronest" |
| Blog | Brak dedykowanego bloga (tylko dokumentacja na subdomenie) |
| Schema markup | **Brak** |
| Open Graph | **Brak** |
| Sitemap | 7 URLów — **minimalistyczny** |
| Linki wewnętrzne | ~15–20 |

**Co robi dobrze:** Konkretna liczba "34% oszczędności", nowoczesny design.  
**Czego mu brakuje:** Dosłownie wszystkiego w SEO. Canonical wskazuje na inną domenę (zeronest.energy).  
**Nasza przewaga:** Zeronest to SaaS niszowy — inne ICP. Ale pokazuje, że SEO basics wystarczą żeby go pobić.

---

### GS Energia (stara strona, gsenergia.pl)

**Stack:** WordPress + All in One SEO v4.9.5.1 + LiteSpeed

| Element | Wartość |
|---------|---------|
| Title tag | "Audyt energetyczny przedsiębiorstwa, efektywności energetycznej zakładu przemysłowego i budynków - Kraków - GS ENERGIA" *(za długi, keyword stuffing)* |
| Meta description | "Wykonujemy audyty energetyczne przedsiębiorstw wraz z opomiarowaniem. Obniżymy wartość faktur za energie w Twoim przedsiębiorstwie." |
| H1 | "Jak możemy Ci pomóc?" + "O ile % obniżymy wartość faktur za energie w Twoim przedsiębiorstwie?" |
| Blog | 550+ postów (sitemap: 6 434 linie — do weryfikacji) |
| Schema markup | LocalBusiness ✅, Organization ✅, BreadcrumbList ✅ |
| Sitemap | 5 osobnych: posts, pages, uslugi (65), kategorie (13), tagi (100+) |

**Obserwacja:** Stara strona ma lepsze SEO basics niż Zeronest. Nowa musi to odwzorować i przebić.

---

### Tabela porównawcza

| Aspekt | Columbus | Zeronest | GS stara | GS nowa (cel) |
|--------|----------|----------|----------|---------------|
| Title (jakość) | 7/10 | 4/10 | 5/10 | **9/10** |
| Meta description | 7/10 | 1/10 | 7/10 | **9/10** |
| H1 (jeden, mocny) | ✗ ma 2 | ✓ | ✗ ma 2 | **✓** |
| Schema: LocalBusiness | ✗ | ✗ | ✓ | **✓** |
| Schema: Service | ✗ | ✗ | ✗ | **✓** |
| Schema: FAQPage | ✗ | ✗ | ✗ | **✓** |
| Schema: Article | ✗ | ✗ | ✓ (basic) | **✓** |
| Open Graph pełny | ✓ | ✗ | ✗ (partial) | **✓** |
| OG Image dynamic | ✓ | ✗ | ✗ | **✓** |
| Sitemap (240+ URLs) | ✓ | ✗ | ✓ | **✓** |
| Robots.txt | ✓ | ✓ | ✓ | **✓** |
| Blog content | 481 art. | ~50 | 550 art. | 550 (migracja) |
| Case studies | ✗ z liczbami | ✗ | ✗ z liczbami | **✓ z metrykami** |
| Local SEO | ✓✓✓ | ✗ | ✓ (Kraków) | **✓ (Kraków + PL)** |
| Linki wewnętrzne / HP | 80–90 | 15–20 | ? | **~64** |
| Canonicals | ✓ | ✗ błąd | ✓ | **✓** |
| Hreflang PL/EN | ✗ | ✗ | ✗ | **✓ (gdzie dotyczy)** |

---

## 3. Słowa kluczowe do targetowania

### High-intent (obowiązkowe prawnie — guaranteed demand)

| Fraza | Powód |
|-------|-------|
| audyt energetyczny przedsiębiorstwa | Ustawowy obowiązek co 4 lata dla dużych firm |
| audyt efektywności energetycznej | Konieczny do białych certyfikatów |
| audyt chłodniczy zakładu | Specjalistyczny, mało konkurencji |
| audyt wodorowy | Emerging, prawie zero konkurencji |
| EMS system zarządzania energią | B2B, high-value |
| magazyn energii BESS przemysł | Rosnący rynek |
| dekarbonizacja CSRD Net Zero | Trend regulacyjny 2024–2026 |
| białe certyfikaty audyt | Konkretny benefit finansowy |

### Long-tail (szybkie wyniki, mniej konkurencja)

| Fraza | Typ |
|-------|-----|
| ile kosztuje audyt energetyczny zakładu | Informacyjne → konwersja |
| audyt energetyczny Kraków firma | Lokalne |
| zwrot inwestycji z audytu energetycznego | Decyzyjne |
| audyt sprężonego powietrza oszczędności | Nisza |
| badania termowizyjne instalacji elektrycznych | Nisza |
| obowiązkowy audyt energetyczny kiedy | Prawny |
| audyt energetyczny co ile lat | Prawny |
| firma audytorska energetyczna Małopolska | Lokalne |

### Treści do usunięcia / wyczyszczenia

⚠️ **Problem w istniejących tagach:**
- Literówka: `efektywność ennergetyczna` (podwójne 'n') — do poprawienia w seed
- Duplikaty slugów: `dom-energooszczedny` vs `dom-energooszczedny-2`
- 100+ tagów → zbyt rozdrobnione, konsolidować do ~30

---

## 4. Architektura SEO — co budujemy

### 4.1 Sitemap (`src/app/sitemap.ts`)

```
/ (priorytet 1.0, daily)
/uslugi (0.9, weekly)
  /uslugi/audyt-energetyczny-przedsiebiorstwa (0.9)
  /uslugi/audyt-efektywnosci-energetycznej (0.9)
  ... ×65 usług
/realizacje (0.8, weekly)
  /realizacje/kompleksowy-audyt-energetyczny-... (0.8)
  ... ×11
/blog (0.7, daily)
  /blog/[slug] (0.7) ×550
/o-nas (0.6, monthly)
/kontakt (0.6, monthly)
/polityka-prywatnosci (0.3, yearly)
```

**Razem: ~640+ URLów** — Google znajdzie wszystko przy pierwszym crawlu.

Implementacja przez `listSlugs(type)` z istniejącego `src/lib/content.ts` — funkcja już istnieje.

### 4.2 Robots.txt (`src/app/robots.ts`)

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://gsenergia.pl/sitemap.xml
```

### 4.3 JSON-LD Schema (`src/lib/seo.ts`)

#### A. LocalBusiness — na root layout, raz, globalnie

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "GS Energia",
  "description": "Audyty energetyczne dla zakładów produkcyjnych. Od 2008 r.",
  "url": "https://gsenergia.pl",
  "telephone": "+48606590931",
  "email": "biuro@gsenergia.pl",
  "foundingDate": "2008",
  "areaServed": "Polska",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rynek Główny 28",
    "addressLocality": "Kraków",
    "postalCode": "31-010",
    "addressCountry": "PL"
  },
  "additionalProperty": {
    "@type": "PropertyValue",
    "name": "NIP",
    "value": "685-221-14-17"
  },
  "sameAs": [
    "https://facebook.com/gsenergia",
    "https://twitter.com/gsenergia",
    "https://youtube.com/@gsenergia"
  ]
}
```

#### B. Service — na każdej podstronie usługi

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Audyt Energetyczny Przedsiębiorstwa",
  "serviceType": "Audyt energetyczny",
  "provider": { "@id": "https://gsenergia.pl/#organization" },
  "areaServed": "Polska",
  "description": "...",
  "url": "https://gsenergia.pl/uslugi/audyt-energetyczny-przedsiebiorstwa"
}
```

#### C. FAQPage — na usługach gdzie dodamy FAQ w frontmatter MDX

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ile kosztuje audyt energetyczny przedsiębiorstwa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Koszt audytu zależy od..."
      }
    }
  ]
}
```

> ⚡ **Columbus i Zeronest tego nie mają = nasza unikalna przewaga w Google rich snippets.**

#### D. Article — na postach blogowych

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": {
    "@type": "Organization",
    "name": "GS Energia"
  },
  "publisher": { "@id": "https://gsenergia.pl/#organization" }
}
```

#### E. BreadcrumbList — na każdej dynamicznej stronie

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://gsenergia.pl" },
    { "@type": "ListItem", "position": 2, "name": "Usługi", "item": "https://gsenergia.pl/uslugi" },
    { "@type": "ListItem", "position": 3, "name": "Audyt Energetyczny", "item": "..." }
  ]
}
```

### 4.4 Dynamic Metadata (`generateMetadata()`)

#### Wzorzec dla usług

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const doc = await getDoc("uslugi", params.slug);
  return {
    title: doc.frontmatter.title,  // "Audyt Energetyczny Przedsiębiorstwa"
    description: doc.frontmatter.excerpt ?? buildExcerpt(doc.content, 155),
    alternates: {
      canonical: `https://gsenergia.pl/uslugi/${params.slug}`,
    },
    openGraph: {
      title: doc.frontmatter.title,
      description: doc.frontmatter.excerpt,
      type: "website",
      url: `https://gsenergia.pl/uslugi/${params.slug}`,
    },
  };
}
```

#### Wzorzec tytułów (max 60 znaków)

| Strona | Title |
|--------|-------|
| Główna | `GS Energia — audyty energetyczne dla przemysłu` |
| Usługa | `Audyt Energetyczny Przedsiębiorstwa · GS Energia` |
| Blog post | `[Tytuł posta] · GS Energia` |
| Realizacja | `[Klient] — case study audytu · GS Energia` |
| O nas | `O nas — 18 lat audytów energetycznych · GS Energia` |
| Kontakt | `Kontakt · GS Energia Kraków` |

#### Wzorzec meta descriptions (max 160 znaków)

| Strona | Description |
|--------|-------------|
| Główna | `Od 2008 r. audyty energetyczne dla zakładów produkcyjnych. Konkret, liczby, zwrot inwestycji. Bezpłatna wycena.` |
| Audyt AEP | `Obowiązkowy audyt energetyczny przedsiębiorstwa co 4 lata. Pomiary, analiza, rekomendacje. Białe certyfikaty. Wycena 48h.` |
| Realizacja | `[Klient, branża]: redukcja zużycia energii o [N]%, zwrot w [M] miesiącach. Case study GS Energia.` |

### 4.5 OG Images (`src/app/opengraph-image.tsx`)

Dynamiczne obrazy 1200×630px przez Next.js `ImageResponse` (Satori):

```
[Logo GS Energia — lewy górny róg]
[Tytuł strony — duży, Gambarino display]
[Claim — "Od 2008 · 400+ audytów · Zwrot inwestycji"]
[Tło — brand-green gradient subtelny, engineering grid]
```

Osobne pliki dla:
- `src/app/opengraph-image.tsx` (homepage)
- `src/app/uslugi/[slug]/opengraph-image.tsx` (usługi)
- `src/app/blog/[slug]/opengraph-image.tsx` (posty)

### 4.6 Canonical + Hreflang

Przez `alternates` w `generateMetadata()`:

```typescript
alternates: {
  canonical: `https://gsenergia.pl/uslugi/${slug}`,
  languages: {
    "pl": `https://gsenergia.pl/uslugi/${slug}`,
    "en": `https://gsenergia.pl/en/services/${slug}`, // jeśli istnieje para EN
  },
},
```

---

## 5. Case Studies — strategia treści

### Problem: nasze realizacje mają ~23–38 słów

Klient BSH Bosch — 33 słowa. PGE Energia Odnawialna — 23 słowa. **To nie rankuje.**

### Plan wzbogacenia każdej realizacji

Minimalna struktura (min. 300 słów):

```markdown
## [Klient] — [Typ audytu]

**Klient:** [Pełna nazwa]  
**Segment:** [Produkcja żywności / Automotive / Infrastruktura krytyczna]  
**Lokalizacja:** [Województwo]  
**Rok:** [YYYY]  
**Zakres:** [Co dokładnie zbadaliśmy]

### Problem
[2–3 zdania: co klient zgłosił, jakie były zużycia przed audytem]

### Nasze działania
[Lista: co zmierzyliśmy, jakie technologie zastosowaliśmy]

### Wyniki
| Wskaźnik | Przed | Po | Zmiana |
|----------|-------|----|--------|
| Roczne zużycie energii | X MWh | Y MWh | −N% |
| Koszt energii rocznie | X zł | Y zł | −N zł |
| Emisja CO₂ | X t | Y t | −N t |
| Zwrot z inwestycji | — | — | N miesięcy |

### Zastosowane technologie
[Lista: pomiary, kamery termowizyjne, analizatory, systemy EMS]

### Zidentyfikowane oszczędności
[Konkretne obszary: sprężarki, oświetlenie, HVAC, chłód procesowy]
```

### Priorytety wzbogacenia (od największych klientów)

1. PGE Energia Odnawialna S.A.
2. BSH Bosch und Siemens Hausgeräte
3. Shell Polska Sp. z o.o.
4. PAŻP (Polska Agencja Żeglugi Powietrznej)
5. Pozostałe 7 realizacji

---

## 6. FAQ w frontmatter usług — lista pytań

Do dodania w MDX każdej usługi:

```yaml
faq:
  - q: "..."
    a: "..."
```

### Audyt Energetyczny Przedsiębiorstwa

```yaml
faq:
  - q: "Kto musi przeprowadzić audyt energetyczny przedsiębiorstwa?"
    a: "Obowiązek dotyczy dużych przedsiębiorców w rozumieniu ustawy o efektywności energetycznej — firm zatrudniających powyżej 250 osób lub osiągających obroty powyżej 50 mln EUR albo sumę bilansową powyżej 43 mln EUR. Audyt przeprowadza się co 4 lata."
  - q: "Ile kosztuje audyt energetyczny przedsiębiorstwa?"
    a: "Koszt zależy od wielkości zakładu, liczby mediów energetycznych i zakresu pomiarów. Dla zakładu 500–5000 kWh/rok koszt audytu wynosi typowo 8 000–25 000 zł netto. Wycenę przygotowujemy bezpłatnie w ciągu 48h."
  - q: "Jak długo trwa audyt energetyczny?"
    a: "Typowo 3–8 tygodni: 1–2 tygodnie pomiarów na miejscu, 2–4 tygodnie opracowania raportu. Dla dużych zakładów z wieloma węzłami energetycznymi czas może się wydłużyć."
  - q: "Czy audyt energetyczny uprawnia do białych certyfikatów?"
    a: "Audyt efektywności energetycznej (nie audyt przedsiębiorstwa) jest podstawą do uzyskania świadectw efektywności energetycznej (białych certyfikatów) od Prezesa URE. GS Energia wykonuje oba rodzaje audytów."
  - q: "Co zawiera raport z audytu energetycznego?"
    a: "Raport zawiera: charakterystykę energetyczną zakładu, identyfikację głównych odbiorników energii, analizę zużycia z ostatnich 3 lat, listę środków poprawy efektywności z obliczeniami oszczędności, szacunki kosztów inwestycji i czasu zwrotu (prostego i zdyskontowanego)."
```

### Audyt Chłodniczy

```yaml
faq:
  - q: "Czym różni się audyt chłodniczy od standardowego audytu energetycznego?"
    a: "Audyt chłodniczy skupia się wyłącznie na systemach chłodzenia: agregatach wody lodowej, wentylatorach, pompach, wymiennikach ciepła i systemach sterowania. Wymaga specjalistycznych pomiarów parametrów czynników chłodniczych i współczynników COP/EER."
  - q: "Kiedy warto zlecić audyt chłodniczy?"
    a: "Gdy koszty chłodu stanowią powyżej 20% rachunku za energię, gdy system chłodniczy ma powyżej 10 lat, przy planowanej rozbudowie mocy produkcyjnych lub gdy zauważamy nieefektywność — np. częste awarie, niestabilne temperatury."
```

### Dekarbonizacja

```yaml
faq:
  - q: "Co to jest CSRD i kogo dotyczy?"
    a: "CSRD (Corporate Sustainability Reporting Directive) to unijna dyrektywa zobowiązująca duże firmy do raportowania ESG od 2024–2026 r. Dotyczy firm powyżej 250 pracowników lub 40 mln EUR przychodu. Raport musi zawierać dane o emisjach Scope 1, 2 i 3."
  - q: "Jak audyt energetyczny wspiera dekarbonizację?"
    a: "Audyt identyfikuje źródła emisji CO₂ (Scope 1: spalanie paliw, Scope 2: zakup energii elektrycznej) i wskazuje konkretne działania redukcyjne z obliczonymi oszczędnościami w tonach CO₂/rok i złotych/rok. To podstawa planu Net Zero."
```

---

## 7. Internal Linking Strategy

### Cel: 60–80 linków na homepage

| Źródło | Liczba linków | Przykłady |
|--------|--------------|-----------|
| Nav megamenu | 14 | 7 usług × 2 linki |
| Hero CTA | 2 | ankieta + scroll #uslugi |
| Sekcja Usługi (7 kart) | 14 | każda karta → /uslugi/[slug] |
| Sekcja Realizacje (11) | 11 | każda → /realizacje/[slug] |
| Sekcja Blog (3 artykuły) | 3 | każdy → /blog/[slug] |
| Footer (nawigacja + usługi + social) | 20 | linki do podstron |
| **RAZEM** | **~64** | ✅ w zakresie |

### Cross-linking usługi ↔ blog

Każdy post blogowy powinien linkować do min. 1–2 usług:
- Post "Jak działa EMS?" → `/uslugi/ems-telemetria`
- Post "Białe certyfikaty" → `/uslugi/audyt-efektywnosci-energetycznej`
- Post "CSRD reporting" → `/uslugi/dekarbonizacja`

Każda usługa powinna linkować do 2–3 powiązanych postów (sekcja "Dowiedz się więcej"):
- `/uslugi/audyt-wodorowy` → posty o technologiach wodorowych
- `/uslugi/magazyn-energii-bess` → posty o BESS, OZE, dynamiczna taryfa

---

## 8. Treść usług — szablon SEO-first

Każda strona usługi powinna mieć min. 800 słów treści (obecnie większość ma 0 — tylko frontmatter):

```markdown
# [Tytuł usługi]

[Lead paragraph 2–3 zdania: co to jest, kogo dotyczy, jaki jest główny benefit]

## Kogo dotyczy obowiązek?

[Konkretne kryteria prawne jeśli dotyczy]

## Co obejmuje [usługa]?

[Lista punktowana: zakres prac, metodologia, normy (ISO 50001, PN-EN 16247)]

## Korzyści dla Twojego zakładu

[3–5 konkretnych korzyści z liczbami:
- Redukcja zużycia energii o 15–35%
- Podstawa do białych certyfikatów (wartość rynkowa)
- Spełnienie wymogu ustawowego (kara za brak: do 5% przychodu)]

## Jak przebiega audyt?

[Timeline z etapami: wizja lokalna → pomiary → analiza → raport → rekomendacje]

## Przykładowe oszczędności

[Anonimizowany case: branża, wielkość zakładu, wyniki — liczby]

## FAQ

[Wyciągnięte z frontmatter faq: block]

## Zamów wycenę

[CTA: bezpłatna wycena 48h, przycisk → ankieta]
```

---

## 9. Lokalne SEO

### Kraków jako baza

W JSON-LD LocalBusiness: adres Rynek Główny 28, 31-010 Kraków.

### Rozszerzenie na Polskę

Nie tworzymy setek stron lokalnych jak Columbus (fotowoltaika-[miasto]) — to nie nasza strategia (B2B, nie B2C). Zamiast tego:

- Meta description i content usług: "Realizujemy audyty w całej Polsce"
- W case studies: oznaczamy województwo klienta
- `areaServed: "Polska"` w JSON-LD

---

## 10. Plan wdrożenia (priorytety)

### Tier 1 — Techniczna infrastruktura (bez tego crawlery nie działają)

- [ ] `src/app/sitemap.ts` — dynamiczny, 640+ URLów
- [ ] `src/app/robots.ts` — z linkiem do sitemapX
- [ ] `src/lib/seo.ts` — helpers: localBusinessSchema, serviceSchema, articleSchema, breadcrumbSchema, faqSchema
- [ ] `src/app/layout.tsx` — wstrzyknięcie JSON-LD LocalBusiness
- [ ] `src/app/uslugi/[slug]/page.tsx` — generateMetadata + ServiceSchema + FAQSchema + Breadcrumbs
- [ ] `src/app/blog/[slug]/page.tsx` — generateMetadata + ArticleSchema + Breadcrumbs
- [ ] `src/app/realizacje/[slug]/page.tsx` — generateMetadata + Breadcrumbs
- [ ] `src/lib/site.ts` — dodać `openingHours`, `areaServed`, `priceRange`

**Szacowany czas:** 1–2 dni implementacji

### Tier 2 — CTR (kliknięcia z wyników)

- [ ] `src/app/opengraph-image.tsx` — homepage OG image 1200×630
- [ ] `src/app/uslugi/[slug]/opengraph-image.tsx` — dynamiczne OG
- [ ] `src/app/blog/[slug]/opengraph-image.tsx` — dynamiczne OG
- [ ] Meta descriptions dla wszystkich 65 usług (w frontmatter MDX)
- [ ] Canonical + hreflang w generateMetadata
- [ ] FAQ w frontmatter 7 głównych usług (→ FAQPage rich snippets)

**Szacowany czas:** 2–3 dni

### Tier 3 — Content Authority (pozycja w czasie)

- [ ] Wzbogacenie 11 realizacji do min. 300 słów każda (z tabelą metryk)
- [ ] Treść usług: 800+ słów dla 7 głównych usług
- [ ] Konsolidacja tagów (z 100+ do ~30 semantycznych)
- [ ] Poprawka literówek w istniejących tagach (`ennergetyczna` → `energetyczna`)
- [ ] Internal linking: każdy post → min. 1 usługa, każda usługa → 2–3 posty

**Szacowany czas:** 1–2 tygodnie (content writing)

---

## 11. Weryfikacja — jak sprawdzamy efekty

### Techniczne (natychmiastowe)

```bash
# Sitemap
curl https://gsenergia.pl/sitemap.xml | grep -c "<url>"
# Oczekiwany wynik: 640+

# Robots
curl https://gsenergia.pl/robots.txt
# Oczekiwany wynik: Sitemap: https://gsenergia.pl/sitemap.xml

# Schema
curl https://gsenergia.pl/ | python3 -m json.tool  # sprawdź JSON-LD
```

### Narzędzia walidacyjne

- **Google Rich Results Test** → `https://search.google.com/test/rich-results`
  - Testujemy: homepage (LocalBusiness), usługa (Service + FAQ), post (Article)
- **Facebook Sharing Debugger** → sprawdzamy OG image 1200×630
- **Lighthouse SEO** → cel ≥95 na mobile
- **Google Search Console** → po deployu: weryfikacja sitemapY, sprawdzenie coverage

### Pozycje (po 2–4 tygodniach od deployu)

Monitorujemy w GSC:
- "audyt energetyczny przedsiębiorstwa" — czy strona wchodzi do top 20
- "audyt chłodniczy" — nisza, powinno być top 10
- "audyt wodorowy" — bardzo mała konkurencja, cel top 5
- "GS Energia" — branded query (powinno być #1)

---

## 12. Czego NIE robimy (poza zakresem)

- ❌ Setki stron lokalnych (fotowoltaika-[miasto]) — to strategia B2C Columbus, nie nasza
- ❌ Google My Business optimization — to osobny kanał, poza tym projektem technicznym
- ❌ Link building — poza zakresem kodu
- ❌ Płatne kampanie (Google Ads) — poza zakresem
- ❌ 6 400 postów blogowych jak stara strona — audyt jakości najpierw, seed 550 postów z weryfikacją

---

*Dokument wygenerowany: 2026-04-14. Aktualizować po każdym etapie wdrożenia.*
