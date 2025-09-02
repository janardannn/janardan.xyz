"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

const allPosts = [
    {
        title: "Building Scalable React Applications with Modern Architecture",
        excerpt: "Explore best practices for structuring large React applications with performance optimization and maintainable code patterns.",
        date: "August 15, 2025",
        slug: "scalable-react-architecture",
        readTime: "8 min read",
        tags: ["React", "Architecture", "Performance"]
    },
    {
        title: "TypeScript Tips That Will Level Up Your Development",
        excerpt: "Advanced TypeScript techniques that every developer should know to write safer, more expressive code.",
        date: "August 8, 2025",
        slug: "typescript-advanced-tips",
        readTime: "6 min read",
        tags: ["TypeScript", "Tips", "Development"]
    },
    {
        title: "The Future of Web Development: What's Coming in 2025",
        excerpt: "A deep dive into emerging technologies and trends that will shape the future of web development.",
        date: "July 30, 2025",
        slug: "future-web-development-2025",
        readTime: "10 min read",
        tags: ["Web Development", "Trends", "Future"]
    },
    {
        title: "Mastering CSS Grid: Advanced Layout Techniques",
        excerpt: "Deep dive into CSS Grid with practical examples and advanced techniques for complex layouts.",
        date: "July 22, 2025",
        slug: "mastering-css-grid",
        readTime: "7 min read",
        tags: ["CSS", "Grid", "Layout"]
    },
    {
        title: "API Design Best Practices for Modern Applications",
        excerpt: "Essential principles for designing robust, scalable APIs that stand the test of time.",
        date: "July 15, 2025",
        slug: "api-design-best-practices",
        readTime: "9 min read",
        tags: ["API", "Design", "Backend"]
    },
    {
        title: "State Management in React: A Complete Guide",
        excerpt: "From useState to Zustand - choosing the right state management solution for your React application.",
        date: "July 8, 2025",
        slug: "react-state-management-guide",
        readTime: "12 min read",
        tags: ["React", "State Management", "Zustand"]
    }
]

export default function WritingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container px-4 mx-auto py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Button variant="ghost" asChild className="mb-6">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Portfolio
                            </Link>
                        </Button>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Writing</h1>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            Thoughts on web development, technology trends, and lessons learned from building digital products
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="container px-4 mx-auto py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <Card className="group hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
                                <Link href={`/writing/${post.slug}`}>
                                    <CardHeader>
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {post.date}
                                            <Clock className="h-4 w-4 ml-4 mr-2" />
                                            {post.readTime}
                                        </div>

                                        <CardTitle className="group-hover:text-purple-600 transition-colors leading-tight mb-3">
                                            {post.title}
                                        </CardTitle>

                                        <CardDescription className="text-base leading-relaxed mb-4">
                                            {post.excerpt}
                                        </CardDescription>

                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary">{tag}</Badge>
                                            ))}
                                        </div>
                                    </CardHeader>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
