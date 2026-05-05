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

  // Soft mask hides any color-space rendering mismatch between video and CSS bg
  const fadeMask =
    "linear-gradient(to bottom, transparent 0%, #000 12%, #000 100%), " +
    "linear-gradient(to right,  transparent 0%, #000 6%,  #000 94%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden flex items-end justify-center"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/video/drzewo-poster.jpg"
        className="w-full h-full object-contain object-bottom"
        style={{
          maskImage: fadeMask,
          WebkitMaskImage: fadeMask,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <source src="/video/drzewo.mp4" type="video/mp4" />
        <source src="/video/drzewo.webm" type="video/webm" />
      </video>
    </div>
  );
}
