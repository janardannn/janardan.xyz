import { Suspense } from "react";
import Link from "next/link";
import { getVisitors } from "@/lib/analytics";
import Pagination from "@/components/admin/analytics/Pagination";

export const dynamic = "force-dynamic";

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

async function VisitorList({ page }: { page: number }) {
  const { visitors, total, pages } = await getVisitors(page);

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">{total} total visitors</p>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Fingerprint</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Browser</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">OS</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Device</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Sessions</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No visitors yet
                </td>
              </tr>
            )}
            {visitors.map((v) => (
              <tr key={v.id} className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors">
                <td className="py-3 px-4">
                  <Link
                    href={`/admin/analytics/visitors/${v.id}`}
                    className="text-emerald-400 hover:text-emerald-300 font-mono text-xs transition-colors"
                  >
                    {v.fingerprint.slice(0, 12)}...
                  </Link>
                </td>
                <td className="py-3 px-4 text-gray-300">{v.browser ?? "—"}</td>
                <td className="py-3 px-4 text-gray-300">{v.os ?? "—"}</td>
                <td className="py-3 px-4 text-gray-300">{v.device ?? "—"}</td>
                <td className="py-3 px-4 text-gray-300">{v.sessionCount}</td>
                <td className="py-3 px-4 text-gray-500">{timeAgo(v.lastSeenAt)}</td>
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

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Visitors</h1>
        <Link
          href="/admin/analytics"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Back to Overview
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 animate-pulse">
            <div className="h-4 w-32 bg-gray-800 rounded mb-4" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-800 rounded mb-2" />
            ))}
          </div>
        }
      >
        <VisitorList page={page} />
      </Suspense>
    </div>
  );
}
