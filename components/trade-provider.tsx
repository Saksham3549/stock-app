"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import type { Stock } from "@/lib/market-data"
import { TradeModal } from "@/components/trade-modal"

type TradeAction = "BUY" | "SELL"

type TradeContextValue = {
  openTrade: (stock: Stock, action: TradeAction) => void
}

const TradeContext = createContext<TradeContextValue | null>(null)

export function useTrade() {
  const ctx = useContext(TradeContext)
  if (!ctx) throw new Error("useTrade must be used within TradeProvider")
  return ctx
}

export function TradeProvider({ children }: { children: ReactNode }) {
  const [stock, setStock] = useState<Stock | null>(null)
  const [action, setAction] = useState<TradeAction>("BUY")
  const [open, setOpen] = useState(false)

  const openTrade = useCallback((s: Stock, a: TradeAction) => {
    setStock(s)
    setAction(a)
    setOpen(true)
  }, [])

  return (
    <TradeContext.Provider value={{ openTrade }}>
      {children}
      <TradeModal stock={stock} action={action} open={open} onOpenChange={setOpen} />
    </TradeContext.Provider>
  )
}
