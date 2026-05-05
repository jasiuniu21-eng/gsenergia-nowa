"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { List, X, CaretRight, ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { SearchOverlay } from "./SearchOverlay";
import { spring } from "@/design/motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Close any open mega-menu the moment user scrolls — prevents ghost hover.
      setOpenMenu(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Debounced hover open — ignores accidental pointer brushes (120ms dwell).
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestOpen = (label: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(label), 120);
  };
  const cancelOpen = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };
  useEffect(() => () => cancelOpen(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter] duration-300",
          scrolled ? "bg-transparent backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="w-full px-10 flex h-[120px] items-center justify-between gap-12">
          <Logo />

          <div className="hidden lg:flex items-center gap-3">
            {/* Wordware-style pill — all menu items in one rounded container */}
            <nav
              aria-label="Główna"
              className="flex items-center gap-0 p-1 rounded-[10px] bg-[#F4EFDF]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {NAV.map((item) => {
                const hasChildren = !!(item.children?.length || item.groups?.length);
                const isOpen = openMenu === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && requestOpen(item.label)}
                    onMouseLeave={cancelOpen}
                  >
                    <Link
                      href={item.href}
                      className={[
                        "inline-flex items-center gap-1 px-3.5 h-[34px] rounded-md text-[11.5px] font-medium uppercase tracking-[0.06em] leading-none transition-colors",
                        isOpen
                          ? "bg-black/10 text-[#0F2A1F]"
                          : "text-[#0F2A1F]/85 hover:bg-black/5 hover:text-[#0F2A1F]",
                      ].join(" ")}
                      onFocus={() => hasChildren && setOpenMenu(item.label)}
                    >
                      {item.label}
                      {hasChildren && (
                        <svg
                          width="9" height="9" viewBox="0 0 10 10" aria-hidden="true"
                          className={[
                            "transition-transform duration-300 opacity-60",
                            isOpen ? "rotate-180 opacity-100" : "",
                          ].join(" ")}
                        >
                          <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </Link>
                  </div>
                );
              })}

              {/* Yellow CTA pill — Wordware "Sauna OS" style */}
              <Link
                href={SITE.surveyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="ml-1 inline-flex items-center h-[34px] px-4 rounded-md bg-[#F1FF6A] text-[#0F2A1F] text-[11.5px] font-semibold uppercase tracking-[0.06em] leading-none hover:bg-[#E5F44C] transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Konsultacja
              </Link>
            </nav>

            {/* Search pill outside main pill */}
            <button
              type="button"
              aria-label="Szukaj (Cmd+K)"
              onClick={() => setSearchOpen(true)}
              className="group inline-flex items-center gap-2 rounded-[10px] pl-3 pr-2 h-[42px] bg-[#F4EFDF] text-[#0F2A1F]/70 hover:text-[#0F2A1F] hover:bg-[#EBE3CC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86bc25] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <MagnifyingGlass size={15} weight="bold" />
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] border border-black/15 rounded text-[#0F2A1F]/60">
                {isMac ? "⌘ K" : "Ctrl K"}
              </kbd>
            </button>
          </div>

          <button
            type="button"
            aria-label="Szukaj"
            onClick={() => setSearchOpen(true)}
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86bc25]"
          >
            <MagnifyingGlass size={20} weight="bold" />
          </button>
          <button
            type="button"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86bc25]"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>

        {/* Mega menu (desktop) — generic renderer for .groups (2-col) or .children (1-col) */}
        <AnimatePresence>
          {(() => {
            const active = NAV.find(
              (n) => n.label === openMenu && (n.groups?.length || n.children?.length),
            );
            if (!active) return null;
            const cols = active.groups ?? [{ label: "", items: active.children ?? [] }];
            return (
              <motion.div
                key={`mega-${active.label}`}
                initial={reduced ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -4 }}
                transition={spring}
                className="hidden lg:block absolute left-0 right-0 top-full pt-3"
                onMouseEnter={() => setOpenMenu(active.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <div className="w-full px-6">
                  <div className="ml-auto max-w-[600px] rounded-[2rem] border border-[color:var(--c-border)] bg-white p-8 shadow-[0_30px_60px_-20px_oklch(0.10_0.02_150/0.25)]">
                    <div
                      className={[
                        "grid gap-10",
                        cols.length > 1 ? "grid-cols-[1fr_1fr]" : "grid-cols-1",
                      ].join(" ")}
                    >
                      {cols.map((col, ci) => (
                        <div key={ci}>
                          {col.label && (
                            <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                              {col.label}
                            </p>
                          )}
                          <ul className="flex flex-col">
                            {col.items.map((s) => (
                              <li key={s.href}>
                                <Link
                                  href={s.href}
                                  className="group flex items-start justify-between gap-6 rounded-xl px-3 py-3 hover:bg-[color:var(--c-brand-50)] transition-colors"
                                >
                                  <span>
                                    <span className="block text-[0.98rem] font-medium text-[color:var(--c-ink-900)]">
                                      {s.label}
                                    </span>
                                    {s.description && (
                                      <span className="mt-1 block text-sm text-[color:var(--c-fg-muted)]">
                                        {s.description}
                                      </span>
                                    )}
                                  </span>
                                  <CaretRight
                                    size={16}
                                    weight="bold"
                                    className="mt-1 shrink-0 text-[color:var(--c-fg-subtle)] transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--c-brand-700)]"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {active.cta && (
                      <div className="mt-6 flex items-center justify-between gap-6 rounded-2xl bg-[color:var(--c-brand-50)] ring-1 ring-[color:var(--c-brand-200)] p-5">
                        <div>
                          <p className="text-sm text-[color:var(--c-ink-900)] font-medium">
                            {active.cta.label}
                          </p>
                          {active.cta.description && (
                            <p className="mt-0.5 text-sm text-[color:var(--c-fg-muted)]">
                              {active.cta.description}
                            </p>
                          )}
                        </div>
                        <Link
                          href={active.cta.href}
                          target={active.cta.href.startsWith("http") ? "_blank" : undefined}
                          rel={active.cta.href.startsWith("http") ? "noreferrer noopener" : undefined}
                          className="group shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--c-ink-900)] text-white px-4 py-2.5 text-sm hover:bg-[color:var(--c-brand-700)] transition-colors"
                        >
                          Przejdź
                          <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </header>

      {/* Mobile off-canvas */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-50 bg-[color:var(--c-ink-950)]/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              key="mobile-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={spring}
              className="absolute right-0 top-0 h-[100dvh] w-[min(92vw,420px)] bg-[color:var(--c-bg)] shadow-[0_0_40px_oklch(0.16_0.01_150/0.15)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Menu nawigacji"
            >
              <div className="flex items-center justify-between px-5 h-[68px] border-b border-[color:var(--c-border)]">
                <Logo />
                <button
                  type="button"
                  aria-label="Zamknij"
                  className="inline-flex size-11 items-center justify-center rounded-full hover:bg-[color:var(--c-surface)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} weight="bold" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="flex flex-col gap-1">
                  {NAV.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-3 text-lg text-[color:var(--c-fg)]"
                      >
                        {item.label}
                        <CaretRight size={16} weight="bold" className="text-[color:var(--c-fg-subtle)]" />
                      </Link>
                      {(() => {
                        const flat = item.groups
                          ? item.groups.flatMap((g) => g.items)
                          : item.children;
                        if (!flat?.length) return null;
                        return (
                          <ul className="mb-2 ml-2 flex flex-col border-l border-[color:var(--c-border)] pl-4">
                            {flat.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-1.5 text-sm text-[color:var(--c-fg-muted)] hover:text-[color:var(--c-fg)]"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        );
                      })()}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-[color:var(--c-border)] p-5 flex flex-col gap-3">
                <Link
                  href={SITE.surveyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[color:var(--c-ink-900)] text-[color:var(--c-ink-50)] px-5 py-3 text-base"
                >
                  Bezpłatna konsultacja
                  <ArrowUpRight size={16} weight="bold" />
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="text-center font-mono text-sm text-[color:var(--c-fg-muted)]"
                >
                  {SITE.phone}
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offset placeholder so content isn't under fixed header */}
      <div aria-hidden className="h-[120px]" />

      <SearchOverlay
        open={searchOpen}
        onOpen={() => setSearchOpen(true)}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
