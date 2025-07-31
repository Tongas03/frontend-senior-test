'use client'

import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-200 min-h-screen flex justify-center items-center p-4">
      <div className="w-[375px] h-[812px] bg-[#00C47F] rounded-3xl overflow-hidden shadow-xl relative">
        {children}
      </div>
    </div>
  )
}