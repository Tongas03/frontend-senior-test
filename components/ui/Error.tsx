export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-[#00C47F] text-white text-center rounded-2xl px-6">
      <div className="w-10 h-10 mb-6 flex items-center justify-center text-3xl">
        ❌
      </div>
      <h2 className="text-lg font-semibold">Error al cargar los datos</h2>
      <p className="text-sm text-white/80 mt-1">
        Por favor, contactate con el administrador.
      </p>
    </div>
  )
}