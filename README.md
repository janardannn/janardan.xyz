# janardan.xyz

Personal portfolio and blog - [Janardan Hazarika](https://janardan.xyz).

## About

Software engineer based in Bengaluru, India, at Scaler (InterviewBit Technologies) — converted to full-time in Sept 2026 after a year as an SDE intern. Multi-tenant platform work in FastAPI and Celery, Terraform-provisioned AWS underneath it, and the OpenTelemetry/Sentry instrumentation that proves it holds.

B.E. CSE from Chandigarh University (2022-2026). Previously freelanced on Upwork & Fiverr building fullstack apps, scrapers, and automation tools.

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion. Dark/light mode with `next-themes`.

Blog posts live in Neon (serverless Postgres) via Prisma. Admin is password-protected with NextAuth. Posts are server-rendered with `react-markdown`.

Canvas-based noise grain overlay for texture.

## Analytics (GTS)

Custom-built, zero-dependency tracking system. No GA, no Mixpanel, no ad-blocker blind spots.

**Client** (~4KB gzipped) collects canvas, WebGL, and AudioContext fingerprints alongside standard device signals. Batches events every 7s, fires via `sendBeacon` on unload. Tracks pageviews, scroll depth milestones, time on page, and custom interaction events.

**Server** extracts geolocation from Vercel headers (country, city, region), scores each visitor for bot signals, and writes everything to Neon via Prisma in a single transaction. The IP address is stored as received — see `/privacy` for the full disclosure.

**Admin dashboard** at `/admin/analytics` — overview stats, visitor list with location, visitor deep-dive (20+ device/hardware/geo fields), event stream with filters, geography breakdown, all server-rendered.

Deployed on Vercel.
