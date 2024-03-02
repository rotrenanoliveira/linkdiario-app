'use client'

import * as React from 'react'
import { satochi } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CampaignLeads } from '@/core/types'
import { cn } from '@/lib/utils'
import { Translate } from '@/utils/translate'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { saveLeadsValues } from '../preview/[id]/actions'
import { useToast } from '@/components/ui/use-toast'

interface LeadsCampaignProps {
  leadsInputs: CampaignLeads
  affiliateUrl: string
  campaignId: string
}

export function LeadsCampaign({ leadsInputs, affiliateUrl, campaignId }: LeadsCampaignProps) {
  const activeInputs = leadsInputs.inputs.filter((input) => input.isActive)

  const ref = React.useRef<HTMLFormElement>(null)

  const [formState, formAction] = useFormState(saveLeadsValues, null)
  const [inputValue, setInputValue] = React.useState<{ [key: string]: string }>({})

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setInputValue((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const { toast } = useToast()

  React.useEffect(() => {
    if (formState) {
      toast({
        variant: formState.success ? 'default' : 'destructive',
        title: formState.title,
        description: formState.message,
        duration: 3000,
      })

      if (formState.success === false) {
        return
      }

      ref.current?.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  const inputValueString = JSON.stringify(inputValue)

  return (
    <div className="w-full max-w-[384px] space-y-4">
      <h1>Para receber atualizações sobre o produto, preencha os campos abaixo</h1>

      <form ref={ref} action={formAction} className="w-full space-y-4">
        {activeInputs.map((input) => {
          return (
            <FormItem key={input.name}>
              <Label className="w-full">{Translate.leadName(input.name)}</Label>

              <Input
                type="text"
                id="campaign-lead-name"
                name={input.name}
                placeholder="Preencha o campo com seus dados."
                required
                onChange={handleValueChange}
              />
            </FormItem>
          )
        })}

        <Input type="text" name="campaign-leads-inputs" readOnly value={campaignId} className="hidden" />
        <Input type="text" name="campaign-leads-inputs" readOnly value={inputValueString} className="hidden" />

        <Button className="w-full h-16 rounded-full p-1 bg-[#EAEBEC] hover:bg-[#DDDEDF]" type="submit">
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
      </form>
    </div>
  )
}
