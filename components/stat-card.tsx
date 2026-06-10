import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Activity, ArrowDownRight, ArrowUpRight, IndianRupee, type LucideIcon } from "lucide-react"

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = "neutral",
}: {
  label: string
  value: string
  sub?: string
  icon: LucideIcon
  tone?: "neutral" | "gain" | "loss"
}) {
  return (
    <Card className="glass p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-mono text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            tone === "gain" && "bg-[var(--gain)]/10 text-[var(--gain)]",
            tone === "loss" && "bg-[var(--loss)]/10 text-[var(--loss)]",
            tone === "neutral" && "bg-primary/10 text-primary",
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
      {sub && (
        <p
          className={cn(
            "mt-3 flex items-center gap-1 text-sm font-medium",
            tone === "gain" && "text-[var(--gain)]",
            tone === "loss" && "text-[var(--loss)]",
            tone === "neutral" && "text-muted-foreground",
          )}
        >
          {tone === "gain" && <ArrowUpRight className="size-4" />}
          {tone === "loss" && <ArrowDownRight className="size-4" />}
          {sub}
        </p>
      )}
    </Card>
  )
}

export { Activity, IndianRupee }
