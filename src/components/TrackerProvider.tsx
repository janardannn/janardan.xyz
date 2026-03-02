"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getTracker } from "@/lib/tracker";

export function TrackerProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);
  const prevPath = useRef("");

  useEffect(() => {
    if (initialized.current) return;
    if (pathname.startsWith("/admin")) return;

    const tracker = getTracker();
    tracker.init().then(() => {
      tracker.trackPageView();
      prevPath.current = pathname;
    }).catch(() => {});
    initialized.current = true;
  }, [pathname]);

  // Track SPA route changes
  useEffect(() => {
    if (!initialized.current) return;
    if (pathname.startsWith("/admin")) return;
    if (pathname === prevPath.current) return;

    prevPath.current = pathname;
    getTracker().trackPageView();
  }, [pathname, searchParams]);

  return null;
}
