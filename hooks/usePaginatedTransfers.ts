import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransfersWithContactsFromDB } from "@/lib/dbAccess";
import { TransferWithContact } from "@/types";

const PAGE_SIZE = 6;

export const usePaginatedTransfers = () => {
  return useInfiniteQuery<TransferWithContact[], Error>({
    queryKey: ["paginated-transfers"],
    queryFn: async (context) => {
      const pageParam = typeof context.pageParam === "number" ? context.pageParam : 0;
      const allTransfers = await getTransfersWithContactsFromDB();
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      return allTransfers.slice(start, end);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flat().length;
      return lastPage.length < PAGE_SIZE ? undefined : totalLoaded / PAGE_SIZE;
    },
  });
};
