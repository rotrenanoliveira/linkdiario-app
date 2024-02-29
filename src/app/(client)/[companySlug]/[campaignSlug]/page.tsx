import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import { QuizCampaign } from '../../_components/quiz-campaign'
import { PresellCampaign } from '../../_components/presell-campaign'

import { Services } from '@/infra/services'

interface PreviewCampaignPageProps {
  params: {
    companySlug: string
    campaignSlug: string
  }
}

export async function generateMetadata({ params }: PreviewCampaignPageProps): Promise<Metadata> {
  const { companySlug, campaignSlug } = params

  const campaign = await Services.getCampaignBySlug({ companySlug, campaignSlug })

  const titleCapitalized = campaign?.title
    ? campaign.title
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : ''

  return {
    title: titleCapitalized,
    description: campaign?.subtitle,
  }
}

export default async function PreviewCampaignPage({ params }: PreviewCampaignPageProps) {
  if (!params.campaignSlug || !params.companySlug) {
    return notFound()
  }

  const campaign = await Services.getCampaignBySlug({
    companySlug: params.companySlug,
    campaignSlug: params.campaignSlug,
  })

  if (!campaign || campaign.status !== 'ACTIVE') {
    return notFound()
  }

  const campaignImage = campaign.carouselImages[0]
  const campaignDescription = campaign.description
  const campaignQuiz = campaign.quiz

  return (
    <section className="container max-w-screen-xl box-border p-4">
      {/*  CAMPAIGN TITLE  */}
      <div className="max-w-screen-lg mt-8 2xl:mt-16 space-y-4 text-center capitalize">
        <p className="font-normal text-xl md:text-3xl lg:text-5xl">{campaign.title}</p>
        <p className="font-light text-lg md:text-xl lg:text-2xl">{campaign.subtitle}</p>
        <div className="w-32 h-1 mx-auto rounded-full" style={{ backgroundColor: campaign.ctaColor }} />
      </div>

      {/* CAMPAIGN CONTENT */}
      <div className="mx-auto max-w-screen-lg flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-32 mt-10 2xl:mt-32">
        <div
          className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl relative"
          style={{ backgroundColor: `${campaign.ctaColor}0D` }}
        >
          <div
            className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute rotate-12"
            style={{ backgroundColor: `${campaign.ctaColor}26` }}
          />

          <div
            className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute rotate-6"
            style={{ backgroundColor: `${campaign.ctaColor}42` }}
          />

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
          <PresellCampaign
            description={campaignDescription}
            affiliateUrl={campaign.affiliateUrl}
            ctaText={campaign.ctaText}
            ctaColor={campaign.ctaColor}
          />
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
