"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Coffee, Code2, Briefcase } from "lucide-react"

const skills = [
    { name: "TypeScript", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "C++", category: "Languages" },
    { name: "Java", category: "Languages" },
    { name: "Ruby", category: "Languages" },
    { name: "React.js", category: "Web" },
    { name: "Next.js", category: "Web" },
    { name: "Node.js", category: "Web" },
    { name: "Ruby on Rails", category: "Web" },
    { name: "WebSockets", category: "Web" },
    { name: "Tailwind CSS", category: "Web" },
    { name: "SCSS", category: "Web" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Prisma", category: "Database" },
    { name: "Redis", category: "Database" },
    { name: "Git", category: "DevOps" },
    { name: "Docker", category: "DevOps" },
    { name: "GitHub Actions", category: "DevOps" },
    { name: "Nginx", category: "DevOps" },
    { name: "PM2", category: "DevOps" },
    { name: "Linux", category: "DevOps" },
]

const education = [
    {
        title: "Bachelor of Engineering, Computer Science",
        institution: "Chandigarh University, Mohali, PB, IN",
        period: "2022-2026",
        grade: 7.51,
        description: "Bachelor of Engineering in Computer Science with focus on software development, data structures, and algorithms."
    },
    {
        title: "CBSE 12th Grade (PCM)",
        institution: "Kendriya Vidyalaya, Jagiroad, AS, IN",
        period: "2021",
        grade: 83.4,
        description: "Completed 12th grade with a focus on Physics, Chemistry, and Mathematics."
    },
    {
        title: "CBSE 10th Grade",
        institution: "Indus Academy, Jagiroad, AS, IN",
        period: "2019",
        grade: 91.6,
        description: "Completed secondary education with a focus on Science and Mathematics."
    }
]

const experience = [
    {
        title: "SDE Intern",
        company: "Scaler (InterviewBit Technologies Pvt Ltd)",
        period: "Sep 2025 - Present",
        description: "Working across the full stack on Scaler's growth team.",
        highlights: [
            "Refactored legacy Rails + React components into modular, testable units, cutting page load times and improving maintainability",
            "Built a conversational chat-form flow that nearly doubled V2L (visit-to-lead) conversion rates",
            "Implemented GTM-based event tracking across 40+ user touchpoints for data-driven product decisions",
            "Worked on lead auto-allocation service with Redis-backed distributed locking to prevent race conditions at scale"
        ],
    },
    {
        title: "Independent Freelancer",
        company: "Upwork & Fiverr",
        period: "2022-2025",
        description: "Built fullstack applications, web scraping engines, and automation tools for clients across diverse industries.",
    },
]

const stats = [
    { label: "Years Building", value: "4+", icon: Calendar },
    { label: "DSA Problems", value: "400+", icon: Code2 },
    { label: "Technologies", value: "25+", icon: Briefcase },
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
                        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground font-serif">
                            About Me
                        </h2>

                        <motion.div
                            className="relative mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Avatar className="w-40 h-40 mx-auto mb-6 ring-4 ring-pop/30 shadow-xl">
                                <AvatarImage src="/profile.jpg" alt="Janardan Hazarika" />
                                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-pop to-slate-600 text-white">
                                    JH
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>Bengaluru, India</span>
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
                                        <stat.icon className="h-8 w-8 mx-auto mb-3 text-pop" />
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
                                        className="relative pl-8 border-l-2 border-pop-muted/40"
                                    >
                                        <div className="absolute w-4 h-4 bg-pop-muted rounded-full -left-2 top-2"></div>
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-foreground">{edu.title}</h4>
                                            <p className="text-pop font-medium">{edu.institution}</p>
                                            <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
                                            {edu.grade == 7.51 ? <p className="text-muted-foreground">Grade: {edu.grade} CGPA</p> : <p className="text-muted-foreground">Grade: {edu.grade}%</p>}
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
                                        className="relative pl-8 border-l-2 border-pop-muted/40"
                                    >
                                        <div className="absolute w-4 h-4 bg-pop-muted rounded-full -left-2 top-2"></div>
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                                            <p className="text-pop font-medium">{exp.company}</p>
                                            <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                                            <p className="text-muted-foreground">{exp.description}</p>
                                            {exp.highlights && (
                                                <ul className="mt-3 space-y-2">
                                                    {exp.highlights.map((point) => (
                                                        <li key={point} className="text-sm text-muted-foreground flex items-start gap-2">
                                                            <span className="text-pop-muted mt-1.5 shrink-0">&#8226;</span>
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
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
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
