"use client";

import { ExternalLink } from "lucide-react";
import { track } from "@/lib/tracker";
import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/site/SectionHeader";

const skills = [
  "TypeScript", "JavaScript", "Python", "C++", "Java", "Ruby", "SQL",
  "Next.js", "FastAPI", "React.js", "Node.js", "Ruby on Rails", "Prisma", "WebSockets", "Tailwind CSS", "Zod", "Storybook",
  "PostgreSQL", "MongoDB", "Redis", "ClickHouse", "Neon",
  "Docker", "AWS", "GitHub Actions", "Nginx", "Linux", "Vercel", "PM2", "Jenkins",
  "LangChain", "Langfuse", "OpenRouter", "LLM Orchestration",
  "Selenium", "Puppeteer", "KiCad", "VNC",
];

const education = [
  {
    title: "B.E. Computer Science",
    institution: "Chandigarh University",
    period: "2022 — 2026",
    detail: "7.51 CGPA",
  },
  {
    title: "CBSE 12th Grade (PCM)",
    institution: "Kendriya Vidyalaya, Jagiroad",
    period: "2021",
    detail: "83.4%",
  },
];

const experience = [
  {
    title: "SDE Intern",
    company: "Scaler (InterviewBit Technologies)",
    period: "Sep 2025 — Present",
    description: "Growth engineering across various engineering verticals.",
    href: "https://scaler.com",
  },
  {
    title: "Independent Freelancer",
    company: "Upwork & Fiverr",
    period: "2022 — 2025",
    description:
      "Built fullstack apps, scraping engines, and automation tools for clients across diverse industries.",
  },
];

const now = [
  { label: "Role", value: "SDE Intern at Scaler" },
  {
    label: "Focus",
    value:
      "AI/agentic engineering, RAG, FastAPI, LLM orchestration, AWS, Docker, Next.js, observability",
  },
  {
    label: "Last shipped",
    value:
      "ai-eval-lab — an open source hiring platform that watches engineers work in a real CAD tool",
  },
];

/** A ruled block heading. Sections are separated by hairlines, not whitespace. */
function Block({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rule-t pt-4 ${className}`}>
      <h3 className="t-label text-muted-foreground mb-5">{label}</h3>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="shell py-20 md:py-28">
      <SectionHeader
        index="002"
        label="About"
        title="Engineer, Bengaluru."
        lede="Final-year CSE, shipping production systems at Scaler. Before that, four years of freelance work across whatever clients needed built."
      />

      <div className="grid gap-x-6 gap-y-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <Block label="Experience">
            <ul className="space-y-7">
              {experience.map((exp) => (
                <li key={exp.title} className="grid gap-x-6 gap-y-1 sm:grid-cols-[7.5rem_1fr]">
                  <span className="t-label text-muted-foreground pt-1">{exp.period}</span>
                  <div>
                    <h4 className="t-h3 t-display text-foreground">{exp.title}</h4>
                    <p className="t-mono text-muted-foreground mt-1">
                      {exp.href ? (
                        <a
                          href={exp.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-mono"
                          onClick={() =>
                            track("social_click", "conversion", {
                              platform: "scaler",
                              location: "about",
                            })
                          }
                        >
                          {exp.company}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : (
                        exp.company
                      )}
                    </p>
                    <p className="t-mono text-muted-foreground mt-2.5">{exp.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>

        <Reveal index={1} className="md:col-span-4 md:col-start-9">
          <Block label="Now">
            <dl className="space-y-4">
              {now.map((item) => (
                <div key={item.label}>
                  <dt className="t-label text-signal mb-1">{item.label}</dt>
                  <dd className="t-mono text-muted-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </Reveal>

        <Reveal index={2} className="md:col-span-7">
          <Block label="Stack">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </Block>
        </Reveal>

        <Reveal index={3} className="md:col-span-4 md:col-start-9">
          <Block label="Education">
            <ul className="space-y-6">
              {education.map((edu) => (
                <li key={edu.title}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="t-mono text-foreground">{edu.title}</h4>
                    <span className="t-label text-signal shrink-0 tnum">{edu.detail}</span>
                  </div>
                  <p className="t-mono-sm text-muted-foreground mt-1">{edu.institution}</p>
                  <p className="t-label text-muted-foreground mt-1">{edu.period}</p>
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>
      </div>
    </div>
  );
}
