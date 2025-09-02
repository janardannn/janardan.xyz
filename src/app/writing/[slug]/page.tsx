"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// This will come from a CMS or markdown files
const getBlogPost = async (slug: string) => {
    const posts = {
        "scalable-react-architecture": {
            title: "Building Scalable React Applications with Modern Architecture",
            date: "August 15, 2025",
            readTime: "8 min read",
            tags: ["React", "Architecture", "Performance"],
            content: `
        <p>Building scalable React applications requires careful planning and architectural decisions from the very beginning. In this comprehensive guide, we'll explore the patterns and practices that have proven successful in large-scale applications.</p>
        
        <h2>Component Architecture</h2>
        <p>One of the most critical aspects of scalable React applications is establishing a clear component hierarchy and architecture pattern...</p>
        
        <h2>State Management Strategies</h2>
        <p>As your application grows, managing state becomes increasingly complex. Here are the strategies that work best...</p>
        
        <h2>Performance Optimization</h2>
        <p>Performance should be a consideration from day one, not an afterthought...</p>
      `
        },
        "typescript-advanced-tips": {
            title: "TypeScript Tips That Will Level Up Your Development",
            date: "August 8, 2025",
            readTime: "6 min read",
            tags: ["TypeScript", "Tips", "Development"],
            content: `
        <p>TypeScript has become an essential tool for modern web development. Beyond the basics, there are advanced techniques that can significantly improve your development experience and code quality.</p>
        
        <h2>Advanced Type Patterns</h2>
        <p>Learn about conditional types, mapped types, and template literal types...</p>
        
        <h2>Utility Types You Should Know</h2>
        <p>TypeScript provides several built-in utility types that can save you time...</p>
      `
        }
    }

    return posts[slug as keyof typeof posts] || null
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b bg-gray-50">
                <div className="container px-4 mx-auto py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Button variant="ghost" asChild className="mb-6">
                            <Link href="/writing">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Writing
                            </Link>
                        </Button>

                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center text-gray-600 mb-6">
                                <Calendar className="h-4 w-4 mr-2" />
                                {post.date}
                                <Clock className="h-4 w-4 ml-6 mr-2" />
                                {post.readTime}
                                <Button variant="ghost" size="sm" className="ml-auto">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container px-4 mx-auto py-12">
                <motion.article
                    className="max-w-4xl mx-auto prose prose-lg prose-gray"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="my-12" />

                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <p className="text-gray-600 mb-6">
                        Thanks for reading! If you enjoyed this post, feel free to share it with others.
                    </p>
                    <Button asChild>
                        <Link href="/writing">Read More Posts</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}
