"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight, Star, Users, GitFork } from "lucide-react"
import Image from "next/image"

const projects = [
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with real-time inventory management, secure payment processing, and comprehensive admin dashboard. Features include user authentication, order tracking, and advanced analytics.",
        tech: ["Next.js", "TypeScript", "Prisma", "Stripe", "Tailwind CSS"],
        liveUrl: "https://project1.com",
        githubUrl: "https://github.com/yourname/project1",
        image: "/projects/project1.jpg",
        stats: { stars: 45, forks: 12, contributors: 3 },
        featured: true,
        status: "Live"
    },
    {
        title: "AI-Powered Analytics Dashboard",
        description: "Interactive dashboard with machine learning insights, real-time data visualization, and predictive analytics for business intelligence. Includes custom chart components and automated reporting.",
        tech: ["React", "Python", "FastAPI", "PostgreSQL", "D3.js", "TensorFlow"],
        liveUrl: "https://project2.com",
        githubUrl: "https://github.com/yourname/project2",
        image: "/projects/project2.jpg",
        stats: { stars: 78, forks: 23, contributors: 5 },
        featured: true,
        status: "Live"
    },
    {
        title: "Real-Time Chat Application",
        description: "Scalable messaging platform with end-to-end encryption, file sharing, video calling capabilities, and real-time presence indicators. Built for high-performance communication.",
        tech: ["Node.js", "Socket.io", "MongoDB", "WebRTC", "Redis"],
        liveUrl: "https://project3.com",
        githubUrl: "https://github.com/yourname/project3",
        image: "/projects/project3.jpg",
        stats: { stars: 89, forks: 34, contributors: 7 },
        featured: false,
        status: "Beta"
    },
    {
        title: "Task Management System",
        description: "Collaborative project management tool with kanban boards, time tracking, team collaboration features, and advanced reporting capabilities.",
        tech: ["Vue.js", "Express.js", "MySQL", "Socket.io", "Tailwind CSS"],
        liveUrl: "https://project4.com",
        githubUrl: "https://github.com/yourname/project4",
        image: "/projects/project4.jpg",
        stats: { stars: 56, forks: 18, contributors: 4 },
        featured: false,
        status: "Development"
    }
]

export default function Projects() {
    return (
        <section className="py-24 bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden">
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

            <div className="container px-6 mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        A curated selection of my best work, showcasing technical expertise,
                        creative problem-solving, and passion for building exceptional digital experiences
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    {projects.filter(project => project.featured).map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group"
                        >
                            <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-gray-900/30 backdrop-blur-sm rounded-3xl hover:scale-[1.02]">
                                {/* Project Image Header */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-gray-800/40 to-slate-800/60" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_70%)]" />

                                    {/* Status Badge */}
                                    <div className="absolute top-6 left-6">
                                        <Badge className={`px-3 py-1 text-xs font-medium rounded-full border-0 ${project.status === 'Live'
                                            ? 'bg-emerald-500/90 text-white'
                                            : 'bg-amber-500/90 text-white'
                                            }`}>
                                            {project.status}
                                        </Badge>
                                    </div>

                                    {/* Project Stats */}
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                            <Star className="h-3 w-3 text-amber-400" />
                                            <span className="text-xs text-white">{project.stats.stars}</span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                            <GitFork className="h-3 w-3 text-blue-400" />
                                            <span className="text-xs text-white">{project.stats.forks}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                                        {project.title}
                                    </CardTitle>

                                    <CardDescription className="text-gray-300 leading-relaxed mb-6 text-base">
                                        {project.description}
                                    </CardDescription>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.slice(0, 4).map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs bg-gray-800/50 text-gray-300 border-gray-600 px-3 py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project.tech.length > 4 && (
                                            <Badge variant="outline" className="text-xs bg-gray-800/50 text-gray-300 border-gray-600 px-3 py-1">
                                                +{project.tech.length - 4}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <Button asChild variant="outline" className="flex-1 border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200">
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                                <ExternalLink className="h-4 w-4" />
                                                View Project
                                            </a>
                                        </Button>
                                        <Button variant="outline" asChild className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200 px-4">
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Other Projects */}
                <motion.h3
                    className="text-2xl font-bold text-white mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Other Projects
                </motion.h3>

                {/* Additional Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.filter(project => !project.featured).map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gray-900/30 backdrop-blur-sm rounded-2xl hover:scale-[1.02] overflow-hidden">
                                <div className="relative h-32 bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-slate-800/40">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(16,185,129,0.08),transparent_70%)]" />

                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4">
                                        <Badge className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${project.status === 'Live'
                                            ? 'bg-emerald-500/90 text-white'
                                            : project.status === 'Beta'
                                                ? 'bg-amber-500/90 text-white'
                                                : 'bg-blue-500/90 text-white'
                                            }`}>
                                            {project.status}
                                        </Badge>
                                    </div>

                                    {/* Action Icons */}
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                            className="p-2 bg-black/40 backdrop-blur-sm rounded-lg hover:scale-110 transition-transform">
                                            <Github className="h-4 w-4 text-white" />
                                        </a>
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                            className="p-2 bg-black/40 backdrop-blur-sm rounded-lg hover:scale-110 transition-transform">
                                            <ExternalLink className="h-4 w-4 text-white" />
                                        </a>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h4 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors mb-3">
                                        {project.title}
                                    </h4>

                                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                        {project.description.substring(0, 120)}...
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.slice(0, 3).map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs bg-gray-800/50 text-gray-300 border-gray-600 px-2 py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <Badge variant="outline" className="text-xs bg-gray-800/50 text-gray-300 border-gray-600 px-2 py-1">
                                                +{project.tech.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <Button asChild variant="outline" size="sm" className="w-full border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200">
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                            <ExternalLink className="h-3 w-3" />
                                            View Project
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* View More Button */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
                    >
                        View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
