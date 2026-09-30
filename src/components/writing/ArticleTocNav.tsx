"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/extractMarkdownToc";
import { cn } from "@/lib/utils";

/** Highlights whichever heading is currently nearest the top of the viewport. */
function useActiveHeading(items: TocItem[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return active;
}

export default function ArticleTocNav({
  items,
  showLabel = true,
}: {
  items: TocItem[];
  showLabel?: boolean;
}) {
  const active = useActiveHeading(items);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page">
      {showLabel ? (
        <p className="t-label text-muted-foreground mb-4">On this page</p>
      ) : null}
      <ul className="border-l border-rule">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block border-l -ml-px py-1.5 pl-3 t-mono-sm leading-snug transition-colors duration-100",
                  isActive
                    ? "border-signal text-signal"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                  item.depth === 3 && "pl-6"
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
