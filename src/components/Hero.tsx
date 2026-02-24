"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

export default function Hero() {
    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="container px-6 mx-auto text-center relative z-10 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.p
                        className="text-lg md:text-xl text-pop mb-4 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Hi, I&apos;m
                    </motion.p>

                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <span className="text-foreground">
                            Janardan Hazarika
                        </span>
                    </motion.h1>

                    <motion.h2
                        className="text-2xl md:text-4xl font-semibold text-muted-foreground mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        Software Engineer
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        I build things, fix them better, and keep pushing until it works at scale.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200"
                            onClick={() => scrollToSection('projects')}
                        >
                            View My Work <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200"
                            onClick={() => scrollToSection('contact')}
                        >
                            Get in Touch
                        </Button>
                    </motion.div>

                    <motion.div
                        className="flex justify-center space-x-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        <a
                            href="https://github.com/janardannn"
                            className="text-muted-foreground hover:text-pop hover:scale-110 transition-all duration-200"
                            aria-label="GitHub Profile"
                            target="_blank"
                        >
                            <Github className="h-7 w-7" />
                        </a>
                        <a
                            href="https://linkedin.com/in/janardan-hazarika"
                            className="text-muted-foreground hover:text-pop hover:scale-110 transition-all duration-200"
                            aria-label="LinkedIn Profile"
                            target="_blank"
                        >
                            <Linkedin className="h-7 w-7" />
                        </a>
                        <a
                            href="mailto:janardanhazarika20@gmail.com"
                            className="text-muted-foreground hover:text-pop hover:scale-110 transition-all duration-200"
                            aria-label="Email Contact"
                        >
                            <Mail className="h-7 w-7" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
