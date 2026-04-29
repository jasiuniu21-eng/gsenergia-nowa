"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Medal,
  Buildings,
  ShieldCheck,
  ChartLineUp,
  Lightning,
  Globe,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type Differentiator = {
  icon: Icon;
  title: string;
  description: string;
};

const ITEMS: Differentiator[] = [
  {
    icon: Medal,
    title: "18 lat doświadczenia",
    description:
      "Od 2008 r. tylko audyty energetyczne. Setki audytów rocznie, znamy każdą branżę.",
  },
  {
    icon: Buildings,
    title: "400+ zakładów",
    description:
      "Zaufały nam PGE, Shell, BSH, ZF, Skanska, Kaufland i 400 innych firm w Polsce.",
  },
  {
    icon: ShieldCheck,
    title: "Niezależne doradztwo",
    description:
      "Nie sprzedajemy urządzeń ani technologii. Nasz interes = Twoje oszczędności.",
  },
  {
    icon: ChartLineUp,
    title: "ROI < 18 mies.",
    description:
      "Każda rekomendacja z konkretną kalkulacją zwrotu. Średni czas zwrotu inwestycji.",
  },
  {
    icon: Lightning,
    title: "ISO 50001 + ustawa",
    description:
      "Pełna zgodność z wymogami prawnymi i normą ISO 50001 (system zarządzania energią).",
  },
  {
    icon: Globe,
    title: "Cała Polska",
    description:
      "Kraków · Warszawa · Wrocław · Łódź · Katowice · Poznań. Realizujemy projekty w całym kraju.",
  },
];

export function WhyUs() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="why-us-heading"
      className="relative bg-white text-[#222328] border-t border-black/10"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        <div className="max-w-[44ch] mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Dlaczego my
          </p>
          <motion.h2
            id="why-us-heading"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{
              fontSize: "clamp(2.25rem, 3.5vw + 1rem, 3.5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Wybierają nas, bo robimy to inaczej
            <span style={{ color: "#8DC73F" }}>.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
              >
                <div className="size-12 rounded-xl bg-[#26890d]/10 text-[#26890d] ring-1 ring-[#26890d]/20 flex items-center justify-center">
                  <Icon size={24} weight="light" />
                </div>
                <h3 className="mt-5 font-display text-[1.25rem] tracking-[-0.01em] text-[#222328]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
