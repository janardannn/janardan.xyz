import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { getBySlug, incrementViews } from "@/lib/posts";
import BlogPostClient from "./BlogPostClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBySlug(slug);

  if (!post || !post.published) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  const url = `https://janardan.xyz/writing/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    // Declared per-post. The root layout deliberately sets no canonical, since
    // that would make every post claim to be a duplicate of the homepage.
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ["Janardan Hazarika"],
      tags: post.tags,
      ...(post.bannerImage ? { images: [{ url: post.bannerImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.bannerImage ? { images: [post.bannerImage] } : {}),
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Deferred so a view counter write never sits in the render path.
  after(async () => {
    try {
      await incrementViews(slug);
    } catch {
      // A failed counter must not surface to the reader.
    }
  });

  return (
    <BlogPostClient
      post={{
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        bannerImage: post.bannerImage,
        views: post.views,
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
