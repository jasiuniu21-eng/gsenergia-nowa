"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ChatCircleDots, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";

export function FloatingCTA() {
  const reduced = useReducedMotion();
  return (
    <div className="fixed bottom-5 right-5 z-30 pointer-events-none">
      <motion.a
        href={SITE.surveyUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Porozmawiajmy — bezpłatna konsultacja"
        initial={reduced ? false : { opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto group relative inline-flex items-center gap-2 rounded-full bg-[color:var(--c-brand-500)] text-[color:var(--c-brand-950)] pl-4 pr-4 py-3 shadow-[0_12px_28px_-10px_oklch(0.55_0.15_135/0.55)] hover:bg-[color:var(--c-brand-400)] active:translate-y-[1px] transition-colors"
      >
        {/* pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full ring-2 ring-[color:var(--c-brand-500)]/45 animate-[floating-pulse_2.4s_ease-out_infinite] pointer-events-none"
        />
        <ChatCircleDots size={18} weight="fill" className="shrink-0" />
        <span className="hidden sm:inline text-[0.95rem] font-medium leading-none">
          Porozmawiajmy
        </span>
        <ArrowUpRight
          size={14}
          weight="bold"
          className="hidden sm:inline shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </motion.a>

      <style>{`
        @keyframes floating-pulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[floating-pulse_2\\.4s_ease-out_infinite\\] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
