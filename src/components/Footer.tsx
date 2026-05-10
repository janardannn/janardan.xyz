"use client"
import { useEffect, useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { track } from "@/lib/tracker"

const currentYear = new Date().getFullYear()

const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Writing", href: "#writing" },
    { name: "Contact", href: "#contact" },
]

const socialLinks = [
    { name: "GitHub", href: "https://github.com/janardannn", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/janardan-hazarika", icon: Linkedin },
    { name: "Email", href: "mailto:janardanhazarika20@gmail.com", icon: Mail },
]

function LiveClock() {
    const [time, setTime] = useState("")

    useEffect(() => {
        const update = () => {
            const now = new Date()
            const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
            const h = ist.getHours().toString().padStart(2, "0")
            const m = ist.getMinutes().toString().padStart(2, "0")
            setTime(`${h}:${m}`)
        }
        update()
        const id = setInterval(update, 60000)
        return () => clearInterval(id)
    }, [])

    return (
        <span className="terminal-text text-muted-foreground/60">
            {time} · Bengaluru, IN
        </span>
    )
}

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-border/40">
            <div className="container px-6 mx-auto relative z-10 max-w-5xl">
                <div className="py-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        {/* Brand + socials */}
                        <div>
                            <h3 className="text-lg font-bold text-foreground font-serif mb-3">
                                janardan.xyz
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 max-w-xs leading-relaxed">
                                Building things, fixing them, and keeping pushing until it works at scale.
                            </p>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-pop hover:bg-pop/10 transition-all"
                                        aria-label={social.name}
                                        onClick={() => track("social_click", "conversion", { platform: social.name.toLowerCase(), location: "footer" })}
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => track("footer_link_click", "navigation", { name: link.name })}
                                >
                                    {link.name}
                                </a>
                            ))}
                            {/* <a
                                href="/resume.pdf"
                                target="_blank"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => track("footer_link_click", "navigation", { name: "Resume" })}
                            >
                                Resume
                            </a> */}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border/40 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-muted-foreground/60">
                        &copy; {currentYear} Janardan Hazarika
                    </p>
                    <LiveClock />
                    <div className="flex gap-4 text-xs text-muted-foreground/60">
                        <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
