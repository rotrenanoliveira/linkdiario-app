import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Escola para fotógrafos',
  description:
    'Fotografo Profissional Revela Os Segredos Para Você Aprender as Técnicas Básicas e avançadas da Fotografia, Mesmo se você não tiver uma câmera fotográfica.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ProductPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Escola para fotógrafos</CardTitle>
          <CardDescription>
            Fotografo Profissional Revela Os Segredos Para Você Aprender as Técnicas Básicas e avançadas da Fotografia,
            Mesmo se você não tiver uma câmera fotográfica..
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/escola-fotografos.png'} width={350} height={350} alt="" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://go.hotmart.com/J75638726W'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
