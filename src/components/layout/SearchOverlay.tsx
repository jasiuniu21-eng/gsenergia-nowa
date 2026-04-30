"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  MagnifyingGlassMinus,
  ArrowRight,
  Wrench,
  Quotes,
  Newspaper,
  Clock,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SearchResult, SearchResultType } from "@/app/api/search/route";

interface Props {
  open: boolean;
  onClose: () => void;
  /** When true, the component installs a global Cmd+K / Ctrl+K listener that calls onOpen. */
  onOpen?: () => void;
}

const RECENT_KEY = "gse_recent_searches";
const MAX_RECENT = 5;

const POPULAR: { label: string; href: string }[] = [
  { label: "Audyt energetyczny przedsiębiorstwa", href: "/uslugi/audyt-energetyczny-przedsiebiorstwa" },
  { label: "Magazyn energii BESS", href: "/uslugi/magazyny-energii-bess" },
  { label: "EMS / Telemetria", href: "/uslugi/ems-telemetria" },
];

const TYPE_META: Record<SearchResultType, { label: string; Icon: typeof Wrench }> = {
  uslugi: { label: "Usługi", Icon: Wrench },
  realizacje: { label: "Realizacje", Icon: Quotes },
  blog: { label: "Blog", Icon: Newspaper },
};

const TYPE_ORDER: SearchResultType[] = ["uslugi", "realizacje", "blog"];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query || query.length < 2) return text;
  const re = new RegExp(`(${escapeRegExp(query)})`, "ig");
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) && part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-[#86bc25]/30 text-inherit not-italic font-medium rounded-sm">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function SearchOverlay({ open, onClose, onOpen }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reqIdRef = useRef(0);

  // Cmd+K / Ctrl+K — global open shortcut
  useEffect(() => {
    if (!onOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (!open) onOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen, open]);

  // Load recent on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setRecent(parsed.filter((x): x is string => typeof x === "string").slice(0, MAX_RECENT));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Open: focus, reset
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIdx(0);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Search w/ debounce + race protection
  const search = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const id = ++reqIdRef.current;
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data: SearchResult[] = await res.json();
        if (id === reqIdRef.current) {
          setResults(data);
          setActiveIdx(0);
        }
      } catch {
        if (id === reqIdRef.current) setResults([]);
      } finally {
        if (id === reqIdRef.current) setLoading(false);
      }
    }, 200);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    search(v);
  };

  // Group results in stable order
  const grouped = useMemo(() => {
    const map = new Map<SearchResultType, SearchResult[]>();
    for (const r of results) {
      const arr = map.get(r.type) ?? [];
      arr.push(r);
      map.set(r.type, arr);
    }
    return TYPE_ORDER.filter((t) => map.has(t)).map((t) => ({
      type: t,
      items: map.get(t) ?? [],
    }));
  }, [results]);

  // Flat list for keyboard nav
  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  const persistRecent = useCallback((q: string) => {
    const next = [q, ...recent.filter((r) => r !== q)].slice(0, MAX_RECENT);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, [recent]);

  const removeRecent = (q: string) => {
    const next = recent.filter((r) => r !== q);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const navigateTo = useCallback(
    (href: string, q?: string) => {
      if (q && q.length >= 2) persistRecent(q);
      onClose();
      router.push(href);
    },
    [onClose, persistRecent, router],
  );

  // Keyboard nav within overlay
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "Tab") {
      // simple focus trap inside container
      const root = containerRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }
    if (flat.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = flat[activeIdx];
      if (target) navigateTo(target.href, query);
    }
  };

  const showEmpty = query.length < 2;
  const showNoResults = !showEmpty && !loading && results.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex flex-col items-center px-4"
          onMouseDown={(e) => {
            // close on backdrop click only
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Wyszukiwarka"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onMouseDown={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.7 }}
            className="relative z-10 w-full max-w-[680px] mt-[12vh] rounded-3xl bg-white shadow-[0_30px_80px_-20px_oklch(0.08_0.04_148/0.55)] ring-1 ring-black/5 overflow-hidden flex flex-col"
            onKeyDown={onKeyDown}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="relative">
              <MagnifyingGlass
                size={20}
                weight="bold"
                className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                  loading ? "text-[#26890d] animate-pulse" : "text-black/40"
                }`}
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Szukaj usług, realizacji, artykułów…"
                aria-label="Zapytanie wyszukiwania"
                className="w-full text-[1.1rem] py-5 px-14 border-b border-black/8 outline-none placeholder:text-black/35 text-[#222328] bg-transparent"
              />
              <kbd className="hidden sm:inline-flex absolute right-5 top-1/2 -translate-y-1/2 border border-black/15 rounded-md px-1.5 py-0.5 text-xs font-mono text-black/50 bg-black/[0.02]">
                Esc
              </kbd>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Loading skeleton */}
              {loading && results.length === 0 && (
                <div className="px-3 py-3 space-y-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-xl">
                      <div className="size-8 rounded-lg bg-black/5 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 rounded bg-black/5 animate-pulse" />
                        <div className="h-2.5 w-2/3 rounded bg-black/5 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state — popular & recent */}
              {showEmpty && !loading && (
                <div className="p-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-black/40 mb-3">
                    Popularne
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((p) => (
                      <button
                        key={p.href}
                        type="button"
                        onClick={() => navigateTo(p.href)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#26890d]/8 hover:bg-[#26890d]/14 text-[#222328] px-3.5 py-1.5 text-sm transition-colors ring-1 ring-[#26890d]/15"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {recent.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-black/40 mb-3">
                        Ostatnio szukane
                      </p>
                      <ul className="flex flex-col">
                        {recent.map((r) => (
                          <li key={r} className="group flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setQuery(r);
                                search(r);
                                inputRef.current?.focus();
                              }}
                              className="flex-1 flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-[#222328] hover:bg-[#26890d]/8 transition-colors"
                            >
                              <Clock size={14} weight="regular" className="text-black/35" />
                              <span className="truncate">{r}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => removeRecent(r)}
                              aria-label={`Usuń «${r}» z historii`}
                              className="p-1.5 rounded-md text-black/30 hover:text-black/70 hover:bg-black/5 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X size={12} weight="bold" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    href="/uslugi"
                    onClick={onClose}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#26890d] hover:text-[#1f6b0a] transition-colors font-medium"
                  >
                    Nie wiesz czego szukasz? Zobacz wszystkie usługi
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              )}

              {/* No results */}
              {showNoResults && (
                <div className="px-6 py-12 text-center">
                  <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-black/[0.04] mb-4">
                    <MagnifyingGlassMinus size={26} weight="regular" className="text-black/40" />
                  </div>
                  <p className="text-[#222328] font-medium">
                    Nic nie znaleźliśmy dla « {query} »
                  </p>
                  <p className="mt-2 text-sm text-black/55 max-w-[420px] mx-auto">
                    Sprawdź pisownię lub wpisz mniej szczegółowo. Albo{" "}
                    <Link
                      href="/kontakt"
                      onClick={onClose}
                      className="text-[#26890d] hover:underline font-medium"
                    >
                      napisz do nas
                    </Link>{" "}
                    — pomożemy znaleźć właściwą usługę.
                  </p>
                </div>
              )}

              {/* Grouped results */}
              {!showEmpty && grouped.length > 0 && (
                <div className="py-2">
                  {grouped.map((group) => {
                    const meta = TYPE_META[group.type];
                    return (
                      <div key={group.type} className="mb-1 last:mb-0">
                        <div className="px-5 pt-3 pb-1.5 flex items-center gap-2">
                          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-black/40">
                            {meta.label}
                          </p>
                          <span className="text-[11px] font-mono text-black/30">·</span>
                          <span className="text-[11px] font-mono text-black/40">
                            {group.items.length}
                          </span>
                        </div>
                        <ul className="px-2">
                          {group.items.map((r) => {
                            const idx = flat.findIndex((x) => x.href === r.href);
                            const isActive = idx === activeIdx;
                            const Icon = meta.Icon;
                            return (
                              <li key={r.href}>
                                <button
                                  type="button"
                                  onMouseEnter={() => setActiveIdx(idx)}
                                  onClick={() => navigateTo(r.href, query)}
                                  className={[
                                    "group w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                                    isActive
                                      ? "bg-[#26890d]/12 ring-1 ring-[#26890d]/20"
                                      : "hover:bg-[#26890d]/8",
                                  ].join(" ")}
                                >
                                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-black/8 text-[#26890d]">
                                    <Icon size={14} weight="bold" />
                                  </span>
                                  <span className="flex-1 min-w-0">
                                    <span className="block text-[0.95rem] font-medium text-[#222328] truncate">
                                      {highlight(r.title, query)}
                                    </span>
                                    {r.excerpt && (
                                      <motion.span
                                        initial={false}
                                        animate={{ opacity: isActive ? 1 : 0.7 }}
                                        className="block text-[0.82rem] text-black/55 truncate mt-0.5"
                                      >
                                        {r.excerpt}
                                      </motion.span>
                                    )}
                                  </span>
                                  <ArrowRight
                                    size={16}
                                    weight="bold"
                                    className={[
                                      "shrink-0 mt-1.5 transition-all",
                                      isActive
                                        ? "text-[#26890d] translate-x-0.5"
                                        : "text-black/25 group-hover:text-[#26890d] group-hover:translate-x-0.5",
                                    ].join(" ")}
                                  />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-black/8 px-5 py-3 flex items-center justify-between bg-black/[0.015]">
              <div className="flex items-center gap-3 text-[11px] text-black/55">
                <span className="inline-flex items-center gap-1">
                  <kbd className="border border-black/15 rounded px-1 py-0.5 font-mono text-[10px]">↑</kbd>
                  <kbd className="border border-black/15 rounded px-1 py-0.5 font-mono text-[10px]">↓</kbd>
                  Nawigacja
                </span>
                <span className="text-black/20">·</span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="border border-black/15 rounded px-1 py-0.5 font-mono text-[10px]">Enter</kbd>
                  Otwórz
                </span>
                <span className="text-black/20 hidden sm:inline">·</span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  <kbd className="border border-black/15 rounded px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
                  Zamknij
                </span>
              </div>
              <Link
                href="/blog"
                onClick={onClose}
                className="text-[11px] font-medium text-[#26890d] hover:text-[#1f6b0a] inline-flex items-center gap-1"
              >
                Zaawansowana wyszukiwarka
                <ArrowRight size={11} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
