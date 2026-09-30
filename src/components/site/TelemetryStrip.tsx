import CountUp from "@/components/site/CountUp";
import Sparkline from "@/components/site/Sparkline";
import type { SiteStats } from "@/lib/site-stats";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="t-label text-muted-foreground">{label}</span>
      <span className="t-mono text-foreground tnum">{children}</span>
    </div>
  );
}

/**
 * The site reporting on itself, from its own analytics engine.
 *
 * Aggregates only. Rendered on the server and passed down as props, so no
 * public endpoint exists and nothing per-visitor is ever serialised into the
 * page. When `stats` is null the strip collapses to a bare rule — a wrong
 * number is worse than no number.
 */
export default function TelemetryStrip({ stats }: { stats: SiteStats | null }) {
  if (!stats) return <div className="rule-t" />;

  return (
    <div className="rule-t rule-b">
      <div className="shell">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3 md:gap-x-10">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-signal shrink-0"
              aria-hidden="true"
            />
            <span className="t-label text-signal">Signal</span>
          </div>

          <Field label="Views">
            <CountUp value={stats.totalViews} />
          </Field>

          <div className="flex items-center gap-2.5">
            <span className="t-label text-muted-foreground">14d</span>
            <Sparkline data={stats.dailyViews} />
          </div>

          <Field label="Regions">{stats.regions}</Field>
          <Field label="Posts">{stats.posts}</Field>

          <div className="hidden sm:flex items-center gap-2 whitespace-nowrap">
            <span className="t-label text-muted-foreground">Build</span>
            <span className="t-mono text-muted-foreground">{stats.build}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
