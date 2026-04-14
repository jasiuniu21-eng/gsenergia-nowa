"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";

/* ---------- Animation recipes ---------- */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.165, 0.84, 0.44, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const staggerParent = (delayChildren = 0, step = 0.08): Variants => ({
  hidden: {},
  shown: {
    transition: { delayChildren, staggerChildren: step },
  },
});

/* ---------- Reveal on scroll ---------- */

type RevealTag = "div" | "section" | "article" | "header" | "footer" | "ul" | "li";

export function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  amount = 0.3,
  children,
  className,
  ...rest
}: {
  as?: RevealTag;
  delay?: number;
  y?: number;
  amount?: number;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "ref">) {
  const reduced = useReducedMotion();
  const Comp = motion[as as "div"] as typeof motion.div;
  return (
    <Comp
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "-60px" }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ---------- Count-up (viewport-triggered) ---------- */

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  format = (n) => Math.round(n).toLocaleString("pl-PL"),
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6, margin: "-60px" });
  const [display, setDisplay] = useState(format(from));
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(format(to));
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      // ease-out expo
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      const value = from + (to - from) * e;
      setDisplay(format(value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, duration, from, to, format, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ---------- Magnetic button (cursor attraction) ---------- */

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export const Magnetic = forwardRef<HTMLAnchorElement, MagneticProps>(
  function Magnetic({ children, strength = 0.25, className, href, onClick, ...rest }, ref) {
    const reduced = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.7 });
    const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.7 });
    const innerRef = useRef<HTMLAnchorElement | null>(null);

    function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
      if (reduced) return;
      const el = innerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set(dx * strength);
      y.set(dy * strength);
    }
    function handleLeave() {
      x.set(0);
      y.set(0);
    }

    return (
      <motion.a
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        style={{ x: sx, y: sy }}
        className={className}
        {...rest}
      >
        {children}
      </motion.a>
    );
  },
);

/* ---------- Parallax on scroll (subtle) ---------- */

export function useParallaxY(value: MotionValue<number>, amount = 40) {
  return useTransform(value, [0, 1], [0, -amount]);
}
