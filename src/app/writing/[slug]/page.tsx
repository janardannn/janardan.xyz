import { notFound } from "next/navigation";
import { getBySlug, incrementViews } from "@/lib/posts";
import BlogPostClient from "./BlogPostClient";

export const dynamic = "force-dynamic";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  await incrementViews(slug);

  return (
    <BlogPostClient
      post={{
        title: post.title,
        date: new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readTime: post.readTime,
        tags: post.tags,
        content: post.content,
      }}
    />
  );
}
