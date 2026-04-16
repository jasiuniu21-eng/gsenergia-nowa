"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * "Zaufali nam" — typographic wordmarks (no image files).
 * Each rendered as styled text to feel like an actual logo.
 */
const WORDMARKS = [
  {
    label: "PGE Energia",
    className: "k6-wm-pge",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase" as const,
      fontSize: "15px",
    },
  },
  {
    label: "BSH Bosch",
    className: "k6-wm-bsh",
    style: {
      fontFamily: "'Gambarino', serif",
      fontStyle: "italic" as const,
      fontWeight: 400,
      fontSize: "22px",
      letterSpacing: "-0.01em",
    },
  },
  {
    label: "Shell Polska",
    className: "k6-wm-shell",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 800,
      fontStretch: "condensed",
      fontSize: "17px",
      letterSpacing: "0.01em",
    },
  },
  {
    label: "PAŻP",
    className: "k6-wm-pazp",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 600,
      textTransform: "uppercase" as const,
      fontSize: "14px",
      letterSpacing: "0.25em",
    },
  },
  {
    label: "ZF Group",
    className: "k6-wm-zf",
    style: {
      fontFamily: "'General Sans', sans-serif",
      fontWeight: 300,
      fontSize: "18px",
      letterSpacing: "0.08em",
    },
  },
  {
    label: "Energa",
    className: "k6-wm-energa",
    style: {
      fontFamily: "'Gambarino', serif",
      fontWeight: 400,
      fontSize: "20px",
      letterSpacing: "-0.02em",
    },
  },
];

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

          {/* Wordmarks row — larger gap, centered, more breathing room */}
          <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 lg:gap-x-20">
            {WORDMARKS.map((wm) => (
              <motion.li
                key={wm.label}
                whileHover={{ opacity: 1 }}
                className="transition-opacity cursor-default select-none"
                style={{
                  ...wm.style,
                  color: "var(--k6-ink)",
                  opacity: 0.55,
                }}
              >
                {wm.label}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
