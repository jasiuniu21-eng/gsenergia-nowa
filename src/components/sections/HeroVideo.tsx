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
      className="pointer-events-none select-none absolute inset-0 overflow-hidden flex items-center justify-center"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/video/drzewo-poster.jpg"
        className="w-full h-full object-contain"
        style={{ objectPosition: "center center" }}
      >
        <source src="/video/drzewo.webm" type="video/webm" />
        <source src="/video/drzewo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
