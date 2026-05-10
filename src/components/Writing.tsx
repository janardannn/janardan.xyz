"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { track } from "@/lib/tracker"
import Link from "next/link"
import Image from "next/image"
import { formatPostCategoryLabel, postCategoryBadgeClass } from "@/lib/postCardMeta"

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
    <section className="py-24 relative overflow-hidden">
      <div className="container px-6 mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif mb-3">
            Latest Writing
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Thoughts on code, systems, and the messy process of turning ideas into products.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground py-8">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-6 mb-12">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
                    <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                      <Badge className={postCategoryBadgeClass}>
                        {formatPostCategoryLabel(post.category)}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="font-bold text-lg text-foreground group-hover:text-pop transition-colors mb-1.5 font-serif leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-pop group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1 hidden md:block" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="btn-ghost"
          >
            <Link href="/writing" onClick={() => track("cta_click", "navigation", { label: "view_all_posts" })}>
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
