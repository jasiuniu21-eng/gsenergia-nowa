import type { Transition, Variants } from "framer-motion";

/** Premium spring: Vercel/Linear-ish weight. */
export const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.9,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 20,
  mass: 1,
};

export const easeOutQuart: Transition = {
  duration: 0.5,
  ease: [0.165, 0.84, 0.44, 1],
};

export const easeOutExpo: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

/** Fade + lift reveal (RevealOnScroll). */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: easeOutExpo },
};

/** Parent for stagger sequences. */
export const stagger = (delayChildren = 0, step = 0.08): Variants => ({
  hidden: {},
  shown: {
    transition: {
      delayChildren,
      staggerChildren: step,
    },
  },
});

/** Child reveal used inside staggered parents. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { ...spring, stiffness: 140 } },
};
