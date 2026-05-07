# GS Energia Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przeprojektować gsenergia.pl sekcja po sekcji — premium design z animacjami Framer Motion + pełne SEO lokalne i branżowe, na osobnym branchu `redesign/v2`.

**Architecture:** Redesign idzie na branch `redesign/v2` (main = obecna wersja na Vercel = punkt powrotu). Każdy komponent React przepisujemy w miejscu — bez zmiany struktury routingu ani CMS. Animacje przez Framer Motion (już zainstalowany). Design tokens w `tailwind.config.ts`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Framer Motion 12, TypeScript 5, Keystatic CMS, Vercel

**Spec:** `docs/superpowers/specs/2026-05-07-gsenergia-redesign-design.md`
**Mockup:** `.superpowers/brainstorm/*/content/wow-mockup-v3-animated.html`

---

## File Map

| Plik | Akcja | Co robimy |
|------|-------|-----------|
| `src/components/sections/Hero.tsx` | Modify | Overlay z headline + CTA + stats na hero video |
| `src/components/sections/ClientsWall.tsx` | Modify | Duże logo-tile grid + karuzela ze strzałkami |
| `src/components/sections/ServicesGrid.tsx` | Modify | Masonry 2fr+1fr+1fr grid |
| `src/components/sections/WhyUs.tsx` | Modify | Stat blocks zamiast icon cards |
| `src/components/sections/CaseStudies.tsx` | Modify | Wynik finansowy na górze karty |
| `src/components/sections/Testimonials.tsx` | Modify | Full-width pull quote |
| `src/components/sections/Contact.tsx` | Modify | Social proof pod formularzem |
| `src/components/SiteNav.tsx` | Modify | Mixed case + hover states |
| `src/components/Footer.tsx` | Create | Nowy footer (4 kolumny + bottom bar) |
| `src/design/motion.ts` | Modify | Framer Motion variants — fadeUp, stagger, countUp |
| `src/app/(site)/page.tsx` | Modify | H1 + meta SEO homepage |
| `src/app/(site)/uslugi/[slug]/page.tsx` | Modify | H1 pattern + meta per usługa |
| `src/app/(site)/lokalizacje/[miasto]/page.tsx` | Modify | H1 + LocalBusiness schema per miasto |
| `src/lib/seo.tsx` | Modify | LocalBusiness schema helper per miasto |
| `src/app/sitemap.ts` | Modify | Audit + uzupełnienie lokalizacji |
| `tailwind.config.ts` | Modify | Design tokens — `--green`, `--green-dark`, `--cream`, `--ink` |

---

## Task 1: Branch + Design Tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Krok 1: Utwórz branch redesign/v2**

```bash
cd /Users/joanna/Desktop/Gsenergia-nowa/gsenergia
git checkout -b redesign/v2
git push -u origin redesign/v2
```

Expected: branch `redesign/v2` aktywny lokalnie i na origin.

- [ ] **Krok 2: Dodaj design tokens do tailwind.config.ts**

Otwórz `tailwind.config.ts` i w sekcji `theme.extend` dodaj/zaktualizuj:

```ts
theme: {
  extend: {
    colors: {
      green: {
        DEFAULT: '#8dc73f',
        dark:    '#1c2419',
        mid:     '#243020',
        light:   'rgba(141,199,63,0.1)',
      },
      cream:  '#f7f6f1',
      ink:    '#1a1a18',
      muted:  '#6b6b62',
      border: '#e4e2db',
    },
    fontFamily: {
      display: ['Sora', 'system-ui', 'sans-serif'],
      body:    ['Onest', 'system-ui', 'sans-serif'],
    },
    transitionTimingFunction: {
      'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },
},
```

- [ ] **Krok 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add design tokens — green palette, fonts, spring easing"
```

---

## Task 2: Motion Variants

**Files:**
- Modify: `src/design/motion.ts`

- [ ] **Krok 1: Zastąp zawartość motion.ts**

```ts
import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

// Wrapper — viewport trigger dla sekcji
export const viewportOnce = { once: true, margin: '0px 0px -60px 0px' }
```

- [ ] **Krok 2: Commit**

```bash
git add src/design/motion.ts
git commit -m "feat: add framer motion variants — fadeUp, stagger, scaleIn, slideRight"
```

---

## Task 3: Nawigacja — Mixed Case + Hover

**Files:**
- Modify: `src/components/SiteNav.tsx`

- [ ] **Krok 1: Zmień ALL CAPS na Mixed Case**

W `SiteNav.tsx` znajdź miejsca gdzie linki nawigacyjne są uppercase (przez CSS `uppercase` lub `text-transform`). Usuń klasę `uppercase` i `tracking-widest` z linków nawigacyjnych. Zamień na `tracking-tight` lub brak klasy.

Przykład zmiany na linkach nav:
```tsx
// PRZED:
<Link className="text-xs uppercase tracking-widest font-medium ...">

// PO:
<Link className="text-sm font-medium tracking-tight transition-colors duration-150 hover:text-green ...">
```

- [ ] **Krok 2: Zmień CTA "KONSULTACJA" na zielony spójny z logo**

Znajdź przycisk CTA w nawigacji (aktualnie żółto-zielony). Zmień kolor na `bg-green`:

```tsx
// PRZED: bg-[#d4ff00] lub podobny żółty
// PO:
<Link className="bg-green text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150 hover:bg-green/90 hover:scale-[1.02]">
  Zamów wycenę
</Link>
```

- [ ] **Krok 3: Sprawdź wizualnie**

```bash
npm run dev
```

Otwórz `http://localhost:3000` — sprawdź czy nav wygląda poprawnie na desktop i mobile.

- [ ] **Krok 4: Commit**

```bash
git add src/components/SiteNav.tsx
git commit -m "feat: nav mixed case + green CTA consistent with logo color"
```

---

## Task 4: Hero — Overlay z Headline i CTA

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Krok 1: Dodaj overlay nad istniejącym video**

W `Hero.tsx` znajdź kontener `<section>` lub `<div>` który opakowuje video. Upewnij się że ma `relative` i `overflow-hidden`. Dodaj overlay jako absolutny div:

```tsx
import { motion } from 'framer-motion'
import { fadeUp, slideRight, staggerContainer, viewportOnce } from '@/design/motion'

// Wewnątrz sekcji hero — po video, przed zamknięciem sekcji:
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

<motion.div
  className="absolute bottom-0 left-0 z-20 p-16 max-w-3xl"
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.p
    variants={slideRight}
    className="text-green text-xs uppercase tracking-[0.14em] mb-6 flex items-center gap-3 before:content-[''] before:w-7 before:h-px before:bg-green"
  >
    Audyty energetyczne od 2008
  </motion.p>

  <motion.h1
    variants={fadeUp}
    className="font-display text-white text-5xl xl:text-7xl font-normal italic leading-[1.0] tracking-tight mb-6"
  >
    Obniżamy koszty<br />
    energii o <em className="not-italic text-green">15–30%</em>
  </motion.h1>

  <motion.p
    variants={fadeUp}
    className="text-white/50 text-lg font-light leading-relaxed max-w-md mb-10"
  >
    Audyty energetyczne dla przemysłu i budynków.<br />
    400+ projektów. PGE, Orlen, Shell, KGHM nam zaufały.
  </motion.p>

  <motion.div variants={fadeUp} className="flex items-center gap-4">
    <a
      href="/kontakt"
      className="bg-green text-white px-7 py-3.5 rounded-lg text-sm font-semibold shadow-[0_4px_20px_rgba(141,199,63,0.3)] transition-all duration-200 hover:bg-green/90 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(141,199,63,0.4)]"
    >
      Zamów bezpłatną wycenę
    </a>
    <a href="/realizacje" className="text-white/45 text-sm transition-colors hover:text-white/80">
      Zobacz realizacje →
    </a>
  </motion.div>
</motion.div>

{/* Stats w prawym dolnym rogu */}
<motion.div
  className="absolute bottom-16 right-16 z-20 flex gap-12"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
  {[
    { num: '400+', label: 'projektów' },
    { num: '18',   label: 'lat' },
    { num: '30%',  label: 'oszczędność' },
  ].map(({ num, label }) => (
    <div key={label} className="text-center">
      <div className="font-display text-white text-4xl font-normal leading-none">{num}</div>
      <div className="text-white/32 text-xs uppercase tracking-widest mt-1">{label}</div>
    </div>
  ))}
</motion.div>
```

- [ ] **Krok 2: Dodaj logo GS Energia w lewym górnym rogu hero**

```tsx
{/* Logo w rogu — nad overlayem */}
<div className="absolute top-9 left-13 z-30">
  <Image src="/logo.svg" alt="GS Energia" width={64} height={64} priority />
  <p className="text-white/65 text-xs font-semibold tracking-widest mt-1">
    gs<span className="text-green">|</span>energia
  </p>
</div>
```

Sprawdź ścieżkę do logo SVG w `public/` — dostosuj jeśli inna.

- [ ] **Krok 3: Sprawdź wizualnie na dev**

```bash
npm run dev
```

Otwórz `http://localhost:3000` — hero powinien mieć overlay z tekstem na video.

- [ ] **Krok 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: hero overlay with headline, CTA, stats, logo in corner"
```

---

## Task 5: Klienci — Duże Logo Tiles + Karuzela

**Files:**
- Modify: `src/components/sections/ClientsWall.tsx`

- [ ] **Krok 1: Przepisz layout na duże kafelki w gridzie**

```tsx
'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/design/motion'

// Sekcja klientów:
<section className="bg-white py-16 px-20 border-b border-border">
  <motion.div
    className="flex justify-between items-center mb-10"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
  >
    <h2 className="font-display text-4xl font-normal italic text-ink tracking-tight">
      Zaufały nam.
    </h2>
    <p className="text-sm text-muted">
      Strona <strong className="text-ink">{currentPage}</strong> z {totalPages} ·{' '}
      <strong className="text-green">400+</strong> klientów
    </p>
  </motion.div>

  <motion.div
    className="grid grid-cols-6 gap-2 mb-6"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
  >
    {visibleLogos.map((logo) => (
      <motion.div
        key={logo.name}
        variants={staggerItem}
        className="aspect-[3/2] bg-cream rounded-xl flex items-center justify-center group cursor-pointer transition-all duration-220 hover:-translate-y-0.5 hover:shadow-md hover:bg-[#eeeee8]"
      >
        <img
          src={logo.src}
          alt={logo.name}
          className="max-w-[70%] max-h-10 object-contain grayscale opacity-50 transition-all duration-220 group-hover:grayscale-0 group-hover:opacity-100"
        />
      </motion.div>
    ))}
  </motion.div>

  {/* Strzałki karuzeli */}
  <div className="flex justify-center items-center gap-3">
    <button
      onClick={prev}
      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted transition-all hover:border-green hover:text-green hover:scale-105"
    >
      ‹
    </button>
    <span className="text-xs text-muted">
      Strona <strong className="text-ink">{currentPage}</strong> / {totalPages}
    </span>
    <button
      onClick={next}
      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted transition-all hover:border-green hover:text-green hover:scale-105"
    >
      ›
    </button>
  </div>
</section>
```

- [ ] **Krok 2: Dodaj logikę paginacji (useState)**

```tsx
const LOGOS_PER_PAGE = 12
const [currentPage, setCurrentPage] = useState(1)
const totalPages = Math.ceil(logos.length / LOGOS_PER_PAGE)
const start = (currentPage - 1) * LOGOS_PER_PAGE
const visibleLogos = logos.slice(start, start + LOGOS_PER_PAGE)
const prev = () => setCurrentPage(p => Math.max(1, p - 1))
const next = () => setCurrentPage(p => Math.min(totalPages, p + 1))
```

- [ ] **Krok 3: Sprawdź i commit**

```bash
npm run dev
# Sprawdź: loga duże w gridzie, strzałki działają, hover grayscale→color
git add src/components/sections/ClientsWall.tsx
git commit -m "feat: clients wall — large logo grid with paginated arrows"
```

---

## Task 6: Usługi — Masonry Grid

**Files:**
- Modify: `src/components/sections/ServicesGrid.tsx`

- [ ] **Krok 1: Przepisz na masonry 2fr+1fr+1fr**

```tsx
<motion.div
  className="grid gap-1.5 rounded-2xl overflow-hidden"
  style={{ gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '280px 280px' }}
  variants={scaleIn}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
>
  {services.map((service, i) => (
    <motion.a
      key={service.slug}
      href={`/uslugi/${service.slug}`}
      className={`relative overflow-hidden bg-green-dark flex flex-col justify-end p-6 group cursor-pointer ${i === 0 ? 'row-span-2' : ''}`}
      whileHover={{ backgroundColor: '#243020' }}
      transition={{ duration: 0.25 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent transition-opacity duration-250 group-hover:opacity-80" />

      {/* Zdjęcie w tle jeśli dostępne */}
      {service.image && (
        <img
          src={service.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      )}

      {/* Strzałka — obraca się przy hover */}
      <motion.div
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 text-sm"
        whileHover={{ rotate: 45, borderColor: '#8dc73f', color: '#8dc73f', scale: 1.1 }}
      >
        →
      </motion.div>

      <div className="relative z-10">
        <p className="text-[9px] uppercase tracking-[0.14em] text-green mb-1.5">{service.tag}</p>
        <h3 className={`font-semibold text-white leading-snug transition-transform duration-200 group-hover:-translate-y-0.5 ${i === 0 ? 'text-2xl mb-2' : 'text-lg'}`}>
          {service.title}
        </h3>
        {i === 0 && service.excerpt && (
          <p className="text-xs text-white/40 leading-relaxed">{service.excerpt}</p>
        )}
      </div>
    </motion.a>
  ))}
</motion.div>
```

- [ ] **Krok 2: Sprawdź i commit**

```bash
npm run dev
# Sprawdź: masonry layout, zdjęcia widoczne, hover animacje
git add src/components/sections/ServicesGrid.tsx
git commit -m "feat: services masonry grid with photo backgrounds and hover animations"
```

---

## Task 7: Dlaczego My — Stat Blocks

**Files:**
- Modify: `src/components/sections/WhyUs.tsx`

- [ ] **Krok 1: Zastąp icon cards stat blockami**

```tsx
const stats = [
  {
    num: '18',
    unit: ' lat',
    label: 'na rynku audytów',
    desc: 'Działamy od 2008 — dłużej niż większość firm w tej branży w Polsce.',
    proof: '↳ Założeni przed obowiązkiem UE',
  },
  {
    num: '400',
    unit: '+',
    label: 'zrealizowanych projektów',
    desc: 'Od małych zakładów po największe korporacje — PGE, Orlen, Shell, KGHM.',
    proof: '↳ Kraków · Warszawa · Wrocław · Łódź',
  },
  {
    num: '30',
    unit: '%',
    label: 'średnia oszczędność',
    desc: 'Tyle średnio oszczędzają nasi klienci na rachunkach po audycie energetycznym.',
    proof: '↳ Zwrot inwestycji w 12–24 mies.',
  },
]

// Layout:
<section className="bg-white border-t border-b border-border">
  <motion.div
    className="grid grid-cols-3"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
  >
    {stats.map((stat, i) => (
      <motion.div
        key={stat.label}
        variants={staggerItem}
        className={`px-14 py-14 ${i < 2 ? 'border-r border-border' : ''}`}
      >
        <p className="font-display text-[80px] font-normal text-ink leading-none tracking-[-0.03em] mb-2.5">
          {stat.num}<em className="not-italic text-green text-[56px]">{stat.unit}</em>
        </p>
        <p className="text-[15px] font-semibold text-ink mb-2">{stat.label}</p>
        <p className="text-[13px] text-muted leading-relaxed">{stat.desc}</p>
        <p className="mt-3.5 text-xs text-green font-medium">{stat.proof}</p>
      </motion.div>
    ))}
  </motion.div>
</section>
```

- [ ] **Krok 2: Sprawdź i commit**

```bash
npm run dev
# Sprawdź: 3 kolumny z dużymi liczbami, brak ikon
git add src/components/sections/WhyUs.tsx
git commit -m "feat: why us — stat blocks replace icon cards"
```

---

## Task 8: Realizacje — Wyniki na Górze

**Files:**
- Modify: `src/components/sections/CaseStudies.tsx`

- [ ] **Krok 1: Przenieś wynik finansowy na górę karty**

```tsx
<motion.a
  href={`/realizacje/${item.slug}`}
  className="bg-white border border-border rounded-2xl p-9 block transition-all duration-240 hover:border-green hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)]"
  whileHover={{ y: -4 }}
  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
>
  <p className="text-[11px] text-muted uppercase tracking-[0.08em] mb-4">
    {item.category} · {item.location} · {item.year}
  </p>
  <p className="font-display text-[60px] font-normal text-green leading-none tracking-[-0.03em] mb-2">
    {item.result}
  </p>
  <p className="text-[15px] font-semibold text-ink mb-1.5">{item.resultLabel}</p>
  <p className="text-[13px] text-muted leading-relaxed">{item.description}</p>
  <span className="inline-block mt-4 text-xs font-semibold text-green bg-green/10 px-2.5 py-1 rounded-full">
    {item.tag}
  </span>
</motion.a>
```

- [ ] **Krok 2: Sprawdź i commit**

```bash
git add src/components/sections/CaseStudies.tsx
git commit -m "feat: case studies — financial result prominent at top of card"
```

---

## Task 9: Opinia — Full-Width Pull Quote

**Files:**
- Modify: `src/components/sections/Testimonials.tsx`

- [ ] **Krok 1: Przepisz na single full-width quote**

```tsx
<section className="bg-green-dark py-24 px-20 text-center relative overflow-hidden">
  {/* Subtelna poświata */}
  <div className="absolute inset-0 bg-radial-[ellipse_60%_60%_at_50%_50%] from-green/6 to-transparent" />

  <motion.p
    className="font-display text-[100px] text-green opacity-20 leading-[0.7] mb-9 relative z-10"
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
  >
    "
  </motion.p>

  <motion.blockquote
    className="font-display text-[clamp(26px,3.5vw,46px)] font-normal italic text-white leading-[1.35] tracking-[-0.02em] max-w-4xl mx-auto relative z-10"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
  >
    Dzięki audytowi GS Energia obniżyliśmy rachunki o{' '}
    <em className="not-italic text-green">340 tys. zł rocznie</em>.
    Zwrot inwestycji nastąpił po 11 miesiącach.
  </motion.blockquote>

  <motion.p
    className="mt-10 text-xs text-white/30 uppercase tracking-[0.1em] relative z-10"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
  >
    JAN KOWALSKI · DYREKTOR TECHNICZNY · ZAKŁADY XYZ SP. Z O.O.
  </motion.p>
</section>
```

- [ ] **Krok 2: Sprawdź i commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat: testimonials — single full-width pull quote on dark bg"
```

---

## Task 10: Footer — Nowy Komponent

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/(site)/layout.tsx` lub `src/app/layout.tsx` — dodaj `<Footer />`

- [ ] **Krok 1: Stwórz Footer.tsx**

```tsx
import Link from 'next/link'

const services = [
  { label: 'Audyt energetyczny', href: '/uslugi/audyt-energetyczny-przedsiebiorstwa' },
  { label: 'Efektywność energetyczna', href: '/uslugi/audyt-efektywnosci-energetycznej' },
  { label: 'EMS / Telemetria', href: '/uslugi/ems-telemetria' },
  { label: 'Banki energii', href: '/uslugi/magazyn-energii' },
  { label: 'Dekarbonizacja', href: '/uslugi/dekarbonizacja' },
]

const company = [
  { label: 'O nas', href: '/o-nas' },
  { label: 'Realizacje', href: '/realizacje' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Cennik', href: '/cennik' },
]

const locations = [
  { label: 'Kraków', href: '/lokalizacje/krakow' },
  { label: 'Warszawa', href: '/lokalizacje/warszawa' },
  { label: 'Wrocław', href: '/lokalizacje/wroclaw' },
  { label: 'Łódź', href: '/lokalizacje/lodz' },
  { label: 'Katowice', href: '/lokalizacje/katowice' },
]

export function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-10 px-20">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-white/7">
        <div>
          <p className="font-display text-2xl italic text-white mb-4">GS Energia</p>
          <p className="text-[13px] text-white/30 leading-[1.75]">
            Audyty energetyczne dla przemysłu i budynków od 2008 roku.<br /><br />
            📍 Kraków · Warszawa · Wrocław · Łódź · Katowice<br /><br />
            Odpowiadamy w ciągu 24h.
          </p>
        </div>

        {[
          { heading: 'Usługi', links: services },
          { heading: 'Firma', links: company },
          { heading: 'Lokalizacje', links: locations },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-green mb-4">{heading}</p>
            <nav className="flex flex-col gap-2.5">
              {links.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[13px] text-white/38 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="pt-7 flex justify-between items-center text-[12px] text-white/17">
        <span>© 2008–{new Date().getFullYear()} GS Energia Sp. z o.o. Wszelkie prawa zastrzeżone.</span>
        <span className="flex gap-4">
          <Link href="/polityka-prywatnosci" className="hover:text-white/40 transition-colors">Polityka prywatności</Link>
          <span>·</span>
          <Link href="/polityka-prywatnosci" className="hover:text-white/40 transition-colors">RODO</Link>
        </span>
      </div>
    </footer>
  )
}
```

- [ ] **Krok 2: Dodaj Footer do layoutu**

W `src/app/(site)/layout.tsx` (lub głównym layout) zaimportuj i dodaj przed `</body>`:

```tsx
import { Footer } from '@/components/Footer'
// ...
<Footer />
```

- [ ] **Krok 3: Sprawdź i commit**

```bash
npm run dev
# Sprawdź footer: 4 kolumny, linki, copyright
git add src/components/Footer.tsx src/app/(site)/layout.tsx
git commit -m "feat: new footer — 4 columns with services, company, locations"
```

---

## Task 11: SEO — Homepage

**Files:**
- Modify: `src/app/(site)/page.tsx`

- [ ] **Krok 1: Zaktualizuj metadata i H1 homepage**

```tsx
// Na górze page.tsx (Server Component):
export const metadata = {
  title: 'Audyt energetyczny — GS Energia | 400+ projektów od 2008',
  description: 'Audyty energetyczne dla przemysłu i budynków. Obniżamy koszty energii o 15–30%. Działamy od 2008, zrealizowaliśmy 400+ projektów. Bezpłatna wycena.',
  openGraph: {
    title: 'Audyt energetyczny — GS Energia',
    description: 'Obniżamy koszty energii o 15–30%. 400+ projektów od 2008.',
  },
}
```

Upewnij się że sekcja hero renderuje `<h1>` widoczne dla crawlerów (nie tylko w JS). Jeśli tekst jest tylko w overlay przez JS, dodaj ukryty `<h1>` dla SEO:

```tsx
<h1 className="sr-only">
  Audyt energetyczny dla przemysłu i budynków — GS Energia
</h1>
```

- [ ] **Krok 2: Commit**

```bash
git add src/app/(site)/page.tsx
git commit -m "seo: homepage meta title, description, sr-only H1"
```

---

## Task 12: SEO — Strony Usług

**Files:**
- Modify: `src/app/(site)/uslugi/[slug]/page.tsx`

- [ ] **Krok 1: Ustaw dynamiczny H1 pattern**

```tsx
// generateMetadata:
export async function generateMetadata({ params }: Props) {
  const usluga = await getUsluga(params.slug)
  return {
    title: `${usluga.title} — GS Energia | Audyt energetyczny`,
    description: usluga.excerpt || `${usluga.title} dla firm i przemysłu. GS Energia — 400+ projektów od 2008.`,
  }
}

// W JSX — pierwszy nagłówek strony:
<h1 className="font-display text-4xl xl:text-6xl italic font-normal text-ink tracking-tight leading-tight">
  {usluga.metaTitle || usluga.title}
</h1>
```

- [ ] **Krok 2: Commit**

```bash
git add src/app/(site)/uslugi/[slug]/page.tsx
git commit -m "seo: service pages — dynamic H1 and meta per service"
```

---

## Task 13: SEO — Lokalizacje + LocalBusiness Schema

**Files:**
- Modify: `src/lib/seo.tsx`
- Modify: `src/app/(site)/lokalizacje/[miasto]/page.tsx`

- [ ] **Krok 1: Dodaj LocalBusiness schema helper**

W `src/lib/seo.tsx` dodaj:

```tsx
export function localBusinessSchema(miasto: string, lat: number, lng: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `GS Energia — Audyt energetyczny ${miasto}`,
    description: `Audyty energetyczne dla firm i budynków w ${miasto}. Działamy od 2008, 400+ projektów.`,
    url: `https://gsenergia.pl/lokalizacje/${miasto.toLowerCase()}`,
    telephone: '+48120000000',
    email: 'biuro@gsenergia.pl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: miasto,
      addressCountry: 'PL',
    },
    geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
    areaServed: miasto,
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-17:00',
  }
}
```

- [ ] **Krok 2: Użyj schema na stronie lokalizacji**

```tsx
// W page.tsx lokalizacji:
const schema = localBusinessSchema(miasto, geoData[miasto].lat, geoData[miasto].lng)

// W JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>

// H1:
<h1>Audyt energetyczny {miasto} — GS Energia</h1>
```

Dane geo dla miast:
```ts
const geoData = {
  krakow:    { lat: 50.0647, lng: 19.9450 },
  warszawa:  { lat: 52.2297, lng: 21.0122 },
  wroclaw:   { lat: 51.1079, lng: 17.0385 },
  lodz:      { lat: 51.7592, lng: 19.4560 },
  katowice:  { lat: 50.2649, lng: 19.0238 },
}
```

- [ ] **Krok 3: Commit**

```bash
git add src/lib/seo.tsx src/app/(site)/lokalizacje/[miasto]/page.tsx
git commit -m "seo: LocalBusiness schema per city + H1 pattern for location pages"
```

---

## Task 14: Sitemap Audit

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Krok 1: Sprawdź czy lokalizacje i usługi są w sitemapie**

Otwórz `src/app/sitemap.ts`. Upewnij się że zawiera:

```ts
// Lokalizacje:
const locationUrls = ['krakow','warszawa','wroclaw','lodz','katowice'].map(miasto => ({
  url: `${baseUrl}/lokalizacje/${miasto}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}))

// Usługi — pobrane dynamicznie z Keystatic:
const serviceUrls = services.map(s => ({
  url: `${baseUrl}/uslugi/${s.slug}`,
  lastModified: new Date(s.date),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))

return [...staticUrls, ...locationUrls, ...serviceUrls, ...postUrls]
```

- [ ] **Krok 2: Zweryfikuj sitemap w przeglądarce**

```bash
npm run dev
# Otwórz: http://localhost:3000/sitemap.xml
# Sprawdź czy widać URL-e dla lokalizacji i usług
```

- [ ] **Krok 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "seo: sitemap includes all location and service pages"
```

---

## Task 15: Final Review + Push

- [ ] **Krok 1: Build test**

```bash
npm run build
# Expected: ✓ Compiled successfully, zero TypeScript errors
```

- [ ] **Krok 2: Lighthouse audit**

Otwórz Chrome DevTools → Lighthouse → Mobile. Sprawdź:
- Performance ≥ 80
- SEO ≥ 95
- Accessibility ≥ 90

- [ ] **Krok 3: Google Rich Results Test**

Otwórz https://search.google.com/test/rich-results
Wklej URL lokalny (przez ngrok lub po deploy na Vercel preview) dla strony lokalizacji.
Expected: LocalBusiness schema poprawna.

- [ ] **Krok 4: Push branch i Vercel Preview**

```bash
git push origin redesign/v2
```

Vercel automatycznie wygeneruje preview URL dla brancha `redesign/v2`. Sprawdź preview URL — wygląd na produkcji.

- [ ] **Krok 5: PR do main (gdy zatwierdzone)**

```bash
gh pr create \
  --title "feat: redesign v2 — premium design + animacje + SEO" \
  --body "Pełny redesign gsenergia.pl sekcja po sekcji. Hero overlay, masonry usług, stat blocks, full-width quote, nowy footer, Framer Motion animations, SEO lokalne i branżowe."
```

---

## Weryfikacja Per Sekcja

| Sekcja | Sprawdź |
|--------|---------|
| Nav | Mixed case, zielony CTA, hover state |
| Hero | Video + overlay z headline, logo w rogu, stats |
| Klienci | Duże kafelki 6col, strzałki działają, hover color |
| Usługi | Masonry 2fr+1fr+1fr, zdjęcia widoczne, strzałka obraca się |
| Dlaczego my | Duże liczby (80px), brak ikon |
| Realizacje | Wynik finansowy na górze karty, hover unosi |
| Opinia | Full-width dark sekcja, jedno mocne quote |
| Footer | 4 kolumny, wszystkie linki działają |
| SEO | View source → H1 widoczne, meta title poprawny |
| Schema | Rich Results Test → LocalBusiness ✓ |
