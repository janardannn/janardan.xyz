"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  featured: boolean;
  date: string;
  views: number;
}

export default function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();

  async function togglePublish(id: string, published: boolean) {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    router.refresh();
  }

  async function toggleFeatured(id: string, featured: boolean) {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !featured }),
    });
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 mb-4">No posts yet</p>
        <Link
          href="/admin/write"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Write your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-white font-medium truncate">{post.title}</h3>
              {post.featured && (
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
              )}
              <span
                className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                  post.published
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{post.category}</span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>{post.views} views</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => togglePublish(post.id, post.published)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title={post.published ? "Unpublish" : "Publish"}
            >
              {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <button
              onClick={() => toggleFeatured(post.id, post.featured)}
              className={`p-2 rounded-lg transition-colors ${
                post.featured
                  ? "text-yellow-400 hover:bg-gray-800"
                  : "text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
              }`}
              title={post.featured ? "Remove featured" : "Mark featured"}
            >
              <Star className="h-4 w-4" />
            </button>
            <Link
              href={`/admin/edit/${post.id}`}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
