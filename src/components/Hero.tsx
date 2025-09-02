"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"

export default function Hero() {
    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Gradient Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-3"></div>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-slate-600/5"
                    animate={{
                        background: [
                            "linear-gradient(to right, rgba(16, 185, 129, 0.05), rgba(71, 85, 105, 0.05))",
                            "linear-gradient(to right, rgba(71, 85, 105, 0.05), rgba(16, 185, 129, 0.05))",
                            "linear-gradient(to right, rgba(16, 185, 129, 0.05), rgba(71, 85, 105, 0.05))"
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container px-6 mx-auto text-center relative z-10 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    {/* Greeting */}
                    <motion.p
                        className="text-lg md:text-xl text-emerald-300 mb-4 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Hi, I&apos;m
                    </motion.p>

                    {/* Main Heading */}
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                            Janardan Hazarika
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                        className="text-2xl md:text-4xl font-semibold text-gray-400 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Software Engineer
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        I build things, fix them better, and keep pushing until it works at scale.
                    </motion.p>

                    {/* Call to Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
                            onClick={() => scrollToSection('projects')}
                        >
                            View My Work <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
                            onClick={() => scrollToSection('contact')}
                        >
                            Get in Touch
                        </Button>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex justify-center space-x-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                    >
                        <motion.a
                            href="https://github.com/janardannn"
                            className="text-gray-400 hover:text-emerald-400 hover:scale-110 transition-all duration-200"
                            aria-label="GitHub Profile"
                            target="_blank"
                        >
                            <Github className="h-7 w-7" />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/janardan-hazarika"
                            className="text-gray-400 hover:text-emerald-400 hover:scale-110 transition-all duration-200"
                            aria-label="LinkedIn Profile"
                            target="_blank"
                        >
                            <Linkedin className="h-7 w-7" />
                        </motion.a>
                        <motion.a
                            href="mailto:janardanhazarika20@gmail.com"
                            className="text-gray-400 hover:text-slate-400 hover:scale-110 transition-all duration-200"
                            aria-label="Email Contact"
                        >
                            <Mail className="h-7 w-7" />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <motion.div
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                        whileHover={{ scale: 1.1 }}
                    >
                        <motion.div
                            className="w-1 h-3 bg-white/60 rounded-full mt-2"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
