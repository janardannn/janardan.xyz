"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, Github, ArrowRight, Star, GitFork, X } from "lucide-react"
import { track } from "@/lib/tracker"
import { parseRepoFromUrl, type RepoStats } from "@/lib/github"
import Image from "next/image"

/* ─── Lightbox components ─── preserved exactly as they work ─── */

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

/* ─── Project data ─── */

const projects = [
    {
        title: "ai-eval-lab — AI-Proctored Skill Assessment Platform",
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
        title: "taimumashin — Personal Cold Storage Archive",
        description: "A BYOA (Bring Your Own AWS) personal archive on S3 Glacier Deep Archive — users deploy their own AWS stack via a single CloudFormation template that provisions S3 buckets, lifecycle rules, IAM roles, and Lambda functions. Features browser-to-S3 direct uploads with presigned URLs, client-side Canvas thumbnails, and multi-tenant auth via STS AssumeRoleWithWebIdentity.",
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
        title: "rents.app — Map-Based Rental Platform",
        description: "A modern, full-stack rental platform focused on helping users find and secure rentals, PGs, and shared accommodations. Built using Next.js, TypeScript and Mapbox API.",
        tech: ["Next.js", "TypeScript", "Mapbox API", "PostgreSQL", "Prisma", "TailwindCSS"],
        liveUrl: "https://rents-app-theta.vercel.app/",
        githubUrl: "https://github.com/janardannn/rents.app",
        image: "/projects/rents.app.jpg",
        featured: true,
        status: "Development"
    },
]

/* ─── Main component ─── */

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

    const featured = projects.filter(p => p.featured)
    const nonFeatured = projects.filter(p => !p.featured)

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-6 mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif mb-3">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground max-w-xl leading-relaxed">
                        A look at the projects where I&apos;ve built, debugged, and refined until it clicked.
                    </p>
                </motion.div>

                {/* Featured projects */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {featured.map((project, index) => {
                        const liveStats = statsFor(project.githubUrl)
                        return (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="surface-elevated overflow-hidden h-full flex flex-col">
                                    {/* Image area */}
                                    <div className="relative h-64 overflow-hidden">
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

                                        {/* Status pills */}
                                        <div className="absolute top-4 left-4 flex items-center gap-2">
                                            {!project.hideStatusBadge && (
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm ${
                                                    project.status === 'Live'
                                                        ? 'bg-emerald-600/85 text-white border border-emerald-400/40'
                                                        : 'bg-amber-600/85 text-white border border-amber-400/40'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full bg-white`} />
                                                    {project.status}
                                                </span>
                                            )}
                                            {project.tag && (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-600/85 text-white border border-indigo-400/40 backdrop-blur-sm">
                                                    {project.tag}
                                                </span>
                                            )}
                                        </div>

                                        {/* GitHub stats */}
                                        {(liveStats.stars > 0 || liveStats.forks > 0) && (
                                            <div className="absolute bottom-3 right-3 flex gap-2">
                                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                                                    <Star className="h-3 w-3 text-amber-400" />
                                                    <span className="text-xs text-white/90 font-mono">{liveStats.stars}</span>
                                                </div>
                                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                                                    <GitFork className="h-3 w-3 text-blue-400" />
                                                    <span className="text-xs text-white/90 font-mono">{liveStats.forks}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <CardTitle className="text-lg font-bold text-foreground mb-3 group-hover:text-pop transition-colors duration-300 font-serif">
                                            {project.title}
                                        </CardTitle>

                                        <CardDescription className="text-muted-foreground leading-relaxed mb-5 text-sm flex-1">
                                            {project.description}
                                        </CardDescription>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {project.tech.map((tech) => (
                                                <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-medium bg-secondary text-secondary-foreground border border-border/30">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        {project.status === 'Live' ? (
                                            <div className="flex gap-3">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="btn-primary flex-1"
                                                >
                                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                                        onClick={() => track("project_click", "engagement", { project: project.title, action: "view_live" })}>
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                        View Project
                                                    </a>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    asChild
                                                    className="px-3 border-border/50 hover:bg-secondary"
                                                >
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                        onClick={() => track("project_click", "engagement", { project: project.title, action: "view_code" })}>
                                                        <Github className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                                className="w-full border-border/50 hover:bg-secondary"
                                            >
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4 mr-2" />
                                                    View on GitHub
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Non-featured projects */}
                {nonFeatured.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {nonFeatured.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group"
                            >
                                <div className="surface-elevated overflow-hidden h-full">
                                    <div className="relative h-48 bg-muted overflow-hidden">
                                        {project.image === "" ? (
                                            <div className="absolute inset-0" />
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
                                        <div className="absolute top-3 left-3">
                                            <span className={`flex items-center gap-1.5 text-xs font-medium ${
                                                project.status === 'Live'
                                                    ? 'text-emerald-400'
                                                    : project.status === 'Beta'
                                                        ? 'text-amber-400'
                                                        : 'text-blue-400'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    project.status === 'Live' ? 'bg-emerald-400' : project.status === 'Beta' ? 'bg-amber-400' : 'bg-blue-400'
                                                }`} />
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>

                                    <CardContent className="p-5">
                                        <h4 className="font-bold text-base text-foreground group-hover:text-pop transition-colors mb-2">
                                            {project.title}
                                        </h4>
                                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.tech.slice(0, 4).map((tech) => (
                                                <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-medium bg-secondary text-secondary-foreground border border-border/30">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <Button asChild variant="outline" size="sm" className="w-full border-border/50 hover:bg-secondary">
                                            <a href={project.liveUrl === "" ? project.githubUrl : project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                                <ExternalLink className="h-3 w-3" />
                                                View Project
                                            </a>
                                        </Button>
                                    </CardContent>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* View all link */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <Button
                        size="lg"
                        variant="outline"
                        className="btn-ghost"
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
