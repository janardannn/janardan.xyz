"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Share2, Check } from "lucide-react";
import MarkdownArticleImage from "@/components/markdown/MarkdownArticleImage";
import ArticleTocNav from "@/components/writing/ArticleTocNav";
import MarkdownCodeBlock from "@/components/writing/MarkdownCodeBlock";
import { MarkdownH2, MarkdownH3, MarkdownH4 } from "@/components/writing/MarkdownSectionHeading";
import { extractMarkdownToc } from "@/lib/extractMarkdownToc";
import { markdownUrlTransform, prepareMarkdownForDisplay } from "@/lib/markdownForDisplay";
import { track } from "@/lib/tracker";
import { cn } from "@/lib/utils";
import "highlight.js/styles/atom-one-dark-reasonable.min.css";

interface BlogPostClientProps {
  post: {
    title: string;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
  };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(() => prepareMarkdownForDisplay(post.content), [post.content]);
  const toc = useMemo(() => extractMarkdownToc(markdown), [markdown]);
  const hasToc = toc.length > 0;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    track("share_click", "engagement", { slug: window.location.pathname.split("/").pop() });
    setTimeout(() => setCopied(false), 2000);
  };

  const article = (
    <article className="writing-article markdown-reading prose w-full min-w-0 pt-10 pb-4 lg:pt-12">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: true }]]}
        urlTransform={markdownUrlTransform}
        components={{
          img: MarkdownArticleImage,
          pre: MarkdownCodeBlock,
          h2: MarkdownH2,
          h3: MarkdownH3,
          h4: MarkdownH4,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );

  const articleFooter = (
    <>
      {article}
      <div className="rule-t mt-14 pt-8 pb-16 flex flex-wrap items-center justify-between gap-4">
        <p className="t-mono text-muted-foreground">
          Thanks for reading. Pass it on if it helped.
        </p>
        <Link
          href="/writing"
          className="link-mono t-label"
          onClick={() => track("cta_click", "navigation", { label: "read_more_posts" })}
        >
          More posts <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[88rem] px-6 pb-20 pt-8 lg:px-10">
        <header className="mx-auto max-w-4xl rule-b pb-10">
          <Link href="/writing" className="link-mono t-label text-muted-foreground mb-10 inline-flex">
            <span aria-hidden="true">←</span> Writing
          </Link>

          {post.tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="t-display text-[clamp(2rem,6vw,3.75rem)] text-foreground mb-7">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 t-label text-muted-foreground">
            <span>{post.date}</span>
            <span className="text-rule" aria-hidden="true">
              /
            </span>
            <span>{post.readTime}</span>
            <button
              onClick={handleShare}
              className="link-mono t-label ml-auto text-muted-foreground"
            >
              {copied ? (
                <Check className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Share2 className="h-3 w-3" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </header>

        {hasToc ? (
          <details className="mx-auto mt-6 max-w-4xl border border-rule lg:hidden">
            <summary className="cursor-pointer px-4 py-3 t-label text-foreground">
              On this page
            </summary>
            <div className="rule-t px-4 py-3">
              <ArticleTocNav items={toc} showLabel={false} />
            </div>
          </details>
        ) : null}

        {hasToc ? (
          /* items-stretch (default): aside must span full row height or sticky has no scroll track */
          <div className="mt-8 overflow-visible lg:grid lg:grid-cols-[1fr_min(100%,52rem)_1fr] lg:items-stretch lg:gap-x-0">
            <aside className="hidden min-h-0 lg:col-start-1 lg:row-start-1 lg:block lg:h-full lg:justify-self-end lg:pr-10">
              {/* Sticky wrapper must not scroll: overflow lives on the inner rail. */}
              <div className={cn("sticky top-24 z-10 w-[13.5rem] xl:w-56", "lg:pt-12")}>
                <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-y-contain [scrollbar-width:thin]">
                  <ArticleTocNav items={toc} />
                </div>
              </div>
            </aside>

            <div className="mx-auto mt-8 w-full min-w-0 max-w-4xl lg:col-start-2 lg:mx-0 lg:mt-0 lg:max-w-none">
              {articleFooter}
            </div>

            <div className="hidden lg:col-start-3 lg:block" aria-hidden />
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-4xl">{articleFooter}</div>
        )}
      </div>
    </div>
  );
}
