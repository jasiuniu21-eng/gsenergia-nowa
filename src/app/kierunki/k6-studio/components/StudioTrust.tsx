"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type LogoItem =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | {
      kind: "text";
      label: string;
      style: React.CSSProperties;
    };

/**
 * "Zaufali nam" — marquee z prawdziwymi logo + wordmarkami dla brandów,
 * których pliki logo nie znaleźliśmy w archiwum (ale są w PDFach referencyjnych).
 */
const LOGOS: LogoItem[] = [
  { kind: "image", src: "/logos/pge.png", alt: "PGE Energia Odnawialna", width: 180, height: 60 },
  {
    kind: "text",
    label: "KGHM ZANAM",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 800,
      fontSize: "22px",
      letterSpacing: "0.04em",
    },
  },
  { kind: "image", src: "/logos/bsh.jpg", alt: "BSH Bosch", width: 180, height: 48 },
  {
    kind: "text",
    label: "TAURON",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 700,
      fontSize: "24px",
      letterSpacing: "-0.01em",
    },
  },
  { kind: "image", src: "/logos/zf.webp", alt: "ZF Group", width: 120, height: 56 },
  {
    kind: "text",
    label: "Saint-Gobain",
    style: {
      fontFamily: "'Gambarino', serif",
      fontWeight: 400,
      fontSize: "26px",
      letterSpacing: "-0.02em",
    },
  },
  { kind: "image", src: "/logos/pse.png", alt: "PSE", width: 150, height: 56 },
  {
    kind: "text",
    label: "TEVA",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 800,
      fontSize: "28px",
      letterSpacing: "0.02em",
    },
  },
  { kind: "image", src: "/logos/kv.png", alt: "KV", width: 120, height: 56 },
  {
    kind: "text",
    label: "Shell Polska",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 700,
      fontStretch: "condensed",
      fontSize: "22px",
      letterSpacing: "0.03em",
    },
  },
  {
    kind: "text",
    label: "Polsat TV",
    style: {
      fontFamily: "'Gambarino', serif",
      fontStyle: "italic",
      fontSize: "26px",
      letterSpacing: "-0.01em",
    },
  },
  {
    kind: "text",
    label: "MTP Poznań",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 600,
      fontSize: "15px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
    },
  },
  {
    kind: "text",
    label: "Fujitsu",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 300,
      fontSize: "28px",
      letterSpacing: "-0.02em",
    },
  },
  {
    kind: "text",
    label: "Polmlek",
    style: {
      fontFamily: "'Gambarino', serif",
      fontWeight: 400,
      fontSize: "24px",
    },
  },
  {
    kind: "text",
    label: "BOŚ Bank",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 700,
      fontSize: "22px",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
  },
  {
    kind: "text",
    label: "Budimex",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 800,
      fontSize: "24px",
      fontStyle: "italic",
    },
  },
  {
    kind: "text",
    label: "PAŻP",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 600,
      fontSize: "16px",
      letterSpacing: "0.28em",
      textTransform: "uppercase",
    },
  },
  {
    kind: "text",
    label: "Energa",
    style: {
      fontFamily: "'Gambarino', serif",
      fontWeight: 400,
      fontSize: "26px",
      letterSpacing: "-0.02em",
    },
  },
];

function LogoEl({ item }: { item: LogoItem }) {
  if (item.kind === "image") {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        className="h-10 lg:h-12 w-auto object-contain select-none pointer-events-none"
        style={{
          filter: "brightness(0) invert(1)",
          maxWidth: "170px",
        }}
      />
    );
  }
  return (
    <span
      className="select-none whitespace-nowrap"
      style={{ ...item.style, color: "var(--k6-ink)" }}
    >
      {item.label}
    </span>
  );
}

export function StudioTrust() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-24 lg:py-28 border-t overflow-hidden" style={{ borderColor: "var(--k6-line)" }}>
      <div className="k6-container">
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="k6-label text-center mb-14"
        >
          Zaufali nam
        </motion.p>
      </div>

      {/* Marquee — infinite scroll */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center gap-14 lg:gap-20 w-max"
          style={{
            animation: reduced ? "none" : "k6-marquee 60s linear infinite",
          }}
        >
          {/* Duplicate the list 2x for seamless loop */}
          {[...LOGOS, ...LOGOS].map((item, i) => (
            <div
              key={i}
              className="flex items-center h-14 opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "var(--k6-ink-muted)" }}
            >
              <LogoEl item={item} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes k6-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
