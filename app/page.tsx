"use client";
import toast from "react-hot-toast";
import { useRandomUser } from '@/hooks'

import {AppLayout, HomeWrapper, FooterNav} from '@/components'
// import UserHeader from '@/components/home/UserHeader'
// import ContactList from '@/components/home/ContactList'
// import TransactionHistory from '@/components/home/TransactionHistory'

toast.success("Transferencia realizada con éxito");

export default function Home() {
  const { data, isLoading } = useRandomUser()

  if (isLoading) return <p>Cargando...</p>
  return (
    <AppLayout>
      <HomeWrapper>
        {/* <UserHeader />
        <ContactList />
        <TransactionHistory /> */}
        <div>
          <p>{data.name.first} {data.name.last}</p>
          <img src={data.picture.thumbnail} alt="avatar" />
        </div>
      </HomeWrapper>
      <FooterNav />
    </AppLayout>
  );
}
