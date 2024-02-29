'use client'

import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'

import { satochi } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ButtonCtaProps {
  ctaText: string
  ctaColor: string
  affiliateUrl: string
}

export function ButtonCta({ ctaText, ctaColor, affiliateUrl }: ButtonCtaProps) {
  const [isHovered, setIsHovered] = useState(false)

  const btnBackgroundColor = {
    backgroundColor: isHovered ? `${ctaColor}BF` : ctaColor,
  }

  return (
    <Button
      className="w-full h-16 rounded-full p-1 hover:bg-opacity-75"
      style={btnBackgroundColor}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={affiliateUrl}
        className={cn(satochi.className, 'w-full flex items-center justify-evenly text-3xl text-foreground')}
      >
        <span className="flex-grow text-center ml-7 font-normal invert">{ctaText}</span>
        <div className="size-14 rounded-full flex items-center justify-center" style={{ backgroundColor: ctaColor }}>
          <MoveUpRight size={32} className="text-foreground/85 invert" />
        </div>
      </Link>
    </Button>
  )
}
