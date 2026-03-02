import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import About from "@/components/About"
import Writing from "@/components/Writing"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import { SectionTracker } from "@/components/SectionTracker"
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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section id="home">
        <SectionTracker sectionId="home" />
        <Hero />
      </section>

      <section id="projects">
        <SectionTracker sectionId="projects" />
        <Projects />
      </section>

      <section id="about">
        <SectionTracker sectionId="about" />
        <About />
      </section>

      <section id="writing">
        <SectionTracker sectionId="writing" />
        <Writing posts={posts} />
      </section>

      <section id="contact">
        <SectionTracker sectionId="contact" />
        <Contact />
      </section>

      <Footer />
    </div>
  )
}
