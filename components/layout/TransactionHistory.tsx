"use client";

import { useEffect, useState } from "react";
import { useTransfersFromDB } from "@/hooks";
import { mockTransactions } from "@/mocks";
import { Transaction, FiltersDates } from "@/types";
import { formatDates } from "@/utils";
import {TransactionFilterDropdown} from "@/components";

const iconMap: Record<string, string> = {
  Payment: "/iconPayment.svg",
  Transfer: "/iconTransfer.svg",
  CashIn: "/iconCashIn.svg",
};

export default function TransactionHistory() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FiltersDates>("All");
  const { data = [] } = useTransfersFromDB();

  const formattedTransfers: Transaction[] = data.map((tx) => ({
    id: tx.id,
    type: "Transfer",
    date: tx.date,
    amount: -tx.amount,
    fromDB: true,
  }));

  const unified: Transaction[] = [...mockTransactions, ...formattedTransfers];

  const sorted = unified.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const filtered = sorted.filter((tx) => {
    if (filter === "All") return true;

    const txDate = new Date(tx.date);
    const now = new Date();

    if (filter === "Today") {
      return txDate.toDateString() === now.toDateString();
    }

    if (filter === "Yesterday") {
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      return txDate.toDateString() === yesterday.toDateString();
    }

    if (filter === "Last 5 Days") {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(now.getDate() - 5);
      return txDate >= fiveDaysAgo && txDate <= now;
    }

    return true;
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-[20px] font-semibold text-gray-800">
          Latest Transactions
        </h3>
        <TransactionFilterDropdown selected={filter} onChange={setFilter} />
      </div>

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
          : filtered.map((tx) => (
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
