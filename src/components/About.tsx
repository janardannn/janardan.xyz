"use client";

import { ExternalLink } from "lucide-react";
import { track } from "@/lib/tracker";
import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/site/SectionHeader";

const skills = [
  "TypeScript", "JavaScript", "Python", "C++", "Java", "Ruby", "SQL",
  "Next.js", "FastAPI", "React.js", "Node.js", "Ruby on Rails", "Prisma", "SQLAlchemy", "Alembic", "Celery", "WebSockets", "Tailwind CSS", "SCSS", "Zod", "Storyblok", "Storybook",
  "PostgreSQL", "Neon", "MongoDB", "Redis", "ClickHouse",
  "Docker", "Terraform", "AWS", "ECS", "RDS", "Lambda", "CloudFront", "CloudFormation", "GitHub Actions", "Nginx", "Linux", "Vercel", "PM2", "Jenkins",
  "LangChain", "OpenRouter", "LLM Orchestration", "Gemini", "OpenAI",
  "OpenTelemetry", "Sentry", "Google Tag Manager", "MixPanel", "A/B Testing",
  "OAuth", "JWT", "Selenium", "Puppeteer", "KiCad", "VNC",
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
    title: "Software Engineer",
    company: "Scaler (InterviewBit Technologies)",
    period: "Sep 2026 — Present",
    description:
      "Built InterviewBit Varsity end-to-end — a multi-tenant FastAPI/Celery platform for IIT and IIM degree programs serving 1M+ visitors, with a config-driven form engine over a typed enquiry → offer → payment → enrollment state machine handling ₹80L+ in fees via PayU and NBFC loan disbursal.",
    href: "https://scaler.com",
    shipped: { label: "interviewbit.com/varsity", href: "https://www.interviewbit.com/varsity" },
  },
  {
    title: "SDE Intern",
    company: "Scaler (InterviewBit Technologies)",
    period: "Sep 2025 — Sep 2026",
    description:
      "Owned AWS infrastructure — Terraform-provisioned ECS-on-EC2, RDS Multi-AZ, ElastiCache and CloudFront across isolated staging and production, with OpenTelemetry and Sentry feeding CloudWatch → PagerDuty. Shipped an AI widget for SWAYAM (NPTEL) reaching 10L+ learners, a résumé screening pipeline handling 10,000+ applications daily, and a Rails lead auto-allocation service using distributed locking.",
    href: "https://scaler.com",
  },
  {
    title: "Freelance Developer",
    company: "Upwork & direct clients",
    period: "Feb 2025 — Aug 2025",
    description:
      "Selenium-based Google Maps scraper feeding listings into an LLM for market analysis, and a stock market data scraper with automated Telegram notifications.",
  },
];

const now = [
  { label: "Role", value: "Software Engineer at Scaler" },
  {
    label: "Focus",
    value:
      "Multi-tenant platform work in FastAPI and Celery, AWS infrastructure with Terraform, LLM orchestration, and the observability to keep it honest",
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
        lede="Software engineer at Scaler, where I converted from intern after a year. Multi-tenant platforms, the AWS underneath them, and the instrumentation that proves they hold."
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

                    {exp.shipped ? (
                      <a
                        href={exp.shipped.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-mono t-label mt-3.5 inline-flex"
                        onClick={() =>
                          track("project_click", "engagement", {
                            project: exp.shipped.label,
                            action: "view_live",
                          })
                        }
                      >
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        {exp.shipped.label}
                      </a>
                    ) : null}
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
