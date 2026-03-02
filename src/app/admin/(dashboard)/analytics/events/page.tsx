import { Suspense } from "react";
import Link from "next/link";
import { getEventStream } from "@/lib/analytics";
import { describeEvent } from "@/lib/event-display";
import Pagination from "@/components/admin/analytics/Pagination";

export const dynamic = "force-dynamic";

function formatTime(date: Date) {
  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

async function EventList({
  page,
  name,
  category,
  path,
}: {
  page: number;
  name?: string;
  category?: string;
  path?: string;
}) {
  const { events, total, pages } = await getEventStream(page, 50, {
    name,
    category,
    path,
  });

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">{total} total events</p>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">What Happened</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Path</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Visitor</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No events yet
                </td>
              </tr>
            )}
            {events.map((evt) => (
              <tr key={evt.id} className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors">
                <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                  {formatTime(evt.timestamp)}
                </td>
                <td className="py-3 px-4 text-gray-300 font-medium">
                  {describeEvent(evt.name, evt.properties as Record<string, unknown> | null, evt.path)}
                </td>
                <td className="py-3 px-4">
                  <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs">
                    {evt.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-400 text-xs">{evt.path}</td>
                <td className="py-3 px-4">
                  <span className="font-mono text-xs text-gray-500">
                    {evt.fingerprint.slice(0, 8)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Suspense>
        <Pagination currentPage={page} totalPages={pages} />
      </Suspense>
    </>
  );
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string; category?: string; path?: string }>;
}) {
  const { page: pageStr = "1", name, category, path } = await searchParams;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  const activeFilters = [name, category, path].filter(Boolean);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Event Stream</h1>
        <Link
          href="/admin/analytics"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Back to Overview
        </Link>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-500">Filters:</span>
          {name && (
            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
              name: {name}
            </span>
          )}
          {category && (
            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
              category: {category}
            </span>
          )}
          {path && (
            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
              path: {path}
            </span>
          )}
          <Link
            href="/admin/analytics/events"
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Clear
          </Link>
        </div>
      )}

      <Suspense
        fallback={
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-800 rounded mb-2" />
            ))}
          </div>
        }
      >
        <EventList page={page} name={name} category={category} path={path} />
      </Suspense>
    </div>
  );
}
