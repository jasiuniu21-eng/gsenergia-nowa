import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

/**
 * Small floating pill that lets the client jump back to the /kierunki hub
 * from inside any variant preview. Rendered top-right on desktop,
 * bottom-right on mobile.
 */
export function BackToHub({
  variantLabel,
  tone = "light",
}: {
  variantLabel: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Link
      href="/kierunki"
      aria-label="Wróć do porównania kierunków"
      className={[
        "fixed z-50 top-4 right-4 sm:top-6 sm:right-6",
        "inline-flex items-center gap-2 rounded-full px-3.5 py-2",
        "text-[11px] uppercase tracking-[0.16em] font-medium",
        "backdrop-blur-md transition-all duration-300",
        "hover:px-4 hover:gap-3",
        dark
          ? "bg-white/10 text-white/90 border border-white/15 hover:bg-white/15"
          : "bg-black/70 text-white/95 border border-white/10 hover:bg-black/85",
      ].join(" ")}
    >
      <ArrowLeft size={12} weight="bold" />
      <span className="hidden sm:inline">Kierunki</span>
      <span className="sm:hidden">Wróć</span>
      <span
        className={[
          "ml-1 pl-2 border-l font-mono tabular-nums tracking-normal",
          dark ? "border-white/20" : "border-white/20",
        ].join(" ")}
      >
        {variantLabel}
      </span>
    </Link>
  );
}
