import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Loader2 size={48} strokeWidth={1.25} className="animate-spin" />
    </main>
  )
}
