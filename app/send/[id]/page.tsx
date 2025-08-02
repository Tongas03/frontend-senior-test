"use client";

import { AppLayout, HomeWrapper } from "@/components";
import SendScreen from "@/components/views/SendScreen";
import { useParams, useRouter } from "next/navigation";
import { useBalanceFromDB } from "@/hooks";

export default function SendPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: balance } = useBalanceFromDB();

  return (
    <AppLayout>
      <header className="flex items-center justify-between px-4 pt-4 pb-2 text-white">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-lg font-bold absolute left-1/2 -translate-x-1/2">
          Send Again
        </h1>
        <div className="w-6" /> {/* Spacer para simetría */}
      </header>

      <div className="text-white text-center mb-4">
        <p className="text-sm">Your balance</p>
        <p className="text-2xl font-bold">${balance?.amount.toLocaleString()}</p>
      </div>

      <HomeWrapper>
        <SendScreen id={id} />
      </HomeWrapper>
    </AppLayout>
  );
}
