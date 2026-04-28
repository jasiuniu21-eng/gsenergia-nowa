"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const NODES: ReadonlyArray<Point & { label?: { title: string; value: string; side: "left" | "right"; dy?: number } }> = [
  { x: 28, y: 52, label: { title: "Rozdzielnia MV", value: "ROI 28 mies.", side: "right" } },
  { x: 46, y: 64, label: { title: "Sprężarki", value: "−22% kWh/rok", side: "right", dy: 0 } },
  { x: 66, y: 30, label: { title: "Instalacja chłodu", value: "COP 3.4 → 4.1", side: "left" } },
  { x: 82, y: 46 },
];

const EDGES: ReadonlyArray<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 3],
];

function curve(a: Point, b: Point) {
  const mx = (a.x + b.x) / 2;
  const cy = Math.min(a.y, b.y) - 8;
  return `M ${a.x} ${a.y} Q ${mx} ${cy} ${b.x} ${b.y}`;
}

export function HeroOverlay() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  const parX = mouse.x * 6;
  const parY = mouse.y * 4;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ transform: `translate3d(${parX}px, ${parY}px, 0)`, transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.72 0.15 130)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="oklch(0.72 0.15 130)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.72 0.15 130)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Connection edges */}
        {EDGES.map(([i, j], idx) => {
          const d = curve(NODES[i], NODES[j]);
          return (
            <g key={idx} filter="url(#hero-glow)">
              {/* Static subtle trace */}
              <motion.path
                d={d}
                fill="none"
                stroke="oklch(0.72 0.15 130)"
                strokeOpacity={0.22}
                strokeWidth={0.25}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduced ? 0 : 1.6, delay: 0.3 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Marching flow */}
              <motion.path
                d={d}
                fill="none"
                stroke="url(#hero-line)"
                strokeWidth={0.45}
                strokeLinecap="round"
                strokeDasharray="1.5 4"
                initial={{ pathLength: 0, strokeDashoffset: 0, opacity: 0 }}
                animate={
                  reduced
                    ? { pathLength: 1, opacity: 0.7 }
                    : { pathLength: 1, strokeDashoffset: [-0, -60], opacity: 0.85 }
                }
                transition={{
                  pathLength: { duration: 1.6, delay: 0.4 + idx * 0.15, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.6, delay: 0.4 + idx * 0.15 },
                  strokeDashoffset: reduced
                    ? { duration: 0 }
                    : { duration: 8 + idx * 2, repeat: Infinity, ease: "linear", delay: 2 + idx * 0.3 },
                }}
              />
            </g>
          );
        })}

        {/* Traveling particles on each edge */}
        {!reduced &&
          EDGES.map(([i, j], idx) => {
            const d = curve(NODES[i], NODES[j]);
            return (
              <g key={`p${idx}`}>
                <circle r="0.55" fill="oklch(0.85 0.18 130)" filter="url(#hero-glow)">
                  <animateMotion dur={`${5 + idx}s`} repeatCount="indefinite" begin={`${2 + idx * 0.4}s`} path={d} />
                </circle>
                <circle r="0.35" fill="white" opacity="0.8">
                  <animateMotion dur={`${5 + idx}s`} repeatCount="indefinite" begin={`${2.3 + idx * 0.4}s`} path={d} />
                </circle>
              </g>
            );
          })}

        {/* Nodes with expanding rings */}
        {NODES.map((n, i) => (
          <g key={i}>
            {[0, 1, 2].map((r) => (
              <motion.circle
                key={r}
                cx={n.x}
                cy={n.y}
                r={0.8}
                fill="none"
                stroke="oklch(0.72 0.15 130)"
                strokeWidth={0.18}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  reduced
                    ? { opacity: 0.4, scale: 1 }
                    : { opacity: [0, 0.7, 0], scale: [0.6, 3.5, 3.8] }
                }
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                transition={{
                  duration: reduced ? 0 : 3,
                  delay: 0.8 + i * 0.25 + r * 1,
                  repeat: reduced ? 0 : Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={0.7}
              fill="oklch(0.72 0.15 130)"
              filter="url(#hero-glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              transition={{ duration: reduced ? 0 : 0.5, delay: 0.6 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={0.28}
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.18 }}
            />
          </g>
        ))}
      </svg>

      {/* HUD data callouts (positioned as HTML overlay so typography stays crisp) */}
      {NODES.map((n, i) =>
        n.label ? (
          <motion.div
            key={`hud${i}`}
            className="absolute"
            style={{
              left: `${n.x}%`,
              top: `${n.y + (n.label.dy ?? 0)}%`,
              transform: `translate(${n.label.side === "right" ? "14px" : "calc(-100% - 14px)"}, -50%)`,
            }}
            initial={{ opacity: 0, x: n.label.side === "right" ? -8 : 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: 1 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative flex flex-col gap-0.5 rounded-md border px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] shadow-[0_4px_20px_-8px_oklch(0.16_0.01_150/0.25)] backdrop-blur-sm"
              style={{
                background: "color-mix(in oklab, white 88%, transparent)",
                borderColor: "color-mix(in oklab, oklch(0.72 0.15 130) 30%, transparent)",
                color: "var(--c-ink-900)",
              }}
            >
              <span className="text-[9px] text-[color:var(--c-fg-subtle)]">{n.label.title}</span>
              <span className="font-semibold tracking-[0.08em] text-[color:var(--c-brand-700)]">{n.label.value}</span>
            </div>
          </motion.div>
        ) : null,
      )}
    </div>
  );
}
