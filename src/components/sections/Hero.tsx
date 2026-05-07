"use client";

import Link from "next/link";
import { HeroVideo } from "./HeroVideo";
import { SITE } from "@/lib/site";

const STATS = [
  { num: "18", unit: "lat", label: "na rynku" },
  { num: "400+", unit: "", label: "projektów" },
  { num: "30%", unit: "", label: "średnia oszczędność" },
];

const CLIENTS = ["PGE", "PKN", "SHL", "KGH"];

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden flex flex-col lg:flex-row"
      style={{ height: "100svh", minHeight: 640, background: "#06100a" }}
    >
      {/* ─── LEFT PANEL ─── */}
      <div className="relative z-10 flex flex-col justify-between lg:w-[46%] w-full px-8 md:px-14 lg:px-16 pt-28 pb-10">

        {/* Headline block */}
        <div
          className="flex flex-col gap-5"
          style={{ animation: "heroIn 1s cubic-bezier(0.22,1,0.36,1) 0.35s both" }}
        >
          {/* Eyebrow */}
          <p
            className="flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: "#8dc73f" }}
          >
            <span className="block w-8 h-px bg-current" aria-hidden />
            Audyty energetyczne · od 2008
          </p>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="font-display text-white leading-[0.92] tracking-tight"
            style={{
              fontSize: "clamp(3rem, 4.8vw + 0.5rem, 5.2rem)",
              fontWeight: 800,
            }}
          >
            Obniżamy<br />
            koszty energii<br />
            <span
              className="relative inline-block"
              style={{ color: "#8dc73f" }}
            >
              o 15–30%
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/45 leading-relaxed"
            style={{ fontSize: "1rem", maxWidth: "36ch" }}
          >
            Kompleksowe audyty, ISO&nbsp;50001 i outsourcing mediów
            dla zakładów przemysłowych i budynków komercyjnych.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={SITE.surveyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "#26890d",
                boxShadow: "0 4px 28px rgba(38,137,13,0.45)",
              }}
            >
              Bezpłatna wycena
            </Link>
            <Link
              href="/realizacje"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[13px] font-medium border text-white/50 hover:text-white hover:border-white/25 transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <span>→</span> Realizacje
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap items-end gap-8 border-t pt-8"
          style={{ borderColor: "rgba(255,255,255,0.07)", animation: "heroInStats 0.9s cubic-bezier(0.22,1,0.36,1) 0.85s both" }}
        >
          {STATS.map(({ num, unit, label }) => (
            <div key={label} className="flex flex-col">
              <p
                className="font-display text-white leading-none"
                style={{
                  fontSize: "clamp(2rem, 2.8vw, 2.75rem)",
                  fontWeight: 800,
                }}
              >
                {num}
                {unit && (
                  <span
                    className="text-[0.38em] text-white/35 ml-1 align-top mt-1.5 inline-block font-semibold"
                  >
                    {unit}
                  </span>
                )}
              </p>
              <p
                className="text-white/30 uppercase tracking-[0.12em] mt-1.5"
                style={{ fontSize: "9px" }}
              >
                {label}
              </p>
            </div>
          ))}

          {/* Client avatars */}
          <div className="ml-auto hidden xl:flex items-center gap-2 pb-0.5">
            <div className="flex -space-x-1.5">
              {CLIENTS.map((t) => (
                <div
                  key={t}
                  className="w-7 h-7 rounded-full border flex items-center justify-center font-bold"
                  style={{
                    fontSize: "7px",
                    background: "rgba(141,199,63,0.08)",
                    borderColor: "rgba(141,199,63,0.22)",
                    color: "rgba(141,199,63,0.65)",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <p className="text-white/22 ml-1" style={{ fontSize: "10px" }}>
              PGE, Orlen, Shell i inni
            </p>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL — VIDEO ─── */}
      <div
        className="hidden lg:block absolute right-0 top-0 bottom-0"
        style={{ width: "56%" }}
        aria-hidden
      >
        {/* Feather blend from left */}
        <div
          className="absolute inset-y-0 left-0 z-10 pointer-events-none"
          style={{
            width: "180px",
            background: "linear-gradient(to right, #06100a 0%, rgba(6,16,10,0.6) 50%, transparent 100%)",
          }}
        />

        {/* Accent vertical line at blend edge */}
        <div
          className="absolute inset-y-0 z-20 pointer-events-none"
          style={{
            left: "1px",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent 8%, rgba(141,199,63,0.28) 28%, rgba(141,199,63,0.28) 72%, transparent 92%)",
          }}
        />

        {/* The video — VISIBLE */}
        <HeroVideo />

        {/* Very subtle top/bottom fade only */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, #06100a 0%, transparent 12%, transparent 82%, #06100a 100%)",
          }}
        />
      </div>

      {/* Mobile: dark overlay for readability */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{ background: "rgba(6,16,10,0.75)" }}
        aria-hidden
      />
      <div className="lg:hidden absolute inset-0 pointer-events-none" aria-hidden>
        <HeroVideo />
      </div>
    </section>
  );
}
