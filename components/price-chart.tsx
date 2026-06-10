"use client"

import { useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"
import { formatINR, generateSeries, groupIN, hashSymbol, RANGE_POINTS, type Stock } from "@/lib/market-data"

const RANGES = ["1D", "1W", "1M", "1Y"] as const

export function PriceChart({ stock }: { stock: Stock }) {
  const [range, setRange] = useState<(typeof RANGES)[number]>("1M")
  const positive = stock.change >= 0
  const color = positive ? "var(--gain)" : "var(--loss)"

  const data = useMemo(() => {
    const points = RANGE_POINTS[range]
    const vol = range === "1D" ? 0.012 : range === "1W" ? 0.02 : range === "1M" ? 0.035 : 0.08
    const series = generateSeries(stock.price, points, hashSymbol(stock.symbol) + points, vol)
    return series.map((d, i) => ({ ...d, t: tickLabel(range, i, points) }))
  }, [range, stock])

  const min = Math.min(...data.map((d) => d.price))
  const max = Math.max(...data.map((d) => d.price))

  return (
    <div>
      <div className="mb-4 flex gap-1 rounded-lg bg-muted p-1">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              range === r
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: 8 }}>
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="t"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              minTickGap={32}
            />
            <YAxis
              domain={[min * 0.998, max * 1.002]}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(v) => `₹${groupIN(Math.round(v), 0)}`}
            />
            <Tooltip
              cursor={{ stroke: "var(--border)" }}
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                fontSize: "12px",
                color: "var(--popover-foreground)",
              }}
              labelStyle={{ color: "var(--muted-foreground)" }}
              formatter={(v: number) => [formatINR(v), "Price"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              fill="url(#chartFill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function tickLabel(range: string, i: number, total: number) {
  if (range === "1D") {
    const startMin = 9 * 60 + 15
    const minutes = startMin + Math.round((i / (total - 1)) * (6 * 60 + 15))
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  }
  if (range === "1W") return `D${i + 1}`
  if (range === "1M") return `${i + 1}`
  // 1Y -> weeks to months
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  return months[Math.floor((i / total) * 12)]
}
