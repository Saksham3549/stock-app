"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { HOLDINGS, formatINR } from "@/lib/market-data"

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-3)",
  "var(--primary)",
]

export function AllocationChart() {
  const data = HOLDINGS.map((h) => ({
    name: h.symbol,
    value: Number((h.currentPrice * h.quantity).toFixed(0)),
  })).sort((a, b) => b.value - a.value)

  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div>
      <div className="relative mx-auto h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={2}
              stroke="var(--card)"
              strokeWidth={2}
              isAnimationActive={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="font-mono text-sm font-semibold">{formatINR(total, { compact: true })}</span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span
              className="size-2.5 rounded-full"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span className="font-medium">{d.name}</span>
            <span className="ml-auto font-mono text-muted-foreground">
              {((d.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
