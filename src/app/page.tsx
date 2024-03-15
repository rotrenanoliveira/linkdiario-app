import Link from 'next/link'
import { ArrowRight, ChevronRight, LogIn } from 'lucide-react'

import { poppins, satochi } from '@/app/fonts'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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

export default function Home() {
  return (
    <main>
      {/* HEADER - HERO */}
      <section className="header-gradient mb-40 md:mb-0">
        {/* HERO */}
        <div className="header-hero z-20 space-y-8">
          {/* NAV */}
          <nav className="w-full rounded-full h-16 inline-flex items-center justify-between px-3">
            {/* LOGO */}
            <div
              className={cn(
                satochi.className,
                'inline-flex items-center gap-2 text-lg md:text-xl font-medium tracking-tight',
              )}
            >
              <Icons.linkdiario />
              linkdiario
            </div>
            {/* MENU */}
            <ul className={cn(satochi.className, 'hidden lg:flex items-center gap-4 font-medium')}>
              <Link href="#sobre">
                <Button className="text-xl" variant="link">
                  sobre
                </Button>
              </Link>
              <Link href="#precos">
                <Button className="text-xl" variant="link">
                  preços
                </Button>
              </Link>
              <Link href="#qna">
                <Button className="text-xl" variant="link">
                  q&a
                </Button>
              </Link>
            </ul>
            {/* LOGIN BUTTON */}
            <Link href="/auth/sign-in">
              {/* <Button className="inline-flex items-center gap-2 p-2 md:p-3 md:h-12 rounded-lg hover:rounded-[48px] bg-[#8AB8A1] hover:bg-[#94BCA6] transition-all duration-300"> */}
              <Button variant="outline" className="inline-flex items-center gap-2">
                <span className="hidden md:inline">Entrar</span>
                <LogIn size={24} strokeWidth={1.5} className="" />
              </Button>
            </Link>
          </nav>
          {/* HERO */}
          <div className="flex flex-col gap-8 md:items-end lg:flex-row lg:items-start xl:h-full xl:items-center">
            {/* HERO CONTENT */}
            <div className="space-y-4 md:space-y-8 lg:w-2/3 xl:self-start xl:mt-24 xl:space-y-16">
              <div className="p-2">
                {/* HERO TITLE */}
                <h1 className="font-light mb-3 text-4xl md:text-6xl 2xl:text-7xl 2xl:max-w-3xl xl:mb-8">
                  Transforme ideias em vendas
                </h1>
                {/* HERO DESCRIPTION */}
                <span className="font-light text-foreground/75 md:text-xl 2xl:text-2xl 2xl:inline-block 2xl:max-w-3xl 2xl:p-8 2xl:rounded-3xl 2xl:bg-[rgba(255,255,255,0.15)] 2xl:backdrop-blur-sm 2xl:shadow-sm">
                  Construa em minutos presells para afiliados. Experimente linkdiario agora e conquiste o sucesso que
                  você merece.
                </span>
              </div>
              {/* BTN - CTA */}
              <div className="hero-cta-bg">
                <Link href="#precos" className="w-full py-4 px-6 inline-flex gap-2 items-center justify-between">
                  <button type="button" className="text-lg">
                    Começar agora
                  </button>

                  <div className="hero-cta-icon">
                    <ChevronRight size={24} strokeWidth={2} />
                  </div>
                </Link>
              </div>
            </div>
            {/* HERO IMAGE */}
            <div className="hero-image-cover mx-auto md:mx-0 relative">
              <div className="hero-image-cover absolute opacity-50 border -rotate-6" />

              <div className="hero-image-cover absolute opacity-75 border rotate-6" />

              <div className="hero-image-cover absolute">
                <Image
                  src="/hero.avif"
                  alt=""
                  width={352}
                  height={448}
                  className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 z-10 w-3/4 lg:w-1/2 h-1/2 rounded-tr-full rounded-br-full bg-gradient-to-tr from-[#E8D5BA] to-[#E8D5BAFF]/85"></div>
      </section>

      <div className="p-3 md:p-9 lg:p-12 xl:p-16 overflow-hidden">
        {/* ABOUT */}
        <section
          id="sobre"
          className={cn(
            satochi.className,
            'container xl:max-w-screen-lg 2xl:max-w-screen-xl px-1 flex flex-col xl:flex-row gap-8 md:gap-4 lg:gap-8 my-12 lg:my-16 xl:my-32',
          )}
        >
          <div className="w-full xl:w-1/3">
            <h1 className="w-fit font-light xl:font-normal 2xl:text-2xl border-b xl:border-none uppercase">
              sobre a plataforma
            </h1>

            <div className="hidden xl:block pt-8 pl-8 group">
              <div className="about-cta-base" />

              <div className="about-cta-link">
                <Link href={'#qna'} className="w-full">
                  <p className="flex flex-col gap-1">
                    <span>Perguntas</span>
                    <span className="ml-4">frequentes</span>
                  </p>

                  <div className="about-cta-button">
                    <div className="about-cta-button-bg">
                      <Button className="about-cta-icon hover:bg-white">
                        <ArrowRight size={16} strokeWidth={1.25} className="rotate-45 invert" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
              {/*  */}
            </div>
          </div>

          <div className="flex-1 space-y-4 lg:space-y-8">
            <h2 className="font-medium text-lg md:text-xl lg:text-2xl xl:text-4xl">
              Comece a anunciar no Google hoje sem precisar de estrutura própria
            </h2>

            <div className="font-light text-foreground space-y-3 lg:space-y-6 xl:space-y-6">
              <div className="hidden md:inline-flex items-center gap-3">
                <div className="size-2 animate-pulse rounded-full bg-linkdiario-yellow" />
                <p className="text-md xl:text-lg  font-normal text-foreground/65">
                  Em um mundo digital movido por cliques, destacar-se é essencial.
                </p>
              </div>

              <p className="text-sm md:text-lg xl:text-xl">
                O linkdiario é uma ferramenta de criação de Presell projetada para impulsionar suas vendas online de
                forma eficaz e descomplicada.
              </p>

              <div className="hidden md:inline-flex items-center gap-3">
                <div className="size-2 animate-pulse rounded-full bg-linkdiario-yellow" />
                <p className="text-md xl:text-lg font-normal text-foreground/65">
                  Criar campanhas podem ser desafiador mas com o linkdiario é simples e intuitivo.
                </p>
              </div>

              <p className="text-sm md:text-lg xl:text-xl">
                Sabemos que criar campanhas envolventes pode ser desafiador. O linkdiario é a solução que simplifica
                esse processo, permitindo que você alcance resultados expressivos com agilidade.
              </p>

              <div className="hidden md:inline-flex items-center gap-3">
                <div className="size-2 animate-pulse rounded-full bg-linkdiario-yellow" />
                <p className="text-md xl:text-lg font-normal text-foreground/65">
                  O linkdiario é a chave para uma presença online sem barreiras.
                </p>
              </div>

              <p className="text-sm md:text-lg xl:text-xl">
                Desfrute da liberdade de conquistar o mercado digital sem a necessidade de construir uma estrutura
                própria. Eliminamos as barreiras tradicionais, permitindo que você crie Presell em minutos e alcance o
                sucesso sem investir tempo e recursos na elaboração de uma complexa infraestrutura.
              </p>

              <p className="text-sm md:text-lg xl:text-xl">
                Sua jornada para transformar cliques em vendas começa imediatamente, destacando-se pela simplicidade e
                eficácia, enquanto oferecemos acesso direto a uma plataforma intuitiva e descomplicada. Liberte-se das
                preocupações e concentre-se no que realmente importa: <strong>o crescimento do seu negócio.</strong>
              </p>
            </div>
          </div>
        </section>
        {/* PLANS */}
        <section
          id="precos"
          className="container xl:max-w-screen-lg 2xl:max-w-screen-xl flex flex-col items-center gap-8 px-1 my-12 lg:my-16 xl:my-32"
        >
          <h1 className="self-start w-fit font-light 2xl:text-2xl xl:font-normal border-b xl:border-none uppercase">
            Planos
          </h1>

          <div className="xl:max-w-3xl flex flex-col justify-center md:flex-row gap-8 md:gap-4 lg:gap-8">
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
                  Empreendedores iniciantes e pequenos negócios que buscam uma solução acessível e eficiente para
                  iniciar sua presença online.
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
                  Empresas em crescimento que buscam uma presença online robusta e estratégias de marketing mais
                  avançadas para otimização e resultados expressivos.
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
          </div>
        </section>
        {/* QUESTIONS AND ANSWERS */}
        <section id="qna" className="container xl:max-w-screen-lg 2xl:max-w-screen-xl my-12 lg:my-16 xl:my-32">
          <h1 className="w-fit font-light 2xl:text-2xl xl:font-normal border-b xl:border-none uppercase my-8">
            Q&A - Perguntas e Respostas
          </h1>

          <Accordion type="single" collapsible className="w-full">
            {qna.map(({ question, answer, value }, index) => (
              <AccordionItem key={index} value={value}>
                <AccordionTrigger className="text-sm lg:text-base text-left">{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        {/* FOOTER */}
        <footer className={cn(poppins.className, 'w-full mt-48 p-3 rounded-2xl bg-linkdiario-yellow/50')}>
          <div className="container p-3 space-y-8">
            {/* FOOTER CTA */}
            <div className="footer-cta">
              <p className="flex flex-col p-8 md:p-12 font-normal text-center md:text-left text-2xl md:text-3xl lg:text-4xl text-white">
                <span>Vamos construir</span>
                <span>sua presell?</span>
              </p>

              <div className="footer-cta-button-bg">
                <div className="group w-fit h-fit p-2 border rounded-2xl hover:-rotate-45 transition border-foreground/25 hover:border-foreground/5">
                  <Link href="#">
                    <Button className="footer-cta-button hover:bg-white">
                      <ArrowRight size={24} strokeWidth={1.5} className="group-hover:rotate-45 invert" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* FOOTER ABOUT */}
            <div className="flex flex-col md:flex-row justify-between gap-6 md:mx-9">
              <div className="space-y-4 md:max-w-80 xl:max-w-md">
                <p className="font-light text-lg md:text-2xl xl:text-3xl text-zinc-800">Sobre nós</p>
                <p className="font-light text-sm md:text-md xl:text-lg text-zinc-800/75">
                  Somos uma pequena equipe que ao ver a dificuldade de criar campanhas e manter uma estrutura própria
                  vimos uma necessidade e criamos uma solução.
                </p>
              </div>

              <div className="flex flex-col gap-2 lg:gap-4">
                <p className="font-light text-lg md:text-2xl xl:text-3xl text-zinc-800">Comunidade</p>

                <Link href={'#'}>
                  <Button variant="link" className="p-0 h-fit text-md xl:text-xl font-light text-zinc-800/75">
                    <Icons.instagram className="fill-zinc-800/75 mr-2" />
                    Instagram
                  </Button>
                </Link>

                <Link href={'#'}>
                  <Button variant="link" className="p-0 h-fit text-md xl:text-xl font-light text-zinc-800/75">
                    <Icons.youtube className="fill-zinc-800/75 mr-2" />
                    YouTube
                  </Button>
                </Link>

                <Link href={'#'}>
                  <Button variant="link" className="p-0 h-fit text-md xl:text-xl font-light text-zinc-800/75">
                    <Icons.tiktok className="fill-zinc-800/75 mr-2" />
                    TikTok
                  </Button>
                </Link>
              </div>
            </div>
            {/* FOOTER COPYRIGHT */}
            <Separator className="bg-zinc-800/35" />

            <div className="w-full flex flex-col items-center">
              <div className={cn(satochi.className, 'text-center text-lg md:text-xl opacity-50')}>
                linkdiario desenvolvido por
                <Button type="button" variant="link" className="text-md md:text-xl p-1">
                  <Link href="https://dstopic.com">dstopic</Link>
                </Button>
              </div>

              <p className="font-light text-sm text-zinc-800/75">
                <span className="hidden md:inline">Todos os direitos reservados</span>・ &copy;{' '}
                {new Date().getFullYear()}
                <span className="md:hidden">・</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
