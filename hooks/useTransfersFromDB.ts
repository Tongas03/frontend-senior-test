'use client'

import { useQuery } from '@tanstack/react-query'
import { getTransfersFromDB } from '@/lib'
import { TransferWithContact } from '@/types'

export function useTransfersFromDB() {
  return useQuery<TransferWithContact[]>({
    queryKey: ['transfers-from-db'],
    queryFn: getTransfersFromDB,
    staleTime: Infinity,
  })
}
