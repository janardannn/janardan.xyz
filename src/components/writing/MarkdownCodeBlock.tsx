"use client";

import { useRef, useState, Children, isValidElement, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type PreProps = ComponentProps<"pre"> & { node?: unknown };

export default function MarkdownCodeBlock({ children, className, node: _node, ...rest }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  let lang = "";
  const first = Children.toArray(children)[0];
  if (isValidElement(first)) {
    const p = first.props as { className?: string };
    if (typeof p.className === "string") {
      const m = /language-([\w+-]+)/.exec(p.className);
      if (m) lang = m[1];
    }
  }

  async function handleCopy() {
    const text = preRef.current?.innerText ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="writing-code-block not-prose my-6 overflow-hidden rounded-lg border border-border/70 bg-[oklch(0.11_0.022_265)] shadow-[0_1px_0_oklch(1_0_0/6%),0_12px_40px_-16px_oklch(0_0_0/45%)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-black/25 px-3 py-2">
        <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {lang || "plain text"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:bg-muted/30 hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        {...rest}
        className={cn(
          "m-0 max-h-[min(70vh,32rem)] overflow-auto rounded-none border-0 bg-transparent p-4 font-mono text-[13px] leading-[1.65] text-zinc-200 [tab-size:2]",
          className,
        )}
      >
        {children}
      </pre>
    </div>
  );
}
