"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Lightning, Factory, Leaf } from "@phosphor-icons/react/dist/ssr";
import { spring, easeOutExpo } from "@/design/motion";

/**
 * Right-side of Hero: an "engineering slip" showing a real anonymized
 * before/after from an audit — communicates competence in one glance.
 */
export function NumberProof() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      animate={mounted ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...easeOutExpo, delay: 0.35 }}
      className="relative"
    >
      {/* Subtle frame-offset shadow card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-[color:var(--c-brand-100)]"
      />

      <article className="relative rounded-[2rem] border border-[color:var(--c-border)] bg-[color:var(--c-bg-elevated)] p-7 sm:p-8 shadow-[0_24px_48px_-20px_oklch(0.16_0.01_150/0.14)]">
        {/* header row */}
        <header className="flex items-start justify-between gap-6 border-b border-dashed border-[color:var(--c-border)] pb-5">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--c-fg-subtle)]">
              Case · PL-2024-087
            </p>
            <p className="mt-1.5 text-[0.98rem] font-medium text-[color:var(--c-fg)]">
              Zakład produkcji spożywczej · Małopolska
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[color:var(--c-brand-100)] px-2.5 py-1 text-[0.72rem] font-medium text-[color:var(--c-brand-800)]">
            <span className="inline-block size-[6px] rounded-full bg-[color:var(--c-brand-600)] animate-pulse" />
            Po audycie
          </span>
        </header>

        {/* metric */}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
            Roczne zużycie energii
          </p>

          <div className="mt-3 flex items-baseline gap-4">
            <span
              className="font-mono text-[color:var(--c-fg-subtle)] line-through decoration-[1.5px]"
              style={{ fontSize: "clamp(1rem, 1rem + 0.2vw, 1.15rem)" }}
            >
              8 472 MWh
            </span>
            <ArrowDown size={16} weight="bold" className="text-[color:var(--c-brand-700)]" />
            <span
              className="font-display text-[color:var(--c-fg)] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.6rem, 2rem + 2.2vw, 3.6rem)", lineHeight: 1 }}
            >
              6 198
              <span className="font-body text-[color:var(--c-fg-muted)] text-[0.42em] font-normal align-top ml-2">
                MWh
              </span>
            </span>
          </div>

          <p className="mt-2 font-mono text-sm text-[color:var(--c-brand-700)]">
            −26.8% · zwrot 2 lata 4 mies.
          </p>
        </div>

        {/* 3 bars as inline chart */}
        <div className="mt-7 grid grid-cols-3 gap-4">
          <Bar label="Sprężone powietrze" value={0.42} hue="brand" />
          <Bar label="Chłód procesowy" value={0.71} hue="amber" />
          <Bar label="HVAC" value={0.34} hue="brand" delay={0.15} />
        </div>

        {/* footer chips */}
        <footer className="mt-7 flex flex-wrap gap-2">
          <Chip icon={<Lightning size={12} weight="fill" />}>
            Białe certyfikaty
          </Chip>
          <Chip icon={<Factory size={12} weight="fill" />}>
            Modernizacja sprężarek
          </Chip>
          <Chip icon={<Leaf size={12} weight="fill" />}>
            1 842 t CO₂ / rok
          </Chip>
        </footer>
      </article>
    </motion.div>
  );
}

function Bar({
  label,
  value,
  hue,
  delay = 0,
}: {
  label: string;
  value: number; // 0..1 — where shorter = better (less consumption after)
  hue: "brand" | "amber";
  delay?: number;
}) {
  const color =
    hue === "brand"
      ? "var(--c-brand-500)"
      : "var(--c-amber-500)";

  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--c-fg-subtle)] h-8 leading-tight">
        {label}
      </p>
      <div
        className="relative mt-1 h-20 rounded-md bg-[color:var(--c-ink-100)] overflow-hidden"
        aria-hidden="true"
      >
        {/* baseline line */}
        <span className="absolute inset-x-0 top-0 h-px bg-[color:var(--c-ink-300)]" />
        <motion.span
          initial={{ height: "100%" }}
          whileInView={{ height: `${Math.round(value * 100)}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ ...spring, delay: 0.2 + delay }}
          className="absolute inset-x-0 bottom-0"
          style={{
            background: `linear-gradient(to top, ${color}, color-mix(in oklch, ${color} 65%, transparent))`,
          }}
        />
      </div>
      <p className="mt-1.5 font-mono text-[0.72rem] text-[color:var(--c-fg-muted)]">
        {Math.round((1 - value) * 100)}% ↓
      </p>
    </div>
  );
}

function Chip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--c-ink-100)] px-2.5 py-1 text-[0.76rem] text-[color:var(--c-fg-muted)]">
      <span className="text-[color:var(--c-brand-700)]">{icon}</span>
      {children}
    </span>
  );
}
