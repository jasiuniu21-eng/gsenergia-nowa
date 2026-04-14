"use client";
/**
 * Organic mesh gradient backdrop for Hero.
 * Isolated Client Component, pointer-events:none, single GPU layer.
 */
export function MeshBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Top-right brand blob */}
      <div
        className="absolute -top-40 -right-32 size-[680px] rounded-full opacity-[0.55] blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.12 130 / 0.9), transparent 70%)",
          animation: "mesh-drift-a 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Mid-left warm blob */}
      <div
        className="absolute top-1/3 -left-40 size-[520px] rounded-full opacity-[0.35] blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.86 0.11 75 / 0.75), transparent 70%)",
          animation: "mesh-drift-b 24s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Bottom-right forest tint */}
      <div
        className="absolute -bottom-40 right-10 size-[560px] rounded-full opacity-[0.35] blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.74 0.13 145 / 0.7), transparent 70%)",
          animation: "mesh-drift-c 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Fine grid overlay — engineering drawing feel */}
      <svg
        className="absolute inset-0 size-full opacity-[0.055]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Soft bottom fade into page */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--c-bg))",
        }}
      />

      <style>{`
        @keyframes mesh-drift-a {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50%      { transform: translate3d(-40px, 30px, 0) scale(1.08); }
        }
        @keyframes mesh-drift-b {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50%      { transform: translate3d(40px, -25px, 0) scale(1.12); }
        }
        @keyframes mesh-drift-c {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50%      { transform: translate3d(-30px, -20px, 0) scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
