"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  forwardRef,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";

type Props = Omit<ComponentProps<typeof motion.a>, "ref"> & {
  children: ReactNode;
  /** pull intensity 0..1 */
  strength?: number;
};

/**
 * Pulls toward cursor via motion values (never React state).
 * Works on anchor by default; polymorphic-ish via `as` prop if needed later.
 */
export const MagneticButton = forwardRef<HTMLAnchorElement, Props>(
  function MagneticButton({ children, strength = 0.25, onMouseMove, onMouseLeave, ...rest }, ref) {
    const reduced = useReducedMotion();
    const innerRef = useRef<HTMLAnchorElement>(null);
    const localRef = (ref as React.MutableRefObject<HTMLAnchorElement>) || innerRef;

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.6 });
    const y = useSpring(my, { stiffness: 180, damping: 18, mass: 0.6 });
    const tx = useTransform(x, (v) => (reduced ? 0 : v));
    const ty = useTransform(y, (v) => (reduced ? 0 : v));

    return (
      <motion.a
        {...rest}
        ref={localRef}
        style={{ x: tx, y: ty, ...rest.style }}
        onMouseMove={(e) => {
          const el = localRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          mx.set((e.clientX - (rect.left + rect.width / 2)) * strength);
          my.set((e.clientY - (rect.top + rect.height / 2)) * strength);
          onMouseMove?.(e);
        }}
        onMouseLeave={(e) => {
          mx.set(0);
          my.set(0);
          onMouseLeave?.(e);
        }}
      >
        {children}
      </motion.a>
    );
  },
);
