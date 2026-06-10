import { AppShell } from "@/components/app-shell"
import { Card } from "@/components/ui/card"
import { TradeHistoryTable } from "@/components/trade-history-table"

export default function HistoryPage() {
  return (
    <AppShell title="Trading History" subtitle="All your buy and sell transactions">
      <Card className="glass overflow-hidden">
        <TradeHistoryTable />
      </Card>
    </AppShell>
  )
}
