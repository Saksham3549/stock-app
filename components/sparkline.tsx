"use client"

import { Area, AreaChart } from "recharts"

export function Sparkline({
  data,
  positive,
}: {
  data: { label: string; price: number }[]
  positive: boolean
}) {
  const color = positive ? "var(--gain)" : "var(--loss)"
  const id = `spark-${positive ? "up" : "down"}-${data[0]?.price ?? 0}`
  return (
    <AreaChart
      width={96}
      height={40}
      data={data}
      margin={{ top: 2, bottom: 2, left: 0, right: 0 }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="price"
        stroke={color}
        strokeWidth={1.5}
        fill={`url(#${id})`}
        isAnimationActive={false}
      />
    </AreaChart>
  )
}
