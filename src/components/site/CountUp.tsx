"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Counts once, on first view.
 *
 * Renders the true value on the server and on first client render, so the
 * markup a crawler (or a visitor whose JS never arrives) sees is correct.
 * The animation zeroes the counter only at the moment it actually starts,
 * inside the observer callback — initialising state to 0 would ship
 * "Views 0" in the HTML.
 */
export default function CountUp({
  value,
  duration = 900,
}: {
  value: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const frame = useRef<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const begin = performance.now();
        setDisplay(0);

        const tick = (now: number) => {
          const t = Math.min((now - begin) / duration, 1);
          // easeOutExpo — fast commit, soft landing
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(value * eased));
          frame.current = t < 1 ? requestAnimationFrame(tick) : null;
        };

        frame.current = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className="tnum">
      {display.toLocaleString("en-US")}
    </span>
  );
}
