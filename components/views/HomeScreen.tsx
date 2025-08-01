import {
  HomeWrapper,
  FooterNav,
  UserHeader,
  ContactList,
  TransactionHistory
} from "@/components";

export default function HomeScreen() {
  return (
    <>
      <UserHeader />
      <HomeWrapper>
        <ContactList />
        <TransactionHistory />
      </HomeWrapper>
      <FooterNav />
    </>
  )
}