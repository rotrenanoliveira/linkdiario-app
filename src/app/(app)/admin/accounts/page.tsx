// export default function AccountsPage() {
//   return <div>Accounts</div>
// }

import { Separator } from '@/components/ui/separator'
import { columns } from './columns'
import { DataTable } from './data-table'
import { AccountDetails } from '@/core/types/accounts'
import { PrismaAccountsRepository } from '@/lib/prisma/repositories/prisma-accounts-repository'
import { prisma } from '@/lib/prisma/client'

async function getData(): Promise<AccountDetails[]> {
  // Fetch data from your API here.
  const accountsRepository = new PrismaAccountsRepository(prisma)

  return await accountsRepository.findMany()
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <section>
      <h2 className="text-2xl">Contas cadastradas</h2>
      <Separator className="my-4" />

      <div className="w-full py-4">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
