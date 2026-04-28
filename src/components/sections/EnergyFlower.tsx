"use client";

import { useEffect, useRef } from "react";

/**
 * Energy Bouquet — canvas-based typographic bloom (the GS Energia hero from gsenergia-hero.html).
 * Draws a stem+flower bouquet silhouette on an offscreen canvas, samples pixels,
 * places characters where pixels exist, then "water-fills" them bottom-up with random char swaps.
 */
export function EnergyFlower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const hero = cv.parentElement;
    if (!hero) return;

    let rafId: number | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    function build(W: number, H: number) {
      if (!cv) return;
      const ctx = cv.getContext("2d");
      if (!ctx) return;

      const oc = document.createElement("canvas");
      oc.width = W;
      oc.height = H;
      const ox = oc.getContext("2d");
      if (!ox) return;

      ox.fillStyle = "#000";
      ox.strokeStyle = "#000";
      ox.lineCap = "round";
      ox.lineJoin = "round";

      const scale = Math.min(W, H) / 700;
      const BX = W * 0.5;       // base X (root)
      const BY = H * 0.95;      // base Y (root level)

      // ── Thick trunk ──
      ox.lineWidth = 60 * scale;
      ox.lineCap = "round";
      ox.beginPath();
      ox.moveTo(BX, BY);
      ox.quadraticCurveTo(BX - 6 * scale, BY - 130 * scale, BX, BY - 250 * scale);
      ox.stroke();

      // ── Lightning bolt on trunk ──
      const TRUNK_MID_X = BX;
      const TRUNK_MID_Y = BY - 120 * scale;
      const bs = 90 * scale;
      ox.beginPath();
      ox.moveTo(TRUNK_MID_X + bs * 0.18, TRUNK_MID_Y - bs * 0.85);
      ox.lineTo(TRUNK_MID_X - bs * 0.42, TRUNK_MID_Y + bs * 0.05);
      ox.lineTo(TRUNK_MID_X - bs * 0.05, TRUNK_MID_Y + bs * 0.05);
      ox.lineTo(TRUNK_MID_X - bs * 0.18, TRUNK_MID_Y + bs * 0.85);
      ox.lineTo(TRUNK_MID_X + bs * 0.42, TRUNK_MID_Y - bs * 0.05);
      ox.lineTo(TRUNK_MID_X + bs * 0.05, TRUNK_MID_Y - bs * 0.05);
      ox.closePath();
      ox.fill();

      // ── Recursive branches ──
      function branch(
        x: number, y: number,
        angle: number, len: number, width: number, depth: number
      ) {
        if (depth === 0 || len < 8 * scale) return;
        const ex = x + Math.cos(angle) * len;
        const ey = y + Math.sin(angle) * len;
        if (ox) {
          ox.lineWidth = Math.max(1.5 * scale, width);
          ox.beginPath();
          ox.moveTo(x, y);
          // gentle curve
          const cpx = x + Math.cos(angle) * len * 0.5 + Math.sin(angle) * 8 * scale;
          const cpy = y + Math.sin(angle) * len * 0.5 - Math.cos(angle) * 8 * scale;
          ox.quadraticCurveTo(cpx, cpy, ex, ey);
          ox.stroke();
        }
        // Two child branches (left/right)
        branch(ex, ey, angle - 0.45 - Math.random() * 0.18, len * 0.72, width * 0.65, depth - 1);
        branch(ex, ey, angle + 0.45 + Math.random() * 0.18, len * 0.72, width * 0.65, depth - 1);
        // Sometimes a middle branch
        if (depth > 2 && Math.random() < 0.5) {
          branch(ex, ey, angle + (Math.random() - 0.5) * 0.3, len * 0.55, width * 0.5, depth - 1);
        }
      }

      // Top of trunk position
      const TX = BX, TY = BY - 250 * scale;
      // Seed with a deterministic feel — start big branches
      [-Math.PI / 2, -Math.PI / 2 - 0.7, -Math.PI / 2 + 0.7,
       -Math.PI / 2 - 1.3, -Math.PI / 2 + 1.3].forEach((a) => {
        branch(TX, TY, a, 110 * scale, 14 * scale, 5);
      });

      // ── Foliage clusters (filled circles for a leafy canopy silhouette) ──
      const clusters: [number, number, number][] = []; // x, y, r
      function spawnLeaves(x: number, y: number, angle: number, len: number, depth: number) {
        if (depth === 0 || len < 8 * scale) return;
        const ex = x + Math.cos(angle) * len;
        const ey = y + Math.sin(angle) * len;
        // Add leaf cluster at endpoints (tips)
        if (depth <= 2) {
          const r = (28 + Math.random() * 20) * scale;
          clusters.push([ex, ey, r]);
        }
        spawnLeaves(ex, ey, angle - 0.45, len * 0.72, depth - 1);
        spawnLeaves(ex, ey, angle + 0.45, len * 0.72, depth - 1);
      }
      [-Math.PI / 2, -Math.PI / 2 - 0.7, -Math.PI / 2 + 0.7,
       -Math.PI / 2 - 1.3, -Math.PI / 2 + 1.3].forEach((a) => {
        spawnLeaves(TX, TY, a, 110 * scale, 5);
      });
      clusters.forEach(([x, y, r]) => {
        ox.beginPath();
        ox.arc(x, y, r, 0, Math.PI * 2);
        ox.fill();
      });

      // (sun removed)
      const SX = -1000, SY = -1000, SR = 0;

      // ── Sample grid ──
      const id = ox.getImageData(0, 0, W, H).data;
      const inside = (x: number, y: number) => {
        const xi = Math.round(x);
        const yi = Math.round(y);
        if (xi < 0 || xi >= W || yi < 0 || yi >= H) return false;
        return id[(yi * W + xi) * 4 + 3] > 40;
      };

      const STEP_Y = Math.max(10, Math.round(Math.min(W, H) / 80));
      const chars = [
        "audyt", "ROI", "kWh", "MWh", "GWh",
        "ISO", "OZE", "PV", "BESS", "EMS", "ESG",
        "moc", "zysk", "zwrot", "efekt",
        "−15%", "−20%", "−30%", "↓CO₂", "↑ROI",
        "Net0", "CSRD", "audit",
      ];
      type Particle = {
        x: number; y: number;
        hue: number; sat: number; lit: number; sz: number;
        ch: string; nextSwap: number; revealAt: number;
      };
      const all: Particle[] = [];

      // measuring helper — uses ctx for accurate word widths
      const measure = (word: string, sz: number) => {
        if (!ctx) return word.length * sz * 0.55;
        ctx.save();
        ctx.font = `500 ${sz}px Inter, monospace`;
        const w = ctx.measureText(word).width;
        ctx.restore();
        return w;
      };

      for (let y = 0; y < H; y += STEP_Y) {
        let x = 0;
        while (x < W) {
          if (!inside(x, y)) { x += 8; continue; }
          let hue = 128, sat: number, lit: number, sz: number;
          // Bolt zone — yellow, on the trunk
          const dxB = x - TRUNK_MID_X;
          const dyB = y - TRUNK_MID_Y;
          const inBolt = Math.abs(dxB) < bs * 0.5 && Math.abs(dyB) < bs * 0.95;
          if (inBolt) {
            // Lightning bolt — Deloitte green for contrast on white
            hue = 108 + Math.random() * 4;
            sat = 82 + Math.random() * 8;
            lit = 30 + Math.random() * 10;
            sz = 7 + Math.random() * 2;
          } else if (y > BY - 250 * scale) {
            // Trunk — soft warm gray on white
            hue = 0;
            sat = 0;
            lit = 70 + Math.random() * 12;
            sz = 6 + Math.random() * 1.5;
          } else {
            // Canopy — pastel mint → soft lime on white
            const t = (BY - 250 * scale - y) / (BY - 250 * scale - H * 0.05);
            hue = 110 + t * 6;
            sat = 30 + Math.random() * 22;
            lit = 60 + t * 14 + Math.random() * 10;
            sz = 7 + Math.random() * 2;
          }
          const word = chars[Math.floor(Math.random() * chars.length)];
          const wpx = measure(word, sz);
          // place anchor at the word center
          const cx = x + wpx / 2;
          // only commit if entire word still inside silhouette
          if (inside(cx, y)) {
            all.push({
              x: cx,
              y,
              hue, sat, lit, sz,
              ch: word,
              nextSwap: 0,
              revealAt: 0,
            });
          }
          x += wpx + 3; // gap between words
        }
      }

      // ── Water fill (bottom-up — tree grows from roots) ──
      let maxY = 0, minY = 99999;
      all.forEach((p) => {
        if (p.y > maxY) maxY = p.y;
        if (p.y < minY) minY = p.y;
      });
      const TOTAL = 3600, FADE = 200;
      all.forEach((p) => {
        const norm = 1 - (p.y - minY) / (maxY - minY);
        p.revealAt = norm * TOTAL + (Math.random() - 0.5) * 140;
        if (p.revealAt < 0) p.revealAt = 0;
      });

      // Set static text properties once (no per-particle save/restore)
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Sort particles by reveal time so we can short-circuit the inner loop
      all.sort((a, b) => a.revealAt - b.revealAt);
      const lastReveal = all.length ? all[all.length - 1].revealAt + FADE : 0;

      // Pre-bake the FINAL state to an offscreen canvas — once the build is
      // done we just blit this image instead of redrawing thousands of glyphs.
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = W;
      finalCanvas.height = H;
      const fctx = finalCanvas.getContext("2d");
      let finalReady = false;

      let t0: number | null = null;
      let firstActive = 0;
      function frame(ts: number) {
        if (!ctx) return;
        if (!t0) t0 = ts;
        const el = ts - t0;

        // Once the build animation is fully done, blit the pre-baked image
        // and stop scheduling new frames — saves CPU/GPU on idle.
        if (el > lastReveal + 50) {
          if (!finalReady && fctx) {
            fctx.textAlign = "center";
            fctx.textBaseline = "middle";
            fctx.globalAlpha = 0.87;
            for (const p of all) {
              fctx.font = `500 ${p.sz}px Inter, monospace`;
              fctx.fillStyle = `hsl(${p.hue},${p.sat}%,${p.lit}%)`;
              fctx.fillText(p.ch, p.x, p.y);
            }
            finalReady = true;
          }
          ctx.clearRect(0, 0, W, H);
          ctx.drawImage(finalCanvas, 0, 0);
          return; // stop the loop
        }

        ctx.clearRect(0, 0, W, H);
        // Skip particles whose reveal hasn't started yet using a moving cursor
        while (firstActive < all.length && all[firstActive].revealAt > el) firstActive++;
        for (let i = 0; i < all.length; i++) {
          const p = all[i];
          const since = el - p.revealAt;
          if (since < 0) continue; // sorted, but keep guard
          const alpha = since < FADE ? (since / FADE) * 0.87 : 0.87;
          ctx.globalAlpha = alpha;
          ctx.font = `500 ${p.sz}px Inter, monospace`;
          ctx.fillStyle = `hsl(${p.hue},${p.sat}%,${p.lit}%)`;
          ctx.fillText(p.ch, p.x, p.y);
        }
        rafId = requestAnimationFrame(frame);
      }
      rafId = requestAnimationFrame(frame);
    }

    function init() {
      if (!cv || !hero) return;
      const W = hero.offsetWidth || 900;
      const H = hero.offsetHeight || 600;
      cv.width = W;
      cv.height = H;
      build(W, H);
    }

    setTimeout(init, 80);

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        init();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
