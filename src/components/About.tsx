"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, ExternalLink } from "lucide-react"
import { track } from "@/lib/tracker"

const skills = [
    "TypeScript", "JavaScript", "Python", "C++", "Java", "Ruby", "SQL",
    "Next.js", "FastAPI", "React.js", "Node.js", "Ruby on Rails", "Prisma", "WebSockets", "Tailwind CSS", "Zod", "Storybook",
    "PostgreSQL", "MongoDB", "Redis", "ClickHouse", "Neon",
    "Docker", "AWS", "GitHub Actions", "Nginx", "Linux", "Vercel", "PM2", "Jenkins",
    "LangChain", "Langfuse", "OpenRouter", "LLM Orchestration",
    "Selenium", "Puppeteer", "KiCad", "VNC",
]

const education = [
    {
        title: "B.E. Computer Science",
        institution: "Chandigarh University",
        period: "2022 — 2026",
        detail: "7.51 CGPA",
    },
    {
        title: "CBSE 12th Grade (PCM)",
        institution: "Kendriya Vidyalaya, Jagiroad",
        period: "2021",
        detail: "83.4%",
    },
]

const experience = [
    {
        title: "SDE Intern",
        company: "Scaler (InterviewBit Technologies)",
        period: "Sep 2025 — Present",
        description: "Growth engineering across various engineering verticals.",
        href: "https://scaler.com",
        // highlights: [
        //     "Architected multi-featured AI Widget using FastAPI and multi-provider LLM orchestration, serving 10L+ learners and increasing engagement by 35%.",
        //     "Built a FastAPI based resume screening pipeline processing 10,000+ daily applications, improving shortlist accuracy by 70% and reducing screening time by 50%.",
        //     "Developed a RAG-based Sales Analysis AI Agent using PostgreSQL and multi-layered agentic pipelines, reducing retrieval time by 95%.",
        //     "Designed and deployed 100+ production-grade AI mock interviews to streamline candidate evaluation across recruitment workflows.",
        //     "Worked on a lead auto-allocation service in Rails with distributed locking and multi-layered eligibility guards, increasing lead consumption by 35%.",
        // ],
    },
    {
        title: "Independent Freelancer",
        company: "Upwork & Fiverr",
        period: "2022 — 2025",
        description: "Built fullstack apps, scraping engines, and automation tools for clients across diverse industries.",
    },
]

const nowItems = [
    { label: "Role", value: "SDE Intern" },
    { label: "Focus", value: "AI/Agentic Engineering, RAG, FastAPI, LLM orchestration, AWS, Docker, Next.js, Observability" },
    // { label: "Learning", value: "..." },
    { label: "Last shipped", value: "ai-eval-lab — An open source hiring platform that watches engineers work in a real CAD tool" },
]

export default function About() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container px-6 mx-auto max-w-4xl relative z-10">
                {/* Identity row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-5 mb-10"
                >
                    <Avatar className="w-16 h-16 ring-2 ring-pop/20 shrink-0">
                        <AvatarImage src="/profile.jpg" alt="Janardan Hazarika" />
                        <AvatarFallback className="text-lg font-bold bg-pop text-white">
                            JH
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold text-foreground font-serif">
                            Janardan Hazarika
                        </h2>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                            <span>Software Engineer</span>
                            <span className="text-border">·</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Bengaluru, India
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Three-column: Now | Experience | Education */}
                <div className="grid md:grid-cols-[220px_1fr_1fr] gap-8 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="rounded-lg border border-border/50 bg-card/40 overflow-hidden">
                            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-muted/20">
                                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                                <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                <span className="ml-1.5 text-[10px] text-muted-foreground font-mono">now</span>
                            </div>
                            <div className="p-3 space-y-1.5">
                                {nowItems.map((item) => (
                                    <div key={item.label} className="terminal-text">
                                        <span className="text-pop/60">{item.label}</span>
                                        <span className="text-muted-foreground ml-1">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                            Experience
                        </h3>
                        <div className="space-y-5">
                            {experience.map((exp) => (
                                <div key={exp.title}>
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-sm font-semibold text-foreground">
                                            {exp.title}
                                        </h4>
                                        {exp.href && (
                                            <a
                                                href={exp.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-pop transition-colors mt-0.5 shrink-0"
                                                onClick={() => track("social_click", "conversion", { platform: "scaler", location: "about" })}
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-xs text-pop font-medium mt-0.5">{exp.company}</p>
                                    <p className="text-[11px] text-muted-foreground/70 mt-0.5">{exp.period}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                                        {exp.description}
                                    </p>
                                    {/* {exp.highlights && (
                                        <ul className="mt-3 space-y-2">
                                            {exp.highlights.map((point) => (
                                                <li key={point} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-pop-muted mt-1.5 shrink-0">&#8226;</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )} */}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                            Education
                        </h3>
                        <div className="space-y-5">
                            {education.map((edu) => (
                                <div key={edu.title}>
                                    <h4 className="text-sm font-semibold text-foreground">
                                        {edu.title}
                                    </h4>
                                    <p className="text-xs text-pop font-medium mt-0.5">{edu.institution}</p>
                                    <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                                        {edu.period} · {edu.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="border-t border-border/30 mb-8" />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Tools I Reach For
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-secondary/60 text-secondary-foreground border border-border/30 hover:border-pop/30 hover:text-pop transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
