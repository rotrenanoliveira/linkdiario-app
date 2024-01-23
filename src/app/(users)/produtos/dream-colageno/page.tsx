import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'

export default function ProductPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Dream Colágeno</CardTitle>
          <CardDescription>
            Melhora as rugas, pele ressecada, perda de sustentação, bigode chinês, olheiras e linhas de expressão além
            de melhorar o aspecto cansado e envelhecido da pele, SEM USO DE AGULHAS ou PROCEDIMENTOS INVASIVOS.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/dream-colageno.png'} width={350} height={350} alt="" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://mon.net.br/2scxh3'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
