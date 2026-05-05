"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video — looping animation.
 * Forces load + play in useEffect to work around browsers that ignore
 * autoplay when preload is gated.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Ensure muted (required for autoplay) and trigger load+play
    v.muted = true;
    v.playsInline = true;
    v.load();
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          // Autoplay rejected — try again on next user interaction
          const onInteract = () => {
            v.play().catch(() => undefined);
            window.removeEventListener("pointerdown", onInteract);
          };
          window.addEventListener("pointerdown", onInteract, { once: true });
        });
      }
    };
    tryPlay();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/video/drzewo-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/drzewo.mp4" type="video/mp4" />
        <source src="/video/drzewo.webm" type="video/webm" />
      </video>

      {/* Subtle dark overlay so text overlay stays readable */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
        aria-hidden="true"
      />
    </div>
  );
}
