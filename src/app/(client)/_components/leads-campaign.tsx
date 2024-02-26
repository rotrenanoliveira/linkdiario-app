import { CampaignLeads } from '@/core/types'

interface LeadsCampaignProps {
  leadsInputs?: CampaignLeads | null
  affiliateUrl: string
}

export function LeadsCampaign({ leadsInputs, affiliateUrl }: LeadsCampaignProps) {
  return (
    <div className="w-full max-w-[384px] space-y-4">
      <p className="font-normal text-2xl text-center mb-8">Leads</p>
      {leadsInputs?.inputs.map((input) => (
        <>
          <p key={input.name}>{input.name}</p>
          <p>{input.isActive}</p>
        </>
      ))}
    </div>
  )
}
