"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, X, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { SearchResult } from "@/app/api/search/route";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Escape key closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const search = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) { setResults([]); setLoading(false); return; }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }, 250);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    search(val);
  };

  const typeLabel = (type: string) =>
    type === "blog" ? "Blog" : "Usługa";

  const typeColor = (type: string) =>
    type === "blog"
      ? "bg-blue-100 text-blue-700"
      : "bg-green-100 text-green-700";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col items-center"
          onClick={onClose}
        >
          {/* Blurred backdrop with gradient */}
          <div className="absolute inset-0 backdrop-blur-xl bg-[oklch(0.12_0.04_148/0.75)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.05_148/0.6)] via-transparent to-[oklch(0.08_0.03_148/0.8)] pointer-events-none" />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl mt-[15vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 rounded-2xl bg-white shadow-[0_20px_60px_oklch(0.08_0.04_148/0.4)] px-5 py-4">
              <MagnifyingGlass
                size={22}
                weight="bold"
                className={loading ? "text-[color:var(--c-brand-500)] animate-pulse" : "text-[color:var(--c-fg-muted)]"}
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Szukaj usług, artykułów, tematów…"
                className="flex-1 bg-transparent text-[color:var(--c-ink-900)] text-lg placeholder:text-[color:var(--c-fg-subtle)] outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Zamknij wyszukiwanie"
                className="text-[color:var(--c-fg-subtle)] hover:text-[color:var(--c-fg)] transition-colors"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Results */}
            <AnimatePresence mode="popLayout">
              {results.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 rounded-2xl bg-white shadow-[0_20px_60px_oklch(0.08_0.04_148/0.3)] overflow-hidden divide-y divide-[color:var(--c-border)]"
                >
                  {results.map((r) => (
                    <motion.li
                      key={r.href}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Link
                        href={r.href}
                        onClick={onClose}
                        className="group flex items-start gap-4 px-5 py-4 hover:bg-[color:var(--c-brand-50)] transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${typeColor(r.type)}`}>
                              {typeLabel(r.type)}
                            </span>
                          </div>
                          <p className="text-[0.98rem] font-medium text-[color:var(--c-ink-900)] truncate">
                            {r.title}
                          </p>
                          <p className="text-sm text-[color:var(--c-fg-muted)] mt-0.5 line-clamp-1">
                            {r.excerpt}
                          </p>
                        </div>
                        <ArrowRight
                          size={18}
                          weight="bold"
                          className="shrink-0 mt-1 text-[color:var(--c-fg-subtle)] transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--c-brand-700)]"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {query.length >= 2 && results.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 rounded-2xl bg-white shadow-[0_20px_60px_oklch(0.08_0.04_148/0.3)] px-5 py-6 text-center text-[color:var(--c-fg-muted)]"
                >
                  Brak wyników dla „{query}"
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-4 text-center text-xs text-white/40">
              Naciśnij <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">Esc</kbd> aby zamknąć
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
