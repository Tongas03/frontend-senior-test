"use client";
import { useUserFromDB } from "@/hooks";

import { AppLayout, HomeScreen, Error } from "@/components";
export default function Home() {
  const { error } = useUserFromDB();

  return (
    <AppLayout>
      {error ? <Error /> : <HomeScreen />}
    </AppLayout>
  );
}
