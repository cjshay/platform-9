export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div className="fixed bottom-6 left-1/2 z-100 -translate-x-1/2 rounded-full bg-amber px-4.5 py-2.5 font-mono text-sm text-[#1a1406] shadow-2xl">
      {message}
    </div>
  )
}
