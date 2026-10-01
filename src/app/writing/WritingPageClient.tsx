"use client";

import Link from "next/link";
import Image from "next/image";
import {
  formatPostCategoryLabel,
  tagsExcludingCategory,
} from "@/lib/postCardMeta";
import { track } from "@/lib/tracker";
import Reveal from "@/components/site/Reveal";

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  bannerImage?: string | null;
}

export default function WritingPageClient({ posts }: { posts: Post[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="rule-b grid-field">
        <div className="shell pt-24 pb-14 md:pt-32 md:pb-20">
          <Link href="/" className="link-mono t-label text-muted-foreground mb-10 inline-flex">
            <span aria-hidden="true">←</span> Index
          </Link>

          <div className="grid gap-6 md:grid-cols-12 items-end">
            <h1 className="t-display t-h2 md:col-span-7">Writing</h1>
            <p className="t-mono text-muted-foreground md:col-span-4 md:col-start-9">
              Thoughts on code, systems, and the messy process of turning ideas into
              products.
            </p>
          </div>
        </div>
      </header>

      <main className="shell pb-24">
        {posts.length === 0 ? (
          <p className="t-mono text-muted-foreground py-16">
            No posts yet. Check back soon.
          </p>
        ) : (
          <ul>
            {posts.map((post, i) => {
              const extraTags = tagsExcludingCategory(post.tags, post.category);
              return (
                <Reveal as="li" key={post.slug} index={i} className="rule-b">
                  <Link
                    href={`/writing/${post.slug}`}
                    onClick={() =>
                      track("blog_click", "engagement", {
                        slug: post.slug,
                        title: post.title,
                      })
                    }
                    className="group block py-7 md:py-9"
                  >
                    <div className="grid gap-5 md:grid-cols-12 md:gap-6 items-start">
                      <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3 md:gap-1.5">
                        <span className="t-label text-signal tnum">
                          {String(i + 1).padStart(3, "0")}
                        </span>
                        <span className="t-label text-muted-foreground">
                          {formatPostCategoryLabel(post.category)}
                        </span>
                      </div>

                      <div className="md:col-span-6">
                        <h2 className="t-display t-h3 md:text-[1.8rem] text-foreground group-hover:text-signal transition-colors duration-100">
                          {post.title}
                        </h2>

                        <p className="t-mono text-muted-foreground mt-3 line-clamp-2 max-w-2xl">
                          {post.excerpt}
                        </p>

                        {extraTags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {extraTags.slice(0, 4).map((tag) => (
                              <span key={tag} className="chip">
                                {tag}
                              </span>
                            ))}
                            {extraTags.length > 4 && (
                              <span className="chip border-transparent">
                                +{extraTags.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        <p className="t-label text-muted-foreground mt-4 flex items-center gap-3">
                          <span>{post.date}</span>
                          <span className="text-rule" aria-hidden="true">
                            /
                          </span>
                          <span>{post.readTime}</span>
                        </p>
                      </div>

                      {post.bannerImage ? (
                        <div className="md:col-span-3 md:col-start-10 relative aspect-[16/10] w-full overflow-hidden border border-rule">
                          <Image
                            src={post.bannerImage}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 260px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
