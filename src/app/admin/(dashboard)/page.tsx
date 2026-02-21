import Link from "next/link";
import { PenSquare } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/admin/PostList";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Posts</h1>
        <Link
          href="/admin/write"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <PenSquare className="h-4 w-4" />
          New Post
        </Link>
      </div>
      <PostList posts={JSON.parse(JSON.stringify(posts))} />
    </div>
  );
}
