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
import { useTrade } from "@/components/trade-provider"
import { HOLDINGS, STOCKS, formatINR } from "@/lib/market-data"
import { cn } from "@/lib/utils"

export function HoldingsTable() {
  const router = useRouter()
  const { openTrade } = useTrade()

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Avg. Price</TableHead>
            <TableHead className="text-right">LTP</TableHead>
            <TableHead className="text-right">P&L</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {HOLDINGS.map((h) => {
            const invested = h.avgPrice * h.quantity
            const current = h.currentPrice * h.quantity
            const pnl = current - invested
            const pnlPct = (pnl / invested) * 100
            const positive = pnl >= 0
            const stock = STOCKS.find((s) => s.symbol === h.symbol)

            return (
              <TableRow
                key={h.symbol}
                className="cursor-pointer border-border"
                onClick={() => router.push(`/markets/${h.symbol}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
                      {h.symbol.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium leading-tight">{h.symbol}</p>
                      <p className="truncate text-xs text-muted-foreground">{h.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">{h.quantity}</TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">
                  {formatINR(h.avgPrice)}
                </TableCell>
                <TableCell className="text-right font-mono">{formatINR(h.currentPrice)}</TableCell>
                <TableCell className="text-right">
                  <p
                    className={cn(
                      "font-mono text-sm font-medium",
                      positive ? "text-[var(--gain)]" : "text-[var(--loss)]",
                    )}
                  >
                    {positive ? "+" : ""}
                    {formatINR(pnl)}
                  </p>
                  <p
                    className={cn(
                      "font-mono text-xs",
                      positive ? "text-[var(--gain)]" : "text-[var(--loss)]",
                    )}
                  >
                    {positive ? "+" : ""}
                    {pnlPct.toFixed(2)}%
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  {stock && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        openTrade(stock, "SELL")
                      }}
                    >
                      Sell
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
