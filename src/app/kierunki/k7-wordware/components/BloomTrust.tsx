"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Real client logos pulled from live gsenergia.pl site.
 * 102 logos stored in /public/logos/clients/001.png ... 102.png
 * Split into 2 rows scrolling opposite directions for visual richness.
 */
// Bad IDs filtered out (corrupted downloads); 94 real logos
const MISSING = new Set(["074", "075", "076", "077", "078", "079", "094", "098"]);
const LOGO_IDS = Array.from({ length: 102 }, (_, i) =>
  String(i + 1).padStart(3, "0"),
).filter((id) => !MISSING.has(id));
const TOTAL_LOGOS = LOGO_IDS.length;
const HALF = Math.ceil(TOTAL_LOGOS / 2);
const ROW_A = LOGO_IDS.slice(0, HALF);
const ROW_B = LOGO_IDS.slice(HALF);

function LogoImg({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-center h-16 lg:h-20 w-[140px] lg:w-[170px] shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300">
      <Image
        src={`/logos/clients/${id}.png`}
        alt=""
        width={160}
        height={80}
        className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none"
        style={{ filter: "grayscale(1) contrast(1)" }}
      />
    </div>
  );
}

function Row({
  ids,
  duration,
  direction = "normal",
}: {
  ids: string[];
  duration: number;
  direction?: "normal" | "reverse";
}) {
  return (
    <div
      className="relative"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        className="flex items-center gap-10 lg:gap-14 w-max"
        style={{
          animation: `k7-marquee ${duration}s linear infinite ${direction}`,
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...ids, ...ids].map((id, i) => (
          <LogoImg key={`${id}-${i}`} id={id} />
        ))}
      </div>
    </div>
  );
}

export function BloomTrust() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: "var(--k7-cream)",
        color: "var(--k7-cream-ink)",
      }}
    >
      {/* Soft accent glow on cream */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 w-[600px] h-[400px] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.88 0.22 140 / 0.5), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="k7-container relative">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="k7-mono text-[11px] tracking-[0.22em] mb-6 uppercase font-semibold"
            style={{ color: "var(--k7-accent-dim)" }}
          >
            // Zaufali nam
          </p>
          <h2
            className="k7-display text-[clamp(2rem,1rem+3vw,3.75rem)] leading-[1.02] max-w-[18ch] mx-auto"
            style={{ color: "var(--k7-cream-ink)" }}
          >
            <em className="italic" style={{ color: "var(--k7-accent-dim)" }}>
              {TOTAL_LOGOS}+
            </em>{" "}
            zakładów, instytucji i marek w Polsce.
          </h2>
        </motion.div>
      </div>

      {reduced ? (
        // Static grid fallback for reduced motion
        <div className="k7-container grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center">
          {LOGO_IDS.slice(0, 24).map((id) => (
            <LogoImg key={id} id={id} />
          ))}
        </div>
      ) : (
        <div className="space-y-6 lg:space-y-8">
          <Row ids={ROW_A} duration={180} direction="normal" />
          <Row ids={ROW_B} duration={200} direction="reverse" />
        </div>
      )}

      <style jsx>{`
        @keyframes k7-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
