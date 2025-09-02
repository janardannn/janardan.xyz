"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Eye, Cookie, Mail, Server } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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
                            <Shield className="h-8 w-8 text-blue-400 mr-4" />
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                                Privacy Policy
                            </h1>
                        </div>

                        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed mb-8">
                            Simple privacy policy for my personal portfolio website.
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

                            {/* What I Collect */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">What I Collect</h2>
                                <div className="text-gray-300 space-y-3">
                                    <p>When you visit this website, I may collect:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Your email and message when you contact me</li>
                                        <li>Basic website usage data (pages visited, time spent)</li>
                                        <li>Technical info (browser type, device, IP address)</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* How I Use It */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">How I Use It</h2>
                                <div className="text-gray-300 space-y-3">
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>To respond to your messages</li>
                                        <li>To improve the website</li>
                                        <li>To understand how people use the site</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* What I Don't Do */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">What I Don&apos;t Do</h2>
                                <div className="text-gray-300 space-y-3">
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>I don&apos;t sell your information</li>
                                        <li>I don&apos;t spam you</li>
                                        <li>I don&apos;t share your data with others (unless legally required)</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Your Rights */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                                <div className="text-gray-300 space-y-3">
                                    <p>You can ask me to delete your information or stop contacting you anytime.</p>
                                </div>
                            </motion.div>

                            {/* Contact */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
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