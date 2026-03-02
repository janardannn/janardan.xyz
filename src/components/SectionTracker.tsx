"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/tracker";

export function SectionTracker({ sectionId }: { sectionId: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          track("section_view", "engagement", { section: sectionId });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId]);

  return null;
}
