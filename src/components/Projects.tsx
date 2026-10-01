"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Star, GitFork, X } from "lucide-react";
import Image from "next/image";
import { track } from "@/lib/tracker";
import { parseRepoFromUrl, type RepoStats } from "@/lib/github";
import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/site/SectionHeader";
import HoverPreview from "@/components/site/HoverPreview";

/* ─── Lightbox ─── preserved exactly as it worked ─── */

function Lightbox({
  images,
  startIndex,
  alt,
  onClose,
}: {
  images: string[];
  startIndex: number;
  alt: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "x" || e.key === "X") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 text-white transition"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 text-white transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 text-white transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/80 t-mono tnum">
            {index + 1} / {images.length}
          </div>
        </>
      )}

      <div className="relative w-[92vw] h-[88vh]" onClick={(e) => e.stopPropagation()}>
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
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Project data ─── */

type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  images?: string[];
  tag?: string;
  hideStatusBadge?: boolean;
  featured: boolean;
  status: string;
};

const projects: Project[] = [
  {
    title: "ai-eval-lab — AI-Proctored Skill Assessment Platform",
    description:
      "An AI-proctored exam platform for professional engineering tools (EDA, CAD) like KiCad that streams real desktop applications to the browser via a VNC pipeline. Features dynamic Docker container provisioning, a real-time telemetry pipeline that polls KiCad board state every 3s, and a three-phase AI proctor using Gemini for adaptive questioning and rubric-based grading, with ElevenLabs TTS/STT for voice interaction.",
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
    status: "Live",
  },
  {
    title: "taimumashin — Personal Cold Storage Archive",
    description:
      "A BYOA (Bring Your Own AWS) personal archive on S3 Glacier Deep Archive — users deploy their own AWS stack via a single CloudFormation template that provisions S3 buckets, lifecycle rules, IAM roles, and Lambda functions. Features browser-to-S3 direct uploads with presigned URLs, client-side Canvas thumbnails, and multi-tenant auth via STS AssumeRoleWithWebIdentity.",
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
    status: "Development",
  },
  {
    title: "rents.app — Map-Based Rental Platform",
    description:
      "A modern, full-stack rental platform focused on helping users find and secure rentals, PGs, and shared accommodations. Built using Next.js, TypeScript and Mapbox API.",
    tech: ["Next.js", "TypeScript", "Mapbox API", "PostgreSQL", "Prisma", "TailwindCSS"],
    liveUrl: "https://rents-app-theta.vercel.app/",
    githubUrl: "https://github.com/janardannn/rents.app",
    image: "/projects/rents.app.jpg",
    featured: true,
    status: "Development",
  },
];

/** Titles are stored as "name — subtitle"; the ledger sets them differently. */
function splitTitle(title: string): [string, string | null] {
  const [name, ...rest] = title.split(" — ");
  return [name, rest.length ? rest.join(" — ") : null];
}

function galleryFor(p: Project): string[] {
  if (p.images?.length) return p.images;
  return p.image ? [p.image] : [];
}

/* ─── Ledger ─── */

export default function Projects({ repoStats }: { repoStats?: Record<string, RepoStats> }) {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    startIndex: number;
    alt: string;
  } | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);

  const statsFor = (githubUrl: string): RepoStats => {
    const repo = parseRepoFromUrl(githubUrl);
    return (repo && repoStats?.[repo]) || { stars: 0, forks: 0 };
  };

  const openLightbox = (images: string[], startIndex: number, alt: string) => {
    if (!images.length) return;
    track("project_click", "engagement", {
      project: alt,
      action: "open_lightbox",
      startIndex,
      imageCount: images.length,
    });
    setLightbox({ images, startIndex, alt });
  };

  return (
    <div className="shell py-20 md:py-28">
      <SectionHeader
        index="001"
        label="Work"
        title="Things I built and kept fixing."
        lede="Each of these started as a problem I couldn't leave alone. Hover a row to see it; click to open the screenshots."
      />

      <ul className="rule-t">
        {projects.map((project, i) => {
          const stats = statsFor(project.githubUrl);
          const [name, subtitle] = splitTitle(project.title);
          const gallery = galleryFor(project);
          const isLive = project.status === "Live";

          return (
            <Reveal as="li" key={project.title} index={i} className="rule-b">
              <div
                className="group relative py-7 md:py-9 transition-colors duration-100"
                onMouseEnter={() => setPreviewing(gallery[0] ?? null)}
                onMouseLeave={() => setPreviewing(null)}
              >
                <div className="grid gap-5 md:grid-cols-12 md:gap-6">
                  {/* Index + status */}
                  <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3 md:gap-2">
                    <span className="t-label text-signal tnum">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span className="t-label text-muted-foreground">
                      {project.tag ?? project.status}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="md:col-span-6">
                    <h3 className="t-display t-h3 md:text-[1.8rem] text-foreground group-hover:text-signal transition-colors duration-100">
                      {name}
                    </h3>
                    {subtitle ? (
                      <p className="t-label text-muted-foreground mt-1.5">{subtitle}</p>
                    ) : null}
                    <p className="t-mono text-muted-foreground mt-3.5 line-clamp-3 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="chip group-hover:border-signal-dim/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats + actions */}
                  <div className="md:col-span-3 md:col-start-10 flex flex-col gap-3 md:items-end">
                    {(stats.stars > 0 || stats.forks > 0) && (
                      <div className="flex items-center gap-4 t-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Star className="h-3 w-3" aria-hidden="true" />
                          <span className="tnum">{stats.stars}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <GitFork className="h-3 w-3" aria-hidden="true" />
                          <span className="tnum">{stats.forks}</span>
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
                      {isLive && project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-mono t-label"
                          onClick={() =>
                            track("project_click", "engagement", {
                              project: project.title,
                              action: "view_live",
                            })
                          }
                        >
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          Live
                        </a>
                      ) : null}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-mono t-label text-muted-foreground"
                        onClick={() =>
                          track("project_click", "engagement", {
                            project: project.title,
                            action: "view_code",
                          })
                        }
                      >
                        <Github className="h-3 w-3" aria-hidden="true" />
                        Code
                      </a>

                      {gallery.length > 0 && (
                        <button
                          type="button"
                          className="link-mono t-label text-muted-foreground"
                          onClick={() => openLightbox(gallery, 0, project.title)}
                        >
                          {gallery.length} shot{gallery.length === 1 ? "" : "s"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Touch and narrow viewports get the images inline, since the
                    cursor preview can never fire for them. */}
                {gallery.length > 0 && (
                  <div className="md:hidden mt-5 -mx-6 px-6 flex gap-2 overflow-x-auto">
                    {gallery.slice(0, 4).map((src, gi) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => openLightbox(gallery, gi, project.title)}
                        className="relative w-40 h-24 shrink-0 border border-rule overflow-hidden"
                        aria-label={`Open ${name} screenshot ${gi + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${name} — screenshot ${gi + 1}`}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-10">
        <button
          className="link-mono t-label text-muted-foreground"
          onClick={() => {
            track("cta_click", "navigation", { label: "view_all_projects" });
            window.open("https://github.com/janardannn?tab=repositories", "_blank");
          }}
        >
          <span aria-hidden="true">→</span> All repositories on GitHub
        </button>
      </Reveal>

      <HoverPreview src={previewing} alt="" />

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.startIndex}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
