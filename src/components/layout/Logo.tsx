import Image from "next/image";
import Link from "next/link";

/**
 * Brand logo lockup = mark (green leaf, PNG) + wordmark "GS ENERGIA"
 * The wordmark is rendered as text (Inter Black) so it stays crisp at any
 * size, supports full Polish typography, and never goes blurry.
 *
 * Two color variants via the `variant` prop:
 *   - "dark"  → black wordmark (default — for light backgrounds)
 *   - "light" → white wordmark (for dark backgrounds)
 */
export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const wordmarkColor =
    variant === "light" ? "text-white" : "text-[#0F2A1F]";

  const mark =
    variant === "light"
      ? "/logos/gs-energia-white.png"
      : "/logos/gs-energia-mark.png";

  return (
    <Link
      href="/"
      aria-label="GS Energia — strona główna"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <Image
        src={mark}
        alt=""
        width={180}
        height={180}
        priority
        className="h-10 w-auto shrink-0 transition-transform duration-300 group-hover:scale-[1.04]"
      />
      <span
        className={`text-[1.05rem] font-bold tracking-[0.04em] uppercase leading-none whitespace-nowrap ${wordmarkColor}`}
      >
        GS&nbsp;<span style={{ color: "#86bc25" }}>Energia</span>
      </span>
    </Link>
  );
}
