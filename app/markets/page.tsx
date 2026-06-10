import { AppShell } from "@/components/app-shell"
import { Card } from "@/components/ui/card"
import { StockTable } from "@/components/stock-table"

export default function MarketsPage() {
  return (
    <AppShell title="Markets" subtitle="All listed stocks · NSE">
      <Card className="glass overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold">All Stocks</h2>
          <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--gain)]">
            <span className="size-2 animate-pulse rounded-full bg-[var(--gain)]" />
            Live
          </span>
        </div>
        <StockTable />
      </Card>
    </AppShell>
  )
}
