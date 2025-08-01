import './globals.css'
import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import { ReactQueryProvider } from '@/components'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Wallet prueba técnica con Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  )
}