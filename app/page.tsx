"use client";
import { useFetchUsers } from "@/hooks";

import { AppLayout, HomeScreen, Error } from "@/components";
export default function Home() {
  const { error } = useFetchUsers();

  return (
    <AppLayout>
      {error ? <Error /> : <HomeScreen />}
    </AppLayout>
  );
}
