"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Progress through the article body specifically — not the whole document, so
 * it reads 100% when the prose ends rather than when the footer does.
 *
 * Measured against a target element, rAF-coalesced, and it reports a plain
 * number so the caller decides how to draw it.
 */
export default function ReadingProgress({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const [pct, setPct] = useState(0);
  const frame = useRef<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      frame.current = null;
      const el = targetRef.current;
      if (!el) return;

      const { top, height } = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Distance scrolled past the article's start, over its scrollable length.
      const scrolled = -top;
      const scrollable = Math.max(height - viewport, 1);
      setPct(Math.min(Math.max((scrolled / scrollable) * 100, 0), 100));
    };

    const onScroll = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [targetRef]);

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative h-px flex-1 bg-rule"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div
          className="absolute inset-y-0 left-0 bg-signal"
          style={{
            width: `${pct}%`,
            transition: reduced ? undefined : "width 90ms linear",
          }}
        />
      </div>
      <span className="t-label text-muted-foreground tnum w-8 text-right">
        {Math.round(pct)}
      </span>
    </div>
  );
}
