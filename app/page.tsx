"use client";
import { useFetchUsers } from "@/hooks";

import { AppLayout, HomeScreen, Error } from "@/components";
export default function Home() {
  const { error } = useFetchUsers();

  console.log("error", error);

  return (
    <AppLayout>
      {error ? <Error /> : <HomeScreen />}
    </AppLayout>
  );
}
