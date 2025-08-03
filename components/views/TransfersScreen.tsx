'use client'

import { useTransfersFromDB } from '@/hooks'
import { AppLayout, HomeWrapper } from '@/components'
import { useRouter } from 'next/navigation'

export default function TransferScreen() {
  const router = useRouter()
  const { data: transfers = [] } = useTransfersFromDB()

  console.log('Transfers:', transfers)

  return (
    <AppLayout> 
      <header className="bg-[#00C47F] text-white px-4 pt-4 pb-3 relative">
        <button onClick={() => router.back()} className="text-2xl absolute left-4 top-4">←</button>
        <h1 className="text-center font-bold text-lg">Transfers</h1>
      </header>

      <HomeWrapper>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Latest Transfer</h2>
          <img src="/calendar.svg" alt="Filter" className="w-5 h-5" />
        </div>

        <ul className="flex flex-col gap-4">
          {transfers.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img src={tx.contact.avatar} alt={tx.contact.firstName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {tx.contact.firstName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(tx.date).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm font-bold text-red-500">
                -${tx.amount.toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </HomeWrapper>
    </AppLayout>
  )
}
