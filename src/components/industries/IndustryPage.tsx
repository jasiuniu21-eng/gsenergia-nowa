"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Snowflake,
  Wind,
  Thermometer,
  Drop,
  Warning,
  ShieldCheck,
  Lightning,
  Gauge,
  Fire,
  Clock,
  ChartLineUp,
  Wallet,
  Factory,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import { SITE } from "@/lib/site";
import { HelpCalculator } from "@/components/sections/HelpCalculator";

// ─── Types ──────────────────────────────────────────────────────────────────

export type IndustryData = {
  slug: string;
  name: string;
  nameInflected: string;
  hero: {
    headline: string;
    subline: string;
  };
  challenges: { icon: string; title: string; description: string }[];
  services: { slug: string; name: string; reason: string }[];
  metrics: { label: string; value: string }[];
  caseStudies: {
    client: string;
    metric: string;
    description: string;
    href: string;
  }[];
  faq: { q: string; a: string }[];
  industryStats: string;
};

type Props = { data: IndustryData };

// ─── Icon resolver ──────────────────────────────────────────────────────────

const ICONS: Record<string, React.ComponentType<IconProps>> = {
  Snowflake,
  Wind,
  Thermometer,
  Drop,
  Warning,
  ShieldCheck,
  Lightning,
  Gauge,
  Fire,
  Clock,
  ChartLineUp,
  Wallet,
  Factory,
};

function ChallengeIcon({ name }: { name: string }) {
  const Cmp = ICONS[name] ?? Factory;
  return <Cmp size={26} weight="duotone" className="text-[#26890d]" />;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function IndustryPage({ data }: Props) {
  const reduced = useReducedMotion();

  return (
    <>
      {/* ── Block 1: Hero ─────────────────────────────────────────────────── */}
      <section className="bg-white text-[#222328] border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--c-fg-muted)]"
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-[#26890d] transition-colors">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-50">›</li>
              <li>
                <Link href="/branze" className="hover:text-[#26890d] transition-colors">
                  Branże
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-50">›</li>
              <li className="text-[#222328] truncate max-w-[40ch]" aria-current="page">
                {data.name}
              </li>
            </ol>
          </nav>

          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-4">
            Branża
          </p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-balance"
            style={{
              fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {data.hero.headline}
            <span style={{ color: "#8DC73F" }}>.</span>
          </motion.h1>

          <p className="mt-6 max-w-[68ch] text-[color:var(--c-fg-muted)] leading-[1.6] text-[1.15rem]">
            {data.hero.subline}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={SITE.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#26890d] px-6 py-3 text-sm font-medium text-white hover:bg-[#1e6e0a] transition-colors"
            >
              Zamów konsultację
              <ArrowRight size={15} weight="bold" />
            </a>
            <Link
              href="/realizacje"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-[#222328] hover:border-[#26890d] hover:text-[#26890d] transition-colors"
            >
              Zobacz case studies
            </Link>
          </div>

          {/* Industry stat callout */}
          <div
            className="mt-12 max-w-[68ch] rounded-2xl p-[1.5px]"
            style={{
              background:
                "linear-gradient(135deg, #26890d 0%, #8DC73F 50%, #26890d 100%)",
            }}
          >
            <div className="rounded-[14px] bg-white px-7 py-6">
              <p className="italic text-[1.05rem] leading-[1.65] text-[#222328]/85">
                „{data.industryStats}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Block 2: Industry metrics ─────────────────────────────────────── */}
      <section className="bg-[oklch(0.98_0.01_140)] border-y border-black/5">
        <div className="container-site py-[clamp(3rem,5vw,5rem)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <p
                  className="font-display tracking-[-0.02em] leading-none"
                  style={{
                    fontSize: "clamp(2rem, 3vw + 0.8rem, 3.25rem)",
                    fontWeight: 100,
                    color: "#8DC73F",
                  }}
                >
                  {m.value}
                </p>
                <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--c-fg-muted)]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Block 3: Specific challenges ──────────────────────────────────── */}
      <section className="bg-white border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[44ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
              Wyzwania
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Wyzwania energetyczne w {data.name}
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.challenges.map((c, i) => (
              <motion.article
                key={c.title}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-black/10 bg-white p-6 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8DC73F]/15">
                  <ChallengeIcon name={c.icon} />
                </div>
                <h3 className="mt-5 font-display text-[1.15rem] tracking-[-0.01em] text-[#222328]">
                  {c.title}
                </h3>
                <p className="mt-2 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55]">
                  {c.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Block 4: Tailored services ────────────────────────────────────── */}
      <section className="bg-[oklch(0.98_0.01_140)] border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[48ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
              Co robimy
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Dla zakładów {data.nameInflected}
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.services.map((s) => (
              <Link
                key={s.slug}
                href={`/uslugi/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
              >
                <h3 className="font-display text-[1.2rem] tracking-[-0.01em] text-[#222328]">
                  {s.name}
                </h3>
                <p className="mt-3 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55]">
                  {s.reason}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-[#26890d]">
                  Dowiedz się więcej
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Block 5: Case studies ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-[44ch]">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
                Realizacje
              </p>
              <h2
                className="font-display text-[#222328]"
                style={{
                  fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                  fontWeight: 100,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Realizacje w {data.name}
                <span style={{ color: "#8DC73F" }}>.</span>
              </h2>
            </div>
            <Link
              href="/realizacje"
              className="inline-flex items-center gap-1.5 text-[0.95rem] text-[#26890d] hover:underline underline-offset-4"
            >
              Wszystkie realizacje <ArrowUpRight size={15} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.caseStudies.map((c) => (
              <article
                key={c.client}
                className="group flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
              >
                <h3 className="font-display text-[1.2rem] tracking-[-0.01em] text-[#222328]">
                  {c.client}
                </h3>
                <span className="mt-4 inline-flex w-fit items-center rounded-full bg-[#8DC73F]/20 text-[#26890d] px-3 py-1 text-xs font-medium tracking-wide">
                  {c.metric}
                </span>
                <p className="mt-5 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55]">
                  {c.description}
                </p>
                <Link
                  href={c.href}
                  className="mt-6 inline-flex items-center gap-1 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors"
                >
                  Czytaj realizację
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Block 6: HelpCalculator embed ─────────────────────────────────── */}
      <HelpCalculator />

      {/* ── Block 7: FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/5">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[44ch] mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
              FAQ
            </p>
            <h2
              className="font-display text-[#222328]"
              style={{
                fontSize: "clamp(2rem, 3vw + 0.8rem, 3rem)",
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Najczęstsze pytania w {data.name}
              <span style={{ color: "#8DC73F" }}>.</span>
            </h2>
          </div>

          <div className="max-w-[820px] divide-y divide-black/10 border-y border-black/10">
            {data.faq.map(({ q, a }) => (
              <details
                key={q}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                  <span className="font-display text-[1.1rem] tracking-[-0.01em] text-[#222328]">
                    {q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-black/15 text-[#26890d] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[68ch] text-[0.98rem] leading-[1.7] text-[color:var(--c-fg-muted)]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Block 8: Final CTA ────────────────────────────────────────────── */}
      <section className="bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)] text-center">
          <h2
            className="font-display mx-auto max-w-[24ch]"
            style={{
              fontSize: "clamp(2.25rem, 4vw + 0.8rem, 3.75rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Gotowi na audyt w {data.name}
            <span style={{ color: "#86bc25" }}>?</span>
          </h2>
          <p className="mt-5 mx-auto max-w-[52ch] text-white/70 text-[1.05rem] leading-[1.6]">
            Bezpłatna wstępna konsultacja, odpowiadamy w 24h.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#8DC73F] px-7 py-3.5 text-sm font-medium text-[#0c1a0c] hover:bg-[#9bd44a] transition-colors"
            >
              Zamów konsultację
              <ArrowRight size={15} weight="bold" />
            </a>
            <Link
              href="/branze"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              Zobacz inne branże
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default IndustryPage;
