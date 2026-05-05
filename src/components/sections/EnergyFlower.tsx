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

      // ── Blossom-tree silhouette (5 clover-blooms on curving stems) ──
      // Each blossom = 4-leaf clover (4 overlapping circles) packed with digits + ⚡

      type Blossom = { cx: number; cy: number; r: number };
      const blossoms: Blossom[] = [
        // 3 top blossoms
        { cx: BX - 220 * scale, cy: BY - 410 * scale, r: 80 * scale },
        { cx: BX +  10 * scale, cy: BY - 470 * scale, r: 90 * scale },
        { cx: BX + 220 * scale, cy: BY - 380 * scale, r: 80 * scale },
        // 2 lower blossoms
        { cx: BX - 200 * scale, cy: BY - 220 * scale, r: 70 * scale },
        { cx: BX + 240 * scale, cy: BY - 200 * scale, r: 65 * scale },
      ];

      // Base point (where all stems converge)
      const BASE_X = BX;
      const BASE_Y = BY - 30 * scale;

      // Curved stems from base to each blossom
      ox.lineWidth = 12 * scale;
      ox.lineCap = "round";
      ox.lineJoin = "round";
      blossoms.forEach((b, i) => {
        // S-curve via two control points (cubic-like via two quadratics)
        const dx = b.cx - BASE_X;
        const swing = (i % 2 === 0 ? 1 : -1) * 40 * scale;
        const cpx1 = BASE_X + dx * 0.15 + swing * 0.6;
        const cpy1 = BASE_Y + (b.cy - BASE_Y) * 0.55;
        const cpx2 = BASE_X + dx * 0.65 - swing * 0.4;
        const cpy2 = BASE_Y + (b.cy - BASE_Y) * 0.85;
        ox.beginPath();
        ox.moveTo(BASE_X, BASE_Y);
        ox.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, b.cx, b.cy);
        ox.stroke();
      });

      // Small leaf-circles along each stem (decorative offshoots)
      blossoms.forEach((b, i) => {
        for (let k = 0; k < 2; k++) {
          const t = 0.35 + k * 0.25;
          const lx = BASE_X + (b.cx - BASE_X) * t;
          const ly = BASE_Y + (b.cy - BASE_Y) * t;
          const dir = i % 2 === 0 ? -1 : 1;
          ox.beginPath();
          ox.arc(lx + dir * 26 * scale, ly - 4 * scale, 18 * scale, 0, Math.PI * 2);
          ox.fill();
        }
      });

      // Base calyx — bell at the bottom where stems converge
      ox.beginPath();
      ox.ellipse(BASE_X, BASE_Y, 38 * scale, 18 * scale, 0, 0, Math.PI * 2);
      ox.fill();

      // Each blossom = 4 overlapping circles (clover petals) + center
      blossoms.forEach((b) => {
        const offs: [number, number][] = [
          [0, -b.r * 0.55],
          [b.r * 0.55, 0],
          [0, b.r * 0.55],
          [-b.r * 0.55, 0],
        ];
        offs.forEach(([dxp, dyp]) => {
          ox.beginPath();
          ox.arc(b.cx + dxp, b.cy + dyp, b.r * 0.62, 0, Math.PI * 2);
          ox.fill();
        });
      });

      // Big lightning bolt mark inside each blossom (will be filled with ⚡ chars)
      const boltZones = blossoms.map((b) => ({
        cx: b.cx,
        cy: b.cy,
        rx: b.r * 0.20, // thin
        ry: b.r * 0.55, // tall
      }));

      // Old `clusters` interface kept for compatibility with reveal logic below
      const clusters: [number, number, number][] = blossoms.map((b) => [b.cx, b.cy, b.r * 1.0]);

      // Sun off-screen (legacy)
      const SX = -1000, SY = -1000, SR = 0;

      // ── Sample grid ──
      const id = ox.getImageData(0, 0, W, H).data;
      const inside = (x: number, y: number) => {
        const xi = Math.round(x);
        const yi = Math.round(y);
        if (xi < 0 || xi >= W || yi < 0 || yi >= H) return false;
        return id[(yi * W + xi) * 4 + 3] > 40;
      };

      const STEP_Y = Math.max(10, Math.round(Math.min(W, H) / 100));
      // Mostly digits, sprinkle of lightning bolts
      const chars = [
        "0","1","2","3","4","5","6","7","8","9",
        "0","1","2","3","4","5","6","7","8","9",
        "0","1","2","3","4","5","6","7","8","9",
        "⚡",
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
          let sat: number, lit: number, sz: number;
          // Detect bolt zone — narrow vertical strip in any blossom center
          let inBolt = false;
          for (const bz of boltZones) {
            const dx = x - bz.cx, dy = y - bz.cy;
            if (Math.abs(dx) < bz.rx && Math.abs(dy) < bz.ry) {
              inBolt = true;
              break;
            }
          }
          // Pure white characters with subtle brightness variation
          const hue = 0;
          sat = 0;
          if (inBolt) {
            lit = 92 + Math.random() * 6;
            sz = 9 + Math.random() * 2;
          } else {
            lit = 78 + Math.random() * 16;
            sz = 7 + Math.random() * 2.5;
          }
          // Force ⚡ in bolt zones, otherwise mostly digits
          const word = inBolt ? "⚡" : chars[Math.floor(Math.random() * chars.length)];
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

      // ── 3-phase reveal (Wordware-style: trunk grows → branches extend → leaves bloom) ──
      const TRUNK_TOP_Y = BY - 250 * scale;

      // For canopy normalization
      let maxRadialFromTop = 0;
      all.forEach((p) => {
        if (p.y >= TRUNK_TOP_Y) return;
        const dx = p.x - BX, dy = p.y - TRUNK_TOP_Y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > maxRadialFromTop) maxRadialFromTop = d;
      });
      maxRadialFromTop = Math.max(maxRadialFromTop, 1);

      // Sort clusters by distance from trunk top (closer first)
      const orderedClusters = clusters
        .map(([cx, cy, cr]) => ({
          cx, cy, cr,
          d: Math.sqrt((cx - BX) ** 2 + (cy - TRUNK_TOP_Y) ** 2),
        }))
        .sort((a, b) => a.d - b.d);
      const maxClusterD = Math.max(orderedClusters[orderedClusters.length - 1]?.d || 1, 1);

      // Helper: which leaf cluster (if any) does this particle belong to?
      const findCluster = (x: number, y: number) => {
        for (const c of orderedClusters) {
          const dx = x - c.cx, dy = y - c.cy;
          if (dx * dx + dy * dy < c.cr * c.cr) return c;
        }
        return null;
      };

      // Phase timings (ms)
      const PHASE_TRUNK_END   = 1100;
      const PHASE_BRANCH_START =  900;
      const PHASE_BRANCH_END  = 2600;
      const PHASE_LEAF_START  = 2300;
      const PHASE_LEAF_END    = 3700;
      const FADE = 220;

      all.forEach((p) => {
        if (p.y >= TRUNK_TOP_Y) {
          // PHASE 1 — trunk grows bottom→top
          const norm = (p.y - TRUNK_TOP_Y) / Math.max(BY - TRUNK_TOP_Y, 1); // 0 top → 1 bottom
          p.revealAt = (1 - norm) * PHASE_TRUNK_END + (Math.random() - 0.5) * 80;
        } else {
          const cluster = findCluster(p.x, p.y);
          if (cluster) {
            // PHASE 3 — leaves bloom (per-cluster timing, then random within)
            const clusterNorm = cluster.d / maxClusterD; // 0 closest, 1 farthest
            const clusterStart = PHASE_LEAF_START + clusterNorm * (PHASE_LEAF_END - PHASE_LEAF_START - 400);
            p.revealAt = clusterStart + Math.random() * 400;
          } else {
            // PHASE 2 — branches extend radially outward from trunk top
            const dx = p.x - BX, dy = p.y - TRUNK_TOP_Y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radialNorm = dist / maxRadialFromTop;
            p.revealAt = PHASE_BRANCH_START + radialNorm * (PHASE_BRANCH_END - PHASE_BRANCH_START)
                       + (Math.random() - 0.5) * 180;
          }
        }
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
