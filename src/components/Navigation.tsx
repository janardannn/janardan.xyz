"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"
import { track } from "@/lib/tracker"

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = ["About", "Projects", "Writing", "Contact"]

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "pt-4" : ""}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className={`container px-4 mx-auto max-w-7xl transition-all duration-500 ${scrolled ? "max-w-4xl" : ""}`}>
                <div className={`flex justify-between items-center py-4 transition-all duration-500 ${scrolled
                    ? "bg-background/80 backdrop-blur-xl shadow-2xl border border-border rounded-2xl px-6 py-3"
                    : "bg-transparent"
                    }`}>
                    <div className="font-bold text-l text-foreground hover:scale-105 transition-transform">
                        <a href="#home" onClick={() => track("nav_click", "navigation", { item: "logo" })}>janardan.xyz</a>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={item === "Resume" ? "/resume.pdf" : `#${item.toLowerCase()}`}
                                className="font-medium text-muted-foreground hover:text-pop transition-colors duration-200"
                                onClick={() => track("nav_click", "navigation", { item, device: "desktop" })}
                            >
                                {item}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                const newTheme = theme === "dark" ? "light" : "dark"
                                setTheme(newTheme)
                                track("theme_toggle", "interaction", { newTheme })
                            }}
                            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            aria-label="Toggle theme"
                        >
                            {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
                        </button>
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => {
                                const newTheme = theme === "dark" ? "light" : "dark"
                                setTheme(newTheme)
                                track("theme_toggle", "interaction", { newTheme })
                            }}
                            className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle theme"
                        >
                            {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
                        </button>
                        <button
                            className="p-2 text-foreground"
                            onClick={() => {
                                const newState = !mobileMenuOpen
                                setMobileMenuOpen(newState)
                                track("mobile_menu_toggle", "navigation", { state: newState ? "open" : "close" })
                            }}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`md:hidden bg-background/90 backdrop-blur-xl shadow-lg border border-border transition-all duration-300 ${scrolled
                            ? "rounded-2xl mx-0 mt-4"
                            : "rounded-lg mx-4 mb-4"
                            }`}
                    >
                        <div className="flex flex-col space-y-4 p-6">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={item === "Resume" ? "/resume.pdf" : `#${item.toLowerCase()}`}
                                    className="text-muted-foreground hover:text-pop transition-colors font-medium"
                                    onClick={() => {
                                        setMobileMenuOpen(false)
                                        track("nav_click", "navigation", { item, device: "mobile" })
                                    }}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}
