"use client";

import { Mail, Github, Linkedin, MessageCircle, ArrowUpRight } from "lucide-react";
import { track } from "@/lib/tracker";
import Reveal from "@/components/site/Reveal";

const channels = [
  {
    title: "Email",
    value: "janardanhazarika20@gmail.com",
    href: "mailto:janardanhazarika20@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    title: "Schedule a Call",
    value: "cal.com/janardan-hazarika",
    href: "https://cal.com/janardan-hazarika",
    icon: MessageCircle,
    external: true,
  },
  {
    title: "GitHub",
    value: "github.com/janardannn",
    href: "https://github.com/janardannn",
    icon: Github,
    external: true,
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/janardan-hazarika",
    href: "https://linkedin.com/in/janardan-hazarika",
    icon: Linkedin,
    external: true,
  },
];

export default function Contact() {
  return (
    <div className="shell py-20 md:py-28">
      <Reveal className="rule-t pt-4">
        <div className="t-label text-muted-foreground flex items-baseline gap-3 mb-8">
          <span className="text-signal">004</span>
          <span>Contact</span>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-6 items-start">
          <h2 className="t-display t-h2 md:col-span-6">
            Building something?
            <br />
            <span className="text-signal">Let&apos;s talk.</span>
          </h2>

          <ul className="md:col-span-5 md:col-start-8 rule-t">
            {channels.map((c) => (
              <li key={c.title} className="rule-b">
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 py-4"
                  onClick={() => {
                    const method = c.title.toLowerCase().replace(/ /g, "_");
                    if (c.title === "Email" || c.title === "Schedule a Call") {
                      track("contact_click", "conversion", { method });
                    } else {
                      track("social_click", "conversion", {
                        platform: c.title.toLowerCase(),
                        location: "contact",
                      });
                    }
                  }}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <c.icon
                      className="h-3.5 w-3.5 text-muted-foreground group-hover:text-signal transition-colors duration-100 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="t-label text-foreground w-24 shrink-0">{c.title}</span>
                    <span className="t-mono text-muted-foreground truncate group-hover:text-signal transition-colors duration-100">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-signal transition-all duration-100 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
