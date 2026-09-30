import type { Metadata } from "next";
import { getAllPublished } from "@/lib/posts";
import WritingPageClient from "./WritingPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Thoughts on code, systems, and the messy process of turning ideas into products.",
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    url: "https://janardan.xyz/writing",
    title: "Writing · Janardan Hazarika",
    description:
      "Thoughts on code, systems, and the messy process of turning ideas into products.",
  },
};

export default async function WritingPage() {
  const posts = await getAllPublished();

  return (
    <WritingPageClient
      posts={posts.map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        date: new Date(p.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readTime: p.readTime,
        category: p.category,
        tags: p.tags,
        featured: p.featured,
        bannerImage: p.bannerImage,
      }))}
    />
  );
}
