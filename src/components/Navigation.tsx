"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { track } from "@/lib/tracker";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

/**
 * A full-width hairline status bar rather than a floating centred pill.
 * Reads as window chrome: brand left, sections right, a scroll-progress
 * line along the bottom edge.
 */
export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => setMounted(true), []);

  // Close the mobile sheet on Escape.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  // Event names and property shapes are held identical to the pre-revamp
  // markup so existing analytics queries keep matching.
  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    track("theme_toggle", "interaction", { newTheme });
  };

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    track("mobile_menu_toggle", "navigation", { state: newState ? "open" : "close" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md rule-b">
      <div className="shell">
        <div className="flex items-center justify-between h-14">
          <a
            href="#home"
            onClick={() => track("nav_click", "navigation", { item: "logo" })}
            className="t-label text-foreground hover:text-signal transition-colors duration-100 flex items-center gap-2.5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-signal shrink-0"
              aria-hidden="true"
            />
            janardan.xyz
          </a>

          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() =>
                  track("nav_click", "navigation", { item: item.label, device: "desktop" })
                }
                className="t-label text-muted-foreground hover:text-foreground transition-colors duration-100 px-3.5 py-2"
              >
                {item.label}
              </a>
            ))}

            <span className="w-px h-3.5 bg-rule mx-2.5" aria-hidden="true" />

            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-signal transition-colors duration-100"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-signal transition-colors duration-100"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-foreground"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress — a 1px signal line along the bar's lower edge. */}
      {!reduced && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-signal origin-left"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      )}

      {mobileMenuOpen && (
        <div className="md:hidden rule-t bg-background">
          <div className="shell flex flex-col py-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  track("nav_click", "navigation", { item: item.label, device: "mobile" });
                }}
                className="t-label text-muted-foreground hover:text-foreground py-3.5 transition-colors duration-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
