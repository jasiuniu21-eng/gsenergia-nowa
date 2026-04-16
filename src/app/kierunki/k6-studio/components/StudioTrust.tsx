"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Real client logos pulled from live gsenergia.pl site.
 * 102 logos stored in /public/logos/clients/001.png ... 102.png
 * Split into 2 rows scrolling opposite directions for visual richness.
 */
const TOTAL_LOGOS = 102;
const LOGO_IDS = Array.from({ length: TOTAL_LOGOS }, (_, i) =>
  String(i + 1).padStart(3, "0"),
);
const HALF = Math.ceil(TOTAL_LOGOS / 2);
const ROW_A = LOGO_IDS.slice(0, HALF);
const ROW_B = LOGO_IDS.slice(HALF);

function LogoImg({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-center h-16 lg:h-20 w-[140px] lg:w-[170px] shrink-0 opacity-65 hover:opacity-100 transition-opacity duration-300">
      <Image
        src={`/logos/clients/${id}.png`}
        alt=""
        width={160}
        height={80}
        className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none"
        style={{ filter: "brightness(0) invert(1)" }}
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
          animation: `k6-marquee ${duration}s linear infinite ${direction}`,
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

export function StudioTrust() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-28 border-t overflow-hidden"
      style={{ borderColor: "var(--k6-line)" }}
    >
      <div className="k6-container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="k6-label mb-3">Zaufali nam</p>
          <p className="text-[14px] text-[color:var(--k6-ink-faint)]">
            {TOTAL_LOGOS}+ zakładów produkcyjnych i instytucji w Polsce
          </p>
        </motion.div>
      </div>

      {reduced ? (
        // Static grid fallback for reduced motion
        <div className="k6-container grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center">
          {LOGO_IDS.slice(0, 24).map((id) => (
            <LogoImg key={id} id={id} />
          ))}
        </div>
      ) : (
        <div className="space-y-6 lg:space-y-8">
          <Row ids={ROW_A} duration={85} direction="normal" />
          <Row ids={ROW_B} duration={95} direction="reverse" />
        </div>
      )}

      <style jsx>{`
        @keyframes k6-marquee {
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
