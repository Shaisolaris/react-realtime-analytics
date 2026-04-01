"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  AnalyticsEvent, RealtimeMetrics, TimeSeriesPoint, GeoData,
  PageMetric, DeviceBreakdown, BrowserBreakdown, TopReferrer, WSMessage,
} from "../types/index.js";

export interface AnalyticsState {
  connected: boolean;
  metrics: RealtimeMetrics | null;
  timeseries: TimeSeriesPoint[];
  events: AnalyticsEvent[];
  geo: GeoData[];
  pages: PageMetric[];
  devices: DeviceBreakdown[];
  browsers: BrowserBreakdown[];
  referrers: TopReferrer[];
}

const MAX_EVENTS = 50;

export function useAnalyticsStream(url: string): AnalyticsState {
  const [state, setState] = useState<AnalyticsState>({
    connected: false,
    metrics: null,
    timeseries: [],
    events: [],
    geo: [],
    pages: [],
    devices: [],
    browsers: [],
    referrers: [],
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>();
  const reconnectAttempts = useRef(0);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setState((s) => ({ ...s, connected: true }));
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data as string) as WSMessage;

          setState((prev) => {
            switch (msg.type) {
              case "metrics":
                return { ...prev, metrics: msg.data as RealtimeMetrics };
              case "event":
                return {
                  ...prev,
                  events: [msg.data as AnalyticsEvent, ...prev.events].slice(0, MAX_EVENTS),
                };
              case "timeseries":
                return { ...prev, timeseries: msg.data as TimeSeriesPoint[] };
              case "geo":
                return { ...prev, geo: msg.data as GeoData[] };
              case "pages":
                return { ...prev, pages: msg.data as PageMetric[] };
              case "devices":
                return { ...prev, devices: msg.data as DeviceBreakdown[] };
              case "browsers":
                return { ...prev, browsers: msg.data as BrowserBreakdown[] };
              case "referrers":
                return { ...prev, referrers: msg.data as TopReferrer[] };
              case "ping":
                return prev;
              default:
                return prev;
            }
          });
        } catch {
          // Ignore malformed messages
        }
      };

      ws.onclose = () => {
        setState((s) => ({ ...s, connected: false }));
        wsRef.current = null;

        // Exponential backoff reconnect
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30_000);
        reconnectAttempts.current++;
        reconnectTimer.current = setTimeout(connect, delay);
      };

      ws.onerror = () => {
        ws.close();
      };
    } catch {
      // Connection failed, will retry via onclose
    }
  }, [url]);

  useEffect(() => {
    connect();

    return () => {
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return state;
}
