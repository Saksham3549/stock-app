"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { formatINR, type Stock } from "@/lib/market-data"
import { TrendingDown, TrendingUp, Wallet } from "lucide-react"

type Props = {
  stock: Stock | null
  action: "BUY" | "SELL"
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TradeModal({ stock, action, open, onOpenChange }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [done, setDone] = useState(false)

  if (!stock) return null

  const isBuy = action === "BUY"
  const total = quantity * stock.price
  const brokerage = Math.min(20, total * 0.0003)

  const handleSubmit = () => {
    setDone(true)
    setTimeout(() => {
      setDone(false)
      setQuantity(1)
      onOpenChange(false)
    }, 1400)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o)
        if (!o) {
          setDone(false)
          setQuantity(1)
        }
      }}
    >
      <DialogContent className="glass max-w-md gap-0 overflow-hidden p-0">
        <div
          className={cn(
            "px-6 py-5",
            isBuy ? "bg-[var(--gain)]/10" : "bg-[var(--loss)]/10",
          )}
        >
          <DialogHeader className="space-y-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-xs font-bold tracking-wide",
                      isBuy
                        ? "bg-[var(--gain)] text-background"
                        : "bg-[var(--loss)] text-background",
                    )}
                  >
                    {action}
                  </span>
                  {stock.symbol}
                </DialogTitle>
                <p className="mt-1 text-sm text-muted-foreground">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-semibold">{formatINR(stock.price)}</p>
                <p
                  className={cn(
                    "flex items-center justify-end gap-1 text-xs font-medium",
                    stock.change >= 0 ? "text-[var(--gain)]" : "text-[var(--loss)]",
                  )}
                >
                  {stock.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-full",
                isBuy ? "bg-[var(--gain)]/15 text-[var(--gain)]" : "bg-[var(--loss)]/15 text-[var(--loss)]",
              )}
            >
              <Wallet className="size-7" />
            </div>
            <p className="text-base font-semibold">Order placed</p>
            <p className="text-sm text-muted-foreground">
              {action} {quantity} {quantity > 1 ? "shares" : "share"} of {stock.symbol} at {formatINR(stock.price)}
            </p>
          </div>
        ) : (
          <div className="space-y-5 px-6 py-5">
            <div className="space-y-2">
              <Label htmlFor="qty">Quantity</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </Button>
                <Input
                  id="qty"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="text-center font-mono"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2.5 rounded-lg bg-muted/50 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price per share</span>
                <span className="font-mono">{formatINR(stock.price)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-mono">{quantity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Est. brokerage</span>
                <span className="font-mono">{formatINR(brokerage)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Estimated {isBuy ? "cost" : "credit"}</span>
                <span className="font-mono">{formatINR(total + (isBuy ? brokerage : -brokerage))}</span>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className={cn(
                "w-full font-semibold",
                isBuy
                  ? "bg-[var(--gain)] text-background hover:bg-[var(--gain)]/90"
                  : "bg-[var(--loss)] text-background hover:bg-[var(--loss)]/90",
              )}
            >
              {isBuy ? "Buy" : "Sell"} {stock.symbol}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
