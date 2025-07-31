export default function HomeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-5 pt-8 h-[600px] overflow-y-auto">
      {children}
    </div>
  )
}