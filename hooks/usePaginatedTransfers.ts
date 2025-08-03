import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransfersWithContactsFromDB } from "@/lib";
import { TransferWithContact, FiltersDates } from "@/types";

const PAGE_SIZE = 6;

const applyDateFilter = (
  transfers: TransferWithContact[],
  filter: FiltersDates
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  return transfers.filter((tx) => {
    const txDate = new Date(tx.date);

    switch (filter) {
      case "Today":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return isSameDay(txDate, today);

      case "Yesterday":
        const yest = new Date(today);
        yest.setDate(today.getDate() - 1);
        return isSameDay(txDate, yest);

      case "Last 5 Days":
        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 5);
        return txDate >= fiveDaysAgo && txDate <= today;

      case "All":
      default:
        return true;
    }
  });
};

export const usePaginatedTransfers = (filter: FiltersDates = "All") => {
  return useInfiniteQuery<TransferWithContact[], Error>({
    queryKey: ["paginated-transfers", filter],
        queryFn: async (context) => {
      const pageParam =
        typeof context.pageParam === "number" ? context.pageParam : 0;
      const allTransfers = await getTransfersWithContactsFromDB();
      const filtered = applyDateFilter(allTransfers, filter);
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      return filtered.slice(start, end);

    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flat().length;
      return lastPage.length < PAGE_SIZE
        ? undefined
        : totalLoaded / PAGE_SIZE;

    },
  });
};
