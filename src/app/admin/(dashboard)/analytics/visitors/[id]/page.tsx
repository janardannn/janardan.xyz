import Link from "next/link";
import { notFound } from "next/navigation";
import { getVisitorDetail } from "@/lib/analytics";
import { describeEvent } from "@/lib/event-display";

export const dynamic = "force-dynamic";

function formatTime(date: Date) {
  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

function formatDuration(seconds: number | null) {
  if (!seconds) return "—";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default async function VisitorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const visitor = await getVisitorDetail(id);

  if (!visitor) return notFound();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/analytics/visitors"
            className="text-sm text-gray-400 hover:text-white transition-colors mb-2 inline-block"
          >
            &larr; All Visitors
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white font-mono">
              {visitor.fingerprint.slice(0, 16)}...
            </h1>
            {visitor.isBot ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/25">
                Bot
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                Human
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Device Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-sm text-gray-400 mb-4">Device Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { label: "Browser", value: visitor.browser },
            { label: "OS", value: visitor.os },
            { label: "Device", value: visitor.device },
            { label: "Language", value: visitor.language },
            { label: "Timezone", value: visitor.timezone },
            { label: "Screen", value: visitor.screenWidth && visitor.screenHeight ? `${visitor.screenWidth}x${visitor.screenHeight}` : null },
            { label: "First Seen", value: formatTime(visitor.firstSeenAt) },
            { label: "Last Seen", value: formatTime(visitor.lastSeenAt) },
            // Geo
            { label: "Country", value: visitor.country
              ? `${visitor.country.length === 2 ? String.fromCodePoint(...[...visitor.country.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65)) + " " : ""}${visitor.country.length === 2 ? (new Intl.DisplayNames(["en"], { type: "region" }).of(visitor.country.toUpperCase()) ?? visitor.country) : visitor.country}`
              : null },
            { label: "Region", value: visitor.region },
            { label: "City", value: visitor.city },
            { label: "IP", value: visitor.ip },
            // Hardware
            { label: "Color Depth", value: visitor.colorDepth ? `${visitor.colorDepth}-bit` : null },
            { label: "Pixel Ratio", value: visitor.pixelRatio ? `${visitor.pixelRatio}x` : null },
            { label: "Memory", value: visitor.deviceMemory ? `${visitor.deviceMemory} GB` : null },
            { label: "Touch Points", value: visitor.maxTouchPoints != null ? String(visitor.maxTouchPoints) : null },
            { label: "Platform", value: visitor.platform },
            { label: "CPU Cores", value: visitor.cpuCores ? String(visitor.cpuCores) : null },
            { label: "Connection", value: visitor.connectionType },
            // GPU
            { label: "GPU Vendor", value: visitor.webglVendor },
            { label: "GPU Renderer", value: visitor.webglRenderer },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-sm text-gray-300">{item.value ?? "—"}</p>
            </div>
          ))}
        </div>

        {/* Bot Detection */}
        {(visitor.botScore != null || visitor.webdriver != null || visitor.pluginsLength != null) && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 uppercase mb-3">Bot Detection</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {visitor.botScore != null && (
                <div>
                  <p className="text-xs text-gray-500">Bot Score</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          visitor.botScore >= 50 ? "bg-rose-500" : visitor.botScore >= 30 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(visitor.botScore, 100)}%` }}
                      />
                    </div>
                    <span className={`text-sm font-mono font-medium ${
                      visitor.botScore >= 50 ? "text-rose-400" : visitor.botScore >= 30 ? "text-amber-400" : "text-emerald-400"
                    }`}>
                      {visitor.botScore}
                    </span>
                  </div>
                </div>
              )}
              {visitor.webdriver != null && (
                <div>
                  <p className="text-xs text-gray-500">WebDriver</p>
                  <p className={`text-sm font-medium ${visitor.webdriver ? "text-rose-400" : "text-emerald-400"}`}>
                    {visitor.webdriver ? "Detected" : "Not detected"}
                  </p>
                </div>
              )}
              {visitor.pluginsLength != null && (
                <div>
                  <p className="text-xs text-gray-500">Plugins</p>
                  <p className={`text-sm font-medium ${visitor.pluginsLength === 0 ? "text-amber-400" : "text-gray-300"}`}>
                    {visitor.pluginsLength}
                  </p>
                </div>
              )}
            </div>
            {Array.isArray(visitor.botSignals) && visitor.botSignals.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {(visitor.botSignals as string[]).map((signal) => (
                  <span
                    key={signal}
                    className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs font-mono"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User Agent */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-1">User Agent</p>
          <p className="text-xs text-gray-400 font-mono break-all">{visitor.userAgent ?? "—"}</p>
        </div>

        {/* Raw Fingerprint Data */}
        {(visitor.canvasData || visitor.audioData) && (
          <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
            <p className="text-xs text-gray-500 uppercase">Raw Fingerprint Data</p>
            {visitor.canvasData && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Canvas Data</p>
                <p className="text-xs text-gray-400 font-mono break-all max-h-20 overflow-y-auto">{visitor.canvasData}</p>
              </div>
            )}
            {visitor.audioData && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Audio Data</p>
                <p className="text-xs text-gray-400 font-mono break-all max-h-20 overflow-y-auto">{visitor.audioData}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sessions Timeline */}
      <h2 className="text-lg font-semibold text-white mb-4">
        Sessions ({visitor.sessions.length})
      </h2>

      <div className="space-y-6">
        {visitor.sessions.map((session) => (
          <div
            key={session.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-white font-medium">
                  {formatTime(session.startedAt)}
                </p>
                <p className="text-xs text-gray-500">
                  {session.referrer ? `from ${session.referrer}` : "Direct"} &middot;{" "}
                  Entry: {session.entryPage}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{session.pageCount} pages</span>
                <span>{session.eventCount} events</span>
                <span>{formatDuration(session.duration)}</span>
              </div>
            </div>

            {/* UTM params */}
            {(session.utmSource || session.utmMedium || session.utmCampaign) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {session.utmSource && (
                  <span className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
                    src: {session.utmSource}
                  </span>
                )}
                {session.utmMedium && (
                  <span className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
                    med: {session.utmMedium}
                  </span>
                )}
                {session.utmCampaign && (
                  <span className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
                    cmp: {session.utmCampaign}
                  </span>
                )}
              </div>
            )}

            {/* Page Views */}
            {session.pageViews.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-2">Pages Visited</p>
                <div className="space-y-1">
                  {session.pageViews.map((pv) => (
                    <div
                      key={pv.id}
                      className="flex items-center justify-between text-sm py-1 px-3 rounded bg-gray-800/50"
                    >
                      <span className="text-gray-300">{pv.path}</span>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{formatDuration(pv.duration)}</span>
                        {pv.scrollDepth !== null && <span>{pv.scrollDepth}% scroll</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            {session.events.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Events</p>
                <div className="space-y-1">
                  {session.events.map((evt) => (
                    <div
                      key={evt.id}
                      className="flex items-center justify-between text-sm py-1 px-3 rounded bg-gray-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs">
                          {evt.category}
                        </span>
                        <span className="text-gray-300">
                          {describeEvent(evt.name, evt.properties as Record<string, unknown> | null, evt.path)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{evt.path}</span>
                        <span>{formatTime(evt.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {visitor.sessions.length === 0 && (
          <p className="text-gray-500 text-center py-8">No sessions recorded</p>
        )}
      </div>
    </div>
  );
}
