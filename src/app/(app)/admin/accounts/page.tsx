import { columns } from './columns'
import { DataTable } from './data-table'
import { Separator } from '@/components/ui/separator'
import { AccountDetails } from '@/core/types/accounts'
import { AccountsRepository } from '@/infra/database/db'

async function getData(): Promise<AccountDetails[]> {
  const accounts = await AccountsRepository.findMany()

  return accounts
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
