# janardan.xyz — Instrument × Editorial Revamp

**Date:** 2026-09-30
**Status:** Approved, ready for implementation planning

## Goal

Replace the site's visual foundation so it reads as current work rather than a 2010s
one-page portfolio template. The direction is **Instrument × Editorial**: the structural
density and monospace voice of an instrument readout, carrying editorial-scale typography.

The distinguishing element is that the site displays its own telemetry, drawn from the
custom GTS analytics engine already in the codebase. This is the one thing a template
cannot supply, and it is the reason the design looks the way it does.

## Why the current site reads as dated

Structural, not chromatic:

1. Everything is centered and symmetrical — the one-page-template signature.
2. Blurred radial gradient blobs (`AmbientGlow.tsx`) — 2019–21 aurora/glassmorphism.
3. Cards with soft shadows and hover-lift (`.surface-elevated`, `.hover-lift`) — Material 2014.
4. Playfair Display headlines — the 2016 personal-brand serif.
5. Uniform vertical rhythm: every section is `py-24` → centered header → grid.
6. Timid type scale: `text-3xl md:text-5xl` for a hero manifesto sits at medium.
7. `whileInView` fade-ups with hand-tuned `delay: 0.2/0.5/0.7` chains — the AOS.js era.

## Scope

**In:** Homepage (Nav, Hero, Projects, About, Writing, Contact, Footer), `/writing` index,
post reader, global token/type foundation, and the SEO/metadata defects listed in §9.

**Out:** `/admin` (dashboard, editor, analytics views) keeps its current look. Its
`--chart-*` and `--sidebar-*` tokens must survive untouched.

**Preserved exactly:** every `track()` call site, `SectionTracker`, `TrackerProvider`,
the project lightbox, all routing, all Prisma access patterns outside `lib/site-stats.ts`.

## 1. Design tokens

Replace the `--pop` violet-indigo with a single signal colour. Amber reads as instrument
(IBM 3270 / phosphor) rather than cyberpunk, and holds up better over time. It is a token,
so substituting lime or cyan is a one-line change.

### Light (paper)

```
--background:        oklch(0.975 0.004 85)
--foreground:        oklch(0.18  0.010 260)
--card:              oklch(0.995 0.002 85)
--muted-foreground:  oklch(0.48  0.012 260)
--rule:              color-mix(in oklch, var(--foreground) 14%, transparent)
--signal:            oklch(0.52  0.14  62)
--signal-dim:        oklch(0.66  0.10  62)
```

### Dark

Current dark mode is washed slate (`oklch(0.22 0.025 270)`) and is a significant part of
the dated feel. It goes properly dark so the signal colour can glow.

```
--background:        oklch(0.16  0.008 250)
--foreground:        oklch(0.93  0.008 250)
--card:              oklch(0.20  0.010 250)
--muted-foreground:  oklch(0.66  0.010 250)
--rule:              color-mix(in oklch, var(--foreground) 16%, transparent)
--signal:            oklch(0.78  0.16  70)
--signal-dim:        oklch(0.62  0.12  70)
```

### Shape

```
--radius: 2px          (was 0.625rem)
```

Every `box-shadow` is removed. `.surface-elevated` and `.hover-lift` are deleted. Elevation
is expressed as a hairline border plus a background shift; hover changes border-colour and
background, never `translateY`.

## 2. Typography

Three families, one job each. Playfair Display is dropped; net font payload is roughly flat.

| Role | Family | Applies to |
|---|---|---|
| Display | Bricolage Grotesque (variable) | Headlines only |
| Structure | Geist Mono (already loaded) | Labels, metadata, numerals, nav, tech chips, telemetry |
| Prose | Inter (already loaded) | Blog body copy — and nowhere else |

**The homepage carries no body sans.** Display and mono only. Prose sans appears solely in
the blog reader. The homepage reads as a spec sheet, the blog as an essay, and they are
visibly different documents by intent.

### Scale

```
--text-display:  clamp(3.5rem, 11vw, 9rem)   / lh 0.88 / ls -0.04em
--text-h2:       clamp(1.75rem, 4vw, 3rem)   / lh 1.00 / ls -0.03em
--text-h3:       1.25rem                     / lh 1.30
--text-label:    0.6875rem  (11px) mono, uppercase, ls 0.12em
--text-mono:     0.8125rem  (13px) mono      / lh 1.6
--text-prose:    1.125rem                    / lh 1.7   (blog reader only)
```

The current design's defect is that everything sits at medium. This scale is loud or quiet
and never medium.

### Grid

12 columns, container `max-width: 1440px`, gutters 24px (mobile) / 40px (desktop), 24px
column gap. Content deliberately breaks symmetry — hero copy occupies columns 1–8, the
metadata block 9–12.

## 3. Texture

`AmbientGlow.tsx` is deleted.

- **`NoiseOverlay` is retained and strengthened.** It becomes the only atmospheric layer.
- **A dot-grid field** in pure CSS (`repeating-linear-gradient`), aligned to the layout
  grid. No JS, no canvas cost.
- **Hairline rules are the primary separator.** Sections divide with a 1px `--rule` line
  rather than 96px of whitespace.

## 4. Layout

### Navigation

The centered floating pill becomes a full-width fixed hairline bar: brand mono-left,
section links mono-right, theme toggle, status dot. Window chrome rather than a pill.
Scroll progress fills a 1px `--signal` line along its lower edge.

### Hero

Left-aligned and asymmetric.

```
JANARDAN HAZARIKA · SOFTWARE ENGINEER · BENGALURU IN
                                            ┌──────────────────┐
I BUILD SYSTEMS                             │ ROLE   SDE Intern│
AND KEEP FIXING                             │ AT     Scaler    │
THEM UNTIL THEY                             │ FOCUS  AI/Agentic│
HOLD AT SCALE.                              │ STATUS Open      │
                                            └──────────────────┘
→ view work   → get in touch
────────────────────────────────────────────────────────────────
```

Copy spans columns 1–8; the mono datasheet block sits in 9–12. CTAs become mono text links
with an animated underline. `.btn-primary` and `.btn-ghost` are deleted.

### Projects — ledger with hover preview

The two-column card grid becomes full-width ledger rows: `001` index, display title,
one-line description, mono tech chips, star count and status right-aligned.

On hover (pointer: fine only), the project image floats in near the cursor as a preview.
Click continues to open the existing lightbox unchanged. This is the primary interaction
investment and the clearest break from the card-grid idiom.

Positioning must be rAF-throttled. On `pointer: coarse` the preview never engages and
images remain reachable inline and via the lightbox.

### About — datasheet

The simulated terminal window with traffic-light dots is removed; it is costume, and
costume is what makes terminal aesthetics read as twee.

It becomes hairline-ruled sections — EXPERIENCE / EDUCATION / STACK / NOW — as mono
key-value rows. The 37 skills render as a dense mono wrap rather than 37 badges.

### Writing

Retains its list shape, which already works. Loses the card background: numbered rows,
mono metadata, display titles, hairline separators, thumbnails retained.

### Contact

The 2×2 icon-card grid collapses to a single hairline block: one display line, then mono
rows for email / GitHub / LinkedIn with `↗`.

### Footer

Mono, dense, single hairline row.

## 5. Telemetry strip

A hairline-bounded band directly beneath the hero.

```
SIGNAL ── VIEWS 12,480 ── 14D ▁▂▅▇▅▂▁▂▅▇▃▂▅▇ ── REGIONS 23 ── POSTS 7 ── BUILD 7a8c6a8
```

### No public endpoint

`src/app/page.tsx` is already an async server component, so the aggregates are queried
server-side and passed as props. **No new public API surface is created.** The only data
leaving the server is the rendered aggregate numbers.

### Data contract

```ts
type SiteStats = {
  totalViews: number                              // bots excluded
  dailyViews: { date: string; count: number }[]   // last 14 days, zero-filled
  regions:    number                              // distinct non-null country, bots excluded
  posts:      number                              // published count
  build:      string                              // 7-char commit SHA
}
```

- Lives in `src/lib/site-stats.ts`.
- Bot exclusion traverses the relation: `where: { session: { visitor: { isBot: false } } }`.
- Build SHA from `process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7)`, falling back to `"dev"`.
- Wrapped in `unstable_cache([...], { revalidate: 60 })`.
- **Failure mode:** the function returns `null` on any error and the strip renders nothing,
  leaving the hairline rule. It must never render partial or wrong numbers, and must never
  be able to break the page.

### Privacy

Aggregates only. No per-visitor field, no fingerprint, no IP, no city, no timestamp, and no
concurrent-visitor count ever reaches the client. Metrics were chosen to read well at low
traffic — cumulative totals, a 14-day series, and country diversity — rather than
"visitors online now", which reads as dead on a quiet day.

### Incidental fix

Writing the zero-filled daily series also resolves the gap bug in
`getDailyPageViews` (`src/lib/analytics.ts:333`), where days with no views are omitted and
the chart silently compresses them into a continuous line.

## 6. Motion

A single shared `Reveal` primitive replaces every `initial` / `whileInView` / hand-tuned
`delay` chain in the codebase.

```
Reveal: y 12 → 0, opacity 0 → 1
        spring { stiffness: 260, damping: 30 }
        viewport { once: true, margin: "-10% 0px" }
```

No manual delay chains. Where stagger earns its place, it comes from CSS
`transition-delay` on children.

- Hover transitions drop from 300ms to 120ms. Slow hovers are a substantial part of why the
  current site feels sluggish.
- `prefers-reduced-motion` is honoured globally — it is currently respected nowhere. Under
  it: `Reveal` becomes an instant opacity change with no transform, count-up is disabled,
  and the scroll-progress line is static.
- View Transitions between homepage and post.

## 7. Blog

- **Index** matches the Projects ledger.
- **Reader** keeps the existing prose system, which is well-built, and retunes it: headings
  to Bricolage, body to Inter at `1.125rem / 1.7`, code blocks to near-black with a
  hairline, and the TOC as a mono rail with an active-section indicator.

## 8. Accessibility

- `--signal` meets 4.5:1 against its background in both themes (light `0.52`, dark `0.78`).
- `--muted-foreground` meets 4.5:1 in both themes. Dark sits at `0.66` against a `0.16`
  background, which is close enough to the threshold that it must be measured during
  implementation rather than assumed, and raised if it falls short.
- Focus ring retained as 2px `--signal` at 2px offset, on every interactive element.
- The hover preview is never the sole route to project imagery.
- All motion gated on `prefers-reduced-motion`.
- The 11px mono label size is used only for non-essential metadata, never for body content.

## 9. Metadata and SEO defects fixed in passing

These live in files already being rewritten:

1. `alternates: { canonical: "/" }` in the root layout is inherited by every page, so every
   blog post currently declares the homepage as its canonical URL. Replaced with per-page
   canonicals.
2. No `generateMetadata` on `writing/[slug]` — every post shares the default title and
   description. Added.
3. `/og-image.jpg` is referenced in `layout.tsx:64` but does not exist in `public/`, so all
   share previews 404. Replaced with a dynamic `opengraph-image.tsx` via `next/og` rendered
   in the new design.
4. No `sitemap.ts` or `robots.ts`. Added.
5. Hand-written `<meta name="viewport">` and `theme-color` in `<head>` duplicate Next's
   injected viewport tag, and `theme-color` is hardcoded to the light value. Replaced with
   a `viewport` export carrying per-scheme `themeColor`.

## 10. Files

**New**
```
src/lib/site-stats.ts
src/components/site/Reveal.tsx
src/components/site/Rule.tsx
src/components/site/GridField.tsx
src/components/site/TelemetryStrip.tsx
src/components/site/LedgerRow.tsx
src/components/site/HoverPreview.tsx
src/app/sitemap.ts
src/app/robots.ts
src/app/opengraph-image.tsx
```

**Rewritten**
```
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx                         (props wiring only)
src/components/{Navigation,Hero,Projects,About,Writing,Contact,Footer}.tsx
src/app/writing/WritingPageClient.tsx
src/app/writing/page.tsx                 (metadata)
src/app/writing/[slug]/BlogPostClient.tsx
src/app/writing/[slug]/page.tsx          (generateMetadata + canonical)
```

**Deleted**
```
src/components/AmbientGlow.tsx
```

**Untouched**
```
src/lib/tracker.ts, src/hooks/useTrack.ts
src/components/{SectionTracker,TrackerProvider,NoiseOverlay}.tsx   (NoiseOverlay: params only)
src/app/admin/**, src/components/admin/**
src/app/api/**
prisma/**
```

## 11. Responsive

| Breakpoint | Behaviour |
|---|---|
| `< 640px` | Single column; mono 12px; display clamp floor 2.75rem; telemetry wraps to two rows; hover preview disabled via `pointer: coarse` |
| `640–1024px` | 8-column grid; hero datasheet moves below the headline |
| `> 1024px` | Full 12-column asymmetric layout |

Mono-dense layouts are harder to keep readable at 390px than a card stack. This needs
verification on a real device before the work is called done, not just a viewport resize.

## 12. Acceptance criteria

1. No `box-shadow`, no `AmbientGlow`, no Playfair Display anywhere in the public site.
2. No centered-text section headers on the homepage.
3. Every `track()` call site present before the change is present after it, with identical
   event names, categories and properties.
4. The telemetry strip renders correct aggregates, and renders nothing at all when
   `getSiteStats()` returns `null`. Killing the database must not break the homepage.
5. No per-visitor data appears in the homepage HTML payload.
6. `prefers-reduced-motion: reduce` eliminates all transform-based motion and the count-up.
7. Each blog post emits its own canonical URL, title and description.
8. `/opengraph-image` returns a 200 with a real image.
9. Lighthouse accessibility ≥ 95 on `/` and on a post page, both themes.
10. `/admin` is visually and functionally unchanged.
11. `npx tsc --noEmit` and `npm run lint` pass clean.

## 13. Risks

1. **Mono-dense at 390px.** Mitigated by the §11 mobile pass; requires device verification.
2. **Amber is a taste judgement.** Tokenised for a one-line swap.
3. **The hover preview is the most likely element to feel janky.** Requires rAF-throttled
   positioning and a hard `pointer: fine` gate.
4. **Bricolage Grotesque adds a font.** Variable, latin subset, `display: swap`; Playfair is
   dropped in the same change, keeping payload roughly flat.
