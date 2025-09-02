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
    {
        name: "GitHub",
        href: "https://github.com/janardannn",
        icon: Github,
        description: "Check out my code",
        color: "hover:text-emerald-400"
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/janardan-hazarika",
        icon: Linkedin,
        description: "Professional network",
        color: "hover:text-emerald-400"
    },
    {
        name: "Email",
        href: "mailto:janardanhazarika20@gmail.com",
        icon: Mail,
        description: "Send me a message",
        color: "hover:text-emerald-400"
    }
]

const workingHours = [
    { day: "All Days", hours: "24/7 Available" }
]

export default function Contact() {
    return (
        <section className="py-24 bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden">
            {/* Background Elements */}
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                        Open for Projects, Problems, and Possibilities
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        I’m always curious about new ideas and challenges. If you’re building something exciting, let’s talk.
                    </p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            Available for new projects
                        </Badge>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
                            <MapPin className="w-3 h-3 mr-2" />
                            Based in Chandigarh, India
                        </Badge>
                        <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 px-4 py-2">
                            <Clock className="w-3 h-3 mr-2" />
                            IST Timezone
                        </Badge>
                    </motion.div>
                </motion.div>

                {/* Contact Methods Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {contactMethods.map((method, index) => (
                        <motion.div
                            key={method.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card className="group hover:shadow-2xl transition-all duration-500 border border-white/10 shadow-lg bg-white/5 backdrop-blur-sm hover:bg-white/10">
                                <CardContent className="p-8 text-center">
                                    <motion.div
                                        className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <method.icon className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">{method.title}</h3>
                                    <p className="text-gray-300 mb-4">{method.description}</p>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
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
                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-white">Connect with Me</h3>
                        <div className="space-y-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200 group ${social.color}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <social.icon className="h-6 w-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                                    <div>
                                        <div className="font-semibold text-white">{social.name}</div>
                                        <div className="text-sm text-gray-300">{social.description}</div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Working Hours */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-white">Working Hours</h3>
                        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {workingHours.map((schedule, index) => (
                                        <motion.div
                                            key={schedule.day}
                                            className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                        >
                                            <span className="font-medium text-white">{schedule.day}</span>
                                            <span className="text-gray-300">{schedule.hours}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.div
                                    className="mt-6 p-4 bg-emerald-500/20 rounded-lg border border-emerald-500/30"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    <p className="text-emerald-400 text-sm flex items-center">
                                        <Clock className="h-4 w-4 mr-2" />
                                        Response time: Usually within 24 hours
                                    </p>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <h3 className="text-2xl font-bold mb-6 text-white">Ready to Start Your Project?</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
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
                            className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
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
