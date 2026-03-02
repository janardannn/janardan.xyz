interface MiniChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export default function MiniChart({
  data,
  width = 200,
  height = 40,
  color = "#10b981",
}: MiniChartProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data, 1);
  const step = width / (data.length - 1);

  const points = data
    .map((v, i) => `${i * step},${height - (v / max) * height}`)
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polygon points={areaPoints} fill={color} opacity={0.1} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
