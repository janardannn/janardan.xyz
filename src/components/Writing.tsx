"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, Eye, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

const posts = [
    {
        title: "Building Scalable React Applications with Modern Architecture",
        excerpt: "Explore best practices for structuring large React applications with performance optimization, state management, and maintainable code patterns that scale with your team.",
        date: "August 15, 2025",
        slug: "scalable-react-architecture",
        readTime: "8 min read",
        category: "React",
        views: 1234,
        likes: 89,
        comments: 23,
        featured: true
    },
    {
        title: "TypeScript Tips That Will Level Up Your Development",
        excerpt: "Advanced TypeScript techniques that every developer should know to write safer, more expressive code with better tooling support and fewer runtime errors.",
        date: "August 8, 2025",
        slug: "typescript-advanced-tips",
        readTime: "6 min read",
        category: "TypeScript",
        views: 987,
        likes: 67,
        comments: 15,
        featured: true
    },
    {
        title: "The Future of Web Development: What's Coming in 2025",
        excerpt: "A comprehensive look at emerging technologies and trends that will shape the future of web development, from AI integration to new frameworks.",
        date: "July 30, 2025",
        slug: "future-web-development-2025",
        readTime: "10 min read",
        category: "Web Development",
        views: 2156,
        likes: 134,
        comments: 41,
        featured: false
    },
    {
        title: "Mastering CSS Grid: From Basics to Advanced Layouts",
        excerpt: "Complete guide to CSS Grid layout with practical examples, tips for responsive design, and common patterns used in modern web development.",
        date: "July 22, 2025",
        slug: "mastering-css-grid",
        readTime: "7 min read",
        category: "CSS",
        views: 876,
        likes: 52,
        comments: 18,
        featured: false
    },
    {
        title: "Performance Optimization Techniques for Next.js",
        excerpt: "Learn how to optimize your Next.js applications for better performance, including image optimization, code splitting, and caching strategies.",
        date: "July 15, 2025",
        slug: "nextjs-performance-optimization",
        readTime: "9 min read",
        category: "Next.js",
        views: 1543,
        likes: 98,
        comments: 27,
        featured: false
    }
]

const categories = ["All", "React", "TypeScript", "Web Development", "CSS", "Next.js"]

export default function Writing() {
    const featuredPosts = posts.filter(post => post.featured)
    const regularPosts = posts.filter(post => !post.featured)

    return (
        <section className="py-24 bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-3"></div>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-slate-600/5"
                animate={{
                    background: [
                        "linear-gradient(to right, rgba(16, 185, 129, 0.05), rgba(71, 85, 105, 0.05))",
                        "linear-gradient(to right, rgba(71, 85, 105, 0.05), rgba(16, 185, 129, 0.05))",
                        "linear-gradient(to right, rgba(16, 185, 129, 0.05), rgba(71, 85, 105, 0.05))"
                    ]
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

                {/* Categories Filter */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <Badge
                            key={category}
                            variant="outline"
                            className="cursor-pointer px-4 py-2 text-sm bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50 hover:text-white hover:border-emerald-400 transition-all duration-200"
                        >
                            {category}
                        </Badge>
                    ))}
                </motion.div>

                {/* Posts */}
                <motion.h3
                    className="text-2xl font-bold text-white mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Latest Articles
                </motion.h3>

                {/* CMS under dev warning */}
                <motion.h3
                    className="text-2xl font-bold text-orange-800 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    CMS for this site is under development. Articles are just placeholders for now.
                </motion.h3>

                {/* Regular Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {regularPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gray-900/30 backdrop-blur-sm rounded-2xl hover:scale-[1.02] overflow-hidden">
                                <Link href={`/writing/${post.slug}`}>
                                    {/* <div className="relative h-6 bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-slate-800/40">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(16,185,129,0.08),transparent_70%)]" />

                                        Category Badge
                                        <div className="absolute top-4 left-4">
                                            <Badge className="px-2 py-1 text-xs font-medium rounded-full border-0 bg-emerald-500/90 text-white">
                                                {post.category}
                                            </Badge>
                                        </div>

                                        Article Stats
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <Eye className="h-3 w-3 text-blue-400" />
                                                <span className="text-xs text-white">{post.views}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <Heart className="h-3 w-3 text-red-400" />
                                                <span className="text-xs text-white">{post.likes}</span>
                                            </div>
                                        </div>
                                    </div> */}

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

                                        {/* Article Meta */}
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

                                        {/* Read More */}
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

                {/* View All Posts Button */}
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
    )
}
