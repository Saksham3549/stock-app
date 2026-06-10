"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTrade } from "@/components/trade-provider"
import { formatINR, type Stock } from "@/lib/market-data"
import { ShoppingCart, TrendingDown } from "lucide-react"

export function TradeActions({ stock }: { stock: Stock }) {
  const { openTrade } = useTrade()

  return (
    <Card className="glass p-5">
      <h2 className="font-semibold">Trade {stock.symbol}</h2>
      <p className="mt-1 text-sm text-muted-foreground">Place a paper-trade order instantly</p>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 p-4">
        <span className="text-sm text-muted-foreground">Current Price</span>
        <span className="font-mono text-lg font-semibold">{formatINR(stock.price)}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          size="lg"
          className="bg-[var(--gain)] font-semibold text-background hover:bg-[var(--gain)]/90"
          onClick={() => openTrade(stock, "BUY")}
        >
          <ShoppingCart className="size-4" />
          Buy
        </Button>
        <Button
          size="lg"
          className="bg-[var(--loss)] font-semibold text-background hover:bg-[var(--loss)]/90"
          onClick={() => openTrade(stock, "SELL")}
        >
          <TrendingDown className="size-4" />
          Sell
        </Button>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Trades use virtual balance. No real money involved.
      </p>
    </Card>
  )
}
