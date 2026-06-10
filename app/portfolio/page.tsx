import { AppShell } from "@/components/app-shell"
import { Card } from "@/components/ui/card"
import { StatCard, IndianRupee } from "@/components/stat-card"
import { HoldingsTable } from "@/components/holdings-table"
import { AllocationChart } from "@/components/allocation-chart"
import { HOLDINGS, AVAILABLE_CASH, formatINR } from "@/lib/market-data"
import { Briefcase, PiggyBank, TrendingUp } from "lucide-react"

export default function PortfolioPage() {
  const invested = HOLDINGS.reduce((sum, h) => sum + h.avgPrice * h.quantity, 0)
  const currentValue = HOLDINGS.reduce((sum, h) => sum + h.currentPrice * h.quantity, 0)
  const pnl = currentValue - invested
  const pnlPct = (pnl / invested) * 100
  const portfolioValue = currentValue + AVAILABLE_CASH

  return (
    <AppShell title="Portfolio" subtitle="Your holdings and performance">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Available Cash"
            value={formatINR(AVAILABLE_CASH, { compact: true })}
            sub="Ready to invest"
            icon={PiggyBank}
            tone="neutral"
          />
          <StatCard
            label="Invested Amount"
            value={formatINR(invested, { compact: true })}
            sub={`${HOLDINGS.length} holdings`}
            icon={IndianRupee}
            tone="neutral"
          />
          <StatCard
            label="Portfolio Value"
            value={formatINR(portfolioValue, { compact: true })}
            sub="Total net worth"
            icon={Briefcase}
            tone="neutral"
          />
          <StatCard
            label="Total Profit / Loss"
            value={`${pnl >= 0 ? "+" : ""}${formatINR(pnl, { compact: true })}`}
            sub={`${pnl >= 0 ? "+" : ""}${pnlPct.toFixed(2)}% overall`}
            icon={TrendingUp}
            tone={pnl >= 0 ? "gain" : "loss"}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="glass overflow-hidden lg:col-span-2">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-semibold">Holdings</h2>
              <p className="text-sm text-muted-foreground">Stocks currently in your portfolio</p>
            </div>
            <HoldingsTable />
          </Card>

          <Card className="glass p-5">
            <h2 className="mb-1 font-semibold">Allocation</h2>
            <p className="mb-4 text-sm text-muted-foreground">By current value</p>
            <AllocationChart />
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
