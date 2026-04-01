"use client";
import { cn } from "@/lib/utils";
import type { AnalyticsEvent } from "@/types";

const typeColors: Record<string, string> = {
  page_view: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  click: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  conversion: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  signup: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  purchase: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function EventStream({ events }: { events: AnalyticsEvent[] }) {
  return (
    <div className="space-y-1 overflow-hidden">
      {events.slice(0, 15).map((event, i) => (
        <div
          key={event.id}
          className={cn("flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-opacity", i === 0 && "animate-pulse")}
        >
          <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-xs font-medium", typeColors[event.type] || "bg-muted")}>
            {event.type.replace("_", " ")}
          </span>
          <span className="truncate text-foreground">{event.page}</span>
          <span className="ml-auto shrink-0 text-xs text-muted-foreground">{event.country}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{event.device}</span>
        </div>
      ))}
    </div>
  );
}
