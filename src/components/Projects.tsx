"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight, Star, GitFork } from "lucide-react"
import Image from "next/image"

const projects = [
    {
        title: "ai-eval-lab - AI-Proctored Skill Assessment Platform",
        description: "An AI-proctored exam platform for professional engineering tools (EDA, CAD) that streams desktop environments to the browser via a VNC pipeline. Features dynamic Docker container provisioning, a three-phase AI proctor using Gemini for adaptive questioning and rubric-based grading, with ElevenLabs TTS/STT for voice interaction.",
        tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "Gemini", "ElevenLabs", "noVNC"],
        liveUrl: "",
        githubUrl: "https://github.com/janardannn/ai-eval-lab",
        image: "/projects/ai-eval-lab.jpg",
        stats: { stars: 0, forks: 0, contributors: 0 },
        featured: true,
        status: "Development"
    },
    {
        title: "scaler-lite - A fullstack online learning platform",
        description: "A full-stack online learning platform, supporting the entire lifecycle from course creation to student enrollment. Including sequential lecture access, progress tracking, and automated real-time quiz scoring. Secure role-based authorization and authentication (Student/Instructor).",
        tech: ["Next.js", "TypeScript", "Prisma", "MongoDB", "Tailwind CSS", "UploadThing", "NextAuth"],
        liveUrl: "https://scaler-lite.vercel.app/",
        githubUrl: "https://github.com/janardannn/scaler-lite",
        image: "/projects/scaler-lite.jpg",
        stats: { stars: 0, forks: 0, contributors: 0 },
        featured: true,
        status: "Live"
    },
    {
        title: "rents.app - A fullstack user centric, map based rental platform.",
        description: "A modern, full-stack rental platform focused on helping users find and secure rentals, PGs, and shared accommodations. Built using Next.js, TypeScript and Map using Mapbox API.",
        tech: ["Next.js", "TypeScript", "Mapbox API", "PostgreSQL", "Prisma", "TailwindCSS"],
        liveUrl: "https://rents-app-theta.vercel.app/",
        githubUrl: "https://github.com/janardannn/rents.app",
        image: "/projects/rents.app.jpg",
        stats: { stars: 0, forks: 0, contributors: 0 },
        featured: true,
        status: "Development"
    },
]

export default function Projects() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-6 mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-4xl font-bold mb-6 text-foreground font-serif">
                        Featured Projects
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        A look at the projects where I&apos;ve built, debugged, and refined until it clicked.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-28 mb-12">
                    {projects.filter(project => project.featured).map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <Card className="h-full hover:shadow-2xl transition-all duration-500 border border-border shadow-lg overflow-hidden bg-card rounded-3xl hover:scale-[1.02]">
                                <div className="relative h-84 overflow-hidden">
                                    {project.image === "" ?
                                        <div className="absolute inset-0 bg-muted" />
                                        : <Image
                                            src={project.image}
                                            alt={project.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-500 group-hover:scale-105"
                                        />
                                    }
                                    <div className="absolute top-6 left-6">
                                        <Badge className={`px-3 py-1 text-xs font-medium rounded-full border-0 ${project.status === 'Live'
                                            ? 'bg-pop/90 text-white'
                                            : 'bg-amber-500/90 text-white'
                                            }`}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                    {project.stats.stars > 0 &&
                                        <div className="absolute bottom-4 right-4 flex gap-2">
                                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <Star className="h-3 w-3 text-amber-400" />
                                                <span className="text-xs text-white">{project.stats.stars}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <GitFork className="h-3 w-3 text-blue-400" />
                                                <span className="text-xs text-white">{project.stats.forks}</span>
                                            </div>
                                        </div>
                                    }
                                </div>

                                <div className="p-8">
                                    <CardTitle className="text-2xl font-bold text-foreground mb-4 group-hover:text-pop transition-colors duration-300 font-serif">
                                        {project.title}
                                    </CardTitle>

                                    <CardDescription className="text-muted-foreground leading-relaxed mb-6 text-base">
                                        {project.description}
                                    </CardDescription>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs bg-secondary text-secondary-foreground border-border px-3 py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    {project.status === 'Live' ?
                                        <div className="flex gap-4">
                                            <Button asChild variant="outline" className="flex-1 border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200">
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                                    <ExternalLink className="h-4 w-4" />
                                                    View Project
                                                </a>
                                            </Button>
                                            <Button variant="outline" asChild className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200 px-4">
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                        :
                                        <Button variant="outline" asChild className="w-full border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200 px-4">
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    }
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {projects.filter(project => !project.featured).map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group"
                        >
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border border-border bg-card rounded-2xl hover:scale-[1.02] overflow-hidden">
                                <div className="relative h-56 bg-muted">
                                    {project.image === "" ?
                                        <div className="absolute inset-0" />
                                        :
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-500 group-hover:scale-105"
                                        />
                                    }
                                    <div className="absolute top-4 left-4">
                                        <Badge className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${project.status === 'Live'
                                            ? 'bg-pop/90 text-white'
                                            : project.status === 'Beta'
                                                ? 'bg-amber-500/90 text-white'
                                                : 'bg-blue-500/90 text-white'
                                            }`}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                            className="p-2 bg-black/40 backdrop-blur-sm rounded-lg hover:scale-110 transition-transform">
                                            <Github className="h-4 w-4 text-white" />
                                        </a>
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                            className="p-2 bg-black/40 backdrop-blur-sm rounded-lg hover:scale-110 transition-transform">
                                            <ExternalLink className="h-4 w-4 text-white" />
                                        </a>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h4 className="font-bold text-lg text-foreground group-hover:text-pop transition-colors mb-3">
                                        {project.title}
                                    </h4>
                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs bg-secondary text-secondary-foreground border-border px-2 py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Button asChild variant="outline" size="sm" className="w-full border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200">
                                        <a href={project.liveUrl === "" ? project.githubUrl : project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                            <ExternalLink className="h-3 w-3" />
                                            View Project
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200"
                        onClick={() => {
                            window.open("https://github.com/janardannn?tab=repositories", "_blank")
                        }}
                    >
                        View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
