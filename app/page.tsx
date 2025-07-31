'use client'
import toast from 'react-hot-toast'
import { useRandomUser } from '@/hooks'

toast.success('Transferencia realizada con éxito')

export default function Home() {
  const { data, isLoading } = useRandomUser()

  if (isLoading) return <p>Cargando...</p>
  return (
    <div>
      <p>{data.name.first} {data.name.last}</p>
      <img src={data.picture.thumbnail} alt="avatar" />
    </div>
  )
}
