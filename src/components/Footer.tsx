"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { track } from "@/lib/tracker";

const currentYear = new Date().getFullYear();

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Writing", href: "#writing" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/janardannn", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/janardan-hazarika", icon: Linkedin },
  { name: "Email", href: "mailto:janardanhazarika20@gmail.com", icon: Mail },
];

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = ist.getHours().toString().padStart(2, "0");
      const m = ist.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  // Empty until mounted, so server and client markup agree.
  return (
    <span className="t-mono text-muted-foreground tnum">
      {time ? `${time} · Bengaluru, IN` : "Bengaluru, IN"}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="rule-t">
      <div className="shell">
        <div className="py-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="t-label text-foreground mb-3">Janardan Hazarika</p>
            <p className="t-mono text-muted-foreground mb-5">
              Software engineer. Building reliable systems, and the observability to
              prove they hold.
            </p>
            <LiveClock />
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2.5" aria-label="Footer">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="t-label text-muted-foreground hover:text-signal transition-colors duration-100"
                onClick={() => track("footer_link_click", "navigation", { name: link.name })}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="t-label text-muted-foreground hover:text-signal transition-colors duration-100"
              onClick={() => track("footer_link_click", "navigation", { name: "Resume" })}
            >
              Resume
            </a>
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.name === "Email" ? undefined : "_blank"}
                rel={social.name === "Email" ? undefined : "noopener noreferrer"}
                aria-label={social.name}
                className="text-muted-foreground hover:text-signal transition-colors duration-100"
                onClick={() =>
                  track("social_click", "conversion", {
                    platform: social.name.toLowerCase(),
                    location: "footer",
                  })
                }
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="rule-t py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="t-label text-muted-foreground">
            © {currentYear} Janardan Hazarika
          </p>
          <div className="flex gap-5">
            <a
              href="/privacy"
              className="t-label text-muted-foreground hover:text-signal transition-colors duration-100"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="t-label text-muted-foreground hover:text-signal transition-colors duration-100"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
