import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const qna = [
  {
    question: 'Quanto tempo leva para criar uma presell?',
    value: 'q1',
    answer:
      'Com nossa plataforma, é possível criar presell eficazes em apenas 10 minutos. Basta inserir uma foto, título e descrição para obter agilidade e aumentar o sucesso das suas vendas.',
  },
  {
    question: 'Posso anunciar sem precisar de uma estrutura própria?',
    value: 'q2',
    answer:
      'Sim, com o linkdiario, você pode começar a anunciar no Google hoje mesmo, sem a necessidade de possuir uma estrutura própria. Facilitamos o processo para que você foque no sucesso dos seus anúncios',
  },
  {
    question: 'Como posso começar a utilizar?',
    value: 'q3',
    answer:
      'Para começar, assista ao vídeo explicativo em nosso site para entender como a plataforma funciona e quais são as vantagens de utilizá-la. Em seguida, clique no botão "Começar agora" para iniciar o processo.',
  },
  {
    question: 'É compatível com todas as plataformas?',
    value: 'q4',
    answer:
      'Sim, nossa plataforma é projetada para funcionar em todas as plataformas, oferecendo flexibilidade para afiliados e produtores alcançarem seu público-alvo onde quer que estejam.',
  },
  {
    question: 'O que é o linkdiario?',
    value: 'q5',
    answer:
      'O linkdiario é uma plataforma que permite a criação rápida e simples de presell para afiliados e produtores. Ele oferece uma solução eficaz para impulsionar vendas e destacar produtos no mercado.',
  },
]

export function QuestionsAndAnswers() {
  return (
    <section className="container xl:max-w-5xl mb-4 lg:mb-8 xl:mb-12">
      <Accordion type="single" collapsible className="w-full">
        {qna.map(({ question, answer, value }, index) => (
          <AccordionItem key={index} value={value}>
            <AccordionTrigger className="text-sm text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
