import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { poppins, satochi } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export function Footer() {
  return (
    <footer className={cn(poppins.className, 'w-full p-3 rounded-2xl bg-linkdiario-yellow/50')}>
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
              Somos uma pequena equipe que ao ver a dificuldade de criar campanhas e manter uma estrutura própria vimos
              uma necessidade e criamos uma solução.
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
            <span className="hidden md:inline">Todos os direitos reservados</span>・ &copy; {new Date().getFullYear()}
            <span className="md:hidden">・</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
