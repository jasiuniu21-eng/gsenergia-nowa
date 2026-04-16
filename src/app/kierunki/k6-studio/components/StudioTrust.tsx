"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * "Zaufali nam" — real client logos from gsenergia.pl archive.
 * Stored in /public/logos/ (git-tracked, not .gitignored like /public/media/).
 */
const LOGOS = [
  { src: "/logos/pge.png", alt: "PGE Energia Odnawialna", width: 180, height: 72 },
  { src: "/logos/bsh.jpg", alt: "BSH Bosch und Siemens Hausgeräte", width: 180, height: 52 },
  { src: "/logos/zf.webp", alt: "ZF Group", width: 120, height: 60 },
  { src: "/logos/pse.png", alt: "PSE — Polskie Sieci Elektroenergetyczne", width: 150, height: 60 },
  { src: "/logos/kv.png", alt: "KV", width: 120, height: 60 },
] as const;

export function StudioTrust() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-24 lg:py-28 border-t" style={{ borderColor: "var(--k6-line)" }}>
      <div className="k6-container">
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="k6-label mb-12">Zaufali nam</p>

          {/* Client logos row — real marks, grayscale + invert for dark mode consistency */}
          <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10 lg:gap-x-20">
            {LOGOS.map((l) => (
              <motion.li
                key={l.src}
                whileHover={{ opacity: 1, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="relative h-12 lg:h-14 flex items-center transition-opacity"
                style={{ opacity: 0.7 }}
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={l.width}
                  height={l.height}
                  className="h-full w-auto object-contain select-none pointer-events-none"
                  style={{
                    filter: "brightness(0) invert(1)",
                    maxWidth: "160px",
                  }}
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
