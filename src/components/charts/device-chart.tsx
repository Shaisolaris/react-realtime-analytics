"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { DeviceBreakdown } from "@/types";

const COLORS = ["hsl(221, 83%, 53%)", "hsl(262, 83%, 58%)", "hsl(173, 80%, 40%)"];

export function DeviceChart({ data }: { data: DeviceBreakdown[] }) {
  return (
    <div className="flex items-center gap-6">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie data={data} dataKey="percentage" nameKey="device" innerRadius={35} outerRadius={60} paddingAngle={4}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value: number) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={d.device} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="capitalize">{d.device}</span>
            <span className="ml-auto font-medium">{d.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
