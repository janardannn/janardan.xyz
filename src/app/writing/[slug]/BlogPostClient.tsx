"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Share2, Check } from "lucide-react";
import MarkdownArticleImage from "@/components/markdown/MarkdownArticleImage";
import ArticleTocNav from "@/components/writing/ArticleTocNav";
import MarkdownCodeBlock from "@/components/writing/MarkdownCodeBlock";
import { MarkdownH2, MarkdownH3, MarkdownH4 } from "@/components/writing/MarkdownSectionHeading";
import ReadingProgress from "@/components/site/ReadingProgress";
import { extractMarkdownToc } from "@/lib/extractMarkdownToc";
import { markdownUrlTransform, prepareMarkdownForDisplay } from "@/lib/markdownForDisplay";
import { formatPostCategoryLabel, tagsExcludingCategory } from "@/lib/postCardMeta";
import { track } from "@/lib/tracker";
import "highlight.js/styles/atom-one-dark-reasonable.min.css";

interface BlogPostClientProps {
  post: {
    title: string;
    excerpt: string;
    category: string;
    bannerImage?: string | null;
    views: number;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
  };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const markdown = useMemo(() => prepareMarkdownForDisplay(post.content), [post.content]);
  const toc = useMemo(() => extractMarkdownToc(markdown), [markdown]);
  const hasToc = toc.length > 0;
  const extraTags = useMemo(
    () => tagsExcludingCategory(post.tags, post.category),
    [post.tags, post.category]
  );

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

  const endMatter = (
    <div className="rule-t mt-14 pt-8 pb-16">
      <div className="grid gap-8 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <p className="t-label text-muted-foreground mb-3">End of article</p>
          <p className="t-mono text-muted-foreground max-w-md">
            Thanks for reading. If it was useful, pass it on — or tell me where I got it
            wrong.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
            <Link
              href="/writing"
              className="link-mono t-label"
              onClick={() => track("cta_click", "navigation", { label: "read_more_posts" })}
            >
              <span aria-hidden="true">→</span> More posts
            </Link>
            <button onClick={handleShare} className="link-mono t-label text-muted-foreground">
              {copied ? (
                <Check className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Share2 className="h-3 w-3" aria-hidden="true" />
              )}
              {copied ? "Link copied" : "Copy link"}
            </button>
          </div>
        </div>

        {/* Same idea as the homepage strip: the page reports on itself. */}
        <dl className="sm:col-span-4 sm:col-start-9 rule-l pl-4 space-y-2.5">
          {post.views > 0 && (
            <div className="flex gap-3">
              <dt className="t-label text-muted-foreground w-16 shrink-0 pt-px">Reads</dt>
              <dd className="t-mono text-foreground tnum">
                {post.views.toLocaleString("en-US")}
              </dd>
            </div>
          )}
          <div className="flex gap-3">
            <dt className="t-label text-muted-foreground w-16 shrink-0 pt-px">Length</dt>
            <dd className="t-mono text-foreground">{post.readTime}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="t-label text-muted-foreground w-16 shrink-0 pt-px">Filed</dt>
            <dd className="t-mono text-foreground">
              {formatPostCategoryLabel(post.category)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );

  const bodyAndEnd = (
    <>
      {article}
      {endMatter}
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Masthead ────────────────────────────────────────── */}
      <header className="rule-b grid-field">
        <div className="mx-auto w-full max-w-[88rem] px-6 pt-8 pb-12 lg:px-10">
          <Link
            href="/writing"
            className="link-mono t-label text-muted-foreground mb-12 inline-flex"
          >
            <span aria-hidden="true">←</span> Writing
          </Link>

          <div className="grid gap-x-6 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="t-label text-signal mb-5">
                {formatPostCategoryLabel(post.category)}
              </p>

              <h1 className="t-display text-[clamp(2rem,4.9vw,3.65rem)] text-foreground">
                {post.title}
              </h1>

              {/* Standfirst — the excerpt finally does some work here. */}
              {post.excerpt ? (
                <p className="mt-6 max-w-2xl font-sans text-xl leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 t-label text-muted-foreground">
                <span>{post.date}</span>
                <span className="text-rule" aria-hidden="true">
                  /
                </span>
                <span>{post.readTime}</span>
                {/* A fresh post reading "0 reads" is worse than no count at all. */}
                {post.views > 0 && (
                  <>
                    <span className="text-rule" aria-hidden="true">
                      /
                    </span>
                    <span className="tnum">
                      {post.views.toLocaleString("en-US")} reads
                    </span>
                  </>
                )}
              </div>

              {extraTags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {extraTags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Banner. Present on every post, and previously never rendered here. */}
            {post.bannerImage ? (
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule">
                  <Image
                    src={post.bannerImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40rem"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[88rem] px-6 pb-20 lg:px-10">
        {hasToc ? (
          <details className="mt-6 border border-rule lg:hidden">
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
              <div className="sticky top-24 z-10 w-[13.5rem] pt-12 xl:w-56">
                <ReadingProgress targetRef={articleRef} />
                <div className="mt-5 max-h-[calc(100dvh-12rem)] overflow-y-auto overscroll-y-contain [scrollbar-width:thin]">
                  <ArticleTocNav items={toc} />
                </div>
              </div>
            </aside>

            <div
              ref={articleRef}
              className="mx-auto mt-8 w-full min-w-0 max-w-4xl lg:col-start-2 lg:mx-0 lg:mt-0 lg:max-w-none"
            >
              {bodyAndEnd}
            </div>

            <div className="hidden lg:col-start-3 lg:block" aria-hidden />
          </div>
        ) : (
          <div ref={articleRef} className="mx-auto mt-8 max-w-4xl">
            {bodyAndEnd}
          </div>
        )}
      </div>
    </div>
  );
}
