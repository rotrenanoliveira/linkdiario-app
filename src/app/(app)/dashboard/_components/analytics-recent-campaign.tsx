import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Services } from '@/infra/services'

export async function AnalyticsRecentCampaign() {
  const analytics = await Services.analytics.getAnalyticsForRecentCampaign()

  if (!analytics) {
    return <></>
  }

  let campaignTitle = analytics.campaign.substring(0, 50)
  campaignTitle = campaignTitle.length < 50 ? campaignTitle : campaignTitle.concat('...')

  return (
    <Card className="max-h-[126px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">{campaignTitle}</CardTitle>
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
      <CardContent className="flex flex-col">
        <div className="inline-flex gap-3 items-center">
          <span className={'text-sm font-light text-muted-foreground'}>Page View - </span>
          <div className="text-xl font-bold">{analytics.pageView}</div>
        </div>
        <div className="inline-flex gap-3 items-center">
          <span className={'text-sm font-light text-muted-foreground'}>Cliques em campanhas - </span>
          <div className="text-xl font-bold">{analytics.clickCta}</div>
        </div>
      </CardContent>
    </Card>
  )
}
