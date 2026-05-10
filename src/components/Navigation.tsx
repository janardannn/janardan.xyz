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

    const navItems = [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Writing", href: "#writing" },
        { label: "Contact", href: "#contact" },
    ]

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div
                className={`
                    flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500
                    ${scrolled
                        ? "bg-background/70 backdrop-blur-xl border border-border/60 shadow-lg"
                        : "bg-transparent border border-transparent"
                    }
                `}
            >
                <a
                    href="#home"
                    onClick={() => track("nav_click", "navigation", { item: "logo" })}
                    className="px-4 py-1.5 text-sm font-semibold text-foreground hover:text-pop transition-colors"
                >
                    janardan
                </a>

                <span className="w-px h-4 bg-border/60 hidden md:block" />

                <div className="hidden md:flex items-center">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                            onClick={() => track("nav_click", "navigation", { item: item.label, device: "desktop" })}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <span className="w-px h-4 bg-border/60 hidden md:block" />

                <button
                    onClick={() => {
                        const newTheme = theme === "dark" ? "light" : "dark"
                        setTheme(newTheme)
                        track("theme_toggle", "interaction", { newTheme })
                    }}
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    aria-label="Toggle theme"
                >
                    {mounted && (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
                </button>

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
                        {mounted && (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
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
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-4 right-4 mt-2 md:hidden bg-background/90 backdrop-blur-xl border border-border/60 rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="flex flex-col p-2">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors font-medium"
                                onClick={() => {
                                    setMobileMenuOpen(false)
                                    track("nav_click", "navigation", { item: item.label, device: "mobile" })
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}
