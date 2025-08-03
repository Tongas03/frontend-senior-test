'use client'

import { useQuery } from "@tanstack/react-query"
import { getBalanceFromDB } from "@/lib"
import { Balance } from "@/types"

export function useBalanceFromDB() {
  return useQuery<Balance>({
    queryKey: ['balance-from-db'],
    queryFn: getBalanceFromDB,
    staleTime: Infinity,
  })
}
