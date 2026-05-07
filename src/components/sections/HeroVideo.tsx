"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    const mask = maskRef.current;
    if (!v || !mask) return;

    v.muted = true;
    v.playsInline = true;
    // No loop — we handle restart manually to crossfade
    v.loop = false;
    v.load();

    const FADE_BEFORE_END = 0.9; // seconds before end to start fade-out
    const FADE_DURATION = 800;   // ms

    let rafId: number;
    let fading = false;

    function tick() {
      if (!v || !mask) return;
      const remaining = v.duration - v.currentTime;

      if (!fading && remaining <= FADE_BEFORE_END) {
        fading = true;
        // Fade mask IN (black overlay)
        mask.style.transition = `opacity ${FADE_DURATION}ms ease`;
        mask.style.opacity = "1";

        setTimeout(() => {
          if (!v) return;
          v.currentTime = 0;
          v.play().catch(() => undefined);
          // Fade mask OUT
          mask.style.transition = `opacity ${FADE_DURATION}ms ease`;
          mask.style.opacity = "0";
          setTimeout(() => { fading = false; }, FADE_DURATION);
        }, FADE_DURATION);
      }

      rafId = requestAnimationFrame(tick);
    }

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => { rafId = requestAnimationFrame(tick); })
         .catch(() => {
           const onInteract = () => {
             v.play()
               .then(() => { rafId = requestAnimationFrame(tick); })
               .catch(() => undefined);
             window.removeEventListener("pointerdown", onInteract);
           };
           window.addEventListener("pointerdown", onInteract, { once: true });
         });
      }
    };

    tryPlay();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/video/hero-poster.jpg"
        className="w-full h-full object-cover"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Permanent dark overlay for text legibility */}
      <div className="absolute inset-0 bg-[oklch(0.14_0.03_150)]/60" />

      {/* Loop crossfade mask — starts transparent, goes opaque at loop point */}
      <div
        ref={maskRef}
        className="absolute inset-0 bg-[#06100a]"
        style={{ opacity: 0, transition: "opacity 0.8s ease" }}
      />
    </div>
  );
}
