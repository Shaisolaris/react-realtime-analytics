import { WebSocketServer, WebSocket } from "ws";
import {
  generateEvent, generateMetrics, generateTimeSeries,
  generateGeoData, generatePageMetrics, generateDeviceBreakdown,
  generateBrowserBreakdown, generateReferrers,
} from "../lib/simulator.js";
import type { WSMessage } from "../types/index.js";

const PORT = parseInt(process.env.WS_PORT || "8080", 10);
const wss = new WebSocketServer({ port: PORT });

console.log(`📊 Analytics WebSocket server running on ws://localhost:${PORT}`);

function broadcast(msg: WSMessage) {
  const data = JSON.stringify(msg);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

// Send full dashboard data to new connections
function sendInitialData(client: WebSocket) {
  const messages: WSMessage[] = [
    { type: "metrics", data: generateMetrics() },
    { type: "timeseries", data: generateTimeSeries(60) },
    { type: "geo", data: generateGeoData() },
    { type: "pages", data: generatePageMetrics() },
    { type: "devices", data: generateDeviceBreakdown() },
    { type: "browsers", data: generateBrowserBreakdown() },
    { type: "referrers", data: generateReferrers() },
  ];

  for (const msg of messages) {
    client.send(JSON.stringify(msg));
  }

  // Send recent events
  for (let i = 0; i < 10; i++) {
    client.send(JSON.stringify({ type: "event", data: generateEvent() }));
  }
}

wss.on("connection", (ws) => {
  console.log("Client connected");
  sendInitialData(ws);

  ws.on("close", () => console.log("Client disconnected"));
  ws.on("error", (err) => console.error("WebSocket error:", err));
});

// Stream events every 500ms
setInterval(() => {
  if (wss.clients.size > 0) {
    broadcast({ type: "event", data: generateEvent() });
  }
}, 500);

// Update metrics every 3 seconds
setInterval(() => {
  if (wss.clients.size > 0) {
    broadcast({ type: "metrics", data: generateMetrics() });
  }
}, 3000);

// Update time series every 10 seconds
setInterval(() => {
  if (wss.clients.size > 0) {
    broadcast({ type: "timeseries", data: generateTimeSeries(60) });
  }
}, 10_000);

// Update aggregates every 15 seconds
setInterval(() => {
  if (wss.clients.size > 0) {
    broadcast({ type: "geo", data: generateGeoData() });
    broadcast({ type: "pages", data: generatePageMetrics() });
    broadcast({ type: "devices", data: generateDeviceBreakdown() });
    broadcast({ type: "browsers", data: generateBrowserBreakdown() });
    broadcast({ type: "referrers", data: generateReferrers() });
  }
}, 15_000);

// Ping to keep connections alive
setInterval(() => {
  broadcast({ type: "ping", data: null });
}, 30_000);
