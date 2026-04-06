# react-realtime-analytics

![CI](https://github.com/Shaisolaris/react-realtime-analytics/actions/workflows/ci.yml/badge.svg)

Real-time analytics dashboard built with Next.js 14, WebSocket streaming, and Recharts. Features live KPI cards with pulse indicators, streaming event feed, traffic area charts, device donut charts, geographic breakdown, and page-level metrics — all updating in real time via a custom WebSocket server with simulated production-scale data.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 strict mode
- **Charts:** Recharts (AreaChart, PieChart with gradient fills)
- **Real-Time:** WebSocket (ws) with exponential backoff reconnection
- **Styling:** Tailwind CSS with CSS variables
- **Data:** Custom analytics simulator generating realistic streaming data

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard — KPIs, charts, tables, event stream
│   ├── globals.css             # CSS variables (light + dark)
│   └── api/simulate/route.ts   # REST fallback for non-WS environments
├── server/
│   └── ws-server.ts            # Standalone WebSocket server
│                                 - Streams events every 500ms
│                                 - Updates metrics every 3s
│                                 - Updates time series every 10s
│                                 - Updates aggregates every 15s
│                                 - Sends full state on connection
├── hooks/
│   └── useAnalyticsStream.ts   # WebSocket client hook
│                                 - Auto-reconnect with exponential backoff
│                                 - Message routing by type
│                                 - Event buffer (max 50)
│                                 - Connection state tracking
├── lib/
│   ├── simulator.ts            # Data generator
│   │                             - 10 pages, 10 countries, 5 browsers
│   │                             - 6 event types with realistic distribution
│   │                             - Drifting metrics (active users, PV/min)
│   │                             - Time series with natural variance
│   └── utils.ts                # cn, formatNumber, formatDuration, formatPercent
├── components/
│   ├── charts/
│   │   ├── traffic-chart.tsx   # Recharts AreaChart with gradient fill
│   │   └── device-chart.tsx    # Recharts donut PieChart with legend
│   ├── dashboard/
│   │   ├── kpi-card.tsx        # Metric card with pulse dot and trend arrow
│   │   ├── event-stream.tsx    # Live scrolling event feed with type badges
│   │   ├── geo-table.tsx       # Country table with inline progress bars
│   │   ├── pages-table.tsx     # Page metrics table (views, duration, bounce)
│   │   └── connection-status.tsx # Green/red dot with label
│   └── ui/
│       └── card.tsx            # Card, CardHeader, CardTitle, CardContent
└── types/
    └── index.ts                # AnalyticsEvent, RealtimeMetrics, TimeSeriesPoint,
                                  GeoData, PageMetric, DeviceBreakdown, WSMessage
```

## Setup

```bash
git clone https://github.com/Shaisolaris/react-realtime-analytics.git
cd react-realtime-analytics
npm install

# Terminal 1: Start WebSocket server
npm run server

# Terminal 2: Start Next.js
npm run dev
```

The WebSocket server runs on `ws://localhost:8080` and the dashboard on `http://localhost:3000`.

## How It Works

### Data Flow

1. **WebSocket server** (`ws-server.ts`) generates simulated analytics data using the simulator
2. On client connect, server sends full dashboard state (metrics, time series, geo, pages, devices, browsers, referrers + 10 recent events)
3. Server streams new events every 500ms, updates metrics every 3s, time series every 10s, and aggregates every 15s
4. **Client hook** (`useAnalyticsStream`) receives messages, routes by type, and updates React state
5. **Dashboard components** re-render with new data on each state update

### WebSocket Message Types

| Type | Frequency | Description |
|---|---|---|
| `event` | 500ms | Single analytics event (page view, click, conversion, etc.) |
| `metrics` | 3s | KPI snapshot (active users, PV/min, bounce, conversion, errors) |
| `timeseries` | 10s | 60-point time series for traffic chart |
| `geo` | 15s | Country-level user and pageview counts |
| `pages` | 15s | Per-page metrics (views, unique, duration, bounce) |
| `devices` | 15s | Desktop/mobile/tablet breakdown |
| `browsers` | 15s | Browser market share |
| `referrers` | 15s | Traffic source rankings |
| `ping` | 30s | Keep-alive |

### Reconnection Strategy

The client hook implements exponential backoff:
- First retry: 1 second
- Subsequent retries: 2s, 4s, 8s, 16s, up to 30s max
- Reset to 0 on successful connection
- Clean disconnect on component unmount

### Simulator Design

The simulator generates data that drifts over time rather than being purely random. Active users and page views per minute have momentum — they increase or decrease gradually, bounded by min/max limits. This creates realistic-looking charts with natural variance rather than noise.

## Key Design Decisions

**Separate WebSocket server.** The WS server runs independently from Next.js rather than being embedded in an API route. This matches production architecture where the analytics ingestion layer is a separate service. It also enables horizontal scaling — multiple Next.js instances can connect to the same WS server.

**Client-side state management via hook.** The `useAnalyticsStream` hook encapsulates all WebSocket logic: connection, reconnection, message parsing, and state updates. Components consume the hook's return value as plain data. No global state library needed.

**Event buffer with fixed size.** The event stream keeps a maximum of 50 events in memory. New events are prepended (newest first), and the oldest are dropped. This prevents unbounded memory growth during long sessions.

**REST fallback API.** The `/api/simulate` endpoint returns a single snapshot of all dashboard data. This enables the dashboard to work (without real-time updates) in environments where WebSocket connections are not available.

**Recharts with CSS variable theming.** Chart colors reference HSL values from CSS variables, making them automatically adapt to light/dark mode. Gradient fills use the primary color with opacity stops for visual depth.

## License

MIT
