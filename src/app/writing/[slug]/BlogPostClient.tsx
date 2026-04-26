"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2, Check } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
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
    <motion.article
      className="writing-article markdown-reading prose prose-lg w-full min-w-0 pb-4 pt-10 lg:pt-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
    >
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
    </motion.article>
  );

  const articleFooter = (
    <>
      {article}
      <Separator className="my-12" />
      <motion.div
        className="pb-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <p className="mb-6 text-muted-foreground">
          Thanks for reading! If you enjoyed this post, feel free to share it with others.
        </p>
        <Button
          asChild
          variant="outline"
          className="border-2 border-border bg-secondary text-secondary-foreground transition-transform duration-200 hover:scale-105"
        >
          <Link href="/writing" onClick={() => track("cta_click", "navigation", { label: "read_more_posts" })}>
            Read More Posts
          </Link>
        </Button>
      </motion.div>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative z-10">
      <div className="mx-auto w-full max-w-[88rem] px-4 pb-20 pt-6 sm:px-6 lg:pt-8">
        <motion.header
          className="mx-auto max-w-4xl border-b border-border pb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Button variant="ghost" asChild className="mb-6 text-muted-foreground hover:text-foreground">
            <Link href="/writing">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Writing
            </Link>
          </Button>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-pop/30 bg-pop/10 text-pop-muted">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 shrink-0 opacity-80" />
              {post.date}
            </span>
            <span className="hidden text-border sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 shrink-0 opacity-80" />
              {post.readTime}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="ml-auto h-8 font-sans text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
              {copied ? "Copied" : "Share"}
            </Button>
          </div>
        </motion.header>

        {hasToc ? (
          <details className="mx-auto mt-6 max-w-4xl rounded-xl border border-border bg-card shadow-md ring-1 ring-pop/20 lg:hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground">
              On this page
            </summary>
            <div className="border-t border-border px-2 py-3">
              <ArticleTocNav items={toc} showLabel={false} />
            </div>
          </details>
        ) : null}

        {hasToc ? (
          /* items-stretch (default): aside must span full row height or sticky has no scroll track */
          <div className="mt-8 overflow-visible lg:grid lg:grid-cols-[1fr_min(100%,56rem)_1fr] lg:items-stretch lg:gap-x-0">
            <aside className="hidden min-h-0 lg:col-start-1 lg:row-start-1 lg:block lg:h-full lg:justify-self-end lg:pr-8">
              {/* Sticky wrapper must not scroll: overflow lives on inner card. Parent aside is tall (grid stretch) so sticky can ride the full article. */}
              <div className={cn("sticky top-28 z-10 w-[13.5rem] xl:w-56", "lg:pt-12")}>
                <div
                  className={cn(
                    "max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-y-contain [scrollbar-width:thin]",
                    "rounded-xl border border-border bg-card p-4 shadow-lg shadow-black/25",
                    "ring-1 ring-pop/20",
                    "backdrop-blur-sm",
                  )}
                >
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
