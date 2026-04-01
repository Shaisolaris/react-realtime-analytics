import { Card } from "@/components/ui/card";
import { cn, formatNumber, formatPercent, formatDuration } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  format?: "number" | "percent" | "duration";
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  pulse?: boolean;
}

export function KPICard({ title, value, format = "number", trend, icon, pulse }: KPICardProps) {
  const formatted = format === "percent" ? formatPercent(value) : format === "duration" ? formatDuration(value) : formatNumber(value);

  return (
    <Card className="relative overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-bold">{formatted}</p>
          {pulse && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
          )}
        </div>
        {trend && (
          <p className={cn("mt-1 text-xs", trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground")}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} vs last period
          </p>
        )}
      </div>
    </Card>
  );
}
