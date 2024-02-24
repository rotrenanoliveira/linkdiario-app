import * as React from 'react'
import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LeadInput } from './lead-input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'

const registeredInputs = [
  { name: 'name', isActive: true },
  { name: 'email', isActive: true },
  { name: 'phone', isActive: true },
]

export function InputLeadsCampaign() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [inputs, setInputs] = React.useState(registeredInputs)

  const inputName = React.useRef<HTMLInputElement>(null)
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
      setErrorMessage('O quiz pode ter no máximo 5 respostas.')
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
              <LeadInput key={index} name={input.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
