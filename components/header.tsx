"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Menu, Search, TrendingUp, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sidebar } from "@/components/sidebar"
import { STOCKS } from "@/lib/market-data"
import { cn } from "@/lib/utils"

export function Header() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  const results =
    query.length > 0
      ? STOCKS.filter(
          (s) =>
            s.symbol.toLowerCase().includes(query.toLowerCase()) ||
            s.name.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 6)
      : []

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      <Link href="/" className="flex items-center gap-2 lg:hidden">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <TrendingUp className="size-4" />
        </div>
      </Link>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search stocks, symbols..."
          className="pl-9"
          aria-label="Search stocks"
        />
        {focused && results.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
            {results.map((s) => (
              <button
                key={s.symbol}
                onMouseDown={() => {
                  router.push(`/markets/${s.symbol}`)
                  setQuery("")
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-accent"
              >
                <div>
                  <p className="text-sm font-medium">{s.symbol}</p>
                  <p className="text-xs text-muted-foreground">{s.name}</p>
                </div>
                <span
                  className={cn(
                    "font-mono text-sm",
                    s.change >= 0 ? "text-[var(--gain)]" : "text-[var(--loss)]",
                  )}
                >
                  {s.change >= 0 ? "+" : ""}
                  {s.change.toFixed(2)}%
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-[var(--loss)] ring-2 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full pl-1 pr-2 outline-none ring-ring focus-visible:ring-2">
            <Avatar className="size-9 border border-border">
              <AvatarFallback className="bg-primary/20 text-sm font-semibold text-primary">
                RK
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium md:inline">Rahul K.</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <p className="font-medium">Rahul Kapoor</p>
              <p className="text-xs font-normal text-muted-foreground">rahul@tradevia.app</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/portfolio")}>Portfolio</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/history")}>Trading History</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[var(--loss)]">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-12 top-3 text-foreground"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </Button>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
