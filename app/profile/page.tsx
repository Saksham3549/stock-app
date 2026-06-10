import { AppShell } from "@/components/app-shell"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/stat-card"
import {
  HOLDINGS,
  TRADES,
  AVAILABLE_CASH,
  formatINR,
} from "@/lib/market-data"
import {
  Award,
  Briefcase,
  CalendarDays,
  Mail,
  Percent,
  TrendingUp,
  Wallet,
} from "lucide-react"

export default function ProfilePage() {
  const invested = HOLDINGS.reduce((s, h) => s + h.avgPrice * h.quantity, 0)
  const current = HOLDINGS.reduce((s, h) => s + h.currentPrice * h.quantity, 0)
  const portfolioValue = current + AVAILABLE_CASH
  const totalPnl = current - invested
  const returnPct = (totalPnl / invested) * 100
  const buys = TRADES.filter((t) => t.type === "BUY").length
  const sells = TRADES.filter((t) => t.type === "SELL").length

  const achievements = [
    { label: "First Trade", desc: "Placed your first order", icon: TrendingUp, unlocked: true },
    { label: "Diversified", desc: "Hold 5+ different stocks", icon: Briefcase, unlocked: true },
    { label: "Profit Maker", desc: "Closed a trade in profit", icon: Percent, unlocked: true },
    { label: "High Roller", desc: "Portfolio crosses ₹10L", icon: Award, unlocked: false },
  ]

  return (
    <AppShell title="Profile" subtitle="Your account details and trading achievements">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass flex flex-col items-center p-6 text-center lg:col-span-1">
          <Avatar className="size-20 ring-2 ring-primary">
            <AvatarFallback className="bg-card text-xl font-semibold">RT</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-semibold">Rahul Trader</h2>
          <p className="text-sm text-muted-foreground">@you</p>
          <Badge className="mt-3 gap-1 bg-primary/10 text-primary hover:bg-primary/10">
            <Award className="size-3" />
            Rank #9 Globally
          </Badge>

          <Separator className="my-5" />

          <div className="w-full space-y-3 text-left text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="size-4" />
              <span>rahul.trader@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <CalendarDays className="size-4" />
              <span>Joined March 2026</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Wallet className="size-4" />
              <span>{formatINR(AVAILABLE_CASH)} available cash</span>
            </div>
          </div>

          <Button className="mt-6 w-full" variant="secondary">
            Edit Profile
          </Button>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              label="Portfolio Value"
              value={formatINR(portfolioValue, { compact: true, decimals: 0 })}
              icon={Wallet}
              tone="neutral"
            />
            <StatCard
              label="Total Return"
              value={`${returnPct >= 0 ? "+" : ""}${returnPct.toFixed(2)}%`}
              sub={formatINR(totalPnl, { decimals: 0 })}
              icon={TrendingUp}
              tone={totalPnl >= 0 ? "gain" : "loss"}
            />
            <StatCard
              label="Total Trades"
              value={String(TRADES.length)}
              sub={`${buys} buys · ${sells} sells`}
              icon={Briefcase}
              tone="neutral"
            />
            <StatCard
              label="Holdings"
              value={String(HOLDINGS.length)}
              sub="active positions"
              icon={Percent}
              tone="neutral"
            />
          </div>

          <Card className="glass p-6">
            <div className="flex items-center gap-2">
              <Award className="size-5 text-primary" />
              <h3 className="font-medium">Achievements</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {achievements.map((a) => {
                const Icon = a.icon
                return (
                  <div
                    key={a.label}
                    className={
                      "flex items-center gap-3 rounded-lg border p-3 " +
                      (a.unlocked
                        ? "border-border bg-card/40"
                        : "border-dashed border-border opacity-50")
                    }
                  >
                    <div
                      className={
                        "flex size-10 shrink-0 items-center justify-center rounded-lg " +
                        (a.unlocked
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground")
                      }
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{a.label}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
