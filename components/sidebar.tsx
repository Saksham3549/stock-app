"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CandlestickChart,
  Briefcase,
  History,
  Trophy,
  User,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/markets", label: "Markets", icon: CandlestickChart },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/history", label: "Trading History", icon: History },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <TrendingUp className="size-5" />
        </div>
        <span className="text-lg font-semibold tracking-tight">Tradevia</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="size-[18px]" />
              {item.label}
              {active && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
            </Link>
          )
        })}
      </nav>

      <div className="m-3 rounded-xl border border-sidebar-border bg-gradient-to-br from-primary/15 to-transparent p-4">
        <p className="text-sm font-semibold">Virtual Balance</p>
        <p className="mt-1 font-mono text-xl font-bold text-primary">₹1.84L</p>
        <p className="mt-1 text-xs text-muted-foreground">Practice with paper money</p>
      </div>
    </aside>
  )
}
