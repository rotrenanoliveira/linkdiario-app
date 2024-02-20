import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingChildren() {
  return (
    <div className="flex flex-col gap-3 -mt-12 items-start justify-center w-full h-full">
      <Skeleton className="w-48 h-3 bg-foreground rounded-full" />
      <Skeleton className="w-20 h-2 mb-3 bg-foreground rounded-full" />
      <Separator />
    </div>
  )
}
