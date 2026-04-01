"use client";

import { useAnalyticsStream } from "@/hooks/useAnalyticsStream";
import { KPICard } from "@/components/dashboard/kpi-card";
import { EventStream } from "@/components/dashboard/event-stream";
import { TrafficChart } from "@/components/charts/traffic-chart";
import { DeviceChart } from "@/components/charts/device-chart";
import { GeoTable } from "@/components/dashboard/geo-table";
import { PagesTable } from "@/components/dashboard/pages-table";
import { ConnectionStatus } from "@/components/dashboard/connection-status";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

export default function DashboardPage() {
  const analytics = useAnalyticsStream(WS_URL);
  const m = analytics.metrics;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time visitor insights</p>
          </div>
          <ConnectionStatus connected={analytics.connected} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        {/* KPI Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard title="Active Users" value={m?.activeUsers ?? 0} pulse trend="up" />
          <KPICard title="Page Views/min" value={m?.pageViewsPerMinute ?? 0} trend="up" />
          <KPICard title="Avg Session" value={m?.avgSessionDuration ?? 0} format="duration" />
          <KPICard title="Bounce Rate" value={m?.bounceRate ?? 0} format="percent" trend="down" />
          <KPICard title="Conversion" value={m?.conversionRate ?? 0} format="percent" trend="up" />
          <KPICard title="Error Rate" value={m?.errorRate ?? 0} format="percent" trend="neutral" />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Traffic Over Time</CardTitle></CardHeader>
            <CardContent>
              <TrafficChart data={analytics.timeseries} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Devices</CardTitle></CardHeader>
            <CardContent>
              <DeviceChart data={analytics.devices} />
            </CardContent>
          </Card>
        </div>

        {/* Tables Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Top Pages</CardTitle></CardHeader>
            <CardContent>
              <PagesTable data={analytics.pages} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Geography</CardTitle></CardHeader>
            <CardContent>
              <GeoTable data={analytics.geo} />
            </CardContent>
          </Card>
        </div>

        {/* Live Event Stream */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Live Event Stream</CardTitle>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <EventStream events={analytics.events} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
