# GS Energia — Mapa inspiracji redesignu

Dokument mówi **co skąd pochodzi** — każdy element interfejsu jest zmapowany na źródło referencyjne (zatwierdzone przez zarząd: Grzegorz Sokołowski, Joanna, Iwona) oraz na regułę z użytego skilla `ui-ux-pro-max`.

Wszystkie zmiany zostały wdrożone w projekcie `Gsenergia-nowa/gsenergia/` (Next.js 16 + Tailwind 4 + framer-motion 12).

---

## Referencje źródłowe

| Nr | Referencja | URL | Co bierzemy |
|----|-----------|-----|-------------|
| R1 | **Columbus Energy** | columbusenergy.pl/rachunek-za-0-zl/ | Split-hero 50/50 (tekst lewo + obraz prawo), pływająca karta value-prop, mega-menu w jednej kolumnie (Audyt / Usługi), phone jako drugi CTA |
| R2 | **DEKRA Polska** | dekra.pl/pl/home/ | Mega-menu z dynamicznym prawym panelem (budowanie pod hasłem głównym), live-search pogrupowany (Usługi / Blog / Realizacje), struktura nawigacji |
| R3 | **KPT Kraków / Jak pomagamy** | kpt.krakow.pl/zwolnienie-podatkowe/jak-pomagamy/ | Narracja procesu krok po kroku, jasny oddech sekcji, czysta editorial typografia |
| R4 | **wordware.ai** | wordware.ai | Kinowy "budujący się" efekt pod hasłem głównym (wersja premium — nie prymitywna sieć węzłów) |
| R5 | **Zeronest** | zeronest.pl | Jasne tło, rytm sekcji, typografia — baseline estetyki |

## Reguły zastosowane przez skille

| Skill | Kluczowe zasady zastosowane |
|-------|-----------------------------|
| `superpowers:redesign-existing-projects` | Anti-generic: brak AI-gradient purple/pink, tinted shadows, spring easing, semantic HTML, tabular nums dla liczb, grain overlay, focus rings, prefers-reduced-motion |
| `ui-ux-pro-max` (Enterprise Gateway pattern) | Path-selection "I am a..." (industry pills), Trust & Authority style, prominentne client logos, ISO/credential badges, metric pulse animation, sections flow Hero → Solutions → Logos → Contact |

---

## Mapa: element → inspiracja

### Header / Nav (`src/components/layout/Nav.tsx`, `Logo.tsx`)

| Element | Inspiracja | Dlaczego |
|---------|-----------|----------|
| Glass-morphic dark header (blur-xl + `oklch(0.12 0.02 150/0.45)` bg) | DEKRA (R2) + decyzja szefa (ciemne kolory) | Na ciemnym tle brand-lime logo maksymalnie kontrastuje; zarząd preferuje ciemne kolory |
| Logo duże (h-[92px]) bez chipa | Decyzja Joanna/Iwona ("logo musi pasować do strony, nie ma tła") | PNG z przezroczystym bg, drzewko lime pops na dark bg samo |
| Kolor brand primary `#8DC73F` (OKLCH) | Logo GS Energia (R0) | Vivid lime, chroma 0.20, nasycone — dokładnie jak print mark |
| Dwa rozdzielone hasła w menu: **Audyt** / **Usługi** | Decyzja Joanna+Iwona (16.04.2026) | Audyt = chłodniczy, wodorowy, przedsiębiorstwa; Usługi = EMS, BESS, dekarbonizacja, reszta |
| Mega-menu rozwijane jako pojedyncza kolumna | Columbus Energy (R1) | Jedna kolumna z listą, prawa strona dynamicznie opis+CTA+miniatura |
| Prawa strona mega-menu: dynamiczny preview po hoverze | DEKRA (R2) | "Budowanie pod hasłem głównym" — prawa strona zmienia się w zależności od hover'a na kategorii |
| Font-medium na linkach + text-white | Anti-generic / `ui-ux-pro-max` rule *Layout & Responsive → readable-font-size* | Wymagane 4.5:1 contrast na dark |
| CTA "Bezpłatna konsultacja" lime (`brand-500`) | Columbus Energy (R1) + Trust & Authority (`ui-ux-pro-max`) | Primary CTA w kolorze brand, z shadow-glow żeby wibrował |

### Hero (`src/components/sections/Hero.tsx`)

| Element | Inspiracja | Dlaczego |
|---------|-----------|----------|
| Split 50/50 (tekst lewo + zdjęcie prawo w zaokrąglonej karcie) | Columbus Energy (R1) | Klasyczny conversion-first layout "Hero + Features + CTA" |
| Ciemne tło `oklch(0.15 0.03 148)` gradient → `oklch(0.10 0.02 150)` | Decyzja szefa + `ui-ux-pro-max` style *Dark Mode (OLED)* | Głębokie charcoal/olive z lekkim zielonym tintem — luksusowy industrial premium |
| Lime glow top-right + bottom-left (blur-160px, opacity 0.6/0.5) | Enterprise Gateway color strategy (`ui-ux-pro-max`) | Editorial industrial ambient — nie flat dark, ale z życiem |
| Subtelna zielona siatka 48×48px z radial-mask | wordware.ai (R4) + anti-generic (nie flat design) | "Editorial industrial grid" — wywołuje skojarzenie z CAD/plan/blueprint bez bycia dosłownym |
| H1 serif Gambarino display-xl + lime accent na "15–30%" | KPT Kraków (R3) + Zeronest (R5) | Editorial serif dla autorytetu i ciepła — Trust & Authority |
| Animowany podkreślnik pod "15–30%" (framer-motion, 900ms delay 700ms) | wordware.ai (R4) | "Budowanie pod hasłem" w premium wykonaniu |
| Pulse-animation na `−22%` w metric card | `ui-ux-pro-max` key-effect *metric pulse animations* (Trust & Authority) | Subtelny heartbeat przyciąga wzrok do kluczowej liczby |
| Industry path-selector (pigułki: Produkcja / Chłodnictwo / Wodór / Chemia) | `ui-ux-pro-max` Enterprise Gateway rule *Path selection (I am a...)* | B2B quick-entry przez persona — prospect od razu wchodzi na swoją usługę |
| ISO 50001 badge (brand-500/15 glow chip) | `ui-ux-pro-max` Trust & Authority *Certificates/badges displayed* | Credential visibility obowiązkowa dla B2B industrial |
| Pływająca karta metryki "−22% zużycia energii" | Columbus Energy (R1) value-prop card | Pojedynczy zdyscyplinowany dowód zamiast sieci węzłów (poprzednie wersje K7/K8/K11 odrzucone) |
| Zdjęcie 4K hali przemysłowej w zaokrąglonym card | Decyzja szefa ("ostre zdjęcie 4K i na tym się buduje cyfrowo") | Źródło: wygenerowane w Higgsfield Flux 2 Max (prompt: editorial industrial photography) |
| Grain overlay 6% mix-blend-overlay | `superpowers:redesign` *Flat design z zero texture → add subtle noise* | Anti-generic — przełamuje sterilny dark |
| CTA primary lime + phone jako secondary z backdrop-blur | Columbus Energy (R1) | Phone dostępny od razu = pro conversion |

### ClientsWall (`src/components/sections/ClientsWall.tsx`)

| Element | Inspiracja | Dlaczego |
|---------|-----------|----------|
| Ciemne oliwkowe tło `oklch(0.22 0.06 148)` → `oklch(0.17 0.05 150)` | Decyzja szefa + `ui-ux-pro-max` Enterprise Gateway sections *4. Client Logos* | Rytm jasne→ciemne między hero i kolejnymi sekcjami |
| Eyebrow "ZAUFALI NAM" w brand-400 + mono uppercase tracking-[0.26em] | DEKRA (R2) + KPT (R3) editorial eyebrow convention | Mikro-typografia sygnalizująca sekcję dowodu |
| H2 serif: "400+ zakładów, 18 lat obecności w polskim przemyśle" | Decyzja Joanna ("nasza sekcja zaufali nam jest mega mocna, musi być") | Mega social proof jako centralny hook |
| 5 flagowych logów klientów (PGE, BSH, ZF, KV, PSE) w białych kartach | Enterprise Gateway *logo carousel + client logos prominent* | Najmocniejsze marki widoczne jako autorytet |
| Infinite-scroll marquee z 94 logami z `public/logos/clients/` | `ui-ux-pro-max` *smooth stat reveal* + DEKRA carousel | Skala klientów wybija się wizualnie — 94 loga robi wrażenie |
| Edge-fade masks na marquee | Anti-generic — nie "klasyczny scroller z kropkami" | Premium touch, hidden orientation markers |
| Brand-500 glow top-center (400×900 blur-140) | Jak w hero — spójność ambient | Nitka czerwona / "brand light" przez całą stronę |
| Grain overlay 6% mix-blend-overlay | `superpowers:redesign` rule | Anti-flat |

### Design tokens (`src/design/tokens.css`)

| Element | Inspiracja |
|---------|-----------|
| Brand palette OKLCH 130° hue, chroma 0.20 primary | Logo GS Energia (R0) — pomiar z print mark |
| Ink neutrals tinted toward brand (chroma 0.006–0.014) | `superpowers:redesign` *Mixing warm/cool grays — stick to one gray family* |
| Fluid typography z `clamp()` dla display | `ui-ux-pro-max` Typography & Color rules |
| Spring easing tokens (cubic-bezier premium) | `superpowers:redesign` *Replace linear easing with spring-based motion* |

---

## Anty-wzorce (czego NIE robimy — i dlaczego)

| Odrzucone | Powód |
|-----------|-------|
| Sci-fi SVG network / Sankey diagram | Szef (19.04.2026): "Efekt zbyt prymitywny tego przepływu" — wersja k11-static odrzucona |
| Abstrakcyjne drzewo jak wordware.ai 1:1 | Szef: "nie może być prymitywne, musi być super efekt" — kopiowanie konkurenta == tani look |
| AI purple/pink gradient | `superpowers:redesign` red-flag *most common AI design fingerprint* |
| Trzy-kolumnowe karty "feature row" | `superpowers:redesign` *most generic AI layout* — zastąpione asymmetric split |
| Chip / dark patch pod logo | Feedback Joanna: "logo musi pasować do strony, nie że dajesz mu tło" |
| Wszystko białe | Feedback Joanna: "szef lubi ciemne kolory, zostawmy biały w spokoju" |
| Wszystko ciemne bez kontrastu | `superpowers:redesign` *Glass card light mode: use bg-white/80+* — kluczowe elementy (metric card, client logos) zostają jasne |
| Lorem ipsum, "John Doe", "Acme Corp" | `superpowers:redesign` rule — używamy prawdziwych klientów (PGE, BSH, ZF, KV, PSE) i realnych metryk |
| Ikony-emoji | `ui-ux-pro-max` *no-emoji-icons* — używamy Phosphor Icons (Factory, Snowflake, Drop, Flask, ShieldCheck, Phone, ArrowRight) |

---

## Framework 5 pytań klienta (copy)

Nadrzędna zasada pisania tekstów — zapisana w memory `gse_messaging_framework.md`. Każda sekcja, podstrona i artykuł prowadzi klienta przez:

1. **Czy potrzebuję?** (problem/ból) — Hero H1
2. **Czy stać mnie / warto?** (ROI) — Metric card "−22%"
3. **Dlaczego teraz?** (pilność) — sekcja "Dlaczego teraz" (wdrożenie planowane)
4. **Dlaczego GS Energia?** (przewaga) — "400+ zakładów, 18 lat"
5. **Za co płacę, czy można ufać?** (transparency) — ClientsWall + case studies

**Źródło:** Joanna (16–20.04.2026): *"Musi być kierowane z perspektywy potrzeb klienta. Jak wszystko jest na GSE to mamy klientа."*

---

## Co jeszcze wdrożymy (roadmapa sesji 2+)

| Sekcja | Referencja | Stan |
|--------|-----------|------|
| Mega-menu Audyt / Usługi z dynamicznym preview | Columbus (R1) + DEKRA (R2) | 🔧 Next |
| Sekcja "Jak pomagamy" (proces 4-krokowy) | KPT Kraków (R3) | 🔧 Next |
| Sekcja "Dlaczego teraz" (regulacje / pilność) | Framework 5 pytań #3 | 🔧 Next |
| Sekcja realizacji z metrykami | `ui-ux-pro-max` Trust & Authority | 🔧 Next |
| Live-search ⌘K (Pagefind, pogrupowany) | DEKRA (R2) | 🔧 Next |
| Microsoft Clarity + GA4 + GTM | Joanna (SEO plan 20.04) | 🔧 Next |
| Location pages (10 × usługa) | `SEO-DOKUMENTACJA-2.0.md` | 🔧 Faza 2 |

---

## Pliki projektu

- Hero: `src/components/sections/Hero.tsx`
- ClientsWall: `src/components/sections/ClientsWall.tsx`
- Nav + Logo: `src/components/layout/Nav.tsx`, `Logo.tsx`
- Design tokens: `src/design/tokens.css`
- Design system MASTER: `design-system/gs-energia/MASTER.md` (wygenerowany przez `ui-ux-pro-max`)
- Zdjęcia hero (Higgsfield): `public/media/hero/`, `design/zdjecia/ai/`
- Logo PNG: `public/logos/gs-energia-mark.png`
- Plan redesignu: `~/.claude/plans/https-columbusenergy-pl-rachunek-za-0-zl-eager-peach.md`
- Framework copy: `~/.claude/projects/-Users-joanna-Desktop-Gsenergia-nowa/memory/gse_messaging_framework.md`
