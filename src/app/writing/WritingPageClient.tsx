"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  formatPostCategoryLabel,
  postCategoryBadgeClass,
  postTagBadgeClass,
  tagsExcludingCategory,
} from "@/lib/postCardMeta";
import { track } from "@/lib/tracker";

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
      {/* Header */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              asChild
              size="sm"
              className="mb-8 border-border/50 hover:bg-secondary"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-3">
              Writing
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Thoughts on code, systems, and the messy process of turning ideas into products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-24 relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-4xl relative z-10">
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-1">
              {posts.map((post, index) => {
                const extraTags = tagsExcludingCategory(post.tags, post.category);
                return (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                  >
                    <Link
                      href={`/writing/${post.slug}`}
                      onClick={() => track("blog_click", "engagement", { slug: post.slug, title: post.title })}
                      className="group flex gap-5 items-start p-4 -mx-4 rounded-xl hover:bg-card/60 transition-colors"
                    >
                      {post.bannerImage && (
                        <div className="relative w-72 h-40 shrink-0 rounded-xl overflow-hidden hidden sm:block">
                          <Image
                            src={post.bannerImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={postCategoryBadgeClass}>
                            {formatPostCategoryLabel(post.category)}
                          </Badge>
                          {extraTags.slice(0, 3).map((tag) => (
                            <Badge key={tag} className={postTagBadgeClass}>
                              {tag}
                            </Badge>
                          ))}
                          {extraTags.length > 3 && (
                            <span className="text-[11px] text-muted-foreground">+{extraTags.length - 3}</span>
                          )}
                        </div>

                        <h4 className="font-bold text-lg text-foreground group-hover:text-pop transition-colors mb-1.5 font-serif leading-snug">
                          {post.title}
                        </h4>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-pop group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1 hidden md:block" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
