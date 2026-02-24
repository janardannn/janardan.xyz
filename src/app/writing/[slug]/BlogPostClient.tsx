"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2, Check } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50">
        <div className="container px-4 mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" asChild className="mb-6 text-muted-foreground hover:text-foreground">
              <Link href="/writing">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Writing
              </Link>
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-pop/30 text-pop-muted bg-pop/10">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground font-serif">
                {post.title}
              </h1>

              <div className="flex items-center text-muted-foreground mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
                <Clock className="h-4 w-4 ml-6 mr-2" />
                {post.readTime}
                <Button variant="ghost" size="sm" onClick={handleShare} className="ml-auto text-muted-foreground hover:text-foreground">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                  {copied ? "Link Copied!" : "Share"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container px-4 mx-auto py-12">
        <motion.article
          className="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </motion.article>

        <Separator className="my-12" />

        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-muted-foreground mb-6">
            Thanks for reading! If you enjoyed this post, feel free to share it with others.
          </p>
          <Button asChild variant="outline" className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200">
            <Link href="/writing">Read More Posts</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
