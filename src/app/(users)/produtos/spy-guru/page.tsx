import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spy Guru',
  description: 'Descubra os produtos e criativos mais escalados do mercado digital! ⚡️',
}

export default function ProductPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Spy Guru</CardTitle>
          <CardDescription>
            Descubra as ofertas de maior sucesso em todas as principais plataformas digitais (Hotmart, Kiwify,
            Monetizze, Eduzz e muito mais). Além disso, conte também com essas super funções:.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/spy-guru.png'} width={350} height={350} alt="" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://kiwify.app/7hA4gaZ?afid=Y6bj1zGo'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
