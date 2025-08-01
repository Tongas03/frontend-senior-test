"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserFromDB } from "@/hooks";

import { AppLayout, HomeScreen, Loading, Error } from "@/components";

// toast.success("Transferencia realizada con éxito");

export default function Home() {
  const { data: user, isLoading } = useUserFromDB();

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      {!show || isLoading ? <Loading /> : !show ? <Error /> : <HomeScreen />}
    </AppLayout>
  );
}
