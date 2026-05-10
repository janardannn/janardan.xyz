"use client"

import { useEffect, useState } from "react"

export default function AmbientGlow() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Top-right glow */}
      <div
        className="pointer-events-none fixed top-0 right-0 z-0 w-[400px] h-[400px] opacity-15 dark:opacity-10"
        style={{
          background: "radial-gradient(circle at 70% 30%, var(--pop) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />
      {/* Bottom-left glow */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 z-0 w-[500px] h-[500px] opacity-20 dark:opacity-15"
        style={{
          background: "radial-gradient(circle at 30% 70%, var(--pop-muted) 0%, transparent 55%)",
          filter: "blur(90px)",
        }}
      />
    </>
  )
}
