"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostClientProps {
  post: {
    title: string;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
  };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="min-h-screen bg-white">
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

      <div className="container px-4 mx-auto py-12">
        <motion.article
          className="max-w-4xl mx-auto prose prose-lg prose-gray"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </motion.article>

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
  );
}
