export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-[#00C47F] text-white text-center rounded-2xl px-6">
      <div className="w-10 h-10 mb-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
      <h2 className="text-lg font-semibold">Cargando Usuario</h2>
      <p className="text-sm text-white/80 mt-1">Esperá un momento por favor.</p>
    </div>
  )
}