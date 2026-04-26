import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllPosts, createPost } from "@/lib/posts";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, slug, excerpt, content, readTime, tags, category, featured, published, bannerImage } = body;

  if (!title || !slug || !excerpt || !content || !readTime || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const post = await createPost({
    title,
    slug,
    excerpt,
    content,
    readTime,
    tags: tags || [],
    category,
    featured: featured || false,
    published: published || false,
    bannerImage,
  });

  return NextResponse.json(post, { status: 201 });
}
