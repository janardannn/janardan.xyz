"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Github, Linkedin, MessageCircle, MapPin, Phone, Clock, Send } from "lucide-react"

const contactMethods = [
    {
        title: "Email",
        description: "Drop me a line anytime",
        value: "janardanhazarika20@gmail.com",
        href: "mailto:janardanhazarika20@gmail.com",
        icon: Mail,
        color: "from-emerald-500 to-emerald-600"
    },
    {
        title: "Schedule a Call",
        description: "Let's discuss your project",
        value: "Book a meeting",
        href: "https://cal.com/janardan-hazarika",
        icon: MessageCircle,
        color: "from-green-500 to-green-600"
    },
    {
        title: "Phone",
        description: "Give me a call",
        value: "+91 7002347658",
        href: "tel:+917002347658",
        icon: Phone,
        color: "from-slate-500 to-slate-600"
    }
]

const socialLinks = [
    { name: "GitHub", href: "https://github.com/janardannn", icon: Github, description: "Check out my code" },
    { name: "LinkedIn", href: "https://linkedin.com/in/janardan-hazarika", icon: Linkedin, description: "Professional network" },
    { name: "Email", href: "mailto:janardanhazarika20@gmail.com", icon: Mail, description: "Send me a message" }
]

export default function Contact() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground">
                        Open for Projects, Problems, and Possibilities
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                        I&apos;m always curious about new ideas and challenges. If you&apos;re building something exciting, let&apos;s talk.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Badge className="bg-green-500/20 text-green-600 dark:text-green-300 border-green-500/30 px-4 py-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Available for new projects
                        </Badge>
                        <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 px-4 py-2">
                            <MapPin className="w-3 h-3 mr-2" />
                            Based in Chandigarh, India
                        </Badge>
                        <Badge className="bg-secondary text-muted-foreground border-border px-4 py-2">
                            <Clock className="w-3 h-3 mr-2" />
                            IST Timezone
                        </Badge>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {contactMethods.map((method, index) => (
                        <motion.div
                            key={method.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <Card className="group hover:shadow-2xl transition-all duration-500 border border-border shadow-lg bg-card hover:bg-card/80">
                                <CardContent className="p-8 text-center">
                                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <method.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-foreground">{method.title}</h3>
                                    <p className="text-muted-foreground mb-4">{method.description}</p>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200"
                                    >
                                        <a href={method.href} target={method.href.startsWith('http') ? "_blank" : undefined}>
                                            <Send className="mr-2 h-4 w-4" />
                                            {method.value}
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-foreground">Connect with Me</h3>
                        <div className="space-y-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:bg-secondary transition-all duration-200 group hover:translate-x-2"
                                >
                                    <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                                    <div>
                                        <div className="font-semibold text-foreground">{social.name}</div>
                                        <div className="text-sm text-muted-foreground">{social.description}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-foreground">Working Hours</h3>
                        <Card className="bg-card border border-border">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="font-medium text-foreground">All Days</span>
                                        <span className="text-muted-foreground">24/7 Available</span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                    <p className="text-emerald-600 dark:text-emerald-400 text-sm flex items-center">
                                        <Clock className="h-4 w-4 mr-2" />
                                        Response time: Usually within 24 hours
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl font-bold mb-6 text-foreground">Ready to Start Your Project?</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200"
                        >
                            <a href="mailto:janardanhazarika20@gmail.com">
                                <Mail className="mr-2 h-5 w-5" />
                                Send me an Email
                            </a>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-border bg-secondary text-secondary-foreground hover:scale-105 transition-transform duration-200"
                        >
                            <a href="https://cal.com/janardan-hazarika" target="_blank">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Schedule a Call
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
