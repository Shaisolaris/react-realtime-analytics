import { NextResponse } from "next/server";
import { generateMetrics, generateTimeSeries, generateGeoData, generatePageMetrics, generateDeviceBreakdown, generateBrowserBreakdown, generateReferrers, generateEvent } from "@/lib/simulator";

export async function GET() {
  return NextResponse.json({
    metrics: generateMetrics(),
    timeseries: generateTimeSeries(60),
    geo: generateGeoData(),
    pages: generatePageMetrics(),
    devices: generateDeviceBreakdown(),
    browsers: generateBrowserBreakdown(),
    referrers: generateReferrers(),
    events: Array.from({ length: 10 }, () => generateEvent()),
  });
}
