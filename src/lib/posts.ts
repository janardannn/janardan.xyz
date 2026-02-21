import { getPrisma } from "./db";

export async function getAllPublished() {
  const prisma = await getPrisma();
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
}

export async function getFeatured() {
  const prisma = await getPrisma();
  return prisma.post.findMany({
    where: { published: true, featured: true },
    orderBy: { date: "desc" },
    take: 3,
  });
}

export async function getRecent(count = 3) {
  const prisma = await getPrisma();
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    take: count,
  });
}

export async function getBySlug(slug: string) {
  const prisma = await getPrisma();
  return prisma.post.findUnique({ where: { slug } });
}

export async function getById(id: string) {
  const prisma = await getPrisma();
  return prisma.post.findUnique({ where: { id } });
}

export async function getAllPosts() {
  const prisma = await getPrisma();
  return prisma.post.findMany({ orderBy: { date: "desc" } });
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  readTime: string;
  tags: string[];
  category: string;
  featured?: boolean;
  published?: boolean;
}) {
  const prisma = await getPrisma();
  return prisma.post.create({ data });
}

export async function updatePost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    readTime?: string;
    tags?: string[];
    category?: string;
    featured?: boolean;
    published?: boolean;
  }
) {
  const prisma = await getPrisma();
  return prisma.post.update({ where: { id }, data });
}

export async function deletePost(id: string) {
  const prisma = await getPrisma();
  return prisma.post.delete({ where: { id } });
}

export async function incrementViews(slug: string) {
  const prisma = await getPrisma();
  return prisma.post.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}
