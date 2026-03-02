import { Suspense } from "react";
import Link from "next/link";
import {
  getOverviewStats,
  getTopPages,
  getTopReferrers,
  getDeviceBreakdown,
  getTopEvents,
  getDailyPageViews,
  getGeoBreakdown,
} from "@/lib/analytics";
import StatCard from "@/components/admin/analytics/StatCard";
import DataTable from "@/components/admin/analytics/DataTable";
import DateRangePicker from "@/components/admin/analytics/DateRangePicker";
import MiniChart from "@/components/admin/analytics/MiniChart";

export const dynamic = "force-dynamic";

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

async function AnalyticsDashboard({ range }: { range: string }) {
  const [stats, pages, referrers, devices, events, dailyViews, geo] = await Promise.all([
    getOverviewStats(range),
    getTopPages(range),
    getTopReferrers(range),
    getDeviceBreakdown(range),
    getTopEvents(range),
    getDailyPageViews(range),
    getGeoBreakdown(range),
  ]);

  const pageColumns = [
    { key: "path" as const, label: "Page" },
    { key: "views" as const, label: "Views" },
    { key: "avgDuration" as const, label: "Avg Duration", render: (v: unknown) => formatDuration(v as number) },
    { key: "avgScrollDepth" as const, label: "Avg Scroll", render: (v: unknown) => `${v}%` },
  ];

  const referrerColumns = [
    { key: "referrer" as const, label: "Referrer" },
    { key: "count" as const, label: "Sessions" },
  ];

  const eventColumns = [
    { key: "name" as const, label: "Event" },
    { key: "count" as const, label: "Count" },
  ];

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard label="Unique Visitors" value={stats.visitors} />
        <StatCard label="Sessions" value={stats.sessions} />
        <StatCard label="Page Views" value={stats.pageViews} />
        <StatCard label="Events" value={stats.events} />
        <StatCard label="Avg Duration" value={formatDuration(stats.avgDuration)} />
        <StatCard label="Bounce Rate" value={`${stats.bounceRate}%`} />
      </div>

      {/* Page Views Chart */}
      {dailyViews.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-sm text-gray-400 mb-4">Page Views Trend</h3>
          <MiniChart
            data={dailyViews.map((d) => d.count)}
            width={800}
            height={80}
          />
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>{dailyViews[0]?.date}</span>
            <span>{dailyViews[dailyViews.length - 1]?.date}</span>
          </div>
        </div>
      )}

      {/* Tables Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-400">Top Pages</h3>
          </div>
          <DataTable columns={pageColumns} rows={pages} />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm text-gray-400 mb-4">Top Referrers</h3>
          <DataTable columns={referrerColumns} rows={referrers} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Device Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm text-gray-400 mb-4">Devices</h3>
          <div className="space-y-6">
            {(["browsers", "oses", "devices"] as const).map((key) => (
              <div key={key}>
                <p className="text-xs text-gray-500 uppercase mb-2">
                  {key === "oses" ? "OS" : key === "browsers" ? "Browser" : "Device Type"}
                </p>
                <div className="space-y-2">
                  {devices[key].map((item) => {
                    const total = devices[key].reduce((s, i) => s + i.count, 0);
                    const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                    return (
                      <div key={item.name} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Events */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-400">Top Events</h3>
            <Link
              href="/admin/analytics/events"
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View all
            </Link>
          </div>
          <DataTable columns={eventColumns} rows={events} />
        </div>
      </div>

      {/* Geography */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm text-gray-400 mb-4">Top Countries</h3>
          <div className="space-y-2">
            {geo.countries.length === 0 && (
              <p className="text-sm text-gray-500">No geo data yet</p>
            )}
            {geo.countries.map((item) => {
              const total = geo.countries.reduce((s, i) => s + i.count, 0);
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">{item.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm text-gray-400 mb-4">Top Cities</h3>
          <div className="space-y-2">
            {geo.cities.length === 0 && (
              <p className="text-sm text-gray-500">No geo data yet</p>
            )}
            {geo.cities.map((item) => {
              const total = geo.cities.reduce((s, i) => s + i.count, 0);
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={`${item.name}-${item.country}`} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    {item.name}
                    <span className="text-gray-500 ml-1 text-xs">{item.country}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">{item.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range = "7d" } = await searchParams;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/analytics/visitors"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            All Visitors
          </Link>
          <Link
            href="/admin/analytics/events"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Event Stream
          </Link>
          <Suspense>
            <DateRangePicker />
          </Suspense>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-3 w-16 bg-gray-800 rounded mb-2" />
                <div className="h-8 w-20 bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        }
      >
        <AnalyticsDashboard range={range} />
      </Suspense>
    </div>
  );
}
