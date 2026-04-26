import { notFound } from "next/navigation";
import { getById } from "@/lib/posts";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getById(id);

  if (!post) notFound();

  return (
    <div>
      <PostEditor
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          readTime: post.readTime,
          tags: post.tags,
          category: post.category,
          featured: post.featured,
          published: post.published,
          bannerImage: post.bannerImage,
        }}
      />
    </div>
  );
}
