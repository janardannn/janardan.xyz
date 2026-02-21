"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export default function Writing({ posts }: { posts: Post[] }) {
  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-3"></div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-slate-600/5"
        animate={{
          background: [
            "linear-gradient(to right, rgba(16, 185, 129, 0.05), rgba(71, 85, 105, 0.05))",
            "linear-gradient(to right, rgba(71, 85, 105, 0.05), rgba(16, 185, 129, 0.05))",
            "linear-gradient(to right, rgba(16, 185, 129, 0.05), rgba(71, 85, 105, 0.05))",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Latest Writing
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Thoughts on code, systems, and the messy process of turning ideas into products.
          </p>
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Articles
        </motion.h3>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gray-900/30 backdrop-blur-sm rounded-2xl hover:scale-[1.02] overflow-hidden">
                  <Link href={`/writing/${post.slug}`}>
                    <div className="absolute top-4 left-4">
                      <Badge className="px-2 py-1 text-xs font-medium rounded-full border-0 bg-emerald-500/90 text-white">
                        {post.category}
                      </Badge>
                    </div>

                    <CardContent className="p-6">
                      <h4 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors mb-3 leading-tight">
                        {post.title}
                      </h4>

                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {post.excerpt.substring(0, 120)}...
                      </p>

                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-6">
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
                        <Button variant="outline" size="sm" className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200">
                          Read Article
                        </Button>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200" />
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
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
          >
            <Link href="/writing">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
