"use client";

import Link from "next/link";
import Image from "next/image";
import { track } from "@/lib/tracker";
import { formatPostCategoryLabel } from "@/lib/postCardMeta";
import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/site/SectionHeader";

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  bannerImage?: string | null;
}

export default function Writing({ posts }: { posts: Post[] }) {
  return (
    <div className="shell py-20 md:py-28">
      <SectionHeader
        index="003"
        label="Writing"
        title="Notes from the build."
        lede="Mostly things I got wrong first, and what the fix turned out to be."
        action={
          <Link
            href="/writing"
            className="link-mono t-label text-muted-foreground"
            onClick={() => track("cta_click", "navigation", { label: "view_all_posts" })}
          >
            All posts <span aria-hidden="true">→</span>
          </Link>
        }
      />

      {posts.length === 0 ? (
        <p className="t-mono text-muted-foreground rule-t pt-6">
          No posts yet. Check back soon.
        </p>
      ) : (
        <ul className="rule-t">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} index={i} className="rule-b">
              <Link
                href={`/writing/${post.slug}`}
                className="group block py-7 md:py-8"
                onClick={() =>
                  track("blog_click", "engagement", { slug: post.slug, title: post.title })
                }
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
                    <h3 className="t-display t-h3 md:text-[1.8rem] text-foreground group-hover:text-signal transition-colors duration-100">
                      {post.title}
                    </h3>
                    <p className="t-mono text-muted-foreground mt-3 line-clamp-2 max-w-2xl">
                      {post.excerpt}
                    </p>
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
          ))}
        </ul>
      )}
    </div>
  );
}
