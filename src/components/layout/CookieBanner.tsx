"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Gear, X } from "@phosphor-icons/react/dist/ssr";

const STORAGE_KEY = "gse_cookie_consent_v1";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: string;
};

type ConsentCategory = "analytics" | "marketing";

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (
      parsed &&
      parsed.necessary === true &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeConsent(c: Omit<Consent, "necessary" | "ts">) {
  const payload: Consent = {
    necessary: true,
    analytics: c.analytics,
    marketing: c.marketing,
    ts: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(
      new CustomEvent("gse:consent-change", { detail: payload }),
    );
  } catch {
    /* noop */
  }
}

export function useConsent(category: ConsentCategory): boolean | null {
  const [value, setValue] = useState<boolean | null>(null);

  useEffect(() => {
    const sync = () => {
      const c = readConsent();
      setValue(c ? c[category] : null);
    };
    sync();
    const onChange = () => sync();
    window.addEventListener("gse:consent-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("gse:consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [category]);

  return value;
}

type ToggleProps = {
  checked: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  label: string;
};

function Toggle({ checked, onChange, disabled, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#26890d]",
        disabled
          ? "bg-[#26890d]/30 cursor-not-allowed opacity-80"
          : checked
            ? "bg-[#26890d] hover:bg-[#1f7a0a]"
            : "bg-zinc-300 hover:bg-zinc-400",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-200",
          checked ? "translate-x-[22px]" : "translate-x-[2px]",
        ].join(" ")}
      />
    </button>
  );
}

type Mode = "compact" | "preferences";

export function CookieBanner() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("compact");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  // Mount: show banner only if no decision yet
  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  // Focus the description on appearance (non-hijacking)
  useEffect(() => {
    if (visible && descRef.current) {
      descRef.current.focus();
    }
  }, [visible]);

  // Esc closes preferences panel
  useEffect(() => {
    if (!visible || mode !== "preferences") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("compact");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, mode]);

  const acceptAll = useCallback(() => {
    writeConsent({ analytics: true, marketing: true });
    setVisible(false);
  }, []);

  const rejectAll = useCallback(() => {
    writeConsent({ analytics: false, marketing: false });
    setVisible(false);
  }, []);

  const savePrefs = useCallback(() => {
    writeConsent({ analytics, marketing });
    setVisible(false);
  }, [analytics, marketing]);

  if (!visible) return null;

  return (
    <>
      <AnimatePresence>
        {mode === "preferences" && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setMode("compact")}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        role="region"
        aria-label="Cookie consent"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 lg:bottom-6 max-w-[1200px] mx-auto z-50"
      >
        <div className="rounded-2xl bg-white text-[#222328] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.30)] ring-1 ring-black/8 p-6 md:p-7">
          <AnimatePresence mode="wait" initial={false}>
            {mode === "compact" ? (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={20} weight="duotone" className="text-[#26890d] shrink-0" />
                    <h2 className="font-display text-[1.05rem] tracking-[-0.01em] font-medium">
                      Twoja prywatność jest dla nas ważna
                    </h2>
                  </div>
                  <p
                    ref={descRef}
                    tabIndex={-1}
                    className="text-sm text-zinc-600 leading-relaxed outline-none max-w-[68ch]"
                  >
                    Używamy plików cookies, aby strona działała poprawnie i abyśmy mogli rozumieć,
                    jak z niej korzystasz. Niektóre są niezbędne, inne pomagają nam ulepszać serwis.
                    Możesz wybrać, na które się zgadzasz.{" "}
                    <Link
                      href="/polityka-prywatnosci"
                      className="text-[#26890d] underline-offset-2 hover:underline"
                    >
                      Więcej w naszej polityce prywatności
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 lg:shrink-0">
                  <button
                    type="button"
                    onClick={() => setMode("preferences")}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:text-[#26890d] transition-colors"
                  >
                    <Gear size={16} weight="bold" />
                    Dostosuj ustawienia
                    <span aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium border border-zinc-300 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
                  >
                    Tylko niezbędne
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-[#26890d] text-white hover:bg-[#1f7a0a] active:translate-y-[1px] transition-colors shadow-[0_8px_20px_-8px_rgba(38,137,13,0.55)]"
                  >
                    Akceptuję wszystkie
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="prefs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Gear size={20} weight="duotone" className="text-[#26890d] shrink-0" />
                      <h2 className="font-display text-[1.1rem] tracking-[-0.01em] font-medium">
                        Ustawienia plików cookies
                      </h2>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-[68ch]">
                      Wybierz kategorie, na które wyrażasz zgodę. Możesz zmienić te ustawienia
                      w każdej chwili.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMode("compact")}
                    aria-label="Zamknij ustawienia"
                    className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </div>

                <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
                  <li className="flex items-start justify-between gap-6 py-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-zinc-900">Niezbędne</h3>
                        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500">
                          Zawsze włączone
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed max-w-[60ch]">
                        Pliki cookies wymagane do działania serwisu (sesja, bezpieczeństwo,
                        preferencje językowe). Nie można ich wyłączyć.
                      </p>
                    </div>
                    <Toggle checked disabled label="Niezbędne (zawsze włączone)" />
                  </li>

                  <li className="flex items-start justify-between gap-6 py-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-900">Analityczne</h3>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed max-w-[60ch]">
                        Pomagają nam zrozumieć, jak korzystasz z serwisu (np. Google Analytics).
                        Dane są anonimowe i służą do ulepszania strony.
                      </p>
                    </div>
                    <Toggle
                      checked={analytics}
                      onChange={setAnalytics}
                      label="Analityczne pliki cookies"
                    />
                  </li>

                  <li className="flex items-start justify-between gap-6 py-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-900">Marketingowe</h3>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed max-w-[60ch]">
                        Pozwalają na wyświetlanie spersonalizowanych reklam i mierzenie skuteczności
                        kampanii.
                      </p>
                    </div>
                    <Toggle
                      checked={marketing}
                      onChange={setMarketing}
                      label="Marketingowe pliki cookies"
                    />
                  </li>
                </ul>

                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setMode("compact")}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium border border-zinc-300 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
                  >
                    Tylko niezbędne
                  </button>
                  <button
                    type="button"
                    onClick={savePrefs}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-[#26890d] text-white hover:bg-[#1f7a0a] active:translate-y-[1px] transition-colors shadow-[0_8px_20px_-8px_rgba(38,137,13,0.55)]"
                  >
                    Zapisz wybór
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export default CookieBanner;
