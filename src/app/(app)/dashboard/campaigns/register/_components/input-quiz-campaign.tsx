import { ChangeEvent, useState } from 'react'
import { BadgeInfo, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FormDescription, FormItem } from '@/components/ui/form'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { genAccessCode } from '@/lib/access-code'

interface Answer {
  id: string
  answer: string
}

export function InputQuizCampaign() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Array<Answer>>([])
  const [answer, setAnswer] = useState<string | null>(null)

  function handleSetAnswer(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value)
    setErrorMessage(null)
  }

  function handleAddAnswer() {
    if (answer) {
      if (answers.length >= 3) {
        setErrorMessage('O quiz pode ter no máximo 3 respostas.')
        return
      }

      setAnswers([...answers, { id: genAccessCode(), answer }])
      setErrorMessage(null)
      setAnswer(null)
    }
  }

  function handleDeleteAnswer(answerId: string) {
    setAnswers(() => {
      return answers.filter((answer) => answer.id !== answerId)
    })
  }

  const answersString = JSON.stringify(answers) ?? []

  return (
    <div className="md:flex gap-8">
      <div className="md:w-1/2 flex flex-col space-y-2">
        {/* input - campaign quiz question */}
        <FormItem>
          <Label className="w-full inline-flex justify-between">
            Pergunta
            <HoverCard>
              <HoverCardTrigger>
                <BadgeInfo className="stroke-yellow-600" />
              </HoverCardTrigger>

              <HoverCardContent className="font-light">
                Essa será a principal interação com o usuário, então escolha uma pergunta que engaje e seja relevante
                para o contexto da campanha.
              </HoverCardContent>
            </HoverCard>
          </Label>

          <Input
            type="text"
            id="campaign-quiz-question"
            name="campaign-quiz-question"
            placeholder="Insira a pergunta da campanha."
            required
          />
          <FormDescription>Insira a pergunta do quiz que será apresentada aos participantes.</FormDescription>
        </FormItem>

        {/* input - campaign quiz answers */}
        <FormItem>
          <Label className="w-full inline-flex justify-between">
            Resposta
            <HoverCard>
              <HoverCardTrigger>
                <BadgeInfo className="stroke-yellow-600" />
              </HoverCardTrigger>

              <HoverCardContent className="font-light">
                Cada resposta deve ser clara e concisa, ajudando a garantir que os participantes entendam as opções
                disponíveis. Use o botão &quot;Adicionar resposta&quot; para inserir múltiplas respostas.
              </HoverCardContent>
            </HoverCard>
          </Label>

          <Input
            type="text"
            id="campaign-quiz-answer"
            name="campaign-quiz-answer"
            value={answer ?? ''}
            onChange={handleSetAnswer}
            placeholder="Insira a resposta da pergunta."
          />

          {errorMessage ? (
            <FormDescription className="text-red-500">{errorMessage}</FormDescription>
          ) : (
            <FormDescription>Insira até 3 respostas válidas para a pergunta do quiz.</FormDescription>
          )}
        </FormItem>

        <Button type="button" variant={'outline'} onClick={handleAddAnswer} className="w-fit self-end">
          Adicionar resposta
        </Button>
      </div>

      <div className="md:w-1/2">
        {/* input - campaign quiz answers */}
        <FormItem>
          <Label>Resposta Cadastradas</Label>

          {answers.map((answer, index) => (
            <div key={answer.id} className="w-full inline-flex gap-3">
              <Input type="text" defaultValue={`${index + 1}. ${answer.answer}`} className="flex-1" disabled />

              <Button type="button" variant={'outline'} onClick={() => handleDeleteAnswer(answer.id)}>
                <Trash strokeWidth={1.5} className="stroke-red-500" />
              </Button>
            </div>
          ))}

          <Input type="text" name="campaign-quiz-answers" readOnly value={answersString} className="hidden" />
        </FormItem>
      </div>
    </div>
  )
}
