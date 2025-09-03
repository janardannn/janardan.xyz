"use client"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const currentYear = new Date().getFullYear()

const footerLinks = {
    "Quick Links": [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Writing", href: "#writing" },
        { name: "Contact", href: "#contact" }
    ],
    "Resources": [
        { name: "Resume", href: "/resume.pdf" },
        { name: "Blog", href: "/writing" },
        { name: "Portfolio", href: "#projects" },
        { name: "Contact Form", href: "#contact" }
    ],
    "Connect": [
        { name: "GitHub", href: "https://github.com/janardannn" },
        { name: "LinkedIn", href: "https://linkedin.com/in/janardan-hazarika" },
        { name: "Email", href: "mailto:janardanhazarika20@gmail.com" },
        { name: "Schedule Call", href: "https://cal.com/janardan-hazarika" }
    ]
}

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/janardannn",
        icon: Github,
        color: "hover:text-emerald-400"
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/janardan-hazarika",
        icon: Linkedin,
        color: "hover:text-emerald-400"
    },
    {
        name: "Email",
        href: "mailto:janardanhazarika20@gmail.com",
        icon: Mail,
        color: "hover:text-emerald-400"
    }
]

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden">
            {/* Background Pattern */}
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

            <div className="container px-4 mx-auto relative z-10 max-w-7xl">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Brand Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-1"
                        >
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-slate-400 bg-clip-text text-transparent">
                                janardan.xyz
                            </h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Building things, fixing them, and keep pushing until it works at scale.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.name}
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Footer Links */}
                        {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            >
                                <h4 className="font-semibold text-white mb-4">{category}</h4>
                                <ul className="space-y-2">
                                    {links.map((link, linkIndex) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                                        >
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                                                target={link.href.startsWith('http') ? "_blank" : undefined}
                                                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                            >
                                                {link.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Newsletter/CTA Section */}
                    {/* <motion.div
                        className="bg-gradient-to-r from-emerald-600/10 to-slate-700/10 rounded-2xl p-8 mb-12 border border-emerald-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="text-center max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold mb-3 text-white">Ready to Start Your Project?</h3>
                            <p className="text-gray-300 mb-6">
                                Let's discuss how we can bring your ideas to life with modern web technologies.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
                                >
                                    <a href="#contact">Get In Touch</a>
                                </Button>
                            </div>
                        </div>
                    </motion.div> */}
                </div>

                {/* Bottom Footer */}
                <motion.div
                    className="border-t border-gray-700 py-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-300">
                            <span>© {currentYear} Janardan Hazarika. Made with</span>
                            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                            <span>and lots of ☕</span>
                        </div>

                        <div className="flex items-center gap-6">
                            <a
                                href="/privacy"
                                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms"
                                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Terms of Service
                            </a>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={scrollToTop}
                                className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200 no-print"
                                aria-label="Scroll to top"
                            >
                                <ArrowUp className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
