"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Coffee, Code2, Briefcase } from "lucide-react"

const skills = [
    { name: "JavaScript", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "HTML/CSS", category: "Frontend" },
    { name: "Bootstrap", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Flask", category: "Backend" },
    { name: "REST APIs", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Prisma", category: "Database" },
    { name: "C++", category: "Programming" },
    { name: "Java", category: "Programming" },
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "Tools" },
    { name: "Nginx", category: "Tools" },
    { name: "Github Actions", category: "Tools" },
    { name: "Linux", category: "Tools" },
]

const education = [
    {
        title: "Bachelor's in Computer Science and Engineering",
        institution: "Chandigarh University, Mohali, PB, IN",
        period: "2022-Present",
        grade: 7.34,
        description: "Pursuing Bachelor's in Computer Science with focus on software development, data structures, and algorithms."
    },
    {
        title: "12th",
        institution: "Kendriya Vidyalaya, Jagiroad, AS, IN",
        period: "2019-2021",
        grade: 83.4,
        description: "Completed 12th grade with a focus on Science, Mathematics and Computer Science."
    },
    {
        title: "10th",
        institution: "Indus Academy, Jagiroad, AS, IN",
        period: "2016-2019",
        grade: 91.6,
        description: "Completed secondary education with a focus on Science and Mathematics."
    }
]

const experience = [
    {
        title: "Independent Freelancer",
        company: "Upwork & Fiverr",
        period: "2022-Present",
        description: "Building anything from small python scripts to fullstack end to end applications to complex webscraping engines controlled via a simple dashboard."
    },
]

const stats = [
    { label: "Years Learning", value: "3+", icon: Calendar },
    { label: "Projects Built", value: "10+", icon: Briefcase },
    { label: "Technologies Used", value: "15+", icon: Code2 },
    { label: "Cups of Coffee", value: "\u221E", icon: Coffee }
]

export default function About() {
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
    }, {} as Record<string, typeof skills>)

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-6 mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-20">
                        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground">
                            About Me
                        </h2>

                        <motion.div
                            className="relative mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Avatar className="w-40 h-40 mx-auto mb-6 ring-4 ring-emerald-500/30 shadow-xl">
                                <AvatarImage src="/profile.jpg" alt="Janardan Hazarika" />
                                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-slate-600 text-white">
                                    JH
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>Chandigarh, India</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-border bg-card rounded-xl">
                                    <CardContent className="p-0 text-center">
                                        <stat.icon className="h-8 w-8 mx-auto mb-3 text-emerald-500" />
                                        <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 text-foreground">Education</h3>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div
                                        key={edu.title}
                                        className="relative pl-8 border-l-2 border-emerald-600/40"
                                    >
                                        <div className="absolute w-4 h-4 bg-emerald-600 rounded-full -left-2 top-2"></div>
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-foreground">{edu.title}</h4>
                                            <p className="text-emerald-500 font-medium">{edu.institution}</p>
                                            <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
                                            {edu.grade == 7.34 ? <p className="text-muted-foreground">Grade: {edu.grade} CGPA</p> : <p className="text-muted-foreground">Grade: {edu.grade}%</p>}
                                            <p className="text-muted-foreground">{edu.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 text-foreground">Experience</h3>
                            <div className="space-y-6">
                                {experience.map((exp) => (
                                    <div
                                        key={exp.title}
                                        className="relative pl-8 border-l-2 border-emerald-600/40"
                                    >
                                        <div className="absolute w-4 h-4 bg-emerald-600 rounded-full -left-2 top-2"></div>
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                                            <p className="text-emerald-500 font-medium">{exp.company}</p>
                                            <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                                            <p className="text-muted-foreground">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-8 text-center text-foreground">Skills & Technologies</h3>
                        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                                <Card key={category} className="p-6 h-full hover:shadow-lg transition-all duration-300 border border-border bg-card">
                                    <CardContent className="p-0">
                                        <h4 className="font-semibold text-lg mb-4 text-foreground">{category}</h4>
                                        <div className="space-y-3">
                                            {categorySkills.map((skill) => (
                                                <div key={skill.name} className="flex items-center justify-between">
                                                    <span className="text-muted-foreground font-medium">{skill.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
