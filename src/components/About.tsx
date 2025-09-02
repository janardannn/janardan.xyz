"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Calendar, Coffee, Code2, Briefcase } from "lucide-react"

const skills = [
    { name: "JavaScript", level: "Proficient", category: "Frontend" },
    { name: "TypeScript", level: "Proficient", category: "Frontend" },
    { name: "React", level: "Proficient", category: "Frontend" },
    { name: "Next.js", level: "Developing", category: "Frontend" },
    { name: "Node.js", level: "Familiar", category: "Backend" },
    { name: "Python", level: "Proficient", category: "Backend" },
    { name: "PostgreSQL", level: "Familiar", category: "Database" },
    { name: "MongoDB", level: "Learning", category: "Database" },
    { name: "AWS", level: "Learning", category: "DevOps" },
    { name: "Docker", level: "Familiar", category: "DevOps" },
    { name: "Tailwind CSS", level: "Proficient", category: "Frontend" },
    { name: "GraphQL", level: "Learning", category: "Backend" },
    { name: "REST APIs", level: "Proficient", category: "Backend" },
    { name: "Git", level: "Proficient", category: "Tools" },
    { name: "Agile", level: "Familiar", category: "Process" }
]

const experience = [
    {
        title: "Software Engineering Student",
        company: "University/College",
        period: "2021 - Present",
        description: "Building foundational knowledge in computer science, data structures, algorithms, and software development principles."
    },
    {
        title: "Frontend Development Intern",
        company: "Local Tech Company",
        period: "Summer 2024",
        description: "Developed responsive web interfaces using React and gained hands-on experience with modern development workflows."
    },
    {
        title: "Freelance Web Developer",
        company: "Personal Projects",
        period: "2023 - Present",
        description: "Created websites for local businesses and personal projects, focusing on modern web technologies and best practices."
    }
]

const stats = [
    { label: "Years Learning", value: "3+", icon: Calendar },
    { label: "Projects Built", value: "15+", icon: Briefcase },
    { label: "Technologies Used", value: "10+", icon: Code2 },
    { label: "Cups of Coffee", value: "∞", icon: Coffee }
]

export default function About() {
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
    }, {} as Record<string, typeof skills>)

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
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-20">
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            About Me
                        </motion.h2>

                        <motion.div
                            className="relative mb-8"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Avatar className="w-40 h-40 mx-auto mb-6 ring-4 ring-emerald-500/30 shadow-xl">
                                <AvatarImage src="/profile.jpg" alt="Janardan Hazarika" />
                                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-slate-600 text-white">
                                    JH
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center justify-center gap-2 text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span>Your Location</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Section */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gray-800/50 backdrop-blur-sm rounded-xl">
                                    <CardContent className="p-0 text-center">
                                        <stat.icon className="h-8 w-8 mx-auto mb-3 text-emerald-400" />
                                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 mb-16">
                        {/* About Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-white">My Story</h3>
                                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                    I'm a passionate aspiring software engineer who transforms ideas into digital solutions.
                                    Currently pursuing my computer science degree, I've been developing my skills through
                                    academic projects, internships, and personal coding ventures, building everything from simple websites to full-stack applications.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                    My journey began with a curiosity about how things work on the web. That curiosity evolved into
                                    a deep passion for creating solutions that solve real problems and provide great user experiences.
                                    I believe in writing clean, maintainable code and continuously learning about new technologies and best practices.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-300 mb-8">
                                    When I'm not coding, you'll find me exploring new technologies, working on side projects,
                                    learning from online courses and tutorials, or enjoying a good cup of coffee while planning my next build.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:scale-105 transition-transform duration-200"
                                >
                                    View Portfolio
                                </Button>
                            </div>
                        </motion.div>

                        {/* Experience Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 text-white">Experience</h3>
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <motion.div
                                        key={exp.title}
                                        className="relative pl-8 border-l-2 border-emerald-600/40"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 * index }}
                                    >
                                        <div className="absolute w-4 h-4 bg-emerald-600 rounded-full -left-2 top-2"></div>
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-white">{exp.title}</h4>
                                            <p className="text-emerald-400 font-medium">{exp.company}</p>
                                            <p className="text-sm text-gray-400 mb-2">{exp.period}</p>
                                            <p className="text-gray-300">{exp.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Skills Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold mb-8 text-center text-white">Skills & Technologies</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                                >
                                    <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-0 bg-gray-800/50 backdrop-blur-sm">
                                        <CardContent className="p-0">
                                            <h4 className="font-semibold text-lg mb-4 text-white">{category}</h4>
                                            <div className="space-y-3">
                                                {categorySkills.map((skill, skillIndex) => (
                                                    <motion.div
                                                        key={skill.name}
                                                        className="flex items-center justify-between"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                                                    >
                                                        <span className="text-gray-300 font-medium">{skill.name}</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={`text-xs px-2 py-1 rounded-full border-emerald-400 text-emerald-400 bg-gray-900/60`}
                                                        >
                                                            {skill.level}
                                                        </Badge>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
