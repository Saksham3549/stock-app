"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Sparkline } from "@/components/sparkline"
import { useTrade } from "@/components/trade-provider"
import {
  STOCKS,
  formatINR,
  formatVolume,
  generateSeries,
  hashSymbol,
  type Stock,
} from "@/lib/market-data"
import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export function StockTable({ stocks = STOCKS }: { stocks?: Stock[] }) {
  const router = useRouter()
  const { openTrade } = useTrade()

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="min-w-40">Company</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="hidden text-right md:table-cell">Volume</TableHead>
            <TableHead className="hidden lg:table-cell">7D Trend</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((s) => {
            const positive = s.change >= 0
            const series = generateSeries(s.price, 20, hashSymbol(s.symbol), 0.025)
            return (
              <TableRow
                key={s.symbol}
                className="cursor-pointer border-border"
                onClick={() => router.push(`/markets/${s.symbol}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
                      {s.symbol.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium leading-tight">{s.symbol}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">{formatINR(s.price)}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "inline-flex items-center justify-end gap-0.5 rounded-md px-1.5 py-0.5 font-mono text-sm",
                      positive
                        ? "bg-[var(--gain)]/10 text-[var(--gain)]"
                        : "bg-[var(--loss)]/10 text-[var(--loss)]",
                    )}
                  >
                    {positive ? (
                      <ArrowUpRight className="size-3.5" />
                    ) : (
                      <ArrowDownRight className="size-3.5" />
                    )}
                    {positive ? "+" : ""}
                    {s.change.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="hidden text-right font-mono text-muted-foreground md:table-cell">
                  {formatVolume(s.volume)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Sparkline data={series} positive={positive} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="bg-[var(--gain)] text-background hover:bg-[var(--gain)]/90"
                    onClick={(e) => {
                      e.stopPropagation()
                      openTrade(s, "BUY")
                    }}
                  >
                    Buy
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
