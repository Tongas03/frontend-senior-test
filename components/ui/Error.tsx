interface ErrorProps {
  message?: string
}

export default function Error({ message = 'Ha ocurrido un error' }: ErrorProps) {
  return (
    <div className="flex items-center justify-center h-40 text-sm text-red-500">
      {message}
    </div>
  )
}