export interface AnalyticsEvent {
  id: string;
  type: EventType;
  timestamp: number;
  sessionId: string;
  userId?: string;
  page: string;
  referrer?: string;
  country: string;
  city?: string;
  device: DeviceType;
  browser: string;
  os: string;
  duration?: number;
  metadata?: Record<string, string>;
}

export type EventType = "page_view" | "click" | "conversion" | "signup" | "purchase" | "error" | "custom";
export type DeviceType = "desktop" | "mobile" | "tablet";

export interface RealtimeMetrics {
  activeUsers: number;
  pageViewsPerMinute: number;
  avgSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  errorRate: number;
}

export interface TimeSeriesPoint {
  time: string;
  value: number;
}

export interface GeoData {
  country: string;
  code: string;
  users: number;
  pageViews: number;
}

export interface PageMetric {
  page: string;
  views: number;
  uniqueVisitors: number;
  avgDuration: number;
  bounceRate: number;
}

export interface DeviceBreakdown {
  device: DeviceType;
  count: number;
  percentage: number;
}

export interface BrowserBreakdown {
  browser: string;
  count: number;
  percentage: number;
}

export interface TopReferrer {
  source: string;
  visitors: number;
  conversions: number;
}

export interface WSMessage {
  type: "metrics" | "event" | "timeseries" | "geo" | "pages" | "devices" | "browsers" | "referrers" | "ping";
  data: unknown;
}
