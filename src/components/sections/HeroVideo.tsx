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
    // Freeze on last frame instead of looping
    const onEnded = () => {
      // Hold the final frame
      if (v.duration && Number.isFinite(v.duration)) {
        v.currentTime = Math.max(0, v.duration - 0.05);
      }
      v.pause();
    };
    v.addEventListener("ended", onEnded);
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
    return () => {
      v.removeEventListener("ended", onEnded);
    };
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
        playsInline
        preload="auto"
        poster="/video/drzewo-poster.jpg"
        className="w-full h-full object-contain"
        style={{ objectPosition: "calc(50% - 30px) center" }}
      >
        <source src="/video/drzewo.mp4" type="video/mp4" />
        <source src="/video/drzewo.webm" type="video/webm" />
      </video>
    </div>
  );
}
