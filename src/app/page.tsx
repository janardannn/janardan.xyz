import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TelemetryStrip from "@/components/site/TelemetryStrip";
import { SectionTracker } from "@/components/SectionTracker";
import { getRecent } from "@/lib/posts";
import { getRepoStats } from "@/lib/github";
import { getSiteStats } from "@/lib/site-stats";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [recentPosts, repoStats, siteStats] = await Promise.all([
    getRecent(3),
    getRepoStats([
      "janardannn/ai-eval-lab",
      "janardannn/taimumashin",
      "janardannn/rents.app",
    ]),
    getSiteStats(),
  ]);

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
    bannerImage: p.bannerImage,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section id="home">
        <SectionTracker sectionId="home" />
        <Hero />
      </section>

      {/* The site reporting on itself, from its own analytics engine. */}
      <TelemetryStrip stats={siteStats} />

      <section id="projects">
        <SectionTracker sectionId="projects" />
        <Projects repoStats={repoStats} />
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
  );
}
