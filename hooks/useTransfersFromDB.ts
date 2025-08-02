'use client';

import { useQuery } from '@tanstack/react-query';
import { getTransfersFromDB } from '@/lib';
import { Transfer } from '@/types';

export function useTransfersFromDB() {
  return useQuery<Transfer[]>({
    queryKey: ['transfers-from-db'],
    queryFn: getTransfersFromDB,
    staleTime: Infinity,
  });
}