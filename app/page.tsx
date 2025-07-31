"use client";
import toast from "react-hot-toast";
import { useFetchUsers } from '@/hooks'

import {AppLayout, HomeWrapper, FooterNav} from '@/components'
// import UserHeader from '@/components/home/UserHeader'
// import ContactList from '@/components/home/ContactList'
// import TransactionHistory from '@/components/home/TransactionHistory'

toast.success("Transferencia realizada con éxito");

export default function Home() {
  const { data, isLoading } = useFetchUsers()

  console.log(data);

  if (isLoading) return <p>Cargando...</p>
  if (!data) return <p>No hay datos disponibles</p>
  
  return (
    <AppLayout>
      <HomeWrapper>
        {/* <UserHeader />
        <ContactList />
        <TransactionHistory /> */}
        <div>
          <p>{data[0].name.first} {data[0].name.last}</p>
          <img src={data[0].picture.thumbnail} alt="avatar" />
        </div>
      </HomeWrapper>
      <FooterNav />
    </AppLayout>
  );
}
