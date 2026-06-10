import { AppShell } from "@/components/app-shell"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TRADERS, formatINR, groupIN } from "@/lib/market-data"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Crown, Medal, TrendingUp } from "lucide-react"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

const podiumStyles = [
  { ring: "ring-[var(--gold)]", text: "text-[var(--gold)]", label: "1st" },
  { ring: "ring-muted-foreground", text: "text-muted-foreground", label: "2nd" },
  { ring: "ring-[var(--bronze)]", text: "text-[var(--bronze)]", label: "3rd" },
]

export default function LeaderboardPage() {
  const top3 = TRADERS.slice(0, 3)
  // visual podium order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]]

  return (
    <AppShell
      title="Leaderboard"
      subtitle="Top performing traders ranked by total return this season"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {podiumOrder.map((t) => {
          const idx = t.rank - 1
          const style = podiumStyles[idx]
          const isFirst = t.rank === 1
          return (
            <Card
              key={t.handle}
              className={cn(
                "glass flex flex-col items-center p-6 text-center",
                isFirst && "sm:-translate-y-3 sm:scale-[1.03]",
              )}
            >
              <div className="relative">
                <Avatar className={cn("size-16 ring-2", style.ring)}>
                  <AvatarFallback className="bg-card text-base font-semibold">
                    {initials(t.username)}
                  </AvatarFallback>
                </Avatar>
                {isFirst && (
                  <Crown className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 text-[var(--gold)]" />
                )}
              </div>
              <div className={cn("mt-3 text-xs font-semibold", style.text)}>
                {style.label} PLACE
              </div>
              <p className="mt-1 font-medium">{t.username}</p>
              <p className="text-xs text-muted-foreground">{t.handle}</p>
              <p className="mt-3 font-mono text-lg font-semibold">
                {formatINR(t.portfolioValue, { compact: true, decimals: 0 })}
              </p>
              <Badge className="mt-2 gap-1 bg-[var(--gain)]/10 text-[var(--gain)] hover:bg-[var(--gain)]/10">
                <ArrowUpRight className="size-3" />
                {t.returnPct.toFixed(2)}%
              </Badge>
            </Card>
          )
        })}
      </div>

      <Card className="glass mt-6 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border p-5">
          <Medal className="size-5 text-primary" />
          <h2 className="font-medium">Full Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Trader</TableHead>
                <TableHead className="text-right">Portfolio Value</TableHead>
                <TableHead className="text-right">Return</TableHead>
                <TableHead className="text-right">Trades</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRADERS.map((t) => {
                const isYou = t.username === "You"
                return (
                  <TableRow
                    key={t.handle}
                    className={cn(isYou && "bg-primary/5 hover:bg-primary/10")}
                  >
                    <TableCell>
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-md font-mono text-sm font-semibold",
                          t.rank <= 3
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {t.rank}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-card text-xs">
                            {initials(t.username)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="flex items-center gap-2 text-sm font-medium">
                            {t.username}
                            {isYou && (
                              <Badge
                                variant="outline"
                                className="border-primary/40 px-1.5 py-0 text-[10px] text-primary"
                              >
                                YOU
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{t.handle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatINR(t.portfolioValue, { compact: true, decimals: 0 })}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1 font-mono font-medium text-[var(--gain)]">
                        <TrendingUp className="size-3.5" />
                        {t.returnPct.toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      {groupIN(t.trades, 0)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AppShell>
  )
}
