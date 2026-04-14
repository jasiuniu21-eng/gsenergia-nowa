import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="GS Energia — strona główna"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M22 12.2c-1.4-1.5-3.4-2.5-5.8-2.5-4.4 0-8 3.5-8 7.8 0 4.3 3.6 7.8 8 7.8 4.3 0 7.9-3.3 8-7.5h-7"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-[1.25rem] leading-none tracking-[-0.02em]">
        GS <span className="text-[color:var(--c-accent)]">Energia</span>
      </span>
    </Link>
  );
}
