"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  House,
  Wrench,
  Quotes,
  EnvelopeSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";

type IconComponent = React.ComponentType<{
  size?: number;
  weight?: "duotone" | "regular" | "bold";
  className?: string;
}>;

const ACTIONS: Array<{ label: string; href: string; Icon: IconComponent }> = [
  { label: "Strona główna", href: "/", Icon: House },
  { label: "Nasze usługi", href: "/uslugi", Icon: Wrench },
  { label: "Realizacje", href: "/realizacje", Icon: Quotes },
  { label: "Kontakt", href: "/kontakt", Icon: EnvelopeSimple },
];

export function NotFoundContent() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : 0.07,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  };
  const item: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main className="relative min-h-[100dvh] flex items-center justify-center bg-white text-[#222328] overflow-hidden px-6 py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          className="font-display leading-none"
          style={{
            fontWeight: 100,
            color: "#8DC73F",
            opacity: 0.15,
            fontSize: "clamp(16rem, 42vw, 36rem)",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-[920px] mx-auto text-center"
      >
        <motion.p
          variants={item}
          className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#26890d] mb-5"
        >
          Energia poszła nie tym kablem
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display tracking-[-0.02em] leading-[1.05]"
          style={{ fontWeight: 100, fontSize: "clamp(3rem, 7vw, 5rem)" }}
        >
          Tej strony nie ma na mapie
          <span style={{ color: "#8DC73F" }}>.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-[color:var(--c-fg-muted)] max-w-[52ch] mx-auto mt-6 text-[1.05rem] leading-relaxed"
        >
          Coś tu kiedyś było — albo nigdy nie powstało. Zacznijmy od początku —
          wybierz, dokąd chcesz iść.
        </motion.p>

        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 max-w-[820px] mx-auto"
        >
          {ACTIONS.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-black/10 hover:border-[#26890d]/40 hover:bg-[#26890d]/[0.03] transition-colors p-5 text-left"
            >
              <Icon size={22} weight="duotone" className="text-[#26890d] shrink-0" />
              <span className="text-sm font-medium text-[#222328] group-hover:text-[#26890d] transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-col items-center gap-2">
          <p className="text-sm text-[color:var(--c-fg-muted)]">
            Lub wpisz, czego szukasz:
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#26890d] hover:text-[#1f7a0a] transition-colors"
          >
            <MagnifyingGlass size={16} weight="bold" />
            Otwórz wyszukiwarkę
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <motion.p
          variants={item}
          className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--c-fg-muted)] mt-16 opacity-70"
        >
          Kod błędu: 404
        </motion.p>
      </motion.div>
    </main>
  );
}
