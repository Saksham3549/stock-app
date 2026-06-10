import { Card } from "@/components/ui/card"
import { MARKET_INDICES, groupIN } from "@/lib/market-data"
import { cn } from "@/lib/utils"

export function IndexTicker() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {MARKET_INDICES.map((idx) => {
        const positive = idx.change >= 0
        return (
          <Card key={idx.name} className="glass p-4">
            <p className="text-xs font-medium text-muted-foreground">{idx.name}</p>
            <p className="mt-1 font-mono text-lg font-semibold">
              {groupIN(idx.value, 2)}
            </p>
            <p
              className={cn(
                "mt-0.5 font-mono text-xs font-medium",
                positive ? "text-[var(--gain)]" : "text-[var(--loss)]",
              )}
            >
              {positive ? "+" : ""}
              {idx.change.toFixed(2)}%
            </p>
          </Card>
        )
      })}
    </div>
  )
}
