"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/** True only for a real pointing device, and only after mount. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}

const W = 280;
const H = 176;
const OFFSET = 24;

/**
 * Image preview that tracks the cursor.
 *
 * Position updates are coalesced into one rAF per frame — writing to style on
 * every mousemove is what makes this pattern feel janky. Never engages on
 * touch or under reduced motion; the images stay reachable inline and through
 * the lightbox either way, so this is enhancement only.
 */
export default function HoverPreview({ src, alt }: { src: string | null; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const flush = () => {
      frame.current = null;
      const el = ref.current;
      if (!el) return;

      // Keep the panel inside the viewport rather than letting it hang off-screen.
      const x = Math.min(target.current.x + OFFSET, window.innerWidth - W - 12);
      const y = Math.min(
        Math.max(target.current.y - H / 2, 12),
        window.innerHeight - H - 12
      );
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (frame.current === null) frame.current = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 will-change-transform"
      style={{ width: W, height: H }}
    >
      <AnimatePresence>
        {src ? (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="relative w-full h-full overflow-hidden border border-rule bg-card"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="280px"
              className="object-cover"
              priority={false}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
