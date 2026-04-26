import { getAllPublished } from "@/lib/posts";
import WritingPageClient from "./WritingPageClient";

export const dynamic = "force-dynamic";

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
