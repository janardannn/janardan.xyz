import type { HTMLAttributes } from "react";
import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Level = 2 | 3 | 4;
type HeadingProps = HTMLAttributes<HTMLHeadingElement> & { node?: unknown };

function makeHeading(Tag: "h2" | "h3" | "h4", level: Level) {
  return function MarkdownSectionHeading({
    node: _node,
    id,
    children,
    className,
    ...rest
  }: HeadingProps) {
    return (
      <Tag
        id={id}
        {...rest}
        className={cn(
          "group/heading flex scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] items-start gap-3",
          level === 2 && "border-b border-border/50 pb-2 text-balance !mt-12 first:!mt-0",
          level === 3 && "text-balance !mt-10",
          level === 4 && "text-balance !mt-8",
          className,
        )}
      >
        <span className="min-w-0 flex-1">{children}</span>
        {id ? (
          <a
            href={`#${id}`}
            className="mt-0.5 inline-flex shrink-0 rounded-md p-1.5 text-muted-foreground opacity-0 transition-[opacity,background,color] hover:bg-muted/40 hover:text-foreground hover:opacity-100 group-hover/heading:opacity-50"
            aria-label="Link to this section"
          >
            <Link2 className="size-4" />
          </a>
        ) : null}
      </Tag>
    );
  };
}

export const MarkdownH2 = makeHeading("h2", 2);
export const MarkdownH3 = makeHeading("h3", 3);
export const MarkdownH4 = makeHeading("h4", 4);
