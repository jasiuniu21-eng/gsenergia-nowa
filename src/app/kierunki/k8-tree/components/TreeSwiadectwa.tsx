"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Drugoplanowa sekcja B2C — świadectwa energetyczne dla domów.
 * GS jest głównie B2B, ale świadectwa dla indywidualnych klientów też robi.
 * Niższa intensywność wizualna niż sekcja B2B — pokazuje że to oferta dodatkowa.
 */
export function TreeSwiadectwa() {
  const reduced = useReducedMotion();

  return (
    <section
      id="swiadectwa"
      className="relative py-24 lg:py-32 border-t"
      style={{ borderColor: "var(--k8-line)" }}
    >
      <div className="k8-container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center"
        >
          <div>
            <p
              className="k8-mono text-[11px] tracking-[0.18em] uppercase mb-4"
              style={{ color: "var(--k8-accent)" }}
            >
              // Dla klientów indywidualnych
            </p>
            <h2 className="k8-display text-[clamp(1.75rem,1rem+2vw,3rem)] leading-[1.1] max-w-[22ch]">
              Świadectwa energetyczne dla domów i mieszkań.
            </h2>
            <p className="mt-5 text-[15px] lg:text-[16px] text-[color:var(--k8-ink-muted)] leading-[1.55] max-w-[60ch]">
              Sprzedajesz dom? Wynajmujesz mieszkanie? Dom energooszczędny?
              Przygotowujemy świadectwa charakterystyki energetycznej (ŚCHE)
              w 48 h od wizyty — dla Krakowa, Małopolski i okolic.
            </p>
          </div>

          <a
            href="#kontakt"
            className="group inline-flex items-center gap-3 self-start lg:self-auto h-[52px] px-7 rounded-full border text-[14px] font-medium transition-colors hover:text-[color:var(--k8-accent)]"
            style={{
              borderColor: "var(--k8-line-strong)",
              color: "var(--k8-ink)",
            }}
          >
            Zamów świadectwo
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
              style={{ color: "var(--k8-accent)" }}
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
