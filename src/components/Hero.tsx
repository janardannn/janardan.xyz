"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { track } from "@/lib/tracker";

const datasheet = [
  { k: "Role", v: "SDE Intern" },
  { k: "At", v: "Scaler" },
  { k: "Focus", v: "AI / Agentic" },
  { k: "Base", v: "Bengaluru, IN" },
  { k: "Status", v: "Open to work", signal: true },
];

const socials = [
  { icon: Github, href: "https://github.com/janardannn", label: "GitHub", platform: "github" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/janardan-hazarika",
    label: "LinkedIn",
    platform: "linkedin",
  },
  {
    icon: Mail,
    href: "mailto:janardanhazarika20@gmail.com",
    label: "Email",
    platform: "email",
  },
];

export default function Hero() {
  const reduced = useReducedMotion();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // One entrance, three beats. No per-element delay chains.
  const rise = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
        };

  return (
    <div className="pt-14 grid-field">
      <div className="shell">
        <div className="pt-16 pb-10 md:pt-28 md:pb-16">
          <motion.p
            {...rise(0)}
            className="t-label text-muted-foreground mb-10 md:mb-16 flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <span className="text-foreground">Janardan Hazarika</span>
            <span className="text-rule" aria-hidden="true">
              /
            </span>
            <span>Software Engineer</span>
            <span className="text-rule" aria-hidden="true">
              /
            </span>
            <span>Bengaluru IN</span>
          </motion.p>

          <div className="grid gap-10 md:grid-cols-12 md:gap-6 items-end">
            <motion.h1 {...rise(1)} className="t-display t-hero md:col-span-8">
              I build systems
              <br />
              and keep fixing
              <br />
              them until they
              <br />
              <span className="text-signal">hold at scale.</span>
            </motion.h1>

            {/* Datasheet — the asymmetric counterweight to the headline. */}
            <motion.dl
              {...rise(2)}
              className="md:col-span-3 md:col-start-10 rule-l pl-4 space-y-2"
            >
              {datasheet.map((row) => (
                <div key={row.k} className="flex gap-3">
                  <dt className="t-label text-muted-foreground w-14 shrink-0 pt-px">
                    {row.k}
                  </dt>
                  <dd
                    className={`t-mono ${row.signal ? "text-signal" : "text-foreground"}`}
                  >
                    {row.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            {...rise(3)}
            className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <button
              className="link-mono t-label"
              onClick={() => {
                scrollToSection("projects");
                track("cta_click", "conversion", {
                  label: "view_my_work",
                  target: "projects",
                });
              }}
            >
              <span aria-hidden="true">→</span> View the work
            </button>
            <button
              className="link-mono t-label text-muted-foreground"
              onClick={() => {
                scrollToSection("contact");
                track("cta_click", "conversion", {
                  label: "get_in_touch",
                  target: "contact",
                });
              }}
            >
              <span aria-hidden="true">→</span> Get in touch
            </button>

            <span className="hidden sm:block w-px h-4 bg-rule" aria-hidden="true" />

            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target={s.platform === "email" ? undefined : "_blank"}
                  rel={s.platform === "email" ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="text-muted-foreground hover:text-signal transition-colors duration-100"
                  onClick={() =>
                    track("social_click", "conversion", {
                      platform: s.platform,
                      location: "hero",
                    })
                  }
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
