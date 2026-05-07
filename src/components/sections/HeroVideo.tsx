"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.load();
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
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
        muted
        loop
        playsInline
        preload="auto"
        poster="/video/hero-poster.jpg"
        className="w-full h-full object-cover"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay so text stays readable over any video content */}
      <div className="absolute inset-0 bg-[oklch(0.14_0.03_150)]/60" />
    </div>
  );
}
