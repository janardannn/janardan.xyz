"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = ["Home", "About", "Projects", "Writing", "Contact"]

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "pt-4"
                : ""
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className={`container px-4 mx-auto max-w-7xl transition-all duration-500 ${scrolled
                ? "max-w-4xl"
                : ""
                }`}>
                <div className={`flex justify-between items-center py-4 transition-all duration-500 ${scrolled
                    ? "bg-gray-800/40 backdrop-blur-xl shadow-2xl border border-gray-800/50 rounded-2xl px-6 py-3"
                    : "bg-transparent"
                    }`}>
                    <motion.div
                        className="font-bold text-xl transition-colors text-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <a href="#home">janardan.xyz</a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="font-medium text-gray-300 hover:text-emerald-400 hover:scale-105 transition-all duration-200"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`md:hidden bg-black/80 backdrop-blur-xl shadow-lg border border-gray-800/50 transition-all duration-300 ${scrolled
                            ? "rounded-2xl mx-0 mt-4"
                            : "rounded-lg mx-4 mb-4"
                            }`}
                    >
                        <div className="flex flex-col space-y-4 p-6">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-300 hover:text-emerald-400 transition-colors font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
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
