import React from 'react'

import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Translate } from '@/utils/translate'
import { Services } from '@/infra/services'

interface LeadInputProps {
  name: 'name' | 'email' | 'phone' | string
  isInputActive: boolean
  setIsInputActive: (index: number) => void
  updateInputName: (index: number, name: string) => void
  index: number
  campaignId: string
}

export async function LeadInput({
  name,
  isInputActive,
  setIsInputActive,
  index,
  updateInputName,
  campaignId,
}: LeadInputProps) {
  const campaign = await Services.getCampaignById(campaignId)
  return (
    <div className="flex flex-col rounded-lg space-y-4 border p-4">
      {/* input - input name */}
      <FormItem className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          {['name', 'email', 'phone'].includes(name) ||
          campaign?.status === 'ACTIVE' ||
          campaign?.status === 'ENDED' ? (
            <Label className="text-base capitalize">{Translate.leadName(name)}</Label>
          ) : (
            <Input defaultValue={name} required onChange={(e) => updateInputName(index, e.target.value)} />
          )}
          <FormDescription>Ative para captar esse lead.</FormDescription>
        </div>

        <Switch checked={isInputActive} onCheckedChange={() => setIsInputActive(index)} disabled={name === 'name'} />
      </FormItem>

      {/* input - input active */}
      <Input type="checkbox" checked={isInputActive} className="hidden" readOnly />
    </div>
  )
}
