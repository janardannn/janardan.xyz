import type { DailyPoint } from "@/lib/site-stats";

/**
 * Inline SVG, no library. The series arrives zero-filled, so quiet days render
 * as genuine troughs instead of being silently compressed out of the line.
 */
export default function Sparkline({
  data,
  width = 96,
  height = 18,
}: {
  data: DailyPoint[];
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;

  const max = Math.max(...data.map((d) => d.count), 1);
  const step = width / (data.length - 1);
  const y = (count: number) => height - (count / max) * (height - 2) - 1;

  const points = data.map((d, i) => `${(i * step).toFixed(2)},${y(d.count).toFixed(2)}`);
  const last = data[data.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      className="overflow-visible shrink-0"
    >
      <polyline
        points={points.join(" ")}
        stroke="var(--signal)"
        strokeWidth="1"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={width} cy={y(last.count)} r="1.75" fill="var(--signal)" />
    </svg>
  );
}
