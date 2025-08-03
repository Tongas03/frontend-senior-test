"use client";

import { usePaginatedTransfers } from "@/hooks/usePaginatedTransfers";
import { useEffect, useRef } from "react";
import { AppLayout, HomeWrapper } from "@/components";
import { useRouter } from "next/navigation";

export default function TransfersScreen() {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePaginatedTransfers();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <header className="bg-[#00C47F] text-white px-4 pt-4 pb-3 relative">
        <button
          onClick={() => router.back()}
          className="text-2xl absolute left-4 top-4"
        >
          ←
        </button>
        <h1 className="text-center font-bold text-lg">Transfers</h1>
      </header>

      <HomeWrapper>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Transfer
          </h2>
          <img src="/calendar.svg" alt="Filter" className="w-5 h-5" />
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="space-y-1">
                    <div className="w-24 h-3 bg-gray-200 rounded" />
                    <div className="w-20 h-2 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {data?.pages.flatMap((page) =>
              page.map((tx) => (
                <li key={tx.id} className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      src={tx.contact.avatar}
                      alt={`${tx.contact.firstName} ${tx.contact.lastName}`}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {tx.contact.firstName} {tx.contact.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(tx.date)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-black">
                    ${tx.amount.toLocaleString()}
                  </p>
                </li>
              ))
            )}
          </ul>
        )}

        <div ref={observerRef} className="h-8" />
      </HomeWrapper>
    </>
  );
}
