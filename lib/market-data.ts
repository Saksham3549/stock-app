export type Stock = {
  symbol: string
  name: string
  price: number
  change: number // percent
  changeAbs: number
  volume: number // shares
  marketCap: number // in crores
  open: number
  high: number
  low: number
  prevClose: number
  sector: string
}

export type Holding = {
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
}

export type Trade = {
  id: string
  date: string
  symbol: string
  name: string
  type: "BUY" | "SELL"
  quantity: number
  price: number
}

export type Trader = {
  rank: number
  username: string
  handle: string
  portfolioValue: number
  returnPct: number
  trades: number
}

export const STOCKS: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2945.6, change: 1.84, changeAbs: 53.2, volume: 8420000, marketCap: 1992000, open: 2902.0, high: 2961.4, low: 2895.1, prevClose: 2892.4, sector: "Energy" },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 4128.35, change: -0.92, changeAbs: -38.3, volume: 2110000, marketCap: 1494000, open: 4172.0, high: 4180.5, low: 4110.2, prevClose: 4166.65, sector: "IT" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1678.9, change: 2.41, changeAbs: 39.5, volume: 11200000, marketCap: 1275000, open: 1642.0, high: 1685.0, low: 1638.7, prevClose: 1639.4, sector: "Banking" },
  { symbol: "INFY", name: "Infosys", price: 1842.15, change: 0.67, changeAbs: 12.3, volume: 4530000, marketCap: 765000, open: 1832.0, high: 1851.9, low: 1828.4, prevClose: 1829.85, sector: "IT" },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1156.7, change: 1.12, changeAbs: 12.8, volume: 9800000, marketCap: 812000, open: 1146.0, high: 1162.3, low: 1142.8, prevClose: 1143.9, sector: "Banking" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1534.25, change: -1.45, changeAbs: -22.6, volume: 3340000, marketCap: 912000, open: 1558.0, high: 1561.2, low: 1528.0, prevClose: 1556.85, sector: "Telecom" },
  { symbol: "SBIN", name: "State Bank of India", price: 824.5, change: 3.27, changeAbs: 26.1, volume: 15600000, marketCap: 735000, open: 800.0, high: 828.9, low: 798.5, prevClose: 798.4, sector: "Banking" },
  { symbol: "ITC", name: "ITC Limited", price: 478.9, change: -0.34, changeAbs: -1.6, volume: 7250000, marketCap: 598000, open: 481.0, high: 482.5, low: 476.8, prevClose: 480.5, sector: "FMCG" },
  { symbol: "LT", name: "Larsen & Toubro", price: 3612.8, change: 1.98, changeAbs: 70.2, volume: 1820000, marketCap: 497000, open: 3548.0, high: 3625.0, low: 3540.1, prevClose: 3542.6, sector: "Construction" },
  { symbol: "WIPRO", name: "Wipro", price: 542.35, change: -2.18, changeAbs: -12.1, volume: 6120000, marketCap: 283000, open: 556.0, high: 557.8, low: 539.9, prevClose: 554.45, sector: "IT" },
  { symbol: "MARUTI", name: "Maruti Suzuki", price: 12845.0, change: 0.88, changeAbs: 112.0, volume: 410000, marketCap: 404000, open: 12740.0, high: 12890.0, low: 12710.0, prevClose: 12733.0, sector: "Auto" },
  { symbol: "TATAMOTORS", name: "Tata Motors", price: 967.45, change: 4.12, changeAbs: 38.3, volume: 18900000, marketCap: 357000, open: 932.0, high: 972.6, low: 929.4, prevClose: 929.15, sector: "Auto" },
  { symbol: "ASIANPAINT", name: "Asian Paints", price: 2876.2, change: -1.76, changeAbs: -51.5, volume: 980000, marketCap: 276000, open: 2932.0, high: 2940.0, low: 2868.0, prevClose: 2927.7, sector: "FMCG" },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", price: 1789.6, change: 2.05, changeAbs: 35.9, volume: 2240000, marketCap: 429000, open: 1758.0, high: 1795.0, low: 1752.3, prevClose: 1753.7, sector: "Pharma" },
  { symbol: "AXISBANK", name: "Axis Bank", price: 1142.85, change: 0.45, changeAbs: 5.1, volume: 5680000, marketCap: 353000, open: 1138.0, high: 1148.9, low: 1134.2, prevClose: 1137.75, sector: "Banking" },
  { symbol: "HCLTECH", name: "HCL Technologies", price: 1678.3, change: -0.58, changeAbs: -9.8, volume: 1990000, marketCap: 455000, open: 1690.0, high: 1694.5, low: 1672.0, prevClose: 1688.1, sector: "IT" },
]

export const MARKET_INDICES = [
  { name: "NIFTY 50", value: 24852.35, change: 1.24 },
  { name: "SENSEX", value: 81442.66, change: 1.18 },
  { name: "BANK NIFTY", value: 53218.4, change: 2.06 },
  { name: "NIFTY IT", value: 42115.8, change: -0.74 },
]

export const HOLDINGS: Holding[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", quantity: 15, avgPrice: 2710.0, currentPrice: 2945.6 },
  { symbol: "HDFCBANK", name: "HDFC Bank", quantity: 30, avgPrice: 1605.5, currentPrice: 1678.9 },
  { symbol: "TATAMOTORS", name: "Tata Motors", quantity: 50, avgPrice: 1012.0, currentPrice: 967.45 },
  { symbol: "INFY", name: "Infosys", quantity: 20, avgPrice: 1788.0, currentPrice: 1842.15 },
  { symbol: "SBIN", name: "State Bank of India", quantity: 60, avgPrice: 745.0, currentPrice: 824.5 },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", quantity: 12, avgPrice: 1832.0, currentPrice: 1789.6 },
]

export const AVAILABLE_CASH = 184250.75

export const TRADES: Trade[] = [
  { id: "TXN-1042", date: "2026-06-08", symbol: "RELIANCE", name: "Reliance Industries", type: "BUY", quantity: 5, price: 2710.0 },
  { id: "TXN-1041", date: "2026-06-08", symbol: "TATAMOTORS", name: "Tata Motors", type: "SELL", quantity: 10, price: 985.4 },
  { id: "TXN-1040", date: "2026-06-07", symbol: "HDFCBANK", name: "HDFC Bank", type: "BUY", quantity: 15, price: 1612.2 },
  { id: "TXN-1039", date: "2026-06-06", symbol: "INFY", name: "Infosys", type: "BUY", quantity: 20, price: 1788.0 },
  { id: "TXN-1038", date: "2026-06-05", symbol: "SBIN", name: "State Bank of India", type: "BUY", quantity: 60, price: 745.0 },
  { id: "TXN-1037", date: "2026-06-04", symbol: "WIPRO", name: "Wipro", type: "SELL", quantity: 25, price: 561.3 },
  { id: "TXN-1036", date: "2026-06-03", symbol: "SUNPHARMA", name: "Sun Pharmaceutical", type: "BUY", quantity: 12, price: 1832.0 },
  { id: "TXN-1035", date: "2026-06-02", symbol: "TCS", name: "Tata Consultancy Services", type: "SELL", quantity: 8, price: 4201.5 },
  { id: "TXN-1034", date: "2026-05-30", symbol: "ICICIBANK", name: "ICICI Bank", type: "BUY", quantity: 40, price: 1098.6 },
  { id: "TXN-1033", date: "2026-05-29", symbol: "RELIANCE", name: "Reliance Industries", type: "BUY", quantity: 10, price: 2710.0 },
  { id: "TXN-1032", date: "2026-05-28", symbol: "LT", name: "Larsen & Toubro", type: "BUY", quantity: 5, price: 3488.0 },
  { id: "TXN-1031", date: "2026-05-27", symbol: "MARUTI", name: "Maruti Suzuki", type: "SELL", quantity: 2, price: 12610.0 },
  { id: "TXN-1030", date: "2026-05-26", symbol: "BHARTIARTL", name: "Bharti Airtel", type: "BUY", quantity: 18, price: 1502.0 },
  { id: "TXN-1029", date: "2026-05-23", symbol: "ITC", name: "ITC Limited", type: "BUY", quantity: 100, price: 462.5 },
  { id: "TXN-1028", date: "2026-05-22", symbol: "AXISBANK", name: "Axis Bank", type: "SELL", quantity: 30, price: 1156.9 },
  { id: "TXN-1027", date: "2026-05-21", symbol: "HCLTECH", name: "HCL Technologies", type: "BUY", quantity: 22, price: 1645.0 },
  { id: "TXN-1026", date: "2026-05-20", symbol: "TATAMOTORS", name: "Tata Motors", type: "BUY", quantity: 60, price: 1012.0 },
  { id: "TXN-1025", date: "2026-05-19", symbol: "ASIANPAINT", name: "Asian Paints", type: "SELL", quantity: 5, price: 2960.0 },
]

export const TRADERS: Trader[] = [
  { rank: 1, username: "Aarav Mehta", handle: "@bullrunaarav", portfolioValue: 4218500, returnPct: 321.85, trades: 1842 },
  { rank: 2, username: "Diya Sharma", handle: "@diyatrades", portfolioValue: 3895200, returnPct: 289.52, trades: 1567 },
  { rank: 3, username: "Kabir Nair", handle: "@kabiralpha", portfolioValue: 3540100, returnPct: 254.01, trades: 2103 },
  { rank: 4, username: "Ananya Rao", handle: "@ananya_invests", portfolioValue: 2987600, returnPct: 198.76, trades: 980 },
  { rank: 5, username: "Vihaan Gupta", handle: "@vihaanstocks", portfolioValue: 2654300, returnPct: 165.43, trades: 1245 },
  { rank: 6, username: "Ishaan Verma", handle: "@ishaan_v", portfolioValue: 2210800, returnPct: 121.08, trades: 756 },
  { rank: 7, username: "Saanvi Iyer", handle: "@saanvi_iyer", portfolioValue: 1985400, returnPct: 98.54, trades: 1102 },
  { rank: 8, username: "Arjun Reddy", handle: "@arjunreddy", portfolioValue: 1742900, returnPct: 74.29, trades: 643 },
  { rank: 9, username: "You", handle: "@you", portfolioValue: 1184250, returnPct: 18.43, trades: 218 },
  { rank: 10, username: "Myra Joshi", handle: "@myrajoshi", portfolioValue: 1098700, returnPct: 9.87, trades: 412 },
]

// Deterministic pseudo-random series so charts are stable across renders
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export function generateSeries(basePrice: number, points: number, seed: number, volatility = 0.02) {
  const rand = seeded(seed)
  const data: { label: string; price: number }[] = []
  let price = basePrice * (1 - volatility * points * 0.012)
  for (let i = 0; i < points; i++) {
    const drift = (rand() - 0.46) * basePrice * volatility
    price = Math.max(basePrice * 0.7, price + drift)
    data.push({ label: String(i), price: Number(price.toFixed(2)) })
  }
  // ensure last point matches current
  data[data.length - 1].price = basePrice
  return data
}

export function hashSymbol(symbol: string) {
  let h = 0
  for (let i = 0; i < symbol.length; i++) h = (h * 31 + symbol.charCodeAt(i)) % 100000
  return h + 1
}

export const RANGE_POINTS: Record<string, number> = {
  "1D": 26,
  "1W": 35,
  "1M": 30,
  "1Y": 52,
}

// Deterministic Indian-style digit grouping (e.g. 1,23,456.78) so server and
// client render identically regardless of ICU locale availability.
export function groupIN(value: number, decimals = 2) {
  const negative = value < 0
  const fixed = Math.abs(value).toFixed(decimals)
  const [intPart, decPart] = fixed.split(".")
  let grouped: string
  if (intPart.length <= 3) {
    grouped = intPart
  } else {
    const last3 = intPart.slice(-3)
    const rest = intPart.slice(0, -3)
    grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3
  }
  const result = decPart ? `${grouped}.${decPart}` : grouped
  return negative ? `-${result}` : result
}

export function formatINR(value: number, opts: { compact?: boolean; decimals?: number } = {}) {
  const { compact, decimals = 2 } = opts
  if (compact) {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`
    if (value >= 1000) return `₹${(value / 1000).toFixed(2)}K`
  }
  return `₹${groupIN(value, decimals)}`
}

export function formatVolume(v: number) {
  if (v >= 10000000) return `${(v / 10000000).toFixed(2)}Cr`
  if (v >= 100000) return `${(v / 100000).toFixed(2)}L`
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`
  return String(v)
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Deterministic "08 Jun 2026" style formatting from a YYYY-MM-DD string.
export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-")
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`
}
