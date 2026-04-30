"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  MagnifyingGlass,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

export type ServiceItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  category: CategoryKey;
};

export type CategoryKey =
  | "wszystkie"
  | "audyty"
  | "oze"
  | "ems"
  | "budynki"
  | "strategia"
  | "wdrozenie"
  | "pozostale";

type CategoryDef = { key: CategoryKey; label: string };

const CATEGORIES: CategoryDef[] = [
  { key: "wszystkie", label: "Wszystkie" },
  { key: "audyty", label: "Audyty" },
  { key: "oze", label: "OZE i fotowoltaika" },
  { key: "ems", label: "Magazyny i EMS" },
  { key: "budynki", label: "Budynki" },
  { key: "strategia", label: "Strategia" },
  { key: "wdrozenie", label: "Wdrożenie" },
  { key: "pozostale", label: "Pozostałe" },
];

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const reduced = useReducedMotion();
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const activeKey = (params.get("kat") as CategoryKey | null) ?? "wszystkie";
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<CategoryKey, number> = {
      wszystkie: services.length,
      audyty: 0,
      oze: 0,
      ems: 0,
      budynki: 0,
      strategia: 0,
      wdrozenie: 0,
      pozostale: 0,
    };
    for (const s of services) map[s.category] += 1;
    return map;
  }, [services]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const inCat = activeKey === "wszystkie" || s.category === activeKey;
      if (!inCat) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q)
      );
    });
  }, [services, activeKey, query]);

  const setCategory = (key: CategoryKey) => {
    const next = new URLSearchParams(params.toString());
    if (key === "wszystkie") next.delete("kat");
    else next.set("kat", key);
    const qs = next.toString();
    startTransition(() => {
      router.replace(qs ? `/uslugi?${qs}` : "/uslugi", { scroll: false });
    });
  };

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((c) => {
          const active = c.key === activeKey;
          const count = counts[c.key];
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key)}
              className={
                active
                  ? "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium bg-[#26890d] text-white border border-[#26890d] transition-colors"
                  : "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium bg-white border border-black/10 hover:border-[#26890d]/40 text-[#222328] transition-colors"
              }
            >
              <span>{c.label}</span>
              <span
                className={
                  active
                    ? "text-[11px] text-white/80"
                    : "text-[11px] text-[#222328]/50"
                }
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <MagnifyingGlass
          size={16}
          weight="bold"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#222328]/40"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj usługi..."
          aria-label="Szukaj usługi"
          className="w-full rounded-full border border-black/10 bg-white pl-9 pr-4 py-2.5 text-sm text-[#222328] placeholder:text-[#222328]/40 focus:outline-none focus:border-[#26890d]/50 focus:ring-2 focus:ring-[#26890d]/15 transition"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center">
          <p className="text-[#222328]/70">
            Brak usług w tej kategorii.{" "}
            <button
              type="button"
              onClick={() => {
                setCategory("wszystkie");
                setQuery("");
              }}
              className="text-[#26890d] underline underline-offset-4 hover:no-underline"
            >
              Zobacz wszystkie
            </button>
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((s, i) => (
              <motion.li
                key={s.slug}
                layout
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(i * 0.04, 0.5),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/uslugi/${s.slug}`}
                  className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-black/10 bg-white hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#26890d]/5">
                    {s.image ? (
                      <>
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#26890d]/10 to-[#8DC73F]/15">
                        <Lightning
                          size={44}
                          weight="duotone"
                          className="text-[#26890d]"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-display text-[1rem] tracking-[-0.01em] text-[#222328] leading-tight line-clamp-2">
                      {s.title}
                    </h3>
                    {s.excerpt && (
                      <p className="mt-2 text-sm text-[#222328]/60 leading-snug line-clamp-2">
                        {s.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#26890d] font-medium">
                      Dowiedz się więcej
                      <ArrowUpRight
                        size={12}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
