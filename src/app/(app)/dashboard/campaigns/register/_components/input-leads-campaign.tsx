import { FormDescription, FormItem } from '@/components/ui/form'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
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
import { BadgeInfo } from 'lucide-react'

export function InputLeadsCampaign() {
  return (
    <>
      <div className="md:flex gap-8">
        <div className="md:w-1/2 flex flex-col space-y-2">
          {/* input - campaign leads input name */}
          <FormItem>
            <Label className="w-full inline-flex justify-between">
              Nome do campo
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeInfo className="stroke-yellow-600" />
                </HoverCardTrigger>

                <HoverCardContent className="font-light">
                  Este campo aparecerá para o usuário preencher, então preencha com um campo que seja relevante para a
                  sua captação.
                </HoverCardContent>
              </HoverCard>
            </Label>

            <Input
              type="text"
              id="campaign-lead-name"
              name="campaign-lead-name"
              placeholder="Insira o nome do campo."
              required
            />
            <FormDescription>Insira o nome do campo a ser cadastrado.</FormDescription>
          </FormItem>

          {/* input - campaign leads input type */}
          <FormItem>
            <Label className="w-full inline-flex justify-between">
              Tipo de campo
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeInfo className="stroke-yellow-600" />
                </HoverCardTrigger>

                <HoverCardContent className="font-light">
                  O tipo de campo será o que o usuário irá preencher. Por exemplo, o campo de nome do usuário será do
                  tipo &quot;texto&quot;, o campo de receber comunicados será do tipo &quot;escolha&quot;.
                </HoverCardContent>
              </HoverCard>
            </Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="string">Texto</SelectItem>
                  <SelectItem value="boolean">Escolha</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </div>
        <div className="flex flex-col justify-between">
          <p>Nome</p>

          <p>email</p>

          <p>telefone</p>
        </div>
      </div>
      <div className="bg-red-100">novas respostas digitadas pelo usuario</div>
    </>
  )
}
