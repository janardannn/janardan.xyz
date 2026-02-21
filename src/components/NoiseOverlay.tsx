"use client"

import { useEffect, useRef } from "react"

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Small tile with fine grain
    const tile = 128
    const offscreen = document.createElement("canvas")
    offscreen.width = tile
    offscreen.height = tile
    const offCtx = offscreen.getContext("2d")!

    const imageData = offCtx.createImageData(tile, tile)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255
      data[i] = value
      data[i + 1] = value
      data[i + 2] = value
      data[i + 3] = 255
    }
    offCtx.putImageData(imageData, 0, 0)

    // Tile it across the full viewport
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pattern = ctx.createPattern(offscreen, "repeat")
    if (pattern) {
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{
        opacity: 0.07,
      }}
    />
  )
}
