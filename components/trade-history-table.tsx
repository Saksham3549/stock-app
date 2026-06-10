"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TRADES, formatINR, formatDate } from "@/lib/market-data"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

const PAGE_SIZE = 8

export function TradeHistoryTable() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL">("ALL")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return TRADES.filter((t) => {
      const matchesQuery =
        t.symbol.toLowerCase().includes(query.toLowerCase()) ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.id.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === "ALL" || t.type === filter
      return matchesQuery && matchesFilter
    })
  }, [query, filter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search by stock, symbol or txn ID..."
            className="pl-9"
            aria-label="Search transactions"
          />
        </div>
        <Select
          value={filter}
          onValueChange={(v) => {
            setFilter(v as typeof filter)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-full sm:w-40" aria-label="Filter by type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Trades</SelectItem>
            <SelectItem value="BUY">Buy Only</SelectItem>
            <SelectItem value="SELL">Sell Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Date</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              pageItems.map((t) => {
                const isBuy = t.type === "BUY"
                return (
                  <TableRow key={t.id} className="border-border">
                    <TableCell>
                      <p className="text-sm">
                        {formatDate(t.date)}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.id}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{t.symbol}</p>
                      <p className="truncate text-xs text-muted-foreground">{t.name}</p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "border-transparent font-medium",
                          isBuy
                            ? "bg-[var(--gain)]/12 text-[var(--gain)]"
                            : "bg-[var(--loss)]/12 text-[var(--loss)]",
                        )}
                      >
                        {t.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{t.quantity}</TableCell>
                    <TableCell className="text-right font-mono">{formatINR(t.price)}</TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      {formatINR(t.price * t.quantity)}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Showing {pageItems.length} of {filtered.length} transactions
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="size-4" />
            Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
