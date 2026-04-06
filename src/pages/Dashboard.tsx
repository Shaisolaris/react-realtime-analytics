import { DEMO_METRICS, DEMO_REALTIME_USERS, DEMO_TRAFFIC_SOURCES, DEMO_EVENTS } from "../data/demo";

export function Dashboard() {
  const metrics = DEMO_METRICS;

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Real-time Analytics</h1>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <MetricCard label="Active Users" value={metrics.activeUsers.toLocaleString()} />
        <MetricCard label="Page Views" value={metrics.pageViews.toLocaleString()} />
        <MetricCard label="Bounce Rate" value={`${metrics.bounceRate}%`} />
        <MetricCard label="Avg Session" value={metrics.avgSessionDuration} />
        <MetricCard label="Conversions" value={String(metrics.conversions)} />
        <MetricCard label="Revenue" value={`$${metrics.revenue.toLocaleString()}`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 font-semibold">Active Pages</h2>
          {DEMO_REALTIME_USERS.map((p) => (
            <div key={p.page} className="flex items-center justify-between border-b py-2 last:border-0">
              <span className="font-mono text-sm">{p.page}</span>
              <span className="font-bold">{p.users} users</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 font-semibold">Traffic Sources</h2>
          {DEMO_TRAFFIC_SOURCES.map((s) => (
            <div key={s.source} className="flex items-center justify-between border-b py-2 last:border-0">
              <span>{s.source}</span>
              <span>{s.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 font-semibold">Live Events</h2>
        {DEMO_EVENTS.map((e, i) => (
          <div key={i} className="flex items-center gap-4 border-b py-2 last:border-0 text-sm">
            <span className="text-gray-400">{e.time}</span>
            <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs">{e.event}</span>
            <span>{e.page}</span>
            <span className="ml-auto">{e.country}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
