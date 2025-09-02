"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const allPosts = [
    {
        title: "Building Scalable React Applications with Modern Architecture",
        excerpt: "Explore best practices for structuring large React applications with performance optimization and maintainable code patterns.",
        date: "August 15, 2025",
        slug: "scalable-react-architecture",
        readTime: "8 min read",
        tags: ["React", "Architecture", "Performance"],
        featured: true
    },
    {
        title: "TypeScript Tips That Will Level Up Your Development",
        excerpt: "Advanced TypeScript techniques that every developer should know to write safer, more expressive code.",
        date: "August 8, 2025",
        slug: "typescript-advanced-tips",
        readTime: "6 min read",
        tags: ["TypeScript", "Tips", "Development"],
        featured: true
    },
    {
        title: "The Future of Web Development: What's Coming in 2025",
        excerpt: "A deep dive into emerging technologies and trends that will shape the future of web development.",
        date: "July 30, 2025",
        slug: "future-web-development-2025",
        readTime: "10 min read",
        tags: ["Web Development", "Trends", "Future"],
        featured: false
    },
    {
        title: "Mastering CSS Grid: Advanced Layout Techniques",
        excerpt: "Deep dive into CSS Grid with practical examples and advanced techniques for complex layouts.",
        date: "July 22, 2025",
        slug: "mastering-css-grid",
        readTime: "7 min read",
        tags: ["CSS", "Grid", "Layout"],
        featured: false
    },
    {
        title: "API Design Best Practices for Modern Applications",
        excerpt: "Essential principles for designing robust, scalable APIs that stand the test of time.",
        date: "July 15, 2025",
        slug: "api-design-best-practices",
        readTime: "9 min read",
        tags: ["API", "Design", "Backend"],
        featured: false
    },
    {
        title: "State Management in React: A Complete Guide",
        excerpt: "From useState to Zustand - choosing the right state management solution for your React application.",
        date: "July 8, 2025",
        slug: "react-state-management-guide",
        readTime: "12 min read",
        tags: ["React", "State Management", "Zustand"],
        featured: false
    }
]

export default function WritingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-slate-600/5"
                animate={{
                    background: [
                        "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(71, 85, 105, 0.05))",
                        "linear-gradient(to right, rgba(71, 85, 105, 0.05), rgba(59, 130, 246, 0.05))",
                        "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(71, 85, 105, 0.05))"
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Hero Section */}
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
                            Thoughts on web development, technology trends, and lessons learned from building digital products.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="py-24 relative overflow-hidden">
                <div className="container px-6 mx-auto max-w-7xl relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                            Featured Articles
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Deep dives into web development and technology
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {allPosts.filter(post => post.featured).map((post, index) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group"
                            >
                                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-gray-900/30 backdrop-blur-sm rounded-3xl hover:scale-[1.02]">
                                    {/* Article Header */}
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400/20 via-gray-800/40 to-slate-800/60">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_70%)]" />

                                        {/* Meta Badge */}
                                        <div className="absolute top-6 left-6">
                                            <Badge className="px-3 py-1 text-xs font-medium rounded-full border-0 bg-blue-500/90 text-white">
                                                Featured
                                            </Badge>
                                        </div>

                                        {/* Read Time */}
                                        <div className="absolute top-6 right-6">
                                            <div className="flex items-center text-xs text-blue-300 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-8">
                                        <div className="flex items-center text-sm text-gray-400 mb-4">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {post.date}
                                        </div>

                                        <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                                            {post.title}
                                        </CardTitle>

                                        <CardDescription className="text-gray-300 text-base leading-relaxed mb-6">
                                            {post.excerpt}
                                        </CardDescription>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {post.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="border-blue-400/30 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <Button
                                            variant="outline"
                                            asChild
                                            className="w-full border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-105 transition-all duration-200"
                                        >
                                            <Link href={`/writing/${post.slug}`} className="flex items-center justify-center">
                                                Read Article
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Posts */}
            <section className="py-24 relative overflow-hidden">
                <div className="container px-6 mx-auto max-w-7xl relative z-10">
                    <motion.h3
                        className="text-3xl font-bold text-white mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        All Articles
                    </motion.h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allPosts.filter(post => !post.featured).map((post, index) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gray-900/30 backdrop-blur-sm rounded-2xl hover:scale-[1.02] overflow-hidden">
                                    <div className="relative h-40 bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-slate-800/40">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(59,130,246,0.08),transparent_70%)]" />

                                        {/* Read Time Badge */}
                                        <div className="absolute top-4 right-4">
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
                </div>
            </section>
        </div>
    )
}
