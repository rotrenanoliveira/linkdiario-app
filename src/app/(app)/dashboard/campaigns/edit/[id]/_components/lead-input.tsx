import React from 'react'

import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Translate } from '@/utils/translate'
import { CampaignStatus } from '@/core/types/campaign'

interface LeadInputProps {
  name: 'name' | 'email' | 'phone' | string
  isInputActive: boolean
  setIsInputActive: (index: number) => void
  updateInputName: (index: number, name: string) => void
  index: number
  campaignStatus: CampaignStatus
}

export async function LeadInput({
  name,
  isInputActive,
  setIsInputActive,
  index,
  updateInputName,
  campaignStatus,
}: LeadInputProps) {
  return (
    <div className="flex flex-col rounded-lg space-y-4 border p-4">
      {/* input - input name */}
      <FormItem className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          {['name', 'email', 'phone'].includes(name) || campaignStatus !== 'NOT_PUBLISHED' ? (
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
