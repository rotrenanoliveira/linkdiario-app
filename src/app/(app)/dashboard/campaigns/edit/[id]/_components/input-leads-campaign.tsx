import * as React from 'react'
import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LeadInput } from './lead-input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { CampaignLeads } from '@/core/types'

interface InputLeadsCampaignProps {
  leadsInput?: CampaignLeads | null
  campaignId: string
}

export function InputLeadsCampaign(props: InputLeadsCampaignProps) {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [inputs, setInputs] = React.useState(() => {
    if (!props.leadsInput) {
      return []
    }

    return props.leadsInput.inputs.map((input) => {
      return { name: input.name, isActive: input.isActive }
    })
  })

  function handleInputActiveChange(index: number) {
    setInputs((prevInput) => {
      const newInputs = [...prevInput]
      const isActive = newInputs[index].isActive
      newInputs[index] = { ...newInputs[index], isActive: !isActive }
      return newInputs
    })
  }

  function updateInputName(index: number, name: string) {
    setInputs((prevInput) => {
      const newInputs = [...prevInput]
      newInputs[index] = { ...newInputs[index], name }
      return newInputs
    })
  }
  const inputName = React.useRef<HTMLInputElement>(null)

  const inputString = JSON.stringify({ inputs }) ?? []

  function handleAddInput() {
    const newInputSchema = z.object({
      name: z.string(),
      isActive: z.boolean(),
    })

    const newInput = newInputSchema.parse({
      name: inputName.current?.value,
      isActive: true,
    })

    console.log(newInput)
    if (inputs.length >= 5) {
      setErrorMessage('O número máximo de campos permitidos é 5.')
      return
    }
    setInputs((prevInputs) => [...prevInputs, newInput])
    setErrorMessage(null)
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="w-1/3 space-y-2 flex flex-col">
          {/* input - campaign leads input name */}
          <FormItem>
            <Label className="w-full inline-flex justify-between">Nome do campo</Label>

            <Input
              type="text"
              id="campaign-lead-name"
              name="campaign-lead-name"
              placeholder="Insira o nome do campo."
              ref={inputName}
            />
            <FormDescription>Insira o nome do campo a ser cadastrado.</FormDescription>
          </FormItem>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <Button type="button" variant={'outline'} onClick={handleAddInput} className="w-fit self-end">
            Adicionar Input
          </Button>
        </div>

        <div className="flex-1">
          <Label>Ativar Leads</Label>

          <div className="flex flex-col space-y-2 mt-2">
            {inputs.map((input, index) => (
              <LeadInput
                key={index}
                name={input.name}
                isInputActive={input.isActive}
                setIsInputActive={handleInputActiveChange}
                updateInputName={updateInputName}
                index={index}
                campaignId={props.campaignId}
              />
            ))}
          </div>
        </div>

        <Input type="text" name="campaign-leads-inputs" readOnly value={inputString} className="hidden" />
      </div>
    </>
  )
}
