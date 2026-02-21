import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import About from "@/components/About"
import Writing from "@/components/Writing"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import { getRecent } from "@/lib/posts"

export const dynamic = "force-dynamic";

export default async function Home() {
  const recentPosts = await getRecent(3);

  const posts = recentPosts.map((p) => ({
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
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <Navigation />

      <section id="home">
        <Hero />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="writing">
        <Writing posts={posts} />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </div>
  )
}
