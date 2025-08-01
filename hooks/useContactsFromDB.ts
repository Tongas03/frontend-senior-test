'use client'

import { useQuery } from '@tanstack/react-query'
import { getContactsFromDB } from '@/lib'
import { StoredUser } from '@/types'

export function useContactsFromDB() {
  return useQuery<StoredUser[]>({
    queryKey: ['contacts-from-db'],
    queryFn: getContactsFromDB,
    staleTime: Infinity,
  })
}