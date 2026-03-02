"use client";

import { useCallback } from "react";
import { track } from "@/lib/tracker";

export function useTrack() {
  return useCallback(
    (name: string, category: string, properties?: Record<string, unknown>) => {
      track(name, category, properties);
    },
    []
  );
}
