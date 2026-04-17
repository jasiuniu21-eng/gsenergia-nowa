"use client";

import { useEffect, useRef } from "react";
import { SURVEY_URL } from "../../_data/content";

/**
 * K9 Light hero — canvas "flower bouquet" that reveals as characters
 * (kWh/MWh/%/numerals) water-filling from bottom up.
 * Directly ported from /Users/joanna/ebook/gsenergia-hero.html with polish
 * headline and Next.js-compatible lifecycle.
 */
export function LightHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const hero = heroRef.current;
    if (!cv || !hero) return;

    let all: Array<{
      x: number;
      y: number;
      hue: number;
      sat: number;
      lit: number;
      sz: number;
      ch: string;
      revealAt: number;
      nextSwap: number;
    }> = [];

    const build = () => {
      const W = hero.offsetWidth || 900;
      const H = hero.offsetHeight || 600;
      cv.width = W;
      cv.height = H;
      const ctx = cv.getContext("2d")!;

      // Offscreen canvas — paint the bouquet silhouette in black, then sample
      const oc = document.createElement("canvas");
      oc.width = W;
      oc.height = H;
      const ox = oc.getContext("2d")!;
      ox.fillStyle = "#000";
      ox.strokeStyle = "#000";
      ox.lineCap = "round";
      ox.lineJoin = "round";

      const scale = Math.min(W, H) / 580;
      const BX = W * 0.5;
      const BY = H * 0.95;

      // stems
      const stems: Array<{ a: number; l: number; w: number }> = [
        { a: -58, l: 255, w: 4.5 },
        { a: -38, l: 285, w: 5.5 },
        { a: -20, l: 305, w: 6.5 },
        { a: 0, l: 318, w: 7.5 },
        { a: 20, l: 305, w: 6.5 },
        { a: 38, l: 285, w: 5.5 },
        { a: 58, l: 255, w: 4.5 },
        { a: -72, l: 210, w: 3.5 },
        { a: 72, l: 210, w: 3.5 },
        { a: -10, l: 270, w: 5 },
        { a: 10, l: 270, w: 5 },
      ];

      stems.forEach((s) => {
        const rad = ((s.a - 90) * Math.PI) / 180;
        const len = s.l * scale;
        const ex = BX + Math.cos(rad) * len;
        const ey = BY + Math.sin(rad) * len;
        const cpx = BX + Math.cos(rad) * len * 0.45 + Math.sin(rad) * 18 * scale;
        const cpy = BY + Math.sin(rad) * len * 0.45 - Math.cos(rad) * 18 * scale;
        ox.lineWidth = s.w * scale;
        ox.beginPath();
        ox.moveTo(BX, BY);
        ox.quadraticCurveTo(cpx, cpy, ex, ey);
        ox.stroke();
      });

      // flower heads
      const flR = [52, 60, 66, 70, 66, 60, 52, 40, 40, 56, 56];
      stems.forEach((s, i) => {
        const rad = ((s.a - 90) * Math.PI) / 180;
        const len = s.l * scale;
        const ex = BX + Math.cos(rad) * len;
        const ey = BY + Math.sin(rad) * len;
        const R = flR[i] * scale;
        for (let p = 0; p < 16; p++) {
          const pa = (p / 16) * Math.PI * 2;
          const pr = R * (0.72 + 0.28 * (p % 2 === 0 ? 1 : 0.7));
          ox.beginPath();
          ox.arc(ex + Math.cos(pa) * pr, ey + Math.sin(pa) * pr, R * 0.3, 0, Math.PI * 2);
          ox.fill();
        }
        ox.beginPath();
        ox.arc(ex, ey, R * 0.88, 0, Math.PI * 2);
        ox.fill();
      });

      // leaves
      stems.forEach((s) => {
        const rad = ((s.a - 90) * Math.PI) / 180;
        const len = s.l * scale;
        [0.35, 0.58].forEach((t, li) => {
          const lx = BX + Math.cos(rad) * len * t;
          const ly = BY + Math.sin(rad) * len * t;
          const lr = 20 * scale;
          const lrad = rad + (li % 2 === 0 ? -0.85 : 0.85);
          ox.save();
          ox.translate(lx, ly);
          ox.rotate(lrad);
          ox.beginPath();
          ox.ellipse(0, -lr * 0.5, lr * 0.35, lr, 0, 0, Math.PI * 2);
          ox.fill();
          ox.restore();
        });
      });

      // bunch tie
      ox.beginPath();
      ox.ellipse(BX, BY - 10 * scale, 20 * scale, 9 * scale, 0, 0, Math.PI * 2);
      ox.fill();

      // sun top-right
      const SX = W * 0.86;
      const SY = H * 0.12;
      const SR = Math.min(W, H) * 0.062;
      ox.beginPath();
      ox.arc(SX, SY, SR, 0, Math.PI * 2);
      ox.fill();
      ox.lineWidth = SR * 0.17;
      for (let r = 0; r < 12; r++) {
        const a = (r / 12) * Math.PI * 2;
        ox.beginPath();
        ox.moveTo(SX + Math.cos(a) * SR * 1.35, SY + Math.sin(a) * SR * 1.35);
        ox.lineTo(SX + Math.cos(a) * SR * 1.82, SY + Math.sin(a) * SR * 1.82);
        ox.stroke();
      }

      // sample grid
      const id = ox.getImageData(0, 0, W, H).data;
      const inside = (x: number, y: number) => {
        const xi = Math.round(x);
        const yi = Math.round(y);
        if (xi < 0 || xi >= W || yi < 0 || yi >= H) return false;
        return id[(yi * W + xi) * 4 + 3] > 40;
      };

      const STEP = Math.max(6, Math.round(Math.min(W, H) / 85));
      const chars = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "k", "W", "h", "M", "%", "↑", "G", "E", "S", "P", "V", "·", "+", "~", "=",
      ];
      all = [];

      for (let y = 0; y < H; y += STEP) {
        for (let x = 0; x < W; x += STEP) {
          if (!inside(x, y)) continue;
          let hue = 128;
          let sat: number;
          let lit: number;
          let sz: number;
          const isSun = Math.sqrt((x - SX) ** 2 + (y - SY) ** 2) < SR * 2.1;
          if (isSun) {
            hue = 38 + Math.random() * 14;
            sat = 72 + Math.random() * 22;
            lit = 46 + Math.random() * 18;
            sz = 6 + Math.random() * 3;
          } else if (y > BY - 14 * scale) {
            sat = 28 + Math.random() * 14;
            lit = 11 + Math.random() * 9;
            sz = 5.5 + Math.random() * 2;
          } else {
            const t = (BY - y) / (BY - H * 0.03);
            hue = 124 + t * 9;
            sat = 48 + Math.random() * 30;
            lit = 15 + t * 28 + Math.random() * 12;
            sz = 7 + Math.random() * 3.5;
          }
          all.push({
            x,
            y,
            hue,
            sat,
            lit,
            sz,
            ch: chars[Math.floor(Math.random() * chars.length)],
            revealAt: 0,
            nextSwap: 900 + Math.random() * 3500,
          });
        }
      }

      // water fill — bottom up
      let maxY = 0;
      let minY = 99999;
      all.forEach((p) => {
        if (p.y > maxY) maxY = p.y;
        if (p.y < minY) minY = p.y;
      });
      const TOTAL = 3600;
      const FADE = 200;
      all.forEach((p) => {
        const norm = 1 - (p.y - minY) / (maxY - minY);
        p.revealAt = norm * TOTAL + (Math.random() - 0.5) * 140;
        if (p.revealAt < 0) p.revealAt = 0;
      });

      let t0: number | null = null;
      const frame = (ts: number) => {
        if (!t0) t0 = ts;
        const el = ts - t0;
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < all.length; i++) {
          const p = all[i];
          const since = el - p.revealAt;
          if (since < 0) continue;
          const alpha = Math.min(since / FADE, 1) * 0.87;
          // Swap characters only during first 8 seconds (then freeze)
          if (el < 8000 && since > p.nextSwap) {
            p.ch = chars[Math.floor(Math.random() * chars.length)];
            p.nextSwap = since + 700 + Math.random() * 3500;
          }
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.font = `500 ${p.sz}px Inter,monospace`;
          ctx.fillStyle = `hsl(${p.hue},${p.sat}%,${p.lit}%)`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.ch, p.x, p.y);
          ctx.restore();
        }
        // Water-fill completes at ~3.8s, char swaps stop at 8s.
        // After 8s render one last frame and stop — canvas becomes static.
        if (el > 8200) return;
        rafRef.current = requestAnimationFrame(frame);
      };
    };

    const init = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      build();
    };

    const timeout = setTimeout(init, 80);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timeout);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "calc(100vh - 102px)",
        minHeight: "520px",
        background: "var(--k9-bg)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Centered headline */}
      <div
        className="absolute left-1/2 top-1/2 text-center z-[30] pointer-events-none w-full px-5"
        style={{ transform: "translate(-50%,-56%)" }}
      >
        <span
          className="block k9-label mb-3.5"
          style={{
            opacity: 0,
            animation: "k9-fadeUp 0.5s 0.4s ease forwards",
          }}
        >
          Energy Intelligence
        </span>
        <h1
          className="k9-display"
          style={{
            fontSize: "clamp(2.6rem, 6vw, 5.4rem)",
            fontWeight: 700,
            color: "var(--k9-ink)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            opacity: 0,
            animation: "k9-fadeUp 0.7s 0.6s ease forwards",
          }}
        >
          Budujemy
          <br />
          <em className="not-italic" style={{ color: "var(--k9-accent)" }}>
            tanią
          </em>{" "}
          energię.
        </h1>
        <span
          className="block mt-4 text-sm font-light"
          style={{
            color: "var(--k9-ink-faint)",
            letterSpacing: "0.03em",
            opacity: 0,
            animation: "k9-fadeUp 0.6s 0.85s ease forwards",
          }}
        >
          Audyt &nbsp;·&nbsp; EMS &nbsp;·&nbsp; BESS &nbsp;·&nbsp; Fotowoltaika
          &nbsp;·&nbsp; ESG &nbsp;·&nbsp; Tokenizacja
        </span>
      </div>

      {/* Bottom search — wide oval */}
      <div
        className="absolute bottom-8 left-1/2 z-[30]"
        style={{
          transform: "translateX(-50%)",
          width: "min(540px, 90%)",
          opacity: 0,
          animation: "k9-fadeUp 0.5s 1.1s ease forwards",
        }}
      >
        <div
          className="flex items-center rounded-full"
          style={{
            background: "#fff",
            border: "1.5px solid #e0e0e0",
            padding: "6px 6px 6px 22px",
            boxShadow: "0 4px 28px rgba(0,0,0,.10)",
          }}
        >
          <input
            type="text"
            placeholder="Czego szukasz? audyt, magazyn energii, obniżenie FV..."
            className="flex-1 border-0 outline-none text-sm bg-transparent min-w-0"
            style={{ color: "var(--k9-ink)" }}
          />
          <a
            href={SURVEY_URL}
            className="inline-flex items-center h-10 px-[22px] rounded-full text-[13px] font-semibold whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: "var(--k9-accent)", color: "#fff" }}
          >
            Szukaj →
          </a>
        </div>
        <p
          className="text-center text-[11px] mt-2.5"
          style={{ color: "#bbb", letterSpacing: "0.02em" }}
        >
          Popularne: obniżenie rachunku za prąd &nbsp;·&nbsp; magazyn energii BESS
          &nbsp;·&nbsp; audyt ISO 50001 &nbsp;·&nbsp; PV dla firm
        </p>
      </div>

      <style jsx>{`
        @keyframes k9-fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
