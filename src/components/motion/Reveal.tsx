"use client";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { easeOutExpo } from "@/design/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "span" | "li";
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
  as = "div",
}: Props) {
  const reduced = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ ...easeOutExpo, delay }}
    >
      {children}
    </M>
  );
}
