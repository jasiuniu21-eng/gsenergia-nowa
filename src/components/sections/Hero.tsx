"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";
import { MeshBackdrop } from "./hero/MeshBackdrop";
import { NumberProof } from "./hero/NumberProof";
import { easeOutExpo } from "@/design/motion";

export function Hero() {
  const reduced = useReducedMotion();

  const stagger = (delay: number) =>
    reduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { ...easeOutExpo, delay },
        };

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <MeshBackdrop />

      <div className="container-site relative grid min-h-[calc(100dvh-68px)] grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-16 lg:gap-20 pt-[clamp(2rem,4vw,5rem)] pb-[clamp(3rem,6vw,7rem)]">
        <div className="relative">
          <motion.p
            {...stagger(0.05)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[color:var(--c-fg-subtle)]"
          >
            <span
              aria-hidden="true"
              className="inline-block size-[6px] rounded-full bg-[color:var(--c-brand-500)] animate-[hero-dot_2.4s_ease-out_infinite]"
            />
            Audyty energetyczne dla przemysłu
          </motion.p>

          <motion.h1
            id="hero-heading"
            {...stagger(0.15)}
            className="mt-6 font-display text-[color:var(--c-fg)] leading-[1.02] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-display-xl)" }}
          >
            Audyt, po którym{" "}
            <span className="relative inline-block">
              <span className="relative z-10">realnie</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 240 18"
                className="absolute left-0 right-0 -bottom-1 w-full text-[color:var(--c-brand-500)]"
              >
                <path
                  d="M3 14 C 60 4, 140 4, 237 12"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  pathLength={1}
                >
                  <animate
                    attributeName="stroke-dasharray"
                    from="0 1"
                    to="1 0"
                    dur="1.1s"
                    begin="0.7s"
                    fill="freeze"
                  />
                </path>
              </svg>
            </span>{" "}
            spada rachunek.
          </motion.h1>

          <motion.p
            {...stagger(0.28)}
            className="mt-6 max-w-[52ch] text-[color:var(--c-fg-muted)] leading-relaxed"
            style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.3vw, 1.2rem)" }}
          >
            Od 2008 roku wykonujemy audyty energetyczne, efektywnościowe, chłodnicze
            i wodorowe dla zakładów produkcyjnych w Polsce. Pracujemy z konkretem —
            pokazujemy, ile i gdzie można zaoszczędzić, w jakim czasie się zwróci.
          </motion.p>

          <motion.div {...stagger(0.4)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={SITE.surveyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--c-ink-900)] text-[color:var(--c-ink-50)] pl-6 pr-5 py-3.5 text-[0.98rem] leading-none hover:bg-[color:var(--c-brand-700)] active:translate-y-[1px] transition-colors"
            >
              Zamów bezpłatną konsultację
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <a
              href="#uslugi"
              className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--c-border-strong)] text-[color:var(--c-fg)] pl-5 pr-4 py-3.5 text-[0.98rem] leading-none hover:border-[color:var(--c-fg)] transition-colors"
            >
              Zobacz nasze usługi
              <ArrowDown
                size={14}
                weight="bold"
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            {...stagger(0.55)}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-[color:var(--c-fg-subtle)]"
          >
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Zgodność z ustawą o efektywności energetycznej
            </span>
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Audytor ISO 50001
            </span>
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              18 lat, 400+ zakładów
            </span>
          </motion.div>
        </div>

        <div className="relative lg:pl-6">
          <NumberProof />
        </div>
      </div>

      <style>{`
        @keyframes hero-dot {
          0%,  80%, 100% { transform: scale(1);   opacity: 1; }
          40%            { transform: scale(1.7); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
