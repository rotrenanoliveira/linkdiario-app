import { Home } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { QuizCampaign } from '../../_components/quiz-campaign'
import { PresellCampaign } from '../../_components/presell-campaign'
import { PublishAlertDialog } from './_components/publish-alert-dialog'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Services } from '@/infra/services'
import { CampaignTitle } from './_components/campaign-title'

interface PreviewCampaignPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PreviewCampaignPageProps): Promise<Metadata> {
  const campaignId = params.id

  const campaign = await Services.getCampaignById(campaignId)

  const titleCapitalized = campaign?.title
    ? campaign.title
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : ''

  return {
    title: `Preview - ${titleCapitalized}`,
    description: campaign?.subtitle,
  }
}

export default async function PreviewCampaignPage({ params }: PreviewCampaignPageProps) {
  if (!params.id) {
    return notFound()
  }

  const campaign = await Services.getCampaignById(params.id)

  if (!campaign) {
    return notFound()
  }

  const campaignImage = campaign.carouselImages[0]
  const campaignDescription = campaign.description
  const campaignQuiz = campaign.quiz

  return (
    <section className="container max-w-screen-xl box-border p-4 overflow-hidden">
      {/* HEADER - CAMPAIGN */}
      <header className="w-full p-3 gap-2 flex flex-col md:flex-row items-center justify-between bg-white rounded-md md:rounded-full">
        <div className="inline-flex items-center gap-2">
          <Link
            href="/dashboard/campaigns"
            className="size-10 flex items-center justify-center hover:bg-foreground/5 rounded-full"
          >
            <Home strokeWidth={1.25} />
          </Link>

          <div className="w-1 h-1 bg-foreground/50 rounded-full" />

          <CampaignTitle title={campaign.title} />
        </div>

        <div className="inline-flex items-center gap-2">
          <Badge variant="warning">{campaign.type}</Badge>
          <div className="w-1 h-1 bg-foreground/50 rounded-full" />
          <Button type="button" variant="outline" className="rounded-full">
            <Link href={`/dashboard/campaigns/edit/${params.id}`} prefetch={true}>
              Editar
            </Link>
          </Button>
          <div className="w-1 h-1 bg-foreground/50 rounded-full" />
          <PublishAlertDialog campaignId={params.id} />
        </div>
      </header>

      {/*  CAMPAIGN TITLE  */}
      <div className="max-w-screen-lg mt-16 space-y-4 text-center capitalize">
        <p className="font-normal text-xl md:text-3xl lg:text-5xl">{campaign.title}</p>
        <p className="font-light text-lg md:text-xl lg:text-2xl">{campaign.subtitle}</p>
        <div className="w-32 h-1 mx-auto bg-yellow-400 rounded-full" />
      </div>

      {/* CAMPAIGN CONTENT */}
      <div className="mx-auto max-w-screen-lg flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-32 mt-16 lg:mt-32">
        <div className="w-80 h-96 md:w-[352px] md:h-[448px] bg-foreground/5 rounded-2xl relative">
          <div className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute bg-foreground/15 rotate-12" />

          <div className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute bg-foreground/25 rotate-6" />

          <div className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute">
            <Image
              src={campaignImage.url}
              alt={campaignImage.file}
              width={352}
              height={448}
              // className="w-[352px] h-[448px] rounded-2xl absolute"
              className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute"
            />
          </div>
        </div>

        {campaign.type === 'PRESELL' && campaignDescription && (
          <PresellCampaign description={campaignDescription} affiliateUrl={campaign.affiliateUrl} />
        )}

        {campaign.type === 'QUIZ' && campaignQuiz && (
          <QuizCampaign
            question={campaignQuiz.question}
            answers={campaignQuiz.answers}
            affiliateUrl={campaign.affiliateUrl}
          />
        )}
      </div>
    </section>
  )
}
