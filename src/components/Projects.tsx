"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink, Github, ArrowRight, Star, GitFork, X } from "lucide-react"
import { track } from "@/lib/tracker"
import { parseRepoFromUrl, type RepoStats } from "@/lib/github"
import Image from "next/image"

function FeaturedImageCarousel({ images, alt, onImageClick }: { images: string[]; alt: string; onImageClick?: (index: number) => void }) {
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
    const next = () => setIndex((i) => (i + 1) % images.length)

    useEffect(() => {
        if (paused || images.length <= 1) return
        const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500)
        return () => clearInterval(id)
    }, [paused, images.length, index])

    return (
        <div
            className="absolute inset-0 cursor-zoom-in"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onClick={() => onImageClick?.(index)}
        >
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index]}
                        alt={`${alt} — screenshot ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                </motion.div>
            </AnimatePresence>

            <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
            <button
                type="button"
                aria-label="Next image"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
            >
                <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {images.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to image ${i + 1}`}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i) }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
                    />
                ))}
            </div>
        </div>
    )
}

function Lightbox({
    images,
    startIndex,
    alt,
    onClose,
}: {
    images: string[]
    startIndex: number
    alt: string
    onClose: () => void
}) {
    const [index, setIndex] = useState(startIndex)
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
    const next = () => setIndex((i) => (i + 1) % images.length)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" || e.key === "x" || e.key === "X") onClose()
            else if (e.key === "ArrowLeft") prev()
            else if (e.key === "ArrowRight") next()
        }
        window.addEventListener("keydown", onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = prevOverflow
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.length])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            <button
                type="button"
                aria-label="Close"
                onClick={(e) => { e.stopPropagation(); onClose() }}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            >
                <X className="h-6 w-6" />
            </button>

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous image"
                        onClick={(e) => { e.stopPropagation(); prev() }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next image"
                        onClick={(e) => { e.stopPropagation(); next() }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/80 text-sm font-mono">
                        {index + 1} / {images.length}
                    </div>
                </>
            )}

            <div
                className="relative w-[92vw] h-[88vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[index]}
                            alt={`${alt} — screenshot ${index + 1}`}
                            layout="fill"
                            objectFit="contain"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

const projects = [
    {
        title: "ai-eval-lab - AI-Proctored Skill Assessment Platform",
        description: "An AI-proctored exam platform for professional engineering tools (EDA, CAD) like KiCad that streams real desktop applications to the browser via a VNC pipeline. Features dynamic Docker container provisioning, a real-time telemetry pipeline that polls KiCad board state every 3s, and a three-phase AI proctor using Gemini for adaptive questioning and rubric-based grading, with ElevenLabs TTS/STT for voice interaction.",
        tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "KiCad", "Gemini", "ElevenLabs", "noVNC"],
        liveUrl: "https://ai-eval-lab.janardan.xyz/",
        githubUrl: "https://github.com/janardannn/ai-eval-lab",
        image: "/projects/ai-eval-lab.jpg",
        images: [
            "/projects/ael/1.jpeg",
            "/projects/ael/2.jpeg",
            "/projects/ael/3.jpeg",
            "/projects/ael/4.jpeg",
            "/projects/ael/5.jpeg",
            "/projects/ael/6.jpeg",
            "/projects/ael/7.jpeg",
            "/projects/ael/8.jpeg",
        ],
        featured: true,
        status: "Live"
    },
    {
        title: "taimumashin - Personal Cold Storage Archive",
        description: "A BYOA (Bring Your Own AWS) personal archive on S3 Glacier Deep Archive — users deploy their own AWS stack via a single CloudFormation template that provisions S3 buckets, lifecycle rules, IAM roles, and Lambda functions. Features browser-to-S3 direct uploads with presigned URLs, client-side Canvas thumbnails, and multi-tenant auth via STS AssumeRoleWithWebIdentity that scopes each user's browser session to their own bucket with auto-refreshing temporary credentials.",
        tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AWS S3 Glacier", "STS", "CloudFormation", "Lambda", "Vercel"],
        liveUrl: "",
        githubUrl: "https://github.com/janardannn/taimumashin",
        image: "",
        tag: "Self-Hostable",
        hideStatusBadge: true,
        images: [
            "/projects/tm/1.jpeg",
            "/projects/tm/2.jpeg",
            "/projects/tm/3.jpeg",
            "/projects/tm/4.jpeg",
            "/projects/tm/5.jpeg",
            "/projects/tm/6.jpeg",
            "/projects/tm/7.jpeg",
            "/projects/tm/8.jpeg",
            "/projects/tm/9.jpeg",
            "/projects/tm/10.jpeg",
        ],
        featured: true,
        status: "Development"
    },
    {
        title: "rents.app - A fullstack user centric, map based rental platform.",
        description: "A modern, full-stack rental platform focused on helping users find and secure rentals, PGs, and shared accommodations. Built using Next.js, TypeScript and Map using Mapbox API.",
        tech: ["Next.js", "TypeScript", "Mapbox API", "PostgreSQL", "Prisma", "TailwindCSS"],
        liveUrl: "https://rents-app-theta.vercel.app/",
        githubUrl: "https://github.com/janardannn/rents.app",
        image: "/projects/rents.app.jpg",
        featured: true,
        status: "Development"
    },
]

export default function Projects({ repoStats }: { repoStats?: Record<string, RepoStats> }) {
    const statsFor = (githubUrl: string): RepoStats => {
        const repo = parseRepoFromUrl(githubUrl)
        return (repo && repoStats?.[repo]) || { stars: 0, forks: 0 }
    }

    const [lightbox, setLightbox] = useState<{ images: string[]; startIndex: number; alt: string } | null>(null)
    const openLightbox = (images: string[], startIndex: number, alt: string) => {
        track("project_click", "engagement", {
            project: alt,
            action: "open_lightbox",
            startIndex,
            imageCount: images.length,
        })
        setLightbox({ images, startIndex, alt })
    }
    const closeLightbox = () => setLightbox(null)

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
                    {projects.filter(project => project.featured).map((project, index) => {
                        const liveStats = statsFor(project.githubUrl)
                        return (
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
                                    {project.images && project.images.length > 0 ? (
                                        <FeaturedImageCarousel
                                            images={project.images}
                                            alt={project.title}
                                            onImageClick={(i) => openLightbox(project.images!, i, project.title)}
                                        />
                                    ) : project.image === "" ? (
                                        <div className="absolute inset-0 bg-muted" />
                                    ) : (
                                        <div
                                            className="absolute inset-0 cursor-zoom-in"
                                            onClick={() => openLightbox([project.image], 0, project.title)}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6 flex gap-2">
                                        {!project.hideStatusBadge && (
                                            <Badge className={`px-3 py-1 text-xs font-medium rounded-full border-0 ${project.status === 'Live'
                                                ? 'bg-emerald-500/90 text-white'
                                                : 'bg-amber-500/90 text-white'
                                                }`}>
                                                {project.status}
                                            </Badge>
                                        )}
                                        {project.tag && (
                                            <Badge className="px-3 py-1 text-xs font-medium rounded-full border-0 bg-indigo-500/90 text-white">
                                                {project.tag}
                                            </Badge>
                                        )}
                                    </div>
                                    {(liveStats.stars > 0 || liveStats.forks > 0) &&
                                        <div className="absolute bottom-4 right-4 flex gap-2 pointer-events-none">
                                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <Star className="h-3 w-3 text-amber-400" />
                                                <span className="text-xs text-white">{liveStats.stars}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <GitFork className="h-3 w-3 text-blue-400" />
                                                <span className="text-xs text-white">{liveStats.forks}</span>
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
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2"
                                                    onClick={() => track("project_click", "engagement", { project: project.title, action: "view_live" })}>
                                                    <ExternalLink className="h-4 w-4" />
                                                    View Project
                                                </a>
                                            </Button>
                                            <Button variant="outline" asChild className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200 px-4">
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                    onClick={() => track("project_click", "engagement", { project: project.title, action: "view_code" })}>
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
                        )
                    })}
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
                                        <div
                                            className="absolute inset-0 cursor-zoom-in"
                                            onClick={() => openLightbox([project.image], 0, project.title)}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    }
                                    <div className="absolute top-4 left-4">
                                        <Badge className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${project.status === 'Live'
                                            ? 'bg-emerald-500/90 text-white'
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
                            track("cta_click", "navigation", { label: "view_all_projects" })
                            window.open("https://github.com/janardannn?tab=repositories", "_blank")
                        }}
                    >
                        View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </div>

            <AnimatePresence>
                {lightbox && (
                    <Lightbox
                        images={lightbox.images}
                        startIndex={lightbox.startIndex}
                        alt={lightbox.alt}
                        onClose={closeLightbox}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}
