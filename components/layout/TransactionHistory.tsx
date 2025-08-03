"use client";

import { useEffect, useState } from "react";
import { useTransfersFromDB } from "@/hooks";
import { mockTransactions } from "@/mocks";
import { Transaction } from "@/types";
import { formatDates } from "@/utils";
import { useUIStore } from "@/stores"

const iconMap: Record<string, string> = {
  Payment: "/iconPayment.svg",
  Transfer: "/iconTransfer.svg",
  CashIn: "/iconCashIn.svg",
};

export default function TransactionHistory() {
  const { data = [] } = useTransfersFromDB();
  const hasSeen = useUIStore((state) => state.hasSeenTransactionHistory);
  const markAsSeen = useUIStore((state) => state.setHasSeenTransactionHistory);
  const [loading, setLoading] = useState(!hasSeen);

  useEffect(() => {
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setLoading(false);
        markAsSeen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasSeen, markAsSeen]);

  const formattedTransfers: Transaction[] = data.map((tx) => ({
    id: tx.id,
    type: "Transfer",
    date: tx.date,
    amount: -tx.amount,
    fromDB: true,
  }));

  const unified: Transaction[] = [...mockTransactions, ...formattedTransfers];

  const sorted = unified.sort((a, b) => {
    const dateA = new Date(a.date.split("·")[0].trim()).getTime();
    const dateB = new Date(b.date.split("·")[0].trim()).getTime();
    return dateB - dateA;
  });

  return (
    <div className="flex flex-col gap-4 pb-20">
      <h3 className="text-[20px] font-semibold text-center text-gray-800 mb-2">
        Latest Transactions
      </h3>

      <ul className="flex flex-col gap-4 px-2">
        {loading
          ? [...Array(6)].map((_, i) => (
              <li
                key={i}
                className="flex items-center justify-between animate-pulse"
              >
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
          : sorted.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={iconMap[tx.type]}
                    alt={tx.type}
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {tx.fromDB ? tx.type : tx.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDates(tx.date)}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm font-semibold ${
                    tx.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {tx.amount < 0
                    ? `-$${Math.abs(tx.amount).toLocaleString()}`
                    : `+$${tx.amount.toLocaleString()}`}
                </p>
              </li>
            ))}
      </ul>
    </div>
  );
}
