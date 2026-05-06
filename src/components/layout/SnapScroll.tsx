"use client";

import { useEffect } from "react";

/**
 * fullpage.js-style section scrolling. Intercepts wheel/keyboard events and
 * programmatically scrolls to the next/previous section with smooth animation.
 * Disables on mobile/tablet (< lg) and for prefers-reduced-motion users.
 */
export function SnapScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const HEADER_OFFSET = 88; // matches Nav height
    const ANIM_LOCK_MS = 900; // matches scroll-behavior: smooth duration roughly

    let isAnimating = false;
    let lockTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastWheelTs = 0;

    const isLgUp = () => window.matchMedia("(min-width: 1024px)").matches;

    const getSnapTargets = (): HTMLElement[] => {
      // Top-level sections + inner data-snap-inner anchors
      return Array.from(
        document.querySelectorAll<HTMLElement>(
          "main > section, [data-snap-inner]",
        ),
      ).filter((el) => el.offsetParent !== null || el.getBoundingClientRect().height > 0);
    };

    const findCurrentIndex = (targets: HTMLElement[]): number => {
      const probe = window.scrollY + HEADER_OFFSET + 4;
      for (let i = targets.length - 1; i >= 0; i--) {
        // For absolute-positioned data-snap-inner elements use offsetTop relative to offsetParent
        const el = targets[i];
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) return i;
      }
      return 0;
    };

    const scrollTo = (index: number) => {
      const targets = getSnapTargets();
      if (index < 0 || index >= targets.length) return;
      const target = targets[index];
      const top = target.getBoundingClientRect().top + window.scrollY - 0;
      isAnimating = true;
      window.scrollTo({ top, behavior: "smooth" });
      if (lockTimeout) clearTimeout(lockTimeout);
      lockTimeout = setTimeout(() => {
        isAnimating = false;
      }, ANIM_LOCK_MS);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isLgUp()) return;
      // Don't hijack scroll inside scrollable inner content (textareas, modals)
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-no-snap], textarea, [role=dialog], [role=combobox]")) return;

      const now = performance.now();
      // Inertial wheel events on Mac fire many times — debounce
      if (now - lastWheelTs < 100 && isAnimating) {
        e.preventDefault();
        return;
      }
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 6) return; // tiny noise

      const targets = getSnapTargets();
      if (targets.length === 0) return;
      const current = findCurrentIndex(targets);
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = current + dir;
      if (next < 0 || next >= targets.length) return;

      e.preventDefault();
      lastWheelTs = now;
      scrollTo(next);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isLgUp()) return;
      const targets = getSnapTargets();
      if (targets.length === 0) return;
      const current = findCurrentIndex(targets);

      let next = current;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") next = current + 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp") next = current - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = targets.length - 1;
      else return;

      if (next < 0 || next >= targets.length) return;
      e.preventDefault();
      scrollTo(next);
    };

    // Touch handling for trackpads/swipe on devices that emit wheel events also
    let touchStartY: number | null = null;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isLgUp()) return;
      if (touchStartY == null) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - endY;
      touchStartY = null;
      if (Math.abs(delta) < 50) return;
      if (isAnimating) return;
      const targets = getSnapTargets();
      const current = findCurrentIndex(targets);
      const next = current + (delta > 0 ? 1 : -1);
      if (next < 0 || next >= targets.length) return;
      scrollTo(next);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (lockTimeout) clearTimeout(lockTimeout);
    };
  }, []);

  return null;
}
