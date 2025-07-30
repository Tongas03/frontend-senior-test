'use client'

import { useQuery } from '@tanstack/react-query'

export function useRandomUser() {
  return useQuery({
    queryKey: ['random-user'],
    queryFn: async () => {
      const res = await fetch('https://randomuser.me/api/')
      const data = await res.json()
      return data.results[0]
    },
  })
}