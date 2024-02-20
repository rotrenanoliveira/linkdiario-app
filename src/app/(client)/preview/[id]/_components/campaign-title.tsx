'use client'

import { useEffect, useState } from 'react'

import { satochi } from '@/app/fonts'
import { cn } from '@/lib/utils'

interface CampaignTitleProps {
  title: string
}

export function CampaignTitle({ title }: CampaignTitleProps) {
  const [campaignTitle, setCampaignTitle] = useState<string | null>(title)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setCampaignTitle(title.substring(0, 20).concat('...'))
    }
  }, [title])

  return <p className={cn(satochi.className, 'capitalize text-sm lg:text-xl')}>Campanha: {campaignTitle}</p>
}
