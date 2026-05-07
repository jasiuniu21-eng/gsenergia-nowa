# GS Energia — Pełny Redesign + SEO

**Data:** 2026-05-07  
**Projekt:** gsenergia.pl (Next.js 16, React 19, Tailwind v4, Keystatic CMS)  
**Podejście:** Redesign sekcja po sekcji — największy efekt wizualny w rozsądnym czasie

---

## Kontekst

Strona gsenergia.vercel.app działa i ma dobrą treść (670+ artykułów, strony usług, realizacje, lokalizacje). Wymaga redesignu wizualnego i optymalizacji SEO. Użytkownik nie chce zmieniać treści — tylko oprawę.

**Zachowujemy bez zmian:**
- Hero video z drzewkiem/logo GS Energia
- Kalkulator Oszczędności (sekcja ciemna z suwakiem — działa dobrze)
- Karuzela klientów ze strzałkami (ważne: najważniejsze firmy na pierwszej stronie — PGE, Orlen, Shell, KGHM)
- Treść MDX we wszystkich sekcjach

---

## Problemy do rozwiązania

1. **Typografia bez hierarchii** — nagłówki ogromne ale szare/wyszarzone, brak kontrastu
2. **Zabroniony wzorzec kart** — sekcja "Dlaczego my" używa ikona+nagłówek+paragraf w kartach (generic B2B)
3. **SEO** — meta tagi podstawowe, brak lokalnego + branżowego SEO, słaba struktura H1/H2/H3
4. **Hero pusty wizualnie** — video gra ale brak overlay z headline i CTA

---

## Design System (istniejący — stosujemy rygorystycznie)

**Typografia:**
- Display/Headings: Sora (Google Fonts) — wagi 700/800 dla hero, 600/700 dla h2/h3
- Body: Onest (Google Fonts) — wagi 400/500/600
- Nigdy: Inter, Geist, DM Sans, Plus Jakarta, Gambarino, General Sans

**Kolory:**
- Zieleń: `oklch(0.72 0.15 130)` — desaturowana (~#8dc73f)
- Amber akcent: `oklch(0.76 0.14 75)`
- Tło jasne: ~#f8f7f3 (nie czyste #fff)
- Tekst: ~#1a1a18 (nie czarne #000)

**Zakazane wzorce:**
- 3-kolumnowy grid: ikona + nagłówek + paragraf
- Wyśrodkowane hero
- Glassmorphism, neon glow
- Stock zdjęcia (3 osoby w kaskach)

---

## Plan sekcji — Homepage

### 1. Hero ↺ OVERLAY NA VIDEO
- **Zmiana:** Dodać overlay div z gradientem (bottom dark) nad istniejącym video
- **Treść overlay:** eyebrow label + H1 z konkretną liczbą + CTA button + social proof
- **Przykład H1:** "Obniżamy koszty energii o 15–30%"
- **CTA:** "Zamów bezpłatną wycenę" (primary) + "→ Zobacz realizacje" (ghost)
- **Plik:** `src/components/sections/Hero.tsx`

### 2. Klienci — ZOSTAJE ✓
- Karuzela ze strzałkami — pierwsze logo to PGE, Orlen, Shell (VIP-y)
- Jedyna zmiana: nagłówek "Zaufali nam." — mniejszy rozmiar, wyższy kontrast

### 3. Kalkulator — ZOSTAJE ✓
- Ciemna sekcja z suwakiem — wygląda dobrze, nie ruszamy

### 4. Usługi ↺ MASONRY GRID ZE ZDJĘCIAMI
- **Zmiana:** Jedno duże kafelka (audyt przedsiębiorstwa) + 4 mniejsze w gridzie
- **Layout:** `grid-template-columns: 2fr 1fr 1fr` z `grid-row: 1/3` dla głównego
- **Zachowanie:** Zdjęcia z usług zostają, ciemne tło + zielony akcent
- **Dodać:** eyebrow label na każdym kafelku, lepszy kontrast tekstu
- **SEO:** Każdy kafelek to `<a>` z tekstem widocznym dla crawlerów
- **Plik:** `src/components/sections/ServicesGrid.tsx`

### 5. Dlaczego My ↺ WYMIANA WZORCA — STAT BLOCKS
- **Usuń:** ikona + nagłówek + paragraf w kartach
- **Zastąp:** 3 kolumny: duża liczba + border-top zielony + krótki kontekst + konkretny dowód
  - `18 lat` / na rynku / "dłużej niż większość konkurencji"
  - `400+` / zrealizowanych projektów / "PGE, Orlen, Shell, KGHM"
  - `30%` / średnia oszczędność / "gwarantujemy konkretny wynik"
- **Plik:** `src/components/sections/WhyUs.tsx`

### 6. Realizacje ↺ WYNIKI FINANSOWE NA GÓRZE
- **Zmiana:** Wynik (-28%, 420 tys. zł) jako pierwsza informacja na karcie, nie na dole
- **Layout:** Karta: lokalizacja (małe) → duża liczba wynikowa → usługa → czas zwrotu
- **Plik:** `src/components/sections/CaseStudies.tsx`

### 7. Opinie ↺ FULL-WIDTH PULL QUOTE
- **Zmiana:** Jedna mocna opinia full-width zamiast karuzeli małych kart
- **Layout:** Cudzysłów dekoracyjny (duży, zielony) + cytat 18px + podpis + firma
- **Tło:** Ciemne (#1c2419) dla kontrastu z sąsiednimi sekcjami
- **Plik:** `src/components/sections/Testimonials.tsx`

### 8. Blog — styl + SEO
- Editorial listing: tytuł + data + kategoria + excerpt
- Nie zmieniamy struktury, poprawiamy typografię

### 9. Kontakt — mocniejsze CTA
- Dodać social proof pod formularzem: "Odpowiadamy w 24h · Bezpłatna konsultacja"
- **Plik:** `src/components/sections/Contact.tsx`

---

## SEO — Plan Implementacji

### Cel: lokalne + branżowe SEO jednocześnie

**Homepage:**
- H1: "Audyty energetyczne dla przemysłu i budynków — GS Energia"
- Meta title: "Audyt energetyczny | GS Energia — od 2008, 400+ projektów"
- Meta description: konkretna liczba + USP + CTA

**Strony usług (`/uslugi/[slug]`):**
- H1 pattern: "[Nazwa usługi] — GS Energia"
- H2: podsekcje tematyczne z frazami kluczowymi
- FAQ schema już jest — zostawiamy i rozbudowujemy
- Internal links: każda usługa → realizacje z tej usługi → lokalizacje

**Strony lokalizacji (`/lokalizacje/[miasto]`):**
- H1 pattern: "Audyt energetyczny [Miasto] — GS Energia"
- Schema: `LocalBusiness` z adresem, telefonem, obszarem obsługi
- Unikalna treść per miasto (nie duplikaty!)
- Linki: lokalizacja → usługi dostępne w mieście → realizacje z tego miasta

**Blog (`/blog/[slug]`):**
- H1 = tytuł artykułu (keyword-rich)
- Internal links: każdy artykuł → 2-3 linki do usług/lokalizacji
- Breadcrumbs schema

**Techniczne:**
- `sitemap.ts` już istnieje — sprawdzić czy zawiera wszystkie lokalizacje i usługi
- `robots.ts` już poprawny
- Open Graph images — już generowane dynamicznie
- Core Web Vitals — video hero może spowalniać LCP, dodać `preload` lub `loading="lazy"` dla non-critical media

---

## Strategia branchy Git

**Zasada:** Obecna wersja na Vercel zostaje nieruszona jako punkt powrotu.

```
main (obecna wersja na Vercel — nie dotykamy)
└── redesign/v2 (cały nowy design tutaj)
```

1. Tworzymy branch `redesign/v2` od `main`
2. Cały redesign idzie na `redesign/v2`
3. Gdy gotowe i zatwierdzone — PR do `main`
4. W razie problemów: wracamy do `main` jednym kliknięciem

---

## Animacje (Framer Motion — już zainstalowany)

Wzorzec dla każdej sekcji:
```tsx
const variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } }
}
// + staggerChildren: 0.1 dla list elementów
```

**Per sekcja:**
- **Hero:** kaskada — eyebrow (0.4s) → h1 (0.5s) → sub (0.65s) → btns (0.75s) → stats (0.9s)
- **Hero orb:** `animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6 }}`
- **Nav CTA:** pulsująca box-shadow co 2.5s
- **Loga klientów:** stagger 0.08s per logo
- **Masonry usług:** `whileHover={{ scale: 1.01 }}` + strzałka `rotate: 45deg` przy hover
- **Stat liczby:** `useMotionValue` + `useSpring` — count-up przy wejściu w viewport
- **Karty realizacji:** `whileHover={{ y: -4, borderColor: var(--green) }}`
- **Wszystkie interaktywne:** `transition: all 150ms ease` globalnie

---

## Kolejność implementacji

1. **Tydzień 1:** Hero overlay + typografia globalna + WhyUs (stat blocks)
2. **Tydzień 2:** ServicesGrid (masonry) + CaseStudies (wyniki na górze) + Testimonials (pull quote)
3. **Tydzień 3:** SEO — homepage meta + H-tags + LocalBusiness schema per miasto
4. **Tydzień 4:** SEO — strony usług + blog internal links + sitemap audit
5. **Ongoing:** Blog + realizacje — styl editorial

---

## Pliki krytyczne

| Plik | Zmiana |
|------|--------|
| `src/components/sections/Hero.tsx` | Overlay z headline + CTA |
| `src/components/sections/ServicesGrid.tsx` | Masonry grid |
| `src/components/sections/WhyUs.tsx` | Stat blocks zamiast kart |
| `src/components/sections/CaseStudies.tsx` | Wyniki finansowe na górze |
| `src/components/sections/Testimonials.tsx` | Pull quote full-width |
| `src/components/sections/Contact.tsx` | Social proof pod formularzem |
| `src/lib/seo.tsx` | LocalBusiness schema per miasto |
| `src/app/(site)/lokalizacje/[miasto]/page.tsx` | H1 + meta per miasto |
| `src/app/(site)/uslugi/[slug]/page.tsx` | H1 + H2 + meta per usługa |
| `src/app/(site)/page.tsx` | H1 + meta homepage |
| `src/app/sitemap.ts` | Audit + uzupełnienie |

---

## Weryfikacja

- Dev server: `npm run dev` w `gsenergia/`
- Sprawdzić visual: każda sekcja na desktop (1440px) + mobile (375px)
- SEO audit: Google Rich Results Test dla schema
- Lighthouse: Core Web Vitals przed i po
- Sprawdzić czy LCP (hero video) < 2.5s
