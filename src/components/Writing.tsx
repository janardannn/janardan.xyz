"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { track } from "@/lib/tracker"
import Link from "next/link"
import Image from "next/image"

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
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground font-serif">
            Latest Writing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Thoughts on code, systems, and the messy process of turning ideas into products.
          </p>
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Latest Articles
        </motion.h3>

        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border border-border bg-card rounded-2xl hover:scale-[1.02] overflow-hidden">
                  <Link href={`/writing/${post.slug}`} onClick={() => track("blog_click", "engagement", { slug: post.slug, title: post.title })}>
                    {post.bannerImage && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.bannerImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <Badge className="px-2 py-1 text-xs font-medium rounded-full border-0 bg-pop/90 text-white mb-3 inline-block">
                        {post.category}
                      </Badge>
                      <h4 className="font-bold text-lg text-foreground group-hover:text-pop transition-colors mb-3 leading-tight font-serif">
                        {post.title}
                      </h4>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {post.excerpt.substring(0, 120)}...
                      </p>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200">
                          Read Article
                        </Button>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-pop group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200"
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
