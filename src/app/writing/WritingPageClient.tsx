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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-slate-600/5"
        animate={{
          background: [
            "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(71, 85, 105, 0.05))",
            "linear-gradient(to right, rgba(71, 85, 105, 0.05), rgba(59, 130, 246, 0.05))",
            "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(71, 85, 105, 0.05))",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              variant="outline"
              asChild
              className="mb-8 border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-105 transition-all duration-200"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>

            <h1 className="text-4xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Writing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Thoughts on code, systems, and the messy process of turning ideas into products.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-7xl relative z-10">
          <motion.h3
            className="text-3xl font-bold text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            All Articles
          </motion.h3>

          {posts.length === 0 ? (
            <p className="text-gray-400 text-center py-16">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gray-900/30 backdrop-blur-sm rounded-2xl hover:scale-[1.02] overflow-hidden">
                    <div className="relative bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-slate-800/40">
                      <div className="absolute right-4">
                        <div className="flex items-center text-xs text-blue-300 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-400 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {post.date}
                      </div>

                      <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors mb-3">
                        {post.title}
                      </h4>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-blue-400/30 text-blue-300 bg-blue-500/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-gray-400">+{post.tags.length - 2}</span>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        asChild
                        size="sm"
                        className="w-full border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-105 transition-all duration-200"
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
