import type { TocItem } from "@/lib/extractMarkdownToc";
import { cn } from "@/lib/utils";

export default function ArticleTocNav({
  items,
  showLabel = true,
}: {
  items: TocItem[];
  showLabel?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <nav className="text-sm" aria-label="On this page">
      {showLabel ? (
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-pop-muted">
          On this page
        </p>
      ) : null}
      <ul className="space-y-0.5 border-l-2 border-border pl-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block rounded-r-md border-l-2 border-transparent py-1.5 pl-3 text-[13px] leading-snug text-foreground/80 transition-colors",
                "hover:border-pop/70 hover:bg-pop/10 hover:text-foreground",
                item.depth === 3 && "pl-5 text-[12.5px] text-foreground/70",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
