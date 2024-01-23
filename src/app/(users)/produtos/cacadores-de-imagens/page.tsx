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
          <CardTitle>Caçadores de Imagens</CardTitle>
          <CardDescription>SEJA O FOTÓGRAFO QUE VOCÊ SEMPRE QUIS SER Aprenda tudo, passo a passo.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/cacadores-imagens.svg'} width={350} height={350} alt="" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://go.hotmart.com/M86149853Q'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
