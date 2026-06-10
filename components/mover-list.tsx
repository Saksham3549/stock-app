"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Sparkline } from "@/components/sparkline"
import { formatINR, generateSeries, hashSymbol, type Stock } from "@/lib/market-data"
import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export function MoverList({
  title,
  stocks,
  positive,
}: {
  title: string
  stocks: Stock[]
  positive: boolean
}) {
  return (
    <Card className="glass p-5">
      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-md",
            positive ? "bg-[var(--gain)]/10 text-[var(--gain)]" : "bg-[var(--loss)]/10 text-[var(--loss)]",
          )}
        >
          {positive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
        </span>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="space-y-1">
        {stocks.map((s) => (
          <Link
            key={s.symbol}
            href={`/markets/${s.symbol}`}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-semibold">
              {s.symbol.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">{s.symbol}</p>
              <p className="truncate text-xs text-muted-foreground">{s.name}</p>
            </div>
            <Sparkline data={generateSeries(s.price, 16, hashSymbol(s.symbol), 0.03)} positive={positive} />
            <div className="text-right">
              <p className="font-mono text-sm">{formatINR(s.price)}</p>
              <p
                className={cn(
                  "font-mono text-xs",
                  positive ? "text-[var(--gain)]" : "text-[var(--loss)]",
                )}
              >
                {positive ? "+" : ""}
                {s.change.toFixed(2)}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
