"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const CARDS = [
  {
    kicker: "Krok 1",
    price: "0 zł",
    priceSub: "konsultacja",
    title: "Bezpłatna wizja lokalna",
    desc:
      "Przyjeżdżamy, oglądamy zakład, zbieramy dane z liczników i systemów. 1 dzień roboczy.",
  },
  {
    kicker: "Krok 2",
    price: "Od 15 tys. zł",
    priceSub: "zakres ustalany indywidualnie",
    title: "Audyt i raport techniczny",
    desc:
      "Pomiar, analiza energochłonności, wyliczenie zwrotu inwestycji. 4–8 tygodni w zależności od skali.",
    featured: true,
  },
  {
    kicker: "Krok 3",
    price: "Rozliczenie z oszczędności",
    priceSub: "opcjonalnie",
    title: "Wdrożenie i monitoring",
    desc:
      "Realizujemy rekomendacje i pilnujemy efektu — płacisz procent z realnych oszczędności (ESCO).",
  },
];

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-[oklch(0.17_0.02_150)] text-[color:var(--c-ink-50)]"
    >
      {/* Subtle lime glow accent, as Zeronest uses violet halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[160px]"
        style={{ background: "oklch(0.78 0.20 130 / 0.6)" }}
      />

      <div className="container-site relative py-[clamp(5rem,8vw,8rem)]">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-[color:var(--c-brand-400)]">
            Jak to działa
          </p>
          <h2
            id="how-heading"
            className="mt-4 font-display font-medium leading-[1.05] tracking-[-0.02em] text-balance"
            style={{ fontSize: "var(--fs-display-l)" }}
          >
            Audyt energetyczny w trzech krokach, z{" "}
            <span className="text-[color:var(--c-brand-400)]">klarowną ceną</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[color:var(--c-ink-300)] leading-[1.55]">
            Bez ukrytych kosztów. Bez "skontaktujemy się z ceną". Od pierwszej wizji
            aż po wdrożenie i rozliczenie z oszczędności.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <motion.li
              key={c.kicker}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className={[
                "relative flex flex-col gap-5 rounded-2xl p-7 ring-1",
                c.featured
                  ? "bg-[color:var(--c-brand-500)] text-[color:var(--c-ink-950)] ring-[color:var(--c-brand-400)] shadow-[0_30px_70px_-30px_oklch(0.78_0.20_130/0.55)]"
                  : "bg-white/5 ring-white/10 backdrop-blur-sm",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span
                  className={[
                    "text-[11px] font-mono uppercase tracking-[0.22em]",
                    c.featured ? "text-[color:var(--c-ink-950)]/75" : "text-[color:var(--c-brand-400)]",
                  ].join(" ")}
                >
                  {c.kicker}
                </span>
                {c.featured && (
                  <span className="rounded-full bg-[color:var(--c-ink-950)] text-[color:var(--c-brand-400)] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em]">
                    Najczęstszy wybór
                  </span>
                )}
              </div>

              <div>
                <p
                  className={[
                    "font-display font-medium leading-[1] tracking-[-0.02em]",
                    c.featured ? "text-[color:var(--c-ink-950)]" : "text-[color:var(--c-ink-50)]",
                  ].join(" ")}
                  style={{ fontSize: "clamp(1.9rem, 1.4rem + 1.8vw, 2.6rem)" }}
                >
                  {c.price}
                </p>
                <p
                  className={[
                    "mt-1 text-sm",
                    c.featured ? "text-[color:var(--c-ink-950)]/70" : "text-[color:var(--c-ink-300)]",
                  ].join(" ")}
                >
                  {c.priceSub}
                </p>
              </div>

              <div className="mt-2">
                <h3
                  className={[
                    "font-display text-[1.2rem] leading-[1.25] tracking-[-0.01em]",
                    c.featured ? "text-[color:var(--c-ink-950)]" : "text-[color:var(--c-ink-50)]",
                  ].join(" ")}
                >
                  {c.title}
                </h3>
                <p
                  className={[
                    "mt-2 text-[0.95rem] leading-[1.55]",
                    c.featured ? "text-[color:var(--c-ink-950)]/75" : "text-[color:var(--c-ink-300)]",
                  ].join(" ")}
                >
                  {c.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/uslugi"
            className="group inline-flex items-center gap-2 text-[0.95rem] text-[color:var(--c-ink-100)] hover:text-[color:var(--c-brand-400)] transition-colors"
          >
            Zobacz wszystkie usługi
            <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
