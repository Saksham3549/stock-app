import { notFound } from "next/navigation"
import Link from "next/link"
import { AppShell } from "@/components/app-shell"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PriceChart } from "@/components/price-chart"
import { TradeActions } from "@/components/trade-actions"
import { STOCKS, formatINR, formatVolume } from "@/lib/market-data"
import { cn } from "@/lib/utils"
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react"

export function generateStaticParams() {
  return STOCKS.map((s) => ({ symbol: s.symbol }))
}

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {
  const { symbol } = await params
  const stock = STOCKS.find((s) => s.symbol === symbol.toUpperCase())
  if (!stock) notFound()

  const positive = stock.change >= 0
  const stats = [
    { label: "Open", value: formatINR(stock.open) },
    { label: "High", value: formatINR(stock.high) },
    { label: "Low", value: formatINR(stock.low) },
    { label: "Prev Close", value: formatINR(stock.prevClose) },
    { label: "Volume", value: formatVolume(stock.volume) },
    { label: "Market Cap", value: formatINR(stock.marketCap * 10000000, { compact: true }) },
  ]

  return (
    <AppShell title={stock.name} subtitle={`${stock.symbol} · NSE · ${stock.sector}`}>
      <Link
        href="/markets"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Markets
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="glass p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold">{stock.symbol}</h2>
                  <Badge variant="secondary">{stock.sector}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-3xl font-bold">{formatINR(stock.price)}</p>
                <p
                  className={cn(
                    "flex items-center justify-end gap-1 font-mono text-sm font-medium",
                    positive ? "text-[var(--gain)]" : "text-[var(--loss)]",
                  )}
                >
                  {positive ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  {positive ? "+" : ""}
                  {formatINR(Math.abs(stock.changeAbs))} ({positive ? "+" : ""}
                  {stock.change.toFixed(2)}%)
                </p>
              </div>
            </div>

            <div className="mt-5">
              <PriceChart stock={stock} />
            </div>
          </Card>

          <Card className="glass p-5">
            <h2 className="mb-4 font-semibold">Today&apos;s Statistics</h2>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-card p-4">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-mono text-base font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <TradeActions stock={stock} />

          <Card className="glass p-5">
            <h2 className="mb-3 font-semibold">About</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {stock.name} is a leading company in the {stock.sector.toLowerCase()} sector, listed on
              the National Stock Exchange. This is simulated data for practice trading only.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
