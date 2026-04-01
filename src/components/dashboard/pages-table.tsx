import { formatNumber, formatDuration, formatPercent } from "@/lib/utils";
import type { PageMetric } from "@/types";

export function PagesTable({ data }: { data: PageMetric[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th className="pb-2 font-medium">Page</th>
            <th className="pb-2 text-right font-medium">Views</th>
            <th className="pb-2 text-right font-medium">Unique</th>
            <th className="pb-2 text-right font-medium">Avg Duration</th>
            <th className="pb-2 text-right font-medium">Bounce</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 8).map((page) => (
            <tr key={page.page} className="border-b last:border-0">
              <td className="py-2 font-mono text-xs">{page.page}</td>
              <td className="py-2 text-right">{formatNumber(page.views)}</td>
              <td className="py-2 text-right text-muted-foreground">{formatNumber(page.uniqueVisitors)}</td>
              <td className="py-2 text-right text-muted-foreground">{formatDuration(page.avgDuration)}</td>
              <td className="py-2 text-right text-muted-foreground">{formatPercent(page.bounceRate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
