'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserFromDB } from '@/lib'
import { StoredUser } from '@/types'

export function useUserFromDB() {
  return useQuery<StoredUser | undefined>({
    queryKey: ['user-from-db'],
    queryFn: getUserFromDB,
    staleTime: Infinity,
  })
}