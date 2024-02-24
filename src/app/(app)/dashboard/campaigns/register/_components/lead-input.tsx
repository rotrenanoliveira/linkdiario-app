import React from 'react'

import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Translate } from '@/utils/translate'

interface LeadInputProps {
  name: 'name' | 'email' | 'phone' | string
  isInputActive: boolean
  setIsInputActive: (index: number) => void
  index: number
}

export function LeadInput({ name, isInputActive, setIsInputActive, index }: LeadInputProps) {
  return (
    <div className="flex flex-col rounded-lg space-y-4 border p-4">
      {/* input - input name */}
      <FormItem className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base capitalize">{Translate.leadName(name)}</Label>
          <FormDescription>Ative para captar esse lead.</FormDescription>
        </div>

        <Switch checked={isInputActive} onCheckedChange={() => setIsInputActive(index)} disabled={name === 'name'} />
      </FormItem>

      {/* input - input active */}
      <Input type="checkbox" checked={isInputActive} className="hidden" readOnly />
    </div>
  )
}
