import Link from 'next/link'
import { Suspense } from 'react'
import { Plus } from 'lucide-react'

import { DashboardCampaignsTable } from './_components/campaigns-table'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function CampaignsPage() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Campanhas</h2>

        <Link
          className={cn(buttonVariants({ variant: 'outline' }), 'flex items-center gap-2')}
          href={'/dashboard/campaigns/register'}
        >
          Nova campanha
          <Plus strokeWidth={1} />
        </Link>
      </div>
      <Separator className="my-4" />

      <Suspense fallback={<p>Carregando...</p>}>
        <DashboardCampaignsTable />
      </Suspense>
    </section>
  )
}
