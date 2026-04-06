/**
 * Demo data — dashboard renders instantly with realistic analytics data.
 * In production, this is replaced by real WebSocket streams.
 */
export const DEMO_METRICS = {
  activeUsers: 1247, pageViews: 34521, bounceRate: 32.4,
  avgSessionDuration: "4m 23s", conversions: 89, revenue: 12450,
};
export const DEMO_REALTIME_USERS = [
  { page: "/dashboard", users: 342, avgTime: "3m 15s" },
  { page: "/pricing", users: 128, avgTime: "2m 45s" },
  { page: "/docs", users: 89, avgTime: "5m 30s" },
  { page: "/blog", users: 67, avgTime: "4m 10s" },
  { page: "/signup", users: 45, avgTime: "1m 55s" },
];
export const DEMO_TRAFFIC_SOURCES = [
  { source: "Direct", sessions: 12400, percentage: 35.9 },
  { source: "Google", sessions: 9800, percentage: 28.4 },
  { source: "Twitter", sessions: 4200, percentage: 12.2 },
  { source: "GitHub", sessions: 3100, percentage: 9.0 },
  { source: "LinkedIn", sessions: 2800, percentage: 8.1 },
  { source: "Other", sessions: 2221, percentage: 6.4 },
];
export const DEMO_HOURLY_TRAFFIC = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  pageViews: Math.floor(Math.random() * 800 + 200 + (i > 8 && i < 18 ? 600 : 0)),
  uniqueUsers: Math.floor(Math.random() * 400 + 100 + (i > 8 && i < 18 ? 300 : 0)),
}));
export const DEMO_EVENTS = [
  { time: "2s ago", event: "page_view", page: "/pricing", country: "US" },
  { time: "5s ago", event: "signup", page: "/register", country: "UK" },
  { time: "8s ago", event: "purchase", page: "/checkout", country: "DE" },
  { time: "12s ago", event: "page_view", page: "/docs/api", country: "JP" },
  { time: "15s ago", event: "page_view", page: "/blog/react-tips", country: "CA" },
];
