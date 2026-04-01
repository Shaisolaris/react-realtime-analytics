import type {
  AnalyticsEvent, RealtimeMetrics, TimeSeriesPoint, GeoData,
  PageMetric, DeviceBreakdown, BrowserBreakdown, TopReferrer,
  EventType, DeviceType,
} from "../types/index.js";

const PAGES = ["/", "/pricing", "/docs", "/blog", "/about", "/dashboard", "/settings", "/signup", "/login", "/features"];
const COUNTRIES = [
  { country: "United States", code: "US" }, { country: "United Kingdom", code: "GB" },
  { country: "Germany", code: "DE" }, { country: "France", code: "FR" },
  { country: "Canada", code: "CA" }, { country: "Australia", code: "AU" },
  { country: "Japan", code: "JP" }, { country: "India", code: "IN" },
  { country: "Brazil", code: "BR" }, { country: "Netherlands", code: "NL" },
];
const BROWSERS = ["Chrome", "Firefox", "Safari", "Edge", "Opera"];
const OS_LIST = ["Windows", "macOS", "Linux", "iOS", "Android"];
const DEVICES: DeviceType[] = ["desktop", "mobile", "tablet"];
const EVENT_TYPES: EventType[] = ["page_view", "click", "conversion", "signup", "purchase", "error"];
const REFERRERS = ["google.com", "twitter.com", "github.com", "reddit.com", "linkedin.com", "direct", "facebook.com", "hn.algolia.com"];

function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]!; }

let eventCounter = 0;

export function generateEvent(): AnalyticsEvent {
  eventCounter++;
  const device = pick(DEVICES);
  const loc = pick(COUNTRIES);

  return {
    id: `evt-${Date.now()}-${eventCounter}`,
    type: pick(EVENT_TYPES),
    timestamp: Date.now(),
    sessionId: `sess-${Math.floor(rand(1000, 9999))}`,
    page: pick(PAGES),
    referrer: Math.random() > 0.3 ? pick(REFERRERS) : undefined,
    country: loc.country,
    city: undefined,
    device,
    browser: pick(BROWSERS),
    os: pick(OS_LIST),
    duration: Math.random() > 0.5 ? Math.floor(rand(5, 300)) : undefined,
  };
}

// Simulated metrics that drift over time
let baseActiveUsers = 342;
let basePVPerMin = 128;

export function generateMetrics(): RealtimeMetrics {
  baseActiveUsers += Math.floor(rand(-15, 20));
  baseActiveUsers = Math.max(50, Math.min(1000, baseActiveUsers));
  basePVPerMin += Math.floor(rand(-10, 12));
  basePVPerMin = Math.max(20, Math.min(500, basePVPerMin));

  return {
    activeUsers: baseActiveUsers,
    pageViewsPerMinute: basePVPerMin,
    avgSessionDuration: rand(120, 300),
    bounceRate: rand(25, 55),
    conversionRate: rand(2, 8),
    errorRate: rand(0.1, 2.5),
  };
}

export function generateTimeSeries(points = 60): TimeSeriesPoint[] {
  const now = Date.now();
  let value = 100;

  return Array.from({ length: points }, (_, i) => {
    value += rand(-15, 18);
    value = Math.max(10, value);
    const time = new Date(now - (points - i) * 60_000);
    return {
      time: `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`,
      value: Math.round(value),
    };
  });
}

export function generateGeoData(): GeoData[] {
  return COUNTRIES.map((c) => ({
    country: c.country,
    code: c.code,
    users: Math.floor(rand(10, 500)),
    pageViews: Math.floor(rand(50, 2000)),
  })).sort((a, b) => b.users - a.users);
}

export function generatePageMetrics(): PageMetric[] {
  return PAGES.map((page) => ({
    page,
    views: Math.floor(rand(50, 5000)),
    uniqueVisitors: Math.floor(rand(30, 3000)),
    avgDuration: rand(10, 240),
    bounceRate: rand(15, 70),
  })).sort((a, b) => b.views - a.views);
}

export function generateDeviceBreakdown(): DeviceBreakdown[] {
  const desktop = Math.floor(rand(55, 70));
  const mobile = Math.floor(rand(20, 35));
  const tablet = 100 - desktop - mobile;

  return [
    { device: "desktop", count: desktop * 10, percentage: desktop },
    { device: "mobile", count: mobile * 10, percentage: mobile },
    { device: "tablet", count: Math.max(0, tablet) * 10, percentage: Math.max(0, tablet) },
  ];
}

export function generateBrowserBreakdown(): BrowserBreakdown[] {
  const total = 100;
  let remaining = total;
  return BROWSERS.map((browser, i) => {
    const pct = i === BROWSERS.length - 1 ? remaining : Math.floor(rand(5, remaining - (BROWSERS.length - i - 1) * 5));
    remaining -= pct;
    return { browser, count: pct * 10, percentage: pct };
  }).sort((a, b) => b.percentage - a.percentage);
}

export function generateReferrers(): TopReferrer[] {
  return REFERRERS.map((source) => ({
    source,
    visitors: Math.floor(rand(20, 800)),
    conversions: Math.floor(rand(1, 50)),
  })).sort((a, b) => b.visitors - a.visitors);
}
