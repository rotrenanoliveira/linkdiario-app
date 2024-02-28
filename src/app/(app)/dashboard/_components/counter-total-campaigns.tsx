import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Services } from '@/infra/services'
import { redirect } from 'next/navigation'

export async function CounterTotalCampaigns() {
  const company = await Services.getCompany()

  if (!company) {
    return redirect('/auth/sign-in')
  }

  const counter = await Services.getCampaignCounters(company.id)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Campanhas criadas</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{counter.total}</div>
        <p className="text-xs text-muted-foreground">{100 - (counter.total - counter.removed)} campanhas disponíveis</p>
      </CardContent>
    </Card>
  )
}
