"use client"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, MessageCircle, MapPin, Clock, ArrowUpRight } from "lucide-react"
import { track } from "@/lib/tracker"

const contactMethods = [
    {
        title: "Email",
        description: "Drop me a line",
        value: "janardanhazarika20@gmail.com",
        href: "mailto:janardanhazarika20@gmail.com",
        icon: Mail,
    },
    {
        title: "Schedule a Call",
        description: "Book a 30-min slot",
        value: "cal.com/janardan-hazarika",
        href: "https://cal.com/janardan-hazarika",
        icon: MessageCircle,
    },
]

const socialLinks = [
    { name: "GitHub", href: "https://github.com/janardannn", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/janardan-hazarika", icon: Linkedin },
    { name: "Email", href: "mailto:janardanhazarika20@gmail.com", icon: Mail },
]

export default function Contact() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-6 mx-auto relative z-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif mb-3">
                        Get in Touch
                    </h2>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                        Open for projects, problems, and possibilities. If you&apos;re building something exciting, let&apos;s talk.
                    </p>
                </motion.div>

                {/* Contact cards */}
                <div className="grid sm:grid-cols-2 gap-4 mb-12 max-w-xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.title}
                            href={method.href}
                            target={method.href.startsWith('http') ? "_blank" : undefined}
                            rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group flex items-start gap-4 p-5 rounded-xl border border-border/40 bg-card/40 hover:bg-card hover:border-pop/20 transition-all"
                            onClick={() => track("contact_click", "conversion", { method: method.title.toLowerCase().replace(/ /g, "_") })}
                        >
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-pop/10 transition-colors">
                                <method.icon className="h-4 w-4 text-muted-foreground group-hover:text-pop transition-colors" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1 mb-0.5">
                                    <h3 className="text-sm font-semibold text-foreground">{method.title}</h3>
                                    <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-muted-foreground">{method.description}</p>
                                <p className="text-xs text-pop mt-1 truncate">{method.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Social links row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center gap-3"
                >
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/40 bg-card/40 hover:bg-card hover:border-pop/20 transition-all text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => track("social_click", "conversion", { platform: social.name.toLowerCase(), location: "contact" })}
                        >
                            <social.icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{social.name}</span>
                        </a>
                    ))}
                </motion.div>

                {/* Status indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex justify-center gap-6 mt-10 text-xs text-muted-foreground"
                >
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Available for new projects
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        Bengaluru, India
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        IST
                    </span>
                </motion.div>
            </div>
        </section>
    )
}
