import { MoveUpRight } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'
import Link from 'next/link'

import { satochi } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PresellCampaignProps {
  description: string
  affiliateUrl: string
}

export function PresellCampaign({ description, affiliateUrl }: PresellCampaignProps) {
  const descriptionParsed = description.split('\n')

  function sanitize(text: string) {
    const sanitizedText = text.replaceAll('\n', '<br/>')

    return DOMPurify.sanitize(sanitizedText, { ALLOWED_TAGS: ['br'] })
  }

  return (
    <div className="max-w-[384px]">
      <div className="space-y-3 mb-8">
        {descriptionParsed.map((text, index) => {
          const sanitizedHTML = sanitize(text)

          return (
            <p
              key={index}
              className="font-light md:font-normal text-md md:text-lg"
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
          )
        })}
      </div>

      <Button className="w-full h-16 rounded-full p-1 bg-[#EAEBEC] hover:bg-[#DDDEDF]">
        <Link
          href={affiliateUrl}
          className={cn(satochi.className, 'w-full flex items-center justify-evenly text-3xl text-foreground')}
        >
          <span className="flex-grow text-center font-normal">Saiba mais</span>
          <div className="size-14 rounded-full bg-yellow-400 flex items-center justify-center">
            <MoveUpRight size={32} className="text-foreground/85" />
          </div>
        </Link>
      </Button>
    </div>
  )
}
