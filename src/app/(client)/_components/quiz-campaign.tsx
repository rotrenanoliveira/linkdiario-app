import Link from 'next/link'

import { satochi } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuizCampaignProps {
  question: string
  answers: Array<string>
  affiliateUrl: string
}

export function QuizCampaign({ question, answers, affiliateUrl }: QuizCampaignProps) {
  return (
    <div className="w-full max-w-[384px] space-y-4">
      <p className="font-normal text-2xl text-center mb-8">{question}</p>

      {answers.map((answer, index) => (
        <Button key={index} className="w-full h-16 rounded-full p-1 bg-[#EAEBEC] hover:bg-[#DDDEDF]">
          <Link
            href={affiliateUrl}
            className={cn(satochi.className, 'w-full flex items-center justify-evenly text-lg text-foreground')}
          >
            <span className="flex-grow text-center font-normal">{answer}</span>
          </Link>
        </Button>
      ))}
    </div>
  )
}
