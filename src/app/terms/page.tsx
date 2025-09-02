"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Users, Gavel, AlertTriangle, Mail, Shield } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-slate-600/5"
                animate={{
                    background: [
                        "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(71, 85, 105, 0.05))",
                        "linear-gradient(to right, rgba(71, 85, 105, 0.05), rgba(59, 130, 246, 0.05))",
                        "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(71, 85, 105, 0.05))"
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Hero Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container px-6 mx-auto max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Button
                            variant="outline"
                            asChild
                            className="mb-8 border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-105 transition-all duration-200"
                        >
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Portfolio
                            </Link>
                        </Button>

                        <div className="flex items-center mb-6">
                            <FileText className="h-8 w-8 text-blue-400 mr-4" />
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                                Terms of Service
                            </h1>
                        </div>

                        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed mb-8">
                            Simple terms for using my personal portfolio website.
                        </p>

                        <div className="text-sm text-gray-400">
                            <p>Last updated: September 2, 2025</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-2 relative">
                <div className="container px-6 mx-auto max-w-4xl relative z-10">
                    <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800/50">
                        <div className="prose prose-invert prose-lg max-w-none">

                            {/* The Basics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">The Basics</h2>
                                <div className="text-gray-300 space-y-3">
                                    <p>By using this website, you agree to these terms. This is my personal portfolio site where I showcase my work and share my thoughts.</p>
                                </div>
                            </motion.div>

                            {/* What You Can Do */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">What You Can Do</h2>
                                <div className="text-gray-300 space-y-3">
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Browse and read the content</li>
                                        <li>Contact me about work opportunities</li>
                                        <li>Share links to my work</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* What You Can't Do */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">What You Can't Do</h2>
                                <div className="text-gray-300 space-y-3">
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Copy my content without permission</li>
                                        <li>Use my work commercially without asking</li>
                                        <li>Try to break the website</li>
                                        <li>Send spam or harmful content</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Disclaimer */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-8"
                            >
                                <div className="flex items-center mb-4">
                                    <AlertTriangle className="h-6 w-6 text-blue-400 mr-3" />
                                    <h2 className="text-2xl font-bold text-white">Disclaimer</h2>
                                </div>
                                <div className="text-gray-300 space-y-3">
                                    <p>This website is provided "as is". I do my best to keep everything working and up-to-date, but I can't guarantee it will always be perfect.</p>
                                </div>
                            </motion.div>

                            {/* Changes */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">Changes</h2>
                                <div className="text-gray-300 space-y-3">
                                    <p>I might update these terms occasionally. If you keep using the site, you agree to any changes.</p>
                                </div>
                            </motion.div>

                            {/* Contact */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="bg-blue-600/10 rounded-2xl p-6 border border-blue-500/20"
                            >
                                <div className="flex items-center mb-4">
                                    <Mail className="h-6 w-6 text-blue-400 mr-3" />
                                    <h2 className="text-2xl font-bold text-white">Questions?</h2>
                                </div>
                                <div className="text-gray-300">
                                    <p>
                                        Email me at{" "}
                                        <a href="mailto:janardanhazarika20@gmail.com" className="text-blue-400 hover:text-blue-300 underline">
                                            janardanhazarika20@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}