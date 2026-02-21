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
    { name: "GitHub", href: "https://github.com/janardannn", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/janardan-hazarika", icon: Linkedin },
    { name: "Email", href: "mailto:janardanhazarika20@gmail.com", icon: Mail }
]

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative overflow-hidden border-t border-border">
            <div className="container px-4 mx-auto relative z-10 max-w-7xl">
                <div className="py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-1"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-emerald-500">
                                janardan.xyz
                            </h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Building things, fixing them, and keep pushing until it works at scale.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-emerald-500 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                                        aria-label={social.name}
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: categoryIndex * 0.05 }}
                            >
                                <h4 className="font-semibold text-foreground mb-4">{category}</h4>
                                <ul className="space-y-2">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
                                                target={link.href.startsWith('http') ? "_blank" : undefined}
                                                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="border-t border-border py-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span>&copy; {currentYear} Janardan Hazarika. Made with</span>
                            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                        </div>

                        <div className="flex items-center gap-6">
                            <a
                                href="/privacy"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                            >
                                Terms of Service
                            </a>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={scrollToTop}
                                className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200 no-print"
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
