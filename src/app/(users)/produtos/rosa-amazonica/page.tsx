import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rosa Mosqueta Amazônica',
  description: 'Descubra a Rosa Mosqueta Amazônica! O Poder da Amazônia concentrado em um único Sérum',
}

export default function ProductPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Rosa Mosqueta Amazônica</CardTitle>
          <CardDescription>
            Um produto rico em vitaminas que traz maciez, firmeza, rejuvenescimento e hidratação profunda!.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/rosa-amazonica.webp'} width={350} height={350} alt="" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://mon.net.br/2saci1'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
