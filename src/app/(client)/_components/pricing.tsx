import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function Pricing() {
  return (
    <section className="container xl:max-w-3xl px-1 flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-8 my-4 lg:my-8 xl:my-12">
      <Card className="w-full h-fit">
        <CardHeader>
          <CardTitle className="text-lg">Plano Standard</CardTitle>
          <CardDescription>Para iniciantes e pequenos negócios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <ul className="space-y-2">
            <li>&bull; 50 campanhas ativas</li>
            <li>&bull; 100 campanhas criadas</li>
            <li>&bull; Presell em menos de 10 minutos</li>
            <li>&bull; Compatível com todas plataformas</li>
          </ul>

          <span className="block mt-8 font-light text-sm text-foreground/75">
            Empreendedores iniciantes e pequenos negócios que buscam uma solução acessível e eficiente para iniciar sua
            presença online.
          </span>
        </CardContent>
        <CardFooter>
          <Link href="#" className="w-full">
            <Button className="w-full text-md" variant="secondary">
              Assinar
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Plano Pro</CardTitle>
          <CardDescription>Para crescimento e estratégias avançadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <ul className="space-y-2">
            <li>&bull; 100 campanhas ativas</li>
            <li>&bull; 250 campanhas criadas</li>
            <li>&bull; Monitoramento do desempenho das campanhas</li>
            <li>&bull; Presell em menos de 10 minutos</li>
            <li>&bull; Compatível com todas plataformas</li>
          </ul>

          <span className="block mt-8 font-light text-sm text-foreground/75">
            Empresas em crescimento que buscam uma presença online robusta e estratégias de marketing mais avançadas
            para otimização e resultados expressivos.
          </span>
        </CardContent>
        <CardFooter>
          <Link href="#" className="w-full">
            <Button
              className="w-full text-md bg-linkdiario-yellow/75 hover:bg-linkdiario-yellow text-zinc-700"
              variant="default"
            >
              Assinar
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  )
}
