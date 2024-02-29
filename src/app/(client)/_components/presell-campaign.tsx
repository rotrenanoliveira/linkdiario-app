import DOMPurify from 'isomorphic-dompurify'

import { ButtonCta } from './button-cta'

interface PresellCampaignProps {
  description: string
  affiliateUrl: string
  ctaText: string
  ctaColor: string
}

export function PresellCampaign({ description, affiliateUrl, ctaText, ctaColor }: PresellCampaignProps) {
  const descriptionParsed = description.split('\n')

  function sanitize(text: string) {
    const sanitizedText = text.replaceAll('\n', '<br/>')

    return DOMPurify.sanitize(sanitizedText, { ALLOWED_TAGS: ['br'] })
  }

  return (
    <div className="w-full max-w-[384px]">
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

      <ButtonCta ctaText={ctaText} ctaColor={ctaColor} affiliateUrl={affiliateUrl} />
    </div>
  )
}
