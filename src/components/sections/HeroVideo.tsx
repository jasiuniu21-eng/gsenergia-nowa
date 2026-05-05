"use client";

/**
 * Hero background video — looping animation that replaces the canvas
 * "energy flower" experiment. Optimized for low CPU and instant first
 * paint via the poster frame.
 */
export function HeroVideo() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/video/drzewo-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-95"
      >
        <source src="/video/drzewo.webm" type="video/webm" />
        <source src="/video/drzewo.mp4" type="video/mp4" />
      </video>

      {/* Subtle dark overlay so text overlay stays readable */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
        aria-hidden="true"
      />
    </div>
  );
}
