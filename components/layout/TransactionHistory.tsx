"use client";
import { mockTransactions } from "@/mocks";

const iconMap: Record<string, string> = {
  Payment: "/iconPayment.svg",
  Transfer: "/iconTransfer.svg",
  CashIn: "/iconCashIn.svg",
};

export default function TransactionHistory() {
  return (
    <div className="flex flex-col gap-4 pb-20">
      <h3 className="text-[20px] font-semibold text-center text-gray-800 mb-2">
        Lastest Transaction
      </h3>

      <ul className="flex flex-col gap-4 px-2">
        {mockTransactions.map((tx) => (
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
                  tx.amount < 0 ? 'text-red-500' : 'text-green-500'
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
