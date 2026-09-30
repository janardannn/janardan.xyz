"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The single reveal primitive for the whole site.
 *
 * Replaces the hand-tuned `delay: 0.2 / 0.5 / 0.7` chains that made the old
 * design feel like a 2014 scroll-animation library. One spring, one distance,
 * fired once. Where stagger genuinely earns its place, pass `index` — it buys
 * a small capped offset rather than an ever-growing queue.
 */
export default function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
        delay: Math.min(index, 4) * 0.045,
      }}
    >
      {children}
    </MotionTag>
  );
}
