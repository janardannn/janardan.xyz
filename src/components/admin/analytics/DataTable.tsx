import Link from "next/link";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  rows: T[];
  linkPrefix?: string;
  linkKey?: keyof T;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  linkPrefix,
  linkKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left py-3 px-4 text-gray-400 font-medium"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-gray-500">
                No data yet
              </td>
            </tr>
          )}
          {rows.map((row, i) => {
            const content = (
              <tr
                key={i}
                className={`border-b border-gray-800/50 ${
                  linkPrefix ? "hover:bg-gray-800/50 cursor-pointer" : ""
                } transition-colors`}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="py-3 px-4 text-gray-300">
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            );

            if (linkPrefix && linkKey) {
              return (
                <Link
                  key={i}
                  href={`${linkPrefix}/${row[linkKey]}`}
                  className="contents"
                >
                  {content}
                </Link>
              );
            }

            return content;
          })}
        </tbody>
      </table>
    </div>
  );
}
