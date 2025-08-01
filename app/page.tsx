"use client";
import toast from "react-hot-toast";
import { useUserFromDB } from "@/hooks";

import { AppLayout, HomeScreen } from "@/components";

toast.success("Transferencia realizada con éxito");

export default function Home() {
  const { data: user, isLoading } = useUserFromDB();

  if (isLoading) return <p>Cargando usuario...</p>;
  if (!user) return <p>Usuario no encontrado</p>;

  return (
    <AppLayout>
      <HomeScreen />
    </AppLayout>
  );
}
