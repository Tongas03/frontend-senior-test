"use client";
import toast from "react-hot-toast";
import { useUserFromDB } from "@/hooks";

import { AppLayout, HomeWrapper, FooterNav, UserHeader } from "@/components";
// import UserHeader from '@/components/home/UserHeader'
// import ContactList from '@/components/home/ContactList'
// import TransactionHistory from '@/components/home/TransactionHistory'

toast.success("Transferencia realizada con éxito");

export default function Home() {
  const { data: user, isLoading } = useUserFromDB();

  if (isLoading) return <p>Cargando usuario...</p>;
  if (!user) return <p>Usuario no encontrado</p>;

  return (
    <AppLayout>
      <UserHeader />
      <HomeWrapper>
        {/* <ContactList />
        <TransactionHistory /> */}
        <></>
      </HomeWrapper>
      <FooterNav />
    </AppLayout>
  );
}
