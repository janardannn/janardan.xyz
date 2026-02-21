# janardan.xyz

Personal portfolio and blog - [Janardan Hazarika](https://janardan.xyz).

## About

Software engineer based in Bengaluru, India. Currently an SDE Intern at Scaler (InterviewBit Technologies), working across the full stack on growth engineering - refactoring legacy Rails + React systems, building conversion-optimized flows, and shipping services with Redis-backed distributed locking.

B.E. Computer Science from Chandigarh University (2022–2026). Previously freelanced on Upwork & Fiverr building fullstack apps, scrapers, and automation tools.

## Stack & CMS

**Frontend** — Next.js 15 (App Router) with React 19, TypeScript, and Tailwind CSS v4. UI primitives from Radix UI via shadcn/ui. Animations with Framer Motion (fade-in only, no continuous loops). Dark/light mode via `next-themes` with OKLCH-based CSS custom properties for theme-adaptive accent colors.

**Blog CMS** — Headless, self-built. Posts are stored in a PostgreSQL database on [Neon](https://neon.tech) (serverless Postgres), accessed through Prisma v7 with the `@prisma/adapter-neon` serverless driver. Admin routes are protected with NextAuth v5. The writing pages are server-rendered — posts are fetched at request time, rendered with `react-markdown` + `remark-gfm`.

**Noise overlay** — A canvas-based React component that generates a 128px grayscale noise tile and repeats it across the viewport via `createPattern`. Fixed behind all content at low opacity.

**Deployment** — Vercel.
