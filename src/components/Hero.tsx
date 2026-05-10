"use client"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { track } from "@/lib/tracker"

export default function Hero() {
    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
            <div className="container px-6 mx-auto text-center relative z-10 max-w-4xl">
                {/* Terminal whisper */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="mb-8"
                >
                    <span className="terminal-text text-pop/30 select-none">
                        ~/janardan
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Manifesto headline */}
                    <motion.h1
                        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 font-serif leading-tight tracking-tight"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        <span className="text-foreground">
                            I build things, fix them better, and keep pushing until it works at scale.
                        </span>
                    </motion.h1>

                    {/* Name + role as byline */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <p className="text-lg md:text-xl text-muted-foreground">
                            <span className="text-foreground font-medium">Janardan Hazarika</span>
                            <span className="mx-2 text-border">—</span>
                            <span>Software Engineer</span>
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-3 mb-16"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <button
                            className="btn-primary"
                            onClick={() => {
                                scrollToSection('projects')
                                track("cta_click", "conversion", { label: "view_my_work", target: "projects" })
                            }}
                        >
                            View My Work
                        </button>
                        <button
                            className="btn-ghost"
                            onClick={() => {
                                scrollToSection('contact')
                                track("cta_click", "conversion", { label: "get_in_touch", target: "contact" })
                            }}
                        >
                            Get in Touch
                        </button>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        className="flex justify-center space-x-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                    >
                        <a
                            href="https://github.com/janardannn"
                            className="text-muted-foreground hover:text-pop hover:scale-110 transition-all duration-200"
                            aria-label="GitHub Profile"
                            target="_blank"
                            onClick={() => track("social_click", "conversion", { platform: "github", location: "hero" })}
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/janardan-hazarika"
                            className="text-muted-foreground hover:text-pop hover:scale-110 transition-all duration-200"
                            aria-label="LinkedIn Profile"
                            target="_blank"
                            onClick={() => track("social_click", "conversion", { platform: "linkedin", location: "hero" })}
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="mailto:janardanhazarika20@gmail.com"
                            className="text-muted-foreground hover:text-pop hover:scale-110 transition-all duration-200"
                            aria-label="Email Contact"
                            onClick={() => track("social_click", "conversion", { platform: "email", location: "hero" })}
                        >
                            <Mail className="h-5 w-5" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
