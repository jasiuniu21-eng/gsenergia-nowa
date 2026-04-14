"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { List, X, CaretRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { NAV, SERVICES, SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { spring } from "@/design/motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "bg-[color:var(--c-bg)]/75 backdrop-blur-xl border-b border-[color:var(--c-border)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="container-site flex h-[68px] items-center justify-between">
          <Logo className="text-[color:var(--c-fg)]" />

          <nav aria-label="Główna" className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const hasChildren = !!item.children?.length;
              const isOpen = openMenu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenMenu(item.label)}
                >
                  <Link
                    href={item.href}
                    className={[
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] leading-none",
                      "text-[color:var(--c-fg)] hover:text-[color:var(--c-brand-700)] transition-colors",
                      isOpen ? "text-[color:var(--c-brand-700)]" : "",
                    ].join(" ")}
                    onFocus={() => hasChildren && setOpenMenu(item.label)}
                  >
                    {item.label}
                    {hasChildren && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        aria-hidden="true"
                        className={[
                          "transition-transform duration-300",
                          isOpen ? "rotate-180" : "",
                        ].join(" ")}
                      >
                        <path
                          d="M1.5 3.5L5 7l3.5-3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href={SITE.phoneHref}
              className="font-mono text-sm text-[color:var(--c-fg-muted)] hover:text-[color:var(--c-fg)] transition-colors px-3 py-2"
            >
              {SITE.phone}
            </Link>
            <Link
              href={SITE.surveyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-1.5 rounded-full bg-[color:var(--c-ink-900)] text-[color:var(--c-ink-50)] pl-4 pr-3.5 py-2 text-[0.95rem] leading-none hover:bg-[color:var(--c-brand-700)] transition-colors active:translate-y-[1px]"
            >
              Bezpłatna konsultacja
              <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-full text-[color:var(--c-fg)] hover:bg-[color:var(--c-surface)] transition-colors active:scale-[0.98]"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>

        {/* Mega menu (desktop) */}
        <AnimatePresence>
          {openMenu === "Usługi" && (
            <motion.div
              key="mega"
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -4 }}
              transition={spring}
              className="hidden lg:block absolute left-0 right-0 top-full"
              onMouseEnter={() => setOpenMenu("Usługi")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className="container-site">
                <div className="mx-auto max-w-[1120px] rounded-[2rem] border border-[color:var(--c-border)] bg-[color:var(--c-bg-elevated)] p-8 shadow-[0_20px_40px_-15px_oklch(0.16_0.01_150/0.12)]">
                  <div className="grid grid-cols-[1fr_1fr] gap-10">
                    <div>
                      <p className="mb-5 text-xs uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                        Usługi audytorskie
                      </p>
                      <ul className="flex flex-col">
                        {SERVICES?.slice(0, 4).map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              className="group flex items-start justify-between gap-6 rounded-xl px-3 py-3 hover:bg-[color:var(--c-ink-100)] transition-colors"
                            >
                              <span>
                                <span className="block text-[0.98rem] font-medium text-[color:var(--c-fg)]">
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
                    <div>
                      <p className="mb-5 text-xs uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                        Technologie & strategia
                      </p>
                      <ul className="flex flex-col">
                        {SERVICES?.slice(4).map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              className="group flex items-start justify-between gap-6 rounded-xl px-3 py-3 hover:bg-[color:var(--c-ink-100)] transition-colors"
                            >
                              <span>
                                <span className="block text-[0.98rem] font-medium text-[color:var(--c-fg)]">
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
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-6 rounded-2xl bg-[color:var(--c-ink-100)] p-5">
                    <p className="text-sm text-[color:var(--c-fg-muted)] max-w-[48ch]">
                      Nie wiesz którego audytu potrzebujesz? Odpowiedz na kilka pytań — dobierzemy zakres pod Twoją firmę.
                    </p>
                    <Link
                      href={SITE.surveyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--c-ink-900)] text-[color:var(--c-ink-50)] pl-4 pr-3.5 py-2 text-sm hover:bg-[color:var(--c-brand-700)] transition-colors"
                    >
                      Bezpłatna konsultacja
                      <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
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
                      {item.children && (
                        <ul className="mb-2 ml-2 flex flex-col border-l border-[color:var(--c-border)] pl-4">
                          {item.children.map((c) => (
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
                      )}
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
      <div aria-hidden className="h-[68px]" />
    </>
  );
}
