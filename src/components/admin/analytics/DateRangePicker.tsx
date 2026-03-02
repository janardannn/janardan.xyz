"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ranges = [
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
];

export default function DateRangePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("range") || "7d";

  const setRange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => setRange(r.value)}
          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
            current === r.value
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
