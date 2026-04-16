import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

type Variant = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  mode: string;
  bgHex: string;
  inkHex: string;
  accentHex: string;
  accentName: string;
  displayFontFamily: string;
  displayWeight: number;
  displayItalic?: boolean;
  bodyFontFamily: string;
  caps?: boolean;
  tracking?: string;
  hint: string; // short direction of the H1
};

const VARIANTS: Variant[] = [
  {
    slug: "k1-blueprint",
    code: "K1",
    name: "Engineering Blueprint",
    tagline: "Inżynieria jako estetyka",
    description:
      "Surowa precyzja techniczna. Siatka, typografia jak w raporcie, SVG blueprint instalacji. Dla ludzi, którzy czytają dokumenty.",
    mode: "Light · Cool",
    bgHex: "#f2f3f5",
    inkHex: "#0f1824",
    accentHex: "#2f5d35",
    accentName: "Forest green",
    displayFontFamily: "'Supreme', system-ui, sans-serif",
    displayWeight: 500,
    bodyFontFamily: "'Supreme', system-ui, sans-serif",
    tracking: "-0.02em",
    hint: "DWG · blueprint feel",
  },
  {
    slug: "k2-warm",
    code: "K2",
    name: "Warm Authority",
    tagline: "Premium korporacyjny z duszą",
    description:
      "Ciepły, autorytatywny, editorial. Serif Gambarino + kremowe tło + leśna zieleń. Jak McKinsey dla OZE.",
    mode: "Light · Warm",
    bgHex: "#fbf7ee",
    inkHex: "#1a1410",
    accentHex: "#2a5a3a",
    accentName: "Forest serif accent",
    displayFontFamily: "'Gambarino', Georgia, serif",
    displayWeight: 400,
    displayItalic: true,
    bodyFontFamily: "'General Sans', system-ui, sans-serif",
    tracking: "-0.02em",
    hint: "editorial · magazine",
  },
  {
    slug: "k3-dashboard",
    code: "K3",
    name: "Data Dashboard",
    tagline: "Żyjemy danymi",
    description:
      "Bento grid, animowane wykresy, live-feel. Cabinet Grotesk, dark mode, lime accent. Dla firm, które rządzą się liczbami.",
    mode: "Dark · Data",
    bgHex: "#0e1512",
    inkHex: "#e9f2ea",
    accentHex: "#8fe67a",
    accentName: "Live lime",
    displayFontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
    displayWeight: 700,
    bodyFontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
    tracking: "-0.025em",
    hint: "bento · live metrics",
  },
  {
    slug: "k4-editorial",
    code: "K4",
    name: "Editorial Minimal",
    tagline: "Minimalizm który krzyczy ciszą",
    description:
      "Gigantyczna typografia, zero kart, pusta przestrzeń, jedna zieleń. Jak Muji. Odwaga przez rezygnację.",
    mode: "Light · Editorial",
    bgHex: "#fbfbfa",
    inkHex: "#121210",
    accentHex: "#2e6b3a",
    accentName: "Single green",
    displayFontFamily: "'Gambarino', Georgia, serif",
    displayWeight: 400,
    bodyFontFamily: "'Synonym', 'General Sans', system-ui, sans-serif",
    tracking: "-0.03em",
    hint: "whitespace · giant serif",
  },
  {
    slug: "k5-industrial",
    code: "K5",
    name: "Industrial Premium",
    tagline: "Fabryka w wersji luksusowej",
    description:
      "Stalowe tło, lime jak LED-y na maszynach, copper w detalach, SVG przepływu energii. Porsche Design dla przemysłu.",
    mode: "Dark · Industrial",
    bgHex: "#10161a",
    inkHex: "#e7ece8",
    accentHex: "#b8e34a",
    accentName: "Machinery lime",
    displayFontFamily: "'Clash Display', 'Clash Grotesk', system-ui, sans-serif",
    displayWeight: 600,
    caps: true,
    bodyFontFamily: "'General Sans', system-ui, sans-serif",
    tracking: "0.02em",
    hint: "steel · LED · copper",
  },
  {
    slug: "k6-studio",
    code: "K6",
    name: "Studio",
    tagline: "Editorial premium — czerń, zieleń, liczby",
    description:
      "Wordware-core. Deep black, lime accent, cycling animated headline, editorial serif. Sekcja 'Zaufali nam' z logosami klientów (PGE, BSH, Shell, PAŻP).",
    mode: "Dark · Editorial",
    bgHex: "#0a0a0a",
    inkHex: "#f5f2ea",
    accentHex: "#8fe67a",
    accentName: "Lime studio",
    displayFontFamily: "'Gambarino', Georgia, serif",
    displayWeight: 400,
    displayItalic: true,
    bodyFontFamily: "'General Sans', system-ui, sans-serif",
    tracking: "-0.03em",
    hint: "studio · wordware-core",
  },
];

export default function KierunkiHub() {
  return (
    <div
      className="min-h-[100dvh] bg-[#0b0c10] text-[#ecebe3]"
      style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
    >
      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#0b0c10]/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[18px]" style={{ fontFamily: "'Gambarino', serif" }}>
              GS Energia
            </span>
            <span className="h-4 w-px bg-white/20" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">
              Design Review · 6 kierunków
            </span>
          </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white/95 transition-colors"
          >
            <ArrowLeft size={12} weight="bold" />
            strona główna
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1320px] px-6 sm:px-10 pt-24 lg:pt-32 pb-12">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
          Wybór tożsamości wizualnej
        </p>
        <h1
          className="mt-5 text-[clamp(2.5rem,1rem+6vw,5.5rem)] leading-[0.95] tracking-[-0.025em] max-w-[18ch]"
          style={{ fontFamily: "'Gambarino', serif" }}
        >
          Pięć kierunków.<br />
          <span style={{ fontStyle: "italic", color: "#b8e34a" }}>Jedna strona.</span>
        </h1>
        <p className="mt-7 max-w-[56ch] text-white/65 text-[17px] leading-[1.6]">
          Każdy link to w pełni działająca landing page w innej tożsamości.
          Treść identyczna we wszystkich — zmienia się tylko typografia,
          paleta, układ i ruch. Kliknij, scrolluj, poczuj, który mówi Twoim
          językiem.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4 text-[12px] text-white/50">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block size-[6px] rounded-full bg-[#b8e34a]" />
            Pełne landing pages
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block size-[6px] rounded-full bg-[#7ed957]" />
            Identyczna treść
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block size-[6px] rounded-full bg-[#e5b85a]" />
            Radykalnie różny design
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 sm:px-10 pb-24 grid gap-5 md:gap-6 md:grid-cols-2">
        {VARIANTS.map((v, i) => (
          <VariantCard key={v.slug} v={v} index={i} />
        ))}
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10 py-10 flex flex-wrap gap-4 items-center justify-between text-[11.5px] text-white/45">
          <span>© 2008–2026 GS Energia · Design Review</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            5 propozycji · 1 produkt
          </span>
        </div>
      </footer>
    </div>
  );
}

function VariantCard({ v, index }: { v: Variant; index: number }) {
  const isDark = v.code === "K3" || v.code === "K5" || v.code === "K6";
  const subtle = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
  const subtleLine = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const mutedInk = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";

  return (
    <Link
      href={`/kierunki/${v.slug}`}
      className="group relative block rounded-[28px] overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8e34a]/60"
      style={{ background: v.bgHex, color: v.inkHex, minHeight: 520 }}
    >
      {/* Subtle gradient & grid per-card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(1000px 600px at ${
            index % 2 === 0 ? "85% 0%" : "15% 0%"
          }, ${v.accentHex}1a, transparent 55%)`,
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ color: v.accentHex, opacity: 0.07 }}
      >
        <defs>
          <pattern
            id={`gp-${v.slug}`}
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gp-${v.slug})`} />
      </svg>

      {/* Top meta bar */}
      <div className="relative flex items-center justify-between px-7 pt-6">
        <span
          className="text-[10.5px] uppercase tracking-[0.22em] font-medium"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: mutedInk,
          }}
        >
          {v.code} · {v.mode}
        </span>
        <span
          className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.18em]"
          style={{ color: v.accentHex, fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span
            className="inline-block size-[7px] rounded-full"
            style={{
              background: v.accentHex,
              boxShadow: `0 0 0 4px ${v.accentHex}22`,
            }}
          />
          {v.accentName}
        </span>
      </div>

      {/* Middle preview — real H1 font in accent color */}
      <div className="relative px-7 pt-10 lg:pt-16">
        <p
          className="text-[10.5px] uppercase tracking-[0.2em]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: mutedInk,
          }}
        >
          Preview · H1
        </p>
        <div
          className="mt-6"
          style={{
            fontFamily: v.displayFontFamily,
            fontWeight: v.displayWeight,
            fontStyle: v.displayItalic ? "italic" : "normal",
            letterSpacing: v.tracking,
            textTransform: v.caps ? "uppercase" : "none",
            lineHeight: 0.95,
          }}
        >
          <span className="text-[clamp(2rem,1.3rem+2.8vw,3.25rem)] block">
            Audyt, po którym
          </span>
          <span
            className="text-[clamp(2rem,1.3rem+2.8vw,3.25rem)] block"
            style={{
              color: v.accentHex,
              fontStyle:
                v.code === "K2" || v.code === "K4" ? "italic" : undefined,
            }}
          >
            realnie{" "}
          </span>
          <span className="text-[clamp(2rem,1.3rem+2.8vw,3.25rem)] block">
            spada rachunek.
          </span>
        </div>
      </div>

      {/* Decorative hint per direction */}
      <DirectionDecor variant={v} />

      {/* Bottom copy */}
      <div
        className="absolute left-7 right-7 bottom-7 pt-6 border-t"
        style={{ borderColor: subtleLine }}
      >
        <p
          className="text-[10.5px] uppercase tracking-[0.2em] mb-2"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: v.accentHex,
          }}
        >
          {v.tagline}
        </p>
        <div className="flex items-end justify-between gap-6">
          <h2
            className="text-[1.65rem] leading-[1.05] tracking-[-0.01em]"
            style={{
              fontFamily: v.displayFontFamily,
              fontWeight: v.displayWeight,
              fontStyle: v.displayItalic ? "italic" : "normal",
            }}
          >
            {v.name}
          </h2>
          <span
            className="inline-flex items-center gap-1.5 text-[12px] font-medium shrink-0 group-hover:gap-2.5 transition-all"
            style={{ color: v.accentHex }}
          >
            Zobacz
            <ArrowUpRight size={14} weight="bold" />
          </span>
        </div>
        <p
          className="mt-3 text-[13px] leading-[1.5] max-w-[44ch]"
          style={{ color: mutedInk }}
        >
          {v.description}
        </p>
      </div>

      <span className="sr-only">Kierunek {index + 1} z 5</span>
    </Link>
  );
}

/**
 * Small decorative widget showing the signature element of each direction.
 * Positioned top-right of the preview area, below the meta bar.
 */
function DirectionDecor({ variant: v }: { variant: Variant }) {
  const isDark = v.code === "K3" || v.code === "K5" || v.code === "K6";
  if (v.code === "K1") {
    // Blueprint mini-schematic
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 160 80"
        className="absolute top-[58px] right-6 w-[160px] h-[80px] pointer-events-none"
        style={{ color: v.inkHex, opacity: 0.7 }}
      >
        <path
          d="M 10 20 L 60 20 L 60 60 L 150 60"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <rect x="5" y="15" width="10" height="10" stroke={v.accentHex} fill="none" strokeWidth="1" />
        <rect x="55" y="55" width="10" height="10" stroke={v.accentHex} fill="none" strokeWidth="1" />
        <rect x="145" y="55" width="10" height="10" stroke={v.accentHex} fill="none" strokeWidth="1" />
        <text x="10" y="12" fontSize="6" fontFamily="JetBrains Mono" fill="currentColor" opacity="0.7">
          GRID
        </text>
        <text x="60" y="75" fontSize="6" fontFamily="JetBrains Mono" fill={v.accentHex}>
          BUS
        </text>
      </svg>
    );
  }
  if (v.code === "K2") {
    // Warm — underscore curl
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 160 40"
        className="absolute top-[68px] right-6 w-[160px] h-[40px] pointer-events-none"
        style={{ color: v.accentHex }}
      >
        <path
          d="M 4 20 C 40 8, 80 32, 120 12 S 156 20, 156 20"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (v.code === "K3") {
    // Sparkline + bars hint
    return (
      <div className="absolute top-[58px] right-6 flex flex-col gap-2 w-[160px] pointer-events-none">
        <svg viewBox="0 0 160 40" className="w-full h-[40px]" preserveAspectRatio="none">
          <path
            d="M0 30 L20 24 L40 28 L60 18 L80 22 L100 14 L120 20 L140 8 L160 12"
            fill="none"
            stroke={v.accentHex}
            strokeWidth="1.5"
          />
        </svg>
        <div className="flex gap-1.5">
          {[0.6, 0.8, 0.45, 0.75].map((w, i) => (
            <div key={i} className="flex-1 h-[6px] rounded-sm" style={{ background: isDark ? "#ffffff12" : "#00000012" }}>
              <div className="h-full rounded-sm" style={{ width: `${w * 100}%`, background: v.accentHex }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (v.code === "K4") {
    // Massive minus
    return (
      <div
        aria-hidden="true"
        className="absolute top-[56px] right-6 w-[180px] text-right pointer-events-none"
      >
        <div
          style={{
            fontFamily: v.displayFontFamily,
            color: v.accentHex,
            fontSize: "3.5rem",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          −26.8
          <span style={{ fontSize: "0.45em", verticalAlign: "super" }}>%</span>
        </div>
        <p
          className="mt-1 text-[9.5px] uppercase tracking-[0.2em]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: v.inkHex,
            opacity: 0.5,
          }}
        >
          case · 087
        </p>
      </div>
    );
  }
  // K5
  return (
    <div className="absolute top-[58px] right-6 w-[200px] pointer-events-none">
      <svg viewBox="0 0 200 80" className="w-full h-[80px]">
        <line x1="0" y1="20" x2="180" y2="20" stroke="#ffffff25" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="0" y1="60" x2="180" y2="60" stroke="#ffffff25" strokeWidth="1" strokeDasharray="3 6" />
        <path d="M 10 20 L 180 20 L 180 60 L 30 60" stroke="#ffffff40" strokeWidth="1.5" fill="none" />
        <path d="M 10 20 L 180 20 L 180 60 L 30 60" stroke={v.accentHex} strokeWidth="1.5" strokeDasharray="18 220" fill="none" />
        {[10, 100, 180, 30].map((x, i) => {
          const y = i < 2 ? 20 : 60;
          return (
            <g key={`${x}-${y}`}>
              <rect x={x - 3} y={y - 3} width="6" height="6" fill="#0b0c10" stroke={v.accentHex} strokeWidth="1" />
              <circle cx={x} cy={y} r="1.2" fill={v.accentHex} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
