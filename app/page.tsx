import { AppShell } from "@/components/app-shell"
import { Card } from "@/components/ui/card"
import { StatCard, Activity, IndianRupee } from "@/components/stat-card"
import { IndexTicker } from "@/components/index-ticker"
import { StockTable } from "@/components/stock-table"
import { MoverList } from "@/components/mover-list"
import { STOCKS, formatINR } from "@/lib/market-data"
import { TrendingDown, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const totalMarketCap = STOCKS.reduce((sum, s) => sum + s.marketCap, 0)
  const gainers = [...STOCKS].filter((s) => s.change > 0).sort((a, b) => b.change - a.change)
  const losers = [...STOCKS].filter((s) => s.change < 0).sort((a, b) => a.change - b.change)
  const activeCount = STOCKS.length

  return (
    <AppShell title="Market Dashboard" subtitle="Friday, June 9 · Markets open">
      <div className="space-y-6">
        <IndexTicker />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Market Cap"
            value={formatINR(totalMarketCap * 10000000, { compact: true })}
            sub="+1.42% today"
            icon={IndianRupee}
            tone="gain"
          />
          <StatCard
            label="Top Gainers"
            value={String(gainers.length)}
            sub={`${gainers[0].symbol} +${gainers[0].change.toFixed(2)}%`}
            icon={TrendingUp}
            tone="gain"
          />
          <StatCard
            label="Top Losers"
            value={String(losers.length)}
            sub={`${losers[0].symbol} ${losers[0].change.toFixed(2)}%`}
            icon={TrendingDown}
            tone="loss"
          />
          <StatCard
            label="Active Stocks"
            value={String(activeCount)}
            sub="Live trading now"
            icon={Activity}
            tone="neutral"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MoverList title="Top Gainers" stocks={gainers.slice(0, 5)} positive />
          <MoverList title="Top Losers" stocks={losers.slice(0, 5)} positive={false} />
        </div>

        <Card className="glass overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold">Live Stocks</h2>
              <p className="text-sm text-muted-foreground">Real-time prices across NSE</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--gain)]">
              <span className="size-2 animate-pulse rounded-full bg-[var(--gain)]" />
              Live
            </span>
          </div>
          <StockTable />
        </Card>
      </div>
    </AppShell>
  )
}
