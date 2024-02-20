import { Skeleton } from '@/components/ui/skeleton'

export function LoadingHeader() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 bg-foreground rounded-full" />
      <Skeleton className="w-48 h-3 bg-foreground rounded-full" />
    </div>
  )
}
