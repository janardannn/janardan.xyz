"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export default function WritingPageClient({ posts }: { posts: Post[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-24 relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              asChild
              className="mb-8 border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-all duration-200"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>

            <h1 className="text-4xl md:text-4xl font-bold mb-6 text-foreground">
              Writing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Thoughts on code, systems, and the messy process of turning ideas into products.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-7xl relative z-10">
          <motion.h3
            className="text-3xl font-bold text-foreground mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            All Articles
          </motion.h3>

          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {post.date}
                        </div>
                        <div className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      <h4 className="font-bold text-lg text-foreground group-hover:text-pop transition-colors mb-3">
                        {post.title}
                      </h4>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-pop/30 text-pop-muted bg-pop/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{post.tags.length - 2}</span>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        asChild
                        size="sm"
                        className="w-full border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-all duration-200"
                      >
                        <Link href={`/writing/${post.slug}`} className="flex items-center justify-center">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
