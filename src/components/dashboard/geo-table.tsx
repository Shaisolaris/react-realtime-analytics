import { formatNumber } from "@/lib/utils";
import type { GeoData } from "@/types";

export function GeoTable({ data }: { data: GeoData[] }) {
  const maxUsers = Math.max(...data.map((d) => d.users), 1);
  return (
    <div className="space-y-2">
      {data.slice(0, 8).map((row) => (
        <div key={row.code} className="flex items-center gap-3 text-sm">
          <span className="w-6 text-center font-mono text-xs text-muted-foreground">{row.code}</span>
          <span className="flex-1 truncate">{row.country}</span>
          <div className="w-24">
            <div className="h-1.5 w-full rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(row.users / maxUsers) * 100}%` }} />
            </div>
          </div>
          <span className="w-12 text-right font-medium">{formatNumber(row.users)}</span>
        </div>
      ))}
    </div>
  );
}
