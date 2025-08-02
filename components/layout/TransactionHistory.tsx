"use client"

import { useEffect, useState } from "react"
import { mockTransactions } from "@/mocks"

const iconMap: Record<string, string> = {
  Payment: "/iconPayment.svg",
  Transfer: "/iconTransfer.svg",
  CashIn: "/iconCashIn.svg",
}

export default function TransactionHistory() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-4 pb-20">
      <h3 className="text-[20px] font-semibold text-center text-gray-800 mb-2">
        Lastest Transaction
      </h3>

      <ul className="flex flex-col gap-4 px-2">
        {loading
          ? [...Array(6)].map((_, i) => (
              <li key={i} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="space-y-2">
                    <div className="w-24 h-3 bg-gray-200 rounded" />
                    <div className="w-16 h-3 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="w-12 h-4 bg-gray-200 rounded" />
              </li>
            ))
          : mockTransactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={iconMap[tx.type]} alt={tx.type} width={50} height={50} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{tx.label}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      tx.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {tx.amount < 0
                      ? `-$${Math.abs(tx.amount).toLocaleString()}`
                      : `+$${tx.amount.toLocaleString()}`}
                  </p>
                </div>
              </li>
            ))}
      </ul>
    </div>
  )
}
