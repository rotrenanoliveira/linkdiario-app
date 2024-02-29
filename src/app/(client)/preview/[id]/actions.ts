'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { fromZodError } from 'zod-validation-error'
import { z } from 'zod'

import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'
import { CampaignsRepository } from '@/infra/database/db'
import { ActionResponse } from '@/core/types'

export async function publishCampaign(campaignId: string) {
  const campaignSlugs = await CampaignsRepository.getCompanyAndCampaignSlugById(campaignId)

  if (!campaignSlugs) {
    throw new Error('Campaign not found')
  }

  await Promise.all([
    RedisCacheRepository.delete(`not-published-campaign:${campaignId}:details`),
    CampaignsRepository.save(campaignId, {
      status: 'ACTIVE',
      startedAt: new Date(),
    }),
  ])

  revalidatePath(`/dashboard/campaigns/`)
  revalidatePath(`/preview/${campaignId}/`)
  revalidatePath(`/${campaignSlugs.companySlug}/${campaignSlugs.campaignSlug}`)
}

type PrevState = ActionResponse | null

export async function saveLeadsValues(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  const saveLeadsSchema = z.object({
    campaignId: z.string().uuid({ message: 'ID inválido.' }),
    leads: z.string(),
  })

  const result = saveLeadsSchema.safeParse({
    campaignId: data.get('campaign-id'),
    leads: data.get('campaign-leads-inputs'),
  })

  if (result.success === false) {
    const zodError = fromZodError(result.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: zodError.toString(),
    }
  }

  const leads = {
    id: randomUUID(),
    ...result.data,
  }

  return leads
  // TODO create the Leads Repository
  /*
  await LeadsRepository.create({
    id: leads.id,
    campaignId: leads.campaignId,
    leads: leads.leads,
  })
  */
}
