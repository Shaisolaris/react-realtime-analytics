import { cn } from "@/lib/utils";

export function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={cn("h-2 w-2 rounded-full", connected ? "bg-green-500" : "bg-red-500")} />
      <span className={cn(connected ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
        {connected ? "Live" : "Disconnected"}
      </span>
    </div>
  );
}
