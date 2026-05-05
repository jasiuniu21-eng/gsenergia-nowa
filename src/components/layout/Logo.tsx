import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="GS Energia — strona główna"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <Image
        src="/logos/gs-energia-mark.png"
        alt=""
        width={420}
        height={360}
        priority
        className="h-28 w-auto shrink-0 transition-transform duration-300 group-hover:scale-[1.04]"
      />
    </Link>
  );
}
